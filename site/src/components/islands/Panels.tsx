import { BLOTTER, FORUM } from '../../data';
import { Kicker } from '../../ds';
import { RotatingPanel } from './RotatingPanel';

export function BlotterPanel() {
  return (
    <RotatingPanel
      variant="blotter" label={<Kicker color="secondary">Police Blotter</Kicker>} items={BLOTTER} interval={7000}
      render={b => (
        <>
          <div className="blotter__town">{b.town}</div>
          <div className="blotter__text">{b.text}</div>
        </>
      )}
    />
  );
}

export function ForumPanel() {
  return (
    <RotatingPanel
      variant="forum" label={<span className="panel__label">Forum</span>} items={FORUM} interval={9000}
      render={f => (
        <>
          <div className="forum__title">{f.title}</div>
          <div className="forum__text">{f.text}</div>
          <div className="forum__sig">{f.sig}</div>
        </>
      )}
    />
  );
}
