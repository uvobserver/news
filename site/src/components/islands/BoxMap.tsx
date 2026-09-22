import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import type { PlacedBox } from '../../lib/geocode';

/** OpenStreetMap of the red distribution boxes. Leaflet needs `window`, so it loads after mount. */
export function BoxMap({ boxes, center }: { boxes: PlacedBox[]; center: { lat: number; lng: number; zoom: number } }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let map: import('leaflet').Map | undefined;
    let cancelled = false;
    import('leaflet').then(L => {
      if (cancelled || !el.current) return;
      map = L.map(el.current, { scrollWheelZoom: false }).setView([center.lat, center.lng], center.zoom);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      const icon = L.divIcon({ className: 'boxpin', html: '<span></span>', iconSize: [18, 22], iconAnchor: [9, 22], popupAnchor: [0, -20] });
      const markers = boxes.map(b =>
        L.marker([b.lat, b.lng], { icon, title: b.name })
          .bindPopup(`<strong>${escape(b.name)}</strong><br>${escape(b.street)}, ${escape(b.town)}, ${b.state}${b.note ? `<br><em>${escape(b.note)}</em>` : ''}`)
          .addTo(map!),
      );
      if (markers.length > 1) map.fitBounds(L.featureGroup(markers).getBounds().pad(0.25));
    });
    return () => { cancelled = true; map?.remove(); };
  }, [boxes, center]);
  return <div ref={el} className="boxmap" role="region" aria-label="Map of UV Observer distribution boxes" />;
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
