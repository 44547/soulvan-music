import fs from 'fs';
import path from 'path';

export type VocalOpts = {
  lyrics?: string;
  language?: string;
  style?: string;
  wallet?: string;
  output: string;
};

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export class VocalSynth {
  async generate(opts: VocalOpts) {
    ensureDirForFile(opts.output);
    const meta = {
      lyrics: opts.lyrics || '',
      language: opts.language || 'en',
      style: opts.style || 'any',
      wallet: opts.wallet || null,
      generatedAt: new Date().toISOString()
    };
    const payload = `VOCAL_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`;
    fs.writeFileSync(opts.output, payload);
    return { path: opts.output, meta };
  }

  // Backwards-compatible synthesize API
  async synthesize(lyrics: string, language: string, style: string, wallet?: string) {
    const meta = {
      lyrics: lyrics || '',
      language: language || 'en',
      style: style || 'any',
      wallet: wallet || null,
      generatedAt: new Date().toISOString()
    };
    const payload = `VOCAL_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`;
    return payload;
  }
}
