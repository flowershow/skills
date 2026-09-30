---
"flowershow-skills": minor
---

Pre-launch audit of the AI publishing workflow (flowershow/flowershow#1401):

- Add CLI install steps (install script, no-sudo fallback, Windows) and warn against the deprecated npm packages.
- Make `fl login` agent-friendly (run in background, read the URL, confirm with `fl whoami`).
- Warn about first-publish name clashes: `fl` silently syncs into (and deletes files from) an existing site with the same name.
- Treat HTML as a first-class publish target, with rules for assets, URLs, caching and HTML inside Markdown.
- Add guidance for publishing docx/pdf/pptx etc. by converting to Markdown with pandoc or markitdown (phase 1 of flowershow/flowershow#1403).
- Merge the config.json walkthrough from the retired `flowershow/agent-skills` `site-setup` skill.
- Fix the premium key list (add `head`, clarify `showBuiltWithButton` and page-level `image`) and the dashboard URL (`https://cloud.flowershow.app`).
- Keep `SKILL.md` `metadata.version` in sync with the release version, and add the missing `package-lock.json` so the release workflow's `npm ci` can run.
