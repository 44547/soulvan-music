import { Wallet } from '../modules/identity/wallet';

export function createIdentity(wallet: string, truckStyle: string, faction: string, remixHistory: string): void {
    const identity = new Wallet(wallet, truckStyle, faction, remixHistory);
    identity.save();
    console.log(`Identity created for wallet: ${wallet}`);
}