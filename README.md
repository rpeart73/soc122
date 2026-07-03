# SOC122 Corpus

The reading room for **SOC122: Introduction to the Social Sciences** at Seneca Polytechnic.

A student-facing source library: search and filter the course readings, move through the course by week, drill into one source, and hold up to three readings side by side in the compare view. The app never writes a synthesis between the two eyes; the comparison columns stay attributed and separate, and the integration is the student's own work (Etuaptmumk). The current data set has 22 readings and 56 glossary concepts.

The repo also serves the SOC122 weekly walkthrough decks at `/walkthroughs/`. Those decks are generated from the shared walkthrough YAML source in `projects/Seneca Polytechnic/walkthrough/content/SOC122/`.

It is a **companion to Blackboard**, not a replacement. Official records, discussion, grades, and submission live in Blackboard. The public app has no accounts, no grading, no student-to-student interaction, no analytics, no PDFs, and no reproduced reading text. Free readings link out to OpenStax or open-access pages; licensed readings link only to the Seneca Library catalogue (Primo) or are reached through the Blackboard weekly Readings folders. No reading text or PDFs are hosted here.

Every Indigenous reading is authored by an Indigenous scholar (a compulsory course rule, applied 2026-06-24).

## Run it
Static site, no build step, no framework. Open `index.html` in a browser, or serve the folder and visit it:

```bash
python3 -m http.server 8200
```

The local preview target is `http://localhost:8200`. IBM Plex (Sans and Mono) is self-hosted from `./fonts/` (OFL 1.1, license in `fonts/OFL.txt`); the site loads no Google Fonts.

## Editing content
All readings are in `data/corpus-data.js` (one `window.SOC122` object).
- Each record: `id, eye, type, access, title, authors, year, themes[], origin, len, diff, week, abstract, coreIdea, related[]`, plus `url` or `doi`.
- `eye`: `'western'` or `'indigenous'` (the Two-Eyed Seeing pairing side). Every `indigenous` reading must be Indigenous-authored.
- `access`: `'openstax' | 'open' | 'verified' | 'library'`. Only `openstax` and `open` get a public "Open the reading" link; `verified` (copyrighted, held for Blackboard course reserves) and `library` (licensed, via the Seneca Library) render as "Find this on Blackboard" with no public link, for copyright.
- `related[]` drives "Read alongside" and should pair each Western reading with its Indigenous counterpart.
- `senecaLib` (optional flag) marks records whose access route is the Seneca Library catalogue.
- There is no `syntheses` key: the app deliberately has no synthesis layer between the two eyes. Never use em or en dashes anywhere.

## Source boundary
The corpus uses local SOC122 source records and the Zotero collection. Do not place PDFs, screenshots, copied article text, or licensed readings in `_app`. Reading PDFs live outside the public site in `projects/_config/research/sources/SOC122/pdfs/` and are posted only to Blackboard.

## Current status
Forge and Codex co-ratified the Indigenous-led rebuild on 2026-06-24 for `index.html`, `app.js`, and `data/corpus-data.js`, and the site is deployed to GitHub Pages.

Canonical file hashes live in the ratification receipts under `projects/_config/shared_comms/` (they change on every content deploy and are not tracked here).

## Design source
Recreated from `../_design/_extracted/design_handoff_soc122_corpus/` (the high-fidelity prototype). The `.dc.html` prototype runtime was not ported; this is a vanilla rebuild in the BFS218 `_app` pattern.
