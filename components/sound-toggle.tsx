"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { RiMusicFill, RiMusicLine } from "react-icons/ri";
import { useAudio } from "./audio-provider";

export function SoundToggle() {
  const { isSfxEnabled, isMusicEnabled, toggleSfx, toggleMusic } = useAudio();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-row gap-3 sm:flex-col">
      <button
        onClick={toggleSfx}
        className="p-3 rounded-full border border-white/30 
                   bg-black/60 backdrop-blur-md 
                   text-white/80 hover:text-white hover:border-white/60 
                   hover:bg-black/80 transition-all duration-300 
                   shadow-lg hover:shadow-white/20"
        aria-label={
          isSfxEnabled
            ? "Desativar sons de interface"
            : "Ativar sons de interface"
        }
      >
        {isSfxEnabled ? (
          <Volume2 size={24} strokeWidth={1.5} />
        ) : (
          <VolumeX size={24} strokeWidth={1.5} />
        )}
      </button>

      <button
        onClick={toggleMusic}
        className="p-3 rounded-full border border-white/30 
                   bg-black/60 backdrop-blur-md 
                   text-white/80 hover:text-white hover:border-white/60 
                   hover:bg-black/80 transition-all duration-300 
                   shadow-lg hover:shadow-purple-300/30"
        aria-label={
          isMusicEnabled
            ? "Desativar música de fundo"
            : "Ativar música de fundo"
        }
      >
        {isMusicEnabled ? (
          <RiMusicFill className="w-6 h-6" />
        ) : (
          <RiMusicLine className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
