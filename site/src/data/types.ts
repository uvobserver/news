export type RawStory = {
  id: string;
  title: string;
  /** ISO date (YYYY-MM-DD) of original publication. */
  date: string;
  tag: string;
  photo: string;
  /** Aspect ratio (w/h) of `photo`. */
  ar: number;
  dek?: string;
};

export type KickerColor = 'primary' | 'secondary';

export type Story = RawStory & {
  kickerColor: KickerColor;
  displayDate: string;
  /** URL segment for /story/<slug>/, from the headline; stable once published. */
  slug: string;
};

/** Long-form piece shown in a homepage carousel. */
export type Feature = { title: string; dek: string; photo: string; ar: number; link?: string };
export type Brief = { title: string; date: string; link?: string };
export type RelatedItem = { title: string; date: string; photo: string; ar: number };
export type IgPost = { link: string; image: string };
export type Product = { slotId: string; title: string; price: string; desc: string; photo?: string };
export type BlotterItem = { town: string; edition: string; text: string };
export type ForumLetter = { title: string; text: string; sig: string };
export type OpinionPiece = { kicker: string; title: string; byline: string; dek: string };
