"use client";

import { useRef } from "react";

const links = [
  ["Platform", "#platform"],
  ["Controls", "#controls"],
  ["Engagements", "#engagements"],
  ["Request a diagnostic ↗", "#diagnostic"],
];

export function MobileNavigation() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    detailsRef.current?.removeAttribute("open");
  }

  return <details className="mobile-menu" ref={detailsRef}>
    <summary aria-label="Open navigation"><span /><span /><span /></summary>
    <div>{links.map(([label, href]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}</div>
  </details>;
}
