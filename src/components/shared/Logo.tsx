import { cn } from "@/lib/utils";
import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("w-8 h-8", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(30 50 50) translate(0 0)">
        <path
          d="M65 35 C 65 20, 35 20, 35 35"
          stroke="hsl(var(--primary))"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M65 65 C 65 80, 35 80, 35 65"
          stroke="hsl(var(--accent))"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="20"
          y="68"
          transform="rotate(-60 20 68)"
          fontSize="10"
          fill="hsl(var(--primary))"
          className="font-sans font-bold"
        >
          CTRL
        </text>
        <text
          x="80"
          y="32"
          transform="rotate(-60 80 32)"
          fontSize="10"
          fill="hsl(var(--accent))"
          className="font-sans font-bold"
        >
          CHAIN
        </text>
      </g>
    </svg>
  );
}
