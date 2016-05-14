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
  ahora tenemos más etiquetas.\r\n\r\nPor ejemplo, algunas de las más comunes:\r\n\r\n[xhtml]<header><footer><nav><aside><article>[/xhtml]\r\n\r\nSu
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

<img class="alignleft size-thumbnail wp-image-1771" title="HTML5" src="http://www.racotecnic.com/wp-content/uploads/2011/02/HTML5-150x150.jpg" alt="HTML5 Logotype" width="150" height="150" />Desde hace unos días estoy inscrito en un curso gratuito y online de HTML5,  gestionado desde la <a href="http://p2pu.org/course/list">P2PU</a> con el soporte de <a href="http://www.drumbeat.org/project/p2p-university-open-web-career-track">Mozilla</a>.
Estos cursos los da gente anónima y desinteresada, por lo que en general no son docentes sino gente con conocimientos y ganas de explicar cosas.
Es maravilloso que existan iniciativas de este tipo.

Así que sin más preámbulos, me dispongo a dejar constancia de lo aprendido en la primera clase.
<h3>¿Que hay de nuevo en HTML5?</h3>

El principal cambio en el que nos centraremos hoy radica en los elementos de la nueva semántica: Es decir, en el HTML vamos a empezar a utilizar unas etiquetas que son mucho más específicas (en lugar de los ambiguos DIV a los que estábamos acostumbrados).

Esto no significa que dejemos de utilizar DIVs, sino que ahora tenemos más etiquetas.

Por ejemplo, algunas de las más comunes:

[xhtml]<header><footer><nav><aside><article>[/xhtml]

Su mismo nombre ya nos dice más o menos dónde irán ubicadas.

En <a href="http://www.w3schools.com/html5/html5_reference.asp">w3schools</a> tienen una lista completa de todas las etiquetas nuevas.

Vamos a comparar como se creaba antes la estructura de una web y como se hará com HTML5:<a id="more"></a><a id="more-1770"></a>
<h3>Antigua estructura:</h3>

<img class="size-full wp-image-1779" title="html5_1" src="http://www.racotecnic.com/wp-content/uploads/2011/02/html5_11.png" alt="" width="270" height="251" />

[xhtml]
<div id='header'><h1>Título de la página</h1></div>

<div class='post'>Contenido del post</div>

<div class='post'>Contenido del post</div>

<div id='sidebar'>
<ul><li>Elementos típicos del sidebar</li></ul></div>

<div id='footer'>
Elementos típicos del footer</div>
[/xhtml]
<h3>Nueva estructura:</h3>

<img class="size-full wp-image-1780" title="html5_2" src="http://www.racotecnic.com/wp-content/uploads/2011/02/html5_2.png" alt="" width="270" height="251" />

[xhtml]
<header><h1>Título de la página</h1></header>

<article>Contenido del post</article>

<article>Contenido del post</article>

<aside>
<ul><li>Elementos típicos del sidebar</li></ul></aside>

<footer>
Elementos típicos del footer</footer>
[/xhtml]

Como podéis observar, las etiquetas son mucho más semánticas y específicas.
<h3>Ejemplos reales : típicos usos:</h3>
<h4><header></h4>

[xhtml]
	<header>
		<hgroup>
			<h1>Thai cookery school></h1>
			<h2>Learn authentic Thai cookery in your own home </h2>
		</hgroup>
		<nav>

<ul>
				<li>Home</li> <li> <a href=”courses.html”>Cookery courses</a> </li>
				<li><a href=”contact.html”>Contact</a></li>
			</ul>
		</nav>
	</header>
[/xhtml]
<h4><nav></h4>

[xhtml]
	<nav>
		<h2>Main navigation</h2>

<ul>
			<li><a href=”/about”>About me</a></li>
			<li><a href=”/news”>News</a></li>
		</ul>
	</nav>
[/xhtml]
<h4><aside></h4>

(Por ejemplo un sidebar de un blog )
[xhtml]
	<aside>
		<nav>
			<h2>Pages</h2>

<ul> .. </ul>
		</nav>
		<nav>
			<h2>Recent comments</h2>

<ul> ... </ul>
		</nav>
		<nav>
			<h2>Last posts</h2>

<ul> ... </ul>
		</nav>
	</aside>
[/xhtml]
<h4><footer></h4>

[xhtml]
	<footer>
		<small>&amp;copy;2010 Xpenta.com. Design by dpam23</small>
	</footer>
[/xhtml]
<h3>Mínima expresión de página en HTML5</h3>

[xhtml]
<!doctype html>
<html lang=en>
	<head>
		<meta charset=utf-8>
		<title>mi blog</title>
	</head>
	<body>

Hoy dictare la clase de html5. Desayunare , Y volveré a la cama.
	</body>
</html>

[/xhtml]

Aquí podemos observar que las directrices básicas son mucho más escuetas (como por ejemplo el doctype).
<h3>Estilando HTML5 con CSS:</h3>

Bien, ahora que ya tenemos un poco más clara la estructura de etiquetas en HTML5, tendremos que aplicarle estilos.

En todos los navegadores menos uno, es muy simple dar estilos a un elemento. Igual que hacíamos con HTML4, creamos una hoja de estilos CSS y desde allí hacemos las llamadas a los elementos.

por ejemplo:

[css]

header{
	background-color:#ececec;
	text-align:center;
	color:#bbb;
}
	header h1{
		padding:30px;
		margin:0;
	}
article{
	padding:30px;
	width:570px;
	float:left;
	border-bottom:1px solid #ebebeb;
}
aside{
	width:269px;
	float:right;
	border-left:1px solid #ebebeb;
	background-color: #F7F6F6;
}
	aside nav, aside section{
	padding:30px;
	}

[/css]

Lo que más sorprende de este nuevo sistema, es que por defecto CSS asume que este tipo de elementos tienen la propiedad display:inline, así que si queremos poner alturas o anchuras, tendremos que cambiarlo a display:block;

[css]
/* Tell the browser to render HTML 5 elements as block */
	header, footer, aside, nav, article, section {
	     display: block;
	}
[/css]
<h3>Peculiaridades de Internet explorer (IE) y HTML5</h3>

Con las versiones actuales de IE, siguiendo las instrucciones anteriormente expuestas, la página permanecerá sin estilos. O mejor dicho, tendrán estilos aquellos elementos típicos de HTML4 (span, div, a...) pero dejará sin estilos los nuevos de HTML5 (header, footer, section, canvas...)

para evitar esto, tendremos que añadir un script al documento:

[javascript]
	<script>
		document.createElement('header');
		document.createElement('nav');
		document.createElement('article');
		document.createElement('footer');
	</script>
[/javascript]
De esta manera, y son motivo aparente, los elementos cojerán los estilos indicados en el CSS.
Tendremos que crear una línea para cada elemento que queramos crear.
Este script lo podemos poner con los típicos condicionales para que sólo los lea IE, pero si los dejamos para todos los navegadores no pasa nada.
<h3>DEMO: Ejemplo práctico</h3>

Todo esto está muy bien, pero ¿y si lo vemos todo junto?
Os dejo una página sencilla en HTML5 y algo de CSS3.
Es el primer ejercicio que nos han pedido, veremos a ver que nota me ponen!
: )

<a href="http://www.racotecnic.com/tutorials/2011/HTML5/" title="HTML5 example">http://www.racotecnic.com/tutorials/2011/HTML5/</a>
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

PD: Gracias a los alumnos del curso por compartir estos enlaces tan interesantes!
</blockquote>
