export interface ContributorIdentity {
    wallet: string;
    truckStyle: string;
    faction: string;
    remixHistory: string[];
}

export function createIdentity(wallet: string, truckStyle: string, faction: string, remixHistory: string[]): ContributorIdentity {
    return {
        wallet,
        truckStyle,
        faction,
        remixHistory
    };
}

export function getIdentity(identity: ContributorIdentity): string {
    return `Wallet: ${identity.wallet}, Truck Style: ${identity.truckStyle}, Faction: ${identity.faction}, Remix History: ${identity.remixHistory.join(', ')}`;
}