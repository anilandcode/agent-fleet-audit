const terrainLines = Array.from({ length: 23 }, (_, index) => {
  const y = 154 + index * 7.2;
  const crest = 16 + Math.sin(index * .48) * 13;
  return `M70 ${y.toFixed(1)} C210 ${(y - crest).toFixed(1)} 268 ${(y - 55 - crest).toFixed(1)} 410 ${(y - 25).toFixed(1)} S640 ${(y + 44 - crest).toFixed(1)} 810 ${(y - 18).toFixed(1)} S1040 ${(y - 38 + crest).toFixed(1)} 1130 ${y.toFixed(1)}`;
});

export function HeroTerrain() {
  return <div className="hero-terrain" aria-hidden="true">
    <svg viewBox="0 0 1200 420" preserveAspectRatio="none">
      <defs><linearGradient id="terrainStroke" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#EAD096" stopOpacity="0" /><stop offset=".22" stopColor="#EAD096" stopOpacity=".2" /><stop offset=".54" stopColor="#F4F1E8" stopOpacity=".78" /><stop offset=".84" stopColor="#EAD096" stopOpacity=".18" /><stop offset="1" stopColor="#EAD096" stopOpacity="0" /></linearGradient><radialGradient id="terrainGlow"><stop offset="0" stopColor="#F4F1E8" /><stop offset="1" stopColor="#EAD096" stopOpacity=".1" /></radialGradient></defs>
      {terrainLines.map((d, index) => <path className="terrain-line" d={d} key={index} />)}
      <path className="terrain-route" d="M64 82H250C300 82 302 128 350 128H492" /><path className="terrain-route terrain-route-right" d="M730 96H892C936 96 944 55 994 55H1140" />
      {[[250,82],[350,128],[892,96],[994,55],[580,188],[680,224]].map(([cx,cy], index) => <circle className="terrain-node" cx={cx} cy={cy} r={index > 3 ? 4 : 2.7} key={`${cx}-${cy}`} />)}
    </svg>
    <span className="terrain-chip terrain-chip-a">CONTEXT</span><span className="terrain-chip terrain-chip-b">POLICY</span><span className="terrain-chip terrain-chip-c">EVIDENCE</span>
  </div>;
}

export function ArchitectureFlow() {
  return <svg className="architecture-flow" viewBox="0 0 650 760" aria-hidden="true">
    <defs><linearGradient id="architectureStroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EAD096" stopOpacity=".06" /><stop offset=".5" stopColor="#F4F1E8" stopOpacity=".56" /><stop offset="1" stopColor="#EAD096" stopOpacity=".08" /></linearGradient></defs>
    <g className="architecture-grid">{Array.from({ length: 10 }, (_, i) => <path d={`M${45 + i * 62} 32V728`} key={`v${i}`} />)}{Array.from({ length: 12 }, (_, i) => <path d={`M28 ${45 + i * 59}H622`} key={`h${i}`} />)}</g>
    <g className="architecture-lines">{Array.from({ length: 13 }, (_, i) => <path d={`M54 ${170 + i * 19} C190 ${120 + i * 8} 244 ${285 - i * 6} 352 ${308 - i * 3} S510 ${410 - i * 9} 602 ${224 + i * 15}`} key={i} />)}</g>
    <circle className="architecture-core" cx="116" cy="302" r="72" /><circle className="architecture-ring" cx="116" cy="302" r="102" />
    <path className="architecture-route" d="M116 302H272C326 302 321 225 374 225H574" /><path className="architecture-route" d="M116 302H282C344 302 336 474 398 474H574" />
    {[[116,302],[272,302],[374,225],[398,474],[574,225],[574,474]].map(([cx,cy]) => <circle className="architecture-node" cx={cx} cy={cy} r="4" key={`${cx}-${cy}`} />)}
  </svg>;
}

const topologyNodes = [[300,138],[450,72],[600,138],[600,318],[450,390],[300,318],[450,228],[365,185],[535,185],[365,278],[535,278]];
const topologyEdges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[7,8],[8,10],[10,9],[9,7],[7,6],[8,6],[9,6],[10,6]];

export function FleetTopology() {
  return <svg className="fleet-topology" viewBox="0 0 900 470" aria-hidden="true"><defs><linearGradient id="topologyStroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#50544B" stopOpacity=".18" /><stop offset=".55" stopColor="#EAD096" stopOpacity=".58" /><stop offset="1" stopColor="#F4F1E8" stopOpacity=".14" /></linearGradient><radialGradient id="topologyNode"><stop offset="0" stopColor="#F4F1E8" /><stop offset="1" stopColor="#EAD096" stopOpacity=".16" /></radialGradient></defs><g className="topology-edges">{topologyEdges.map(([a,b],i) => <line x1={topologyNodes[a][0]} y1={topologyNodes[a][1]} x2={topologyNodes[b][0]} y2={topologyNodes[b][1]} key={i} />)}</g><g className="topology-nodes">{topologyNodes.map(([cx,cy],i) => <circle cx={cx} cy={cy} r={i === 6 ? 7 : 3.5} key={i} />)}</g></svg>;
}

export function PlatformTraceMap() {
  return <svg className="platform-trace-map" viewBox="0 0 760 330" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="platformTrace" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EAD096" stopOpacity=".08" /><stop offset=".5" stopColor="#EAD096" stopOpacity=".72" /><stop offset="1" stopColor="#EAD096" stopOpacity=".06" /></linearGradient></defs><path className="trace-path" d="M18 82H150C202 82 190 158 246 158H370" /><path className="trace-path" d="M18 256H162C218 256 210 184 270 184H370" /><path className="trace-path" d="M390 158H514C568 158 554 78 612 78H744" /><path className="trace-path" d="M390 184H534C584 184 576 264 628 264H744" />{[[150,82],[162,256],[370,171],[612,78],[628,264]].map(([cx,cy]) => <circle className="system-node" cx={cx} cy={cy} r="4" key={`${cx}-${cy}`} />)}</svg>;
}
