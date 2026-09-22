import { Rule } from '../ds';

export function Footer() {
  return (
    <>
      <Rule weight="thick" />
      <footer className="footer noprint">
        <span>© The UV Observer.</span>
        <span>Unreal Coverage of the Upper Valley. Published Occasionally.</span>
      </footer>
    </>
  );
}
