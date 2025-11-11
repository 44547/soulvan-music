import fs from 'fs';
import path from 'path';

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function launchChallenge(faction: string, opponent: string, theme: string, deadline?: string, output?: string) {
  const challenge = {
    faction,
    opponent,
    theme,
    deadline: deadline || null,
    createdAt: new Date().toISOString()
  };
  const out = output || path.join(process.cwd(), 'challenges', `${faction}_vs_${opponent}_${Date.now()}.json`);
  ensureDirForFile(out);
  fs.writeFileSync(out, JSON.stringify(challenge, null, 2));
  return { path: out, challenge };
}
