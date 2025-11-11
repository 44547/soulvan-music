import fs from 'fs';
import path from 'path';

export async function studioSync(input: string, instrument?: string, wallet?: string, enhance?: string, output?: string) {
  if (!fs.existsSync(input)) throw new Error('input not found: ' + input);
  const enhancements = (enhance || '').split(',').map(s => s.trim()).filter(Boolean);
  const meta = {
    input: path.basename(input),
    instrument: instrument || 'unknown',
    wallet: wallet || null,
    enhancements,
    processedAt: new Date().toISOString()
  };
  const out = output || path.join(process.cwd(), 'studio', `${path.basename(input)}.enhanced.txt`);
  const dir = path.dirname(out);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(out, `STUDIO_SYNC_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`);
  return { path: out, meta };
}
