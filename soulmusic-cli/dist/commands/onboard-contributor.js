"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardContributor = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
async function onboardContributor(wallet, faction, truckStyle, voiceSample, output) {
    const profile = {
        wallet,
        faction: faction || 'Independent',
        truckStyle: truckStyle || 'Default',
        voiceSample: voiceSample ? path_1.default.basename(voiceSample) : null,
        onboardedAt: new Date().toISOString()
    };
    const out = output || path_1.default.join(process.cwd(), 'profiles', `${wallet}.json`);
    ensureDirForFile(out);
    fs_1.default.writeFileSync(out, JSON.stringify(profile, null, 2));
    return { path: out, profile };
}
exports.onboardContributor = onboardContributor;
