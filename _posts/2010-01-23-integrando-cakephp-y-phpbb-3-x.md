---
layout: post
status: publish
published: true
title: Integrando CakePHP y phpBB 3.x
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<script type=\"text/javascript\">\r\n// <![CDATA[\r\n\tjQuery(function(){\r\n\t\tjQuery(\"#registre-phpbb
  legend\").css('cursor', 'pointer').click(function(){\r\n\t\t\tjQuery(this).next().slideToggle();\r\n\t\t\tif(jQuery(this).text()
  == 'Ocultar')\r\n\t\t\t{\r\n\t\t\t\tjQuery(this).text('Mostrar');\r\n\t\t\t}\r\n\t\t\telse\r\n\t\t\t{\r\n\t\t\t\tjQuery(this).text('Ocultar');\r\n\t\t\t}\r\n\t\t});\r\n\t\tjQuery(\".amunt\").click(function(){\r\n\t\t\tMGJS.goTop();\r\n\t\t\treturn
  false;\r\n\t\t});\r\n\t});\r\n// ]]>\r\n</script>\r\n<style type=\"text/css\">\r\n\t.amunt
  {\r\n\t\tfloat: right;\r\n\t\tfont-size: .8em;\r\n\t}\r\n\t#registre-phpbb {\r\n\t\twidth:
  300px;\r\n\t\t-moz-border-radius: 7px;\r\n\t\tborder: 1px solid #cccccc;\r\n\t\tfloat:
  left;\r\n\t\tbackground-color: #f7f7f7;\r\n\t\tmargin: 20px 0;\r\n\t}\r\n\t#imatge-cakephp
  {\r\n\t\tfloat: right;\r\n\t}\r\n</style>\r\n<fieldset id=\"registre-phpbb\"> <legend
  style=\"padding: 0 5px;\">Ocultar</legend>\r\n
<ul>\r\n\t<li><a href=\"#phpbb-zero\">Antes
  de empezar</a></li>\r\n\t<li><a href=\"#phpbb-primer\">Primeros pasos</a></li>\r\n\t<li><a
  href=\"#phpbb-segon\">Creando el componente phpBB3</a></li>\r\n\t<li><a href=\"#phpbb-tercer\">Registro
  de usuarios</a></li>\r\n\t<li><a href=\"#phpbb-quart\">Errores fatales :s</a></li>\r\n\t<li><a
  href=\"#phpbb-cinque\">Login de usuarios</a></li>\r\n\t<li><a href=\"#phpbb-sise\">Cambio
  de datos del usuario</a></li>\r\n\t<li><a href=\"#phpbb-sete\">Modificando vuestra
  plantilla de phpBB</a></li>\r\n</ul>\r\n</fieldset>\r\n<a href=\"http://www.racotecnic.com/wp-content/uploads/2010/01/hot-features.png\"
  id=\"imatge-cakephp\"><img class=\"alignnone size-full wp-image-1348\" title=\"hot-features\"
  src=\"http://www.racotecnic.com/wp-content/uploads/2010/01/hot-features.png\" alt=\"\"
  width=\"260\" height=\"260\" /></a>\r\n<h4 id=\"phpbb-zero\">Antes de empezar...</h4>\r\nMás
  o menos al empezar con este blog expliqué cómo podíais <a title=\"Leer tutorial\"
  href=\"http://www.racotecnic.com/2009/01/registro-de-usuarios-externo-a-phpbb-3x/\"
  target=\"_self\">hacer un registro de usuarios externo a phpBB3 con PHP</a>. Hoy
  voy a contaros cómo hacer para <strong>implementar el registro y login de usuarios
  de phpBB3 en CakePHP</strong>.\r\n\r\nPodéis ver, como ejemplo, la página de <a
  href=\"http://www.underave.net\">underave</a>. Pero os pido por favor que no os
  registréis si no vais a utilizar la cuenta.\r\n\r\n<strong>Antes de empezar</strong>
  con el tutorial, por favor, <strong>leeros el tutorial anterior</strong> sobre el
  <a title=\"Leer tutorial\" href=\"http://www.racotecnic.com/2009/01/registro-de-usuarios-externo-a-phpbb-3x/\"
  target=\"_self\">registro de usuarios externo a phpBB3</a>, ya que habrá ciertos
  aspectos que pasaré por alto por estar explicados en ese tutorial.\r\n\r\nAdemás
  de miraros ese tutorial deberíais echar un vistazo a la documentación del componente
  Auth, ya que sin él el registro de usuarios sería otra cosa...\r\n
<ul>\r\n\t<li><a
  rel=\"nofollow\" href=\"http://book.cakephp.org/view/172/authentication\" target=\"_blank\">CakePHP
  Authentication</a></li>\r\n</ul>\r\nComo siempre, empiezo con lo que he utilizado
  para llevar a cabo el tutorial...\r\n
<ul>\r\n\t<li><a rel=\"nofollow\" href=\"http://www.cakephp.org/\"
  target=\"_blank\">CakePHP</a> (v. 1.2.4.8284 [1.2.5 stable])</li>\r\n\t<li>phpBB
  3.0.2</li>\r\n\t<li>Componente de integración de phpBB3 (que ahora crearemos)</li>\r\n</ul>\r\nAunque
  yo haya utilizado la versión 3.0.2 de phpBB, debéis saber que <strong>este sistema
  debe funcionar igual de bien en cualquier versión de phpBB 3</strong> ;)\r\n\r\nParto
  de la base de que tenéis creado un modelo y un controlador encargados de gestionar
  los usuarios de vuestra aplicación Cake. En mi caso los he llamado \"<em>users</em>\",
  aunque podéis llamarlos \"usuarios\", \"<em>members</em>\", o como os dé la gana.\r\n\r\nEs
  decir, <strong>doy por supuesto que ya tenéis un sistema de usuarios funcionando
  en vuestra aplicación CakePHP</strong>. En este tutorial sólo os explicaré cómo
  integrar el registro y login de phpBB3, así que todo lo demás (validaciones de datos,
  creación de formularios, funcionamiento de la clase Auth...) quedará por supuesto
  (lo cual no quiere decir que no vaya a haber código al respecto ;)).\r\n\r\n"
wordpress_id: 1224
wordpress_url: http://racotecnic.underave.net/?p=1224
date: '2010-01-23 15:32:41 +0100'
date_gmt: '2010-01-23 14:32:41 +0100'
categories:
- Programació
- Web
tags:
- PHP
- phpBB
- Administració usuaris
- CakePHP
- CakePHP 1.2
---

<script type="text/javascript"><br />
// <![CDATA[<br />
	jQuery(function(){<br />
		jQuery("#registre-phpbb legend").css('cursor', 'pointer').click(function(){<br />
			jQuery(this).next().slideToggle();<br />
			if(jQuery(this).text() == 'Ocultar')<br />
			{<br />
				jQuery(this).text('Mostrar');<br />
			}<br />
			else<br />
			{<br />
				jQuery(this).text('Ocultar');<br />
			}<br />
		});<br />
		jQuery(".amunt").click(function(){<br />
			MGJS.goTop();<br />
			return false;<br />
		});<br />
	});<br />
// ]]><br />
</script>
<style type="text/css">
	.amunt {<br />
		float: right;<br />
		font-size: .8em;<br />
	}<br />
	#registre-phpbb {<br />
		width: 300px;<br />
		-moz-border-radius: 7px;<br />
		border: 1px solid #cccccc;<br />
		float: left;<br />
		background-color: #f7f7f7;<br />
		margin: 20px 0;<br />
	}<br />
	#imatge-cakephp {<br />
		float: right;<br />
	}<br />
</style>
<fieldset id="registre-phpbb">
<legend style="padding: 0 5px;">Ocultar</legend>

<ul>
<li><a href="#phpbb-zero">Antes de empezar</a></li>
<li><a href="#phpbb-primer">Primeros pasos</a></li>
<li><a href="#phpbb-segon">Creando el componente phpBB3</a></li>
<li><a href="#phpbb-tercer">Registro de usuarios</a></li>
<li><a href="#phpbb-quart">Errores fatales :s</a></li>
<li><a href="#phpbb-cinque">Login de usuarios</a></li>
<li><a href="#phpbb-sise">Cambio de datos del usuario</a></li>
<li><a href="#phpbb-sete">Modificando vuestra plantilla de phpBB</a></li>
</ul>
</fieldset>

<a href="http://www.racotecnic.com/wp-content/uploads/2010/01/hot-features.png" id="imatge-cakephp"><img class="alignnone size-full wp-image-1348" title="hot-features" src="http://www.racotecnic.com/wp-content/uploads/2010/01/hot-features.png" alt="" width="260" height="260" /></a>
<h4 id="phpbb-zero">Antes de empezar...</h4>

Más o menos al empezar con este blog expliqué cómo podíais <a title="Leer tutorial" href="http://www.racotecnic.com/2009/01/registro-de-usuarios-externo-a-phpbb-3x/" target="_self">hacer un registro de usuarios externo a phpBB3 con PHP</a>. Hoy voy a contaros cómo hacer para <strong>implementar el registro y login de usuarios de phpBB3 en CakePHP</strong>.

Podéis ver, como ejemplo, la página de <a href="http://www.underave.net">underave</a>. Pero os pido por favor que no os registréis si no vais a utilizar la cuenta.

<strong>Antes de empezar</strong> con el tutorial, por favor, <strong>leeros el tutorial anterior</strong> sobre el <a title="Leer tutorial" href="http://www.racotecnic.com/2009/01/registro-de-usuarios-externo-a-phpbb-3x/" target="_self">registro de usuarios externo a phpBB3</a>, ya que habrá ciertos aspectos que pasaré por alto por estar explicados en ese tutorial.

Además de miraros ese tutorial deberíais echar un vistazo a la documentación del componente Auth, ya que sin él el registro de usuarios sería otra cosa...

<ul>
<li><a rel="nofollow" href="http://book.cakephp.org/view/172/authentication" target="_blank">CakePHP Authentication</a></li>
</ul>

Como siempre, empiezo con lo que he utilizado para llevar a cabo el tutorial...

<ul>
<li><a rel="nofollow" href="http://www.cakephp.org/" target="_blank">CakePHP</a> (v. 1.2.4.8284 [1.2.5 stable])</li>
<li>phpBB 3.0.2</li>
<li>Componente de integración de phpBB3 (que ahora crearemos)</li>
</ul>

Aunque yo haya utilizado la versión 3.0.2 de phpBB, debéis saber que <strong>este sistema debe funcionar igual de bien en cualquier versión de phpBB 3</strong> ;)

Parto de la base de que tenéis creado un modelo y un controlador encargados de gestionar los usuarios de vuestra aplicación Cake. En mi caso los he llamado "<em>users</em>", aunque podéis llamarlos "usuarios", "<em>members</em>", o como os dé la gana.

Es decir, <strong>doy por supuesto que ya tenéis un sistema de usuarios funcionando en vuestra aplicación CakePHP</strong>. En este tutorial sólo os explicaré cómo integrar el registro y login de phpBB3, así que todo lo demás (validaciones de datos, creación de formularios, funcionamiento de la clase Auth...) quedará por supuesto (lo cual no quiere decir que no vaya a haber código al respecto ;)).

<a id="more"></a><a id="more-1224"></a>
<h4 id="phpbb-primer">Primeros pasos<a class="amunt" href="#amunt">arriba</a></h4>

Además de la parte encargada de la gestión de usuarios vamos a tener que crear un modelo para el foro. Este sólo debe contener el nombre del modelo y debemos indicarle que no va a utilizar base de datos:

[php]<?php // /app/models/forum.php<br />
class Forum extends AppModel<br />
{<br />
	var $name = 'Forum';<br />
	var $useDbConfig = 'forums';<br />
	var $useTable = false;<br />
}[/php]

Como podéis ver, además de haber indicado el nombre del modelo y haber desactivado el uso de base de datos en éste, he indicado que utilice la configuración de base de datos <em>forums</em>. Con esto indicamos al modelo que, en caso de utilizar la base de datos, la configuración que utilizaremos será la <em>forums</em>.

Podéis añadir tantas configuraciones de conexión a la base de datos como queráis, simplemente cread una variable con el nombre que queráis de conexión conteniendo los datos necesarios en el fichero <em>/app/config/database.php</em>:

[php]<?php // /app/config/database.php<br />
class DATABASE_CONFIG {<br />
	var $default = array(<br />
		'driver' => 'mysql',<br />
		'persistent' => false,<br />
		'host' => 'localhost',<br />
		'login' => 'USUARIO',<br />
		'password' => 'CONTRASEÑA',<br />
		'database' => 'BASE_DE_DATOS'<br />
	);<br />
	var $forums = array(<br />
		'driver' => 'mysql',<br />
		'persistent' => false,<br />
		'host' => 'localhost',<br />
		'login' => 'USUARIO',<br />
		'password' => 'CONTRASEÑA',<br />
		'database' => 'BASE_DE_DATOS',<br />
		'prefix' => 'phpbb_'<br />
	);<br />
}[/php]

Si vuestras tablas del foro tienen un prefijo (como es mi caso) aseguraros de especificar la opción "prefix" en el array de conexión a la base de datos.
<h4 id="phpbb-segon">Creando el componente phpBB3<a class="amunt" href="#amunt">arriba</a></h4>

Vamos a por la creación del componente PhpBB3 que nos permitirá el login de usuarios. El componente es una modificación de uno llamado <a rel="nofollow" href="http://bakery.cakephp.org/articles/view/phpbb3-api-bridge" target="_blank">PhpBB3 Api Bridge</a>, del <a rel="nofollow" href="http://bakery.cakephp.org" target="_blank">Bakery</a> the Cake.

He modificado el componente porque tal y como lo presenta <em>Wilson Sheldon</em> (el autor del componente), al iniciar sesión en el foro y si el usuario no existe, se le registra en el sistema.

Esto está muy bien cuando añadimos el foro <strong>después</strong> de haber creado nuestra aplicación CakePHP. Sin embargo, si en lugar de añadir el foro estamos creando un portal con CakePHP y con phpBB desde cero, lo más seguro es que no os interese hacer esa verificación.

Cread, pues, el componente <em>php_b_b3.php</em> con el siguiente contenido:

[php highlight="11"]<?php // /app/controllers/components/php_b_b3.php<br />
/**<br />
* Created by Willson Sheldon => http://bakery.cakephp.org/articles/view/phpbb3-api-bridge<br />
* Modified by Òscar Casajuana a.k.a. elboletaire => http://www.underave.net<br />
*/<br />
class PhpBB3Component extends Object<br />
{

	var $controller;<br />
	var $model;<br />
	var $phpBBpath = '/ruta/a/tu/instalacion/de/phpBB3/';

	/**<br />
	 * Inicia la sesión en phpBB3<br />
	 * @param string $username<br />
	 * @param string $password<br />
	 * @param bool $remember [optional] Recordar entre sesiones<br />
	 */<br />
	public function login($username, $password, $remember = false)<br />
	{<br />
		$this->auth->login($username, $password, $remember);<br />
	}

	/**<br />
	 * Cierra la sesión en phpBB<br />
	 */<br />
	public function logout()<br />
	{<br />
		$this->user->session_kill();<br />
		$this->user->session_begin();<br />
	}

	/**<br />
	 * Registra un usuario en el sistema<br />
	 * @param array $data Datos del usuario<br />
	 * @return id del usuario en caso de éxito; falso en caso contrario<br />
	 */<br />
	public function register($data)<br />
	{<br />
		// Paràmetres per defecte<br />
		// Grup usuaris registrats<br />
		if(!isset($data['group_id']) || empty($data['group_id'])) $data['group_id'] = 5;<br />
		// Franja horària GMT+01<br />
		if(!isset($data['user_timezone']) || empty($data['user_timezone'])) $data['user_timezone'] = 1;<br />
		// Horari d'estiu desactivat<br />
		if(!isset($data['user_dst']) || empty($data['user_dst'])) $data['user_dst'] = 0;<br />
		if(!isset($data['user_lang']) || empty($data['user_lang'])) $data['user_lang'] = 'es';<br />
		// Usuari inactiu per defecte<br />
		if(!isset($data['user_type']) || empty($data['user_type'])) $data['user_type'] = 1;<br />
		// Això millor no tocar-ho<br />
		if(!isset($data['user_style']) || empty($data['user_style'])) $data['user_style'] = 2;<br />
		$userData = array(<br />
            'username' => $data['username'],<br />
			'username_clean' => strtolower($data['username']),<br />
            'user_password' => $this->phpbb_hash($data['user_password']),<br />
            'user_email' => $data['user_email'],<br />
			'user_ip'=>$_SERVER['REMOTE_ADDR'],<br />
            'group_id' => $data['group_id'], //Registered users group<br />
            'user_timezone' => $data['user_timezone'],<br />
            'user_dst' => $data['user_dst'],<br />
            'user_lang' => $data['user_lang'],<br />
            'user_type' => $data['user_type'],<br />
            'user_actkey' => '',<br />
            'user_dateformat' => 'D d M Y, g:i a',<br />
            'user_style' => 2,<br />
            'user_regdate' => time(),<br />
        );<br />
 		$userId = user_add($userData);<br />
		if(empty($userId)) return false;<br />
		else<br />
		{<br />
			// Actualitzem darrer usuari registrat al phpBB<br />
			update_last_username();<br />
			return $userId;<br />
		}<br />
	}

	/**<br />
	 * Encripta una contraseña utilizando el<br />
	 * método de encriptación de phpBB3<br />
	 * @param string $password<br />
	 * @return contraseña encriptada<br />
	 */<br />
	public function phpbb_hash($password)<br />
	{

		$itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';<br />
		$random_state = $this->unique_id();<br />
		$random = '';<br />
		$count = 6;

		if (($fh = @fopen ( '/dev/urandom', 'rb' )))<br />
		{<br />
			$random = fread ($fh, $count);<br />
			fclose ($fh);<br />
		}

		if (strlen($random) < $count)<br />
		{<br />
			$random = '';<br />
			for($i=0;$i<$count;$i+=16)<br />
			{<br />
				$random_state = md5($this->unique_id () . $random_state);<br />
				$random .= pack('H*', md5($random_state));<br />
			}<br />
			$random = substr($random, 0, $count);<br />
		}

		$hash = $this->_hash_crypt_private($password, $this->_hash_gensalt_private($random, $itoa64 ), $itoa64);

		if (strlen($hash) == 34)<br />
		{<br />
			return $hash;<br />
		}

		return md5($password);<br />
	}

	/**<br />
	 * Verifica la existencia de un usuario<br />
	 * @param string $username<br />
	 * @return<br />
	 */<br />
	public function userExists($username)<br />
	{<br />
		if (user_get_id_name(false, $username) == 'NO_USERS')<br />
		{<br />
			return false;<br />
		}<br />
		else<br />
		{<br />
			return true;<br />
		}<br />
	}

	/**<br />
	 * Carga los ficheros necesarios de phpBB3<br />
	 */<br />
	function startup(&amp;$controller)<br />
	{<br />
        	$this->controller = &amp;$controller;<br />
		define('IN_PHPBB', true);

		global $phpbb_root_path, $phpEx, $db, $config, $user, $auth, $cache, $template;

		$phpbb_root_path = $this->phpBBpath;<br />
		$phpEx = substr(strrchr(__FILE__, '.'), 1);<br />
		require_once($phpbb_root_path . 'common.' . $phpEx);

		$this->table_prefix = $table_prefix;<br />
		$this->auth = $auth;<br />
		$this->user = $user;

		// Start session management<br />
		$this->user->session_begin();<br />
		$this->auth->acl($user->data);<br />
		$this->user->setup();

		require_once($phpbb_root_path .'includes/functions_user.php');<br />
	}

	private function unique_id($extra = 'c')<br />
	{<br />
		static $dss_seeded = false;<br />
		global $config;

		$val = $config ['rand_seed'] . microtime ();<br />
		$val = md5 ( $val );<br />
		$config ['rand_seed'] = md5 ( $config ['rand_seed'] . $val . $extra );

		$dss_seeded = true;<br />
		return substr ( $val, 4, 16 );<br />
	}

	/**<br />
	 * Generate salt for hash generation<br />
	 */<br />
	private function _hash_gensalt_private($input,&amp;$itoa64,$iteration_count_log2 = 6)<br />
	{<br />
		if ($iteration_count_log2 < 4 || $iteration_count_log2 > 31)<br />
		{<br />
			$iteration_count_log2 = 8;<br />
		}

		$output = '$H$';<br />
		$output .= $itoa64 [min($iteration_count_log2 + ((PHP_VERSION >= 5) ? 5 : 3), 30)];<br />
		$output .= $this->_hash_encode64($input, 6, $itoa64);

		return $output;<br />
	}

	/**<br />
	 * Encode hash<br />
	 */<br />
	private function _hash_encode64($input,$count,&amp;$itoa64)<br />
	{<br />
		$output = '';<br />
		$i = 0;<br />
		do<br />
		{<br />
			$value = ord ( $input [$i ++] );<br />
			$output .= $itoa64 [$value &amp; 0x3f];<br />
			if ($i < $count)<br />
			{<br />
				$value |= ord ( $input [$i] ) << 8;<br />
			}<br />
			$output .= $itoa64 [($value >> 6) &amp; 0x3f];<br />
			if ($i ++ >= $count)<br />
			{<br />
				break;<br />
			}<br />
			if ($i < $count)<br />
			{<br />
				$value |= ord ( $input [$i] ) << 16;<br />
			}<br />
			$output .= $itoa64 [($value >> 12) &amp; 0x3f];<br />
			if ($i ++ >= $count)<br />
			{<br />
				break;<br />
			}<br />
			$output .= $itoa64 [( $value >> 18 ) &amp; 0x3f];<br />
		} while ( $i < $count );

		return $output;<br />
	}

	/**<br />
	 * The crypt function/replacement<br />
	 */<br />
	private function _hash_crypt_private($password,$setting,&amp;$itoa64)<br />
	{<br />
		$output = '*';

		// Check for correct hash<br />
		if (substr ( $setting, 0, 3 ) != '$H$')<br />
		{<br />
			return $output;<br />
		}<br />
		$count_log2 = strpos ( $itoa64, $setting [3] );<br />
		if ($count_log2 < 7 || $count_log2 > 30)<br />
		{<br />
			return $output;<br />
		}<br />
		$count = 1 << $count_log2;<br />
		$salt = substr ( $setting, 4, 8 );

		if ( strlen ( $salt ) != 8 )<br />
		{<br />
			return $output;<br />
		}<br />
		/**<br />
		 * We're kind of forced to use MD5 here since it's the only<br />
		 * cryptographic primitive available in all versions of PHP<br />
		 * currently in use.  To implement our own low-level crypto<br />
		 * in PHP would result in much worse performance and<br />
		 * consequently in lower iteration counts and hashes that are<br />
		 * quicker to crack (by non-PHP code).<br />
		 */<br />
		if (PHP_VERSION >= 5)<br />
		{<br />
			$hash = md5 ( $salt . $password, true );<br />
			do<br />
			{<br />
				$hash = md5 ( $hash . $password, true );<br />
			} while ( -- $count );<br />
		}<br />
		else<br />
		{<br />
			$hash = pack ( 'H*', md5 ( $salt . $password ) );<br />
			do<br />
			{<br />
				$hash = pack ( 'H*', md5 ( $hash . $password ) );<br />
			} while ( -- $count );<br />
		}<br />
		$output = substr ( $setting, 0, 12 );<br />
		$output .= $this->_hash_encode64 ( $hash, 16, $itoa64 );

		return $output;<br />
	}<br />
}[/php]

Aunque veáis mucho código, no os asustéis. La mayoría de estos métodos son para encriptar la contraseña. Los métodos que nosotros utilizaremos serán <strong>login</strong>, <strong>logout</strong>, <strong>register</strong> y <strong>userExists</strong>.

Lo primero que debéis hacer es substituir la ruta hacia vuestra instalación de phpBB3, en la <strong>línea 11</strong> (subrayada en azul, como no).
<h4 id="phpbb-tercer">Registro de usuarios<a class="amunt" href="#amunt">arriba</a></h4>

Ahora que ya tenemos el componente vamos a empezar a desarrollar el registro de usuarios. En esta parte editaremos / crearemos tres ficheros: el modelo de usuarios, para añadir las validaciones correspondientes; el controlador de usuarios, para añadir el método de registro y la vista del registro de usuarios.

Los usuarios los registraremos activados para ahorrarnos complicaciones. Dejo en vuestras manos la creación de un método para la activación de la cuenta del usuario en caso de que registréis a vuestros usuarios con la cuenta inhabilitada.

Empecemos con la vista <strong>register.ctp</strong>:

[php]<?= $form->create('User',array('action'=>'register')) ?><br />
<?= $form->input('User.username', array('label'=>__('Nombre de usuario',true))) ?><br />
<!-- Indicamos value = '' a la contraseña para que no se rellene el campo automáticamente en caso de haber algún error en los datos --><br />
<?= $form->input('User.password', array('label'=>__('Contraseña',true),'type'=>'password','value'=>'')) ?><br />
<?= $form->input('User.confirm_passwd', array('label'=>__('Confirma la contraseña',true),'type'=>'password','value'=>'')) ?><br />
<?= $form->input('User.email', array('label'=>__('E-mail',true))) ?><br />
<?= $form->end(__('Registrarse',true)) ?>[/php]

Sencillo, ¿no?

Creemos las validaciones que nos interesen en nuestro modelo <strong>user</strong>:

[php]<?php // /app/models/user.php<br />
class User extends AppModel {<br />
	var $name = 'User';<br />
	var $validate = array(<br />
		'username'	=>	array(<br />
						'length'		=>	array(<br />
											'rule'		=> array('between', 3, 23),<br />
											'message'	=>'El nombre debe contener entre 3 y 23 caracteres'<br />
											),<br />
						'exists'		=>	array(<br />
											'rule'		=> array('checkUnique','username'),<br />
											'message'	=> 'El nombre de usuario ya existe'<br />
											)<br />
						),<br />
		'email'		=>	array(<br />
							'El e-mail introducido no es válido' => VALID_EMAIL,<br />
							'El e-mail es obligatorio' => VALID_NOT_EMPTY,<br />
							'exists'		=> array(<br />
												'rule'		=> array('checkUnique','email'),<br />
												'message'	=> 'Ya hay un usuario registrado con este e-mail'<br />
												)<br />
  							),<br />
		'confirm_passwd' => array('identicalFieldValues'	=> array(<br />
													'rule'=>array('identicalFieldValues','password'),<br />
													'message'=>'Las contraseñas introducidas no coinciden'<br />
													)<br />
							),<br />
		'password'	=>	array('length'		=>	array(<br />
											'rule'		=> array('minLength', 6),<br />
											'message'	=>'La contraseña debe contener al menos 6 caracteres'<br />
											)<br />
						)<br />
		);<br />
	/**<br />
	* Verifica si dos campos son iguales<br />
	*/<br />
	function identicalFieldValues( $field = array(), $compare_field = null )<br />
	{<br />
		foreach( $field as $key => $value )<br />
		{<br />
			$v1 = $value;<br />
			$v2 = $this->data[$this->name][$compare_field];<br />
			if($v1 !== $v2)<br />
			{<br />
				return FALSE;<br />
			}<br />
			else<br />
			{<br />
				continue;<br />
			}<br />
		}<br />
		return TRUE;<br />
	}

	/**<br />
	* Verifica si un dato existe en la base de datos<br />
	* @param $data         Dato con el que comparar<br />
	* @param $fieldName    Nombre de celda a verificar<br />
	* @return bool<br />
	*/<br />
	function checkUnique($data, $fieldName )<br />
	{<br />
		$valid = false;<br />
		if(isset($fieldName) &amp;&amp; $this->hasField($fieldName))<br />
		{<br />
			$valid = $this->isUnique(array($fieldName => $data));<br />
		}<br />
		return $valid;<br />
	}<br />
}<br />
[/php]

Los métodos <strong>identicalFieldValues</strong> y <strong>checkUnique</strong> son los encargados de verificar si las dos contraseñas coinciden y si el usuario existe en la base de datos.

Si tenéis cualquier duda sobre la creación del modelo podéis dirigiros a la documentación de cake al respecto, ya que allí se explica todo con detalle:

<ul>
<li><a rel="nofollow" href="http://book.cakephp.org/view/125/Data-Validation" target="_blank">CakePHP Data Validation</a></li>
<li><a rel="nofollow" href="http://book.cakephp.org/view/150/Custom-Validation-Rules" target="_blank">CakePHP Custom Validation Rules</a></li>
</ul>

Vamos a por el método <strong>register</strong>. Este puede variar mucho según la aplicación que queráis hacer... por ejemplo, en el caso de <a href="http://www.underave.net">underave</a> verifico que el usuario no está registrado ni en el foro ni en la página principal, ya que cuando hicimos el cambio cometimos el error de hacerlo así. En el ejemplo doy por supuesto que si el usuario no existe en la base de datos principal, no existirá en el foro. De todos modos veréis cómo hacer para verificar la existencia de un usuario (todo el primer trozo comentado):

[php]// /app/controllers/users_controller.php<br />
class UsersController extends AppController<br />
{<br />
	var $name = 'Users';<br />
	var $components = array('Auth','PhpBB3');

	function register()<br />
	{<br />
		$this->pageTitle = __('Registro',true) . ' | ' . __('Usuarios',true);<br />
		if(!empty($this->data))<br />
		{<br />
			// Guardamos la contraseña sin encriptar para registrar al usuario en el foro<br />
			$password = $this->data['User']['confirm_passwd'];<br />
// 			Si nos interesa, verificamos la existencia del usuario en el foro<br />
//			if($this->phpBB->userExists($this->data['User']['username']))<br />
//				$this->User->invalidate('username','exists');<br />
			// Cargamos los datos del usuario en el modelo<br />
			$this->User->set($this->data);<br />
			// En caso de pasar las validaciones...<br />
			if($this->User->validates())<br />
			{<br />
				// Registramos el usuario en el foro<br />
				$datos = array(<br />
					'username'		=> $this->data['User']['username'],<br />
					'user_password'	=> $password,<br />
					'user_email'	=> $this->data['User']['email']<br />
				);<br />
				if($userForumId = $this->PhpBB3->register($datos))<br />
				{<br />
					// En caso de haber registrado al usuario correctamente guardamos la variable con su id del foro<br />
					$this->data['User']['forum_id'] = $userForumId;<br />
					if($this->User->save($this->data,false))<br />
					{<br />
						$this->Session->setFlash(__('Usuario registrado correctamente',true));<br />
						$this->redirect('/');<br />
					}<br />
					else<br />
					{<br />
						$this->Session->setFlash(__('Ha habido algún error al registrarte...',true));<br />
					}<br />
				}<br />
				else<br />
				{<br />
					$this->Session->setFlash(__('Ha habido algún error al registrarte...',true));<br />
				}<br />
			}<br />
		}<br />
	}<br />
}[/php]

Como podéis ver en el ejemplo, una vez he registrado al usuario en el foro me quedo con la ID del usuario creado y es entonces cuando registro al usuario en el sistema, para poder disponer de esta ID.

Si no guardáis la ID del usuario en vuestra base de datos de Cake no podréis hacer nada una vez registrado el usuario. Es decir, no podréis hacer ni el login, ni un cambio de contraseña ni nada de nada. Así que es vital que guardéis su ID.

Bien, en principio esta parte ya la tenemos. Ahora mismo al registrarse alguien en vuestro sistema queda registrado en el foro y en la base de datos de CakePHP.

Ap!! Pero alto, si lo probáis no funcionará. Adelante, haced la prueba. Es necesaria para seguir adelante.
<h4 id="phpbb-quart">Errores fatales :s<a class="amunt" href="#amunt">arriba</a></h4>

Si estáis utilizando caché, lo más seguro es que el primer error que veáis sea este:
<blockquote>
<strong>Fatal error:</strong> Cannot redeclare class cache in ...</blockquote>

Esto sucede porque el núcleo de Cake utiliza una classe que se llama igual que una del núcleo de phpBB3 (cache, en este caso). Estuve varios meses dándole vueltas a este asunto y la mejor solución que encontré fue modificar algunos ficheros de phpBB3, así que vamos a ello. No os preocupéis, tan solo modificaremos unos pocos ficheros:

Básicamente lo que hay que hacer es renombrar la clase <strong>cache</strong>. Primero modificaremos el nombre de la clase y luego pasaremos a cambiar aquellas líneas de código donde se instancíe la clase.

Abrid <em>phpBB3/includes/cache.php</em> y buscad lo siguiente (en la línea 23 aproximadamente):

[php]class cache extends acm[/php]

Substituidlo por:

[php]class fcache extends acm[/php]

Guardad el fichero y cerradlo. Ahora abrid estos ficheros:

<ul>
<li><em>phpBB3/common.php</em></li>
<li><em>phpBB3/style.php</em></li>
<li><em>phpBB3/download/file.php</em></li>
</ul>

Buscad esto en cada uno de ellos:

[php]new cache();[/php]

Y reemplazadlo por:

[php]new fcache();[/php]

Hecho esto (y una vez guardados los ficheros, por supuesto..) subís los ficheros al servidor y el foro debería seguir funcionando correctamente.

¡Aps! ¿Que no os funciona correctamente? Si, como yo, habéis creado el sistema de usuarios utilizando la palabra "users", tendréis otro error fatal:
<blockquote>
<strong>Fatal error:</strong> Cannot redeclare class user...</blockquote>

Del mismo modo que con la caché, la mejor forma de solucionar esto es modificando phpBB3. Abrid el fichero phpBB3/includes/session.php y buscad lo siguiente (en la línea 1376 aproximadamente):

[php]class user extends session[/php]

Y reemplazadlo por...

[php]class fuser extends session[/php]

Ahora abrid el fichero <em>phpBB3/common.php</em> y buscad lo siguiente:

[php]new user();[/php]

Y reemplazadlo por:

[php]new fuser();[/php]

Ahora sí que sí :D. Vuestro registro de usuarios, así como vuestra instalación de phpBB, deberían funcionar perfectamente ;)
<h4 id="phpbb-cinque">Login de usuarios<a class="amunt" href="#amunt">arriba</a></h4>

Bien, ahora pasaremos a la creación de la vista <strong>login.ctp</strong>:

[php]<?php // /app/views/users/login.ctp<br />
echo $form->create('User',array('action'=>'login'));<br />
echo $form->input('User.username', array('label'=>__('Nombre',true)));<br />
// Utilizamos 'pass' para que Auth no nos encripte la contraseña automáticamente<br />
echo $form->input('User.pass', array('label'=>__('Contraseña',true), 'type'=>'password'));<br />
// Guardamos el referer para saber si el usuario viene del foro y así poderle enviar de nuevo al finalizar el login<br />
echo $form->hidden('User.referer',array('value'=>@$_SERVER['HTTP_REFERER']));<br />
// Nota: Recordar entre sesiones funciona en el foro. Si no tenéis algún componente o método para recordar sesiones en Cake, quizás os interese utilizar alguno.<br />
echo $form->input('User.remember_me',array('type'=>'checkbox','label'=>__('Recordar entre sesiones',true)));<br />
echo $form->end(__('Iniciar sesión',true));<br />
?><br />
[/php]

Es importante que guardemos la contraseña con un nombre de campo distinto a <em>password</em> ya que necesitamos la contraseña sin encriptar para poder iniciar sesión en el foro.

Pasemos al método <em>login</em> de nuestro controlador de usuarios. Ya que estamos, también añadiremos el de <em>logout</em>:

[php highlight="13,14,15,16,17"]// /app/controllers/users_controller.php<br />
function login()<br />
{<br />
	if (!empty($this->data))<br />
	{<br />
		// Guardamos la contraseña encriptada para iniciar sesión en Cake<br />
		$this->data['User']['password'] = $this->Auth->password($this->data['User']['pass']);<br />
		// Iniciamos sesión en Cake<br />
		if ($this->Auth->login($this->data))<br />
		{<br />
			// Iniciamos sesión en PhpBB. Si tenemos el campo 'remember_me' se lo pasamos como tercer parámetro.<br />
			$this->PhpBB3->login($this->data['User']['username'], $this->data['User']['pass'], $this->data['User']['remember_me']);<br />
			$this->Session->setFlash('Sessió iniciada correctament','flash_info',array(),'auth');<br />
			// Verifico si el usuario viene del dominio principal<br />
			if(!preg_match('/^http:\/\/(www\.)?underave\.net/', $this->data['User']['referer']) &amp;&amp; !empty($this->data['User']['referer']))<br />
			{<br />
				// Limpio la URL de posibles ids de sesión del foro (para evitar que éste cierre la sesión por seguridad)<br />
				$referer = preg_replace('/^(.+)sid=[0-9a-z]+/i', '$1', $this->data['User']['referer']);<br />
			// Si viene del dominio principal lo redirigiremos con el método Auth->redirect()<br />
			}<br />
			else $referer = $this->Auth->redirect();

			$this->redirect($referer);<br />
		}<br />
	}<br />
}

function logout()<br />
{<br />
	$this->PhpBB3->logout();<br />
	$this->redirect($this->Auth->logout());<br />
}<br />
[/php]

En las <strong>líneas 13 a 17</strong> lo que hago es verificar si el usuario viene de mi dominio principal. Lo hago así porque en mi caso tengo los foros en un subdominio. Si no es vuestro caso deberéis modificar la expresión regular para que se ajuste a vuestras necesidades.

Si, como yo, tenéis los foros en un subdominio debéis saber que necesitáis tener las cookies configuradas para que funcionen entre vuestros subdominios y vuestro dominio principal. Para hacerlo, primero de todo id a vuestro panel de control del foro. En la barra lateral de la pestaña "General" veréis un grupo de opciones: "Configuración del servidor". Ahí dentro tenéis un enlace para acceder a la configuración de las cookies.

Dentro de esta configuración, debéis poner como dominio de las cookies un punto seguido de vuestro nombre de dominio. En mi caso <strong>.underave.net</strong>. El punto delante del dominio es importante porque algunos navegadores no reconocerían los subdominios sin él.

En directorio de la cookie aseguraros que apunta a la raíz del dominio: <strong>/</strong>

Ahora debéis aseguraros que en vuestro php.ini (o utilizando el método php ini_set) tenéis las cookies también configuradas como en el foro:

[sourcecode language="plain"]; The path for which the cookie is valid.<br />
session.cookie_path = /<br />
; The domain for which the cookie is valid.<br />
session.cookie_domain = .underave.net[/sourcecode]

Hecho esto y subido vuestro php.ini al servidor (antes de subirlo quizás os interese echar un ojo al resto de opciones para ver qué se cuece por ahí) el login de usuarios ya debe funcionar sin problema alguno :)
<h4 id="phpbb-sise">Y si el usuario quisiera cambiar alguno de sus datos?<a class="amunt" href="#amunt">arriba</a></h4>

A mi parecer, es importante que el usuario no tenga que actualizar sus datos varias veces. Es decir, si el usuario cambia su e-mail o su contraseña desde nuestra aplicación Cake, es importante que éste dato se actualice también en el foro.

Además, sería interesante modificar todos los enlaces de phpBB del perfil de usuario que tengan que ver con la edición de datos personales para que éstos enlacen hacia nuestra aplicación Cake.

Si antes he creado una conexión hacia nuestra base de datos de phpBB así como un modelo llamado <em>Forum</em> ha sido porque a partir de ahora trabajaremos con la base de datos en lugar de con el componente. ¿Porqué? Porque así veis que todo esto que hemos estado haciendo es posible hacerlo sin utilizar los métodos del núcleo de phpBB3. ¿Todo? Bueno no, todo no. Para el login de usuarios seguramente será necesario que utilicéis el componente (a no ser que intentéis crear a mano las cookies vosotros mismos).

El método que crearemos ahora será para cambiar la contraseña ya que el cambio de contraseña quizás sea de los datos del perfil más difíciles de modificar. Después de ver el ejemplo añadid tantos métodos como necesitéis (cambio de e-mail, de avatar ...).

Para cambiar cualquier dato de los usuarios del foro sería interesante tener un método en nuestro modelo Forum:

[php]	// /app/models/forum.php<br />
/**<br />
 * Actualiza un dato ($field) de un usuario a<br />
 * partir de su $id en el foro con el valor $value<br />
 *<br />
 * @param integer $id of user<br />
 * @param string $field to update<br />
 * @param mixed $value<br />
 * @return boolean true on success, false on failure<br />
 */<br />
function setUserField($id, $field, $value)<br />
{<br />
	$this->setSource('users');<br />
	$this->primaryKey = 'user_id';<br />
	$this->id = $id;<br />
	return $this->saveField($field, $value);<br />
}[/php]

Añadamos una vista para el cambio de contraseña:

[php]// /app/views/users/change_password.ctp<br />
<?php<br />
echo $form->create('User',array('action'=>'changePassword'));<br />
echo $form->input('old_passwd',array('label'=>__('Contraseña actual',true),'type'=>'password','type','value'=>''));<br />
echo $form->input('password',array('label'=>__('Contraseña',true),'type'=>'password','value'=>''));<br />
echo $form->input('confirm_passwd',array('label'=>__('Confirma la contraseña',true),'type'=>'password','value'=>''));<br />
echo $form->end(__('Cambiar contraseña',true));<br />
?>[/php]

Y aquí viene el método de cambiar contraseña (está creado en el controlador usuarios pero no estaría de más separarlo un poco entre modelo y controlador):

[php]// /app/controllers/users_controller.php<br />
function changePassword()<br />
{<br />
	if (!empty($this->data)){<br />
		// Buscamos el usuario actual en la base de datos<br />
		$user = $this->User->findById($this->Auth->user('id'));<br />
		// Cargamos los datos en el modelo (para validarlos)<br />
		$this->User->set($this->data);<br />
		// Encriptamos la contraseña antigua para validarla<br />
		$this->data['User']['old_passwd'] = $this->Auth->password($this->data['User']['old_passwd']);<br />
		// Validamos y verificamos que la contraseña introducida coincide con la de la BDD<br />
		if ($this->User->validates() &amp;&amp; $this->data['User']['old_passwd'] == $user['User']['password']) {<br />
			$password = $this->data['User']['password'];<br />
			// Actualizamos la contraseña del foro<br />
			$this->Forum->setUserField($user['User']['forums_id'], 'user_password', $this->Auth->password($this->data['User']['password']));<br />
			// Actualizamos la contraseña del sistema<br />
			$this->User->updateAll(array('User.password'=>'''.$this->Auth->password($password).'''),array('User.id'=>$user['User']['id']));<br />
			$this->Session->setFlash(__('Tu contraseña ha sido cambiada con éxito',true),'flash_info');<br />
			$this->redirect(array('controller'=>'users','action'=>'profile'));<br />
		}<br />
		// Si la contraseña no coincide con la guardada en la BDD mostramos error.<br />
		if($this->data['User']['old_passwd'] != $user['User']['password'])<br />
		{<br />
			$this->User->invalidate('old_passwd',__('La contraseña no es correcta',true));<br />
		}<br />
	}<br />
}[/php]

Con esto ya podéis cambiar la contraseña en todo el sistema y ya sabéis cómo hacer para modificar el resto de datos. Al actualizar la contraseña he utilizado <em>user_password</em> como nombre de celda. Consultad vuestra base de datos de phpBB para saber los nombres de las celdas a actualizar.

Si quisierais utilizar la vía del componente y así no tener que utilizar la base de datos y el modelo Forum tendríais que añadir un método en el componente PhpBB3 que actualizara la celda. Para crear dicho método podéis consultar la documentación de phpBB3:
<blockquote>

<ul>
<li><a rel="nofollow" href="http://area51.phpbb.com/docs/code/" target="_blank">Especificaciones de métodos y clases de phpBB 3</a></li>
</ul>

<em><strong>Pista:</strong> Seguramente necesitaréis utilizar la clase 'user' (cambiada por nosotros a fuser, recordad!!) y su método <a rel="nofollow" href="http://area51.phpbb.com/docs/code/phpBB3/user.html#optionset" target="_blank">optionset()</a>.</em></blockquote>
<h4 id="phpbb-sete">Modificando vuestra plantilla de phpBB<a class="amunt" href="#amunt">arriba</a></h4>

Ahora sólo os faltaría modificar vuestra plantilla de phpBB para enlazar hacia vuestra aplicación Cake, con el registro de usuarios, el login y la edición de datos de vuestro perfil.

Podéis enlazar a ella o, en el caso de la edición de datos del perfil, tratar de modificar los formularios de phpBB para que envíen a la aplicación Cake y luego hacer algo como en el login con el referer para poder redirigir al usuario de nuevo al foro.

Esto lo dejo en vuestras manos dado que la solución es bastante abierta y ya llevo mucho rato <em>dándoos la tabarra</em>. Además, me parece que con las pistas que he dado ya tenéis más que suficiente para empezar ;)

Pues con esto creo que ya hemos terminado. Si veis cualquier fallo u os peta la aplicación por algún lado no dudéis en preguntar, comentar y despotricar sobre mí. Tened en cuenta que he modificado el código considerablemente (desde el propio Wordpress...) para tratar de simplificarlo y puede que me haya comido alguna línea o incluso hasta algún apartado entero (esperemos que no...).

En cuanto vea vuestros comentarios trataré de contestarlos :)
