export type Rhythm = {
    tempo: number;
    timeSignature: string;
    pattern: number[];
};

export type AudioTrack = {
    id: string;
    name: string;
    duration: number;
    volume: number;
    pan: number;
};

export interface Instrument {
    play(note: string, velocity: number): void;
    stop(note: string): void;
}

export interface AIModel {
    train(data: any[]): Promise<void>;
    predict(input: any): Promise<any>;
}

export interface SequencerState {
    tracks: AudioTrack[];
    currentTime: number;
    isPlaying: boolean;
}

export interface AudioConfig {
    inputDevice: string;
    outputDevice: string;
    sampleRate: number;
}