# Supplying images

**You do not need to touch any code.** Drop a file into the folder shown below, using
exactly the filename listed, and it appears on the site. Any slot without a file shows a
hatched placeholder printed with the filename it wants, so nothing ever looks broken.

To see what's still outstanding at any time:

```bash
npm run check:images
```

## Rules of thumb

- **Format** — JPG for photography, PNG only where transparency is needed (logos, brand marks).
- **Width** — meet the minimum listed; larger is fine, it gets resized. Don't upscale a small file.
- **Crop** — match the aspect ratio listed. The site crops to fill, so anything off-ratio loses
  edges. Keep the subject away from the extreme edges.
- **Colour** — supply full-colour originals. Grayscale is applied in CSS where the design calls
  for it (services grid, team portraits, heroes), and several treatments animate back to colour
  on hover, so a pre-desaturated file would break them.
- **Heroes** are darkened to roughly 40% brightness with white text over them — favour images
  with a calm, uncluttered upper area.

---

## `hero/` — full-bleed page heroes · 21:9 · ≥1900px

| File | Page | Suggested subject |
| --- | --- | --- |
| `capabilities.jpg` | Capabilities | Interior detail or workshop craft |
| `company.jpg` | The Company | Team, factory floor or flagship lobby |
| `process.jpg` | Process | Drawings, samples or a site in progress |
| `projects.jpg` | Projects | A signature completed property |
| `journal.jpg` | Journal | Editorial, atmospheric interior |
| `careers.jpg` | Careers | People at work — factory, studio or site |

## `home/` — homepage

| File | Ratio | Min width | Use |
| --- | --- | --- | --- |
| `company-portrait.jpg` | 4:5 | 900 | The Company section, with the offset red square |
| `service-01.jpg` … `service-08.jpg` | 3:4 | 800 | Services grid — see the capability order below |
| `project-01.jpg` … `project-06.jpg` | 16:11 | 700 | Featured projects grid |

## `capabilities/` — the eight rows · 4:3 · ≥1000px

`01.jpg` … `08.jpg`, in this order:

1. Fit-Outs
2. Fixed Furniture & Joineries
3. Metal & Glasswork
4. Loose Furniture & Case Goods
5. Window Treatments
6. Floor Treatments
7. Decorative Lighting
8. Artwork & Accessories

The same order applies to `home/service-01…08.jpg`.

## `company/` — The Company

| File | Ratio | Min width | Use |
| --- | --- | --- | --- |
| `story.jpg` | 16:9 | 1600 | Wide image under Our Story |
| `approach.jpg` | 4:5 | 900 | Our Approach — craftsmanship detail |
| `founder.jpg` | 4:5 | 900 | Abhay Bhargava portrait |
| `team-01.jpg` … `team-15.jpg` | 3:4 | 600 | Team grid portraits |
| `milestone-01.jpg` … `milestone-07.jpg` | 16:9 | 800 | Timeline cards |

Team portraits are in the order the team appears in the source copy — Abhay Bhargava,
Crystal Huang, Tony Lee, Tiger Chen, Vicki Leung, David Xu, Punya Bhargava, then eight
members who are still listed as "Full Name" and need real names before their portraits
mean anything.

Milestones run: 2003 Hong Kong · 2011 China manufacturing · 2013 Daka Import & Export ·
2019 Americas · 2019 India · 2020 Middle East · 2021 Africa.

## `process/` — the six stages · 4:3 · ≥1000px

`stage-01.jpg` … `stage-06.jpg`: Assess · Design · Procurement · Production · Logistics ·
Delivery & Installation.

## `projects/` — Projects page

| File | Ratio | Min width | Use |
| --- | --- | --- | --- |
| `featured-01.jpg` … `featured-08.jpg` | 4:3 | 1000 | Flagship Work cards |
| `region-usa.jpg` | 21:9 | 1800 | United States banner |
| `region-mea.jpg` | 21:9 | 1800 | Middle East & Africa banner |
| `region-india.jpg` | 21:9 | 1800 | India & S.E. Asia banner |
| `region-china.jpg` | 21:9 | 1800 | China banner |

## Root

| File | Ratio | Min width | Use |
| --- | --- | --- | --- |
| `og-default.jpg` | 1200×630 | 1200 | Fallback social share card |

---

## Already supplied

`brand/` (logos and the three arch marks), `clients/` (24 hotel-brand logos) and the
homepage hero video with its poster frame all came from the design bundle and need nothing
from you.

## Not listed here

Individual **project** and **journal article** images upload through the CMS instead — no
filenames to remember. That arrives in phases 6 and 7.
