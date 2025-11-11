import fs from 'fs';
export async function generateWhisperLore(faction: string, theme: string, language: string, wallet: string, output: string) {
  const meta = { faction, theme, language, wallet, output, generatedAt: new Date().toISOString() };
  fs.writeFileSync(output, `WHISPER_LORE_PLACEHOLDER\n` + JSON.stringify(meta, null, 2));
  return { path: output, meta };
}