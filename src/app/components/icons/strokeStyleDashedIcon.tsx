
"use client"

import clsx from "clsx";

export default function StrokeStyleDashedIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox={`0 0 ${24} ${24}`}
      className={clsx({ "rtl-mirror": true })}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g strokeWidth="2">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12h2" />
        <path d="M17 12h2" />
        <path d="M11 12h2" />
      </g>
    </svg>
  );
}