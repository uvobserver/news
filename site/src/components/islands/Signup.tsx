import { useState, type SubmitEvent } from 'react';
import { SUBSTACK_SUBSCRIBE_ACTION } from '../../lib/links';

/** Email field + Subscribe, submitted to Substack in a new tab. */
export function Signup() {
  const [done, setDone] = useState(false);
  if (done) return <div className="nav__signup"><span className="signup__done">You're on the list.</span></div>;
  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    if (!e.currentTarget.checkValidity()) return;
    // Let the native POST go to the new tab, then swap in the confirmation.
    setTimeout(() => setDone(true), 0);
  };
  return (
    <form className="nav__signup" action={SUBSTACK_SUBSCRIBE_ACTION} method="post" target="_blank" onSubmit={onSubmit}>
      <input className="signup__input" id="signup-email" type="email" name="email" required placeholder="Enter email to..." aria-label="Enter email to subscribe" />
      <button className="signup__btn" type="submit">Subscribe</button>
    </form>
  );
}
