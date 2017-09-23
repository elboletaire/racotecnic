---
layout: post
status: publish
published: true
title: Implementar plugin jQuery de advertencias tipo Growl en CakePHP
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Voy a explicaros una forma sencilla reemplazar vuestras capas flashMessage
  por bonitos mensajes dinámicos creados con jQuery imitando el estilo de Growl."
wordpress_id: 986
wordpress_url: http://racotecnic.com/?p=986
redirect_from:
- "?p=986/"
date: '2009-11-14 16:39:50 +0100'
date_gmt: '2009-11-14 15:39:50 +0100'
categories:
- Programació
- Web
tags:
- PHP
- jQuery
- CakePHP
- Growl
- Gritter
- CakePHP 1.2
---

> **Nota para usuarios de CakePHP 1.3:** he puesto algunos comentarios y notas
como esta en el código y en el tutorial. Tened en cuenta también (por si no lo
sabéis..) que el helper de JavaScript ya no se utiliza para incrustar y cargar
código en la variable `$scripts_for_layout`. Así mismo no estaría de más que
reemplazarais el modo en que se utilizan los helpers en las vistas (es decir,
utilizar $this->Html en lugar de $html por ejemplo).

Voy a explicaros una forma sencilla reemplazar vuestras capas _**flashMessage**_ por bonitos mensajes dinámicos creados con jQuery imitando el estilo de Growl.

Para los que no lo sepáis, <a rel="nofollow" href="http://www.growl.info/" target="_blank">Growl</a> es un sistema de advertencias de Mac que nos unifica todas las advertencias (tanto de sistema como las del resto de aplicaciones) siguiendo el mismo estilo y mostrándose y ocultándose con efectos de entrada y salida.

<figure>
  <a href="http://www.underave.net/barna23"><img src="http://blog.underave.net/wp-content/uploads/2009/11/gritter.png" alt="" /></a>
  <figcaption>
    Implementación de Gritter en [underave.net](http://underave.net)
  </figcaption>
</figure>

Hay varios plugins de jQuery que imitan Growl. En <a title="6 jQuery growl-like notification systems" rel="nofollow" href="http://webtoolkit4.me/2009/08/13/jquery-growl-likenotification-systems/" target="_blank">este enlace</a> podéis encontrar los que probablemente sean los más conocidos y utilizados. Para el ejemplo que voy a hacer me he valido de <a title="Gritter" rel="nofollow" href="http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/" target="_blank">Gritter</a>, que es el plugin que, a mi parecer, más se asemeja a Growl.

<a id="more"></a><a id="more-986"></a>

¿Qué necesitáis para este tutorial?

- <a rel="nofollow" href="http://www.cakephp.org" target="_blank">CakePHP</a> (v. 1.2.4.8284 [1.2.5 stable], la 1.3 también sirve)
- <a rel="nofollow" href="http://www.jquery.com" target="_blank">jQuery</a> (v. 1.3.2)
- <a rel="nofollow" href="http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/" target="_blank">Gritter</a> (v. 1.5)

_(las versiones que he puesto entre paréntesis son las que he utilizado yo para el tutorial)_

Descargad todo lo necesario y guardad todo donde más os plazca. En mi ejemplo lo he organizado así:

- **jquery-1.3.2.min.js** a la carpeta `/app/webroot/js/`
- **jquery.gritter.min.js** a la carpeta `/app/webroot/js/`
- **gritter.png** a la carpeta `/app/webroot/img/`
- **gritter-close-ie6.gif** a la carpeta `/app/webroot/img/`
- **gritter-long.png** a la carpeta `/app/webroot/img/`
- **jquery.gritter.css** renombrado y movido a `/app/webroot/css/gritter.css`

Fijaros que he renombrado el fichero CSS. Además de renombrarlo habrá que modificar las rutas de las imágenes hacia la ruta que toque. Si estáis siguiendo el tutorial al pie de la letra debéis reemplazar **../images/** por **../img/** en vuestro CSS.

Dado que queremos utilizar este sistema de notificaciones tipo Growl como sistema de notificaciones principal de CakePHP tenemos que modificar nuestro <em>layout</em> de HTML principal para cargar los JavaScripts en la cabecera:

~~~php
<?php
// /app/views/layout/default.ctp
echo '<?xml version="1.1" encoding="' . Configure::read('App.encoding') . '"?>'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es-es">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <?php echo $html->charset(); ?>
    <title><?php echo $title_for_layout ?> | Ejemplos CakePHP | Racó Tècnic</title>
    <?php echo $javascript->link(array('jquery-1.3.2.min','jquery.gritter.min')) ?>
    <?php echo $javascript->codeBlock('var webroot="'.$this->webroot.'";') ?>
    <?php echo $scripts_for_layout; ?>
    <?php echo $html->css(array('main','gritter')) ?>
  </head>
<body>
  <div id="container">
    <div id="header">
      <h1><?php echo $html->link(__('Ejemplos CakePHP, Racó Tècnic', true), 'http://www.racotecnic.com'); ?></h1>
    </div>
    <div id="content">
      <?php $session->flash(); // Cake 1.2 ?>
      <?php echo $this->Session->flash(); // Cake 1.3 ?>
      <?php echo $content_for_layout; ?>
    </div>
    <div id="footer">
      <?php echo $html->link(
          $html->image('cake.power.gif', array('alt'=> __("CakePHP: the rapid development php framework", true), 'border'=>"0")),
          'http://www.cakephp.org/',
          array('target'=>'_blank'), null, false
        );
      ?>
    </div>
  </div>
  <?php echo $cakeDebug; ?>
  <script src="http://static.woopra.com/js/woopra.js" type="text/javascript"></script>
</body>
</html>
~~~

Las líneas marcadas en azul son las que os interesan. El resto podéis ignorarlas perfectamente.

En la **línea 9** he añadido las librerías jQuery y Gritter. Recordad que para poder utilizar el <em>Helper</em>de JavasCript desde cualquier parte deberéis haber añadido dicho Helper en vuestro <em>AppController</em>:

~~~php
<?php // /app/app_controller.php
class AppController extends Controller {
  var $helpers = array('Html','Javascript'); // Cake 1.2
  var $helpers = array('Html'); // Cake 1.3
}
~~~

En la **línea 10** creamos la variable de JavaScript "<em>webroot</em>" que nos servirá más adelante para las plantillas de gritter. Si habéis leído alguno de mis tutoriales sobre <a title="Subida de ficheros con uploadify y validación Ajax en CakePHP" href="http://www.racotecnic.com/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp/">**cómo subir múltiples imágenes con uploadify en CakePHP**</a> quizás ya hayáis añadido esta variable a vuestro <em>layout</em>.

En la **línea 12** añadimos el fichero CSS de Gritter.

Y en la **línea 20**, si no la teníais ya en vuestro <em>layout</em>, debéis añadir el método <em>$session->flash()</em> que será el que mostrará las notificaciones de Gritter.

Ya solo nos queda una cosa por hacer: crear la plantilla para cada tipo de notificación.

Como no quiero alargar mucho el tutorial haré sólo un par de <em>layouts</em>, uno para los errores y otro para las notificaciones normales.

**Notificaciones informativas:**

~~~php
// /app/views/layouts/flash_info.ctp (Cake 1.2)
// /app/views/elements/flash_info.ctp (Cake 1.3)
<?php echo $javascript->codeBlock('
// $this->Html->scriptBlock en Cake 1.3
$(function(){
  $.gritter.add({
    title: '' . __('Información',true) . '',
    text: '' . $content_for_layout . '', // Cake 1.2. La variable es $message en la 1.3
    image: webroot + 'img/info_48.png',
    sticky: true
  });
});') ?>
~~~

**Notificaciones de error:**

~~~php
<?php
// /app/views/layouts/flash_error.ctp (Cake 1.2)
// /app/views/elements/flash_info.ctp (Cake 1.3)
echo $javascript->codeBlock('
// $this->Html->scriptBlock en Cake 1.3
$(function() {
  $.gritter.add({
    title: "' . __('Error',true) . '",
    text: "' . $content_for_layout . '", // Cake 1.2. La variable es $message en la 1.3
    image: webroot + "img/error_48.png",
    sticky: true
  });
});') ?>
~~~

Como podéis ver he utilizado la variable webroot para poder acceder fácilmente a nuestro directorio de imágenes. De todos modos, y dado que estamos insertando el JavaScript mediante PHP, podríamos haber hecho $this->webroot. También he activado la variable <em>sticky</em> de gritter para dejar la notificación mostrada en pantalla hasta que el usuario la cierre manualmente, ya que considero que los flashMessage deben comportarse así. Cuando trabajo con Ajax no utilizo la variable <em>sticky</em>.

En estos ejemplos he utilizado lo básico al configurar Growl. Id a su página si queréis informaros sobre los demás métodos y variables disponibles para configurarlo.

Pues con esto habríamos terminado. Ahora cada vez que queráis mostrar notificaciones simplemente tendréis que especificar la plantilla a utilizar como segundo parámetro del método <em>$this->Session->setFlash()</em>:

~~~php?start_inline=1
// Notificación de error
$this->Session->setFlash('Esto es un mensaje de error', 'flash_error');

// Notificación informativa
$this->Session->setFlash('Esto es un mensaje informativo', 'flash_info');
~~~
{: .no-line-numbers }

Pues ya está, ya lo tenemos ^^

Si queréis podéis descargar los ficheros más importantes en <a href="http://www.racotecnic.com/tutorials/2009/11/growl_cake.zip">el zip</a> que he preparado del tutorial. También <a href="http://www.racotecnic.com/tutorials/cake/pages/growl">podéis ver el ejemplo</a> que he hecho a medida que hacía esta pequeña guía.

> **Ejemplo**:
>
> - <a href="http://www.racotecnic.com/tutorials/cake/pages/growl">Ver ejemplo</a>
> - <a href="http://www.racotecnic.com/tutorials/2009/11/growl_cake.zip">Descargar ficheros del ejemplo</a>
>
> Páginas de referencia:
>
> - <a href="http://api.cakephp.org" target="_blank">API de CakePHP</a>
> - <a rel="nofollow" href="http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/" target="_blank">Documentación de Gritter</a>
