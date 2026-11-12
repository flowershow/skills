# Flowershow plugin for Claude Code

Publish what you made in an AI session as a live website: Markdown, HTML pages, notes and docs, with or without a [Flowershow](https://flowershow.app) account. Say "publish this" or "put this online" and get a link.

## Install

```bash
/plugin install flowershow --marketplace flowershow/skills
# or: claude plugin marketplace add flowershow/skills && claude plugin install flowershow@flowershow
```

## What it contains

- `skills/flowershow/SKILL.md`: the Flowershow skill. It tells Claude how to publish a folder or file with the `fl` CLI or the Flowershow connector, show you the file list before publishing, publish without an account and hand you the claim link, convert documents to Markdown, and configure a site (`config.json`, `custom.css`, custom domain, comments).
- `.mcp.json`: the remote Flowershow MCP server, `https://flowershow.app/api/mcp`.

## What it runs, sends and fetches

The plugin has no hooks, scripts or bundled code. Everything it sends goes to Flowershow, and only when you ask to publish:

- **Flowershow connector**: the MCP server's `publish` tool uploads the files you ask Claude to publish to Flowershow, which serves them as a public website. Sites published without an account get a random address and a claim link, and expire after 7 days unless claimed.
- **`fl` CLI**: the skill installs `fl` from the [flowershow/flowershow](https://github.com/flowershow/flowershow) GitHub releases (via `apps/cli/install.sh`) and runs it to publish the folder or file you choose to flowershow.app. `fl login` signs in through cloud.flowershow.app in your browser.
- **Docs**: the skill fetches pages from `https://flowershow.app/docs` (`.md` versions) to look up configuration details.

Privacy policy: [flowershow.app/privacy](https://flowershow.app/privacy). Help: [flowershow.app/support](https://flowershow.app/support). Source: [github.com/flowershow/skills](https://github.com/flowershow/skills). License: MIT.
