import fs from 'fs';
import path from 'path';

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function visualizeDNA(wallet: string, output: string) {
  const inFile = path.join(process.cwd(), 'identities', `${wallet}.dna.json`);
  if (!fs.existsSync(inFile)) throw new Error('DNA file not found for wallet: ' + wallet);
  const data = JSON.parse(fs.readFileSync(inFile, 'utf-8')) as Array<any>;

  // Create a simple SVG visualization (nodes in a circle)
  const n = data.length || 1;
  const cx = 400, cy = 300, r = 200;
  const nodes: string[] = [];
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2;
    const x = cx + Math.round(r * Math.cos(angle));
    const y = cy + Math.round(r * Math.sin(angle));
    const label = `${data[i].emotion || data[i].style || 'unknown'}:${data[i].impact_score || ''}`;
    nodes.push(`<circle cx="${x}" cy="${y}" r="28" fill="#${(i * 1234567 % 0xffffff).toString(16).padStart(6, '0')}" />`);
    nodes.push(`<text x="${x}" y="${y + 4}" font-size="12" text-anchor="middle" fill="#ffffff">${label}</text>`);
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">\n  <rect width="100%" height="100%" fill="#0b1020"/>\n  ${nodes.join('\n  ')}\n</svg>`;

  ensureDirForFile(output);
  // If user requested .png, we still write SVG content into file with that name as placeholder
  fs.writeFileSync(output, svg);
  return { path: output, count: n };
}
