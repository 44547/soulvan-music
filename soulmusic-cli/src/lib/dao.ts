import fs from 'fs';
import path from 'path';

export type VoteOpts = {
  wallet: string;
  proposal?: string;
  proposalFile?: string;
  vote?: 'yes' | 'no' | 'abstain';
};

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export class DAO {
  record(opts: VoteOpts) {
    const proposalText = opts.proposal || (opts.proposalFile && fs.existsSync(opts.proposalFile) ? fs.readFileSync(opts.proposalFile, 'utf-8') : '');
    const record = {
      wallet: opts.wallet,
      proposal: proposalText,
      vote: opts.vote || 'abstain',
      timestamp: new Date().toISOString()
    };
    const out = path.join(process.cwd(), 'dao-votes', `${Date.now()}_${opts.wallet}.json`);
    ensureDirForFile(out);
    fs.writeFileSync(out, JSON.stringify(record, null, 2));
    return { path: out, record };
  }
}

// Backwards-compatible DAOVoting wrapper used by older command files
export class DAOVoting {
  private impl = new DAO();
  async submitVote(wallet: string, proposal: string, vote: 'yes' | 'no' | 'abstain') {
    const res = this.impl.record({ wallet, proposal, vote });
    return res.path;
  }
}
