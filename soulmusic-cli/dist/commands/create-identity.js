"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentity = void 0;
const identity_1 = require("../lib/identity");
function createIdentity(options) {
    const { wallet, truckStyle, faction, remixHistory } = options;
    const identityManager = new identity_1.IdentityManager();
    const identity = identityManager.createIdentity(wallet, truckStyle, faction, remixHistory);
    return identity;
}
exports.createIdentity = createIdentity;
