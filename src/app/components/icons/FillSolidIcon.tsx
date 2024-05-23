
"use client"

import clsx from "clsx";

export default function FillSolidIcon() {
  return (
    <>
     <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        viewBox={`0 0 ${20} ${20}`}
        className={clsx({ "rtl-mirror": true })}
        fill="black"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
      <g clipPath="url(#a)">
        <path
          d="M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
      </svg>
    </>
  );
}