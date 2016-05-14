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
excerpt: "<blockquote><strong>Nota para usuarios de CakePHP 1.3:</strong> he puesto
  algunos comentarios y notas como esta en el código y en el tutorial.\r\nTened en
  cuenta también (por si no lo sabéis..) que el helper de JavaScript ya no se utiliza
  para incrustar y cargar código en la variable <code>$scripts_for_layout</code>.
  Así mismo no estaría de más que reemplazarais el modo en que se utilizan los helpers
  en las vistas (es decir, utilizar $this->Html en lugar de $html por ejemplo).</blockquote>\r\n\r\n\r\nVoy
  a explicaros una forma sencilla reemplazar vuestras capas <strong><em>flashMessage</em></strong>
  por bonitos mensajes dinámicos creados con jQuery imitando el estilo de Growl.\r\n\r\nPara
  los que no lo sepáis, <a rel=\"nofollow\" href=\"http://www.growl.info/\" target=\"_blank\">Growl</a>
  es un sistema de advertencias de Mac que nos unifica todas las advertencias (tanto
  de sistema como las del resto de aplicaciones) siguiendo el mismo estilo y mostrándose
  y ocultándose con efectos de entrada y salida.\r\n\r\n[caption id=\"\" align=\"aligncenter\"
  width=\"310\" caption=\"Implementación de Gritter en \"]<a href=\"http://www.underave.net/barna23\"><img
  src=\"http://blog.underave.net/wp-content/uploads/2009/11/gritter.png\" alt=\"\"
  width=\"310\" height=\"262\" /></a>[/caption]\r\n\r\n<a href=\"</dd\">Hay varios
  plugins de jQuery que imitan Growl. En </a><a title=\"6 jQuery growl-like notification
  systems\" rel=\"nofollow\" href=\"http://webtoolkit4.me/2009/08/13/jquery-growl-likenotification-systems/\"
  target=\"_blank\">este enlace</a> podéis encontrar los que probablemente sean los
  más conocidos y utilizados. Para el ejemplo que voy a hacer me he valido de <a title=\"Gritter\"
  rel=\"nofollow\" href=\"http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/\"
  target=\"_blank\">Gritter</a>, que es el plugin que, a mi parecer, más se asemeja
  a Growl.\r\n\r\n"
wordpress_id: 986
wordpress_url: http://racotecnic.underave.net/?p=986
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
<blockquote><strong>Nota para usuarios de CakePHP 1.3:</strong> he puesto algunos comentarios y notas como esta en el código y en el tutorial.<br />
Tened en cuenta también (por si no lo sabéis..) que el helper de JavaScript ya no se utiliza para incrustar y cargar código en la variable <code>$scripts_for_layout</code>. Así mismo no estaría de más que reemplazarais el modo en que se utilizan los helpers en las vistas (es decir, utilizar $this->Html en lugar de $html por ejemplo).</p></blockquote>
<p>Voy a explicaros una forma sencilla reemplazar vuestras capas <strong><em>flashMessage</em></strong> por bonitos mensajes dinámicos creados con jQuery imitando el estilo de Growl.</p>
<p>Para los que no lo sepáis, <a rel="nofollow" href="http://www.growl.info/" target="_blank">Growl</a> es un sistema de advertencias de Mac que nos unifica todas las advertencias (tanto de sistema como las del resto de aplicaciones) siguiendo el mismo estilo y mostrándose y ocultándose con efectos de entrada y salida.</p>
<p>[caption id="" align="aligncenter" width="310" caption="Implementación de Gritter en "]<a href="http://www.underave.net/barna23"><img src="http://blog.underave.net/wp-content/uploads/2009/11/gritter.png" alt="" width="310" height="262" /></a>[/caption]</p>
<p><a href="</dd">Hay varios plugins de jQuery que imitan Growl. En </a><a title="6 jQuery growl-like notification systems" rel="nofollow" href="http://webtoolkit4.me/2009/08/13/jquery-growl-likenotification-systems/" target="_blank">este enlace</a> podéis encontrar los que probablemente sean los más conocidos y utilizados. Para el ejemplo que voy a hacer me he valido de <a title="Gritter" rel="nofollow" href="http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/" target="_blank">Gritter</a>, que es el plugin que, a mi parecer, más se asemeja a Growl.</p>
<p><a id="more"></a><a id="more-986"></a><br />
¿Qué necesitáis para este tutorial?</p>
<ul>
<li><a rel="nofollow" href="http://www.cakephp.org" target="_blank">CakePHP</a> (v. 1.2.4.8284 [1.2.5 stable], la 1.3 también sirve)</li>
<li><a rel="nofollow" href="http://www.jquery.com" target="_blank">jQuery</a> (v. 1.3.2)</li>
<li><a rel="nofollow" href="http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/" target="_blank">Gritter</a> (v. 1.5)</li>
</ul>
<p><em>(las versiones que he puesto entre paréntesis son las que he utilizado yo para el tutorial)</em></p>
<p>Descargad todo lo necesario y guardad todo donde más os plazca. En mi ejemplo lo he organizado así:</p>
<ul>
<li><strong>jquery-1.3.2.min.js</strong> a la carpeta <em>/app/webroot/js/</em></li>
<li><strong>jquery.gritter.min.js</strong> a la carpeta <em>/app/webroot/js/</em></li>
<li><strong>gritter.png</strong> a la carpeta <em>/app/webroot/img/</em></li>
<li><strong>gritter-close-ie6.gif</strong> a la carpeta <em>/app/webroot/img/</em></li>
<li><strong>gritter-long.png</strong> a la carpeta <em>/app/webroot/img/</em></li>
<li><strong>jquery.gritter.css</strong> renombrado y movido a <em>/app/webroot/css/gritter.css</em></li>
</ul>
<p>Fijaros que he renombrado el fichero CSS. Además de renombrarlo habrá que modificar las rutas de las imágenes hacia la ruta que toque. Si estáis siguiendo el tutorial al pie de la letra debéis reemplazar <strong>../images/</strong> por <strong>../img/</strong> en vuestro CSS.</p>
<p>Dado que queremos utilizar este sistema de notificaciones tipo Growl como sistema de notificaciones principal de CakePHP tenemos que modificar nuestro <em>layout</em> de HTML principal para cargar los JavaScripts en la cabecera:</p>
<p>[php highlight="9,10,12,20,21"]// /app/views/layout/default.ctp<br />
&lt;?php echo '&lt;?xml version=&quot;1.1&quot; encoding=&quot;' . Configure::read('App.encoding') . '&quot;?&gt;' ?&gt;<br />
&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.1//EN&quot; &quot;http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd&quot;&gt;<br />
&lt;html xmlns=&quot;http://www.w3.org/1999/xhtml&quot; xml:lang=&quot;es-es&quot;&gt;<br />
&lt;html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;&gt;<br />
    &lt;head&gt;<br />
    	&lt;?php echo $html-&gt;charset(); ?&gt;<br />
		&lt;title&gt;&lt;?php echo $title_for_layout ?&gt; | Ejemplos CakePHP | Racó Tècnic&lt;/title&gt;<br />
		&lt;?php echo $javascript-&gt;link(array('jquery-1.3.2.min','jquery.gritter.min')) ?&gt;<br />
		&lt;?php echo $javascript-&gt;codeBlock('var webroot=&quot;'.$this-&gt;webroot.'&quot;;') ?&gt;<br />
		&lt;?php echo $scripts_for_layout; ?&gt;<br />
		&lt;?php echo $html-&gt;css(array('main','gritter')) ?&gt;<br />
	&lt;/head&gt;<br />
&lt;body&gt;<br />
	&lt;div id=&quot;container&quot;&gt;<br />
		&lt;div id=&quot;header&quot;&gt;<br />
			&lt;h1&gt;&lt;?php echo $html-&gt;link(__('Ejemplos CakePHP, Racó Tècnic', true), 'http://www.racotecnic.com'); ?&gt;&lt;/h1&gt;<br />
		&lt;/div&gt;<br />
		&lt;div id=&quot;content&quot;&gt;<br />
			&lt;?php $session-&gt;flash(); // Cake 1.2 ?&gt;<br />
			&lt;?php echo $this-&gt;Session-&gt;flash(); // Cake 1.3 ?&gt;<br />
			&lt;?php echo $content_for_layout; ?&gt;<br />
		&lt;/div&gt;<br />
		&lt;div id=&quot;footer&quot;&gt;<br />
			&lt;?php echo $html-&gt;link(<br />
					$html-&gt;image('cake.power.gif', array('alt'=&gt; __(&quot;CakePHP: the rapid development php framework&quot;, true), 'border'=&gt;&quot;0&quot;)),<br />
					'http://www.cakephp.org/',<br />
					array('target'=&gt;'_blank'), null, false<br />
				);<br />
			?&gt;<br />
		&lt;/div&gt;<br />
	&lt;/div&gt;<br />
	&lt;?php echo $cakeDebug; ?&gt;<br />
	&lt;script src=&quot;http://static.woopra.com/js/woopra.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;<br />
&lt;/body&gt;<br />
&lt;/html&gt;[/php]</p>
<p>Las líneas marcadas en azul son las que os interesan. El resto podéis ignorarlas perfectamente.</p>
<p>En la <strong>línea 9</strong> he añadido las librerías jQuery y Gritter. Recordad que para poder utilizar el <em>Helper</em>de JavasCript desde cualquier parte deberéis haber añadido dicho Helper en vuestro <em>AppController</em>:</p>
<p>[php]&lt;?php // /app/app_controller.php<br />
class AppController extends Controller {<br />
	var $helpers = array('Html','Javascript'); // Cake 1.2<br />
	var $helpers = array('Html'); // Cake 1.3<br />
}<br />
[/php]</p>
<p>En la <strong>línea 10</strong> creamos la variable de JavaScript "<em>webroot</em>" que nos servirá más adelante para las plantillas de gritter. Si habéis leído alguno de mis tutoriales sobre <a title="Subida de ficheros con uploadify y validación Ajax en CakePHP" href="http://www.racotecnic.com/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp/"><strong>cómo subir múltiples imágenes con uploadify en CakePHP</strong></a> quizás ya hayáis añadido esta variable a vuestro <em>layout</em>.</p>
<p>En la <strong>línea 12</strong> añadimos el fichero CSS de Gritter.</p>
<p>Y en la <strong>línea 20</strong>, si no la teníais ya en vuestro <em>layout</em>, debéis añadir el método <em>$session->flash()</em> que será el que mostrará las notificaciones de Gritter.</p>
<p>Ya solo nos queda una cosa por hacer: crear la plantilla para cada tipo de notificación.</p>
<p>Como no quiero alargar mucho el tutorial haré sólo un par de <em>layouts</em>, uno para los errores y otro para las notificaciones normales.</p>
<p><strong>Notificaciones informativas:</strong></p>
<p>[php]// /app/views/layouts/flash_info.ctp (Cake 1.2)<br />
// /app/views/elements/flash_info.ctp (Cake 1.3)<br />
&lt;?php echo $javascript-&gt;codeBlock('<br />
// $this-&gt;Html-&gt;scriptBlock en Cake 1.3<br />
$(function(){<br />
	$.gritter.add({<br />
		title: &quot;' . __(&quot;Información&quot;,true) . '&quot;,<br />
		text: &quot;' . $content_for_layout . '&quot;, // Cake 1.2. La variable es $message en la 1.3<br />
		image: webroot + &quot;img/info_48.png&quot;,<br />
		sticky: true<br />
	});<br />
});') ?&gt;[/php]</p>
<p><strong>Notificaciones de error:</strong></p>
<p>[php]// /app/views/layouts/flash_error.ctp (Cake 1.2)<br />
// /app/views/elements/flash_info.ctp (Cake 1.3)<br />
&lt;?php echo $javascript-&gt;codeBlock('<br />
// $this-&gt;Html-&gt;scriptBlock en Cake 1.3<br />
$(function(){<br />
	$.gritter.add({<br />
		title: &quot;' . __(&quot;Error&quot;,true) . '&quot;,<br />
		text: &quot;' . $content_for_layout . '&quot;, // Cake 1.2. La variable es $message en la 1.3<br />
		image: webroot + &quot;img/error_48.png&quot;,<br />
		sticky: true<br />
	});<br />
});') ?&gt;[/php]</p>
<p>Como podéis ver he utilizado la variable webroot para poder acceder fácilmente a nuestro directorio de imágenes. De todos modos, y dado que estamos insertando el JavaScript mediante PHP, podríamos haber hecho $this->webroot. También he activado la variable <em>sticky</em> de gritter para dejar la notificación mostrada en pantalla hasta que el usuario la cierre manualmente, ya que considero que los flashMessage deben comportarse así. Cuando trabajo con Ajax no utilizo la variable <em>sticky</em>.</p>
<p>En estos ejemplos he utilizado lo básico al configurar Growl. Id a su página si queréis informaros sobre los demás métodos y variables disponibles para configurarlo.</p>
<p>Pues con esto habríamos terminado. Ahora cada vez que queráis mostrar notificaciones simplemente tendréis que especificar la plantilla a utilizar como segundo parámetro del método <em>$this->Session->setFlash()</em>:</p>
<p>[php gutter="false"]// Notificación de error<br />
$this-&gt;Session-&gt;setFlash(&quot;Esto es un mensaje de error&quot;, &quot;flash_error&quot;);</p>
<p>// Notificación informativa<br />
$this-&gt;Session-&gt;setFlash(&quot;Esto es un mensaje informativo&quot;, &quot;flash_info&quot;);[/php]</p>
<p>Pues ya está, ya lo tenemos ^^</p>
<p>Si queréis podéis descargar los ficheros más importantes en <a href="http://www.racotecnic.com/tutorials/2009/11/growl_cake.zip">el zip</a> que he preparado del tutorial. También <a href="http://www.racotecnic.com/tutorials/cake/pages/growl">podéis ver el ejemplo</a> que he hecho a medida que hacía esta pequeña guía.</p>
<blockquote><p><strong>Ejemplo</strong>:</p>
<ul>
<li><a href="http://www.racotecnic.com/tutorials/cake/pages/growl">Ver ejemplo</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/11/growl_cake.zip">Descargar ficheros del ejemplo</a></li>
</ul>
<p>Páginas de referencia:</p>
<ul>
<li><a href="http://api.cakephp.org" target="_blank">API de CakePHP</a></li>
<li><a rel="nofollow" href="http://boedesign.com/blog/2009/07/11/growl-for-jquery-gritter/" target="_blank">Documentación de Gritter</a></li>
</ul>
</blockquote>
