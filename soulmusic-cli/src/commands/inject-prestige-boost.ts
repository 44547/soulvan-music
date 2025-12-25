import fs from 'fs';
export async function injectPrestigeBoost(wallet: string, remix: string, event: string, output: string) {
  const meta = { wallet, remix, event, output, boostedAt: new Date().toISOString() };
  fs.writeFileSync(output, JSON.stringify({ prestigeBoost: meta }, null, 2));
  return { path: output, meta };
}