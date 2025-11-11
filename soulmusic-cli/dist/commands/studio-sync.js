"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studioSync = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function studioSync(input, instrument, wallet, enhance, output) {
    if (!fs_1.default.existsSync(input))
        throw new Error('input not found: ' + input);
    const enhancements = (enhance || '').split(',').map(s => s.trim()).filter(Boolean);
    const meta = {
        input: path_1.default.basename(input),
        instrument: instrument || 'unknown',
        wallet: wallet || null,
        enhancements,
        processedAt: new Date().toISOString()
    };
    const out = output || path_1.default.join(process.cwd(), 'studio', `${path_1.default.basename(input)}.enhanced.txt`);
    const dir = path_1.default.dirname(out);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
    fs_1.default.writeFileSync(out, `STUDIO_SYNC_PLACEHOLDER\n${JSON.stringify(meta, null, 2)}\n`);
    return { path: out, meta };
}
exports.studioSync = studioSync;
