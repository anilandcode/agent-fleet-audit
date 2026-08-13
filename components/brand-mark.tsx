type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return <span className={compact ? "brand-mark brand-mark-compact" : "brand-mark"} aria-label="Agent Fleet Audit">
    <svg viewBox="0 0 42 42" aria-hidden="true" focusable="false">
      <path d="M33.7 31.6A16.5 16.5 0 1 1 34.5 11" />
      <path d="M31.1 29.2A13 13 0 1 1 32.2 13" />
      <path d="M28.4 26.9A9.7 9.7 0 1 1 29.8 15.2" />
      <path d="M25.8 24.6A6.4 6.4 0 1 1 27.3 17.7" />
    </svg>
    {!compact && <span className="brand-mark-word">Agent Fleet Audit</span>}
  </span>;
}
