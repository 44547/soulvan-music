import fs from 'fs';
export async function applyWhisperFx(input: string, style: string, language: string, wallet: string, output: string) {
  const meta = { input, style, language, wallet, output, appliedAt: new Date().toISOString() };
  fs.writeFileSync(output, `WHISPER_FX_PLACEHOLDER\n` + JSON.stringify(meta, null, 2));
  return { path: output, meta };
}