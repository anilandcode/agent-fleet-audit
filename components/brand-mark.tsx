type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return <span className={compact ? "brand-mark brand-mark-compact" : "brand-mark"} aria-label="Agent Fleet Audit">
    <svg viewBox="0 0 34 34" aria-hidden="true" focusable="false">
      <circle cx="17" cy="17" r="12.25" />
      <circle cx="17" cy="17" r="5.25" />
      <path d="M4.75 17h7M22.25 17h7M17 4.75v7M17 22.25v7" />
      <circle className="brand-mark-node" cx="26.6" cy="10.4" r="1.9" />
    </svg>
    {!compact && <span className="brand-mark-word">Agent Fleet <em>Audit</em></span>}
  </span>;
}
