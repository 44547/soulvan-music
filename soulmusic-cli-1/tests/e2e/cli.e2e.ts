import { exec } from 'child_process';
import { expect } from 'chai';

describe('SoulvanMusic CLI End-to-End Tests', () => {
  const walletAddress = '0xABC123...';

  it('should generate a beat successfully', (done) => {
    exec(`node src/bin/soulmusic-cli.js generate-beat --genre "Drill" --mood "Cinematic" --tempo 140 --wallet "${walletAddress}" --output "./beats/drill_cinema.wav"`, (error, stdout, stderr) => {
      expect(error).to.be.null;
      expect(stdout).to.include('Beat generated successfully');
      done();
    });
  });

  it('should generate a vocal successfully', (done) => {
    exec(`node src/bin/soulmusic-cli.js generate-vocal --lyrics "We rise from mythic fire..." --style "Melodic Trap" --language "English" --wallet "${walletAddress}" --output "./vocals/mythic_fire.wav"`, (error, stdout, stderr) => {
      expect(error).to.be.null;
      expect(stdout).to.include('Vocal generated successfully');
      done();
    });
  });

  it('should create a music identity successfully', (done) => {
    exec(`node src/bin/soulmusic-cli.js create-identity --wallet "${walletAddress}" --truck-style "Hypertruck" --faction "Skyfire" --remix-history "./remixes/*.wav"`, (error, stdout, stderr) => {
      expect(error).to.be.null;
      expect(stdout).to.include('Identity created successfully');
      done();
    });
  });

  it('should submit a vote for an upgrade successfully', (done) => {
    exec(`node src/bin/soulmusic-cli.js vote-upgrade --wallet "${walletAddress}" --proposal "Add Mongolian throat singing to vocal styles" --vote "yes"`, (error, stdout, stderr) => {
      expect(error).to.be.null;
      expect(stdout).to.include('Vote submitted successfully');
      done();
    });
  });

  it('should sign a track successfully', (done) => {
    exec(`node src/bin/soulmusic-cli.js sign-track --input "./beats/drill_cinema.wav" --wallet "${walletAddress}" --output "./signed/drill_cinema_signed.wav"`, (error, stdout, stderr) => {
      expect(error).to.be.null;
      expect(stdout).to.include('Track signed successfully');
      done();
    });
  });
});