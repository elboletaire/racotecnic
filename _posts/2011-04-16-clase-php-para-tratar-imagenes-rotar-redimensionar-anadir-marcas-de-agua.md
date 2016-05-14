---
layout: post
status: publish
published: true
title: Clase PHP para tratar imágenes (rotar, redimensionar, añadir marcas de agua..)
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<blockquote><strong>Actualizado:</strong> Tanto la clase como este post
  han sido actualizados a fecha 14 de enero de 2012.</blockquote>\r\n\r\n<img class=\"alignright
  size-full wp-image-1473\" title=\"all_together\" src=\"http://www.racotecnic.com/wp-content/uploads/2010/04/all_together.jpeg\"
  alt=\"\" width=\"259\" height=\"258\" />Hace ya un tiempo publiqué (en inglés) un
  <a title=\"Watermark &amp; Image Component for CakePHP\" href=\"http://www.racotecnic.com/2010/04/watermark-image-component-for-cakephp/\"><strong>Componente
  para el tratamiento de imágenes en CakePHP</strong></a>. Hoy me he pasado un rato
  actualizándolo y aprovechando he decidido publicar una entrada con los cambios.\r\n\r\nAunque
  la he modificado considerablemente, he procurado no modificar el funcionamiento
  de ésta. Aquí vienen los cambios:\r\n
<ul>\r\n\t<li>He eliminado el uso del método
  obsoleto mime_content_type.</li>\r\n\t<li>Ahora utilizo la clase Exception para
  tratar los errores.</li>\r\n\t<li>He añadido el método \"flip\" para hacer espejo
  de la imagen.</li>\r\n\t<li>He limpiado el código y he arreglado algún que otro
  fallo.</li>\r\n\t<li>Ahora las transparencias funcionan correctamente.</li>\r\n</ul>\r\nPodéis
  descargar el proyecto desde GibHub:\r\n\r\n<a title=\"Descargar Watimage\" href=\"https://github.com/elboletaire/Watimage/archives/master\">https://github.com/elboletaire/Watimage/archives/master</a>\r\n\r\nSi
  queréis utilizar la clase desde CakePHP simplemente tenéis que descomentar la primera
  línea de la clase, donde dice `//Component extends Object`, y utilizarlo
  como un componente cualquiera."
wordpress_id: 1892
wordpress_url: http://www.racotecnic.com/?p=1892
date: '2011-04-16 21:03:12 +0200'
date_gmt: '2011-04-16 20:03:12 +0200'
categories:
- Programació
- Web
tags:
- CakePHP
- Codi
- Component
- CakePHP 1.1
- marca d'aigua
- CakePHP 1.3
- CakePHP 1.2
- PHP5
- Watermark
---
<blockquote><strong>Actualizado:</strong> Tanto la clase como este post han sido actualizados a fecha 14 de enero de 2012.</blockquote>

<img class="alignright size-full wp-image-1473" title="all_together" src="http://www.racotecnic.com/wp-content/uploads/2010/04/all_together.jpeg" alt="" width="259" height="258" />Hace ya un tiempo publiqué (en inglés) un <a title="Watermark &amp; Image Component for CakePHP" href="http://www.racotecnic.com/2010/04/watermark-image-component-for-cakephp/"><strong>Componente para el tratamiento de imágenes en CakePHP</strong></a>. Hoy me he pasado un rato actualizándolo y aprovechando he decidido publicar una entrada con los cambios.

Aunque la he modificado considerablemente, he procurado no modificar el funcionamiento de ésta. Aquí vienen los cambios:

<ul>
<li>He eliminado el uso del método obsoleto mime_content_type.</li>
<li>Ahora utilizo la clase Exception para tratar los errores.</li>
<li>He añadido el método "flip" para hacer espejo de la imagen.</li>
<li>He limpiado el código y he arreglado algún que otro fallo.</li>
<li>Ahora las transparencias funcionan correctamente.</li>
</ul>

Podéis descargar el proyecto desde GibHub:

<a title="Descargar Watimage" href="https://github.com/elboletaire/Watimage/archives/master">https://github.com/elboletaire/Watimage/archives/master</a>

Si queréis utilizar la clase desde CakePHP simplemente tenéis que descomentar la primera línea de la clase, donde dice `//Component extends Object`, y utilizarlo como un componente cualquiera.<a id="more"></a><a id="more-1892"></a>
<h4>Aplicando marcas de agua</h4>

<a href="http://www.racotecnic.com/wp-content/uploads/2011/04/test1.png"><img class="size-full wp-image-1899 aligncenter" title="test1" src="http://www.racotecnic.com/wp-content/uploads/2011/04/test1.png" alt="" width="322" height="546" /></a>

[php]$wm = new Watermark();<br />
$wm->setImage('test.png');<br />
$wm->setWatermark(array('file' => 'watermark.png', 'position' => 'top right'));<br />
$wm->applyWatermark();<br />
if ( !$wm->generate('test1.png') ) {<br />
	// handle error...<br />
	print_r($wm->errors);<br />
}[/php]
<h4>Redimensionando</h4>

<a href="http://www.racotecnic.com/wp-content/uploads/2011/04/test2.png"><img class="size-full wp-image-1900 aligncenter" title="test2" src="http://www.racotecnic.com/wp-content/uploads/2011/04/test2.png" alt="" width="400" height="200" /></a>

[php]$wm = new Watermark('test.png');<br />
$wm->resize(array('type' => 'resizecrop', 'size' => array(400, 200)));<br />
if ( !$wm->generate('test2.png') ) {<br />
	// handle error...<br />
	print_r($wm->errors);<br />
}[/php]
<h4>Rotando</h4>

<a href="http://www.racotecnic.com/wp-content/uploads/2011/04/test3.png"><img class="size-full wp-image-1901 aligncenter" title="test3" src="http://www.racotecnic.com/wp-content/uploads/2011/04/test3.png" alt="" width="400" height="234" /></a>

[php]$wm = new Watermark('test.png');<br />
$wm->rotate(90);<br />
if ( !$wm->generate('test3.png') ) {<br />
	// handle error...<br />
	print_r($wm->errors);<br />
}<br />
[/php]
<h4>Guardando en otros formatos</h4>

[php]$wm = new Watermark('test.png');<br />
if ( !$wm->generate('test4.jpg') ) {<br />
	// handle error...<br />
	print_r($wm->errors);<br />
}[/php]
<h4>Espejo</h4>

<a href="http://www.racotecnic.com/wp-content/uploads/2011/04/test5.png"><img class="size-medium wp-image-1903 aligncenter" title="test5" src="http://www.racotecnic.com/wp-content/uploads/2011/04/test5-176x300.png" alt="" width="176" height="300" /></a>

[php]$wm = new Watermark('test.png');<br />
$wm->flip('vertical');<br />
if ( !$wm->generate('test5.png') ) {<br />
	// handle error...<br />
	print_r($wm->errors);<br />
}[/php]
<h4>Todo junto</h4>

<img class="aligncenter size-full wp-image-1904" title="test6" src="http://www.racotecnic.com/wp-content/uploads/2011/04/test6.png" alt="" width="341" height="341" />

[php]$wm = new Watermark('test.png', 'watermark.png');<br />
$wm->resize(array('type' => 'resizecrop', 'size' => 400));<br />
$wm->flip('horizontal');<br />
$wm->rotate(90);<br />
$wm->applyWatermark();<br />
if ( !$wm->generate('test6.png') ) {<br />
	// handle error...<br />
	print_r($wm->errors);<br />
}[/php]

Gracias a <a href="#comment-36188" >los comentarios de Francisco</a> he podido arreglar la clase para que trate correctamente las transparencias.

Si véis cualquier fallo hacédmelo saber o haced <a href="https://github.com/elboletaire/Watimage/fork" target="_blank">un fork en github directamente</a>!
