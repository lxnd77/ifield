# Editing content

Projects and Journal articles are managed through **Keystatic**, a CMS that stores content
as files in this repository. There is no database and no third-party service — saving in the
admin UI produces an ordinary commit.

Everything else on the site (capabilities, process stages, team, offices, contact details)
lives in typed data files under `src/data/`. Those change rarely and are tied to the page
layouts, so they are a developer edit rather than a CMS one.

## Opening the admin

Locally:

```bash
npm run dev
```

Then visit <http://localhost:4321/keystatic>.

## Before handing this to editors

The config currently uses **local storage mode**, which reads and writes your working
directory. That is right for development but means the admin only edits the copy of the site
on your own machine.

To let non-developers edit the live site, switch `storage` in `keystatic.config.ts` to GitHub
mode:

```ts
storage: {
  kind: 'github',
  repo: { owner: 'YOUR-ORG', name: 'YOUR-REPO' },
},
```

That requires creating a GitHub App (Keystatic walks you through it on first run) and adding
the resulting `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET` and
`KEYSTATIC_SECRET` environment variables. **Editors then sign in with a GitHub account.**

If that is a problem — if whoever writes the Journal should not need a GitHub login — say so
and we will swap to a hosted studio instead. The page templates read through
`src/lib/projects.ts` and the content collections, so the change is contained.

## Projects

Each project is one entry. Only `Property name`, `Location` and `Region` are required;
everything else is optional and its section disappears from the page when empty.

| Field | Effect |
| --- | --- |
| Property name + Location | Page title, and how the entry is matched to the portfolio list |
| Region | Which group the project appears under |
| Keys / Scope / Year / Duration | The fact strip under the hero |
| Show in Flagship Work | Puts the project in the top grid on the Projects page |
| Flagship order | Lower numbers first |
| Hero / Card image | Header and grid images. Placeholders show until supplied |
| Gallery | "Inside …" section. Hidden when empty |
| Scope delivered | Bullet list. Hidden when empty |
| By the numbers | Dark figures band. Hidden when empty |
| Pull quote | Hidden unless the quote itself has text |
| The brief | Narrative intro. Hidden when empty |

### Linking a project to the portfolio list

The Projects page shows a directory of every completed project (102 rows, in
`src/data/projects.ts`). A row turns into a link to its case study when a project entry has
**exactly the same Property name and Location** as the row.

For example, the row `Crowne Plaza — Suzhou` links up because the entry uses
`Crowne Plaza` / `Suzhou`. Writing the location as `Suzhou, China` instead would break the
link — the row would still appear, just as plain text. Nothing else breaks, and it is easy to
spot.

The eight seeded projects are already matched.

## Journal

Wired up in the next phase. The schema is already defined, so entries created now will be
picked up.

`Draft` keeps a post out of the published site. `Featured story` promotes it to the large
card at the top of the Journal — the most recent featured post wins.

## Images

Images uploaded through the CMS are written to `public/images/projects/entries/` and
`public/images/journal/entries/`. They are committed alongside the content.

The site's *fixed* imagery (page heroes, capability rows, team portraits) is not managed here
— see `public/images/README.md` for that, and run `npm run check:images` to see what is still
outstanding.
