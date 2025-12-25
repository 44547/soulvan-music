"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchChallenge = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
async function launchChallenge(faction, opponent, theme, deadline, output) {
    const challenge = {
        faction,
        opponent,
        theme,
        deadline: deadline || null,
        createdAt: new Date().toISOString()
    };
    const out = output || path_1.default.join(process.cwd(), 'challenges', `${faction}_vs_${opponent}_${Date.now()}.json`);
    ensureDirForFile(out);
    fs_1.default.writeFileSync(out, JSON.stringify(challenge, null, 2));
    return { path: out, challenge };
}
exports.launchChallenge = launchChallenge;
