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
wordpress_url: http://racotecnic.com/?p=1195
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

Si queréis hacer una aplicación de **CakePHP sin utilizar conexión a base de datos** podéis hacerlo mediante la creación de un nuevo <em>datasource</em>.

En el directorio <em>/app/models/datasources/dbo/</em>* cread un fichero llamado <em>dbo_sin_conexion.php</em> con el siguiente contenido:

_* Nota: es posible que el directorio dbo tampoco exista y tengáis que crearlo._

~~~php
<?php // /app/models/datasources/dbo/dbo_sin_conexion.php
class DboSinConexion extends DboSource
{
  function connect()
  {
    $this->connected = true;
    return $this->connected;
  }
  function disconnect()
  {
    $this->connected = false;
    return !$this->connected;
  }
  function isConnected()
  {
    return true;
  }
}
~~~

Ahora modificad vuestro fichero database.php (en <em>/app/config/</em>) para indicarle que utilizaremos este fichero para "conectarnos a la base de datos":

~~~php
<?php // /app/config/database.php
class DATABASE_CONFIG
{
  var $default = array('driver' => 'sin_conexion');
}
~~~

Y listo, ya tenemos CakePHP funcionando sin conexión a la base de datos :)
