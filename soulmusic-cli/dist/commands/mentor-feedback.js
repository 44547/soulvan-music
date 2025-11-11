"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentorFeedback = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function mentorFeedback(input, wallet, faction) {
    if (!fs_1.default.existsSync(input))
        throw new Error('input not found: ' + input);
    const size = fs_1.default.statSync(input).size || 12345;
    const originality = Number((50 + (size % 50)).toFixed(1));
    const flow = originality > 75 ? 'Cinematic' : originality > 50 ? 'Polished' : 'Raw';
    const suggestions = [];
    if (originality < 60)
        suggestions.push('Add ambient echo in outro');
    if (originality < 40)
        suggestions.push('Layer tribal drums in bridge');
    if (faction === 'Skyfire')
        suggestions.push('Try brass swell before the climax');
    suggestions.push('Consider multilingual vocal fusion');
    const out = path_1.default.join(process.cwd(), 'mentor', `${path_1.default.basename(input)}.${wallet || 'anon'}.mentor.json`);
    const dir = path_1.default.dirname(out);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
    const result = { originality_score: originality, flow_rating: flow, suggestions };
    fs_1.default.writeFileSync(out, JSON.stringify(result, null, 2));
    return result;
}
exports.mentorFeedback = mentorFeedback;
