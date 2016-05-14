---
layout: post
status: publish
published: true
title: Registro de usuarios externo a Wordpress
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<blockquote><i><b>Nota:</b> Esta entrada se refiere a la versión de Wordpress
  2.6.x. Es posible que estos métodos esten obsoletos -y por ello no funcione- en
  versiones más recientes de WP.</i></blockquote>\r\n\r\nEstos días me estoy dedicando
  (entre otras cosas...) a unificar el registro de usuarios de la página <a title=\"Visitar
  underave.net\" href=\"http://www.underave.net\" target=\"_blank\">www.underave.net</a>
  debido a que utilizamos distintas plataformas PHP (<a title=\"Visitar phpBB.com\"
  href=\"http://www.phpbb.com\" target=\"_blank\">phpBB</a>, <a title=\"Visitar wordpress.org\"
  href=\"http://www.wordpress.org\" target=\"_blank\">Wordpress</a> y <a title=\"Visitar
  mediawiki.org\" href=\"http://www.mediawiki.org\" target=\"_blank\">MediaWiki</a>).\r\n\r\nEn
  este post explicaré cómo registrar usuarios desde un formulario externo a WordPress.\r\n\r\nPero
  explicaré lo justo y necesario (es decir, únicamente el código requerido para registrar
  los usuarios tras mandar los datos vía POST desde un formulario), como siempre,
  todo lo demás lo podéis encontrar fácilmente <a title=\"Búsqueda en google 'datos
  GET POST HTML PHP'\" href=\"http://www.google.com/search?hl=ca&amp;q=enviar+datos+get+post+php+html&amp;btnG=Cerca&amp;lr=\"
  target=\"_blank\">utilizando google</a>.\r\n\r\n"
wordpress_id: 92
wordpress_url: http://racoinformatic.underave.net/?p=92
date: '2009-01-11 04:51:22 +0100'
date_gmt: '2009-01-11 03:51:22 +0100'
categories:
- Programació
- Web
tags:
- Wordpress
- PHP
- MySQL
- Administració usuaris
---
<blockquote><i><b>Nota:</b> Esta entrada se refiere a la versión de Wordpress 2.6.x. Es posible que estos métodos esten obsoletos -y por ello no funcione- en versiones más recientes de WP.</i></blockquote>

Estos días me estoy dedicando (entre otras cosas...) a unificar el registro de usuarios de la página <a title="Visitar underave.net" href="http://www.underave.net" target="_blank">www.underave.net</a> debido a que utilizamos distintas plataformas PHP (<a title="Visitar phpBB.com" href="http://www.phpbb.com" target="_blank">phpBB</a>, <a title="Visitar wordpress.org" href="http://www.wordpress.org" target="_blank">Wordpress</a> y <a title="Visitar mediawiki.org" href="http://www.mediawiki.org" target="_blank">MediaWiki</a>).

En este post explicaré cómo registrar usuarios desde un formulario externo a WordPress.

Pero explicaré lo justo y necesario (es decir, únicamente el código requerido para registrar los usuarios tras mandar los datos vía POST desde un formulario), como siempre, todo lo demás lo podéis encontrar fácilmente <a title="Búsqueda en google 'datos GET POST HTML PHP'" href="http://www.google.com/search?hl=ca&amp;q=enviar+datos+get+post+php+html&amp;btnG=Cerca&amp;lr=" target="_blank">utilizando google</a>.

<a id="more"></a><a id="more-92"></a><br />
Empecemos...

Como he dicho doy por hecho que sabéis hacer un formulario de envío de datos POST. Por si acaso aquí tenéis una útil ayuda:
<blockquote>
<a title="Visitar la web de referencia" href="http://aprendeenlinea.udea.edu.co/lms/moodle/mod/resource/view.php?id=47214" target="_blank">Enviando y recibiendo datos con GET y POST utilizando HTML y PHP</a></blockquote>

Primero de todo debemos cargar los ficheros necesarios para utilizar las funciones de wordpress:

[php]require_once('../blog/wp-config.php');<br />
require_once('../blog/wp-includes/registration.php');[/php]

Donde "<strong>../blog/</strong>" corresponde a la ruta relativa de vuestro WordPress.

Una vez añadidos los ficheros necesarios (<em>wp-config.php</em> carga las variables de WordPress y algunos ficheros necesarios y el fichero <em>registration.php</em> nos permite utilizar las funciones de registro de usuarios) tan solo tenemos que llamar a la función para registrar usuarios. Tenemos dos opciones: la sencilla (<em>wp_create_user</em>) con sólo dos parámetros y la compleja (<em>wp_insert_user</em>) dónde le podemos pasar todos los detalles del usuario en un array asociativo.

<a title="Ver detalles en el Codex de Wordpress" href="http://codex.wordpress.org/Function_Reference/wp_create_user" target="_blank">Simple</a>:

[php]wp_create_user($_POST['usuario'],$_POST['contrasenya'],$_POST['email']);[/php]

<a title="Ver detalles en el Codex de Wordpress" href="http://codex.wordpress.org/Function_Reference/wp_insert_user" target="_blank">Compleja</a> (podéis ver todas las variables posibles en el <a title="Ver detalles en el Codex de Wordpress" href="http://codex.wordpress.org/Function_Reference/wp_insert_user" target="_blank">Codex de WordPress</a>):

[php]// Rellenamos un array con los datos que queramos añadir<br />
$datos = array('user_login'=>$_POST['nick'], // Nombre de usuario para login<br />
'user_pass'=>$_POST['pass'], // Contraseña<br />
'user_url'=>$_POST['url'], // Website del usuario<br />
'user_email'=>$_POST['email'], // E-mail<br />
'display_name'=>$_POST['nick'], // Nombre a mostrar del usuario en comentarios y mensajes<br />
'first_name '=>$_POST['nombre'], // Nombre del usuario<br />
'last_name'=>$_POST['apellidos'], // Apellidos<br />
'role'=>'contributor');<br />
// Insertamos los datos<br />
wp_insert_user($datos);[/php]

Fijaros en la propiedad "role". Es para designar los permisos del usuario (que podéis consultar en <a title="Roles &amp; Capabilities @ Wordpress Codex" href="http://codex.wordpress.org/Roles_and_Capabilities" target="_blank">esta página</a>). Si no la ponéis pondrá la que tengáis por defecto configurada en el blog.

Ambas funciones retornan el ID resultante al registrar al usuario, lo que nos puede servir para enviar una activación por e-mail de la cuenta (por ejemplo...).

Pues ya lo tenéis, vuestro sistema de registro de usuarios de WordPress. Seguramente dentro de poco me anime a publicar un post para hacer vuestro propio sistema de login. También publicaré un post para registrar usuarios en phpBB.

A continuación os dejo el código completo para ambas funciones (para hacer copy paste más rápido ;) ):

Simple..

[php]<br />
// Añadimos los ficheros necesarios<br />
require_once('../blog/wp-config.php');<br />
require_once('../blog/wp-includes/registration.php');<br />
// Insertamos los datos<br />
wp_create_user($_POST['usuario'],$_POST['contrasenya'],$_POST['email']);<br />
// $id_usuario = wp_create_user($_POST['usuario'],$_POST['contrasenya'],$_POST['email']);[/php]

Compleja..

[php]// Añadimos los ficheros necesarios<br />
require_once('../blog/wp-config.php');<br />
require_once('../blog/wp-includes/registration.php');<br />
// Rellenamos un array con los datos que queramos añadir<br />
$datos = array('user_login'=>$_POST['nick'], // Nombre de usuario para login<br />
'user_pass'=>$_POST['pass'], // Contraseña<br />
'user_url'=>$_POST['url'], // Website del usuario<br />
'user_email'=>$_POST['email'], // E-mail<br />
'display_name'=>$_POST['nick'], // Nombre a mostrar del usuario en comentarios y mensajes<br />
'first_name '=>$_POST['nombre'], // Nombre del usuario<br />
'last_name'=>$_POST['apellidos'], // Apellidos<br />
'role'=>'contributor');<br />
// Insertamos los datos<br />
wp_insert_user($datos);<br />
// $id_usuario = wp_insert_user($datos)[/php]

Páginas de referencia:
<blockquote>

<ul>
<li><a title="Wordpress Codex" href="http://codex.wordpress.org" target="_blank">Wordpress Codex</a></li>
<li><a title="Wordpress Codex" href="http://codex.wordpress.org/Function_Reference/wp_insert_user" target="_blank">Detalles de la función wp_insert_user</a></li>
<li><a title="Wordpress Codex" href="http://codex.wordpress.org/Function_Reference/wp_create_user" target="_blank">Detalles de la función wp_create_user</a></li>
<li><a title="Wordpress Codex" href="http://codex.wordpress.org/Roles_and_Capabilities" target="_blank">Roles &amp; Capabilities</a></li>
</ul>
</blockquote>
