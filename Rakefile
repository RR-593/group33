# Project tasks. Run `bundle exec rake -T` to list them; plain Ruby, so they work on
# macOS, Linux and Windows. Needs ImageMagick for the photos:
#   macOS: brew install imagemagick   Windows: winget install ImageMagick.ImageMagick
#   Linux: apt install imagemagick
require "fileutils"
require "json"
require "tmpdir"
require "yaml"

PHOTOS = "assets/exhibitionShelfs"

task default: :serve

desc "Make photos, then serve the site at http://127.0.0.1:4000/group33/"
task serve: :images do
  sh "bundle exec jekyll serve"
end

desc "Make photos, then build the production site into _site/, as the deploy does"
task build: :images do
  sh({ "JEKYLL_ENV" => "production" }, "bundle exec jekyll build")
end

# Makes smaller copies of every exhibition photo for the shelf pages:
#   assets/resized/<photo>-<width>.jpg -> srcset, one per width in `image_sizes` in _config.yml
#   _data/lqip.json                    -> a tiny blurred placeholder per photo, written
#                                         into the page so it shows before any download
# Originals are left untouched; outputs are gitignored and rebuilt on deploy (pages.yml).
desc "Make resized photos and blur placeholders (skips ones already up to date)"
task :images do
  # `magick` is ImageMagick 7; `convert` is ImageMagick 6 (on Windows it's a disk tool, so magick goes first)
  im = %w[magick convert].find { |cmd| system(cmd, "-version", out: File::NULL, err: File::NULL) } or
    abort "ImageMagick not found. Install it (see the top of Rakefile) and try again."
  sizes = YAML.load_file("_config.yml").fetch("image_sizes")
  originals = Dir.glob("#{PHOTOS}/**/*").select { |f| File.file?(f) && f.match?(/\.jpe?g\z/i) }.sort
  resized = ->(src) { src.sub(%r{\Aassets/}, "assets/resized/").sub(/\.[^.]+\z/, "") }

  originals.each do |src|
    base = resized.(src)
    FileUtils.mkdir_p(File.dirname(base))
    sizes.each do |w|
      out = "#{base}-#{w}.jpg"
      next if File.exist?(out) && File.mtime(out) > File.mtime(src)
      # auto-orient before strip: strip drops the rotation tag; `>` never enlarges small photos.
      # -interlace JPEG saves a progressive JPEG: the browser draws a blurry whole image from
      # the first bytes and sharpens it as the rest arrives, so slow connections see something early.
      sh im, src, "-auto-orient", "-resize", "#{w}x>", "-strip", "-interlace", "JPEG", "-quality", "75", out, verbose: false
    end
  end

  # from the smallest copy, not the original: much faster, same 20px result
  lqip = Dir.mktmpdir do |tmp|
    originals.to_h do |src|
      sh im, "#{resized.(src)}-#{sizes.min}.jpg", "-resize", "20x", "-quality", "40", "#{tmp}/p.jpg", verbose: false
      [src, "data:image/jpeg;base64,#{[File.binread("#{tmp}/p.jpg")].pack('m0')}"]
    end
  end
  File.write("_data/lqip.json", JSON.pretty_generate(lqip) + "\n")
  puts "Photos ready: #{originals.size} originals, widths #{sizes.join(', ')}"
end
