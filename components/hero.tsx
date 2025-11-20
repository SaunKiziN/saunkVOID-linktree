"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAudio } from "./audio-provider";

export function Hero() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { playHoverSound, isSfxEnabled, toggleSfx, startBackgroundMusic } =
    useAudio();

  useEffect(() => {
    setIsMounted(true);

    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleEnterClick = () => {
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = "";
    body.style.overflow = "";

    if (!isSfxEnabled) toggleSfx();

    // start's music (with fade, if active)
    startBackgroundMusic();

    // interact sound
    playHoverSound();

    const linksSection = document.getElementById("links-section");
    if (linksSection) {
      linksSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      className={`relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-20 ${
        isMounted ? "page-fade-in" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-8 mb-12">
        <div
          className="relative select-none cursor-default"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className={`w-32 h-32 rounded-lg border-2 border-white shadow-lg bg-gray-900 flex items-center justify-center overflow-hidden ${
              isHovering ? "shadow-white/50" : "shadow-white/20"
            } transition-all duration-300 ${
              isHovering ? "animate-profile-tilt" : ""
            }`}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
              <Image
                src="/saunk-logo.png"
                alt="SaunK logo"
                fill
                className="object-contain scale-[1.50]"
                priority
              />
            </div>
          </div>

          <div
            className={`absolute inset-0 rounded-lg border-2 border-white ${
              isHovering ? "shadow-lg shadow-white/60 opacity-40" : "opacity-20"
            } animate-pulse transition-all duration-300`}
          />
        </div>

        <div className="text-center space-y-4 select-none cursor-default">
          <h1 className="text-6xl md:text-7xl font-light tracking-widest animate-glow-pulse">
            SaunK
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wider text-gray-400 italic">
            Echoes in the Void
          </p>
        </div>
      </div>

      <button
        onClick={handleEnterClick}
        className="mt-10 inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/40 
                   bg-white/5 text-xs md:text-sm tracking-[0.35em] uppercase 
                   text-white/80 hover:text-white hover:bg-white/10 hover:border-white/80
                   transition-all duration-300 hover:-translate-y-0.5
                   hover:shadow-[0_0_25px_rgba(255,255,255,0.35)]"
      >
        ENTER THE VOID
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
