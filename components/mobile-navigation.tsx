"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";

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
    <m.button whileTap={{ scale: .92 }} type="button" className="mobile-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((current) => !current)}><span /><span /><span /></m.button>
    <AnimatePresence initial={false}>{open && <m.div initial={{ opacity: 0, y: -8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .98 }}>
      {links.map(([label, href], index) => <m.a initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .025 }} href={href} key={href} onClick={() => setOpen(false)}>{label}</m.a>)}
    </m.div>}</AnimatePresence>
  </div>;
}
