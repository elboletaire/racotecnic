module Jekyll

  module TextFilter
    # Remove the accents from the string.
    def removeaccents(input)
      str = String.new(input)
      mapping = {
        'E' => [200,201,202,203],
        'e' => [232,233,234,235],
        'A' => [192,193,194,195,196,197],
        'a' => [224,225,226,227,228,229,230],
        'C' => [199],
        'c' => [231],
        'O' => [210,211,212,213,214,216],
        'o' => [242,243,244,245,246,248],
        'I' => [204,205,206,207],
        'i' => [236,237,238,239],
        'U' => [217,218,219,220],
        'u' => [249,250,251,252],
        'N' => [209],
        'n' => [241],
        'Y' => [221],
        'y' => [253,255],
        'AE' => [306],
        'ae' => [346],
        'OE' => [188],
        'oe' => [189]
      }
      mapping.each {|letter,accents|
        packed = accents.pack('U*')
        rxp = Regexp.new("[#{packed}]")
        str.gsub!(rxp, letter)
      }

      str
    end


    # Convert a string to a format suitable for a URL without ever using escaped characters.
    # It calls strip, removeaccents, downcase (optional) then removes the spaces (optional)
    # and finally removes any characters matching the default regexp (/[^-_A-Za-z0-9]/).
    #
    # Options
    #
    # * :downcase => call downcase on the string (defaults to true)
    # * :convert_spaces => Convert space to underscore (defaults to false)
    # * :regexp => The regexp matching characters that will be converting to an empty string (defaults to /[^-_A-Za-z0-9]/)
    def urlize(input, options = {})
      options[:downcase] ||= true
      options[:convert_spaces] ||= true
      options[:regexp] ||= /[^-_A-Za-z0-9]/

      str = self.removeaccents(input.strip)
      str.downcase! if options[:downcase]
      str.gsub!(/\ /,'-') if options[:convert_spaces]

      str.gsub(options[:regexp], '')
    end
  end

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
    include TextFilter
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

Liquid::Template.register_filter(Jekyll::TextFilter)
