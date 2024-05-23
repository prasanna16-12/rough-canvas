
"use client"

import clsx from "clsx";

export default function FillZigZagIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox={`0 0 ${20} ${20}`}
      className={clsx({ "rtl-mirror": true })}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g strokeWidth={1.25}>
        <path d="M5.879 2.625h8.242a3.27 3.27 0 0 1 3.254 3.254v8.242a3.27 3.27 0 0 1-3.254 3.254H5.88a3.27 3.27 0 0 1-3.254-3.254V5.88A3.27 3.27 0 0 1 5.88 2.626l-.001-.001ZM4.518 16.118l7.608-12.83m.198 13.934 5.051-9.897M2.778 9.675l9.348-6.387m-7.608 12.83 12.857-8.793" />
      </g>
    </svg>
  );
}