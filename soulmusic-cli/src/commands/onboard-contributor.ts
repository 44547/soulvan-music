import fs from 'fs';
import path from 'path';

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function onboardContributor(wallet: string, faction?: string, truckStyle?: string, voiceSample?: string, output?: string) {
  const profile = {
    wallet,
    faction: faction || 'Independent',
    truckStyle: truckStyle || 'Default',
    voiceSample: voiceSample ? path.basename(voiceSample) : null,
    onboardedAt: new Date().toISOString()
  };
  const out = output || path.join(process.cwd(), 'profiles', `${wallet}.json`);
  ensureDirForFile(out);
  fs.writeFileSync(out, JSON.stringify(profile, null, 2));
  return { path: out, profile };
}
