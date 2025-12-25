import fs from 'fs';

export type Analysis = {
  tempo: number;
  energy: number;
  mood: string;
  themes: string[];
};

export async function analyzeBeat(filePath: string, lyrics?: string): Promise<Analysis> {
  const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : { size: 12345 };
  const seed = (stat.size || 12345) % 100;
  const tempo = 60 + (seed % 140);
  const energy = Math.min(1, Math.max(0.05, (seed % 100) / 100));
  const moods = ["epic", "dark", "uplifting", "cinematic", "nostalgic", "rebellious", "neutral"];
  const mood = moods[seed % moods.length];
  const themes: string[] = [];
  if (lyrics) {
    const text = lyrics.toLowerCase();
    if (text.includes('rise') || text.includes('myth')) themes.push('mythic rise');
    if (text.includes('fire') || text.includes('burn')) themes.push('fire');
    if (text.includes('raid') || text.includes('evade')) themes.push('raid/stealth');
    if (text.includes('unity') || text.includes('together')) themes.push('unity');
  }
  if (themes.length === 0) themes.push(seed % 2 === 0 ? 'movement' : 'voyage');
  return { tempo, energy, mood, themes };
}
