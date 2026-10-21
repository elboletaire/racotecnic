import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";

export default defineConfig({
  site: config.site.url,
  // Old Jekyll and WordPress URLs. Static redirects are meta-refresh pages.
  redirects: {
    "/etiqueta/cakephp/page/2": "/etiqueta/cakephp",
    "/etiqueta/cakephp/page/3": "/etiqueta/cakephp",
    "/etiqueta/cakephp/page/4": "/etiqueta/cakephp",
    "/etiqueta/cakephp-1-2": "/etiqueta/cakephp-12",
    "/etiqueta/cakephp-1-2/page/2": "/etiqueta/cakephp-12",
    "/etiqueta/cakephp-1-3": "/etiqueta/cakephp-13",
    "/etiqueta/cakephp-1-3/page/2": "/etiqueta/cakephp-13",
    "/etiqueta/javascript/page/2": "/etiqueta/javascript",
    "/etiqueta/firefox/page/2": "/etiqueta/firefox",
    "/etiqueta/programacio-web-php/page/2": "/etiqueta/",
    "/etiqueta/programacio-web-php/page/3": "/etiqueta/",
    "/categoria/administracio/page/2": "/categoria/administracio",
    "/categoria/aplicacions/page/2": "/categoria/aplicacions",
    "/categoria/aplicacions/page/3": "/categoria/aplicacions",
    "/categoria/aplicacions/page/4": "/categoria/aplicacions",
    "/categoria/audio/page/2": "/categoria/audio",
    "/categoria/disseny/page/2": "/categoria/disseny",
    "/categoria/general/page/2": "/categoria/general",
    "/categoria/general/page/3": "/categoria/general",
    "/categoria/general/page/4": "/categoria/general",
    "/categoria/general/page/5": "/categoria/general",
    "/categoria/general/page/6": "/categoria/general",
    "/categoria/linux/page/2": "/categoria/linux",
    "/categoria/linux/page/3": "/categoria/linux",
    "/categoria/linux/page/4": "/categoria/linux",
    "/categoria/linux/page/5": "/categoria/linux",
    "/categoria/mac/page/2": "/categoria/mac",
    "/categoria/mac/page/3": "/categoria/mac",
    "/categoria/programacio/page/3": "/categoria/programacio",
    "/categoria/programacio/page/4": "/categoria/programacio",
    "/categoria/programacio/page/5": "/categoria/programacio",
    "/categoria/programacio/page/6": "/categoria/programacio",
    "/categoria/programacio/page/7": "/categoria/programacio",
    "/categoria/programacio/page/8": "/categoria/programacio",
    "/categoria/programacio/page/9": "/categoria/programacio",
    "/categoria/web/page/2": "/categoria/web",
    "/categoria/web/page/3": "/categoria/web",
    "/categoria/web/page/4": "/categoria/web",
    "/categoria/web/page/5": "/categoria/web",
    "/categoria/web/page/6": "/categoria/web",
    "/categoria/web/page/7": "/categoria/web",
    "/categoria/web/page/8": "/categoria/web",
    "/categoria/web/page/9": "/categoria/web",
    "/categoria/web/page/10": "/categoria/web",
    "/categoria/web/page/11": "/categoria/web",
    "/categoria/web/page/12": "/categoria/web",
    "/categoria/windows/page/2": "/categoria/windows",
    "/categoria/windows/page/3": "/categoria/windows",
    "/categoria/windows/page/4": "/categoria/windows",
    "/page/2": "/posts/2/",
    "/page/3": "/posts/3/",
    "/page/4": "/posts/4/",
    "/page/5": "/posts/5/",
    "/page/6": "/posts/6/",
    "/page/7": "/posts/7/",
    "/page/8": "/posts/8/",
    "/page/9": "/posts/9/",
    "/page/10": "/posts/10/",
    "/page/11": "/posts/11/",
    "/page/12": "/posts/12/",
    "/page/13": "/posts/13/",
    "/page/14": "/posts/14/",
    "/page/15": "/posts/15/",
    "/page/16": "/posts/16/",
    "/page/17": "/posts/17/",
    "/page/18": "/posts/18/",
    "/page/19": "/posts/19/",
    "/page/20": "/posts/20/",
    "/page/21": "/posts/21/",
    "/page/22": "/posts/22/",
    "/page/23": "/posts/23/",
    "/tags": "/etiqueta/",
    "/categories": "/categoria/",
  },
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
    }),
  ],
  i18n: {
    locales: ["ca"],
    defaultLocale: "ca",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkToc],
      rehypePlugins: [rehypeCallouts],
    }),
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  // Vendored from Google Fonts (OFL, see src/assets/fonts/OFL.txt) so the
  // build does not depend on fonts.gstatic.com being reachable.
  fonts: [
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.local(),
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            weight: 300,
            style: "normal",
            src: ["./src/assets/fonts/GoogleSansCode-Light.woff"],
          },
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/GoogleSansCode-Regular.woff"],
          },
          {
            weight: 500,
            style: "normal",
            src: ["./src/assets/fonts/GoogleSansCode-Medium.woff"],
          },
          {
            weight: 600,
            style: "normal",
            src: ["./src/assets/fonts/GoogleSansCode-SemiBold.woff"],
          },
          {
            weight: 700,
            style: "normal",
            src: ["./src/assets/fonts/GoogleSansCode-Bold.woff"],
          },
          {
            weight: 300,
            style: "italic",
            src: ["./src/assets/fonts/GoogleSansCode-LightItalic.woff"],
          },
          {
            weight: 400,
            style: "italic",
            src: ["./src/assets/fonts/GoogleSansCode-Italic.woff"],
          },
          {
            weight: 500,
            style: "italic",
            src: ["./src/assets/fonts/GoogleSansCode-MediumItalic.woff"],
          },
          {
            weight: 600,
            style: "italic",
            src: ["./src/assets/fonts/GoogleSansCode-SemiBoldItalic.woff"],
          },
          {
            weight: 700,
            style: "italic",
            src: ["./src/assets/fonts/GoogleSansCode-BoldItalic.woff"],
          },
        ],
      },
    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
