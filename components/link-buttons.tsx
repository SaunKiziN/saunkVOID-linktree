"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiDiscord,
  SiGithub,
  SiInstagram,
  SiSteam,
  SiTiktok,
  SiTwitch,
  SiYoutube,
} from "react-icons/si";
import { useAudio } from "./audio-provider";

type LinkIcon = IconType | LucideIcon;

type LinkItem = {
  label: string;
  href: string;
  icon: LinkIcon;
  featured?: boolean;
};

type LinkGroup = {
  title: string;
  links: LinkItem[];
};

const linkGroups: LinkGroup[] = [
  {
    title: "AO VIVO",
    links: [
      {
        label: "Assistir live na Twitch",
        href: "https://twitch.tv/saunkizin",
        icon: SiTwitch,
        featured: true,
      },
    ],
  },
  {
    title: "CONTEÚDO",
    links: [
      {
        label: "YouTube",
        href: "https://youtube.com/@saunkizin",
        icon: SiYoutube,
      },
      {
        label: "TikTok",
        href: "https://tiktok.com/@SaunKiziN",
        icon: SiTiktok,
      },
      {
        label: "Instagram",
        href: "https://instagram.com/samlxzz",
        icon: SiInstagram,
      },
    ],
  },
  {
    title: "COMUNIDADE",
    links: [
      {
        label: "Discord",
        href: "https://discord.gg/SaunRKT",
        icon: SiDiscord,
      },
      {
        label: "Steam",
        href: "https://steamcommunity.com/id/saunkizin/",
        icon: SiSteam,
      },
    ],
  },
  {
    title: "CONTATO",
    links: [
      {
        label: "E-mail profissional",
        href: "mailto:samuberretta.biz@gmail.com",
        icon: Mail,
      },
      {
        label: "GitHub",
        href: "https://github.com/SaunKiziN",
        icon: SiGithub,
      },
    ],
  },
];

export function LinkButtons() {
  const { playHoverSound, playClickSound } = useAudio();

  return (
    <section
      id="links-section"
      className="relative z-20 flex min-h-screen items-center justify-center px-4 py-16 md:py-12"
    >
      <div className="w-full max-w-xl space-y-8 md:space-y-6">
        {linkGroups.map((group) => (
          <div key={group.title} className="space-y-3 md:space-y-2.5">
            <h2 className="px-1 text-[0.74rem] font-normal uppercase tracking-[0.28em] text-white/70">
              {group.title}
            </h2>

            <div className="space-y-3 md:space-y-2.5">
              {group.links.map((link) => {
                const Icon = link.icon;
                const opensInNewTab = link.href.startsWith("http");
                const buttonClassName = link.featured
                  ? "link-button group flex w-full items-center gap-4 border border-white/55 bg-white/[0.075] px-5 py-4 text-white !shadow-[0_0_18px_rgba(255,255,255,0.1)] backdrop-blur-sm hover:border-white/75 hover:!shadow-[0_0_24px_rgba(255,255,255,0.14)]"
                  : "link-button group flex w-full items-center gap-4 border border-white/20 bg-black/80 px-5 py-4 text-white backdrop-blur-sm";

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={opensInNewTab ? "_blank" : undefined}
                    rel={opensInNewTab ? "noopener noreferrer" : undefined}
                    className={`${buttonClassName} md:py-3.5`}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    <Icon
                      className="h-5 w-5 shrink-0 text-white/60 transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-left text-sm font-light tracking-[0.14em] text-white/85 group-hover:text-white">
                      {link.label}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-white/35 transition-colors group-hover:text-white/70"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
