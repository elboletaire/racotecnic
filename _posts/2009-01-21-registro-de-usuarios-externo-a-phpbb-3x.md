---
layout: post
status: publish
published: true
title: Registro de usuarios externo a phpBB 3.x
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<blockquote><strong>Nota:</strong> Si lo que buscas es integrar phpBB 3.x
  con CakePHP, <a href=\"http://www.racotecnic.com/2010/01/integrando-cakephp-y-phpbb-3-x/\">ésta
  es tu entrada</a>.</blockquote>\r\n\r\nEl otro día expliqué <a title=\"Leer artículo\"
  href=\"http://racoinformatic.underave.net/2009/01/registro-de-usuarios-externo-a-wordpress/\"
  target=\"_self\">cómo registrar usuarios en nuestro Wordpress desde un formulario
  de login externo</a>. Como ya expliqué he estado haciendo un formulario de registro
  global para varios scripts para <a title=\"Visitar underave.net\" href=\"http://www.underave.net\"
  target=\"_self\">mi página web</a> (<a title=\"Visitar wordpress.org\" href=\"http://www.wordpress.org\"
  target=\"_blank\">Wordpress</a>, <a title=\"Visitar phpBB.com\" href=\"http://www.phpbb.com\"
  target=\"_blank\">phpBB</a>, <a title=\"Visitar mediawiki.org\" href=\"http://www.mediawiki.org\"
  target=\"_blank\">MediaWiki</a>) y quiero poder aliviaros esfuerzo si llegado el
  caso tenéis que hacerlo ;)\r\n\r\nAl igual que con el anterior tutorial voy a dar
  por hecho que sabéis hacer un formulario y <a title=\"Enviar y recibir datos vía
  GET y POST en HTML y PHP\" href=\"http://aprendeenlinea.udea.edu.co/lms/moodle/mod/resource/view.php?id=47214\"
  target=\"_blank\">enviar y recibir datos vía GET y POST</a>. Así pues, ¡vayamos
  al grano!\r\n\r\n"
wordpress_id: 151
wordpress_url: http://racoinformatic.underave.net/?p=151
date: '2009-01-21 01:07:09 +0100'
date_gmt: '2009-01-21 00:07:09 +0100'
categories:
- Programació
- Web
tags:
- PHP
- MySQL
- phpBB
- Administració usuaris
---
<blockquote><strong>Nota:</strong> Si lo que buscas es integrar phpBB 3.x con CakePHP, <a href="http://www.racotecnic.com/2010/01/integrando-cakephp-y-phpbb-3-x/">ésta es tu entrada</a>.</blockquote>

El otro día expliqué <a title="Leer artículo" href="http://racoinformatic.underave.net/2009/01/registro-de-usuarios-externo-a-wordpress/" target="_self">cómo registrar usuarios en nuestro Wordpress desde un formulario de login externo</a>. Como ya expliqué he estado haciendo un formulario de registro global para varios scripts para <a title="Visitar underave.net" href="http://www.underave.net" target="_self">mi página web</a> (<a title="Visitar wordpress.org" href="http://www.wordpress.org" target="_blank">Wordpress</a>, <a title="Visitar phpBB.com" href="http://www.phpbb.com" target="_blank">phpBB</a>, <a title="Visitar mediawiki.org" href="http://www.mediawiki.org" target="_blank">MediaWiki</a>) y quiero poder aliviaros esfuerzo si llegado el caso tenéis que hacerlo ;)

Al igual que con el anterior tutorial voy a dar por hecho que sabéis hacer un formulario y <a title="Enviar y recibir datos vía GET y POST en HTML y PHP" href="http://aprendeenlinea.udea.edu.co/lms/moodle/mod/resource/view.php?id=47214" target="_blank">enviar y recibir datos vía GET y POST</a>. Así pues, ¡vayamos al grano!

<a id="more"></a><a id="more-151"></a>
Primero de todo cargamos ficheros necesarios e inicializamos la constante "IN_PHPBB":

[php]// Iniciamos la constante IN_PHPBB
define('IN_PHPBB', true);
// Indicamos la carpeta donde se encuentra nuestro phpBB3
$phpbb_root_path = '../forums/';
// Extension de los ficheros a cargar
$phpEx = substr(strrchr(__FILE__, '.'), 1);
// Cargamos fichero common.php
require_once($phpbb_root_path . 'common.' . $phpEx);
// Cargamos fichero functions_user.php (éste es el que contiene
// las funciones para añadir usuarios)
require_once($phpbb_root_path . 'includes/functions_user.' . $phpEx);
// Definimos la diferencia horaria con el servidor (explicado más adelante)
define ('UTC',1);[/php]

Ya tenemos lo más importante. Ahora pasaremos a hacer un par de comprobaciones: validar la existencia del usuario y verificar el e-mail. Ambas verificaciones serán llevadas a cabo con funciones de phpBB (cargadas en las líneas anteriores).

[php]
// Variables recogidas del formulario
$nick = $_POST['nombre_de_usuario'];
$email = $_POST['email'];
$pass = $_POST['contrasenya'];
$error = false;
// Comprobamos si el nombre de usuario existe
if (validate_username($nick)){
	echo 'El nombre de usuario especificado ya existe';
	$error = true;
}
// Comprovamos el e-mail
if (validate_email($email)){
	switch(validate_email($email)){
		case DOMAIN_NO_MX_RECORD:
			echo 'El dominio de la cuenta e-mail especificada no existe';
			break;
		case EMAIL_TAKEN:
			echo 'Existe un usuario registrado con el mismo e-mail';
			break;
		case EMAIL_INVALID:
			echo 'El e-mail especificado no es válido';
			break;
	}
	$error = true;
}
// En caso de error ejecutamos el código que queramos
if ($error){
	// En mi caso vuelvo a mostrar el formulario de registro
	$form->display();
	// y finalizo la ejecución
	exit;
}
[/php]

La función <a title="Ver detalles de la función" href="http://area51.phpbb.com/docs/code/phpBB3/_includes---functions_user.php.html#functionvalidate_username" target="_blank">validate_username</a> retorna una cadena si el nombre de usuario ya existe o false en caso de que no exista. Lo que no he logrado averiguar es si hay distintas frases o solo una "USERNAME_TAKEN" (si alguien sabe de alguna otra le agradeceré que me lo indique), por eso mismo lo trato como true o false.

Por otro lado, la función <a title="Ver detalles de la función" href="http://area51.phpbb.com/docs/code/phpBB3/_includes---functions_user.php.html#functionvalidate_email" target="_blank">validate_email</a> retorna tres cadenas distintas, según si el dominio o el e-mail son válidos o si el e-mail está cogido.

Pasemos al propio registro del usuario. Antes de hacerlo debéis saber que os mostraré cómo hacer para registrar a un usuario inactivo. Si queréis registrar al usuario activado directamente, simplemente omitid las líneas que os indique.

[php]// Encriptamos la contraseña
$hash = phpbb_hash($pass);
// Generamos un código de activación para la cuenta
$actkey = substr(md5(time()), 0, 13);
// Añadimos los datos de usuario en una tabla
$dades_forum = array('username'=>$nick, // Nombre de usuario
				 'user_password'=>$hash, // Contraseña encriptada
				 'group_id'=>5, // Grupo al que pertenece
				 'user_email'=>$email,
				 'user_type'=>1, //** Tipo de usuario
				 'user_actkey'=>$actkey, //** Clave de activación de cuenta
				 'user_lang'=>'ca', // Idioma (catalán en este caso)
				 'user_timezone'=>$utc, // Diferencia horaria del cliente
				 'user_inactive_reason'=>1, // Motivo por el cual su cuenta está inactiva
				 'user_inactive_time'=>time()-UTC*3600, //** Hora en que se 'inactiva' su cuenta
				 'user_regdate'=>time()-UTC*3600); // Hora de registro (menos la diferencia horaria con el servidor)
// Añadimos el usuario
if (!$user_id = user_add($dades_forum))
  die('Error inesperado al registrarte');
echo 'Usuario registrado correctamente! Tu ID de usuario es ' . $user_id . ' y tu clave de activación ' . $actkey;[/php]

<small>Las líneas comentadas con dos asteriscos (//**) son aquellas que se descartan o varían cuando queremos registrar un usuario con la cuenta ya activa (explicado más adelante).</small>

Ahora, por pasos:

<ul>
<li>Encriptamos la contraseña utilizando la función <a title="Ver detalles de la función" href="http://area51.phpbb.com/docs/code/phpBB3/_includes---functions.php.html#functionphpbb_hash" target="_blank">phpbb_hash</a>. Este paso puede ser modificado por una simple encriptación por MD5 ya que phpbb reconoce ambos métodos de encriptación a la hora de logear usuarios.</li>
<li>Generamos un código de 13 caracteres a partir de la hora actual encriptada en md5 (esto es para conseguir una clave lo más aleatoria posible) y añadimos los datos en una tabla asociativa.</li>
<li>Añadimos todos los datos en una tabla asociativa.</li>
<li>En caso de querer registrar el usuario con su cuenta ya activa, descartaríamos las claves (y sus respectivos valores) "user_actkey" y "user_inactive_time" y la clave "user_type" la pondríamos a 0 en lugar de 1 (1 es usuarios inactivos, 2 BOTs y 0 usuarios activos).</li>
<li>UTC indica la diferencia horaria con el servidor. Es una constante que he iniciado en las primeras líneas de código y cuya función no es más que restar la diferencia horaria entre el servidor y UTC+0 (phpBB guarda las horas en UTCzero). En mi caso la diferencia horaria es +1, pues el ordenador en el que hago estos códigos es el mío y así que está en UTC+1. Si el servidor estuviera en U.S.A. quizás debierais poner -7 o -8 (como he dicho dependerá de la situación horaria de vuestro servidor...).</li>
<li>Para terminar, la función <a title="Ver detalles de la función" href="http://area51.phpbb.com/docs/code/phpBB3/_includes---functions_user.php.html#functionuser_add" target="_blank">user_add</a> devuelve la nueva ID del usuario creado. Con ella y con la clave de activación guardada anteriormente podemos crear un enlace de activación:</li>
</ul>

[php]<?php
echo '<a href='../forums/ucp.php?mode=activate&amp;u=' . $user_id . '&amp;k=' . $actkey . ''>Haz clic aquí para activar tu cuenta</a>';[/php]

Una vez terminado el registro podemos enviar este enlace al usuario vía e-mail para que active su cuenta.
<blockquote>
Página de referencia:

<ul>
<li><a title="Ver página de referencia" href="http://area51.phpbb.com/docs/code/" target="_blank">phpBB3 Code Reference</a></li>
</ul>
</blockquote>
