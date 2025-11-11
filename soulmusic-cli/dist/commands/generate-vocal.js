"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vocal_synth_1 = require("../lib/vocal-synth");
const commander_1 = require("commander");
const fs_1 = require("fs");
const program = new commander_1.Command();
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
    const vocalSynth = new vocal_synth_1.VocalSynth();
    const synthesizedVocal = await vocalSynth.synthesize(lyrics, language, style, wallet);
    (0, fs_1.writeFileSync)(output, synthesizedVocal);
    console.log(`Vocal generated and saved to ${output}`);
});
exports.default = program;
