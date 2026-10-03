---
name: flowershow
description: Help users publish and manage Flowershow sites. Use when the user wants to publish Markdown, HTML pages (reports, dashboards, AI-generated pages), notes, a digital garden, or documents (docx, pdf, pptx, converted to Markdown first) as a website, or when they want to configure their site (config.json, custom CSS, custom domain, comments, search, etc.), regardless of how they publish — via the fl CLI, a GitHub repository, or the Obsidian plugin.
metadata:
  author: flowershow
  version: "1.4.0"
---

# Flowershow

Flowershow turns a folder of files into a website. Markdown (`.md`, `.mdx`) is rendered with the site's theme and navigation. HTML (`.html`) is a first-class publish target: it is served exactly as written, with the CSS, JavaScript, JSON and images it references. Both can live side by side in one folder.

## Detect publishing method first

Before doing anything else, establish how the user publishes their site. There are three paths:

| Method | Description | CLI needed? |
|--------|-------------|-------------|
| **CLI** | User runs `fl` locally to push a local folder | Yes |
| **GitHub** | Site is connected to a GitHub repo; Flowershow builds on push | No |
| **Obsidian plugin** | User publishes from inside an Obsidian vault | No |

If it's not obvious from context, ask: *"Do you publish from a local folder using the fl CLI, from a GitHub repository, or from Obsidian?"* A user who just wants "a URL for this file" and has no site yet should use the CLI.

- For **GitHub** and **Obsidian** users: skip all CLI sections below. Work only with `config.json`, `custom.css`, and the dashboard. Provide instructions they can follow directly in their repo or vault.
- For **CLI** users: proceed with the full skill.

**Can't run `fl`?** In chat apps such as claude.ai and ChatGPT, the sandbox often has no network access, so `fl` can't install or publish. If the Flowershow connector is available to you (a `publish` tool from Flowershow), use it instead: it publishes the files you pass and returns a live URL and a claim link, with no account needed. Paste both links to the user verbatim. If it isn't available, tell the user they can add it in their app's connector settings with the URL `https://flowershow.app/api/mcp` (beta, see https://flowershow.app/docs/agents/mcp), or prepare the files for them to publish with `fl` themselves.

---

## CLI only — skip for GitHub/Obsidian users

### Install the CLI

The CLI is a single Go binary called `fl` (also installed as `flowershow`). Check for it first:

```bash
fl --version
```

If it's missing, install it (macOS / Linux):

```bash
curl -fsSL https://raw.githubusercontent.com/flowershow/flowershow/main/apps/cli/install.sh | sh
```

The script installs to `/usr/local/bin` and uses `sudo` if that isn't writable. If you can't run `sudo` (no password prompt available to you), install to a user directory instead, choosing the archive for the platform (`darwin` or `linux`, `arm64` or `amd64`):

```bash
mkdir -p ~/.local/bin
curl -fsSL https://github.com/flowershow/flowershow/releases/latest/download/fl_darwin_arm64.tar.gz | tar xz -C ~/.local/bin fl
export PATH="$HOME/.local/bin:$PATH"
```

On Windows, download `fl_windows_amd64.zip` or `fl_windows_arm64.zip` from https://github.com/flowershow/flowershow/releases/latest and put `fl.exe` on the `PATH`.

**Do not** install the npm packages `flowershow` or `@flowershow/publish`. They are the old, deprecated Node CLI.

### Authentication

```bash
fl whoami
```

It prints `Logged in as: <username>` and exits 0, or `Not authenticated` and exits 1 (fl 2.4.0+; older versions exit 0 either way, so read the output).

If not authenticated:
1. Run `fl login`. It prints a URL like `https://cloud.flowershow.app/cli/verify?code=ABCD-1234`, then waits (up to 15 minutes) for the user to approve. Run it in the background or redirect its output to a file so you can read the URL while it waits, e.g. `fl login > /tmp/fl-login.txt 2>&1 &`.
2. Show the user the URL and ask them to open it and approve.
3. When they say they're done, confirm with `fl whoami`.

No account yet? Direct the user to https://cloud.flowershow.app to sign up first.

**Just want a link now, without an account?** If the user isn't logged in and only wants something online quickly, publish anonymously (needs fl 2.5.0+; check with `fl --version` and upgrade with the install script above if older):

```bash
fl --anon --yes ./my-report
```

It prints `✓ Published (no account): <live URL>` and `Claim it to keep it (expires <date>): <claim URL>`. **Paste both to the user verbatim**, and tell them the site expires in 7 days unless they open the claim link (and sign in or sign up) to keep it. Re-running on the same folder updates the same URL; the claim token is saved in the folder's `.flowershow`, so don't commit that file to a public repo. Limits: 200 files, 50 MB. Anonymous sites aren't indexed by search engines.

If `fl --anon` later says the site *has been added to a Flowershow account*, the user claimed it: don't publish a new anonymous site. Ask them to run `fl login` (with the account they claimed it into), then publish the same folder without `--anon` to update their site. If it says the site *expired or was deleted*, re-running creates a new anonymous site.

Prefer `fl login` for anything the user wants to keep or put on a custom domain. `fl` never publishes anonymously unless you pass `--anon`.

**Cloud or headless agents** (no browser to approve `fl login`): have the user create a personal access token at https://cloud.flowershow.app/tokens and set it as `FLOWERSHOW_TOKEN=fs_pat_…` in the environment, then run `fl` as usual. Never print or commit the token.

### Publishing content

```bash
fl --yes ./my-notes                    # publish a folder
fl --yes ./note.md                     # publish a single file
fl --yes ./report.html                 # publish a single HTML page
fl --name my-site --yes ./my-notes     # set a custom site name on first publish
```

- `--yes` skips the new-site name prompt. It never overwrites an existing site.
- **Name clashes on first publish.** The site name defaults to the folder or file name (`./notes` → `notes`). If a site with that name already exists and the path isn't linked to it, fl 2.4.0+ refuses with `A site named ... already exists` and exits 1. Then either pick a new name with `--name <new-name>`, or, only if the user explicitly wants to replace that site, use `--overwrite` (it syncs to the site and **deletes its files that aren't in the local path**). Run `fl list` first if unsure. Older versions (check `fl --version`) silently sync into the existing site, so update fl or check `fl list` before a first publish. Re-publishing a single file into its existing site also needs `--overwrite`, since single files aren't linked.
- After the first publish the name is saved in `.flowershow` inside the folder (folders only). Re-running on the same path syncs only new, modified and deleted files.
- The site URL is printed at the end, in the form `https://<site-name>-<username>.flowershow.me`. Pages can take a few seconds to appear after the CLI reports success; if the first request 404s, wait and retry before debugging.
- fl 2.4.0+ exits non-zero on failure, so you can rely on the exit code. Older versions can exit 0 on errors; there, check the output for `✗ Error`.
- Multiple paths (`fl a.md b.md`) are flattened to their file names, so `css/style.css` is published as `/style.css`. To keep a directory structure (anything with relative links to subfolders), publish the folder.

### Site management

```bash
fl list                          # list all sites
fl settings                      # view settings (uses .flowershow config)
fl settings --name <site-name>   # explicit site name
fl delete --yes <site-name>      # delete a site
```

Settings include: plan, privacy mode, comments, search, GitHub connection, custom domain.

`fl delete` is permanent. Only delete a site the user has explicitly named.

---

## Publishing HTML

HTML is a first-class target. When you or the user have an HTML page (a report, dashboard, slide deck, interactive explainer), publish it as-is; don't convert it to Markdown.

- `.html` files are served byte-for-byte, with no Flowershow theme, navbar, footer or `custom.css`. Scripts run, and relative links to `.css`, `.js`, `.json`, images and other files in the same folder work.
- For a page with separate CSS/JS/data files, put them all in one folder and publish the folder: `fl --yes ./my-report`. Keep references relative (`css/style.css`, not `/Users/...` or `file://`).
- A self-contained single file (inline `<style>` and `<script>`) can be published on its own: `fl --yes ./report.html`.
- HTML URLs keep the extension: `https://<site>/about.html`, not `/about`. Link between pages with `about.html`. A site's root redirects to `index.html` (or to the file, for a single-file site).
- HTML and Markdown can be mixed in one folder: `.md` pages get the site layout, `.html` pages are served raw.
- If you change a CSS, JS or image file and republish, the old version can stay cached for several minutes. If a change must show immediately, rename the file (e.g. `style.v2.css`) and update the reference.

If the user wants an HTML section *inside* a normal site page (keeping the navbar and theme), write it in a `.md` file instead. Rules: no blank lines inside an HTML block, don't indent HTML by 4+ spaces (it becomes a code block), `<style>` blocks work, `<script>` tags in Markdown pages do **not** run (use a standalone `.html` file for anything interactive). Add `layout: plain` in frontmatter to drop the default typography styles. See https://flowershow.app/docs/agents/html.md for details.

## Publishing other documents (docx, pdf, pptx, …)

Flowershow publishes Markdown and HTML, not Office files or PDFs. If the user wants to publish a `.docx`, `.pptx`, `.xlsx`, `.odt`, `.epub`, `.ipynb` or `.pdf`, convert it to Markdown locally first, then publish the resulting folder:

1. Make a folder for the site, e.g. `./report-site/`.
2. Convert, keeping images in an `assets` folder:
   - **pandoc** (docx, pptx, xlsx, odt, epub, ipynb):
     ```bash
     cd report-site
     pandoc ../report.docx -t gfm-raw_html --wrap=none --extract-media=assets -o index.md
     ```
     Images land in `assets/media/` and are linked from the Markdown.
   - **markitdown** (also handles pdf): `pip install 'markitdown[all]'`, then `markitdown ../report.pdf -o report-site/index.md`. It extracts text and tables, not images; if images matter, extract them separately (e.g. `pdfimages -png report.pdf report-site/assets/img`) and add links.
3. Add a frontmatter `title:` if the document has no top-level heading, and skim the result for broken tables or stray formatting.
4. Publish: `fl --yes ./report-site` (after the name-clash check).

If neither tool is installed, ask before installing one (`brew install pandoc`, `apt install pandoc`, or `pip install 'markitdown[all]'`). For a document that is mostly layout (a designed PDF, a slide deck), ask whether the user would rather publish it as HTML.

---

## Site configuration — all publishing methods

Add a `config.json` to the root of the published folder to configure the site (title, navbar, footer, social links, theme, sidebar, search, and more). Values override dashboard settings and are version-controlled with the content.

> **Never guess config.json options.** Fetch the authoritative schema first:
> ```
> fetch https://flowershow.app/docs/reference/config-file.md
> ```
> For themes, fetch https://flowershow.app/docs/reference/themes.md (only the theme names listed there exist).

When setting up or changing config:
1. Check for an existing `config.json` first. If there is one, read it and update it rather than replacing it.
2. Ask about one area at a time (basics, theme, navbar, footer, features), not everything at once.
3. Only include fields the user has given values for. No empty arrays or placeholder values.
4. Show the user the result and ask if they want to adjust anything, then republish (CLI) or tell them to commit/sync (GitHub/Obsidian).

> **Some features are premium-only.** Even if a feature is correctly configured in `config.json`, it will silently have no effect unless the site is on the Premium plan (`fl settings` shows the plan). If a configured feature isn't working, check the plan before debugging the config. `config-file.md` marks premium keys with ⭐️; treat that as authoritative.
>
> Premium `config.json` keys (as of this skill version):
> - `enableSearch` — full-text search
> - `showBuiltWithButton` — on Premium the "Built with Flowershow" badge is hidden by default; set `true` to show it. On Free it is always shown.
> - `favicon` — custom favicon
> - `image` — default social share image (the page-level `image` frontmatter field is premium too)
> - `head` — custom HTML injected into `<head>` (scripts, meta tags)

## Custom styles

Add a `custom.css` to the root folder to override visual styles. Flowershow uses CSS cascade layers, so rules in `custom.css` win without `!important`. `custom.css` applies to Markdown pages, not to standalone `.html` files.

> **Never guess CSS variable names.** Fetch the reference first:
> ```
> fetch https://flowershow.app/docs/reference/custom-styles.md
> ```
>
> For complex styling, also check the source CSS:
> - https://raw.githubusercontent.com/flowershow/flowershow/refs/heads/main/apps/flowershow/styles/default-theme.css
> - https://raw.githubusercontent.com/flowershow/flowershow/refs/heads/main/apps/flowershow/styles/callouts.css

## Step-by-step guidance for complex setups

Some operations require actions in a web dashboard, a third-party service, or DNS settings — not something the agent can do directly. Users may not be tech-savvy. **Always provide explicit, numbered step-by-step instructions** for these situations. Do not assume the user knows where to click or what to do next.

This applies to:
- **Comments (Giscus)** — requires installing the Giscus GitHub App and creating a Discussions-enabled repo. Walk the user through: enabling Discussions on the repo, installing the app at https://github.com/apps/giscus, granting it access, then filling in the config.
- **Custom domain** — requires adding DNS records at their domain registrar. Spell out exactly which record type (CNAME or A), the name/host value, and the target value to enter, and warn that DNS can take up to 48 hours to propagate.
- **Password protection** — done entirely in the dashboard. Walk the user to the right settings page and tell them exactly which field to fill in.
- **GitHub repository connection** — walk the user through the dashboard flow step by step.
- **Billing / plan upgrades** — direct the user to the billing page and describe what they'll see.

When in doubt, over-explain rather than under-explain. A user who already knows the steps can skip ahead; a user who doesn't will be stuck without guidance.

## Dashboard only

These require the dashboard at https://cloud.flowershow.app (`fl list` prints a direct dashboard link for each site) — not available in config files or the CLI:
- Setting or changing a site password ⭐ premium
- Billing and plan management
- Connecting a GitHub repository
- Custom domain DNS verification ⭐ premium

## Reading docs

Fetch raw Markdown instead of HTML — faster and cleaner. Append `.md` to the page URL:
```
https://flowershow.app/docs/some/page  →  fetch https://flowershow.app/docs/some/page.md
```

If that fails (landing pages served at directory URLs), fall back to the plain URL for rendered HTML.

Flowershow has many page-level and content features beyond CLI and config. **Never guess — always fetch the relevant doc first.**

To discover all available docs, fetch the sitemap:
```
fetch https://flowershow.app/docs/sitemap.md
```

This is an auto-generated index of every docs page with titles and descriptions. Use it to find the right page, then fetch that page's `.md` URL for full details.
