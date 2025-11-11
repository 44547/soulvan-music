import { BeatGenerator } from '../lib/beat-generator';

export function generateBeat(genre: string, mood: string, tempo: number, wallet: string, output: string): void {
    const beatGenerator = new BeatGenerator();
    beatGenerator.generate({
        genre,
        mood,
        tempo,
        wallet,
        output
    });
}