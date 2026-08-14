# Generated asset inventory

## Storage policy

- **Active generated assets** remain in the public paths consumed by the application.
- **Unused generated variants** are retained under `public/media/agent-fleet/archive/unused/`; nothing is deleted solely because it is no longer selected.
- **User-supplied inspiration** remains under `Images/` and is never served by the application.
- **Visual source library** at `assets/visual-library/` preserves 37 generated masters and copies of all 12 references outside `public/`; its checksum-backed manifest proves that each copy is unchanged.
- Raster artwork contains no embedded Agent Fleet Audit copy, customer logos, provider marks, or copied third-party branding. Labels and diagrams are rendered in HTML/SVG.
- Active generated assets use AVIF with WebP fallback. The hero is preloaded; below-the-fold images are lazy loaded.

## Active generated assets

| Family | Assets | Current use |
| --- | --- | --- |
| `reference-clone/` | `unclear-ownership`, `invisible-handoffs`, `untraceable-context`, `late-policy-checks`, `uncontrolled-cost`, `missing-replay` | Six ownership/failure rail scenes |
| `visual-correction/` | `decision-record-architecture` | Capability mosaic wide evidence tile |
| `visual-correction/` | `architecture-tenant`, `architecture-collaboration`, `architecture-audit`, `architecture-routing` | Four architecture-board panels |
| `visual-correction/` | `ai-clear-world`, `ai-movement-memory`, `ai-signals-persist` | Owned-intelligence concept scenes |
| `visual-correction/` | `transition-quantum-core` | Full-screen topology transition |
| `visual-correction/` | `demo-memory`, `demo-agents`, `demo-policies`, `demo-approvals` | Four unique landing-demo tab states |
| `visual-expansion/` | `hero-intelligence` | Hero background and social metadata image |
| `visual-expansion/` | `editorial-intelligence` | Editorial intelligence and operational-memory card |
| `visual-expansion/` | `memory-context`, `memory-evidence` | Institutional-knowledge stack |

Every active basename has `.avif` and `.webp`, for 46 active generated files covering 23 image basenames.

## Archived unused generated variants

| Archive | Files | Reason retained |
| --- | --- | --- |
| `archive/unused/legacy/` | 10 early PNG/WebP assets | Earlier premium-redesign and atlas concepts; superseded by responsive AVIF/WebP assets |
| `archive/unused/reference-clone/` | `architecture-mosaic.avif/.webp` | Replaced by `decision-record-architecture` |
| `archive/unused/visual-expansion/` | `brand-lobby`, `brand-escalator`, `brand-gallery` AVIF/WebP pairs | Architectural brand-world direction replaced with AI concept scenes |

The archive contains 18 generated files. It is intentionally public only as repository source; no application code references these paths.

## Full-resolution recoverable master library

[`../assets/visual-library/`](../assets/visual-library/README.md) contains an exact private copy of every generated artwork in the highest-resolution format still locally available: 37 files in total. It also contains copies of the 12 inspiration references. `manifest.json` records each source and master file, dimensions, bytes, SHA-256 checksum, active/archived status, and public AVIF/WebP delivery files where relevant. No master has been resized, re-encoded, or regenerated.

## Inspiration references

`Images/` contains 12 user-supplied screenshots used for visual analysis. They are not generated deliverables and are not referenced by application code. They informed framing, type scale, negative space, material, image rhythm, and motion direction only. Exact copies are retained in `assets/visual-library/inspiration/` solely to make the complete visual archive portable within the private repository.

## Verification procedure

When assets change:

1. Search source for active image basenames.
2. Confirm each active AVIF and WebP exists.
3. Confirm no application reference points into `archive/unused` or `Images/`.
4. Run the production build and inspect network/image errors.
5. Update this inventory and `DESIGN.md` in the same commit.
