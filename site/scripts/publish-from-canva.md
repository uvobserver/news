# Publishing posts from Canva

These are the instructions for the daily scheduled task that publishes posts to the site. A person can follow them too.

**How it works:** the editor designs a post in Canva, names the design `YYYYMMDD - Headline` (the Instagram date, then the exact headline), posts it to Instagram, then moves the design into the Canva folder **UVO Website**. Everything after that happens here.

## Steps (run from `site/`)

1. Using the Canva connector, list the designs in the folder named **UVO Website**.
2. Skip every design whose id already appears as `"canva"` in `src/data/posts.json`.
3. Handle each remaining design, oldest first:
   - **Date and headline:** titles look like `20260905 - Wrong Rivian Waved At`. The date is the part before ` - `; the headline is the rest, trimmed, used as written (fix only an obvious misspelling, and mention it in the summary). If the title has no leading date or still looks like `Copy of …` or `Untitled`, skip the design and mention it in the summary.
   - **Category:** pick the closest existing category in `ARCHIVE_TAGS` (`src/data/index.ts`) from the headline. Prefer place names when the headline names a town, e.g. Norwich, West Leb, Hanover.
   - **Image:** export the design as JPG, 1100 px wide, quality 90, and keep the export URL. Don't download the image here: the cloud environment's network blocks Canva's download server.
4. If nothing new was found, say so and stop. Otherwise, start the GitHub Action with every new post at once. The Action downloads each image, runs `npm run add-post`, checks the build, and commits to `main`. Cloudflare then publishes the commit.
   ```sh
   gh api repos/uvobserver/news/actions/workflows/add-posts.yml/dispatches -X POST \
     -f ref=main -f 'inputs[posts]=[{"image":"<export URL>","canva":"<design id>","title":"<headline>","tag":"<category>","date":"YYYY-MM-DD"}]'
   ```
5. Wait for the run to finish: `gh run list --workflow add-posts.yml --limit 1`, then `gh run view <id>`. If it failed, report the failing step's log.
6. Summarize: list each post added, with its category and its `https://www.uvobserver.com/story/<slug>/` link (the slug is shown on the run's build log). Also list any designs skipped and why.

## Requirements for the session

- The **Canva** connector must be enabled.
- GitHub access to `uvobserver/news`, with permission to run Actions.

To add a post by hand without the Action, export the image to a file and run: `npm run add-post -- --image <file> --canva <design id> --title "<headline>" --tag "<category>" --date <YYYY-MM-DD>`
