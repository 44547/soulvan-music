import fs from 'fs';
import path from 'path';

export function signTrack(input: string, wallet: string, output?: string) {
  if (!fs.existsSync(input)) throw new Error('input not found: ' + input);
  const meta = {
    input: path.basename(input),
    wallet,
    originalityScore: Number((Math.random()).toFixed(3)),
    signedAt: new Date().toISOString()
  };
  const out = output || path.join(process.cwd(), 'signed', `${path.basename(input)}.${Date.now()}.signed.json`);
  const dir = path.dirname(out);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(out, JSON.stringify(meta, null, 2));
  return { path: out, meta };
}
