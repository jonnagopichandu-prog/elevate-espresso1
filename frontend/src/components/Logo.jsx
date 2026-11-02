export default function Logo({ size = 34, withText = true, light = false }) {
  return (
    <span className={`logo${light ? ' logo-light' : ''}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#100B08" stroke="#E2A34E" strokeWidth="1.6" />
        <path d="M24 9c8.4 6 8.4 19 0 26-8.4-7-8.4-20 0-26z" fill="#E2A34E" />
        <path d="M24 13v18" stroke="#100B08" strokeWidth="1.8" />
      </svg>
      {withText && (
        <span className="logo-text">
          <span>Elevate</span>
          <span>Espresso</span>
        </span>
      )}
    </span>
  );
}
