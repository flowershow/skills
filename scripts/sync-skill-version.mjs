// Copy the package.json version into SKILL.md's metadata.version.
// Runs after `changeset version` so the skill and the release stay in step.
import { readFileSync, writeFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
const skill = readFileSync('SKILL.md', 'utf8');
const updated = skill.replace(/^(\s+version:\s*)"[^"]*"/m, `$1"${version}"`);

if (updated === skill && !skill.includes(`version: "${version}"`)) {
  console.error('sync-skill-version: metadata.version not found in SKILL.md');
  process.exit(1);
}
writeFileSync('SKILL.md', updated);
console.log(`SKILL.md metadata.version -> ${version}`);
