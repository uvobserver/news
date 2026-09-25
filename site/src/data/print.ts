// In Print page content. Edit here; the page and map update on the next build.

export type DistributionBox = {
  /** Where the box is, as readers would say it (e.g. "Dan & Whit's"). */
  name: string;
  street: string;
  town: string;
  state: 'VT' | 'NH';
  zip: string;
  /** Optional. When omitted, the build looks the address up on OpenStreetMap (see lib/geocode.ts). */
  lat?: number;
  lng?: number;
  note?: string;
};

/** Red UVO distribution boxes. */
export const DISTRIBUTION_BOXES: DistributionBox[] = [
  { name: "Dan & Whit's", street: '319 Main Street', town: 'Norwich', state: 'VT', zip: '05055' },
  { name: "Lucky's Coffee Garage", street: '1 North Park Street', town: 'Lebanon', state: 'NH', zip: '03766' },
  { name: 'Standard Company Tattoo', street: '59 North Main Street', town: 'White River Junction', state: 'VT', zip: '05001' },
  { name: '57 Main Street', street: '57 Main Street', town: 'West Lebanon', state: 'NH', zip: '03784' },
];

/** Photos of boxes in the wild, shown as a strip under the In Print intro. */
export const BOX_PHOTOS: { src: string; caption: string; alt: string }[] = [
  { src: '/assets/boxes/dan-and-whits.jpg', caption: "Dan & Whit's, Norwich", alt: "Red UV Observer box outside Dan & Whit's in Norwich" },
  { src: '/assets/boxes/luckys-coffee-garage.jpg', caption: "Lucky's Coffee Garage, Lebanon", alt: "Red UV Observer box outside Lucky's Coffee Garage in Lebanon" },
  { src: '/assets/boxes/standard-company-tattoo.jpg', caption: 'Standard Company Tattoo, White River Jct.', alt: 'Red UV Observer box outside Standard Company Tattoo in White River Junction' },
  { src: '/assets/boxes/57-main-street.jpg', caption: '57 Main Street, West Lebanon', alt: 'White UV Observer box by the fence at 57 Main Street in West Lebanon' },
];

export type PrintEdition = {
  title: string;
  /** ISO date of the issue. */
  date: string;
  /** Link to a PDF of the issue (files live in /public/print). */
  pdf?: string;
  /** Cover image under /public. */
  cover?: string;
  pages?: number;
};

export const PRINT_EDITIONS: PrintEdition[] = [
  { title: 'UV Observer Print Edition', date: '2025-04-01', pages: 4, pdf: '/print/uv-observer-2025-04-01.pdf', cover: '/assets/print/cover-2025-04-01.jpg' },
  { title: 'UV Observer Print Edition', date: '2023-04-01', pages: 4, pdf: '/print/uv-observer-2023-04-01.pdf', cover: '/assets/print/cover-2023-04-01.jpg' },
];

/** Initial map view: the Upper Valley, centered between Lebanon, Hanover and White River Junction. */
export const UPPER_VALLEY_VIEW = { lat: 43.66, lng: -72.28, zoom: 11 };
