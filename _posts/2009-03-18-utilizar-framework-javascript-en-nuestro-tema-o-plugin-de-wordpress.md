---
layout: post
status: publish
published: true
title: Utilizar framework JavaScript en nuestro tema o plugin de Wordpress
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Quizás os hayáis planteado añadir un poco de JavaScript a vuestro tema o
  plugin de Wordpress fácilmente gracias a algún framework como jQuery, Scriptacolous,
  Prototype... o quizás simplemente nos interese añadir nuestro propio fichero de
  JavaScript!"
wordpress_id: 219
wordpress_url: http://racotecnic.underave.net/?p=219
date: '2009-03-18 02:38:00 +0100'
date_gmt: '2009-03-18 01:38:00 +0100'
categories:
- General
- Programació
- Web
- Domains &amp; Hosting
tags:
- Wordpress
- JavaScript
- jQuery
- ProtoType
- Scriptaculous
- SWFUpload
---

Quizás os hayáis planteado añadir un poco de JavaScript a vuestro tema o plugin de Wordpress fácilmente gracias a algún framework como jQuery, Scriptacolous, Prototype... o quizás simplemente nos interese añadir nuestro propio fichero de JavaScript!

Al hacerlo olvidaros de hacer "echo '<script type="text/javascript>...</script>;'"... pues como quizás ya sepáis, Wordpress incluye algunas de estas librerías y podrías hacerlas entrar en conflicto (debido a que algún plugin o vuestro tema ya utilicen alguna de estas librerías).

Wordpress tiene una función llamada "wp_enqueue_script" que se encargará de importar en la cabecera del blog el JavaScript que queramos. Ésta misma función se encargará de ordenar los scripts en la cabecera automáticamente y, en caso de ser un script creado por nosotros, deberemos indicar qué escripts van delante de éste (para hacer así un fichero de funciones externo para jQuery, por ejemplo).

<a id="more"></a><a id="more-219"></a>
Vemos la función:

~~~php
wp_enqueue_script( 'handle', 'src', 'deps', 'ver');
~~~

Y sus parámetros:

<ul>
<li>**handle:** Nombre del script, en minúscula.</li>
<li>**src:** (opcional) Ruta al script desde el directorio raíz de Wordpress. Ejemplo: '/wp-contents/themes/nombredeltema/lib/functions.js'. Este parámetro solo es requerido para los scripts que no están incluidos en wordpress. Por defecto está como false.</li>
<li>**deps:** (opcional) array conteniendo los "handle" de los cuales este escript depende (es decir, aquellos escripts que deben ser cargados antes que el nuestro). Éste parámetro sólo lo utilizaremos para importar ficheros JavaScript desconocidos para Wordpress (nuestro fichero de funciones, por ejemplo). Falso por defecto.</li>
<li>**ver:** (opcional) Cadena con la versión del script. Por defecto en falso.</li>
</ul>

Algunos de los "handle" que podéis utilizar son:

<ul>
<li><a title="Visitar web oficial jQuery" href="http://www.jquery.com/" target="_blank">jquery</a></li>
<li><a title="Visitar web oficial Scriptacolous" href="http://script.aculo.us/" target="_blank">scriptacolous</a></li>
<li><a title="Visitar web oficial Prototype" href="http://www.prototypejs.org/" target="_blank">prototype</a></li>
<li><a title="Visitar web oficial SWFUpload" href="http://swfupload.org/" target="_blank">swfupload</a></li>
</ul>

Podéis ver <a title="Ver lista completa" href="http://codex.wordpress.org/Function_Reference/wp_enqueue_script#Parameters" target="_blank">una lista completa</a> en el <a title="Ir a la página principal del Codex de Wordpress" href="http://codex.wordpress.org/" target="_blank">Codex de Wordpress</a>.

Dado que últimamente estoy trasteando con jQuery os mostraré un pequeño ejemplo de cómo importarlo en nuestro tema e importar nuestro fichero de funciones.

Primero de todo importemos jQuery en nuestro tema. Abramos el fichero "header.php" y antes de llamar a la función "wp_head();" llamemos a wp_enqueue_script:

~~~php
<?php
wp_enqueue_script('jquery');
wp_head();
~~~

Con esto Wordpress insertará una etiqueta <script> en la sección <head> de la página haciendo referencia a la librería jQuery.

Lo siguiente que haremos es importar nuestro código con las funciones que tengamos que utilicen jQuery, pero antes deberemos evitar posibles conflictos entre otros frameworks distribuidos con Wordpress como Prototype, SWFUpload... (los "hamdle" anteriormente mencionados).

Esto es porque, por ejemplo, Prototype y jQuery utilizan el mismo método de llamada, el dólar "$". Debemos cambiar éste método en jQuery para que funcione correctamente el código, para ello utilizaremos el método nonConflict de jQuery, así:

`[js]<script type='text/javascript'>
$miMetodoDeLlamadaJquery = jQuery.noConflict();
</script>[/js]`

Evidentemente no es nada recomendable poner un método de llamada tan largo ;) Yo utilizaría $jQ:

`[js]<script type='text/javascript'>
$jQ = jQuery.noConflict();

$jQ(function(){
	$jQ('div#search').hide();
}
</script>[/js]`

Este pequeño ejemplo, insertado en nuestra cabecera del tema, ocultaría la capa con id="search".

Imaginemos que en lugar de estar insertado en la cabecera quisiéramos tener nuestro código en un fichero a parte, guardado en alguna carpeta del tema, o del plugin. Por supuesto, lo primero que haríamos es eliminar las etiquetas "script" de nuestro código, dado que será un fichero .js. Una vez guardado nuestro código en un fichero js y éste subido a alguna carpeta en el servidor (en principio en la carpeta del tema o plugin) lo importamos con wp_enqueue_script:

`~~~php
<?php
wp_enqueue_script('jquery');
wp_enqueue_script('misfunciones','/wp-content/themes/mitema/lib/functions.js',array('jquery'));
wp_head();
?>

~~~`

Recordad que si estáis programando una extensión de jquery debéis pasar un array como tercer parámetro (deps) a la función indicando los ficheros de los que depende vuestra librería. Si hubierais programado una extensión de una extensión deberíais indicarlo así:

`~~~php
<?php
wp_enqueue_script('misfunciones','/wp-content/themes/mitema/lib/functions.js',array('jquery','extension-jquery'));
?>

~~~`

Espero que os sirva, salud!
<blockquote>
Páginas de referencia:

<ul>
<li><a title="Ir a la página principal del Codex de Wordpress" href="http://codex.wordpress.org/" target="_blank">Codex Wordpress</a></li>
<li><a href="http://codex.wordpress.org/Function_Reference/wp_enqueue_script" target="_blank">Referencia función wp_enqueue_script</a></li>
<li><a title="Visitar documentación de jQuery" href="http://docs.jquery.com/Main_Page" target="_blank">jQuery API</a></li>
</ul>
</blockquote>
