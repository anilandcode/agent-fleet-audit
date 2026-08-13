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
