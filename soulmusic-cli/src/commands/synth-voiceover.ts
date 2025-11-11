import fs from 'fs';
export async function synthVoiceover(text: string, language: string, style: string, wallet: string, output: string) {
  const meta = { text, language, style, wallet, output, synthesizedAt: new Date().toISOString() };
  fs.writeFileSync(output, `VOICEOVER_PLACEHOLDER\n` + JSON.stringify(meta, null, 2));
  return { path: output, meta };
}