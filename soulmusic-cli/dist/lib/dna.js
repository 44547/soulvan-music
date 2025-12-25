"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDNA = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
async function generateDNA(opts) {
    const strand = {
        wallet: opts.wallet,
        style: opts.style,
        emotion: opts.emotion,
        faction: opts.faction,
        impact_score: opts.impactScore || Math.round(Math.random() * 100),
        sourceFile: opts.sourceFile ? path_1.default.basename(opts.sourceFile) : undefined,
        generatedAt: new Date().toISOString()
    };
    const out = path_1.default.join(process.cwd(), 'identities', `${opts.wallet}.dna.json`);
    ensureDirForFile(out);
    // If an existing DNA file exists, append to an array
    let arr = [];
    if (fs_1.default.existsSync(out)) {
        try {
            arr = JSON.parse(fs_1.default.readFileSync(out, 'utf-8'));
        }
        catch (e) {
            arr = [];
        }
    }
    arr.push(strand);
    fs_1.default.writeFileSync(out, JSON.stringify(arr, null, 2));
    return { path: out, strand };
}
exports.generateDNA = generateDNA;
