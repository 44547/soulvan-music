import { generateBeat } from '../commands/generate-beat';
import { BeatOptions } from '../types';

export const initializeBeatGenerator = () => {
    console.log('Initializing Beat Generator Module...');
};

export const createBeat = (options: BeatOptions) => {
    return generateBeat(options.genre, options.mood, options.tempo, options.wallet, options.output);
};