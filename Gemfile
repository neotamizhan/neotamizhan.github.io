source "https://rubygems.org"

# Use the github-pages gem so your local build matches what GitHub Pages runs.
# This pins Jekyll and all plugins to GitHub's supported versions.
gem "github-pages", group: :jekyll_plugins

# Plugins used by the site.
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-paginate"
end

# Windows / JRuby compatibility (harmless elsewhere).
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
