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
<p>El modo pantalla completa es un modo bastante molón que quizás ya hayáis visto en algunas páginas (como fb por ejemplo; el botón de pantalla completa de las fotos).</p>
<p>Por ahora sólo es compatible con navegadores basados en Gecko (como Firefox) y Webkit (como Chrome).</p>
<p>Sabiendo esto, simplemente tendremos que poner algún IF :)</p>
<p>[js]<br />
    fullscreen = function(e){<br />
          if (e.webkitRequestFullScreen) {<br />
            e.webkitRequestFullScreen();<br />
          } else if(e.mozRequestFullScreen) {<br />
            e.mozRequestFullScreen();<br />
          }<br />
      }<br />
    document.getElementById('ejemplo-fullscreen').onclick = function(){<br />
        fullscreen(document.getElementById('content'));<br />
    }<br />
[/js]<br />
Podéis probarlo haciendo click <a href="#fullscreen" id="ejemplo-fullscreen">aquí</a><br />
<script><br />
    fullscreen = function(e){<br />
          if (e.webkitRequestFullScreen) {<br />
            e.webkitRequestFullScreen();<br />
          } else if(e.mozRequestFullScreen) {<br />
            e.mozRequestFullScreen();<br />
          }<br />
      }<br />
    document.getElementById('ejemplo-fullscreen').onclick = function(){<br />
        fullscreen(document.getElementById('content'));<br />
        return false;<br />
    }<br />
</script></p>
