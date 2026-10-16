#!/bin/sh
# Makes smaller copies of every exhibition photo for the shelf pages:
#   assets/resized/<photo>-<width>.jpg -> srcset, one per width in `image_sizes` in _config.yml
#   _data/lqip.json                    -> a tiny blurred placeholder per photo, written
#                                         into the page so it shows before any download
# Originals are left untouched; outputs are gitignored and rebuilt on deploy (pages.yml).
# Run locally before `jekyll serve` and after adding photos; existing copies are skipped.
# Needs ImageMagick: `brew install imagemagick` (macOS) or `apt install imagemagick` (Linux).
set -eu
cd "$(dirname "$0")/.."

IM=$(command -v magick || command -v convert) ||
  { echo "ImageMagick not found: brew install imagemagick" >&2; exit 1; }
SIZES=$(ruby -ryaml -e 'puts YAML.load_file("_config.yml").fetch("image_sizes").join(" ")')
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

find assets/exhibitionShelfs -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) | sort > "$tmp/originals"

while IFS= read -r src; do
  base="assets/resized/${src#assets/}"
  base="${base%.*}"
  mkdir -p "$(dirname "$base")"
  for w in $SIZES; do
    out="$base-$w.jpg"
    [ "$out" -nt "$src" ] && continue
    # auto-orient before strip: strip drops the rotation tag; `>` never enlarges small photos
    "$IM" "$src" -auto-orient -resize "${w}x>" -strip -quality 75 "$out"
  done
done < "$tmp/originals"

smallest=$(printf '%s\n' $SIZES | sort -n | head -1)
while IFS= read -r src; do
  # from the smallest copy, not the original: much faster, same 20px result
  small="assets/resized/${src#assets/}"
  "$IM" "${small%.*}-$smallest.jpg" -resize 20x -quality 40 "$tmp/p.jpg"
  printf '%s\t%s\n' "$src" "$(base64 < "$tmp/p.jpg" | tr -d '\n')"
done < "$tmp/originals" |
ruby -rjson -e 'puts JSON.pretty_generate($stdin.each_line.to_h { |l|
  path, b64 = l.chomp.split("\t")
  [path, "data:image/jpeg;base64,#{b64}"]
})' > _data/lqip.json
