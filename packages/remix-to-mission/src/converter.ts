import path from 'path';
import fs from 'fs';
import { analyzeBeat, Analysis } from './analyzer';
import { ensureDirForFile } from './utils';

export type ConvertOptions = {
  input: string;
  wallet: string;
  lyrics?: string;
  faction?: string;
  truckStyle?: string;
  output?: string;
};

export async function convertToMission(opts: ConvertOptions) {
  if (!fs.existsSync(opts.input)) throw new Error('input not found: ' + opts.input);
  const analysis: Analysis = await analyzeBeat(opts.input, opts.lyrics);

  const archetype = analysis.mood === 'rebellious' ? 'High-Speed Raid' :
    analysis.mood === 'cinematic' ? 'Skyfire Ceremony' :
    analysis.mood === 'dark' ? 'Shadow Recon' : 'Remix Run';

  const mission = {
    mission_name: `${(opts.faction || 'Nomad')}_${archetype}`.replace(/\s+/g, '_'),
    faction: opts.faction || 'Independent',
    truckStyle: opts.truckStyle || 'Standard',
    objectives: buildObjectives(archetype, analysis.themes),
    soundtrack: path.basename(opts.input),
    analysis,
    rewards: [
      `Guild prestige +${Math.round(10 + analysis.energy * 90)}`,
      'Award nomination'
    ],
    generatedAt: new Date().toISOString(),
    wallet: opts.wallet
  };

  const out = opts.output || path.join(process.cwd(), 'missions', `${opts.wallet}_${Date.now()}.mission.json`);
  ensureDirForFile(out);
  fs.writeFileSync(out, JSON.stringify(mission, null, 2));
  return { path: out, mission };
}

function buildObjectives(archetype: string, themes: string[]) {
  const base: string[] = [];
  if (archetype.includes('Raid')) {
    base.push('Evade drone patrol', 'Secure the remix crystal', 'Exfiltrate to drop zone');
  } else if (archetype.includes('Ceremony')) {
    base.push('Deliver the remix to the altar', 'Synchronize civic horns', 'Trigger cinematic drop');
  } else if (archetype.includes('Recon')) {
    base.push('Survey enemy broadcast towers', 'Decrypt audio beacon', 'Avoid detection');
  } else {
    base.push('Collect remix shards', 'Remix the beat at three nodes', 'Submit to guild arena');
  }
  themes.forEach(t => {
    if (t.includes('fire')) base.push('Ignite the beacon');
    if (t.includes('stealth') || t.includes('raid')) base.push('Use stealth route for bonus');
    if (t.includes('unity')) base.push('Rally allied NPCs');
  });
  return base;
}
