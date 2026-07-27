import { NextResponse } from "next/server";
import { knowledgeBase, chatFallback, handoffKeywords } from "@/content/chatbot";
import { systemPrompt } from "@/content/chatbot-prompt";
import { trackChat } from "@/lib/db";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Sentinel the AI model appends to its own reply to signal a human handoff. */
const HANDOFF_TOKEN = "[[HANDOFF]]";

/**
 * Deterministic keyword matcher — used when OPENAI_API_KEY isn't configured,
 * and as the final safety net if the API call fails.
 */
function resolveLocal(query: string): { answer: string; handoff: boolean } {
  const lower = query.toLowerCase();
  const handoff = handoffKeywords.some((k) => lower.includes(k));
  const hit = knowledgeBase.find((entry) =>
    entry.keywords.some((k) => lower.includes(k)),
  );
  return { answer: hit?.answer ?? chatFallback, handoff };
}

/**
 * Calls the OpenAI Chat Completions API using native fetch.
 */
async function callOpenAI(
  apiKey: string,
  requestBody: string,
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: requestBody,
    signal: AbortSignal.timeout(30_000),
  });

  return await response.text();
}

/**
 * POST /api/chat
 *
 * Accepts { message: string, history: ChatMessage[], sessionId?: string }.
 * If OPENAI_API_KEY is set, calls OpenAI's Chat Completions API using the M4U
 * system prompt, which carries the site's full knowledge and a human-handoff
 * protocol. Otherwise falls back to the deterministic keyword matcher, which
 * also does basic handoff detection.
 *
 * Response shape: { answer: string, handoff: boolean }
 * `handoff: true` tells the client to show a "Continue on WhatsApp" button.
 */
export async function POST(request: Request) {
  let body: { message?: string; history?: ChatMessage[]; sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 },
    );
  }

  const history: ChatMessage[] = body.history ?? [];
  const apiKey = process.env.OPENAI_API_KEY;

  // --- Track the conversation for the admin dashboard ---
  const sessionId = body.sessionId?.trim();
  if (sessionId && sessionId.length <= 64) {
    try {
      trackChat(sessionId);
    } catch {
      // Analytics must never break the chat.
    }
  }

  // --- Fallback: deterministic matcher (no API key configured) ---
  if (!apiKey) {
    const { answer, handoff } = resolveLocal(message);
    return NextResponse.json({ answer, handoff });
  }

  // --- OpenAI Chat Completions response ---
  try {
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...history.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user" as const, content: message },
    ];

    const requestBody = JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages,
      max_tokens: 300,
      temperature: 0.5,
      top_p: 0.9,
    });

    const stdout = await callOpenAI(apiKey, requestBody);

    let data: {
      choices?: { message?: { content?: string } }[];
      error?: { message?: string };
    };
    try {
      data = JSON.parse(stdout);
    } catch {
      console.error("OpenAI API returned non-JSON output:", stdout.slice(0, 500));
      const fallback = resolveLocal(message);
      return NextResponse.json(fallback);
    }

    if (data.error) {
      console.error("OpenAI API error:", data.error.message ?? data.error);
      const fallback = resolveLocal(message);
      return NextResponse.json(fallback);
    }

    let answer: string = data.choices?.[0]?.message?.content ?? "";

    let handoff = false;
    if (answer.includes(HANDOFF_TOKEN)) {
      handoff = true;
      answer = answer.split(HANDOFF_TOKEN).join("").trim();
    }

    if (!answer) {
      const fallback = resolveLocal(message);
      return NextResponse.json({
        answer: fallback.answer,
        handoff: handoff || fallback.handoff,
      });
    }

    return NextResponse.json({ answer, handoff });
  } catch (err) {
    console.error("Chat API error:", err);
    const fallback = resolveLocal(message);
    return NextResponse.json(fallback);
  }
}
