import fs from 'fs';
import path from 'path';

export type TimelineSpec = {
  input: string;
  wallet?: string;
  missionType?: string;
  output?: string;
};

export async function composeTimeline(opts: TimelineSpec) {
  if (!fs.existsSync(opts.input)) throw new Error('input not found: ' + opts.input);
  const spec = {
    timeline: {
      intro: '0s-15s',
      build_up: '15s-45s',
      climax: '45s-75s',
      outro: '75s-90s'
    },
    voiceover: `From the depths of ${(opts.wallet || 'Unknown')}`,
    ambient_fx: ['wind', 'drone hum', 'crowd cheer'],
    source: path.basename(opts.input),
    missionType: opts.missionType || 'Remix Run',
    generatedAt: new Date().toISOString()
  };
  const out = opts.output || path.join(process.cwd(), 'timelines', `${path.basename(opts.input)}.timeline.json`);
  const dir = path.dirname(out);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(out, JSON.stringify(spec, null, 2));
  return { path: out, spec };
}
