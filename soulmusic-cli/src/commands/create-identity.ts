import { IdentityManager } from '../lib/identity';

interface CreateIdentityOptions {
  wallet: string;
  truckStyle: string;
  faction: string;
  remixHistory: string;
}

export function createIdentity(options: CreateIdentityOptions) {
  const { wallet, truckStyle, faction, remixHistory } = options;

  const identityManager = new IdentityManager();
  const identity = identityManager.createIdentity(wallet, truckStyle, faction, remixHistory);

  return identity;
}