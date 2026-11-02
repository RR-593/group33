# Group 33 exhibition sandbox

Group 33 Jekyll site. Public repo. Push to `main` → auto build + publish →
<https://rr-593.github.io/group33/>. Public at once, so check
before merge.

## Repo map

| Path | What |
|---|---|
| `pages/` | Markdown pages. Home, about, curation, team, shelves. Students edit here. |
| `pages/index.md` | Home. Text = exhibition overview. `display_image` in front matter (`url`, `altText`, `caption`) = photo beside title. Layout `_layouts/home.html`. |
| `pages/shelves/*.md` | Front matter only. `shelf: top` → picks `_data/shelves/top.yml`. |
| `_data/shelves/*.yml` | Shelf content. Objects, images, alt text, audio, 3D. One file per shelf. |
| `_data/bio_pic.yml` | Curator portrait on Curation page: `url`, `altText`, `caption`. Photo in `assets/images/curator/`. |
| `_data/licenses/*.yml` | Curation page licence tables. One file per row. `used_for: website` (sent to visitors) or `building` (team tools). |
| `_data/schemas/*.schema.yml` | Rules for shelf + licence YAML (JSON Schema, in YAML). CI checks every file against them. |
| `_data/lqip.json` | Tiny blur placeholders. Generated. Gitignored. |
| `_layouts/shelf.html` | One template → all shelf pages. Hero, card loop, 3D pop-up. |
| `_includes/artifact-card.html` | One object card: carousel, key hints, audio player, captions, 3D button, details. |
| `_layouts/`, `_includes/` | Shared HTML. Nav pill + zoom buttons (`header.html`), head, footer, `shelf-card.html` (home), `responsive-image.html` (resized photo + blur placeholder), `page-turn.html` (previous/next links, nav order), `footer.html` (visit details, acknowledgement, © year). |
| `_plugins/seo_defaults.rb` | Search/share tags: shelf pages reuse shelf `description`; every page shares home display photo. Page front matter `description:` / `image:` overrides. |
| `assets/js/` | `site.js` every page: nav keys, zoom, back to top. `shelf.js` shelf pages: carousel, audio player, 3D pop-up, card keys. |
| `assets/css/main.scss` | Stylesheet entry. Lists every partial in load order. |
| `_sass/` | Styles. `_settings.scss` colours/type/spacing; `base/` fonts + HTML elements; `layout/` header, page, footer; `components/` pills, cards, audio player, 3D pop-up; `pages/` one-page styles. |
| `assets/images/objects/<shelf>/<object>/` | Original object photos. Folder names lower-case with hyphens; file names as the curator supplied them. |
| `assets/audio/` | Audio-visual description recordings (`.m4a`), one per object. |
| `assets/resized/` | Generated photo sizes. Gitignored. |
| `assets/images/placeholders/` | Stand-in photos until final ones land: home display photo, shelf headers. |
| `assets/fonts/` | Fonts, licence beside. |
| `assets/icons/` | Lucide icons, one `.svg` per icon. Use in HTML: `{% include icon.html name="x" %}`. New icon → copy a file, swap drawing, list in `NOTICE.md`. |
| `Rakefile` | `serve`, `build`, `images` tasks. `images` makes `assets/resized/` + `_data/lqip.json`. |
| `_scripts/` | Lighthouse workflow tools: `axe-report.mjs` (WCAG check), `lighthouse-report.mjs` (score summary), `serve.mjs` (local server, gzips like Pages). Versions in `package.json`. |
| `docs/HannasMasterDoc.md` | Curator master doc, tidied. Source of truth for exhibition text. |
| `docs/tempMasterDoc.md` | Curator master doc, raw copy. Not published. |
| `_config.yml` | Site title, `baseurl: "/group33"`, nav order (`header_pages`), shelf order (`shelves`), `image_sizes`. |
| `CITATION.cff`, `pages/team.md` | Contributor names. Use names people give, no guessing from accounts. |

## Master doc layout

`docs/HannasMasterDoc.md`. Exhibition text copied word for word from curator. `TBC` = curator not supplied yet.

1. **Still to do** — table of missing bits per page/object.
2. **Things to check** — mistakes spotted in source. Not fixed. Ask curator.
3. **Home page** — display image, overview, Auslan, acknowledgements.
4. **About page** — visitor info, curator bio, funding, thanks, website team.
5. **Objects at a glance** — one row per object: shelf, acc. no., material, date, image count, 3D link.
6. **Top / Middle / Bottom shelf** — per object: field table (acc. no., material, dimensions, details, 3D, audio file), overview, audio description, image table (file, caption, alt text).

## Data files

### Shelf (`_data/shelves/<shelf>.yml`)

```yaml
title: Top shelf
description: text                 # "TBC" → hidden on page
image: { url, altText, caption }  # shelf hero
artifacts:                        # min 1
  - metaDescription:
      name: Pelike
      accNo: MU4759
      material: Ceramic
      dimension: [344, 200, 0]    # [H, W, D] mm. Exactly 3. Missing → 0, page shows "n/a"
      details: text
    images:                       # min 1. First = card cover
      - url: assets/images/objects/top/pelike/1 Pelike_MU4759_front_Image1.jpg
        altText: text
        caption: text © credit
    obj3D: { url, altText }       # optional. Present → "View in 3D" button + D key
    audioDescription:
      url: assets/audio/1. Pelike MU4759.m4a   # "TBC" → no player, transcript still shows
      transcript: text
```

### Licence (`_data/licenses/<name>.yml`)

One file = one row of the Curation page licence tables. Rows sorted by `name`.

```yaml
name: Swiper 11.2.10
use: image carousels              # optional, shown in brackets
used_for: website                 # website = sent to visitors; building = team tools only
licence:
  name: MIT License
  url: https://github.com/nolimits4web/swiper/blob/master/LICENSE
  note: text                      # optional, shown in brackets
author:
  name: Vladimir Kharlampidi
  url: https://swiperjs.com
```

Rules (`_data/schemas/*.schema.yml`): no extra keys. Every text field non-empty. Unknown → `TBC`, never empty.
Paths relative to repo root, no leading slash. Layout adds `/group33`.
Text containing `: ` (colon space) or starting with a quote → wrap the whole value in `"double quotes"`.

## Workflows

Rights first. No third-party photo, audio, video or 3D model until owner,
permitted use + required credit recorded: credit in caption, terms in
`NOTICE.md` or beside asset.

### Change object text

1. Curator updates master doc.
2. Copy change into `docs/HannasMasterDoc.md`. Word for word.
3. Same change into matching `_data/shelves/<shelf>.yml`.
4. Test local (below). Commit.

### Add object photo

1. Drop `.jpg` in `assets/images/objects/<shelf>/<object>/`. Stand-in photo → `assets/images/placeholders/`.
2. Add `{ url, altText, caption }` to object `images` in shelf JSON. `altText` = what photo shows, for its purpose here. Caption carries © credit, e.g. `© Gale History Museum`.
3. Run `bundle exec rake images` (or restart `rake serve`). Else photo 404 local.

`rake images` covers both folders. Makes 400, 800, 1600px copies (`image_sizes` in `_config.yml`)
in `assets/resized/` + blur placeholder in `_data/lqip.json`; up-to-date copies
skipped. Both gitignored, rebuilt on deploy, never commit. Replace photo =
overwrite same file name; newer original → copies remade. Old copy still
showing (copied file kept old date) → delete its files in `assets/resized/`,
run again. Rename or move photo → update `url` in shelf JSON (home photo: `display_image`
in `pages/index.md`) too, else broken image.

`docs/` never published. Keep drafts + raw docs there, not repo root: root
files without front matter get copied to live site as-is.

### Add audio

1. Drop file in `assets/audio/`.
2. Set object `audioDescription.url` to path. Keep `transcript` filled.

### Add 3D model

Add `obj3D: { url: <nira link>, altText: <object name> }` to object. Button appears by itself.

### Git

- Branch per change. PR into `main`.
- Rebase on `main`, no merge commits. `git fetch origin && git rebase origin/main && git push --force-with-lease`.
- Merge to `main` = live. Check before merge.

### CI (`.github/workflows/`)

| Workflow | When | Does | Blocks? |
|---|---|---|---|
| `pages.yml` | push `main` | resize photos, build, deploy Pages | is deploy |
| `validate-data.yml` | `_data/**` change | schema check shelf + licence YAML | red = fix |
| `rebase-check.yml` | PR | branch behind `main` or has merges → fail | red = rebase |
| `lighthouse.yml` | PR + push | builds once, then every page, desktop + mobile in parallel: 100 accessibility, best practices, SEO; performance ≥95 desktop, ≥80 mobile. Score table + audits that cost points (`_scripts/lighthouse-report.mjs`). axe-core WCAG 2.2 A/AA by criterion, component, page. Both in job summary + one PR comment. Reports saved as artifact | no. Read report anyway |

`pages.yml` + `lighthouse.yml` share `.github/actions/prepare-site/`: Ruby (version from `.ruby-version`), then resized photos restored from the Actions cache, or ImageMagick + `rake images` when a photo, `Rakefile` or `_config.yml` changed. Change Ruby → edit `.ruby-version` only.

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
pipx run --spec check-jsonschema==0.38.2 check-jsonschema --schemafile _data/schemas/shelf.schema.yml _data/shelves/*.yml
pipx run --spec check-jsonschema==0.38.2 check-jsonschema --schemafile _data/schemas/license.schema.yml _data/licenses/*.yml
```

Read output. Build error or schema fail → fix first.

Check by hand on each shelf page:

- Tab moves card to card. Focus ring visible.
- In card: ←/→ images, T captions (description text), D 3D model, Esc close 3D. Keys show under photo.
- Audio: Enter or blue "Audio description" button grows into player bar (play/pause, seek, time, speaker → volume slider drop-down, CC captions, × close) + plays. While open, keys under photo: Enter play/pause, ↑/↓ volume, J/L back/forward 10s, M mute, Esc close. Bar controls skip Tab.
- Every image has alt text. Audio plays. Dimensions show `n/a` for 0.
- Nav pill: one Tab stop, ←/→ move, 1–9 jump while focused. Zoom buttons beside it (or -/+ anywhere): page scales, level kept on next page.
- Shift+↑ anywhere → focus back on nav pill. Scroll down → round ↑ button bottom right; click → top + focus on nav.
- Phone width: no side scroll.

Bundler error `cannot load such file ... bundler-X/exe/bundle` → broken Bundler install. Run `gem install bundler -v X` (X from `BUNDLED WITH` in `Gemfile.lock`), or `bundle _<installed version>_ exec rake serve`.

## AI use

Read `AGENTS.md` first.

## Licence and attribution

Code began as MIT-licensed Minima theme. See `LICENSE`, `NOTICE.md`. Team content + media may carry other terms. Record terms + credit beside each asset.
