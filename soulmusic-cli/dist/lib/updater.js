"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyUpdate = exports.checkForUpdates = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function checkForUpdates() {
    // Placeholder: pretend to fetch latest metadata
    return { updateAvailable: false, latest: '0.1.0' };
}
exports.checkForUpdates = checkForUpdates;
async function applyUpdate(opts) {
    const out = path_1.default.join(process.cwd(), 'updater', 'last_update.txt');
    if (!fs_1.default.existsSync(path_1.default.dirname(out)))
        fs_1.default.mkdirSync(path_1.default.dirname(out), { recursive: true });
    fs_1.default.writeFileSync(out, `applied:${new Date().toISOString()} src:${opts?.source || 'manual'}`);
    return { path: out };
}
exports.applyUpdate = applyUpdate;
