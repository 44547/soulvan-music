"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocalSynth = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
class VocalSynth {
    async generate(opts) {
        ensureDirForFile(opts.output);
        const meta = {
            lyrics: opts.lyrics || '',
            language: opts.language || 'en',
            style: opts.style || 'any',
            wallet: opts.wallet || null,
            generatedAt: new Date().toISOString()
        };
        const payload = `VOCAL_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`;
        fs_1.default.writeFileSync(opts.output, payload);
        return { path: opts.output, meta };
    }
    // Backwards-compatible synthesize API
    async synthesize(lyrics, language, style, wallet) {
        const meta = {
            lyrics: lyrics || '',
            language: language || 'en',
            style: style || 'any',
            wallet: wallet || null,
            generatedAt: new Date().toISOString()
        };
        const payload = `VOCAL_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`;
        return payload;
    }
}
exports.VocalSynth = VocalSynth;
