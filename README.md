# Flowershow Skills

[![skills.sh](https://skills.sh/b/flowershow/skills)](https://skills.sh/flowershow/skills)

Agent skills for [Flowershow](https://flowershow.app) — gives your AI assistant everything it needs to publish and manage Flowershow sites.

This is the only maintained Flowershow skill repo. The older `flowershow/agent-skills` repo (with a `site-setup` skill) is superseded; its config walkthrough is now part of `SKILL.md` here.

## Installation

The skill is a single file, [`SKILL.md`](https://raw.githubusercontent.com/flowershow/skills/main/SKILL.md). No Node.js or npm needed: installing it just means putting that file in your agent's skills folder.

**Easiest: ask your agent** (Claude Code, Codex, Cursor or any agent with a terminal):

> Install the Flowershow skill from https://raw.githubusercontent.com/flowershow/skills/main/SKILL.md into your skills folder.

**Or with one command:**

```bash
# Claude Code
mkdir -p ~/.claude/skills/flowershow && curl -fsSL https://raw.githubusercontent.com/flowershow/skills/main/SKILL.md -o ~/.claude/skills/flowershow/SKILL.md

# Codex (and other agents that read ~/.agents/skills)
mkdir -p ~/.agents/skills/flowershow && curl -fsSL https://raw.githubusercontent.com/flowershow/skills/main/SKILL.md -o ~/.agents/skills/flowershow/SKILL.md

# Cursor
mkdir -p ~/.cursor/skills/flowershow && curl -fsSL https://raw.githubusercontent.com/flowershow/skills/main/SKILL.md -o ~/.cursor/skills/flowershow/SKILL.md
```

For the Claude apps (claude.ai, desktop, mobile) and ChatGPT, download [flowershow.zip](https://github.com/flowershow/skills/releases/latest/download/flowershow.zip) and upload it in the app's skills settings. See [flowershow.app/docs/agents/supported-agents](https://flowershow.app/docs/agents/supported-agents) for per-agent steps.

**As a plugin** (skill plus the Flowershow MCP connector):

```bash
# Claude Code
/plugin install flowershow --marketplace flowershow/skills
# or: claude plugin marketplace add flowershow/skills && claude plugin install flowershow@flowershow

# Codex
codex plugin marketplace add flowershow/skills
```

The repo carries manifests for Claude Code (`.claude-plugin/`), Cursor (`.cursor-plugin/`) and Codex (`.codex-plugin/`, `.agents/plugins/`). The root `SKILL.md` is canonical; `skills/flowershow/SKILL.md` is a copy kept in sync by `scripts/sync-skill-version.mjs` (CI fails if they drift).

**Optional, if you already use Node.js:** `npx skills add flowershow/skills --global` installs it for every agent it detects (add `-y -a claude-code -a codex -a cursor` to skip the prompts).

## What the skill does

Once installed, your assistant can:

- Install and log in to the `fl` CLI, then publish a folder or file, list, update, and delete sites
- Publish without an account (`fl --anon`) when you just want a link now, and hand you the claim link
- Publish HTML pages as-is (with their CSS, JS and data files) alongside Markdown
- Convert documents (docx, pptx, pdf, …) to Markdown and publish them
- Configure your site with `config.json` and style it with `custom.css`
- Walk you through complex setups (custom domain, comments, GitHub connection) step by step

## What it runs, sends and fetches

The plugin has no hooks, scripts or bundled code. It contains the skill's instructions and one MCP server reference. Everything it sends goes to Flowershow, and only when you ask to publish:

- **Flowershow connector** (plugin only): `.mcp.json` adds the remote MCP server `https://flowershow.app/api/mcp`. Its `publish` tool uploads the files you ask your assistant to publish to Flowershow, which serves them as a public website. Sites published without an account get a random address and a claim link, and expire after 7 days unless claimed.
- **`fl` CLI**: when the agent has a terminal, the skill installs `fl` from the [flowershow/flowershow](https://github.com/flowershow/flowershow) GitHub releases (via `apps/cli/install.sh`) and runs it to publish the folder or file you choose to flowershow.app. `fl login` signs in through cloud.flowershow.app in your browser.
- **Docs**: the skill fetches pages from `https://flowershow.app/docs` (`.md` versions) to look up configuration details.

Privacy policy: [flowershow.app/privacy](https://flowershow.app/privacy). Help: [flowershow.app/support](https://flowershow.app/support).

## Releasing

Add a changeset with `npx changeset` in your PR. On merge, the release workflow opens a "version" PR that bumps `package.json`, the `metadata.version` in `SKILL.md`, the plugin manifests and `CHANGELOG.md`, and refreshes `skills/flowershow/SKILL.md`. When the version PR merges, the release gets `flowershow.zip` attached.
