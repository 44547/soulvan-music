import fs from 'fs';
import path from 'path';

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function generateTrailerCli(audio: string, photo?: string, wallet?: string, faction?: string, output?: string) {
  if (!fs.existsSync(audio)) throw new Error('audio not found: ' + audio);
  const meta = {
    audio: path.basename(audio),
    photo: photo ? path.basename(photo) : null,
    wallet: wallet || null,
    faction: faction || null,
    generatedAt: new Date().toISOString(),
    note: 'Placeholder MP4 generated. Replace with real video pipeline.'
  };
  const out = output || path.join(process.cwd(), 'trailers', `${path.basename(audio)}.${Date.now()}.mp4`);
  ensureDirForFile(out);
  // Create placeholder MP4 text file
  fs.writeFileSync(out, `MP4_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`);
  return { path: out, meta };
}
