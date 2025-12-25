import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function generatePrefab(input: string, mission: string, wallet?: string, output?: string) {
  if (!fs.existsSync(input)) throw new Error('input not found: ' + input);

  // If Python helper exists, use it to split the audio into real segments
  const helper = path.join(process.cwd(), '..', 'tools', 'split_wav.py');
  let segments: Array<any> = [];
  try {
    const helperPath = path.join(process.cwd(), 'tools', 'split_wav.py');
    const altHelper = helperPath;
    const script = fs.existsSync(altHelper) ? altHelper : helper;
    if (fs.existsSync(script)) {
      const outDir = path.join(process.cwd(), 'unity', 'audio_segments', path.basename(input, path.extname(input)));
      ensureDirForFile(outDir + '/x');
      const cmd = `python3 "${script}" "${input}" "${outDir}"`;
      const res = execSync(cmd, { encoding: 'utf-8' });
      const parsed = JSON.parse(res);
      segments = parsed.segments;
    }
  } catch (e) {
    // fallback to default placeholder segments
    segments = [
      { name: 'intro', start: 0, end: 15, path: input },
      { name: 'build_up', start: 15, end: 45, path: input },
      { name: 'climax', start: 45, end: 75, path: input },
      { name: 'outro', start: 75, end: 90, path: input }
    ];
  }

  const prefabName = (mission || 'mission').replace(/\s+/g, '_');
  const spec = {
    prefabName,
    audioSource: path.basename(input),
    segments: segments.map(s => ({ name: s.name, start: s.start, end: s.end, file: path.relative(process.cwd(), s.path) })),
    ambient_fx: ['wind', 'drone hum'],
    voiceover: `Wallet:${wallet || 'anon'}`,
    generatedAt: new Date().toISOString()
  };
  const out = output || path.join(process.cwd(), 'unity', 'prefabs', `${prefabName}.prefab.json`);
  ensureDirForFile(out);
  fs.writeFileSync(out, JSON.stringify(spec, null, 2));
  return { path: out, spec };
}
