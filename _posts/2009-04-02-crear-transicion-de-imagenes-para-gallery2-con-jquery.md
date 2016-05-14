---
layout: post
status: publish
published: true
title: Crear transición de imágenes para Gallery2 con jQuery
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Hoy os explicaré como aprovechar el módulo \"<a title=\"Ver información
  de imageBlock en el códex de Gallery2\" href=\"http://codex.gallery2.org/Gallery2:Modules:imageblock\"
  target=\"_blank\">imageBlock</a>\" de <a title=\"Visitar web de Gallery2\" href=\"http://gallery.menalto.com/\"
  target=\"_blank\">Gallery2</a> para generar una transición de imágenes. Además le
  daremos un efecto entre transición y transición, para dejarlo más majo :p\r\n\r\n<del>Podéis
  ver el resultado del ejemplo aquí.</del> Lamentablemente la galería de la que dependía
  el ejemplo ha dejado de funcionar.\r\n\r\nPrimero de todo, debéis tener instalado
  y activado dicho módulo en la galería. Si tenéis una de las últimas versiones de
  Gallery podréis descargarlo automáticamente sin problemas, sino deberéis ir a la
  página de descarga de Gallery y descargaros una versión de contenga dicho módulo
  para agregarlo a vuestra instalación.\r\n\r\nUna vez lo tengáis activado os aparecerá
  en vuestro panel de administración de Gallery2, como \"Image Block\" o \"Bloque
  de imágenes\" según vuestra versión, idioma ...\r\n\r\nEn esa misma página podéis
  ver un ejemplo de cómo utilizar el bloque de imágenes externamente, podéis utilizar
  ese método (es con el que haré el ejemplo) o bien el método que indican en el codex,
  incluyendo el fichero embed.php y utilizando los métodos propios de las clases de
  Gallery2.\r\n\r\n"
wordpress_id: 403
wordpress_url: http://racotecnic.underave.net/?p=403
date: '2009-04-02 01:12:50 +0200'
date_gmt: '2009-04-02 00:12:50 +0200'
categories:
- Programació
- Web
tags:
- PHP
- JavaScript
- jQuery
- Gallery2
---

Hoy os explicaré como aprovechar el módulo "<a title="Ver información de imageBlock en el códex de Gallery2" href="http://codex.gallery2.org/Gallery2:Modules:imageblock" target="_blank">imageBlock</a>" de <a title="Visitar web de Gallery2" href="http://gallery.menalto.com/" target="_blank">Gallery2</a> para generar una transición de imágenes. Además le daremos un efecto entre transición y transición, para dejarlo más majo :p

<del>Podéis ver el resultado del ejemplo aquí.</del> Lamentablemente la galería de la que dependía el ejemplo ha dejado de funcionar.

Primero de todo, debéis tener instalado y activado dicho módulo en la galería. Si tenéis una de las últimas versiones de Gallery podréis descargarlo automáticamente sin problemas, sino deberéis ir a la página de descarga de Gallery y descargaros una versión de contenga dicho módulo para agregarlo a vuestra instalación.

Una vez lo tengáis activado os aparecerá en vuestro panel de administración de Gallery2, como "Image Block" o "Bloque de imágenes" según vuestra versión, idioma ...

En esa misma página podéis ver un ejemplo de cómo utilizar el bloque de imágenes externamente, podéis utilizar ese método (es con el que haré el ejemplo) o bien el método que indican en el codex, incluyendo el fichero embed.php y utilizando los métodos propios de las clases de Gallery2.

<a id="more"></a><a id="more-403"></a><br />
El código es el siguiente:

[php]@readfile('http://vuestra.galeria.com/main.php?g2_view=imageblock.External&amp;g2_blocks=randomImage&amp;g2_show=none&amp;g2_maxSize=130');[/php]

Utilizad el botón "show source" <img class="alignnone" src="http://racotecnic.underave.net/wp-content/plugins/syntaxhighlighter-plus/syntaxhighlighter/styles/page_white_code.png" alt="" width="16" height="16" /> situado en la parte derecha del código para verlo entero.

Como veis lo que hacemos únicamente es importar el módulo image block con <a title="readfile function at php.net" href="http://es.php.net/readfile" target="_blank">readfile</a> para mostrar su contenido. A éste módulo podemos pasarle parámetros para mostrar las imágenes como más nos guste. Podéis ver toda la lista de parámetros desde vuestro panel de administración de Image Block, o bien desde el <a title="Ver demás opciones en el Codex" href="http://codex.gallery2.org/Gallery2:Modules:imageblock#External_Options" target="_blank">Codex de Gallery2</a>. Los parámetros que utilizaré para el ejemplo son:

<ul>
<li><strong> g2_blocks</strong>: una lista separada de barras verticales (|) con aquellas imágenes que queramos mostrar. Estas pueden ser: <em>randomImage</em>, <em>recentImage</em>, <em>viewedImage</em>, <em>randomAlbum</em>, <em>recentAlbum</em>, <em>viewedAlbum</em>, <em>dailyImage</em>, <em>weeklyImage</em>, <em>monthlyImage</em>, <em>dailyAlbum</em>, <em>weeklyAlbum</em>, <em>monthlyAlbum</em>, <em>specificItem</em>; por defecto (si no pasamos el parámetro g2_blocks) será la opción que tengamos seleccionada en la configuración del módulo Image Block.<br />
En mi ejemplo utilizaré el query string: <strong><em>g2_blocks=randomImage|randomImage|randomImage</em></strong> para mostrar 3 imágenes aleatorias.</li>
<li><strong>g2_show</strong>: lista separada por barras verticales (|) con los detalles que queramos mostrar de la imagen. Pueden ser: <em> title</em>, <em>date</em>, <em>views</em>, <em>owner</em>, <em>heading</em>, <em>fullSize</em>, <em>rawImage</em>; también podemos utilizar <em>none</em> para no mostrar información alguna (como en el caso de este ejemplo).</li>
<li><strong>g2_maxSize</strong>: define el tamaño máximo a mostrar de las imágenes. Yo lo limitaré a <strong>130</strong> (px).</li>
</ul>

Y por supuesto el resto de la query string: <em><strong>main.php?g2_view=imageblock.External</strong></em> que es la encargada de cargar el módulo Image Block.

El query string resultante será:

main.php?g2_view=imageblock.External&amp;g2_blocks=randomImage|randomImage|randomImage&amp;g2_show=none&amp;g2_maxSize=130

Así pues guardamos esta línea en un fichero que llamaremos "random_image.php":

[php]<?php<br />
@readfile('http://vuestra.galeria.com/main.php?g2_view=imageblock.External&amp;g2_blocks=randomImage|randomImage|randomImage&amp;g2_show=none&amp;g2_maxSize=130');<br />
?>[/php]

Ahora pasaremos a hacer el código en JavaScript (utilizando jQuery, por supuesto) para hacer la transición de imágenes.

Crearemos dos capas, <em>capa</em> y <em>subcapa</em> dónde cargaremos las imágenes. La capa la utilizaremos para cargar las imágenes y la subcapa para hacer la precarga de la siguiente tanda de imágenes.

Básicamente nuestra función de JavaScript debe hacer:
<ol>
<li>Cargar el fichero php en la subcapa y ocultarlo para que no lo vea el usuario.</li>
<li>Hacer un efecto de FadeOut de las imágenes que hay.</li>
<li>Mover el contenido de la subcapa a la capa.</li>
<li>Hacer un FadeIn de la capa para mostrar las imágenes.</li>
</ol>

Llamaremos a esta función randomImages() (por ejemplo) y más adelante utilizaremos un contador para ejecutar dicha función indefinidamente.

[js]function randomImages(){<br />
// Cargamos el fichero random_image.php en la subcapa y lo ocultamos<br />
	$('#subcapa').load('random_image.php').hide();<br />
// Hacemos un fadeOut de la capa de 2000 milisegundos y al terminar ejecutamos una función<br />
	$('#capa').fadeOut(2000, function(){<br />
// Ocultamos la capa del todo (por si acaso)<br />
		$(this).hide();<br />
// Cargamos el contenido de la subcapa en la capa y hacemos un fadeIn de 2000 milisegundos<br />
		$('#capa').html($('#subcapa').html()).fadeIn(2000);<br />
	});<br />
}[/js]

De nuevo, utilizad el botón "Show Source" <img class="alignnone" src="http://racotecnic.underave.net/wp-content/plugins/syntaxhighlighter-plus/syntaxhighlighter/styles/page_white_code.png" alt="" width="16" height="16" /> para ver el código y los comentarios al completo.

He puesto 2000 milisegundos de tiempo para dar más o menos tiempo a cargar al siguiente grupo de imágenes.

Ahora que ya tenemos nuestra función utilizaremos la función <em>setInterval(String fn, int interval)</em>. El primer parámetro de ésta es el nombre de la función (pasado como cadena de texto) y el segundo es el intervalo de tiempo que tarda en ejecutarse dicha función entre ejecución y ejecución.

[js]setInterval('randomImages()', 7000);[/js]

Ya tenemos todo el JavaScript que necesitaremos. Ahora sólo hace falta darle un poco de CSS e incluir el fichero PHP que hemos generado antes.

La clase de CSS de la capa que contiene las imágenes (la que nos genera Image Block) se llama "one-image" y dado que en mi ejemplo quiero mostrar las imágenes en hilera horizontal, le daré la opción "float: left" y para que haya un poco de espacio entre ellas "padding-left: 1em". A demás debemos indicar que ambas capas <em>capa</em> y <em>subcapa</em> están en la misma posición, sino el efecto de transición no se hará correctamente. Para ello indicaremos que tienen una posición absoluta y las ubicaremos en el mismo sitio:

[css].one-image {<br />
	float: left;<br />
	padding-left: .7em;<br />
}<br />
#capa, #subcapa {<br />
	position: absolute;<br />
	top: 1em;<br />
	left: .6em;<br />
}<br />
/* ocultamos los bordes feos que aparecen al enlazar imágenes */<br />
a img {<br />
	border: none;<br />
}[/css]

Finalmente incluimos el fichero random_image.php en la <em>capa</em> para que muestre las imágenes la primera vez que accedamos a la página:

[php]<div id='capa'><br />
<?php<br />
	include 'random_image.php';<br />
?><br />
</div>[/php]

Aquí podéis ver el documento HTML/PHP entero:

[php]<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN'<br />
  'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'><br />
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='es' lang='es'><br />
	<head><br />
		<meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><br />
		<title>Transición de imágenes aleatorias de Gallery2 con jQuery</title><br />
		<style type='text/css'><br />
			.one-image {<br />
				float: left;<br />
				padding-left: .7em;<br />
			}<br />
			a img {<br />
				border: none;<br />
			}<br />
			#capa, #subcapa {<br />
				position: absolute;<br />
				top: 1em;<br />
				left: .6em;<br />
			}<br />
		</style><br />
		<script type='text/javascript' src='jquery-1.3.2.min.js'></script><br />
		<script type='text/javascript'><br />
		<!--<br />
			function randomImages(){<br />
					$('#subcapa').load('random_image.php').hide();<br />
					$('#capa').fadeOut(2000, function(){<br />
						$(this).hide();<br />
						$('#capa').html($('#subcapa').html()).fadeIn(2000);<br />
					});<br />
			}<br />
			setInterval('randomImages()', 7000);<br />
		--><br />
		</script><br />
	</head><br />
	<body><br />
	<div id='capa'><br />
	<?php<br />
		include 'random_image.php';<br />
	?><br />
	</div><br />
	<div id='subcapa'></div><br />
</body><br />
</html>[/php]

Y ya está! Ya tenéis vuestra transición de imágenes para Gallery2. Podéis jugar con el CSS y mostrar cuadrículas con imágenes (consultad el <a title="Ir al códex de Gallery2" href="http://codex.gallery2.org/" target="_blank">Codex de Gallery</a> para más detalles), así como trastear las múltiples opciones de Image Block para mostrar el contenido que queráis.

Como siempre, he intentado explicarlo lo mejor posible. Espero que os sirva de ayuda :D

Hay una cosa que he intentado hacer y que no he logrado de ninguna de las maneras.. a ver si algún alma caritativa que llegue aquí y sepa explicarlo me lo explique ;p He intentado mediante booleanos, bucles, deteniendo el temporizador... que al pasar el ratón por encima de la capa se detenga la transición de imágenes, pero nada. No lo he conseguido...

Imagino que para hacerlo tendríamos que programar la transición más detenidamente en lugar de utilizar un framework como jQuery. Ahí queda, a ver si alguien sabe hacerlo!
<blockquote>

<ul>
<li><del>Ver demo del tutorial</del></li>
<li><a title="Descargar todos los ficheros" href="http://racotecnic.underave.net/tutorials/2009/04/random_image/random_image.zip">Descargar zip con todos los ficheros</a></li>
</ul>

Páginas de referencia:

<ul>
<li><a title="Consultar Codex de Gallery2" href="http://codex.gallery2.org" target="_blank">Codex de Gallery2</a></li>
<li><a title="Consultar documentación de jQuery" href="http://docs.jquery.com/" target="_blank">jQuery Documentation</a></li>
</ul>
</blockquote>
