"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTrack = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function signTrack(input, wallet, output) {
    if (!fs_1.default.existsSync(input))
        throw new Error('input not found: ' + input);
    const meta = {
        input: path_1.default.basename(input),
        wallet,
        originalityScore: Number((Math.random()).toFixed(3)),
        signedAt: new Date().toISOString()
    };
    const out = output || path_1.default.join(process.cwd(), 'signed', `${path_1.default.basename(input)}.${Date.now()}.signed.json`);
    const dir = path_1.default.dirname(out);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
    fs_1.default.writeFileSync(out, JSON.stringify(meta, null, 2));
    return { path: out, meta };
}
exports.signTrack = signTrack;
