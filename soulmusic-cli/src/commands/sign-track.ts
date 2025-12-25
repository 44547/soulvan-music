import { ProvenanceManager } from '../lib/provenance';
import { readFileSync, writeFileSync } from 'fs';

export function signTrack(input: string, wallet: string, output: string) {
    // Read the input track file
    const trackData = readFileSync(input);
    
    // Create an instance of ProvenanceManager
    const provenanceManager = new ProvenanceManager();
    
    // Sign the track with originality score and provenance metadata
    const signedTrack = provenanceManager.sign(trackData, wallet);
    
    // Write the signed track to the output path
    writeFileSync(output, signedTrack);
}