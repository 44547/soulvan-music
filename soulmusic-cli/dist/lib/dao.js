"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAOVoting = exports.DAO = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensureDirForFile(filePath) {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
}
class DAO {
    record(opts) {
        const proposalText = opts.proposal || (opts.proposalFile && fs_1.default.existsSync(opts.proposalFile) ? fs_1.default.readFileSync(opts.proposalFile, 'utf-8') : '');
        const record = {
            wallet: opts.wallet,
            proposal: proposalText,
            vote: opts.vote || 'abstain',
            timestamp: new Date().toISOString()
        };
        const out = path_1.default.join(process.cwd(), 'dao-votes', `${Date.now()}_${opts.wallet}.json`);
        ensureDirForFile(out);
        fs_1.default.writeFileSync(out, JSON.stringify(record, null, 2));
        return { path: out, record };
    }
}
exports.DAO = DAO;
// Backwards-compatible DAOVoting wrapper used by older command files
class DAOVoting {
    constructor() {
        this.impl = new DAO();
    }
    async submitVote(wallet, proposal, vote) {
        const res = this.impl.record({ wallet, proposal, vote });
        return res.path;
    }
}
exports.DAOVoting = DAOVoting;
