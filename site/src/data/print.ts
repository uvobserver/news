// In Print page content. Fill in the TK fields; the page and map update on the next build.

export type DistributionBox = {
  /** Where the box is, as readers would say it (e.g. "Dan & Whit's"). */
  name: string;
  address: string;
  town: string;
  lat: number;
  lng: number;
  note?: string;
};

/** Red UVO distribution boxes. Empty until locations are supplied; the map shows the Upper Valley meanwhile. */
export const DISTRIBUTION_BOXES: DistributionBox[] = [];

export type PrintEdition = {
  title: string;
  /** ISO date of the issue. */
  date: string;
  /** Link to a PDF of the issue; leave undefined until one is published. */
  pdf?: string;
  /** Cover image under /public. */
  cover?: string;
  pages?: number;
};

// Known from the print Police Blotter items and the shop listing.
export const PRINT_EDITIONS: PrintEdition[] = [
  { title: 'UV Observer Print Edition', date: '2025-04-01', pages: 4, cover: '/assets/products/p3.webp' },
  { title: 'UV Observer Print Edition', date: '2023-04-01' },
];

/** Initial map view: the Upper Valley, centered between Lebanon, Hanover and White River Junction. */
export const UPPER_VALLEY_VIEW = { lat: 43.66, lng: -72.28, zoom: 11 };
