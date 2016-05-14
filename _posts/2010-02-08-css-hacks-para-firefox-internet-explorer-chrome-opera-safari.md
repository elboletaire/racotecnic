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
excerpt: "Todos sabemos lo <em>divertido</em> y <em>emocionante</em> que es hacer
  la compatibilidad crossbrowser de nuestras páginas web.\r\n\r\nPor suerte para nosotros,
  existen un gran número de hacks CSS que podemos utilizar en cada una de las versiones
  de cada navegador para ayudarnos a poder mostrar por igual los contenidos de una
  web en todos los navegadores.\r\n\r\nPartiré de este estilo:\r\n\r\n[css].selector
  {\r\n\tcolor: #CCCCCC;\r\n}[/css]\r\n\r\nEmpezaré por Internet Explorer, dado que
  es para el que usualmente se necesitan más hacks:\r\n<h5>Internet Explorer 6</h5>\r\n[css].selector
  {\r\n\t_color: #CCCCCC;\r\n}[/css]\r\n"
wordpress_id: 1369
wordpress_url: http://racotecnic.underave.net/?p=1369
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
<p>Todos sabemos lo <em>divertido</em> y <em>emocionante</em> que es hacer la compatibilidad crossbrowser de nuestras páginas web.</p>
<p>Por suerte para nosotros, existen un gran número de hacks CSS que podemos utilizar en cada una de las versiones de cada navegador para ayudarnos a poder mostrar por igual los contenidos de una web en todos los navegadores.</p>
<p>Partiré de este estilo:</p>
<p>[css].selector {<br />
	color: #CCCCCC;<br />
}[/css]</p>
<p>Empezaré por Internet Explorer, dado que es para el que usualmente se necesitan más hacks:</p>
<h5>Internet Explorer 6</h5>
<p>[css].selector {<br />
	_color: #CCCCCC;<br />
}[/css]<br />
<a id="more"></a><a id="more-1369"></a><br />
Recordad que IE6 no interpreta la propiedad (o palabra clave..) de CSS "!important" por lo que podéis jugar con ello (aunque no es lo más recomendable):</p>
<h5>Internet Explorer 6 (!important)</h5>
<p>[css].selector {<br />
	color: #CCCCCC !important;<br />
	color: #000000; /* Éste estilo sólo se aplicará a Internet Explorer 6 */<br />
}[/css]</p>
<h5>Internet Explorer 7 y anteriores:</h5>
<p>[css].selector {<br />
	*color: #CCCCCC;<br />
}[/css]</p>
<h5>Internet Explorer 8</h5>
<p>Este es un poco <em>putilla</em>, ya que el mismo hack de IE8 a veces lo interpreta IE7... así que, si nos interesa, primero habrá que poner algo que interprete únicamente IE7 y después hay que poner el hack de IE8:</p>
<p>[css]/* Interpretado únicamente por IE7 (actúa como un !important) */<br />
*:first-child+html .selector {<br />
	color: #CCCCCC;<br />
}<br />
.selector {<br />
	color /*\**/: #CCCCCC\9   /* Sin punto y coma!! */<br />
}[/css]</p>
<h5>Todas las versiones de Internet Explorer</h5>
<p>[css].selector {<br />
	color: #CCCCCC\9   /* Sin punto y coma!! */<br />
}[/css]</p>
<h5>Internet Explorer 7 y demás navegadores modernos (incluido IE8)</h5>
<p>[css]html&gt;body .selector {<br />
	color: #CCCCCC;<br />
}[/css]</p>
<h5>Todos los navegadores modernos (incluido IE8)</h5>
<p>[css]html&gt;/**/body .selector {<br />
	color: #CCCCCC;<br />
}[/css]</p>
<h5>Opera 9.27 y anteriores</h5>
<p>[css]html:first-child .selector {<br />
	color: #CCCCCC;<br />
}[/css]</p>
<h5>Safari</h5>
<p>[css]html[xmlns*=&quot;&quot;] body:last-child .selector {<br />
	color: #CCCCCC;<br />
}[/css]</p>
<h5>Safari 3+, Opera 9+, Firefox 3.5+ y Chrome 1+</h5>
<p>[css]body:nth-of-type(1) .selector {<br />
	color: #CCCCCC;<br />
}<br />
/* Otra opción... */<br />
body:first-of-type .selector {<br />
	color: #CCCCCC;<br />
}</p>
<p>/* Y otra más... */<br />
@media screen and (-webkit-min-device-pixel-ratio:0) {<br />
	.selector {<br />
		color: #CCCCCC;<br />
	}<br />
}[/css]</p>
<h5>Safari 3+ y Chrome 1+</h5>
<p>[css]@media screen and (-webkit-min-device-pixel-ratio:0) {<br />
	.selector {<br />
		color: #CCCCCC;<br />
	}<br />
}</p>
<p>/* Otra opción... */<br />
body:nth-of-type(1) .selector{<br />
   color: #CCCCCC;<br />
}<br />
[/css]</p>
<h5>Todas las versiones de Firefox</h5>
<p>[css]@-moz-document url-prefix() {<br />
	.selector {<br />
		color: #CCCCCC;<br />
	}<br />
 } [/css]</p>
<h5>Cualquier Gecko (incluido Firefox)</h5>
<p>[css]*&gt;.selector {<br />
	color: #CCCCCC;<br />
}[/css]</p>
<h5>Firefox 1.5+</h5>
<p>[css].selector, x:-moz-any-link, x:only-child {<br />
	color: #CCCCCC;<br />
}[/css]</p>
<h5>Firefox 2 y versiones anteriores</h5>
<p>[css]body:empty .selector {<br />
	color: #CCCCCC;<br />
}</p>
<p>/* Otra opción... */<br />
html&gt;/**/body .selector, x:-moz-any-link {<br />
	color: #CCCCCC;<br />
}[/css]</p>
<h5>Firefox 3 (y quizás más nuevos)</h5>
<p>[css]html&gt;/**/body .selector, x:-moz-any-link, x:default {<br />
	color: #CCCCCC;<br />
}[/css]</p>
<p>No he probado todos ellos así que si veis alguno que no funciona, por favor, hacédmelo saber para que pueda buscar alguna alternativa (o eliminarlo...).</p>
<p>Además os invito a que añadáis cualquier hack de CSS que no haya puesto comentando esta entrada :)</p>
<blockquote><p><strong>Páginas de referencia:</strong></p>
<ul>
<li><a rel="nofollow" href="http://www.anieto2k.com/2008/01/23/otro-css-hack-para-safari/" target="_blank">Otro hack CSS para Safari @ Anieto</a></li>
<li><a rel="nofollow" href="http://perishablepress.com/press/2009/06/28/css-hacks-for-different-versions-of-firefox/" target="_blank">CSS hacks for differents versions of Firefox @ Perishable Press</a></li>
<li><a rel="nofollow" href="http://www.evotech.net/blog/2008/09/css-hack-for-google-chrome-and-safari-31/" target="_blank">CSS hack for Google Chrome and Safari 3.1 @ Evotech</a></li>
<li><a rel="nofollow" href="http://acidmartin.wordpress.com/2009/06/04/css-hack-for-internet-explorer-8/" target="_blank">CSS hack for Internet Explorer 8 @ Acid Martin</a></li>
<li><a rel="nofollow" href="http://www.drauta.com/articulos/hacks-css-para-todos-los-navegadores-incluido-explorer-8/" target="_blank">Hacks CSS para todos los navegadores... @ Drauta</a></li>
</ul>
</blockquote>
