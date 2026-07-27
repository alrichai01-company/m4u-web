"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { generateId } from "@/lib/id";
import { channels, phoneNumber } from "@/config/site";
import {
  knowledgeBase,
  handoffKeywords,
  chatSuggestions,
  chatGreeting,
  chatFallback,
} from "@/content/chatbot";

const SESSION_KEY = "m4u-session";

/** Same tab-scoped session id the pageview tracker uses. */
function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = generateId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return generateId();
  }
}

interface Message {
  text: string;
  who: "bot" | "user";
  /** True when this bot message should be followed by a WhatsApp CTA. */
  handoff?: boolean;
}

/**
 * Offline fallback matcher — used if the /api/chat request itself fails
 * (network error), so the widget never goes silent.
 */
function resolveAnswer(query: string): { text: string; handoff: boolean } {
  const q = query.toLowerCase();
  const handoff = handoffKeywords.some((k) => q.includes(k));
  const hit = knowledgeBase.find((entry) =>
    entry.keywords.some((k) => q.includes(k)),
  );
  return { text: hit?.answer ?? chatFallback, handoff };
}

/**
 * Wholesale concierge widget.
 *
 * Talks to /api/chat, which is backed by NVIDIA NIM (falls back to a
 * deterministic keyword matcher server-side if NVIDIA_API_KEY isn't set).
 * When the assistant determines a visitor should speak to a human, the API
 * returns { handoff: true } and this component renders a "Continue on
 * WhatsApp" button under that message, linking to the number configured in
 * config/site.ts (channels.whatsapp) — the model itself never sees or states
 * that number.
 */
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [messages]);

  function push(text: string, who: Message["who"], handoff?: boolean) {
    setMessages((prev) => [...prev, { text, who, handoff }]);
  }

  async function ask(query: string) {
    push(query, "user");
    setPending(true);

    try {
      const history = messages.map((m) => ({
        role: m.who === "bot" ? ("assistant" as const) : ("user" as const),
        content: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history,
          sessionId: getSessionId(),
        }),
      });

      if (!res.ok) {
        const fallback = resolveAnswer(query);
        push(fallback.text, "bot", fallback.handoff);
        return;
      }

      const data: { answer?: string; handoff?: boolean; error?: string } =
        await res.json();

      if (!data.answer) {
        const fallback = resolveAnswer(query);
        push(fallback.text, "bot", fallback.handoff);
        return;
      }

      push(data.answer, "bot", data.handoff);
    } catch {
      // Network error — fall back to the local matcher so the widget never
      // goes silent.
      const fallback = resolveAnswer(query);
      push(fallback.text, "bot", fallback.handoff);
    } finally {
      setPending(false);
    }
  }

  function toggle() {
    setOpen((v) => !v);
    if (!greeted) {
      setGreeted(true);
      push(chatGreeting, "bot");
    }
  }

  function send() {
    const v = input.trim();
    if (!v || pending) return;
    setInput("");
    ask(v);
  }

  return (
    <>
      <div id="chat" className={cn(open && "open")} aria-label="M4U Assistant">
        <div className="head">
          <div>
            <div className="t">M4U Assistant</div>
            <div className="s">Wholesale Concierge</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            style={{
              background: "none",
              border: 0,
              fontSize: "1.4rem",
              color: "var(--taupe)",
            }}
          >
            ×
          </button>
        </div>

        <div className="body" ref={bodyRef}>
          {messages.map((m, i) => (
            <div key={i}>
              <div className={`msg ${m.who}`}>{m.text}</div>
              {m.who === "bot" && m.handoff && (
                <a
                  href={channels.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chat-handoff-btn"
                >
                  Continue on WhatsApp
                </a>
              )}
            </div>
          ))}
          {pending && (
            <div className="msg bot" aria-live="polite">
              …
            </div>
          )}
        </div>

        <div className="sugg">
          {chatSuggestions.map((s) => (
            <button key={s} onClick={() => ask(s)} disabled={pending}>
              {s}
            </button>
          ))}
        </div>

        <div className="inp">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about orders, MOQ, shipping…"
            aria-label="Message"
            disabled={pending}
          />
          <button onClick={send} disabled={pending}>
            Send
          </button>
        </div>
      </div>

      {/* ── Floating action buttons ─────────────────────────────────── */}

      {/* WhatsApp FAB */}
      <a
        id="wa-fab"
        href={channels.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp — ${phoneNumber.display}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.845L.057 23.426a.5.5 0 0 0 .617.617l5.581-1.466A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.504-5.197-1.385l-.372-.22-3.314.871.871-3.314-.22-.372A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>

      {/* Chat FAB */}
      <button
        id="chat-fab"
        aria-label="Open M4U Assistant"
        aria-expanded={open}
        onClick={toggle}
      >
        <MessageCircle strokeWidth={1.4} />
      </button>

      {/* Nudge tooltip — pulses on its own + appears on chat-fab hover */}
      {!open && (
        <div id="chat-nudge" aria-hidden>
          Hi, I&apos;m here to help you 👋
        </div>
      )}
    </>
  );
}
