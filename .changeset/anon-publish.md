---
"flowershow-skills": minor
---

Add anonymous publishing (flowershow/flowershow, bead flowershow-z4f): when the user isn't logged in and just wants a link, use `fl --anon --yes <path>` and paste the claim link to them verbatim (the site expires in 7 days unless claimed). Prefer `fl login` for anything to keep or use with a custom domain. Cloud and headless agents can authenticate with `FLOWERSHOW_TOKEN`. Requires fl 2.5.0+ for `--anon`.
