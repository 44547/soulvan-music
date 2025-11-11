export interface GenerateBeatParams {
    genre: string;
    mood: string;
    tempo: number;
    wallet: string;
    output: string;
}

export interface GenerateVocalParams {
    lyrics: string;
    language: string;
    style: string;
    wallet: string;
    output: string;
}

export interface CreateIdentityParams {
    wallet: string;
    truckStyle: string;
    faction: string;
    remixHistory: string;
}

export interface VoteUpgradeParams {
    wallet: string;
    proposal: string;
    vote: 'yes' | 'no' | 'abstain';
}

export interface SignTrackParams {
    input: string;
    wallet: string;
    output: string;
}