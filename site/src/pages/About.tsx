import { Headline } from '../ds';
import { INSTAGRAM_URL, SUBSTACK_URL, TIP_EMAIL } from '../lib/links';

export function About() {
  return (
    <div className="simplepage about">
      <Headline level="xl" as="h1">Contact</Headline>
      <div className="about__intro">
        The <i>Upper Valley Observer</i>&nbsp;is a satirical regional newspaper serving the Upper Valley of VT/NH, published occasionally. For story tips, corrections, and complaints please contact below.
      </div>
      <div className="about__contacts">
        <div><span className="about__label">Tip Line</span><br /><a href={`mailto:${TIP_EMAIL}`}>{TIP_EMAIL}</a></div>
        <div><span className="about__label">Instagram</span><br /><a href={INSTAGRAM_URL} target="_blank" rel="noopener">@uvobserver</a></div>
        <div><span className="about__label">Substack</span><br /><a href={SUBSTACK_URL} target="_blank" rel="noopener">uvobserver.substack.com</a></div>
      </div>
    </div>
  );
}
