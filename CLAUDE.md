# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml` / `pnpm-lock.yaml`), not npm.

- `pnpm dev` — start Remotion Studio (preview/editor at localhost).
- `pnpm build` — bundle the project (`remotion bundle`).
- `pnpm lint` — runs `eslint src` **and** `tsc`; this is the typecheck path since `tsc` has `noEmit`. Run this to verify changes.
- `pnpm upgrade` — upgrade Remotion (keep all `remotion`/`@remotion/*` packages on the same pinned version).
- Render a video: `pnpm exec remotion render <comp-id>` (e.g. `MyComp`).

## Architecture

Standard Remotion entrypoint chain:

- `src/index.ts` calls `registerRoot(RemotionRoot)` — the single registration point.
- `src/Root.tsx` (`RemotionRoot`) declares each video via `<Composition>`, wiring an `id`, the React `component`, and timing (`durationInFrames`, `fps`, `width`, `height`). **New videos are added here as additional `<Composition>` entries.**
- `src/Composition.tsx` holds the actual frame-rendered React component. Each composition is a normal React component; use Remotion hooks (`useCurrentFrame`, `interpolate`, etc.) to drive animation from the frame number.

`src/index.css` is imported at the top of `Root.tsx`; `package.json` marks `*.css` as `sideEffects` so it survives bundling.

## Conventions specific to this repo

- **Versions are pinned and locked together.** `remotion`, `@remotion/cli`, `@remotion/tailwind-v4`, etc. are all on the exact same version (currently `4.0.477`), and `pnpm-workspace.yaml`'s `minimumReleaseAgeExclude` lists each one. When bumping Remotion, bump them all to the matching version.
- **Tailwind v4** is enabled by `Config.overrideWebpackConfig(enableTailwind)` in `remotion.config.ts` — not via a PostCSS/Tailwind config file. Tailwind classes work in composition components through this webpack override.
- `remotion.config.ts` is excluded from `tsconfig.json` and config options there do **not** apply when rendering via the Node APIs (pass options directly instead).
- TypeScript is `strict` with `noUnusedLocals`; React 19 with the automatic JSX runtime (`jsx: react-jsx`), so no `import React` needed.
