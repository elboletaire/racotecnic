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
<blockquote><strong>Nota:</strong> Si lo que buscas es integrar phpBB 3.x con CakePHP, <a href="http://www.racotecnic.com/2010/01/integrando-cakephp-y-phpbb-3-x/">ésta es tu entrada</a>.</p></blockquote>
<p>El otro día expliqué <a title="Leer artículo" href="http://racoinformatic.underave.net/2009/01/registro-de-usuarios-externo-a-wordpress/" target="_self">cómo registrar usuarios en nuestro Wordpress desde un formulario de login externo</a>. Como ya expliqué he estado haciendo un formulario de registro global para varios scripts para <a title="Visitar underave.net" href="http://www.underave.net" target="_self">mi página web</a> (<a title="Visitar wordpress.org" href="http://www.wordpress.org" target="_blank">Wordpress</a>, <a title="Visitar phpBB.com" href="http://www.phpbb.com" target="_blank">phpBB</a>, <a title="Visitar mediawiki.org" href="http://www.mediawiki.org" target="_blank">MediaWiki</a>) y quiero poder aliviaros esfuerzo si llegado el caso tenéis que hacerlo ;)</p>
<p>Al igual que con el anterior tutorial voy a dar por hecho que sabéis hacer un formulario y <a title="Enviar y recibir datos vía GET y POST en HTML y PHP" href="http://aprendeenlinea.udea.edu.co/lms/moodle/mod/resource/view.php?id=47214" target="_blank">enviar y recibir datos vía GET y POST</a>. Así pues, ¡vayamos al grano!</p>
<p><a id="more"></a><a id="more-151"></a><br />
Primero de todo cargamos ficheros necesarios e inicializamos la constante "IN_PHPBB":</p>
<p>[php]// Iniciamos la constante IN_PHPBB<br />
define('IN_PHPBB', true);<br />
// Indicamos la carpeta donde se encuentra nuestro phpBB3<br />
$phpbb_root_path = '../forums/';<br />
// Extension de los ficheros a cargar<br />
$phpEx = substr(strrchr(__FILE__, '.'), 1);<br />
// Cargamos fichero common.php<br />
require_once($phpbb_root_path . 'common.' . $phpEx);<br />
// Cargamos fichero functions_user.php (éste es el que contiene<br />
// las funciones para añadir usuarios)<br />
require_once($phpbb_root_path . 'includes/functions_user.' . $phpEx);<br />
// Definimos la diferencia horaria con el servidor (explicado más adelante)<br />
define (&quot;UTC&quot;,1);[/php]</p>
<p>Ya tenemos lo más importante. Ahora pasaremos a hacer un par de comprobaciones: validar la existencia del usuario y verificar el e-mail. Ambas verificaciones serán llevadas a cabo con funciones de phpBB (cargadas en las líneas anteriores).</p>
<p>[php]<br />
// Variables recogidas del formulario<br />
$nick = $_POST['nombre_de_usuario'];<br />
$email = $_POST['email'];<br />
$pass = $_POST['contrasenya'];<br />
$error = false;<br />
// Comprobamos si el nombre de usuario existe<br />
if (validate_username($nick)){<br />
	echo &quot;El nombre de usuario especificado ya existe&quot;;<br />
	$error = true;<br />
}<br />
// Comprovamos el e-mail<br />
if (validate_email($email)){<br />
	switch(validate_email($email)){<br />
		case DOMAIN_NO_MX_RECORD:<br />
			echo &quot;El dominio de la cuenta e-mail especificada no existe&lt;br /&gt;&quot;;<br />
			break;<br />
		case EMAIL_TAKEN:<br />
			echo &quot;Existe un usuario registrado con el mismo e-mail&lt;br /&gt;&quot;;<br />
			break;<br />
		case EMAIL_INVALID:<br />
			echo &quot;El e-mail especificado no es válido&lt;br /&gt;&quot;;<br />
			break;<br />
	}<br />
	$error = true;<br />
}<br />
// En caso de error ejecutamos el código que queramos<br />
if ($error){<br />
	// En mi caso vuelvo a mostrar el formulario de registro<br />
	$form-&gt;display();<br />
	// y finalizo la ejecución<br />
	exit;<br />
}<br />
[/php]</p>
<p>La función <a title="Ver detalles de la función" href="http://area51.phpbb.com/docs/code/phpBB3/_includes---functions_user.php.html#functionvalidate_username" target="_blank">validate_username</a> retorna una cadena si el nombre de usuario ya existe o false en caso de que no exista. Lo que no he logrado averiguar es si hay distintas frases o solo una "USERNAME_TAKEN" (si alguien sabe de alguna otra le agradeceré que me lo indique), por eso mismo lo trato como true o false.</p>
<p>Por otro lado, la función <a title="Ver detalles de la función" href="http://area51.phpbb.com/docs/code/phpBB3/_includes---functions_user.php.html#functionvalidate_email" target="_blank">validate_email</a> retorna tres cadenas distintas, según si el dominio o el e-mail son válidos o si el e-mail está cogido.</p>
<p>Pasemos al propio registro del usuario. Antes de hacerlo debéis saber que os mostraré cómo hacer para registrar a un usuario inactivo. Si queréis registrar al usuario activado directamente, simplemente omitid las líneas que os indique.</p>
<p>[php]// Encriptamos la contraseña<br />
$hash = phpbb_hash($pass);<br />
// Generamos un código de activación para la cuenta<br />
$actkey = substr(md5(time()), 0, 13);<br />
// Añadimos los datos de usuario en una tabla<br />
$dades_forum = array(&quot;username&quot;=&gt;$nick, // Nombre de usuario<br />
				 &quot;user_password&quot;=&gt;$hash, // Contraseña encriptada<br />
				 &quot;group_id&quot;=&gt;5, // Grupo al que pertenece<br />
				 &quot;user_email&quot;=&gt;$email,<br />
				 &quot;user_type&quot;=&gt;1, //** Tipo de usuario<br />
				 &quot;user_actkey&quot;=&gt;$actkey, //** Clave de activación de cuenta<br />
				 &quot;user_lang&quot;=&gt;&quot;ca&quot;, // Idioma (catalán en este caso)<br />
				 &quot;user_timezone&quot;=&gt;$utc, // Diferencia horaria del cliente<br />
				 &quot;user_inactive_reason&quot;=&gt;1, // Motivo por el cual su cuenta está inactiva<br />
				 &quot;user_inactive_time&quot;=&gt;time()-UTC*3600, //** Hora en que se &quot;inactiva&quot; su cuenta<br />
				 &quot;user_regdate&quot;=&gt;time()-UTC*3600); // Hora de registro (menos la diferencia horaria con el servidor)<br />
// Añadimos el usuario<br />
if (!$user_id = user_add($dades_forum))<br />
  die(&quot;Error inesperado al registrarte&quot;);<br />
echo &quot;Usuario registrado correctamente! Tu ID de usuario es &quot; . $user_id . &quot; y tu clave de activación &quot; . $actkey;[/php]</p>
<p><small>Las líneas comentadas con dos asteriscos (//**) son aquellas que se descartan o varían cuando queremos registrar un usuario con la cuenta ya activa (explicado más adelante).</small></p>
<p>Ahora, por pasos:</p>
<ul>
<li>Encriptamos la contraseña utilizando la función <a title="Ver detalles de la función" href="http://area51.phpbb.com/docs/code/phpBB3/_includes---functions.php.html#functionphpbb_hash" target="_blank">phpbb_hash</a>. Este paso puede ser modificado por una simple encriptación por MD5 ya que phpbb reconoce ambos métodos de encriptación a la hora de logear usuarios.</li>
<li>Generamos un código de 13 caracteres a partir de la hora actual encriptada en md5 (esto es para conseguir una clave lo más aleatoria posible) y añadimos los datos en una tabla asociativa.</li>
<li>Añadimos todos los datos en una tabla asociativa.</li>
<li>En caso de querer registrar el usuario con su cuenta ya activa, descartaríamos las claves (y sus respectivos valores) "user_actkey" y "user_inactive_time" y la clave "user_type" la pondríamos a 0 en lugar de 1 (1 es usuarios inactivos, 2 BOTs y 0 usuarios activos).</li>
<li>UTC indica la diferencia horaria con el servidor. Es una constante que he iniciado en las primeras líneas de código y cuya función no es más que restar la diferencia horaria entre el servidor y UTC+0 (phpBB guarda las horas en UTCzero). En mi caso la diferencia horaria es +1, pues el ordenador en el que hago estos códigos es el mío y así que está en UTC+1. Si el servidor estuviera en U.S.A. quizás debierais poner -7 o -8 (como he dicho dependerá de la situación horaria de vuestro servidor...).</li>
<li>Para terminar, la función <a title="Ver detalles de la función" href="http://area51.phpbb.com/docs/code/phpBB3/_includes---functions_user.php.html#functionuser_add" target="_blank">user_add</a> devuelve la nueva ID del usuario creado. Con ella y con la clave de activación guardada anteriormente podemos crear un enlace de activación:</li>
</ul>
<p>[php]&lt;?php<br />
echo &quot;&lt;a href='../forums/ucp.php?mode=activate&amp;u=&quot; . $user_id . &quot;&amp;k=&quot; . $actkey . &quot;'&gt;Haz clic aquí para activar tu cuenta&lt;/a&gt;&quot;;[/php]</p>
<p>Una vez terminado el registro podemos enviar este enlace al usuario vía e-mail para que active su cuenta.</p>
<blockquote><p>Página de referencia:</p>
<ul>
<li><a title="Ver página de referencia" href="http://area51.phpbb.com/docs/code/" target="_blank">phpBB3 Code Reference</a></li>
</ul>
</blockquote>
