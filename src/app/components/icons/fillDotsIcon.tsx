
"use client"

import clsx from "clsx";

export default function FillDotsIcon() {
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
            d="m8 12.293-.12.12M5 15.293l-.12.12M11 9.293l-.12.12M14 6.293l-.12.12M11 12.293l-.12.12M14 9.293l-.12.12M14 12.293l-.12.12M8 15.293l-.12.12M11 15.293l-.12.12M14 15.293l-.12.12M11 6.293l-.12.12M8 9.293l-.12.12M5 12.293l-.12.12M8 6.293l-.12.12M5 9.293l-.12.12M5 6.293l-.12.12M9 10.88l-.12.12M6 13.88l-.12.12M12 7.88l-.12.12M15 4.88l-.12.12M12 10.88l-.12.12M15 7.88l-.12.12M15 10.88l-.12.12M9 13.88l-.12.12M12 13.88l-.12.12M15 13.88l-.12.12M12 4.88l-.12.12M9 7.88 8.88 8M6 10.88l-.12.12M9 4.88 8.88 5M6 7.88 5.88 8M6 4.88 5.88 5"
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