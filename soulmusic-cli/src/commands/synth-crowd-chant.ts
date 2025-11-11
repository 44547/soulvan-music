import fs from 'fs';
export async function synthCrowdChant(faction: string, chantType: string, language: string, wallet: string, output: string) {
  const meta = { faction, chantType, language, wallet, output, synthesizedAt: new Date().toISOString() };
  fs.writeFileSync(output, `CROWD_CHANT_PLACEHOLDER\n` + JSON.stringify(meta, null, 2));
  return { path: output, meta };
}