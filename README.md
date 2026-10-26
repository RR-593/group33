# Group 33 exhibition sandbox

Group 33 working Jekyll site. Push to `main` → auto build + publish at
<https://hannahvogelarchaeology.github.io/group33/>. Public at once, so check
before merge.

## Start site locally

Need Ruby 4.0.6 (pinned in `.ruby-version`; with rbenv, `rbenv install 4.0.6`
once, auto-selected here) + ImageMagick (macOS `brew install imagemagick`,
Windows `winget install ImageMagick.ImageMagick`, Linux
`apt install imagemagick`). First time, install gems. After, one command:

```text
bundle install
bundle exec rake serve
```

`rake serve` makes resized shelf photos, then serves site at
<http://localhost:4000/group33/>. Same on macOS, Linux, Windows; no Git Bash
needed. Page, style, data edits show on browser refresh. `_config.yml` edits
need restart: Ctrl+C, run again. Before push, `bundle exec rake build` makes
production build in `_site/`; read output, fix errors first.
`bundle exec rake -T` lists all tasks.

## Update assets

Shelf photos live in `assets/exhibitionShelfs/<Shelf>/<Object>/` as JPEG. Add
photo there, then add entry to object's `images` list in
`_data/shelves/top.json`, `middle.json` or `bottom.json`: `url` (path from repo
root, e.g. `assets/exhibitionShelfs/Top Shelf/Pelike/1 Pelike_MU4759_front_Image1.jpg`),
`altText` (what photo shows, for its purpose here), `caption` (with credit,
e.g. `© Gale History Museum`). New object = new entry in `artifacts` with
`description`, `metaDescription`, `images`, `audioDescription`, optional
`obj3D` for Nira model. Description not ready → write `TBC`; page hides it.
`_data/schemas/shelf.schema.json` defines shape; `Validate data` workflow fails
PR on missing or unknown fields.

After adding or replacing photo, run `bundle exec rake images` (or restart
`rake serve`). Makes 400, 800, 1600px copies in `assets/resized/` + tiny blur
placeholder in `_data/lqip.json`; up-to-date copies skipped. Both outputs
gitignored, rebuilt on deploy, never commit. Widths from `image_sizes` in
`_config.yml`. Replace photo = overwrite same file name; newer original → copies
remade. Old copy still showing (copied file kept old date) → delete its files
in `assets/resized/`, run again. Rename or move photo → update `url` in shelf
JSON too, else broken image.

Shelf header + other placeholder images in `assets/placeholders/`. Fonts in
`assets/fonts/`, licence beside. Styles in `assets/main.scss` + `_sass/`
(`shelves.scss`, `curation.scss`, Minima theme in `_sass/minima/`).

Rights first. No third-party photo, audio, video or 3D model until owner,
permitted use + required credit recorded: credit in caption, terms in
`NOTICE.md` or beside asset.

## Checks

`Lighthouse` workflow audits every page, desktop + mobile: 100 accessibility,
best practices, SEO; performance ≥95 desktop, ≥80 mobile. Also runs axe-core
WCAG 2.2 A/AA rules, comments on PR with failures by criterion, component, page.
Red → look, but Pages deploy not blocked. Automated checks miss much; do PR
template's manual checks too.

## Where things live

Pages as Markdown in `pages/`. Nav order (`header_pages`) + site settings in
`_config.yml`. Shared HTML in `_includes/`, `_layouts/`. Read `AGENTS.md` before
AI assistant use. Contributor names → `pages/team.md` + `CITATION.cff`; ask,
never infer from accounts.

## Licence and attribution

Code derived from MIT-licensed Minima theme; see `LICENSE`, `NOTICE.md`. Team
content + media may have other terms; record terms + required credit beside
each asset.
