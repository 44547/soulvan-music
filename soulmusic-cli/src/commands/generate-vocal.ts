import { VocalSynth } from '../lib/vocal-synth';
import { Command } from 'commander';
import { writeFileSync } from 'fs';

const program = new Command();

program
  .command('generate-vocal')
  .description('Generate vocals based on lyrics, language, style, and wallet identity')
  .requiredOption('--lyrics <lyrics>', 'Custom or AI-generated lyrics')
  .requiredOption('--language <language>', 'Language for the vocals')
  .requiredOption('--style <style>', 'Vocal style (e.g., Singing, Rapping, Chanting)')
  .requiredOption('--wallet <wallet>', 'Contributor wallet for identity-linked vocal tone')
  .requiredOption('--output <output>', 'Path to save the generated vocal')
  .action(async (options) => {
    const { lyrics, language, style, wallet, output } = options;

    const vocalSynth = new VocalSynth();
    const synthesizedVocal = await vocalSynth.synthesize(lyrics, language, style, wallet);

    writeFileSync(output, synthesizedVocal);
    console.log(`Vocal generated and saved to ${output}`);
  });

export default program;