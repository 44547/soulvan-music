"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizeDNA = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
async function visualizeDNA(wallet, output) {
    const inFile = path_1.default.join(process.cwd(), 'identities', `${wallet}.dna.json`);
    if (!fs_1.default.existsSync(inFile))
        throw new Error('DNA file not found for wallet: ' + wallet);
    const data = JSON.parse(fs_1.default.readFileSync(inFile, 'utf-8'));
    // Create a simple SVG visualization (nodes in a circle)
    const n = data.length || 1;
    const cx = 400, cy = 300, r = 200;
    const nodes = [];
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
    fs_1.default.writeFileSync(output, svg);
    return { path: output, count: n };
}
exports.visualizeDNA = visualizeDNA;
