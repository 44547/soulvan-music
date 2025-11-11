"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrefab = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
async function generatePrefab(input, mission, wallet, output) {
    if (!fs_1.default.existsSync(input))
        throw new Error('input not found: ' + input);
    // If Python helper exists, use it to split the audio into real segments
    const helper = path_1.default.join(process.cwd(), '..', 'tools', 'split_wav.py');
    let segments = [];
    try {
        const helperPath = path_1.default.join(process.cwd(), 'tools', 'split_wav.py');
        const altHelper = helperPath;
        const script = fs_1.default.existsSync(altHelper) ? altHelper : helper;
        if (fs_1.default.existsSync(script)) {
            const outDir = path_1.default.join(process.cwd(), 'unity', 'audio_segments', path_1.default.basename(input, path_1.default.extname(input)));
            ensureDirForFile(outDir + '/x');
            const cmd = `python3 "${script}" "${input}" "${outDir}"`;
            const res = (0, child_process_1.execSync)(cmd, { encoding: 'utf-8' });
            const parsed = JSON.parse(res);
            segments = parsed.segments;
        }
    }
    catch (e) {
        // fallback to default placeholder segments
        segments = [
            { name: 'intro', start: 0, end: 15, path: input },
            { name: 'build_up', start: 15, end: 45, path: input },
            { name: 'climax', start: 45, end: 75, path: input },
            { name: 'outro', start: 75, end: 90, path: input }
        ];
    }
    const prefabName = (mission || 'mission').replace(/\s+/g, '_');
    const spec = {
        prefabName,
        audioSource: path_1.default.basename(input),
        segments: segments.map(s => ({ name: s.name, start: s.start, end: s.end, file: path_1.default.relative(process.cwd(), s.path) })),
        ambient_fx: ['wind', 'drone hum'],
        voiceover: `Wallet:${wallet || 'anon'}`,
        generatedAt: new Date().toISOString()
    };
    const out = output || path_1.default.join(process.cwd(), 'unity', 'prefabs', `${prefabName}.prefab.json`);
    ensureDirForFile(out);
    fs_1.default.writeFileSync(out, JSON.stringify(spec, null, 2));
    return { path: out, spec };
}
exports.generatePrefab = generatePrefab;
