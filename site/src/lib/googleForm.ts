// Google Forms can be embedded, but only from the long docs.google.com/forms/.../viewform address with
// ?embedded=true. The short forms.gle link is resolved at build time. If that fails (e.g. offline builds),
// the page shows only the "Apply" button, which opens the form directly.
export async function embeddableFormUrl(shortUrl: string): Promise<string | undefined> {
  try {
    const res = await fetch(shortUrl, { redirect: 'manual', signal: AbortSignal.timeout(10_000) });
    const target = res.headers.get('location') ?? (res.ok ? res.url : null);
    if (!target) throw new Error(`HTTP ${res.status}, no redirect`);
    const u = new URL(target, shortUrl);
    if (u.hostname !== 'docs.google.com' || !u.pathname.includes('/viewform')) throw new Error(`unexpected target ${u.href}`);
    u.search = '';
    u.searchParams.set('embedded', 'true');
    return u.href;
  } catch (err) {
    console.warn(`[in-print] Couldn't resolve the host form for embedding (${(err as Error).message}); showing the link only.`);
    return undefined;
  }
}
