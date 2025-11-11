import fs from 'fs';
import path from 'path';

export type IdentityOpts = {
  wallet: string;
  truckStyle?: string;
  faction?: string;
  remixHistory?: string;
  output?: string;
};

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export class IdentityManager {
  create(opts: IdentityOpts) {
    const out = opts.output || path.join(process.cwd(), 'identities', `${opts.wallet}.json`);
    ensureDirForFile(out);
    const profile = {
      wallet: opts.wallet,
      truckStyle: opts.truckStyle || 'default',
      faction: opts.faction || 'none',
      remixHistory: opts.remixHistory || [],
      createdAt: new Date().toISOString()
    };
    fs.writeFileSync(out, JSON.stringify(profile, null, 2));
    return { path: out, profile };
  }

  // Backwards-compatible API used by older command files
  createIdentity(wallet: string, truckStyle?: string, faction?: string, remixHistory?: string) {
    return this.create({ wallet, truckStyle, faction, remixHistory });
  }
}
