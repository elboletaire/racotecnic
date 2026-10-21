---
layout: post
status: publish
published: true
title: Pantalla completa con HTML5
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 2031
wordpress_url: http://www.racotecnic.com/?p=2031
date: '2012-05-12 18:48:00 +0200'
date_gmt: '2012-05-12 17:48:00 +0200'
categories:
- Programació
- Web
tags:
- JavaScript
- Firefox
- Google Chrome
- Safari
- Gecko
- html5
- js
- Webkit
- fullscreen
---

El modo pantalla completa es un modo bastante molón que quizás ya hayáis visto en algunas páginas (como fb por ejemplo; el botón de pantalla completa de las fotos).

<del>Por ahora sólo es compatible con navegadores basados en Gecko (como Firefox) y Webkit (como Chrome).</del>

> Este artículo ha sido actualizado el 14 de mayo de 2016 añadiendo los navegadores que faltaban.

Sabiendo esto, simplemente tendremos que poner algún IF :)

~~~javascript
var fullscreen = function(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}
document.getElementById('ejemplo-fullscreen').onclick = function(){
  fullscreen(document.getElementById('content'));
}
~~~

Podéis probarlo haciendo click <a href="#fullscreen" id="ejemplo-fullscreen">aquí</a>

<script>
var fullscreen = function(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}
document.getElementById('ejemplo-fullscreen').onclick = function(){
  fullscreen(document.getElementById('main'));
  return false;
}
</script>
