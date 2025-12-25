#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const beat_generator_1 = require("../lib/beat-generator");
const vocal_synth_1 = require("../lib/vocal-synth");
const identity_1 = require("../lib/identity");
const dao_1 = require("../lib/dao");
const provenance_1 = require("../services/provenance");
const studio_sync_1 = require("../commands/studio-sync");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const program = new commander_1.Command();
program.name('soulmusic-cli').description('SoulvanMusic CLI').version('1.0.0');
program
    .command('generate-beat')
    .requiredOption('--genre <genre>')
    .requiredOption('--mood <mood>')
    .requiredOption('--tempo <tempo>')
    .requiredOption('--wallet <wallet>')
    .option('--emotion <emotion>')
    .option('--faction <faction>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
    const gen = new beat_generator_1.BeatGenerator();
    await gen.generate({
        genre: opts.genre,
        mood: opts.mood,
        tempo: Number(opts.tempo),
        wallet: opts.wallet,
        emotion: opts.emotion,
        faction: opts.faction,
        output: opts.output
    });
    console.log('Beat generated:', opts.output);
});
program
    .command('mentor-feedback')
    .requiredOption('--input <input>')
    .option('--wallet <wallet>')
    .option('--faction <faction>')
    .action(async (opts) => {
    const { mentorFeedback } = await Promise.resolve().then(() => __importStar(require('../commands/mentor-feedback')));
    const res = await mentorFeedback(opts.input, opts.wallet, opts.faction);
    console.log('Mentor feedback:', JSON.stringify(res, null, 2));
});
program
    .command('generate-vocal')
    .requiredOption('--lyrics <lyrics>')
    .requiredOption('--language <language>')
    .requiredOption('--style <style>')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
    const vs = new vocal_synth_1.VocalSynth();
    await vs.generate({ lyrics: opts.lyrics, language: opts.language, style: opts.style, wallet: opts.wallet, output: opts.output });
    console.log('Vocal generated:', opts.output);
});
program
    .command('create-identity')
    .requiredOption('--wallet <wallet>')
    .option('--truck-style <truckStyle>')
    .option('--faction <faction>')
    .option('--remix-history <remixHistory>')
    .action((opts) => {
    const im = new identity_1.IdentityManager();
    const res = im.create({ wallet: opts.wallet, truckStyle: opts.truckStyle, faction: opts.faction, remixHistory: opts.remixHistory });
    console.log('Identity created:', res.path);
});
program
    .command('vote-upgrade')
    .requiredOption('--wallet <wallet>')
    .option('--proposal <proposal>')
    .option('--proposal-file <proposalFile>')
    .option('--vote <vote>')
    .action((opts) => {
    const dao = new dao_1.DAO();
    const res = dao.record({ wallet: opts.wallet, proposal: opts.proposal, proposalFile: opts.proposalFile, vote: opts.vote });
    console.log('Vote recorded:', res.path);
});
program
    .command('sign-track')
    .requiredOption('--input <input>')
    .requiredOption('--wallet <wallet>')
    .option('--output <output>')
    .action((opts) => {
    const res = (0, provenance_1.signTrack)(opts.input, opts.wallet, opts.output);
    console.log('Signed metadata written to', res.path);
});
program
    .command('studio-sync')
    .requiredOption('--input <input>')
    .option('--instrument <instrument>')
    .option('--wallet <wallet>')
    .option('--enhance <enhance>')
    .option('--output <output>')
    .action(async (opts) => {
    const res = await (0, studio_sync_1.studioSync)(opts.input, opts.instrument, opts.wallet, opts.enhance, opts.output);
    console.log('Studio-sync output:', res.path);
});
program
    .command('visualize-dna')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
    const { visualizeDNA } = await Promise.resolve().then(() => __importStar(require('../commands/visualize-dna')));
    const res = await visualizeDNA(opts.wallet, opts.output);
    console.log('DNA visualization written to', res.path);
});
program
    .command('generate-prefab')
    .requiredOption('--input <input>')
    .requiredOption('--mission <mission>')
    .requiredOption('--wallet <wallet>')
    .option('--output <output>')
    .action(async (opts) => {
    const { generatePrefab } = await Promise.resolve().then(() => __importStar(require('../commands/generate-prefab')));
    const res = await generatePrefab(opts.input, opts.mission, opts.wallet, opts.output);
    console.log('Prefab written to', res.path);
});
program
    .command('generate-trailer')
    .requiredOption('--audio <audio>')
    .option('--photo <photo>')
    .requiredOption('--wallet <wallet>')
    .option('--faction <faction>')
    .option('--output <output>')
    .action(async (opts) => {
    const { generateTrailerCli } = await Promise.resolve().then(() => __importStar(require('../commands/generate-trailer')));
    const res = await generateTrailerCli(opts.audio, opts.photo, opts.wallet, opts.faction, opts.output);
    console.log('Trailer placeholder written to', res.path);
});
program
    .command('onboard-contributor')
    .requiredOption('--wallet <wallet>')
    .option('--faction <faction>')
    .option('--truck-style <truckStyle>')
    .option('--voice-sample <voiceSample>')
    .option('--output <output>')
    .action(async (opts) => {
    const { onboardContributor } = await Promise.resolve().then(() => __importStar(require('../commands/onboard-contributor')));
    const res = await onboardContributor(opts.wallet, opts.faction, opts.truckStyle, opts.voiceSample, opts.output);
    console.log('Contributor onboarded:', res.path);
});
program
    .command('launch-challenge')
    .requiredOption('--faction <faction>')
    .requiredOption('--opponent <opponent>')
    .requiredOption('--theme <theme>')
    .option('--deadline <deadline>')
    .option('--output <output>')
    .action(async (opts) => {
    const { launchChallenge } = await Promise.resolve().then(() => __importStar(require('../commands/launch-challenge')));
    const res = await launchChallenge(opts.faction, opts.opponent, opts.theme, opts.deadline, opts.output);
    console.log('Challenge launched:', res.path);
});
program
    .command('remix-session')
    .requiredOption('--base-beat <baseBeat>')
    .requiredOption('--add-vocal <addVocal>')
    .option('--fx [fx...]')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
    const { remixSession } = await Promise.resolve().then(() => __importStar(require('../commands/remix-session')));
    const res = await remixSession(opts.baseBeat, opts.addVocal, opts.fx || [], opts.wallet, opts.output);
    console.log('Remix session complete:', res.path);
});
program
    .command('external-run')
    .requiredOption('--cmd <cmd>')
    .option('--args [args...]')
    .action((opts) => {
    // Resolve repository root by walking up until we find an 'external' folder
    function findRepoRoot(start) {
        let cur = start;
        for (let i = 0; i < 6; i++) {
            const maybe = path_1.default.join(cur, 'external');
            if (require('fs').existsSync(maybe))
                return cur;
            const parent = path_1.default.dirname(cur);
            if (parent === cur)
                break;
            cur = parent;
        }
        return null;
    }
    const repoRoot = findRepoRoot(process.cwd()) || process.cwd();
    // Resolve external CLI index.js and run subcommand
    const distIndex = path_1.default.join(repoRoot, 'external', 'soulvan-Ai-photo-and-video-generator', 'soulvan-cli', 'cli', 'dist', 'index.js');
    if (!require('fs').existsSync(distIndex)) {
        console.error('External CLI not found at', distIndex);
        process.exit(2);
    }
    const args = [distIndex, opts.cmd].concat(opts.args || []);
    console.log('Running external CLI:', 'node', args.join(' '));
    const r = (0, child_process_1.spawnSync)('node', args, { stdio: 'inherit' });
    if (r.error) {
        console.error('Failed to run external script:', r.error);
        process.exit(1);
    }
    process.exit(r.status || 0);
});
program.parseAsync(process.argv).catch(err => { console.error(err); process.exit(1); });
