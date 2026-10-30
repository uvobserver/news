# Publishing posts from Canva

These are the instructions for the daily scheduled task that publishes posts to the site. A person can follow them too.

**How it works:** the editor designs a post in Canva, names the design with the exact headline, posts it to Instagram, then moves the design into the Canva folder **UVO Website**. Everything after that happens here.

## Steps (run from `site/`)

1. Using the Canva connector, list the designs in the folder named **UVO Website**.
2. Skip every design whose id already appears as `"canva"` in `src/data/posts.json`.
3. Handle each remaining design, oldest first:
   - **Headline:** the design title, used exactly as written. If the title still looks like `Copy of …` or `Untitled`, skip the design and mention it in the summary.
   - **Date:** if the title ends in a date such as `— 2026-09-14`, use that date and remove it from the headline. Otherwise use the date the design was last updated.
   - **Category:** pick the closest existing category in `ARCHIVE_TAGS` (`src/data/index.ts`) from the headline. Prefer place names when the headline names a town, e.g. Norwich, West Leb, Hanover.
   - **Image:** export the design as JPG, 1100 px wide, quality 90. Download the file to the scratchpad.
   - Run `npm run add-post -- --image <file> --canva <design id> --title "<headline>" --tag "<category>" --date <YYYY-MM-DD>`
4. Run `npm run build` and check that it passes.
5. Commit the new images and `posts.json` to `main` with the message `Add posts from Canva: <headlines>`, then push. Cloudflare publishes the push automatically.
6. Summarize: list each post added, with its category and its `/story/…` link. Also list any designs skipped and why. If nothing new was in the folder, say so and make no commit.

## Requirements for the session

- The **Canva** connector must be enabled.
- The network allowlist must include `export-download.canva.com`, so the exported images can be downloaded.
