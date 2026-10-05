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

For the Claude apps (claude.ai, desktop, mobile) and ChatGPT, upload the skill in the app's skills settings. See [flowershow.app/docs/agents/supported-agents](https://flowershow.app/docs/agents/supported-agents) for per-agent steps.

**Optional, if you already use Node.js:** `npx skills add flowershow/skills --global` installs it for every agent it detects (add `-y -a claude-code -a codex -a cursor` to skip the prompts).

## What the skill does

Once installed, your assistant can:

- Install and log in to the `fl` CLI, then publish a folder or file, list, update, and delete sites
- Publish without an account (`fl --anon`) when you just want a link now, and hand you the claim link
- Publish HTML pages as-is (with their CSS, JS and data files) alongside Markdown
- Convert documents (docx, pptx, pdf, …) to Markdown and publish them
- Configure your site with `config.json` and style it with `custom.css`
- Walk you through complex setups (custom domain, comments, GitHub connection) step by step

## Releasing

Add a changeset with `npx changeset` in your PR. On merge, the release workflow opens a "version" PR that bumps `package.json`, the `metadata.version` in `SKILL.md` and `CHANGELOG.md`.
