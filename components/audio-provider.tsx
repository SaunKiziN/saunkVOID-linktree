"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

type WindowWithAudio = Window & {
  webkitAudioContext?: {
    new (contextOptions?: AudioContextOptions): AudioContext;
    prototype: AudioContext;
  };
};

type SaunkAudioContextValue = {
  isSfxEnabled: boolean;
  isMusicEnabled: boolean;
  toggleSfx: () => void;
  toggleMusic: () => void;
  playHoverSound: () => void;
  playClickSound: () => void;
  startBackgroundMusic: () => void;
};

const SaunkAudioContext = createContext<SaunkAudioContextValue | null>(null);

const BG_MUSIC_SRC = "/sounds/void-music.mp3";
const DEFAULT_VOLUME = 0.25;

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isSfxEnabled, setIsSfxEnabled] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const ensureAudioContext = useCallback(() => {
    if (audioCtxRef.current) return;
    if (typeof window === "undefined") return;

    const w = window as WindowWithAudio & typeof window;
    const Ctx = w.AudioContext ?? w.webkitAudioContext;
    if (!Ctx) return;

    audioCtxRef.current = new Ctx();
  }, []);

  const playHoverSound = useCallback(() => {
    if (!isSfxEnabled) return;

    ensureAudioContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.start(now);
    osc.stop(now + 0.08);
  }, [isSfxEnabled, ensureAudioContext]);

  const playClickSound = useCallback(() => {
    if (!isSfxEnabled) return;

    ensureAudioContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.start(now);
    osc.stop(now + 0.12);
  }, [isSfxEnabled, ensureAudioContext]);

  // generic fade, clamps volume to [0,1] and resets previous intervals
  const fadeTo = useCallback(
    (targetVolume: number, options?: { pauseOnEnd?: boolean }) => {
      const audio = bgAudioRef.current;
      if (!audio) return;

      const clampedTarget = Math.min(1, Math.max(0, targetVolume));

      if (fadeIntervalRef.current !== null) {
        window.clearInterval(fadeIntervalRef.current);
      }

      const step = 0.03;
      const intervalMs = 120;

      fadeIntervalRef.current = window.setInterval(() => {
        const current = bgAudioRef.current;
        if (!current) {
          if (fadeIntervalRef.current !== null)
            window.clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
          return;
        }

        const v = current.volume;
        const increasing = clampedTarget > v;
        const nextVolume = increasing
          ? Math.min(clampedTarget, v + step)
          : Math.max(clampedTarget, v - step);

        current.volume = nextVolume;

        if (nextVolume === clampedTarget) {
          if (fadeIntervalRef.current !== null)
            window.clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;

          if (clampedTarget === 0 && options?.pauseOnEnd) {
            current.pause();
          }
        }
      }, intervalMs);
    },
    []
  );

  const startBackgroundMusic = useCallback(() => {
    let audio = bgAudioRef.current;

    if (!audio) {
      audio = new Audio(BG_MUSIC_SRC);
      audio.loop = true;
      audio.volume = 0;
      bgAudioRef.current = audio;
    }

    audio
      .play()
      .then(() => {
        if (isMusicEnabled) {
          fadeTo(DEFAULT_VOLUME);
        } else {
          fadeTo(0);
        }
      })
      .catch(() => {});
  }, [fadeTo, isMusicEnabled]);

  const toggleSfx = useCallback(() => {
    setIsSfxEnabled((prev) => !prev);
  }, []);

  const toggleMusic = useCallback(() => {
    setIsMusicEnabled((prev) => {
      const next = !prev;
      const audio = bgAudioRef.current;

      if (!audio) {
        // if the music hasn't started yet (before Enter), just store the intention
        return next;
      }

      if (!next) {
        // stop music, fade out and PAUSE
        fadeTo(0, { pauseOnEnd: true });
      } else {
        // turn on music and fade in
        if (audio.paused) {
          audio
            .play()
            .then(() => fadeTo(DEFAULT_VOLUME))
            .catch(() => {});
        } else {
          fadeTo(DEFAULT_VOLUME);
        }
      }

      return next;
    });
  }, [fadeTo]);

  // fade when tab visibility changes
  useEffect(() => {
    const handleVisibility = () => {
      const audio = bgAudioRef.current;
      if (!audio) return;

      if (document.visibilityState === "hidden") {
        // fade out and PAUSE
        fadeTo(0, { pauseOnEnd: true });
      } else if (document.visibilityState === "visible") {
        if (!isMusicEnabled) return;

        audio.volume = 0;
        audio
          .play()
          .then(() => fadeTo(DEFAULT_VOLUME))
          .catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fadeTo, isMusicEnabled]);

  const value: SaunkAudioContextValue = {
    isSfxEnabled,
    isMusicEnabled,
    toggleSfx,
    toggleMusic,
    playHoverSound,
    playClickSound,
    startBackgroundMusic,
  };

  return (
    <SaunkAudioContext.Provider value={value}>
      {children}
    </SaunkAudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(SaunkAudioContext);
  if (!ctx) {
    throw new Error("useAudio deve ser usado dentro de <AudioProvider>");
  }
  return ctx;
}
