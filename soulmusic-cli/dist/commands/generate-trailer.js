"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTrailerCli = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
async function generateTrailerCli(audio, photo, wallet, faction, output) {
    if (!fs_1.default.existsSync(audio))
        throw new Error('audio not found: ' + audio);
    const meta = {
        audio: path_1.default.basename(audio),
        photo: photo ? path_1.default.basename(photo) : null,
        wallet: wallet || null,
        faction: faction || null,
        generatedAt: new Date().toISOString(),
        note: 'Placeholder MP4 generated. Replace with real video pipeline.'
    };
    const out = output || path_1.default.join(process.cwd(), 'trailers', `${path_1.default.basename(audio)}.${Date.now()}.mp4`);
    ensureDirForFile(out);
    // Create placeholder MP4 text file
    fs_1.default.writeFileSync(out, `MP4_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`);
    return { path: out, meta };
}
exports.generateTrailerCli = generateTrailerCli;
