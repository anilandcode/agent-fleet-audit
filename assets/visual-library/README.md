# Agent Fleet Audit visual source library

This is the private, Git-tracked preservation library for the complete visual direction of Agent Fleet Audit. It is outside `public/`, so none of these source copies are served by the website.

## Contents

- `generated/masters/`: 37 original generated artworks, grouped by the visual iteration that produced them.
- `inspiration/`: copies of the 12 user-supplied reference screenshots retained in `Images/`.
- `manifest.json`: the authoritative record of source path, master path, format, dimensions, byte size, SHA-256 checksum, active/archived state, and public delivery pair when applicable.

## Preservation policy

Each master is the exact highest-resolution file currently recoverable in the repository: native WebP for responsive image families and original PNG or WebP for earlier assets. No asset has been upscaled, re-encoded, regenerated, cropped, or altered during preservation. The master SHA-256 must equal the source SHA-256 in `manifest.json`.

`public/media/agent-fleet/` remains the website delivery layer. Its active AVIF/WebP pairs are unchanged; archived images remain retained there for provenance. The files in `inspiration/` are reference-only and must not be served, copied into the product, or presented as Agent Fleet Audit artwork.

Before adding or replacing artwork, update this manifest, `docs/ASSET_INVENTORY.md`, and `DESIGN.md` together.
