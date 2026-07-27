import fs from "fs";
import path from "path";

/**
 * Lightweight JSON-file data store for the admin dashboard.
 *
 * Stores inquiries, chat conversations, and pageview events in a single
 * JSON file. For production at scale, swap for a real database (Postgres,
 * Redis, etc.). This approach is zero-dependency and works on Vercel
 * serverless functions (using /tmp).
 */

const DATA_DIR = process.env.NODE_ENV === "production"
  ? "/tmp/m4u-data"
  : path.join(process.cwd(), ".data");

const DATA_FILE = path.join(DATA_DIR, "store.json");

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  company?: string;
  businessType: string;
  city?: string;
  state?: string;
  country?: string;
  message?: string;
  createdAt: string;
  // Extended wholesale-onboarding fields (added with the detailed contact form).
  gstin?: string;
  aadhaarPan?: string;
  address?: string;
  pinCode?: string;
  mobile2?: string;
  agencyName?: string;
  agencyContactName?: string;
  agencyContactNumber?: string;
}

export interface ChatConversation {
  id: string;
  messageCount: number;
  startedAt: string;
  lastMessageAt: string;
}

export interface PageView {
  path: string;
  timestamp: string;
  sessionId: string;
}

export interface DataStore {
  inquiries: Inquiry[];
  conversations: ChatConversation[];
  pageViews: PageView[];
}

function ensureDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readStore(): DataStore {
  ensureDir();
  if (!fs.existsSync(DATA_FILE)) {
    return { inquiries: [], conversations: [], pageViews: [] };
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as DataStore;
  } catch {
    return { inquiries: [], conversations: [], pageViews: [] };
  }
}

function writeStore(store: DataStore): void {
  ensureDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

// --- Public API ---

export function addInquiry(inquiry: Omit<Inquiry, "id" | "createdAt">): Inquiry {
  const store = readStore();
  const entry: Inquiry = {
    ...inquiry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  store.inquiries.push(entry);
  writeStore(store);
  return entry;
}

export function addPageView(pv: Omit<PageView, "timestamp">): void {
  const store = readStore();
  store.pageViews.push({ ...pv, timestamp: new Date().toISOString() });
  // Keep only last 30 days of page views
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  store.pageViews = store.pageViews.filter((v) => v.timestamp > cutoff);
  writeStore(store);
}

export function trackChat(sessionId: string): void {
  const store = readStore();
  const existing = store.conversations.find((c) => c.id === sessionId);
  if (existing) {
    existing.messageCount++;
    existing.lastMessageAt = new Date().toISOString();
  } else {
    store.conversations.push({
      id: sessionId,
      messageCount: 1,
      startedAt: new Date().toISOString(),
      lastMessageAt: new Date().toISOString(),
    });
  }
  writeStore(store);
}

export function getStats() {
  const store = readStore();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const todayViews = store.pageViews.filter((v) => v.timestamp >= todayStart);
  const monthViews = store.pageViews.filter((v) => v.timestamp >= monthStart);

  // Unique sessions
  const todayVisitors = new Set(todayViews.map((v) => v.sessionId)).size;
  const monthVisitors = new Set(monthViews.map((v) => v.sessionId)).size;

  // Page view breakdown
  const pageBreakdown: Record<string, number> = {};
  for (const v of monthViews) {
    pageBreakdown[v.path] = (pageBreakdown[v.path] ?? 0) + 1;
  }

  return {
    visitorsToday: todayVisitors,
    visitorsMonth: monthVisitors,
    pageViewsToday: todayViews.length,
    pageViewsMonth: monthViews.length,
    pageBreakdown,
    totalInquiries: store.inquiries.length,
    totalConversations: store.conversations.length,
    recentInquiries: store.inquiries.slice(-20).reverse(),
  };
}

export function getAllInquiries(): Inquiry[] {
  const store = readStore();
  return store.inquiries.slice().reverse();
}
