export type BeatGenerationParams = {
  genre: string;
  mood: string;
  tempo: number;
  wallet: string;
  output: string;
};

export type VocalSynthesisParams = {
  lyrics: string;
  language: string;
  style: string;
  wallet: string;
  output: string;
};

export type IdentityCreationParams = {
  wallet: string;
  truckStyle: string;
  faction: string;
  remixHistory: string;
};

export type UpgradeVoteParams = {
  wallet: string;
  proposal: string;
  vote: 'yes' | 'no' | 'abstain';
};

export type TrackSigningParams = {
  input: string;
  wallet: string;
  output: string;
};