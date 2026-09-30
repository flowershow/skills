# flowershow-skills

## 1.2.0

### Minor Changes

- [#1](https://github.com/flowershow/skills/pull/1) [`bfbd99f`](https://github.com/flowershow/skills/commit/bfbd99ff1af544aebb6c2005f47a2e5c8fdc2202) Thanks [@rufuspollock](https://github.com/rufuspollock)! - Pre-launch audit of the AI publishing workflow (flowershow/flowershow#1401):

  - Add CLI install steps (install script, no-sudo fallback, Windows) and warn against the deprecated npm packages.
  - Make `fl login` agent-friendly (run in background, read the URL, confirm with `fl whoami`).
  - Warn about first-publish name clashes: `fl` silently syncs into (and deletes files from) an existing site with the same name.
  - Treat HTML as a first-class publish target, with rules for assets, URLs, caching and HTML inside Markdown.
  - Add guidance for publishing docx/pdf/pptx etc. by converting to Markdown with pandoc or markitdown (phase 1 of flowershow/flowershow#1403).
  - Merge the config.json walkthrough from the retired `flowershow/agent-skills` `site-setup` skill.
  - Fix the premium key list (add `head`, clarify `showBuiltWithButton` and page-level `image`) and the dashboard URL (`https://cloud.flowershow.app`).
  - Keep `SKILL.md` `metadata.version` in sync with the release version, and add the missing `package-lock.json` so the release workflow's `npm ci` can run.

### Patch Changes

- [#3](https://github.com/flowershow/skills/pull/3) [`f53113d`](https://github.com/flowershow/skills/commit/f53113d26eae9d835343c95cc93440b8d79ebe91) Thanks [@rufuspollock](https://github.com/rufuspollock)! - Update for fl 2.4.0 (flowershow/flowershow#1406): `--yes` no longer overwrites an existing site with the same name; use `--name` or `--overwrite`. Exit codes are now reliable, including `fl whoami`.

## 1.1.0

### Minor Changes

- Initial release — moved from `flowershow/flowershow` monorepo to dedicated repo
