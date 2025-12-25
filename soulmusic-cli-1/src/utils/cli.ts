import { Command } from 'commander';

const program = new Command();

// Utility function to handle command-line options
export const setupCLI = () => {
    program
        .name('soulmusic-cli')
        .description('CLI tool for SoulvanMusic AI')
        .version('1.0.0');

    // Add commands here
    program
        .command('generate-beat')
        .description('Generate a new beat')
        .option('--genre <genre>', 'Specify the genre of the beat')
        .option('--mood <mood>', 'Specify the mood of the beat')
        .option('--tempo <tempo>', 'Specify the tempo in BPM')
        .option('--wallet <wallet>', 'Contributor wallet address')
        .option('--output <output>', 'Output path for the generated beat');

    program
        .command('generate-vocal')
        .description('Generate a new vocal track')
        .option('--lyrics <lyrics>', 'Specify the lyrics for the vocal')
        .option('--language <language>', 'Specify the language of the vocal')
        .option('--style <style>', 'Specify the style of the vocal')
        .option('--wallet <wallet>', 'Contributor wallet address')
        .option('--output <output>', 'Output path for the generated vocal');

    program
        .command('create-identity')
        .description('Create a new contributor identity')
        .option('--wallet <wallet>', 'Contributor wallet address')
        .option('--truck-style <style>', 'Specify the truck style')
        .option('--faction <faction>', 'Specify the faction')
        .option('--remix-history <history>', 'Path to remix history');

    program
        .command('vote-upgrade')
        .description('Vote on new genres or upgrades')
        .option('--wallet <wallet>', 'Contributor wallet address')
        .option('--proposal <proposal>', 'Proposal text or file')
        .option('--vote <vote>', 'Vote option: yes, no, or abstain');

    program
        .command('sign-track')
        .description('Sign a track with originality score')
        .option('--input <input>', 'Input path for the track to sign')
        .option('--wallet <wallet>', 'Contributor wallet address')
        .option('--output <output>', 'Output path for the signed track');

    return program;
};