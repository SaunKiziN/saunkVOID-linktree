"use client";

import React, { useEffect, useRef, useState } from "react";

const roundCoord = (value: number) => Number(value.toFixed(2));

export function CosmicBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const particleContainer = document.createElement("div");
    particleContainer.className = "fixed inset-0 pointer-events-none z-0";

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-white pointer-events-none";
      const size = Math.random() * 2 + 0.5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = String(Math.random() * 0.5 + 0.1);
      particle.style.animation = `particles ${15 + Math.random() * 8}s linear ${
        Math.random() * 3
      }s infinite`;
      particleContainer.appendChild(particle);
    }

    const leftOrnament = document.createElement("div");
    leftOrnament.className =
      "fixed left-4 top-32 text-white opacity-20 text-2xl pointer-events-none z-0";
    leftOrnament.textContent = "∞ ◈ ∞ ◈ ∞";

    const rightOrnament = document.createElement("div");
    rightOrnament.className =
      "fixed right-4 top-32 text-white opacity-20 text-2xl pointer-events-none z-0";
    rightOrnament.textContent = "∞ ◈ ∞ ◈ ∞";

    const galaxies = document.createElement("div");
    galaxies.className = "fixed inset-0 pointer-events-none z-0";
    for (let i = 0; i < 3; i++) {
      const galaxy = document.createElement("div");
      galaxy.className = "galaxy pointer-events-none";
      const size = Math.random() * 200 + 150;
      galaxy.style.width = `${size}px`;
      galaxy.style.height = `${size}px`;
      galaxy.style.left = `${Math.random() * 100}%`;
      galaxy.style.top = `${Math.random() * 100}%`;
      galaxy.style.border = "1px solid rgba(255, 255, 255, 0.2)";
      galaxy.style.borderRadius = "50%";

      const core = document.createElement("div");
      core.className =
        "galaxy-core absolute inset-4 border border-white/10 rounded-full pointer-events-none";
      galaxy.appendChild(core);
      galaxies.appendChild(galaxy);
    }

    document.body.appendChild(particleContainer);
    document.body.appendChild(leftOrnament);
    document.body.appendChild(rightOrnament);
    document.body.appendChild(galaxies);

    return () => {
      particleContainer.remove();
      leftOrnament.remove();
      rightOrnament.remove();
      galaxies.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      className="pointer-events-none"
    >
      <svg
        ref={svgRef}
        className="fixed inset-0 w-full h-full opacity-30 pointer-events-none -z-10"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M 0 200 Q 300 150 600 200 T 1200 200"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          className="animate-energy-wave"
          style={{ strokeDasharray: 1000 }}
        />
        <path
          d="M 0 400 Q 350 350 700 400 T 1400 400"
          stroke="white"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          className="animate-energy-wave"
          style={{ strokeDasharray: 1000, animationDelay: "0.5s" }}
        />
        <path
          d="M 0 600 Q 250 550 500 600 T 1000 600"
          stroke="white"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
          className="animate-energy-wave"
          style={{ strokeDasharray: 1000, animationDelay: "1s" }}
        />

        <circle
          cx="50%"
          cy="50%"
          r="80"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.15"
        />
        <circle
          cx="50%"
          cy="50%"
          r="120"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.08"
        />

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = roundCoord(600 + Math.cos(angle) * 100);
          const y1 = roundCoord(360 + Math.sin(angle) * 100);
          const x2 = roundCoord(600 + Math.cos(angle) * 300);
          const y2 = roundCoord(360 + Math.sin(angle) * 300);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth="0.5"
              opacity="0.15"
            />
          );
        })}
      </svg>
    </div>
  );
}
