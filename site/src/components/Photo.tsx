import type { CSSProperties } from 'react';

/** Cropped story/product art rendered as a background, as in the prototype. Decorative: the headline sits beside it. */
export function Photo({ src, width, ar, className = '', style }: { src?: string; width?: string; ar?: number; className?: string; style?: CSSProperties }) {
  if (!src) return <Placeholder className={className} style={{ width, aspectRatio: ar ? String(ar) : undefined, ...style }} />;
  return (
    <div
      aria-hidden="true"
      className={`photo ${className}`}
      style={{ width, aspectRatio: ar ? String(ar) : undefined, backgroundImage: `url("${src}")`, ...style }}
    />
  );
}

export function Placeholder({ label = 'Photo', className = '', style }: { label?: string; className?: string; style?: CSSProperties }) {
  return <div aria-hidden="true" className={`placeholder ${className}`} style={style}>{label}</div>;
}
