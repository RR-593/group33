# Group 33 exhibition sandbox

Last verified: 2026-08-21

## Stack

Jekyll 4.4.1 (templates began as Minima 2.5.2) and Ruby 4.0.6. GitHub Pages
serves the repository as a project site under `/group33`.

## Commands

- `bundle exec rake serve` — makes resized photos, then local site at `http://127.0.0.1:4000/group33/`
- `bundle exec rake build` — makes resized photos, then static production build
- `bundle exec rake images` — resized photos and blur placeholders only (needs ImageMagick)

## Structure

- root Markdown files — student-editable pages
- `_config.yml` — identity, project path and navigation order
- `_includes/` and `_layouts/` — semantic shared structure
- `_sass/` — styles: settings, base, layout, components, pages
- `assets/` — stylesheet entry, fonts, icons, photos, audio
- `CITATION.cff` — contributors' preferred public attribution

## Conventions and boundaries

Read `AGENTS.md` before changing content.
