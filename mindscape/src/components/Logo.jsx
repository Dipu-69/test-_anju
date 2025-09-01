export default function Logo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-label="Mindscape logo" role="img">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#3f7eff" />
          <stop offset="100%" stopColor="#33d6a6" />
        </linearGradient>
      </defs>
      <path d="M12 12c0-4 3.5-8 8-8h24c9 0 16 7 16 16v4c0 9-7 16-16 16H29l-9 10c-1 1-3 0-3-1l2-9c-4-2-7-7-7-12V12z" fill="url(#g)" opacity="0.9" />
      <path d="M24 18c4-4 8-4 12 0M20 26c5-5 11-5 16 0M28 34c4-3 8-3 12 0" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  )
}