import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Inici",
    posts: "Articles",
    tags: "Etiquetes",
    categories: "Categories",
    about: "Sobre",
    archives: "Arxiu",
    search: "Cercar",
  },
  post: {
    publishedAt: "Publicat",
    updatedAt: "Actualitzat",
    sharePostIntro: "Comparteix aquest article:",
    sharePostOn: "Comparteix aquest article a {{platform}}",
    sharePostViaEmail: "Comparteix aquest article per correu",
    tagLabel: "Etiquetes",
    backToTop: "Torna a dalt",
    goBack: "Torna enrere",
    editPage: "Edita la pàgina",
    previousPost: "Article anterior",
    nextPost: "Article següent",
  },
  pagination: {
    prev: "Anterior",
    next: "Següent",
    page: "Pàgina",
  },
  home: {
    socialLinks: "Xarxes",
    featured: "Destacats",
    recentPosts: "Darrers articles",
    allPosts: "Tots els articles",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "Tots els drets reservats.",
  },
  pages: {
    tagTitle: "Etiqueta",
    tagDesc: "Tots els articles amb l'etiqueta",

    tagsTitle: "Etiquetes",
    tagsDesc: "Totes les etiquetes utilitzades en els articles.",

    categoryTitle: "Categoria",
    categoryDesc: "Tots els articles de la categoria",

    categoriesTitle: "Categories",
    categoriesDesc: "Totes les categories dels articles.",

    postsTitle: "Articles",
    postsDesc: "Tots els articles publicats.",

    archivesTitle: "Arxiu",
    archivesDesc: "Tots els articles arxivats.",

    searchTitle: "Cercar",
    searchDesc: "Cerca en tots els articles...",
  },
  a11y: {
    skipToContent: "Ves al contingut",
    openMenu: "Obre el menú",
    closeMenu: "Tanca el menú",
    toggleTheme: "Canvia el tema",
    searchPlaceholder: "Cerca articles...",
    noResults: "No s'ha trobat res",
    goToPreviousPage: "Vés a la pàgina anterior",
    goToNextPage: "Vés a la pàgina següent",
  },
  notFound: {
    title: "404 No trobat",
    message: "Pàgina no trobada",
    goHome: "Torna a l'inici",
  },
} satisfies UIStrings;
