// Custom line-icon set — drawn for NEXSTEG, not a generic icon font.
// All icons inherit currentColor and a consistent 24px stroke grid.
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const paths = {
  dumbbell: (
    <>
      <path d="M2 9v6M5 7v10M19 7v10M22 9v6" />
      <path d="M5 12h14" />
    </>
  ),
  group: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 14a5.5 5.5 0 0 1 3.5 5" />
    </>
  ),
  pulse: (
    <>
      <path d="M2 12h4l2-6 4 12 2.5-7 1.5 3H22" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16" />
      <path d="M4 20c4-6 8-9 12-10" />
    </>
  ),
  locker: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15" r="1" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2v20M4.2 7l15.6 10M19.8 7L4.2 17" />
      <path d="M9 4l3 2 3-2M9 20l3-2 3 2M4 10.5l.5 3.5M20 10.5l-.5 3.5" />
    </>
  ),
  sauna: (
    <>
      <rect x="3" y="11" width="18" height="9" rx="1.5" />
      <path d="M8 8c-1-1-1-2 0-3M12 8c-1-1-1-2 0-3M16 8c-1-1-1-2 0-3" />
    </>
  ),
  wave: (
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-2 1.2-4.2 2.5-6" />
      <path d="M9.5 16a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  steam: (
    <>
      <path d="M7 21c-1-1.4-1-2.6 0-4s1-2.6 0-4M12 21c-1-1.4-1-2.6 0-4s1-2.6 0-4M17 21c-1-1.4-1-2.6 0-4s1-2.6 0-4" />
      <path d="M4 8h16" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  play: <path d="M8 5v14l11-7z" />,
  check: <path d="M4 12.5l5 5 11-11" />,
  star: (
    <path
      d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9z"
      fill="currentColor"
      stroke="none"
    />
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.7-5A8 8 0 1 1 8 19.3z" />
      <path d="M9 9.5c.2 2 1.5 3.3 3.5 3.5M9 9.5c0-.6.4-1 1-1M15 13c.6 0 1-.4 1-1M12.5 13c.9.3 1.7.1 2.5-.5" />
    </>
  ),
  menu: <path d="M3 7h18M3 12h18M3 17h18" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  chevronDown: <path d="M5 9l7 7 7-7" />,
}

export function Icon({ name, size = 24, className = '', strokeWidth }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      {...base}
      width={size}
      height={size}
      strokeWidth={strokeWidth ?? base.strokeWidth}
      className={`icon icon--${name} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {d}
    </svg>
  )
}

export default Icon
