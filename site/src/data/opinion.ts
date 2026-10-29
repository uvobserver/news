// Opinion pieces with their full text, transcribed from the print editions (see /public/print).
// Homepage cards use `title` and `dek` from content.ts; the article pages use everything here.
import { OPINION } from './content';
import { slugify } from './index';

type Body = {
  /** Headline as printed (the homepage card may use a shorter title). */
  headline: string;
  /** Paragraphs; may contain inline <em>/<strong> markup. */
  paragraphs: string[];
  edition: { label: string; pdf: string; page: number };
};

const BODIES: Record<string, Body> = {
  Editorial: {
    headline: 'Everything Is Going Great, And I’m Sure Everyone Is Trying Their Best',
    edition: { label: 'April 1, 2025 print edition', pdf: '/print/uv-observer-2025-04-01.pdf', page: 3 },
    paragraphs: [
      'When I woke up this morning to a beautiful sunrise, I had to close the shades as I’m very light-sensitive since being kicked in the head by a 17-hand thoroughbred chestnut horse.',
      'This is the newspaper I write for, correct? It’s hard to tell, I’m not really supposed to look at screens until my left retina re-attaches.',
      'The competent Doctors at the well-run Dartmouth Hitchcock Hospital say I have a <em>Grade III</em> Concussion with a depressed skull fracture– ouchie!',
      'But I’m not going to let that stop me from writing about goings-on in the Upper Valley that I cannot attend while on bed-rest. Feeling grateful!',
      'As my wife drove me home on smooth, well-maintained roads with very little traffic to speak of, I was struck by what a great job our municipal services have been doing.',
      'Once the vertigo subsides and I can walk without losing my balance I’m going to march right downtown to demand that they be acknowledged for their commitment to civil service.',
      'Over the constant ringing in my ears I heard that the new Town Administrator was running things at Town Hall exactly the way I would have hoped he would. No notes!',
      'While resting-up at home I’ve been very encouraged by what I’ve been able to read in the news in quick, three-minute increments between headaches.',
      'From what I can see through this double-vision, everyone out there seems to be doing the best they can in navigating the inherent challenges of daily life.',
      'The world appears very equitable, and I was so pleased to hear through my good ear that more new people are moving to town. Just met a couple from New York City, neat!',
      'I wouldn’t change a thing.',
    ],
  },
  'Economy Columnist': {
    headline: 'I Pledge To Do Everything I Can To Address The Housing Crisis, Except Of Course Making It Easier To Build More Housing Or Pay People Enough To Afford Housing, And As Long As None Of It Is Built Near My Neighborhood',
    edition: { label: 'April 1, 2023 print edition', pdf: '/print/uv-observer-2023-04-01.pdf', page: 3 },
    // Transcribed as printed, including "were proud", "wilfully" and "when its published".
    paragraphs: [
      'As a regional employer I know that the housing shortage is the number one concern facing our employees and my company’s ability to hire and grow.',
      'That’s why were proud to play a small role in a functionally meaningless effort to talk in circles for a few more years about how we need more housing, while continuing to wilfully turn a blind eye towards the structural issues that caused– and continue to exacerbate– this crisis are addressed in any meaningful way.',
      'Now, we could adjust our company’s wage structure to catch up with three decades of cost of living increases so that our valued employees can afford suitable housing in the region, but instead we’re just going to issue a call for more “Affordable Housing” and hope that someone will magically create housing they’re willing to rent or sell for far-less than it would cost them to build it.',
      'Could we consider just building more housing in a manner that responds to the Supply/Demand realities that anyone who has ever heard the word “economics” can understand? Maybe! But instead, let’s see what the 4th report we’ve commissioned on the same issue says when its published.',
      'Once we’ve confirmed everything we already know, I’ll be the first to quietly oppose anything proposed near my house under the guise of protecting neighborhood character.',
    ],
  },
};

export const OPINION_PIECES = OPINION.map(o => {
  const body = BODIES[o.kicker];
  if (!body) throw new Error(`No full text for opinion piece "${o.kicker}" in src/data/opinion.ts`);
  return { ...o, ...body, slug: slugify(o.title) };
});
export type OpinionPiece = (typeof OPINION_PIECES)[number];
