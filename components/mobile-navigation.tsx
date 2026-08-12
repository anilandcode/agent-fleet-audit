"use client";

import { useEffect, useState } from "react";

const links = [
  ["Platform", "#platform"],
  ["Controls", "#controls"],
  ["Engagements", "#engagements"],
  ["Request a diagnostic ↗", "#diagnostic"],
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnHashChange = () => setOpen(false);
    window.addEventListener("hashchange", closeOnHashChange);
    return () => window.removeEventListener("hashchange", closeOnHashChange);
  }, []);

  return <div className={open ? "mobile-menu open" : "mobile-menu"}>
    <button type="button" className="mobile-menu-toggle" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen((current) => !current)}><span /><span /><span /></button>
    <div>{links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}</div>
  </div>;
}
