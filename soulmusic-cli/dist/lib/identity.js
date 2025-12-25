"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityManager = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
class IdentityManager {
    create(opts) {
        const out = opts.output || path_1.default.join(process.cwd(), 'identities', `${opts.wallet}.json`);
        ensureDirForFile(out);
        const profile = {
            wallet: opts.wallet,
            truckStyle: opts.truckStyle || 'default',
            faction: opts.faction || 'none',
            remixHistory: opts.remixHistory || [],
            createdAt: new Date().toISOString()
        };
        fs_1.default.writeFileSync(out, JSON.stringify(profile, null, 2));
        return { path: out, profile };
    }
    // Backwards-compatible API used by older command files
    createIdentity(wallet, truckStyle, faction, remixHistory) {
        return this.create({ wallet, truckStyle, faction, remixHistory });
    }
}
exports.IdentityManager = IdentityManager;
