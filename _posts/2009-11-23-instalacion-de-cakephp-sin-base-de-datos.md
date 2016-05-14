---
layout: post
status: publish
published: true
title: Instalación de CakePHP sin base de datos
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 1195
wordpress_url: http://racotecnic.underave.net/?p=1195
date: '2009-11-23 01:06:25 +0100'
date_gmt: '2009-11-23 00:06:25 +0100'
categories:
- Programació
- Web
tags:
- PHP
- CakePHP
- Bases de dades
- CakePHP 1.3
- CakePHP 1.2
---

Si queréis hacer una aplicación de <strong>CakePHP sin utilizar conexión a base de datos</strong> podéis hacerlo mediante la creación de un nuevo <em>datasource</em>.

En el directorio <em>/app/models/datasources/dbo/</em>* cread un fichero llamado <em>dbo_sin_conexion.php</em> con el siguiente contenido:

<em>* Nota: es posible que el directorio dbo tampoco exista y tengáis que crearlo.</em>

[php]<?php // /app/models/datasources/dbo/dbo_sin_conexion.php<br />
class DboSinConexion extends DboSource<br />
{<br />
	function connect()<br />
	{<br />
		$this->connected = true;<br />
		return $this->connected;<br />
	}<br />
	function disconnect()<br />
	{<br />
		$this->connected = false;<br />
		return !$this->connected;<br />
	}<br />
	function isConnected()<br />
	{<br />
		return true;<br />
	}<br />
}[/php]

Ahora modificad vuestro fichero database.php (en <em>/app/config/</em>) para indicarle que utilizaremos este fichero para "conectarnos a la base de datos":

[php]<?php // /app/config/database.php<br />
class DATABASE_CONFIG {

	var $default = array('driver' => 'sin_conexion');<br />
}[/php]

Y listo, ya tenemos CakePHP funcionando sin conexión a la base de datos :)
