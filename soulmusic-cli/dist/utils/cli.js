"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayHelp = exports.parseArgs = void 0;
const commander_1 = require("commander");
function parseArgs() {
    const program = new commander_1.Command();
    program
        .name('soulmusic-cli')
        .description('CLI tool for SoulvanMusic AI')
        .version('1.0.0');
    program
        .command('generate-beat')
        .description('Generate an original beat')
        .requiredOption('--genre <genre>', 'Specify the genre')
        .requiredOption('--mood <mood>', 'Specify the mood')
        .requiredOption('--tempo <tempo>', 'Specify the tempo in BPM')
        .requiredOption('--wallet <wallet>', 'Contributor wallet address')
        .requiredOption('--output <output>', 'Output path for the generated beat');
    program
        .command('generate-vocal')
        .description('Generate vocals based on lyrics')
        .requiredOption('--lyrics <lyrics>', 'Specify the lyrics')
        .requiredOption('--language <language>', 'Specify the language')
        .requiredOption('--style <style>', 'Specify the vocal style')
        .requiredOption('--wallet <wallet>', 'Contributor wallet address')
        .requiredOption('--output <output>', 'Output path for the generated vocal');
    program
        .command('create-identity')
        .description('Create a contributor music profile')
        .requiredOption('--wallet <wallet>', 'Contributor wallet address')
        .requiredOption('--truck-style <truckStyle>', 'Specify the truck style')
        .requiredOption('--faction <faction>', 'Specify the faction')
        .requiredOption('--remix-history <remixHistory>', 'Path to remix history');
    program
        .command('vote-upgrade')
        .description('Vote on music upgrades or submit proposals')
        .requiredOption('--wallet <wallet>', 'Contributor wallet address')
        .requiredOption('--proposal <proposal>', 'Proposal text or file')
        .requiredOption('--vote <vote>', 'Vote option: yes, no, or abstain');
    program
        .command('sign-track')
        .description('Sign a beat or vocal with originality score')
        .requiredOption('--input <input>', 'Input path for the track')
        .requiredOption('--wallet <wallet>', 'Contributor wallet address')
        .requiredOption('--output <output>', 'Output path for the signed track');
    program.parse(process.argv);
    return program;
}
exports.parseArgs = parseArgs;
function displayHelp() {
    console.log(`
    Usage: soulmusic-cli [command]

    Commands:
      generate-beat      Generate an original beat
      generate-vocal     Generate vocals based on lyrics
      create-identity    Create a contributor music profile
      vote-upgrade       Vote on music upgrades or submit proposals
      sign-track         Sign a beat or vocal with originality score

    Run 'soulmusic-cli <command> --help' for more information on a command.
    `);
}
exports.displayHelp = displayHelp;
