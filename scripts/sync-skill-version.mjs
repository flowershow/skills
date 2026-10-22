// Keep the skill and plugin manifests in step with package.json.
// Runs after `changeset version` (and in CI with --check):
// - copies package.json's version into SKILL.md's metadata.version and the plugin manifests
// - copies the root SKILL.md (canonical) to skills/flowershow/SKILL.md, where the
//   Claude Code, Cursor and Codex plugin formats look for skills
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const check = process.argv.includes('--check');
const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
const MANIFESTS = [
  '.claude-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  '.codex-plugin/plugin.json',
];
const SKILL_COPY = 'skills/flowershow/SKILL.md';
const stale = [];

function sync(path, next) {
  let current = null;
  try {
    current = readFileSync(path, 'utf8');
  } catch {}
  if (current === next) return;
  if (check) return stale.push(path);
  writeFileSync(path, next);
  console.log(`updated ${path}`);
}

const skill = readFileSync('SKILL.md', 'utf8');
const updated = skill.replace(/^(\s+version:\s*)"[^"]*"/m, `$1"${version}"`);
if (updated === skill && !skill.includes(`version: "${version}"`)) {
  console.error('sync-skill-version: metadata.version not found in SKILL.md');
  process.exit(1);
}
sync('SKILL.md', updated);

mkdirSync('skills/flowershow', { recursive: true });
sync(SKILL_COPY, updated);

for (const path of MANIFESTS) {
  const json = JSON.parse(readFileSync(path, 'utf8'));
  json.version = version;
  sync(path, `${JSON.stringify(json, null, 2)}\n`);
}

if (stale.length) {
  console.error(`Out of sync (run: node scripts/sync-skill-version.mjs): ${stale.join(', ')}`);
  process.exit(1);
}
console.log(`skill and manifests at ${version}`);
