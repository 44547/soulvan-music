import fs from 'fs';
import path from 'path';

export type DNAStrand = {
  wallet: string;
  style: string;
  emotion: string;
  faction: string;
  impact_score: number;
  sourceFile?: string;
  generatedAt: string;
};

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function generateDNA(opts: { wallet: string; style: string; emotion: string; faction: string; impactScore?: number; sourceFile?: string; }) {
  const strand: DNAStrand = {
    wallet: opts.wallet,
    style: opts.style,
    emotion: opts.emotion,
    faction: opts.faction,
    impact_score: opts.impactScore || Math.round(Math.random() * 100),
    sourceFile: opts.sourceFile ? path.basename(opts.sourceFile) : undefined,
    generatedAt: new Date().toISOString()
  };
  const out = path.join(process.cwd(), 'identities', `${opts.wallet}.dna.json`);
  ensureDirForFile(out);
  // If an existing DNA file exists, append to an array
  let arr: DNAStrand[] = [];
  if (fs.existsSync(out)) {
    try { arr = JSON.parse(fs.readFileSync(out, 'utf-8')); } catch (e) { arr = []; }
  }
  arr.push(strand);
  fs.writeFileSync(out, JSON.stringify(arr, null, 2));
  return { path: out, strand };
}
