# Group 33 exhibition sandbox

This public repository is Group 33's working Jekyll site. Commits to `main` are
built and published automatically at
<https://hannahvogelarchaeology.github.io/group33/>.

## Work locally

The repository pins Ruby 4.0.6 in `.ruby-version`. With rbenv, install it once
with `rbenv install 4.0.6`; rbenv will select it automatically here. You also
need ImageMagick: `brew install imagemagick` on macOS, or
`winget install ImageMagick.ImageMagick` on Windows. Then run:

```text
bundle install
bundle exec rake serve
```

That makes the resized shelf photos and serves the site at
<http://localhost:4000/group33/>. It works the same on macOS, Linux and Windows.
Before pushing, run:

```text
bundle exec rake build
```

`bundle exec rake -T` lists every task.

The separate `Lighthouse` workflow audits every page on desktop and mobile. It
needs 100 for accessibility, best practices and SEO, and at least 95 (desktop)
or 80 (mobile) for performance. It also runs axe-core's WCAG 2.2 A/AA rules and
comments on the pull request with what failed, by criterion and component. A
regression turns the workflow red and keeps its reports as artifacts, but it
does not interrupt the independent Pages deployment.

Edit Markdown pages in `pages/`. Site-wide values are in
`_config.yml`; shared HTML is in `_includes` and `_layouts`; styling is under
`_sass` and `assets`.

Read `AGENTS.md` before using an AI coding assistant. Add preferred contributor
names to `pages/team.md` and `CITATION.cff` rather than inferring them from accounts.

## Licence and attribution

The code is derived from the MIT-licensed Minima theme. See `LICENSE` and
`NOTICE.md`. Content and media added by the team may have different terms; record
those terms and the required credit beside each asset.
