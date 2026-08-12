export function HeroSystemMap() {
  return <div className="hero-system-map" aria-hidden="true">
    <svg viewBox="0 0 920 620" preserveAspectRatio="none">
      <defs>
        <linearGradient id="heroTrace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#EAD096" stopOpacity="0" />
          <stop offset=".42" stopColor="#EAD096" stopOpacity=".72" />
          <stop offset="1" stopColor="#EAD096" stopOpacity=".08" />
        </linearGradient>
        <radialGradient id="heroNode"><stop offset="0" stopColor="#FFF8E8" /><stop offset="1" stopColor="#EAD096" stopOpacity=".15" /></radialGradient>
      </defs>
      <path className="trace-path" d="M36 170H232C266 170 270 220 306 220H442" />
      <path className="trace-path" d="M174 484H340C382 484 374 402 418 402H592" />
      <path className="trace-path trace-path-soft" d="M530 96H742C790 96 792 142 836 142H900" />
      <path className="trace-path trace-path-soft" d="M594 516H760C794 516 804 454 838 454H905" />
      <circle className="system-node" cx="232" cy="170" r="4" /><circle className="system-node" cx="340" cy="484" r="4" />
      <circle className="system-node" cx="742" cy="96" r="4" /><circle className="system-node" cx="838" cy="454" r="4" />
      <circle className="system-node system-node-large" cx="574" cy="310" r="11" />
    </svg>
    <span className="system-tag tag-memory">Shared memory</span><span className="system-tag tag-policy">Policy gate</span>
    <span className="system-tag tag-evidence">Evidence trail</span><span className="system-tag tag-approval">Human approval</span>
  </div>;
}

export function PlatformTraceMap() {
  return <svg className="platform-trace-map" viewBox="0 0 760 330" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="platformTrace" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EAD096" stopOpacity=".08" /><stop offset=".5" stopColor="#EAD096" stopOpacity=".72" /><stop offset="1" stopColor="#EAD096" stopOpacity=".06" /></linearGradient></defs>
    <path className="trace-path" d="M18 82H150C202 82 190 158 246 158H370" /><path className="trace-path" d="M18 256H162C218 256 210 184 270 184H370" />
    <path className="trace-path" d="M390 158H514C568 158 554 78 612 78H744" /><path className="trace-path" d="M390 184H534C584 184 576 264 628 264H744" />
    {[[150, 82], [162, 256], [370, 171], [612, 78], [628, 264]].map(([cx, cy]) => <circle className="system-node" cx={cx} cy={cy} r="4" key={`${cx}-${cy}`} />)}
  </svg>;
}
