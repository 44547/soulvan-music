import fs from 'fs';
import path from 'path';

export type MentorResult = {
  originality_score: number;
  flow_rating: string;
  suggestions: string[];
};

export async function mentorFeedback(input: string, wallet?: string, faction?: string): Promise<MentorResult> {
  if (!fs.existsSync(input)) throw new Error('input not found: ' + input);
  const size = fs.statSync(input).size || 12345;
  const originality = Number((50 + (size % 50)).toFixed(1));
  const flow = originality > 75 ? 'Cinematic' : originality > 50 ? 'Polished' : 'Raw';
  const suggestions = [];
  if (originality < 60) suggestions.push('Add ambient echo in outro');
  if (originality < 40) suggestions.push('Layer tribal drums in bridge');
  if (faction === 'Skyfire') suggestions.push('Try brass swell before the climax');
  suggestions.push('Consider multilingual vocal fusion');

  const out = path.join(process.cwd(), 'mentor', `${path.basename(input)}.${wallet || 'anon'}.mentor.json`);
  const dir = path.dirname(out);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const result: MentorResult = { originality_score: originality, flow_rating: flow, suggestions };
  fs.writeFileSync(out, JSON.stringify(result, null, 2));
  return result;
}
