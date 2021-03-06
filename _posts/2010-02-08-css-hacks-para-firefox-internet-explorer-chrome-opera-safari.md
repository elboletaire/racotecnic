---
layout: post
status: publish
published: true
title: CSS hacks para Firefox, Internet Explorer, Chrome, Opera, Safari...
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Todos sabemos lo divertido y emocionante que es hacer la compatibilidad
  crossbrowser de nuestras páginas web."
wordpress_id: 1369
wordpress_url: http://racotecnic.com/?p=1369
redirect_from:
- "?p=1369/"
date: '2010-02-08 23:38:44 +0100'
date_gmt: '2010-02-08 22:38:44 +0100'
categories:
- Programació
- Web
tags:
- Opera
- Internet Explorer
- Google Chrome
- CSS
- Safari
- Gecko
---

Todos sabemos lo <em>divertido</em> y <em>emocionante</em> que es hacer la compatibilidad crossbrowser de nuestras páginas web.

Por suerte para nosotros, existen un gran número de hacks CSS que podemos utilizar en cada una de las versiones de cada navegador para ayudarnos a poder mostrar por igual los contenidos de una web en todos los navegadores.

Partiré de este estilo:

~~~css
.selector {
  color: #CCCCCC;
}
~~~

Empezaré por Internet Explorer, dado que es para el que usualmente se necesitan más hacks:

## Internet Explorer 6

~~~css
.selector {
  _color: #CCCCCC;
}
~~~

<a id="more"></a><a id="more-1369"></a>
Recordad que IE6 no interpreta la propiedad (o palabra clave..) de CSS "!important" por lo que podéis jugar con ello (aunque no es lo más recomendable):

## Internet Explorer 6 (!important)

~~~css
.selector {
  color: #CCCCCC !important;
  color: #000000; /* Éste estilo sólo se aplicará a Internet Explorer 6 */
}
~~~

## Internet Explorer 7 y anteriores:

~~~css
.selector {
  *color: #CCCCCC;
}
~~~

## Internet Explorer 8

Este es un poco <em>putilla</em>, ya que el mismo hack de IE8 a veces lo interpreta IE7... así que, si nos interesa, primero habrá que poner algo que interprete únicamente IE7 y después hay que poner el hack de IE8:

~~~css
/* Interpretado únicamente por IE7 (actúa como un !important) */
*:first-child+html .selector {
  color: #CCCCCC;
}
.selector {
  color /*\**/: #CCCCCC\9   /* Sin punto y coma!! */
}
~~~

## Todas las versiones de Internet Explorer

~~~css
.selector {
  color: #CCCCCC\9   /* Sin punto y coma!! */
}
~~~

## Internet Explorer 7 y demás navegadores modernos (incluido IE8)

~~~css
html>body .selector {
  color: #CCCCCC;
}
~~~

## Todos los navegadores modernos (incluido IE8)

~~~css
html>/**/body .selector {
  color: #CCCCCC;
}
~~~

## Opera 9.27 y anteriores

~~~css
html:first-child .selector {
  color: #CCCCCC;
}
~~~

## Safari

~~~css
html[xmlns*=''] body:last-child .selector {
  color: #CCCCCC;
}
~~~

## Safari 3+, Opera 9+, Firefox 3.5+ y Chrome 1+

~~~css
body:nth-of-type(1) .selector {
  color: #CCCCCC;
}
/* Otra opción... */
body:first-of-type .selector {
  color: #CCCCCC;
}

/* Y otra más... */
@media screen and (-webkit-min-device-pixel-ratio:0) {
  .selector {
    color: #CCCCCC;
  }
}
~~~

## Safari 3+ y Chrome 1+

~~~css
@media screen and (-webkit-min-device-pixel-ratio:0) {
  .selector {
    color: #CCCCCC;
  }
}

/* Otra opción... */
body:nth-of-type(1) .selector{
   color: #CCCCCC;
}
~~~

## Todas las versiones de Firefox

~~~css
@-moz-document url-prefix() {
  .selector {
    color: #CCCCCC;
  }
 }
~~~

## Cualquier Gecko (incluido Firefox)

~~~css
*>.selector {
  color: #CCCCCC;
}
~~~

## Firefox 1.5+

~~~css
.selector, x:-moz-any-link, x:only-child {
  color: #CCCCCC;
}
~~~

## Firefox 2 y versiones anteriores

~~~css
body:empty .selector {
  color: #CCCCCC;
}

/* Otra opción... */
html>/**/body .selector, x:-moz-any-link {
  color: #CCCCCC;
}
~~~

## Firefox 3 (y quizás más nuevos)

~~~css
html>/**/body .selector, x:-moz-any-link, x:default {
  color: #CCCCCC;
}
~~~

No he probado todos ellos así que si veis alguno que no funciona, por favor, hacédmelo saber para que pueda buscar alguna alternativa (o eliminarlo...).

Además os invito a que añadáis cualquier hack de CSS que no haya puesto comentando esta entrada :)

<blockquote>
  <strong>Páginas de referencia:</strong>
  <ul>
    <li><a rel="nofollow" href="http://www.anieto2k.com/2008/01/23/otro-css-hack-para-safari/" target="_blank">Otro hack CSS para Safari @ Anieto</a></li>
    <li><a rel="nofollow" href="http://perishablepress.com/press/2009/06/28/css-hacks-for-different-versions-of-firefox/" target="_blank">CSS hacks for differents versions of Firefox @ Perishable Press</a></li>
    <li><a rel="nofollow" href="http://www.evotech.net/blog/2008/09/css-hack-for-google-chrome-and-safari-31/" target="_blank">CSS hack for Google Chrome and Safari 3.1 @ Evotech</a></li>
    <li><a rel="nofollow" href="http://acidmartin.wordpress.com/2009/06/04/css-hack-for-internet-explorer-8/" target="_blank">CSS hack for Internet Explorer 8 @ Acid Martin</a></li>
    <li><a rel="nofollow" href="http://www.drauta.com/articulos/hacks-css-para-todos-los-navegadores-incluido-explorer-8/" target="_blank">Hacks CSS para todos los navegadores... @ Drauta</a></li>
  </ul>
</blockquote>
