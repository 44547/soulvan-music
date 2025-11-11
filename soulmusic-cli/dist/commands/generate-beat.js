"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBeat = void 0;
const beat_generator_1 = require("../lib/beat-generator");
function generateBeat(genre, mood, tempo, wallet, output) {
    const beatGenerator = new beat_generator_1.BeatGenerator();
    beatGenerator.generate({
        genre,
        mood,
        tempo,
        wallet,
        output
    });
}
exports.generateBeat = generateBeat;
