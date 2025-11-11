import fs from 'fs';
import path from 'path';
import { analyzeBeat } from './analyzer';
import { ensureDirForFile } from './utils';

export type TrailerOptions = {
  input: string;
  wallet: string;
  awardCategory?: string;
  output?: string;
};

export async function generateTrailer(opts: TrailerOptions) {
  if (!fs.existsSync(opts.input)) throw new Error('input not found: ' + opts.input);
  const analysis = await analyzeBeat(opts.input);
  const visualTheme = mapThemeToVisual(analysis.mood, analysis.energy);
  const voiceover = `In a world of beats, ${opts.wallet} rises — nominated for ${opts.awardCategory || 'Honors'}.`;
  const trailerMeta = {
    title: `${opts.awardCategory || 'Award Trailer'} - ${opts.wallet}`,
    visualTheme,
    voiceover,
    soundtrack: path.basename(opts.input),
    contributors: { wallet: opts.wallet },
    generatedAt: new Date().toISOString(),
    analysis
  };
  const outPath = opts.output || path.join(process.cwd(), 'trailers', `${opts.wallet}_${Date.now()}.mp4`);
  ensureDirForFile(outPath);
  const placeholder = `MP4_PLACEHOLDER\n${JSON.stringify(trailerMeta, null, 2)}\n`;
  fs.writeFileSync(outPath, placeholder);
  return { path: outPath, trailerMeta };
}

function mapThemeToVisual(mood: string, energy: number) {
  if (mood === 'cinematic') return { palette: 'epic', camera: 'sweeping', tempoSync: true };
  if (mood === 'epic') return { palette: 'gold', camera: 'hero', tempoSync: true };
  if (energy > 0.7) return { palette: 'neon', camera: 'quick-cuts', tempoSync: true };
  return { palette: 'noir', camera: 'slow-pan', tempoSync: false };
}
