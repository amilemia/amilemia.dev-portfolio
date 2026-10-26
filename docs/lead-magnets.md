# Portfolio lead magnets

The three public PDFs are four-page, fillable workbooks. Each has a clear audience,
a practical checklist, worked guidance and an action planner. Existing PDF paths
are preserved so previously shared links keep working.

## Content and assets

- `content/lead-magnets/*.mdx`: resource titles, honest descriptions, audience,
  outcomes, page count, first-pass estimate and preview paths.
- `scripts/build-lead-magnets.py`: PDF content, layout and matching 1200 x 675 artwork.
- `public/resources/*.pdf`: published download assets.
- `public/images/lead-magnets/*-preview.jpg`: sample audit page (page 2) for each PDF.

The first-pass times are suggested working sessions, not measured completion times.
All PDFs are in English; the resource interface supports English and French.
The Next.js guide explicitly targets the portfolio's Next.js 15 App Router version.
There is no starter repository or configuration bundle included.

## Regenerate

Use Python 3.9+ with `reportlab`, `Pillow` and `pypdf`. The script currently uses
Arial and Consolas from `C:/Windows/Fonts`.

```powershell
python scripts/build-lead-magnets.py --output-dir work/lead-magnets
```

Inspect the PDFs before copying them into `public/resources/` and the PNGs into
`public/images/lead-magnets/`. Render page 2 to create each `*-preview.jpg`.
Update the corresponding MDX metadata whenever contents, page counts or outcomes
change, then run `npm run build:content`.

Use Poppler `pdftoppm` to render every page for a visual check. Confirm the AcroForm
fields remain interactive with `pypdf.PdfReader(...).get_fields()`. PDF viewer
support varies; readers should save a copy after completing fields.

## Discovery and measurement

- Header navigation exposes Resources on desktop and in the mobile menu.
- The homepage features the conversion workbook and links to the full library.
- Cards show audience, three concrete contents, format, page count and a sample page.
- Sample-page clicks emit `Resource: Preview`, with slug and placement, through the
  existing Plausible helper. The existing successful capture event remains intact.
- PDF CTAs include `utm_source=lead_magnet`, `utm_medium=pdf` and the resource slug
  as `utm_campaign`. Reports can distinguish PDF referrals from other traffic.
- Keep measuring successful requests and qualified inquiries. Preview clicks alone
  do not indicate a business outcome.

The existing email capture and subscriber flow is retained. Validate delivery with
an authorized test recipient and the configured production sender before publishing.
Preview and UI checks can stub the API to avoid sending email or adding subscribers.

## Editorial references

Technical guidance links to primary sources inside the PDFs:

- https://web.dev/articles/vitals
- https://web.dev/articles/optimize-lcp
- https://web.dev/articles/optimize-inp
- https://nextjs.org/docs/15/app/api-reference/functions/use-search-params
- https://nextjs.org/docs/app/guides/caching
- https://nextjs.org/docs/app/guides/production-checklist
- https://www.w3.org/WAI/tutorials/forms/
- https://developers.google.com/analytics/devguides/collection/ga4/events

Recheck framework guidance when upgrading Next.js. Remove or contextualize claims
that cannot be demonstrated; do not add ratings or uplift figures without evidence.
