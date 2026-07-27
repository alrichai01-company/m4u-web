"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

/**
 * /admin/login — simple password login page.
 *
 * Styled with the M4U design language (serif headings, gold accents,
 * warm background) to match the main site.
 */
export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Invalid password.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "var(--ivory)",
          padding: "3rem 2.4rem",
          border: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: "1.7rem",
            letterSpacing: ".1em",
            marginBottom: ".5rem",
          }}
        >
          M4U
        </div>
        <p
          style={{
            fontSize: ".72rem",
            fontWeight: 500,
            letterSpacing: ".34em",
            textTransform: "uppercase" as const,
            color: "var(--gold)",
            marginBottom: "2rem",
          }}
        >
          Admin Dashboard
        </p>

        <div className="field">
          <label
            htmlFor="admin-pw"
            style={{
              display: "block",
              fontSize: ".66rem",
              letterSpacing: ".3em",
              textTransform: "uppercase" as const,
              color: "var(--taupe)",
              marginBottom: ".5rem",
            }}
          >
            Password
          </label>
          <input
            id="admin-pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            autoFocus
            style={{
              width: "100%",
              background: "transparent",
              border: "0",
              borderBottom: "1px solid var(--line)",
              padding: ".8rem 0",
              fontFamily: "var(--sans)",
              fontSize: ".98rem",
              fontWeight: 300,
              color: "var(--ink)",
              outline: "none",
            }}
          />
        </div>

        {error && (
          <p style={{ color: "#c44", fontSize: ".85rem", marginTop: ".8rem" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn solid"
          style={{ marginTop: "2rem", width: "100%" }}
        >
          <span>{loading ? "Signing in…" : "Sign In"}</span>
        </button>
      </form>
    </div>
  );
}
