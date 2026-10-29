import type { DistributionBox } from '../data/print';

export type PlacedBox = DistributionBox & { lat: number; lng: number };

// Build-time lookup of box coordinates from OpenStreetMap's Nominatim service, so boxes only need an
// address. Runs a few requests per build, one per second, as Nominatim's usage policy asks. If a lookup
// fails the build carries on: that box stays in the list but gets no map pin (a warning is logged).
const ENDPOINT = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'UVObserverSite/1.0 (https://www.uvobserver.com; editor@uvobserver.com)';

export async function placeBoxes(boxes: DistributionBox[]): Promise<PlacedBox[]> {
  const placed: PlacedBox[] = [];
  let first = true;
  for (const box of boxes) {
    if (box.lat != null && box.lng != null) { placed.push(box as PlacedBox); continue; }
    if (!first) await new Promise(r => setTimeout(r, 1100));
    first = false;
    const params = new URLSearchParams({
      street: box.street, city: box.town, state: box.state, postalcode: box.zip,
      countrycodes: 'us', format: 'jsonv2', limit: '1',
    });
    try {
      const res = await fetch(`${ENDPOINT}?${params}`, { headers: { 'User-Agent': USER_AGENT }, signal: AbortSignal.timeout(10_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const [hit] = (await res.json()) as { lat: string; lon: string }[];
      if (!hit) throw new Error('no match');
      placed.push({ ...box, lat: Number(hit.lat), lng: Number(hit.lon) });
    } catch (err) {
      console.warn(`[in-print] No map pin for "${box.name}" (${box.street}, ${box.town}): ${(err as Error).message}. Add lat/lng in src/data/print.ts.`);
    }
  }
  return placed;
}
