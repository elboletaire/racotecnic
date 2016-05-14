---
layout: post
status: publish
published: true
title: Introducción a HTML5 - principios básicos
author:
  display_name: DPAM23
  login: DPAM23
  email: dpam23@hotmail.com
  url: http://
author_login: DPAM23
author_email: dpam23@hotmail.com
author_url: http://
excerpt: "<img class=\"alignleft size-thumbnail wp-image-1771\" title=\"HTML5\" src=\"http://www.racotecnic.com/wp-content/uploads/2011/02/HTML5-150x150.jpg\"
  alt=\"HTML5 Logotype\" width=\"150\" height=\"150\" />Desde hace unos días estoy
  inscrito en un curso gratuito y online de HTML5,  gestionado desde la <a href=\"http://p2pu.org/course/list\">P2PU</a>
  con el soporte de <a href=\"http://www.drumbeat.org/project/p2p-university-open-web-career-track\">Mozilla</a>.\r\nEstos
  cursos los da gente anónima y desinteresada, por lo que en general no son docentes
  sino gente con conocimientos y ganas de explicar cosas.\r\nEs maravilloso que existan
  iniciativas de este tipo.\r\n\r\nAsí que sin más preámbulos, me dispongo a dejar
  constancia de lo aprendido en la primera clase.\r\n\r\n<h3>¿Que hay de nuevo en
  HTML5?</h3>\r\nEl principal cambio en el que nos centraremos hoy radica en los elementos
  de la nueva semántica: Es decir, en el HTML vamos a empezar a utilizar unas etiquetas
  que son mucho más específicas (en lugar de los ambiguos DIV a los que estábamos
  acostumbrados).\r\n\r\nEsto no significa que dejemos de utilizar DIVs, sino que
  ahora tenemos más etiquetas.\r\n\r\nPor ejemplo, algunas de las más comunes:\r\n\r\n[xhtml]&lt;header&gt;&lt;footer&gt;&lt;nav&gt;&lt;aside&gt;&lt;article&gt;[/xhtml]\r\n\r\nSu
  mismo nombre ya nos dice más o menos dónde irán ubicadas.\r\n\r\nEn <a href=\"http://www.w3schools.com/html5/html5_reference.asp\">w3schools</a>
  tienen una lista completa de todas las etiquetas nuevas.\r\n\r\nVamos a comparar
  como se creaba antes la estructura de una web y como se hará com HTML5:"
wordpress_id: 1770
wordpress_url: http://www.racotecnic.com/?p=1770
date: '2011-02-05 14:14:20 +0100'
date_gmt: '2011-02-05 13:14:20 +0100'
categories:
- Programació
- Web
tags:
- Recursos
- html5
- introducción
- clases
- etiquetas
- CSS3
- tutoriales
- tutorial
- ejemplos
---
<p><img class="alignleft size-thumbnail wp-image-1771" title="HTML5" src="http://www.racotecnic.com/wp-content/uploads/2011/02/HTML5-150x150.jpg" alt="HTML5 Logotype" width="150" height="150" />Desde hace unos días estoy inscrito en un curso gratuito y online de HTML5,  gestionado desde la <a href="http://p2pu.org/course/list">P2PU</a> con el soporte de <a href="http://www.drumbeat.org/project/p2p-university-open-web-career-track">Mozilla</a>.<br />
Estos cursos los da gente anónima y desinteresada, por lo que en general no son docentes sino gente con conocimientos y ganas de explicar cosas.<br />
Es maravilloso que existan iniciativas de este tipo.</p>
<p>Así que sin más preámbulos, me dispongo a dejar constancia de lo aprendido en la primera clase.</p>
<h3>¿Que hay de nuevo en HTML5?</h3>
<p>El principal cambio en el que nos centraremos hoy radica en los elementos de la nueva semántica: Es decir, en el HTML vamos a empezar a utilizar unas etiquetas que son mucho más específicas (en lugar de los ambiguos DIV a los que estábamos acostumbrados).</p>
<p>Esto no significa que dejemos de utilizar DIVs, sino que ahora tenemos más etiquetas.</p>
<p>Por ejemplo, algunas de las más comunes:</p>
<p>[xhtml]&lt;header&gt;&lt;footer&gt;&lt;nav&gt;&lt;aside&gt;&lt;article&gt;[/xhtml]</p>
<p>Su mismo nombre ya nos dice más o menos dónde irán ubicadas.</p>
<p>En <a href="http://www.w3schools.com/html5/html5_reference.asp">w3schools</a> tienen una lista completa de todas las etiquetas nuevas.</p>
<p>Vamos a comparar como se creaba antes la estructura de una web y como se hará com HTML5:<a id="more"></a><a id="more-1770"></a></p>
<h3>Antigua estructura:</h3>
<p><img class="size-full wp-image-1779" title="html5_1" src="http://www.racotecnic.com/wp-content/uploads/2011/02/html5_11.png" alt="" width="270" height="251" /></p>
<p>[xhtml]<br />
&lt;div id=&quot;header&quot;&gt;&lt;h1&gt;Título de la página&lt;/h1&gt;&lt;/div&gt;</p>
<p>&lt;div class=&quot;post&quot;&gt;Contenido del post&lt;/div&gt;</p>
<p>&lt;div class=&quot;post&quot;&gt;Contenido del post&lt;/div&gt;</p>
<p>&lt;div id=&quot;sidebar&quot;&gt;&lt;ul&gt;&lt;li&gt;Elementos típicos del sidebar&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;</p>
<p>&lt;div id=&quot;footer&quot;&gt;&lt;p&gt;Elementos típicos del footer&lt;/p&gt;&lt;/div&gt;<br />
[/xhtml]</p>
<h3>Nueva estructura:</h3>
<p><img class="size-full wp-image-1780" title="html5_2" src="http://www.racotecnic.com/wp-content/uploads/2011/02/html5_2.png" alt="" width="270" height="251" /></p>
<p>[xhtml]<br />
&lt;header&gt;&lt;h1&gt;Título de la página&lt;/h1&gt;&lt;/header&gt;</p>
<p>&lt;article&gt;Contenido del post&lt;/article&gt;</p>
<p>&lt;article&gt;Contenido del post&lt;/article&gt;</p>
<p>&lt;aside&gt;&lt;ul&gt;&lt;li&gt;Elementos típicos del sidebar&lt;/li&gt;&lt;/ul&gt;&lt;/aside&gt;</p>
<p>&lt;footer&gt;&lt;p&gt;Elementos típicos del footer&lt;/p&gt;&lt;/footer&gt;<br />
[/xhtml]</p>
<p>Como podéis observar, las etiquetas son mucho más semánticas y específicas.</p>
<h3>Ejemplos reales : típicos usos:</h3>
<h4>&lt;header&gt;</h4>
<p>[xhtml]<br />
	&lt;header&gt;<br />
		&lt;hgroup&gt;<br />
			&lt;h1&gt;Thai cookery school&gt;&lt;/h1&gt;<br />
			&lt;h2&gt;Learn authentic Thai cookery in your own home &lt;/h2&gt;<br />
		&lt;/hgroup&gt;<br />
		&lt;nav&gt;<br />
			&lt;ul&gt;<br />
				&lt;li&gt;Home&lt;/li&gt; &lt;li&gt; &lt;a href=”courses.html”&gt;Cookery courses&lt;/a&gt; &lt;/li&gt;<br />
				&lt;li&gt;&lt;a href=”contact.html”&gt;Contact&lt;/a&gt;&lt;/li&gt;<br />
			&lt;/ul&gt;<br />
		&lt;/nav&gt;<br />
	&lt;/header&gt;<br />
[/xhtml]</p>
<h4>&lt;nav&gt;</h4>
<p>[xhtml]<br />
	&lt;nav&gt;<br />
		&lt;h2&gt;Main navigation&lt;/h2&gt;<br />
		&lt;ul&gt;<br />
			&lt;li&gt;&lt;a href=”/about”&gt;About me&lt;/a&gt;&lt;/li&gt;<br />
			&lt;li&gt;&lt;a href=”/news”&gt;News&lt;/a&gt;&lt;/li&gt;<br />
		&lt;/ul&gt;<br />
	&lt;/nav&gt;<br />
[/xhtml]</p>
<h4>&lt;aside&gt;</h4>
<p>(Por ejemplo un sidebar de un blog )<br />
[xhtml]<br />
	&lt;aside&gt;<br />
		&lt;nav&gt;<br />
			&lt;h2&gt;Pages&lt;/h2&gt;<br />
			&lt;ul&gt; .. &lt;/ul&gt;<br />
		&lt;/nav&gt;<br />
		&lt;nav&gt;<br />
			&lt;h2&gt;Recent comments&lt;/h2&gt;<br />
			&lt;ul&gt; ... &lt;/ul&gt;<br />
		&lt;/nav&gt;<br />
		&lt;nav&gt;<br />
			&lt;h2&gt;Last posts&lt;/h2&gt;<br />
			&lt;ul&gt; ... &lt;/ul&gt;<br />
		&lt;/nav&gt;<br />
	&lt;/aside&gt;<br />
[/xhtml]</p>
<h4>&lt;footer&gt;</h4>
<p>[xhtml]<br />
	&lt;footer&gt;<br />
		&lt;small&gt;&amp;copy;2010 Xpenta.com. Design by dpam23&lt;/small&gt;<br />
	&lt;/footer&gt;<br />
[/xhtml]</p>
<h3>Mínima expresión de página en HTML5</h3>
<p>[xhtml]<br />
&lt;!doctype html&gt;<br />
&lt;html lang=en&gt;<br />
	&lt;head&gt;<br />
		&lt;meta charset=utf-8&gt;<br />
		&lt;title&gt;mi blog&lt;/title&gt;<br />
	&lt;/head&gt;<br />
	&lt;body&gt;<br />
		&lt;p&gt;Hoy dictare la clase de html5. Desayunare , Y volveré a la cama.&lt;/p&gt;<br />
	&lt;/body&gt;<br />
&lt;/html&gt;</p>
<p>[/xhtml]</p>
<p>Aquí podemos observar que las directrices básicas son mucho más escuetas (como por ejemplo el doctype).</p>
<h3>Estilando HTML5 con CSS:</h3>
<p>Bien, ahora que ya tenemos un poco más clara la estructura de etiquetas en HTML5, tendremos que aplicarle estilos.</p>
<p>En todos los navegadores menos uno, es muy simple dar estilos a un elemento. Igual que hacíamos con HTML4, creamos una hoja de estilos CSS y desde allí hacemos las llamadas a los elementos.</p>
<p>por ejemplo:</p>
<p>[css]</p>
<p>header{<br />
	background-color:#ececec;<br />
	text-align:center;<br />
	color:#bbb;<br />
}<br />
	header h1{<br />
		padding:30px;<br />
		margin:0;<br />
	}<br />
article{<br />
	padding:30px;<br />
	width:570px;<br />
	float:left;<br />
	border-bottom:1px solid #ebebeb;<br />
}<br />
aside{<br />
	width:269px;<br />
	float:right;<br />
	border-left:1px solid #ebebeb;<br />
	background-color: #F7F6F6;<br />
}<br />
	aside nav, aside section{<br />
	padding:30px;<br />
	}</p>
<p>[/css]</p>
<p>Lo que más sorprende de este nuevo sistema, es que por defecto CSS asume que este tipo de elementos tienen la propiedad display:inline, así que si queremos poner alturas o anchuras, tendremos que cambiarlo a display:block;</p>
<p>[css]<br />
/* Tell the browser to render HTML 5 elements as block */<br />
	header, footer, aside, nav, article, section {<br />
	     display: block;<br />
	}<br />
[/css]</p>
<h3>Peculiaridades de Internet explorer (IE) y HTML5</h3>
<p>Con las versiones actuales de IE, siguiendo las instrucciones anteriormente expuestas, la página permanecerá sin estilos. O mejor dicho, tendrán estilos aquellos elementos típicos de HTML4 (span, div, a...) pero dejará sin estilos los nuevos de HTML5 (header, footer, section, canvas...)</p>
<p>para evitar esto, tendremos que añadir un script al documento:</p>
<p>[javascript]<br />
	&lt;script&gt;<br />
		document.createElement('header');<br />
		document.createElement('nav');<br />
		document.createElement('article');<br />
		document.createElement('footer');<br />
	&lt;/script&gt;<br />
[/javascript]<br />
De esta manera, y son motivo aparente, los elementos cojerán los estilos indicados en el CSS.<br />
Tendremos que crear una línea para cada elemento que queramos crear.<br />
Este script lo podemos poner con los típicos condicionales para que sólo los lea IE, pero si los dejamos para todos los navegadores no pasa nada.</p>
<h3>DEMO: Ejemplo práctico</h3>
<p>Todo esto está muy bien, pero ¿y si lo vemos todo junto?<br />
Os dejo una página sencilla en HTML5 y algo de CSS3.<br />
Es el primer ejercicio que nos han pedido, veremos a ver que nota me ponen!<br />
: )</p>
<p><a href="http://www.racotecnic.com/tutorials/2011/HTML5/" title="HTML5 example">http://www.racotecnic.com/tutorials/2011/HTML5/</a></p>
<h3>Documentación interesante:</h3>
<blockquote>
<ul>
<li>Smashingshare:  <a href="http://smashingshare.com/2010/04/28/ultimate-collection-of-html5-and-css3-resources/" title="HTML5 & CSS3 ressources">ultimate-collection-of-html5-and-css3-resources</a></li>
<li>Splashnology: <a href="http://www.splashnology.com/blog/html5/968.html" title="HTML5"> Useful HTML5 & CSS3 Toolbox For Web Developers </a> </li>
<li><a href="http://bit.ly/guvTze" title="Videotutoriales">Curso videotutoriales de HTML5 </a> creado por Jesús Conde (0utKast).</li>
<li>Curso en video HTML5 - First Look / Ingles (<a href="http://ir.pe/3tqb" title="Curso en video">Descarga gratuita</a>)</li>
<li>Libro HTML5: Designing Rich Internet Applications / Ingles - (<a href="http://ir.pe/3tqd" title="Libro HTML5">Descarga gratuita</a>) </li>
<li>Libro HTML5 for web designers/Ingles (<a href="http://ir.pe/3tqe" title="Libro HTML5">Descarga gratuita</a>)</li>
<li>Conferencia HTML5 para diseñadores-CampusParty / Español <a href="http://ir.pe/3tqf" title="Conferencia HTML5">http://ir.pe/3tqf</a></li>
<li>Conferencia HTML5 para principiantes / Español by @soska- <a href="http://ir.pe/3tqg" title="Conferencia HTML5">http://ir.pe/3tqg</a></li>
<li>Conferencia Introduction to HTML5 / Ingles by Google Developers <a href="http://ir.pe/3tqh" title="Conferencia Introduction to HTML5">http://ir.pe/3tqh</a></li>
<li>Ejemplos y tutoriales de HTML5 <a href="http://www.html5rocks.com/" title="ejemplos y tutoriales de HTML5">http://www.html5rocks.com/</a></li>
</ul>
<p>PD: Gracias a los alumnos del curso por compartir estos enlaces tan interesantes!</p>
</blockquote>
