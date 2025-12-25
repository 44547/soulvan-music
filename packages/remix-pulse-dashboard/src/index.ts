import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 4200;

app.use('/static', express.static(path.join(__dirname, '..', 'static')));

// API: list DNA strands from identities folder
app.get('/api/dna', (_req, res) => {
  const identitiesDir = path.join(process.cwd(), '..', '..', 'soulmusic-cli', 'identities');
  if (!fs.existsSync(identitiesDir)) return res.json({ data: [] });
  const files = fs.readdirSync(identitiesDir).filter(f => f.endsWith('.dna.json'));
  const all = [] as any[];
  for (const f of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(identitiesDir, f), 'utf-8'));
      all.push({ wallet: f.replace('.dna.json',''), strands: content });
    } catch (e) {}
  }
  res.json({ data: all });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'static', 'index.html'));
});

app.listen(PORT, () => console.log(`Remix Pulse Dashboard running on http://localhost:${PORT}`));
