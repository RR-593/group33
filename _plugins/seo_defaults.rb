# Fills in jekyll-seo-tag's page description and share image from data the site already
# has, so no text is copied twice. A page's own `description` or `image` front matter wins.
#   shelf pages: description = the shelf's text in _data/shelves/<key>.yml
#   every page:  image = the home page's display photo (1600px copy from `rake images`)
Jekyll::Hooks.register :site, :pre_render do |site|
  photo = site.pages.find { |p| p.url == "/" }&.data&.dig("display_image")
  if photo
    resized = photo["url"].sub(%r{\Aassets/}, "assets/resized/").sub(/\.[^.]+\z/, "")
    share_image = { "path" => "/#{resized}-#{site.config['image_sizes'].last}.jpg", "alt" => photo["altText"] }
  end

  site.pages.each do |page|
    shelf = site.data.dig("shelves", page.data["shelf"].to_s)
    page.data["description"] ||= shelf["description"] if shelf
    page.data["image"] ||= share_image if share_image
  end
end
