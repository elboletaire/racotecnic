---
layout: post
status: publish
published: true
title: Errores 404 con Ajax (y jQuery) en CakePHP
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "En este tutorial aprenderéis a <strong>gestionar los errores de CakePHP
  con y sin Ajax.</strong>\r\n\r\nLo primero de todo que tenéis que hacer es poner
  el debug a cero en vuestro fichero core.php, ya que <strong>con debug &gt; 0 no
  funcionaría</strong>.\r\n\r\nAhora pasemos a crear (si no existe) el fichero <strong>/app/app_error.php</strong>
  con el siguiente contenido.\r\n\r\n[php]&lt;?php // /app/app_error.php\r\nclass
  AppError extends ErrorHandler\r\n{\r\n\tfunction error404($params)\r\n\t{\r\n\t\t//
  Importamos RequestHandler para verificar si la conexión es mediante Ajax\r\n\t\tApp::import('Component',
  'RequestHandler');\r\n\t\t$this-&gt;RequestHandler = new RequestHandlerComponent();\r\n\t\tif
  ($this-&gt;RequestHandler-&gt;isAjax())\r\n\t\t{\r\n\t\t\t// En caso de ser Ajax
  creamos la cabecera 404\r\n\t\t\t$this-&gt;controller-&gt;header(&quot;HTTP/1.0
  404 Not Found&quot;);\r\n\t\t\t// y pasamos algunas variables a la vista que ahora
  crearemos\r\n\t\t\t$this-&gt;controller-&gt;set('params', $params);\r\n\t\t\t$this-&gt;controller-&gt;layout
  = 'ajax';\r\n\t\t\t// Renderizamos la vista\r\n\t\t\t$this-&gt;_outputMessage('ajax_error404');\r\n\t\t}\r\n\t\t//
  Aquí iría la gestión del error sin Ajax, en nuestro caso llamamos al método padre.\r\n\t\telse
  parent::error404($params);\r\n\t}\r\n}[/php]\r\n\r\nPasemos a la creación de la
  vista... <strong>/app/views/errors/ajax_error404.ctp</strong>"
wordpress_id: 1583
wordpress_url: http://racotecnic.underave.net/?p=1583
date: '2010-07-10 23:44:09 +0200'
date_gmt: '2010-07-10 22:44:09 +0200'
categories:
- Programació
- Web
tags:
- PHP
- jQuery
- CakePHP
- Ajax
- CakePHP 1.3
- CakePHP 1.2
---
<p>En este tutorial aprenderéis a <strong>gestionar los errores de CakePHP con y sin Ajax.</strong></p>
<p>Lo primero de todo que tenéis que hacer es poner el debug a cero en vuestro fichero core.php, ya que <strong>con debug &gt; 0 no funcionaría</strong>.</p>
<p>Ahora pasemos a crear (si no existe) el fichero <strong>/app/app_error.php</strong> con el siguiente contenido.</p>
<p>[php]&lt;?php // /app/app_error.php<br />
class AppError extends ErrorHandler<br />
{<br />
	function error404($params)<br />
	{<br />
		// Importamos RequestHandler para verificar si la conexión es mediante Ajax<br />
		App::import('Component', 'RequestHandler');<br />
		$this-&gt;RequestHandler = new RequestHandlerComponent();<br />
		if ($this-&gt;RequestHandler-&gt;isAjax())<br />
		{<br />
			// En caso de ser Ajax creamos la cabecera 404<br />
			$this-&gt;controller-&gt;header(&quot;HTTP/1.0 404 Not Found&quot;);<br />
			// y pasamos algunas variables a la vista que ahora crearemos<br />
			$this-&gt;controller-&gt;set('params', $params);<br />
			$this-&gt;controller-&gt;layout = 'ajax';<br />
			// Renderizamos la vista<br />
			$this-&gt;_outputMessage('ajax_error404');<br />
		}<br />
		// Aquí iría la gestión del error sin Ajax, en nuestro caso llamamos al método padre.<br />
		else parent::error404($params);<br />
	}<br />
}[/php]</p>
<p>Pasemos a la creación de la vista... <strong>/app/views/errors/ajax_error404.ctp</strong><a id="more"></a><a id="more-1583"></a></p>
<p>[php]&lt;?php // /app/views/errors/ajax_error404.ctp<br />
$error404 = array('message' =&gt; __(&quot;The requested address was not found on this server.&quot;,true), 'params' =&gt; $params);<br />
echo $this-&gt;Javascript-&gt;object($error404);[/php]</p>
<p>Tan simple como eso : )</p>
<p>Finalmente, añadamos esto a nuestro template por defecto, o a nuestra hoja javascript común:</p>
<p>[js]jQuery(document).ready(function($) {<br />
	// Ajax not found<br />
	$(this).ajaxError(function(event, request, opts){<br />
		if ( request.status == 404 )<br />
		{<br />
			alert(eval(&quot;(&quot; + request.responseText + &quot;)&quot;).message);<br />
		}<br />
	});<br />
});[/js]</p>
<p>Con esto mostraremos una alerta mostrando el texto que hayamos definido en nuestro app_error al usuario que intente adquirir una url no existente en nuestra aplicación CakePHP.</p>
<p>Evidentemente podéis gestionar más errores a parte del típico error 404, simplemente añadiendo algún <em>if</em> más al código javascript y el método correspondiente en el app_error para gestionarlo.</p>
<p>El parámetro <em>$params</em> lo he pasado por si queréis utilizar alguna de sus variables. Por ejemplo, podríamos mostrar al usuario un mensaje tipo "La página /requetefuck no existe".</p>
<blockquote><p><strong>Nota:</strong> Si estáis utilizando Cake 1.2 tened en cuenta que tenéis que reemplazar en la vista ajax_error404 el $this-&gt;Javascript por $javascript, ya que ha variado de una versión a otra.</p></blockquote>
