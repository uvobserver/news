// React ports of the UV Observer design-system components used by the site
// (project/_ds/…/_ds_bundle.js). Styles match the bundle exactly.
import type { ReactNode } from 'react';
import type { KickerColor } from '../data/types';

export function Kicker({ children, color = 'primary', size }: { children: ReactNode; color?: KickerColor; size?: number }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: size ? `${size}px` : 'var(--text-kicker)',
        letterSpacing: 'var(--tracking-kicker)',
        textTransform: 'uppercase',
        fontWeight: 800,
        color: color === 'secondary' ? 'var(--brand-secondary)' : 'var(--brand-primary)',
      }}
    >
      {children}
    </span>
  );
}

type HeadlineLevel = 'xl' | 'lg' | 'md' | 'sm';
const HEADLINE_SIZES: Record<HeadlineLevel, string> = {
  xl: 'var(--text-headline-xl)',
  lg: 'var(--text-headline-lg)',
  md: 'var(--text-headline-md)',
  // Not a bundle size: the prototype's level="sm" fell through to the inherited 16px.
  sm: '16px',
};

export function Headline({ children, level = 'lg', as }: { children: ReactNode; level?: HeadlineLevel; as?: 'h1' | 'h2' | 'h3' }) {
  const Tag = as ?? (level === 'xl' ? 'h1' : level === 'lg' ? 'h2' : 'h3');
  return (
    <Tag
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: level === 'md' ? 700 : 900,
        fontSize: HEADLINE_SIZES[level],
        lineHeight: 'var(--leading-tight)',
        color: 'var(--text-headline)',
        margin: 0,
      }}
    >
      {children}
    </Tag>
  );
}

export function Rule({ weight = 'thin' }: { weight?: 'thin' | 'thick' }) {
  return (
    <div
      style={{
        height: weight === 'thick' ? 'var(--rule-thick)' : 'var(--rule-thin)',
        background: weight === 'thick' ? 'var(--ink-900)' : 'var(--hairline)',
        width: '100%',
      }}
    />
  );
}

// SubscribeButton is used as a class (.ds-subscribe) so it can render as a link; see styles/site.css.
