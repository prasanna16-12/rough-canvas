
"use client"

import clsx from "clsx";

export default function FillDashedIcon() {
  return (
    <>
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
        <g clipPath="url(#a)">
          <mask
            id="b"
            width={20}
            height={20}
            x={0}
            y={0}
            maskUnits="userSpaceOnUse"
            style={{
              maskType: "luminance",
            }}
          >
            <path fill="#fff" d="M0 0h20v20H0V0Z" />
          </mask>
          <g mask="url(#b)">
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.25}
              d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88A3.254 3.254 0 0 1 5.88 2.626l-.001-.001Z"
            />
          </g>
          <path
            stroke="#000"
            strokeLinecap="round"
            d="M8 12.293 9.293 11M5 15.293 6.293 14M11 9.293 12.293 8M14 6.293 15.293 5M11 12.293 12.293 11M14 9.293 15.293 8M14 12.293 15.293 11M8 15.293 9.293 14M11 15.293 12.293 14M14 15.293 15.293 14M11 6.293 12.293 5M8 9.293 9.293 8M5 12.293 6.293 11M8 6.293 9.293 5M5 9.293 6.293 8M5 6.293 6.293 5"
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