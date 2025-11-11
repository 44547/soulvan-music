"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTrack = void 0;
const provenance_1 = require("../lib/provenance");
const fs_1 = require("fs");
function signTrack(input, wallet, output) {
    // Read the input track file
    const trackData = (0, fs_1.readFileSync)(input);
    // Create an instance of ProvenanceManager
    const provenanceManager = new provenance_1.ProvenanceManager();
    // Sign the track with originality score and provenance metadata
    const signedTrack = provenanceManager.sign(trackData, wallet);
    // Write the signed track to the output path
    (0, fs_1.writeFileSync)(output, signedTrack);
}
exports.signTrack = signTrack;
