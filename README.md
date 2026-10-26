# Group 33 exhibition sandbox

Group 33 Jekyll site. Public repo. Push to `main` → auto build + publish →
<https://hannahvogelarchaeology.github.io/group33/>. Public at once, so check
before merge.

## Repo map

| Path | What |
|---|---|
| `pages/` | Markdown pages. Home, about, curation, team, shelves. Students edit here. |
| `pages/shelves/*.md` | Front matter only. `shelf: top` → picks `_data/shelves/top.json`. |
| `_data/shelves/*.json` | Shelf content. Objects, images, alt text, audio, 3D. One file per shelf. |
| `_data/schemas/shelf.schema.json` | Rules for shelf JSON. CI checks every shelf file against it. |
| `_data/lqip.json` | Tiny blur placeholders. Generated. Gitignored. |
| `_layouts/shelf.html` | One template → all shelf pages. Cards, carousel, audio, transcript, 3D pop-up. |
| `_layouts/`, `_includes/` | Shared HTML. Nav, head, footer. |
| `_sass/`, `assets/main.scss` | Styles. Vendored Minima (`_sass/minima/`) + `shelves.scss`, `curation.scss`, accessibility changes. |
| `assets/exhibitionShelfs/<Shelf>/<Object>/` | Original object photos. |
| `assets/audio/` | Audio-visual description recordings (`.m4a`), one per object. |
| `assets/resized/` | Generated photo sizes. Gitignored. |
| `assets/placeholders/` | Shelf headers + stand-in images until final photos land. |
| `assets/fonts/` | Fonts, licence beside. |
| `Rakefile` | `serve`, `build`, `images` tasks. `images` makes `assets/resized/` + `_data/lqip.json`. |
| `_scripts/axe-report.mjs` | WCAG check run by Lighthouse workflow. |
| `docs/HannasMasterDoc.md` | Curator master doc, tidied. Source of truth for exhibition text. |
| `_config.yml` | Site title, `baseurl: "/group33"`, nav order (`header_pages`), `image_sizes`. |
| `CITATION.cff`, `pages/team.md` | Contributor names. Use names people give, no guessing from accounts. |

## Master doc layout

`docs/HannasMasterDoc.md`. Exhibition text copied word for word from curator. `TBC` = curator not supplied yet.

1. **Still to do** — table of missing bits per page/object.
2. **Things to check** — mistakes spotted in source. Not fixed. Ask curator.
3. **Home page** — display image, overview, Auslan, acknowledgements.
4. **About page** — visitor info, curator bio, funding, thanks, website team.
5. **Objects at a glance** — one row per object: shelf, acc. no., material, date, image count, 3D link.
6. **Top / Middle / Bottom shelf** — per object: field table (acc. no., material, dimensions, details, 3D, audio file), overview, audio description, image table (file, caption, alt text).

## Shelf JSON schema

One shelf file:

```text
{
  title, description,              text
  image: { url, altText, caption },  shelf hero
  artifacts: [ artifact, ... ]       min 1
}

artifact:
  description        text. "TBC" → hidden on page
  metaDescription:
    name, accNo, material, details   text
    dimension        [H, W, D] numbers, mm. Exactly 3. Missing → 0. Page shows 0 as "n/a"
  images: [ { url, altText, caption } ]   min 1. First = card cover
  obj3D: { url, altText }          optional. Present → "View in 3D" button + D key
  audioDescription: { url, transcript }   url "TBC" → no player, transcript still shows
```

Rules: no extra keys (`additionalProperties: false`). Every text field non-empty. Unknown → `"TBC"`, never `""`.
Paths relative to repo root, no leading slash: `assets/audio/1. Pelike MU4759.m4a`. Layout adds `/group33`.

## Workflows

Rights first. No third-party photo, audio, video or 3D model until owner,
permitted use + required credit recorded: credit in caption, terms in
`NOTICE.md` or beside asset.

### Change object text

1. Curator updates master doc.
2. Copy change into `docs/HannasMasterDoc.md`. Word for word.
3. Same change into matching `_data/shelves/<shelf>.json`.
4. Test local (below). Commit.

### Add object photo

1. Drop `.jpg` in `assets/exhibitionShelfs/<Shelf>/<Object>/`.
2. Add `{ url, altText, caption }` to object `images` in shelf JSON. `altText` = what photo shows, for its purpose here. Caption carries © credit, e.g. `© Gale History Museum`.
3. Run `bundle exec rake images` (or restart `rake serve`). Else photo 404 local.

`rake images` makes 400, 800, 1600px copies (`image_sizes` in `_config.yml`)
in `assets/resized/` + blur placeholder in `_data/lqip.json`; up-to-date copies
skipped. Both gitignored, rebuilt on deploy, never commit. Replace photo =
overwrite same file name; newer original → copies remade. Old copy still
showing (copied file kept old date) → delete its files in `assets/resized/`,
run again. Rename or move photo → update `url` in shelf JSON too, else broken
image.

### Add audio

1. Drop file in `assets/audio/`.
2. Set object `audioDescription.url` to path. Keep `transcript` filled.

### Add 3D model

Add `"obj3D": { "url": "<nira link>", "altText": "<object name>" }` to object. Button appears by itself.

### Git

- Branch per change. PR into `main`.
- Rebase on `main`, no merge commits. `git fetch origin && git rebase origin/main && git push --force-with-lease`.
- Merge to `main` = live. Check before merge.

### CI (`.github/workflows/`)

| Workflow | When | Does | Blocks? |
|---|---|---|---|
| `pages.yml` | push `main` | resize photos, build, deploy Pages | is deploy |
| `validate-data.yml` | `_data/**` change | schema check shelf JSON, parse all JSON | red = fix |
| `rebase-check.yml` | PR | branch behind `main` or has merges → fail | red = rebase |
| `lighthouse.yml` | PR + push | every page, desktop + mobile: 100 accessibility, best practices, SEO; performance ≥95 desktop, ≥80 mobile. axe-core WCAG 2.2 A/AA, PR comment with failures by criterion, component, page. Reports saved as artifact | no. Read report anyway |

Automated checks miss much; do PR template's manual checks too.

## Test local

Need: Ruby 4.0.6 (pinned in `.ruby-version`), Bundler, ImageMagick. Python 3
only for schema check below. Same on macOS, Linux, Windows; no Git Bash needed.

```text
rbenv install 4.0.6          # once. rbenv auto-picks in repo
brew install imagemagick     # macOS. Windows: winget install ImageMagick.ImageMagick. Linux: apt install imagemagick
bundle install               # once + after Gemfile.lock change
bundle exec rake serve       # makes photo sizes, then live reload
```

Open <http://127.0.0.1:4000/group33/>. Slash at end matters. Page, style, data
edits show on refresh. `_config.yml` edits need restart: Ctrl+C, run again.
`bundle exec rake -T` lists all tasks.

Before push:

```text
bundle exec rake build
pipx run --spec check-jsonschema==0.38.2 check-jsonschema --schemafile _data/schemas/shelf.schema.json _data/shelves/*.json
```

Read output. Build error or schema fail → fix first.

Check by hand on each shelf page:

- Tab moves card to card. Focus ring visible.
- In card: ←/→ images, Enter audio, T transcript, D 3D model, Esc close 3D.
- Every image has alt text. Audio plays. Dimensions show `n/a` for 0.
- Phone width: no side scroll.

Bundler error `cannot load such file ... bundler-X/exe/bundle` → broken Bundler install. Run `gem install bundler -v X` (X from `BUNDLED WITH` in `Gemfile.lock`), or `bundle _<installed version>_ exec rake serve`.

## AI use

Read `AGENTS.md` first.

## Licence and attribution

Code from MIT-licensed Minima theme. See `LICENSE`, `NOTICE.md`. Team content + media may carry other terms. Record terms + credit beside each asset.
