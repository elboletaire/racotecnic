module Jekyll

    class CategoryPage < Page
      def initialize(site, base, dir, category)
        @site = site
        @base = base
        @dir = dir
        @name = 'index.html'

        category_title_prefix = site.config['category_title_prefix'] || ''
        category_title_suffix = site.config['category_title_suffix'] || ''

        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'bycategory.html')
        self.data['category'] = category

        self.data['title'] = "#{category_title_prefix}#{category}#{category_title_suffix}"
      end
    end

    class CategoryPageGenerator < Generator
      include TextFilters
      def generate(site)
        if site.layouts.key? 'bycategory'

          category_dir = site.config['category_dir'] || 'category'

          site.categories.each_key do |category|
            site.pages << CategoryPage.new(site, site.source, File.join(category_dir, urlize(category)), category)
          end
        end
      end
    end

  end
