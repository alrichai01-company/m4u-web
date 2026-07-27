"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Site-wide background audio.
 *
 * Lives in the root layout so the single <audio> element is never unmounted
 * as the user navigates between pages (client-side routing keeps the layout
 * mounted), giving continuous, uninterrupted playback across the whole site.
 *
 * Browsers block autoplaying audio until the user has interacted with the
 * page, so this:
 *   1. tries to play on mount (works if the browser allows it), and
 *   2. if blocked, starts playback on the first user gesture anywhere
 *      (pointerdown / keydown / touchstart), then removes those listeners.
 *
 * A small mute/unmute button is always available so users stay in control,
 * and the muted/unmuted choice persists across pages and reloads via
 * localStorage.
 */
const STORAGE_KEY = "m4u-audio-muted";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  // Restore the user's previous mute choice before first paint of the button.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "1") setMuted(true);
    setReady(true);
  }, []);

  // Keep the actual element in sync with state and persist the choice.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = muted;
    localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    if (!muted) {
      // Unmuting counts as intent — try to (re)start playback.
      el.play().catch(() => {});
    }
  }, [muted]);

  // Attempt autoplay; fall back to first-gesture start if blocked.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.volume = 0.35; // gentle ambient level

    const tryPlay = () => el.play().catch(() => {});

    // First attempt — may be blocked by the browser's autoplay policy.
    tryPlay();

    // Fallback: start on the first user interaction, then clean up.
    const startOnGesture = () => {
      tryPlay();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", startOnGesture);
      window.removeEventListener("keydown", startOnGesture);
      window.removeEventListener("touchstart", startOnGesture);
    };

    window.addEventListener("pointerdown", startOnGesture);
    window.addEventListener("keydown", startOnGesture);
    window.addEventListener("touchstart", startOnGesture);

    return cleanup;
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/audio/bg.mp3" loop preload="auto" />
      {ready && (
        <button
          id="audio-toggle"
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute background music" : "Mute background music"}
          title={muted ? "Unmute music" : "Mute music"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}
    </>
  );
}
