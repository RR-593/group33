# Group 33 exhibition sandbox

Last verified: 2026-08-21

## Stack

Vendored Minima 2.5.2 templates, Jekyll 4.4.1 and Ruby 4.0.6. GitHub Pages
serves the repository as a project site under `/group33`.

## Commands

- `bundle exec jekyll serve` — local site at `http://127.0.0.1:4000/group33/`
- `bundle exec jekyll build` — static production build

## Structure

- root Markdown files — student-editable pages
- `_config.yml` — identity, project path and navigation order
- `_includes/` and `_layouts/` — semantic shared structure
- `_sass/` and `assets/` — vendored theme and accessibility changes
- `CITATION.cff` — contributors' preferred public attribution

### The exhibition at `/exhibition/`

A self-contained sub-site that does not use the Minima chrome. It renders
through its own `_layouts/exhibition.html` and `_layouts/shelf.html`, styled by
`assets/css/exhibition.scss` and `_sass/exhibition/`, so it cannot affect the
Minima pages and they cannot affect it.

- `exhibition.html` — landing page, `permalink: /exhibition/`; its `title` is
  only the navigation label, while the displayed name comes from
  `site.exhibition.title` in `_config.yml`
- `_data/shelves.yml` — every word a visitor reads on the exhibition, plus
  image paths, alt text and credit lines. Edit content here, not in HTML
- `shelves/<slug>.html` — one file per shelf, front matter only
- `assets/images/` — exhibition photography; rights recorded in `NOTICE.md`

## Conventions and boundaries

Read `AGENTS.md` before changing content. Keep archaeological claims tied to
evidence and keep rights records with media. Preserve `baseurl: "/group33"`,
Ruby and dependency locks, action pins, licensing, native navigation controls,
and keyboard-visible focus.
Commits to `main` become public automatically; Lighthouse reports regressions
but does not block the independent Pages deployment.
