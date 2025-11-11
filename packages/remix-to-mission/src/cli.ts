#!/usr/bin/env node
import { convertToMission } from './converter';
import { generateTrailer } from './trailer';

const argv = process.argv.slice(2);
const cmd = argv[0];

function getArg(key: string) {
  const idx = argv.indexOf(key);
  if (idx === -1) return undefined;
  return argv[idx + 1];
}

async function run() {
  try {
    if (cmd === 'convert') {
      const input = getArg('--input');
      const wallet = getArg('--wallet');
      if (!input || !wallet) throw new Error('convert requires --input and --wallet');
      const result = await convertToMission({
        input,
        wallet,
        lyrics: getArg('--lyrics'),
        faction: getArg('--faction'),
        truckStyle: getArg('--truckStyle'),
        output: getArg('--output')
      });
      console.log('Mission written:', result.path);
    } else if (cmd === 'trailer') {
      const input = getArg('--input');
      const wallet = getArg('--wallet');
      if (!input || !wallet) throw new Error('trailer requires --input and --wallet');
      const result = await generateTrailer({
        input,
        wallet,
        awardCategory: getArg('--award') || getArg('--awardCategory'),
        output: getArg('--output')
      });
      console.log('Trailer placeholder written:', result.path);
    } else {
      console.log('Usage:');
      console.log('  npm run dev -- convert --input <file> --wallet <0x...> [--lyrics <text>] [--faction <name>] [--truckStyle <style>] [--output <path>]');
      console.log('  npm run dev -- trailer --input <file> --wallet <0x...> [--award <category>] [--output <path>]');
    }
  } catch (err: any) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

run();
