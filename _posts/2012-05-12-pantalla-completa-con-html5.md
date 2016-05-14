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

Por ahora sólo es compatible con navegadores basados en Gecko (como Firefox) y Webkit (como Chrome).

Sabiendo esto, simplemente tendremos que poner algún IF :)

[js]
    fullscreen = function(e){
          if (e.webkitRequestFullScreen) {
            e.webkitRequestFullScreen();
          } else if(e.mozRequestFullScreen) {
            e.mozRequestFullScreen();
          }
      }
    document.getElementById('ejemplo-fullscreen').onclick = function(){
        fullscreen(document.getElementById('content'));
    }
[/js]
Podéis probarlo haciendo click <a href="#fullscreen" id="ejemplo-fullscreen">aquí</a>
<script>
    fullscreen = function(e){
          if (e.webkitRequestFullScreen) {
            e.webkitRequestFullScreen();
          } else if(e.mozRequestFullScreen) {
            e.mozRequestFullScreen();
          }
      }
    document.getElementById('ejemplo-fullscreen').onclick = function(){
        fullscreen(document.getElementById('content'));
        return false;
    }
</script>
