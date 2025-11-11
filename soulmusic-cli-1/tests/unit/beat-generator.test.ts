import { generateBeat } from '../../src/commands/generate-beat';
import { expect } from 'chai';

describe('Beat Generator Module', () => {
  it('should generate a beat with valid parameters', async () => {
    const genre = 'Drill';
    const mood = 'Cinematic';
    const tempo = 140;
    const wallet = '0xABC123...';
    const output = './beats/drill_cinema.wav';

    const result = await generateBeat(genre, mood, tempo, wallet, output);
    
    expect(result).to.have.property('success', true);
    expect(result).to.have.property('outputPath', output);
  });

  it('should throw an error for invalid genre', async () => {
    const genre = 'InvalidGenre';
    const mood = 'Cinematic';
    const tempo = 140;
    const wallet = '0xABC123...';
    const output = './beats/drill_cinema.wav';

    try {
      await generateBeat(genre, mood, tempo, wallet, output);
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.include('Invalid genre');
    }
  });

  it('should throw an error for missing output path', async () => {
    const genre = 'Drill';
    const mood = 'Cinematic';
    const tempo = 140;
    const wallet = '0xABC123...';
    const output = '';

    try {
      await generateBeat(genre, mood, tempo, wallet, output);
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.include('Output path is required');
    }
  });
});