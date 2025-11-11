#!/usr/bin/env node
import { Command } from 'commander';
import { BeatGenerator } from '../lib/beat-generator';
import { VocalSynth } from '../lib/vocal-synth';
import { IdentityManager } from '../lib/identity';
import { DAO } from '../lib/dao';
import { signTrack } from '../services/provenance';
import { studioSync as studioSyncFn } from '../commands/studio-sync';
import { spawnSync } from 'child_process';
import path from 'path';

const program = new Command();
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
    const gen = new BeatGenerator();
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
    const { mentorFeedback } = await import('../commands/mentor-feedback');
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
    const vs = new VocalSynth();
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
    const im = new IdentityManager();
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
    const dao = new DAO();
    const res = dao.record({ wallet: opts.wallet, proposal: opts.proposal, proposalFile: opts.proposalFile, vote: opts.vote });
    console.log('Vote recorded:', res.path);
  });

program
  .command('sign-track')
  .requiredOption('--input <input>')
  .requiredOption('--wallet <wallet>')
  .option('--output <output>')
  .action((opts) => {
    const res = signTrack(opts.input, opts.wallet, opts.output);
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
    const res = await studioSyncFn(opts.input, opts.instrument, opts.wallet, opts.enhance, opts.output);
    console.log('Studio-sync output:', res.path);
  });

program
  .command('visualize-dna')
  .requiredOption('--wallet <wallet>')
  .requiredOption('--output <output>')
  .action(async (opts) => {
    const { visualizeDNA } = await import('../commands/visualize-dna');
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
    const { generatePrefab } = await import('../commands/generate-prefab');
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
    const { generateTrailerCli } = await import('../commands/generate-trailer');
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
    const { onboardContributor } = await import('../commands/onboard-contributor');
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
    const { launchChallenge } = await import('../commands/launch-challenge');
    const res = await launchChallenge(opts.faction, opts.opponent, opts.theme, opts.deadline, opts.output);
    console.log('Challenge launched:', res.path);
  });

  program
    .command('apply-whisper-fx')
    .requiredOption('--input <input>')
    .requiredOption('--style <style>')
    .requiredOption('--language <language>')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
      const { applyWhisperFx } = await import('../commands/apply-whisper-fx');
      const res = await applyWhisperFx(opts.input, opts.style, opts.language, opts.wallet, opts.output);
      console.log('Whisper FX applied:', res.path);
    });

  program
    .command('inject-sync-markers')
    .requiredOption('--input <input>')
    .requiredOption('--markers <markers>')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
      const { injectSyncMarkers } = await import('../commands/inject-sync-markers');
      const res = await injectSyncMarkers(opts.input, opts.markers, opts.wallet, opts.output);
      console.log('Sync markers injected:', res.path);
    });

  program
    .command('generate-whisper-lore')
    .requiredOption('--faction <faction>')
    .requiredOption('--theme <theme>')
    .requiredOption('--language <language>')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
      const { generateWhisperLore } = await import('../commands/generate-whisper-lore');
      const res = await generateWhisperLore(opts.faction, opts.theme, opts.language, opts.wallet, opts.output);
      console.log('Whisper lore generated:', res.path);
    });

  program
    .command('synth-voiceover')
    .requiredOption('--text <text>')
    .requiredOption('--language <language>')
    .requiredOption('--style <style>')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
      const { synthVoiceover } = await import('../commands/synth-voiceover');
      const res = await synthVoiceover(opts.text, opts.language, opts.style, opts.wallet, opts.output);
      console.log('Voiceover synthesized:', res.path);
    });

  program
    .command('generate-crystal-delivery')
    .requiredOption('--input <input>')
    .requiredOption('--mission <mission>')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
      const { generateCrystalDelivery } = await import('../commands/generate-crystal-delivery');
      const res = await generateCrystalDelivery(opts.input, opts.mission, opts.wallet, opts.output);
      console.log('Crystal delivery generated:', res.path);
    });

  program
    .command('synth-crowd-chant')
    .requiredOption('--faction <faction>')
    .requiredOption('--chant-type <chantType>')
    .requiredOption('--language <language>')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
      const { synthCrowdChant } = await import('../commands/synth-crowd-chant');
      const res = await synthCrowdChant(opts.faction, opts.chantType, opts.language, opts.wallet, opts.output);
      console.log('Crowd chant synthesized:', res.path);
    });

  program
    .command('inject-prestige-boost')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--remix <remix>')
    .requiredOption('--event <event>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
      const { injectPrestigeBoost } = await import('../commands/inject-prestige-boost');
      const res = await injectPrestigeBoost(opts.wallet, opts.remix, opts.event, opts.output);
      console.log('Prestige boost injected:', res.path);
    });

  program
    .command('remix-session')
    .requiredOption('--base-beat <baseBeat>')
    .requiredOption('--add-vocal <addVocal>')
    .option('--fx [fx...]')
    .requiredOption('--wallet <wallet>')
    .requiredOption('--output <output>')
    .action(async (opts) => {
      const { remixSession } = await import('../commands/remix-session');
      const res = await remixSession(opts.baseBeat, opts.addVocal, opts.fx || [], opts.wallet, opts.output);
      console.log('Remix session complete:', res.path);
    });

  program
    .command('external-run')
    .requiredOption('--cmd <cmd>')
    .option('--args [args...]')
    .action((opts) => {
      // Resolve repository root by walking up until we find an 'external' folder
      function findRepoRoot(start: string) {
        let cur = start;
        for (let i = 0; i < 6; i++) {
          const maybe = path.join(cur, 'external');
          if (require('fs').existsSync(maybe)) return cur;
          const parent = path.dirname(cur);
          if (parent === cur) break;
          cur = parent;
        }
        return null;
      }
      const repoRoot = findRepoRoot(process.cwd()) || process.cwd();
      // Resolve external CLI index.js and run subcommand
      const distIndex = path.join(repoRoot, 'external', 'soulvan-Ai-photo-and-video-generator', 'soulvan-cli', 'cli', 'dist', 'index.js');
      if (!require('fs').existsSync(distIndex)) {
        console.error('External CLI not found at', distIndex);
        process.exit(2);
      }
      const args = [distIndex, opts.cmd].concat(opts.args || []);
      console.log('Running external CLI:', 'node', args.join(' '));
      const r = spawnSync('node', args, { stdio: 'inherit' });
      if (r.error) {
        console.error('Failed to run external script:', r.error);
        process.exit(1);
      }
      process.exit(r.status || 0);
    });

program.parseAsync(process.argv).catch(err => { console.error(err); process.exit(1); });
