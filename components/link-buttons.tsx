"use client";

import React from "react";
import Link from "next/link";
import { useAudio } from "./audio-provider";

const links = [
  { label: "Instagram", url: "https://instagram.com/samlxzz", icon: "☷" },
  { label: "TikTok", url: "https://tiktok.com/@SaunKiziN", icon: "♫" },
  { label: "YouTube", url: "https://youtube.com/@saunkizin", icon: "▶" },
  { label: "Twitch", url: "https://twitch.tv/saunkizin", icon: "◉" },
  { label: "Discord", url: "https://discord.gg/SaunRKT", icon: "◆" },
  {
    label: "Steam",
    url: "https://steamcommunity.com/id/saunkizin/",
    icon: "★",
  },
];

export function LinkButtons() {
  const { playHoverSound, playClickSound } = useAudio();

  return (
    <section
      id="links-section"
      className="relative z-20 py-12 px-4 max-w-2xl mx-auto"
    >
      <div className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.url}
            target={link.url !== "#" ? "_blank" : undefined}
            rel={link.url !== "#" ? "noopener noreferrer" : undefined}
            className="link-button group block w-full px-8 py-4 border-2 border-white bg-black text-white text-center font-light tracking-wide"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            <span className="inline-flex items-center gap-3">
              <span
                className="text-lg opacity-70 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              >
                {link.icon}
              </span>
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
