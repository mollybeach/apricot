import * as React from 'react';

const SvgCheckIcon = (props: any) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
      fill="#34D399"
    />
  </svg>
);

const SvgCrossIcon = (props: any) => (
  <svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.293.293a1 1 0 0 1 1.414 0L6 4.586 10.293.293a1 1 0 1 1 1.414 1.414L7.414 6l4.293 4.293a1 1 0 0 1-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L4.586 6 .293 1.707a1 1 0 0 1 0-1.414Z"
      fill="#10B981"
    />
  </svg>
);

const SvgWhiteCrossIcon = (props: any) => (
  <svg
    width={12}
    height={12}
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.293.293a1 1 0 0 1 1.414 0L6 4.586 10.293.293a1 1 0 1 1 1.414 1.414L7.414 6l4.293 4.293a1 1 0 0 1-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L4.586 6 .293 1.707a1 1 0 0 1 0-1.414Z"
      fill="white"
    />
  </svg>
);

const SvgSearchIcon = (props: any) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM0 6a6 6 0 1 1 10.89 3.477l4.817 4.816a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 0 6Z"
      fill="#9CA3AF"
    />
  </svg>
);

const SvgGalleryIcon = (props: any) => (
  <svg
    width={39}
    height={38}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.5 5h-16a4 4 0 0 0-4 4v20m0 0v4a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4v-8m-32 4 9.172-9.172a4 4 0 0 1 5.656 0L21.5 25m12-8v8m0 0-3.172-3.172a4 4 0 0 0-5.656 0L21.5 25m0 0 4 4m4-24h8m-4-4v8m-12 4h.02"
      stroke="#6B7280"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export {
  SvgCrossIcon,
  SvgWhiteCrossIcon,
  SvgCheckIcon,
  SvgSearchIcon,
  SvgGalleryIcon,
};
