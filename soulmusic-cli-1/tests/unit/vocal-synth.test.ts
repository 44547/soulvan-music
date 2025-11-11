import { generateVocal } from '../../src/commands/generate-vocal';
import { expect } from 'chai';

describe('Vocal Synth Module', () => {
  it('should generate vocals with valid parameters', async () => {
    const outputPath = './vocals/test_output.wav';
    const result = await generateVocal({
      lyrics: 'We rise from mythic fire...',
      language: 'English',
      style: 'Melodic Trap',
      wallet: '0xABC123...',
      output: outputPath,
    });

    expect(result).to.have.property('success', true);
    expect(result).to.have.property('outputPath', outputPath);
  });

  it('should fail with missing lyrics', async () => {
    try {
      await generateVocal({
        lyrics: '',
        language: 'English',
        style: 'Melodic Trap',
        wallet: '0xABC123...',
        output: './vocals/test_output.wav',
      });
    } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.equal('Lyrics are required.');
    }
  });

  it('should fail with invalid language', async () => {
    try {
      await generateVocal({
        lyrics: 'We rise from mythic fire...',
        language: 'InvalidLanguage',
        style: 'Melodic Trap',
        wallet: '0xABC123...',
        output: './vocals/test_output.wav',
      });
    } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.equal('Invalid language specified.');
    }
  });
});