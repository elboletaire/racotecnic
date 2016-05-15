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
excerpt: "En este tutorial aprenderéis a **gestionar los errores de CakePHP
  con y sin Ajax.**\r\n\r\nLo primero de todo que tenéis que hacer es poner
  el debug a cero en vuestro fichero core.php, ya que **con debug > 0 no
  funcionaría**.\r\n\r\nAhora pasemos a crear (si no existe) el fichero **/app/app_error.php**
  con el siguiente contenido.\r\n\r\n~~~php
<?php // /app/app_error.php\r\nclass
  AppError extends ErrorHandler\r\n{\r\n\tfunction error404($params)\r\n\t{\r\n\t\t//
  Importamos RequestHandler para verificar si la conexión es mediante Ajax\r\n\t\tApp::import('Component',
  'RequestHandler');\r\n\t\t$this->RequestHandler = new RequestHandlerComponent();\r\n\t\tif
  ($this->RequestHandler->isAjax())\r\n\t\t{\r\n\t\t\t// En caso de ser Ajax
  creamos la cabecera 404\r\n\t\t\t$this->controller->header('HTTP/1.0
  404 Not Found');\r\n\t\t\t// y pasamos algunas variables a la vista que ahora
  crearemos\r\n\t\t\t$this->controller->set('params', $params);\r\n\t\t\t$this->controller->layout
  = 'ajax';\r\n\t\t\t// Renderizamos la vista\r\n\t\t\t$this->_outputMessage('ajax_error404');\r\n\t\t}\r\n\t\t//
  Aquí iría la gestión del error sin Ajax, en nuestro caso llamamos al método padre.\r\n\t\telse
  parent::error404($params);\r\n\t}\r\n}
~~~\r\n\r\nPasemos a la creación de la
  vista... **/app/views/errors/ajax_error404.ctp**"
wordpress_id: 1583
wordpress_url: http://racotecnic.com/?p=1583
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

En este tutorial aprenderéis a **gestionar los errores de CakePHP con y sin Ajax.**

Lo primero de todo que tenéis que hacer es poner el debug a cero en vuestro fichero core.php, ya que **con debug > 0 no funcionaría**.

Ahora pasemos a crear (si no existe) el fichero **/app/app_error.php** con el siguiente contenido.

~~~php
<?php // /app/app_error.php
class AppError extends ErrorHandler
{
	function error404($params)
	{
		// Importamos RequestHandler para verificar si la conexión es mediante Ajax
		App::import('Component', 'RequestHandler');
		$this->RequestHandler = new RequestHandlerComponent();
		if ($this->RequestHandler->isAjax())
		{
			// En caso de ser Ajax creamos la cabecera 404
			$this->controller->header('HTTP/1.0 404 Not Found');
			// y pasamos algunas variables a la vista que ahora crearemos
			$this->controller->set('params', $params);
			$this->controller->layout = 'ajax';
			// Renderizamos la vista
			$this->_outputMessage('ajax_error404');
		}
		// Aquí iría la gestión del error sin Ajax, en nuestro caso llamamos al método padre.
		else parent::error404($params);
	}
}
~~~

Pasemos a la creación de la vista... **/app/views/errors/ajax_error404.ctp**<a id="more"></a><a id="more-1583"></a>

~~~php
<?php // /app/views/errors/ajax_error404.ctp
$error404 = array('message' => __('The requested address was not found on this server.',true), 'params' => $params);
echo $this->Javascript->object($error404);
~~~

Tan simple como eso : )

Finalmente, añadamos esto a nuestro template por defecto, o a nuestra hoja javascript común:

~~~javascript
jQuery(document).ready(function($) {
	// Ajax not found
	$(this).ajaxError(function(event, request, opts){
		if ( request.status == 404 )
		{
			alert(eval('(' + request.responseText + ')').message);
		}
	});
});
~~~

Con esto mostraremos una alerta mostrando el texto que hayamos definido en nuestro app_error al usuario que intente adquirir una url no existente en nuestra aplicación CakePHP.

Evidentemente podéis gestionar más errores a parte del típico error 404, simplemente añadiendo algún <em>if</em> más al código javascript y el método correspondiente en el app_error para gestionarlo.

El parámetro <em>$params</em> lo he pasado por si queréis utilizar alguna de sus variables. Por ejemplo, podríamos mostrar al usuario un mensaje tipo "La página /requetefuck no existe".
<blockquote>
**Nota:** Si estáis utilizando Cake 1.2 tened en cuenta que tenéis que reemplazar en la vista ajax_error404 el $this->Javascript por $javascript, ya que ha variado de una versión a otra.</blockquote>
