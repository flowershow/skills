# flowershow-skills

## 1.5.0

### Minor Changes

- [#8](https://github.com/flowershow/skills/pull/8) [`7687fc3`](https://github.com/flowershow/skills/commit/7687fc3a4a772b5c7bba26f420603d106a069446) Thanks [@rufuspollock](https://github.com/rufuspollock)! - Get reviewer feedback with annotations: publish with `fl --annotations`, read notes with `fl annotations pull`, apply them and `fl annotations resolve`.

## 1.4.0

### Minor Changes

- [#6](https://github.com/flowershow/skills/pull/6) [`a1acf18`](https://github.com/flowershow/skills/commit/a1acf182c7c849f32fa2468efba34c34ce9738d4) Thanks [@rufuspollock](https://github.com/rufuspollock)! - Point chat apps that can't run `fl` (claude.ai, ChatGPT) to the Flowershow connector (beta, flowershow/flowershow bead flowershow-5fv): use its `publish` tool when available, otherwise tell the user to add `https://flowershow.app/api/mcp` in their connector settings.

## 1.3.0

### Minor Changes

- [#4](https://github.com/flowershow/skills/pull/4) [`d3c51b8`](https://github.com/flowershow/skills/commit/d3c51b8fc3884a4c3ce78552db156c3a7452c21d) Thanks [@rufuspollock](https://github.com/rufuspollock)! - Add anonymous publishing (flowershow/flowershow, bead flowershow-z4f): when the user isn't logged in and just wants a link, use `fl --anon --yes <path>` and paste the claim link to them verbatim (the site expires in 7 days unless claimed). Prefer `fl login` for anything to keep or use with a custom domain. Cloud and headless agents can authenticate with `FLOWERSHOW_TOKEN`. Requires fl 2.5.0+ for `--anon`.

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
