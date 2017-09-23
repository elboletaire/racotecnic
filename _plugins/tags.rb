module Jekyll

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      tag_title_prefix = site.config['tag_title_prefix'] || ''
      tag_title_suffix = site.config['tag_title_suffix'] || ''

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'bytag.html')
      self.data['tag'] = tag

      self.data['title'] = "#{tag_title_prefix}#{tag}#{tag_title_suffix}"
    end
  end

  class TagPageGenerator < Generator
    include TextFilters

    def generate(site)
      if site.layouts.key? 'bytag'

        tag_dir = site.config['tag_dir'] || 'tag'

        site.tags.each_key do |tag|
          site.pages << TagPage.new(site, site.source, File.join(tag_dir, urlize(tag)), tag)
        end
      end
    end
  end

end
