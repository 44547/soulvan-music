"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeatGenerator = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
class BeatGenerator {
    async generate(opts) {
        ensureDirForFile(opts.output);
        const meta = {
            genre: opts.genre || 'any',
            mood: opts.mood || 'any',
            tempo: opts.tempo || 120,
            wallet: opts.wallet || null,
            emotion: opts.emotion || null,
            faction: opts.faction || null,
            generatedAt: new Date().toISOString()
        };
        // Placeholder: write a small text file pretending to be a WAV
        const payload = `BEAT_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`;
        fs_1.default.writeFileSync(opts.output, payload);
        // Attempt to record DNA strand if wallet present
        try {
            // dynamic import to avoid circular issues if any
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { generateDNA } = require('./dna');
            if (opts.wallet) {
                await generateDNA({
                    wallet: opts.wallet,
                    style: opts.genre || 'unknown',
                    emotion: opts.emotion || 'neutral',
                    faction: opts.faction || 'none',
                    sourceFile: opts.output,
                    impactScore: Math.round(50 + Math.random() * 50)
                });
            }
        }
        catch (e) {
            // non-fatal
        }
        return { path: opts.output, meta };
    }
}
exports.BeatGenerator = BeatGenerator;
