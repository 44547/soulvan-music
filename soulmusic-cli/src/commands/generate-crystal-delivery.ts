import fs from 'fs';
export async function generateCrystalDelivery(input: string, mission: string, wallet: string, output: string) {
  const meta = { input, mission, wallet, output, deliveredAt: new Date().toISOString() };
  fs.writeFileSync(output, JSON.stringify({ crystalDelivery: meta }, null, 2));
  return { path: output, meta };
}