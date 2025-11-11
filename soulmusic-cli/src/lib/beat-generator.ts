import fs from 'fs';
import path from 'path';

export type BeatOpts = {
  genre?: string;
  mood?: string;
  tempo?: number;
  wallet?: string;
  emotion?: string;
  faction?: string;
  output: string;
};

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export class BeatGenerator {
  async generate(opts: BeatOpts) {
    ensureDirForFile(opts.output);
    const meta = {
      genre: opts.genre || 'any',
      mood: opts.mood || 'any',
      tempo: opts.tempo || 120,
      wallet: opts.wallet || null,
      emotion: opts.emotion || null,
      faction: opts.faction || null,
      generatedAt: new Date().toISOString()
    };
    // Placeholder: write a small text file pretending to be a WAV
    const payload = `BEAT_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`;
    fs.writeFileSync(opts.output, payload);

    // Attempt to record DNA strand if wallet present
    try {
      // dynamic import to avoid circular issues if any
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { generateDNA } = require('./dna');
      if (opts.wallet) {
        await generateDNA({
          wallet: opts.wallet,
          style: opts.genre || 'unknown',
          emotion: opts.emotion || 'neutral',
          faction: opts.faction || 'none',
          sourceFile: opts.output,
          impactScore: Math.round(50 + Math.random() * 50)
        });
      }
    } catch (e) {
      // non-fatal
    }

    return { path: opts.output, meta };
  }
}
