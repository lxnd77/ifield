import { config, collection, fields } from "@keystatic/core";

/**
 * ============================================================
 * KEYSTATIC — content management for Projects and the Journal
 * ============================================================
 * Content is stored as files in this repository, so there is no
 * third-party service and no database. Editing through the admin
 * UI at /keystatic produces an ordinary commit.
 *
 * `local` mode reads and writes the working directory — right for
 * development. Switch `storage` to GitHub mode before handing the
 * admin UI to editors; see README-CMS.md.
 *
 * Everything else on the site (capabilities, process, team,
 * offices) stays in typed data files: it changes rarely and is
 * tightly coupled to the page layouts.
 */

const REGIONS = [
  { label: "United States", value: "usa" },
  { label: "Middle East & Africa", value: "mea" },
  { label: "India & S.E. Asia", value: "india" },
  { label: "China", value: "china" },
] as const;

export default config({
  storage: {
    kind: "github",
    repo: { owner: "lxnd77", name: "ifield" },
  },

  ui: {
    brand: { name: "I-Field" },
    navigation: {
      Content: ["projects", "posts"],
    },
  },

  collections: {
    // ══════════════════════════════════════════════════════════
    // PROJECTS
    // ══════════════════════════════════════════════════════════
    projects: collection({
      label: "Projects",
      path: "src/content/projects/*",
      slugField: "title",
      format: { contentField: "brief" },
      columns: ["title", "location"],

      schema: {
        title: fields.slug({
          name: {
            label: "Property name",
            description:
              'e.g. "JW Marriott". The location disambiguates repeats.',
            validation: { isRequired: true },
          },
        }),

        location: fields.text({
          label: "Location",
          description: 'City and country, e.g. "Beijing, China".',
          validation: { isRequired: true },
        }),

        region: fields.select({
          label: "Region",
          description: "Groups the project in the portfolio directory.",
          options: [...REGIONS],
          defaultValue: "china",
        }),

        keys: fields.text({
          label: "Keys",
          description: 'e.g. "588 Keys". Leave blank if not applicable.',
        }),

        scope: fields.text({
          label: "Scope",
          description: 'Short summary, e.g. "Full FF&E" or "Turnkey Fit-Out".',
        }),

        year: fields.text({
          label: "Year completed",
          description: 'e.g. "2023".',
        }),

        duration: fields.text({
          label: "Duration",
          description: 'e.g. "14 months".',
        }),

        featured: fields.checkbox({
          label: "Show in Flagship Work",
          description:
            "Featured on the Projects page and, if space allows, the homepage.",
          defaultValue: false,
        }),

        featuredOrder: fields.integer({
          label: "Flagship order",
          description: "Lower numbers appear first. Only used when featured.",
          defaultValue: 100,
        }),

        heroImage: fields.image({
          label: "Hero image",
          description: "Full-bleed header. Landscape, at least 1900px wide.",
          directory: "public/images/projects/entries",
          publicPath: "/images/projects/entries/",
        }),

        cardImage: fields.image({
          label: "Card image",
          description:
            "Used in the Flagship Work grid. 4:3, at least 1000px wide.",
          directory: "public/images/projects/entries",
          publicPath: "/images/projects/entries/",
        }),

        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: "Image",
              directory: "public/images/projects/entries",
              publicPath: "/images/projects/entries/",
            }),
            caption: fields.text({ label: "Caption" }),
          }),
          {
            label: "Gallery",
            itemLabel: (props) => props.fields.caption.value || "Image",
          },
        ),

        scopeDelivered: fields.array(fields.text({ label: "Item" }), {
          label: "Scope delivered",
          description:
            "Disciplines supplied on this project. Shown as a bullet list.",
          itemLabel: (props) => props.value ?? "Item",
        }),

        stats: fields.array(
          fields.object({
            value: fields.text({
              label: "Figure",
              validation: { isRequired: true },
            }),
            label: fields.text({
              label: "Label",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "By the numbers",
            description:
              "Three or four figures for the dark band. Omit to hide it.",
            itemLabel: (props) =>
              `${props.fields.value.value} — ${props.fields.label.value}`,
          },
        ),

        testimonial: fields.object(
          {
            quote: fields.text({ label: "Quote", multiline: true }),
            name: fields.text({ label: "Name" }),
            role: fields.text({ label: "Role" }),
          },
          {
            label: "Pull quote",
            description: "Optional. Hidden when the quote is empty.",
          },
        ),

        brief: fields.markdoc({
          label: "The brief",
          description: "Narrative introduction. Hidden entirely when empty.",
        }),
      },
    }),

    // ══════════════════════════════════════════════════════════
    // JOURNAL — wired into the site in phase 7
    // ══════════════════════════════════════════════════════════
    posts: collection({
      label: "Journal",
      path: "src/content/posts/*",
      slugField: "title",
      format: { contentField: "body" },
      columns: ["title", "publishedAt"],

      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),

        category: fields.select({
          label: "Category",
          options: [
            { label: "Trends", value: "trends" },
            { label: "Guides", value: "guides" },
            { label: "Interviews", value: "interviews" },
            { label: "Insights", value: "insights" },
            { label: "News", value: "news" },
          ],
          defaultValue: "insights",
        }),

        publishedAt: fields.date({
          label: "Published",
          validation: { isRequired: true },
        }),

        draft: fields.checkbox({
          label: "Draft",
          description: "Drafts are excluded from the published site.",
          defaultValue: false,
        }),

        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          description: "One or two sentences, shown on cards.",
          validation: { isRequired: true },
        }),

        readingTime: fields.text({
          label: "Reading time",
          description: 'e.g. "8 min read".',
        }),

        featured: fields.checkbox({
          label: "Featured story",
          description:
            "Shown large at the top of the Journal. Newest featured post wins.",
          defaultValue: false,
        }),

        coverImage: fields.image({
          label: "Cover image",
          directory: "public/images/journal/entries",
          publicPath: "/images/journal/entries/",
        }),

        author: fields.object({
          name: fields.text({ label: "Name" }),
          role: fields.text({ label: "Role" }),
        }),

        body: fields.markdoc({ label: "Article" }),
      },
    }),
  },
});
