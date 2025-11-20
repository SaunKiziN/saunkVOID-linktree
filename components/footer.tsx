"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="relative z-20 py-20 px-4 text-center border-t border-white/10">
      <p className="text-sm md:text-base font-light tracking-wider text-gray-500 italic">
        Crafted in the Void - 2025 ©SaunK
      </p>
      <div className="mt-8 flex justify-center gap-8 text-white/30 text-2xl">
        <span className="opacity-50">∞</span>
        <span className="opacity-30">◈</span>
        <span className="opacity-50">∞</span>
      </div>
    </footer>
  );
}
