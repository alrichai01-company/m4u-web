"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Stats {
  visitorsToday: number;
  visitorsMonth: number;
  pageViewsToday: number;
  pageViewsMonth: number;
  pageBreakdown: Record<string, number>;
  totalInquiries: number;
  totalConversations: number;
  recentInquiries: {
    id: string;
    name: string;
    email: string;
    mobile: string;
    businessType: string;
    company?: string;
    createdAt: string;
  }[];
}

/**
 * /admin — monitoring dashboard.
 *
 * Lightweight, aligned with M4U design language. Not a CMS.
 * Auto-refreshes every 30 seconds.
 */
export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setStats(data);
      setError("");
    } catch {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div style={{ ...containerStyle, justifyContent: "center" }}>
        <p style={{ color: "var(--taupe)" }}>Loading…</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div style={{ ...containerStyle, justifyContent: "center" }}>
        <p style={{ color: "#c44" }}>{error}</p>
        <button className="btn solid" onClick={fetchStats} style={{ marginTop: "1rem" }}>
          <span>Retry</span>
        </button>
      </div>
    );
  }

  const pageEntries = Object.entries(stats.pageBreakdown).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--line)",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "1.7rem",
              letterSpacing: ".1em",
            }}
          >
            M4U <span style={{ color: "var(--gold)" }}>Dashboard</span>
          </div>
          <p
            style={{
              fontSize: ".72rem",
              fontWeight: 500,
              letterSpacing: ".34em",
              textTransform: "uppercase" as const,
              color: "var(--taupe)",
              marginTop: ".3rem",
            }}
          >
            Admin Monitoring
          </p>
        </div>
        <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap" }}>
          <a
            href="/api/admin/stats?export=csv"
            className="btn gold-b"
            style={{ fontSize: ".68rem", padding: ".7rem 1.5rem" }}
          >
            <span>Download CSV</span>
          </a>
          <button
            onClick={handleLogout}
            className="btn"
            style={{ fontSize: ".68rem", padding: ".7rem 1.5rem" }}
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1px",
          background: "var(--line)",
          border: "1px solid var(--line)",
          marginBottom: "3rem",
        }}
      >
        <StatCard label="Visitors Today" value={stats.visitorsToday} />
        <StatCard label="Visitors This Month" value={stats.visitorsMonth} />
        <StatCard label="Page Views Today" value={stats.pageViewsToday} />
        <StatCard label="Page Views Month" value={stats.pageViewsMonth} />
        <StatCard label="Total Inquiries" value={stats.totalInquiries} accent />
        <StatCard label="Chat Conversations" value={stats.totalConversations} />
      </div>

      {/* Two Column: Page Breakdown + Recent Inquiries */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "clamp(2rem,5vw,4rem)",
          alignItems: "start",
        }}
      >
        {/* Page Breakdown */}
        <div>
          <h3
            style={{
              fontFamily: "var(--serif)",
              fontSize: "1.4rem",
              marginBottom: "1.2rem",
            }}
          >
            Page Views
          </h3>
          {pageEntries.length === 0 ? (
            <p style={{ color: "var(--taupe)", fontSize: ".9rem" }}>
              No page views recorded yet.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {pageEntries.map(([path, count]) => (
                <div
                  key={path}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: ".6rem 0",
                    borderBottom: "1px solid var(--line)",
                    fontSize: ".9rem",
                  }}
                >
                  <code style={{ color: "var(--ink-soft)", fontFamily: "var(--sans)" }}>
                    {path}
                  </code>
                  <span
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      color: "var(--gold)",
                    }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div>
          <h3
            style={{
              fontFamily: "var(--serif)",
              fontSize: "1.4rem",
              marginBottom: "1.2rem",
            }}
          >
            Recent Inquiries
          </h3>
          {stats.recentInquiries.length === 0 ? (
            <p style={{ color: "var(--taupe)", fontSize: ".9rem" }}>
              No inquiries yet.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: ".85rem",
                }}
              >
                <thead>
                  <tr>
                    {["Date", "Name", "Email", "Business Type", "Company"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: ".7rem .6rem",
                          borderBottom: "2px solid var(--line)",
                          fontSize: ".66rem",
                          letterSpacing: ".3em",
                          textTransform: "uppercase" as const,
                          color: "var(--taupe)",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.recentInquiries.map((inq) => (
                    <tr key={inq.id}>
                      <td style={tdStyle}>
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td style={tdStyle}>{inq.name}</td>
                      <td style={{ ...tdStyle, color: "var(--ink-soft)" }}>{inq.email}</td>
                      <td style={tdStyle}>{inq.businessType}</td>
                      <td style={{ ...tdStyle, color: "var(--ink-soft)" }}>
                        {inq.company ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--bg)",
        padding: "2rem 1.6rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(2rem,4vw,3rem)",
          color: accent ? "var(--gold)" : "var(--ink)",
        }}
      >
        {value.toLocaleString("en-IN")}
      </div>
      <div
        style={{
          fontSize: ".66rem",
          letterSpacing: ".3em",
          textTransform: "uppercase" as const,
          color: "var(--taupe)",
          marginTop: ".5rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ---------- Shared styles ---------- */

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "var(--bg)",
  padding: "clamp(2rem,5vw,4rem)",
  maxWidth: "1320px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
};

const tdStyle: React.CSSProperties = {
  padding: ".7rem .6rem",
  borderBottom: "1px solid var(--line)",
  whiteSpace: "nowrap",
};
