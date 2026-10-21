---
status: publish
published: true
title: Clase PHP para tratar imágenes (rotar, redimensionar, añadir marcas de agua..)
excerpt: "Hace ya un tiempo publiqué (en inglés) un Componente para el tratamiento de imágenes en CakePHP. Hoy me he pasado un rato actualizándolo y aprovechando he decidido publicar una entrada con los cambios."
wordpress_id: 1892
date: '2011-04-16 21:03:12 +0200'
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

> **Actualizado:** Tanto la clase como este post han sido actualizados a fecha 14 de enero de 2012.

<img class="alignright size-full wp-image-1473" title="all_together" src="/uploads/2010/04/all_together.jpeg" alt="" width="259" height="258" />

Hace ya un tiempo publiqué (en inglés) un [**Componente para el tratamiento de imágenes en CakePHP**](/2010/04/watermark-image-component-for-cakephp/ "Watermark & Image Component for CakePHP"). Hoy me he pasado un rato actualizándolo y aprovechando he decidido publicar una entrada con los cambios.

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

Si queréis utilizar la clase desde CakePHP simplemente tenéis que descomentar la primera línea de la clase, donde dice `//Component extends Object`, y utilizarlo como un componente cualquiera.

### Aplicando marcas de agua

<a href="/uploads/2011/04/test1.png">
  <img title="test1" src="/uploads/2011/04/test1.png" alt="" />
</a>

~~~php
<?php
$wm = new Watermark();
$wm->setImage('test.png');
$wm->setWatermark(array('file' => 'watermark.png', 'position' => 'top right'));
$wm->applyWatermark();
if (!$wm->generate('test1.png')) {
  // handle error...
  print_r($wm->errors);
}
~~~

### Redimensionando

<a href="/uploads/2011/04/test2.png"><img class="size-full wp-image-1900 aligncenter" title="test2" src="/uploads/2011/04/test2.png" alt="" width="400" height="200" /></a>

~~~php
$wm = new Watermark('test.png');
$wm->resize(array('type' => 'resizecrop', 'size' => array(400, 200)));
if (!$wm->generate('test2.png')) {
  // handle error...
  print_r($wm->errors);
}
~~~

### Rotando

<a href="/uploads/2011/04/test3.png"><img class="size-full wp-image-1901 aligncenter" title="test3" src="/uploads/2011/04/test3.png" alt="" width="400" height="234" /></a>

~~~php
$wm = new Watermark('test.png');
$wm->rotate(90);
if (!$wm->generate('test3.png')) {
  // handle error...
  print_r($wm->errors);
}
~~~

### Guardando en otros formatos

~~~php
$wm = new Watermark('test.png');
if (!$wm->generate('test4.jpg')) {
  // handle error...
  print_r($wm->errors);
}
~~~


### Espejo

<a href="/uploads/2011/04/test5.png">
  <img title="test5" src="/uploads/2011/04/test5-176x300.png" alt="" />
</a>

~~~php
$wm = new Watermark('test.png');
$wm->flip('vertical');
if (!$wm->generate('test5.png')) {
  // handle error...
  print_r($wm->errors);
}
~~~


### Todo junto

<img title="test6" src="/uploads/2011/04/test6.png" alt="" />

~~~php
$wm = new Watermark('test.png', 'watermark.png');
$wm->resize(array('type' => 'resizecrop', 'size' => 400));
$wm->flip('horizontal');
$wm->rotate(90);
$wm->applyWatermark();
if (!$wm->generate('test6.png')) {
  // handle error...
  print_r($wm->errors);
}
~~~

Gracias a [los comentarios de Francisco](#comment-36188) he podido arreglar la clase para que trate correctamente las transparencias.

Si véis cualquier fallo hacédmelo saber o haced <a href="https://github.com/elboletaire/Watimage/fork" target="_blank" rel="noopener">un fork en github directamente</a>!
