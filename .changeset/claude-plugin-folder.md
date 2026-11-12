---
"flowershow-skills": patch
---

Move the Claude Code plugin to `plugins/flowershow/`, a folder with only the skill, the MCP server reference, the logo and a README, so it passes Anthropic's plugin directory policy (no package.json, lockfile or scripts). The marketplace now points there; install commands are unchanged.
