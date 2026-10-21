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
wordpress_id: 1224
wordpress_url: http://racotecnic.com/?p=1224
redirect_from:
- "?p=1224/"
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

<style type="text/css">
  .amunt {
    float: right;
    font-size: .8em;
  }
  #registre-phpbb {
    width: 300px;
    -moz-border-radius: 7px;
    border: 1px solid #cccccc;
    float: left;
    background-color: #f7f7f7;
    margin: 20px 0;
  }
  #imatge-cakephp {
    float: right;
  }
</style>

- <a href="#phpbb-zero">Antes de empezar</a>
- <a href="#phpbb-primer">Primeros pasos</a>
- <a href="#phpbb-segon">Creando el componente phpBB3</a>
- <a href="#phpbb-tercer">Registro de usuarios</a>
- <a href="#phpbb-quart">Errores fatales :s</a>
- <a href="#phpbb-cinque">Login de usuarios</a>
- <a href="#phpbb-sise">Cambio de datos del usuario</a>
- <a href="#phpbb-sete">Modificando vuestra plantilla de phpBB</a>

<a href="{{ site.url }}/uploads/2010/01/hot-features.png" id="imatge-cakephp">
  <img class="alignnone size-full wp-image-1348" title="hot-features" src="{{ site.url }}/uploads/2010/01/hot-features.png" alt="" />
</a>

## Antes de empezar...
{: #phpbb-zero }

Más o menos al empezar con este blog expliqué cómo podíais <a title="Leer tutorial" href="http://www.racotecnic.com/2009/01/registro-de-usuarios-externo-a-phpbb-3x/" target="_self">hacer un registro de usuarios externo a phpBB3 con PHP</a>. Hoy voy a contaros cómo hacer para **implementar el registro y login de usuarios de phpBB3 en CakePHP**.

Podéis ver, como ejemplo, la página de <a href="http://www.underave.net">underave</a>. Pero os pido por favor que no os registréis si no vais a utilizar la cuenta.

**Antes de empezar** con el tutorial, por favor, **leeros el tutorial anterior** sobre el <a title="Leer tutorial" href="http://www.racotecnic.com/2009/01/registro-de-usuarios-externo-a-phpbb-3x/" target="_self">registro de usuarios externo a phpBB3</a>, ya que habrá ciertos aspectos que pasaré por alto por estar explicados en ese tutorial.

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

Aunque yo haya utilizado la versión 3.0.2 de phpBB, debéis saber que **este sistema debe funcionar igual de bien en cualquier versión de phpBB 3** ;)

Parto de la base de que tenéis creado un modelo y un controlador encargados de gestionar los usuarios de vuestra aplicación Cake. En mi caso los he llamado "<em>users</em>", aunque podéis llamarlos "usuarios", "<em>members</em>", o como os dé la gana.

Es decir, **doy por supuesto que ya tenéis un sistema de usuarios funcionando en vuestra aplicación CakePHP**. En este tutorial sólo os explicaré cómo integrar el registro y login de phpBB3, así que todo lo demás (validaciones de datos, creación de formularios, funcionamiento de la clase Auth...) quedará por supuesto (lo cual no quiere decir que no vaya a haber código al respecto ;)).

<a id="more"></a><a id="more-1224"></a>

## Primeros pasos
{: #phpbb-primer }

Además de la parte encargada de la gestión de usuarios vamos a tener que crear un modelo para el foro. Este sólo debe contener el nombre del modelo y debemos indicarle que no va a utilizar base de datos:

~~~php
<?php // /app/models/forum.php
class Forum extends AppModel
{
  var $name = 'Forum';
  var $useDbConfig = 'forums';
  var $useTable = false;
}
~~~

Como podéis ver, además de haber indicado el nombre del modelo y haber desactivado el uso de base de datos en éste, he indicado que utilice la configuración de base de datos <em>forums</em>. Con esto indicamos al modelo que, en caso de utilizar la base de datos, la configuración que utilizaremos será la <em>forums</em>.

Podéis añadir tantas configuraciones de conexión a la base de datos como queráis, simplemente cread una variable con el nombre que queráis de conexión conteniendo los datos necesarios en el fichero <em>/app/config/database.php</em>:

~~~php
<?php // /app/config/database.php
class DATABASE_CONFIG
{
  var $default = array(
    'driver'     => 'mysql',
    'persistent' => false,
    'host'       => 'localhost',
    'login'      => 'USUARIO',
    'password'   => 'CONTRASEÑA',
    'database'   => 'BASE_DE_DATOS'
  );
  var $forums = array(
    'driver'     => 'mysql',
    'persistent' => false,
    'host'       => 'localhost',
    'login'      => 'USUARIO',
    'password'   => 'CONTRASEÑA',
    'database'   => 'BASE_DE_DATOS',
    'prefix'     => 'phpbb_'
  );
}
~~~

Si vuestras tablas del foro tienen un prefijo (como es mi caso) aseguraros de especificar la opción "prefix" en el array de conexión a la base de datos.

## Creando el componente phpBB3
{: #phpbb-segon }

Vamos a por la creación del componente PhpBB3 que nos permitirá el login de usuarios. El componente es una modificación de uno llamado <a rel="nofollow" href="http://bakery.cakephp.org/articles/view/phpbb3-api-bridge" target="_blank">PhpBB3 Api Bridge</a>, del <a rel="nofollow" href="http://bakery.cakephp.org" target="_blank">Bakery</a> the Cake.

He modificado el componente porque tal y como lo presenta <em>Wilson Sheldon</em> (el autor del componente), al iniciar sesión en el foro y si el usuario no existe, se le registra en el sistema.

Esto está muy bien cuando añadimos el foro **después** de haber creado nuestra aplicación CakePHP. Sin embargo, si en lugar de añadir el foro estamos creando un portal con CakePHP y con phpBB desde cero, lo más seguro es que no os interese hacer esa verificación.

Cread, pues, el componente <em>php_b_b3.php</em> con el siguiente contenido:

~~~php
<?php
// /app/controllers/components/php_b_b3.php
/**
* Created by Willson Sheldon => http://bakery.cakephp.org/articles/view/phpbb3-api-bridge
* Modified by Òscar Casajuana a.k.a. elboletaire => http://www.underave.net
*/
class PhpBB3Component extends Object
{

  var $controller;
  var $model;
  var $phpBBpath = '/ruta/a/tu/instalacion/de/phpBB3/';

  /**
   * Inicia la sesión en phpBB3
   * @param string $username
   * @param string $password
   * @param bool $remember [optional] Recordar entre sesiones
   */
  public function login($username, $password, $remember = false)
  {
    $this->auth->login($username, $password, $remember);
  }

  /**
   * Cierra la sesión en phpBB
   */
  public function logout()
  {
    $this->user->session_kill();
    $this->user->session_begin();
  }

  /**
   * Registra un usuario en el sistema
   * @param array $data Datos del usuario
   * @return id del usuario en caso de éxito; falso en caso contrario
   */
  public function register($data)
  {
    // Paràmetres per defecte
    // Grup usuaris registrats
    if (!isset($data['group_id']) || empty($data['group_id'])) $data['group_id'] = 5;
    // Franja horària GMT+01
    if (!isset($data['user_timezone']) || empty($data['user_timezone'])) $data['user_timezone'] = 1;
    // Horari d'estiu desactivat
    if (!isset($data['user_dst']) || empty($data['user_dst'])) $data['user_dst'] = 0;
    if (!isset($data['user_lang']) || empty($data['user_lang'])) $data['user_lang'] = 'es';
    // Usuari inactiu per defecte
    if (!isset($data['user_type']) || empty($data['user_type'])) $data['user_type'] = 1;
    // Això millor no tocar-ho
    if (!isset($data['user_style']) || empty($data['user_style'])) $data['user_style'] = 2;
    $userData = array(
      'username'        => $data['username'],
      'username_clean'  => strtolower($data['username']),
      'user_password'   => $this->phpbb_hash($data['user_password']),
      'user_email'      => $data['user_email'],
      'user_ip'         => $_SERVER['REMOTE_ADDR'],
      'group_id'        => $data['group_id'], //Registered users group
      'user_timezone'   => $data['user_timezone'],
      'user_dst'        => $data['user_dst'],
      'user_lang'       => $data['user_lang'],
      'user_type'       => $data['user_type'],
      'user_actkey'     => '',
      'user_dateformat' => 'D d M Y, g:i a',
      'user_style'      => 2,
      'user_regdate'    => time(),
    );
    $userId = user_add($userData);
    if (empty($userId)) {
      return false;
    } else {
      // Actualitzem darrer usuari registrat al phpBB
      update_last_username();
      return $userId;
    }
  }

  /**
   * Encripta una contraseña utilizando el
   * método de encriptación de phpBB3
   * @param string $password
   * @return contraseña encriptada
   */
  public function phpbb_hash($password)
  {

    $itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $random_state = $this->unique_id();
    $random = '';
    $count = 6;

    if (($fh = @fopen('/dev/urandom', 'rb'))) {
      $random = fread($fh, $count);
      fclose($fh);
    }

    if (strlen($random) < $count) {
      $random = '';
      for ($i = 0; $i < $count; $i += 16) {
        $random_state = md5($this->unique_id () . $random_state);
        $random .= pack('H*', md5($random_state));
      }
      $random = substr($random, 0, $count);
    }

    $hash = $this->_hash_crypt_private($password, $this->_hash_gensalt_private($random, $itoa64), $itoa64);

    if (strlen($hash) == 34) {
      return $hash;
    }

    return md5($password);
  }

  /**
   * Verifica la existencia de un usuario
   * @param string $username
   * @return
   */
  public function userExists($username)
  {
    if (user_get_id_name(false, $username) == 'NO_USERS') {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Carga los ficheros necesarios de phpBB3
   */
  function startup(&$controller)
  {
    $this->controller = &$controller;
    define('IN_PHPBB', true);

    global $phpbb_root_path, $phpEx, $db, $config, $user, $auth, $cache, $template;

    $phpbb_root_path = $this->phpBBpath;
    $phpEx = substr(strrchr(__FILE__, '.'), 1);
    require_once($phpbb_root_path . 'common.' . $phpEx);

    $this->table_prefix = $table_prefix;
    $this->auth = $auth;
    $this->user = $user;

    // Start session management
    $this->user->session_begin();
    $this->auth->acl($user->data);
    $this->user->setup();

    require_once($phpbb_root_path .'includes/functions_user.php');
  }

  private function unique_id($extra = 'c')
  {
    static $dss_seeded = false;
    global $config;

    $val = $config ['rand_seed'] . microtime();
    $val = md5($val);
    $config['rand_seed'] = md5($config['rand_seed'] . $val . $extra);

    $dss_seeded = true;
    return substr($val, 4, 16);
  }

  /**
   * Generate salt for hash generation
   */
  private function _hash_gensalt_private($input, &$itoa64, $iteration_count_log2 = 6)
  {
    if ($iteration_count_log2 < 4 || $iteration_count_log2 > 31) {
      $iteration_count_log2 = 8;
    }

    $output = '$H$';
    $output .= $itoa64[min($iteration_count_log2 + ((PHP_VERSION >= 5) ? 5 : 3), 30)];
    $output .= $this->_hash_encode64($input, 6, $itoa64);

    return $output;
  }

  /**
   * Encode hash
   */
  private function _hash_encode64($input, $count, &$itoa64)
  {
    $output = '';
    $i = 0;
    do {
      $value = ord ($input[$i++]);
      $output .= $itoa64[$value & 0x3f];
      if ($i < $count) {
        $value |= ord($input[$i]) << 8;
      }
      $output .= $itoa64[($value >> 6) & 0x3f];
      if ($i ++ >= $count) {
        break;
      }
      if ($i < $count) {
        $value |= ord($input[$i]) << 16;
      }
      $output .= $itoa64[($value >> 12) & 0x3f];
      if ($i ++ >= $count) {
        break;
      }
      $output .= $itoa64[($value >> 18) & 0x3f];
    } while ($i < $count);

    return $output;
  }

  /**
   * The crypt function/replacement
   */
  private function _hash_crypt_private($password, $setting, &$itoa64)
  {
    $output = '*';

    // Check for correct hash
    if (substr($setting, 0, 3) != '$H$') {
      return $output;
    }
    $count_log2 = strpos($itoa64, $setting [3]);
    if ($count_log2 < 7 || $count_log2 > 30) {
      return $output;
    }
    $count = 1 << $count_log2;
    $salt = substr($setting, 4, 8);

    if (strlen($salt) != 8) {
      return $output;
    }
    /**
     * We're kind of forced to use MD5 here since it's the only
     * cryptographic primitive available in all versions of PHP
     * currently in use.  To implement our own low-level crypto
     * in PHP would result in much worse performance and
     * consequently in lower iteration counts and hashes that are
     * quicker to crack (by non-PHP code).
     */
    if (PHP_VERSION >= 5) {
      $hash = md5($salt . $password, true);
      do {
        $hash = md5($hash . $password, true);
      } while (--$count);
    } else {
      $hash = pack('H*', md5 ($salt . $password));
      do {
        $hash = pack('H*', md5($hash . $password));
      } while (--$count);
    }
    $output = substr($setting, 0, 12);
    $output .= $this->_hash_encode64($hash, 16, $itoa64);

    return $output;
  }
}
~~~

Aunque veáis mucho código, no os asustéis. La mayoría de estos métodos son para encriptar la contraseña. Los métodos que nosotros utilizaremos serán **login**, **logout**, **register** y **userExists**.

Lo primero que debéis hacer es substituir la ruta hacia vuestra instalación de phpBB3, en la **línea 11** (subrayada en azul, como no).

## Registro de usuarios
{: #phpbb-tercer }

Ahora que ya tenemos el componente vamos a empezar a desarrollar el registro de usuarios. En esta parte editaremos / crearemos tres ficheros: el modelo de usuarios, para añadir las validaciones correspondientes; el controlador de usuarios, para añadir el método de registro y la vista del registro de usuarios.

Los usuarios los registraremos activados para ahorrarnos complicaciones. Dejo en vuestras manos la creación de un método para la activación de la cuenta del usuario en caso de que registréis a vuestros usuarios con la cuenta inhabilitada.

Empecemos con la vista **register.ctp**:

~~~php
<?= $form->create('User', array('action' => 'register')) ?>
<?= $form->input('User.username', array('label' => __('Nombre de usuario', true))) ?>
<!-- Indicamos value = '' a la contraseña para que no se rellene el campo automáticamente en caso de haber algún error en los datos -->
<?= $form->input('User.password', array('label' => __('Contraseña', true),'type' => 'password','value' => '')) ?>
<?= $form->input('User.confirm_passwd', array('label' => __('Confirma la contraseña', true),'type' => 'password','value' => '')) ?>
<?= $form->input('User.email', array('label' => __('E-mail', true))) ?>
<?= $form->end(__('Registrarse', true)) ?>
~~~

Sencillo, ¿no?

Creemos las validaciones que nos interesen en nuestro modelo **user**:

~~~php
<?php // /app/models/user.php
class User extends AppModel {
  var $name = 'User';
  var $validate = array(
    'username' =>  array(
      'length'  => array(
        'rule'    => array('between', 3, 23),
        'message' => 'El nombre debe contener entre 3 y 23 caracteres'
      ),
      'exists' => array(
        'rule'    => array('checkUnique', 'username'),
        'message' => 'El nombre de usuario ya existe'
      )
    ),
    'email' => array(
      'El e-mail introducido no es válido' => VALID_EMAIL,
      'El e-mail es obligatorio'           => VALID_NOT_EMPTY,
      'exists' => array(
        'rule'    => array('checkUnique', 'email'),
        'message' => 'Ya hay un usuario registrado con este e-mail'
      )
    ),
    'confirm_passwd' => array(
      'identicalFieldValues'  => array(
        'rule'    => array('identicalFieldValues', 'password'),
        'message' => 'Las contraseñas introducidas no coinciden'
      )
    ),
    'password' => array(
      'length' => array(
        'rule'    => array('minLength', 6),
        'message' => 'La contraseña debe contener al menos 6 caracteres'
      )
    )
  );

  /**
  * Verifica si dos campos son iguales
  */
  function identicalFieldValues($field = array(), $compare_field = null)
  {
    foreach ($field as $key => $value) {
      $v1 = $value;
      $v2 = $this->data[$this->name][$compare_field];
      if ($v1 !== $v2) {
        return FALSE;
      } else {
        continue;
      }
    }
    return TRUE;
  }

  /**
  * Verifica si un dato existe en la base de datos
  * @param $data         Dato con el que comparar
  * @param $fieldName    Nombre de celda a verificar
  * @return bool
  */
  function checkUnique($data, $fieldName )
  {
    $valid = false;
    if (isset($fieldName) && $this->hasField($fieldName)) {
      $valid = $this->isUnique(array($fieldName => $data));
    }
    return $valid;
  }
}

~~~

Los métodos **identicalFieldValues** y **checkUnique** son los encargados de verificar si las dos contraseñas coinciden y si el usuario existe en la base de datos.

Si tenéis cualquier duda sobre la creación del modelo podéis dirigiros a la documentación de cake al respecto, ya que allí se explica todo con detalle:

<ul>
  <li><a rel="nofollow" href="http://book.cakephp.org/view/125/Data-Validation" target="_blank">CakePHP Data Validation</a></li>
  <li><a rel="nofollow" href="http://book.cakephp.org/view/150/Custom-Validation-Rules" target="_blank">CakePHP Custom Validation Rules</a></li>
</ul>

Vamos a por el método **register**. Este puede variar mucho según la aplicación que queráis hacer... por ejemplo, en el caso de <a href="http://www.underave.net">underave</a> verifico que el usuario no está registrado ni en el foro ni en la página principal, ya que cuando hicimos el cambio cometimos el error de hacerlo así. En el ejemplo doy por supuesto que si el usuario no existe en la base de datos principal, no existirá en el foro. De todos modos veréis cómo hacer para verificar la existencia de un usuario (todo el primer trozo comentado):

~~~php
<?php
// /app/controllers/users_controller.php
class UsersController extends AppController
{
  var $name = 'Users';
  var $components = array('Auth', 'PhpBB3');

  function register()
  {
    $this->pageTitle = __('Registro', true) . ' | ' . __('Usuarios', true);
    if (!empty($this->data)) {
      // Guardamos la contraseña sin encriptar para registrar al usuario en el foro
      $password = $this->data['User']['confirm_passwd'];
//      Si nos interesa, verificamos la existencia del usuario en el foro
//      if($this->phpBB->userExists($this->data['User']['username']))
//        $this->User->invalidate('username','exists');
      // Cargamos los datos del usuario en el modelo
      $this->User->set($this->data);
      // En caso de pasar las validaciones...
      if ($this->User->validates()) {
        // Registramos el usuario en el foro
        $datos = array(
          'username'      => $this->data['User']['username'],
          'user_password' => $password,
          'user_email'    => $this->data['User']['email']
        );
        if ($userForumId = $this->PhpBB3->register($datos)) {
          // En caso de haber registrado al usuario correctamente guardamos la variable con su id del foro
          $this->data['User']['forum_id'] = $userForumId;
          if ($this->User->save($this->data, false)) {
            $this->Session->setFlash(__('Usuario registrado correctamente', true));
            $this->redirect('/');
          } else {
            $this->Session->setFlash(__('Ha habido algún error al registrarte...', true));
          }
        } else {
          $this->Session->setFlash(__('Ha habido algún error al registrarte...', true));
        }
      }
    }
  }
}
~~~

Como podéis ver en el ejemplo, una vez he registrado al usuario en el foro me quedo con la ID del usuario creado y es entonces cuando registro al usuario en el sistema, para poder disponer de esta ID.

Si no guardáis la ID del usuario en vuestra base de datos de Cake no podréis hacer nada una vez registrado el usuario. Es decir, no podréis hacer ni el login, ni un cambio de contraseña ni nada de nada. Así que es vital que guardéis su ID.

Bien, en principio esta parte ya la tenemos. Ahora mismo al registrarse alguien en vuestro sistema queda registrado en el foro y en la base de datos de CakePHP.

Ap!! Pero alto, si lo probáis no funcionará. Adelante, haced la prueba. Es necesaria para seguir adelante.

## Errores fatales :s
{: #phpbb-quart }

Si estáis utilizando caché, lo más seguro es que el primer error que veáis sea este:

> **Fatal error:** Cannot redeclare class cache in ...

Esto sucede porque el núcleo de Cake utiliza una classe que se llama igual que una del núcleo de phpBB3 (cache, en este caso). Estuve varios meses dándole vueltas a este asunto y la mejor solución que encontré fue modificar algunos ficheros de phpBB3, así que vamos a ello. No os preocupéis, tan solo modificaremos unos pocos ficheros:

Básicamente lo que hay que hacer es renombrar la clase **cache**. Primero modificaremos el nombre de la clase y luego pasaremos a cambiar aquellas líneas de código donde se instancíe la clase.

Abrid <em>phpBB3/includes/cache.php</em> y buscad lo siguiente (en la línea 23 aproximadamente):

~~~php?start_inline=1
class cache extends acm
~~~

Substituidlo por:

~~~php?start_inline=1
class fcache extends acm
~~~

Guardad el fichero y cerradlo. Ahora abrid estos ficheros:

<ul>
  <li><em>phpBB3/common.php</em></li>
  <li><em>phpBB3/style.php</em></li>
  <li><em>phpBB3/download/file.php</em></li>
</ul>

Buscad esto en cada uno de ellos:

~~~php?start_inline=1
new cache();
~~~

Y reemplazadlo por:

~~~php?start_inline=1
new fcache();
~~~

Hecho esto (y una vez guardados los ficheros, por supuesto..) subís los ficheros al servidor y el foro debería seguir funcionando correctamente.

¡Aps! ¿Que no os funciona correctamente? Si, como yo, habéis creado el sistema de usuarios utilizando la palabra "users", tendréis otro error fatal:

> **Fatal error:** Cannot redeclare class user...

Del mismo modo que con la caché, la mejor forma de solucionar esto es modificando phpBB3. Abrid el fichero phpBB3/includes/session.php y buscad lo siguiente (en la línea 1376 aproximadamente):

~~~php?start_inline=1
class user extends session
~~~

Y reemplazadlo por...

~~~php?start_inline=1
class fuser extends session
~~~

Ahora abrid el fichero <em>phpBB3/common.php</em> y buscad lo siguiente:

~~~php?start_inline=1
new user();
~~~

Y reemplazadlo por:

~~~php?start_inline=1
new fuser();
~~~

Ahora sí que sí :D. Vuestro registro de usuarios, así como vuestra instalación de phpBB, deberían funcionar perfectamente ;)

## Login de usuarios
{: #phpbb-cinque }

Bien, ahora pasaremos a la creación de la vista **login.ctp**:

~~~php
<?php
// /app/views/users/login.ctp
echo $form->create('User', array('action' => 'login'));
echo $form->input('User.username', array('label' => __('Nombre', true)));
// Utilizamos 'pass' para que Auth no nos encripte la contraseña automáticamente
echo $form->input('User.pass', array('label' => __('Contraseña', true), 'type' => 'password'));
// Guardamos el referer para saber si el usuario viene del foro y así poderle enviar de nuevo al finalizar el login
echo $form->hidden('User.referer',array('value' => @$_SERVER['HTTP_REFERER']));
// Nota: Recordar entre sesiones funciona en el foro. Si no tenéis algún componente o método para recordar sesiones en Cake, quizás os interese utilizar alguno.
echo $form->input('User.remember_me',array('type' => 'checkbox','label' => __('Recordar entre sesiones', true)));
echo $form->end(__('Iniciar sesión', true));
~~~

Es importante que guardemos la contraseña con un nombre de campo distinto a <em>password</em> ya que necesitamos la contraseña sin encriptar para poder iniciar sesión en el foro.

Pasemos al método <em>login</em> de nuestro controlador de usuarios. Ya que estamos, también añadiremos el de <em>logout</em>:

~~~php?start_inline=1
// /app/controllers/users_controller.php
function login()
{
  if (!empty($this->data)) {
    // Guardamos la contraseña encriptada para iniciar sesión en Cake
    $this->data['User']['password'] = $this->Auth->password($this->data['User']['pass']);
    // Iniciamos sesión en Cake
    if ($this->Auth->login($this->data)) {
      // Iniciamos sesión en PhpBB. Si tenemos el campo 'remember_me' se lo pasamos como tercer parámetro.
      $this->PhpBB3->login($this->data['User']['username'], $this->data['User']['pass'], $this->data['User']['remember_me']);
      $this->Session->setFlash('Sessió iniciada correctament','flash_info',array(),'auth');
      // Verifico si el usuario viene del dominio principal
      if (!preg_match('/^http:\/\/(www\.)?underave\.net/', $this->data['User']['referer']) && !empty($this->data['User']['referer'])) {
        // Limpio la URL de posibles ids de sesión del foro (para evitar que éste cierre la sesión por seguridad)
        $referer = preg_replace('/^(.+)sid=[0-9a-z]+/i', '$1', $this->data['User']['referer']);
      }
      // Si viene del dominio principal lo redirigiremos con el método Auth->redirect()
      else $referer = $this->Auth->redirect();

      $this->redirect($referer);
    }
  }
}

function logout()
{
  $this->PhpBB3->logout();
  $this->redirect($this->Auth->logout());
}

~~~

En las **líneas 13 a 17** lo que hago es verificar si el usuario viene de mi dominio principal. Lo hago así porque en mi caso tengo los foros en un subdominio. Si no es vuestro caso deberéis modificar la expresión regular para que se ajuste a vuestras necesidades.

Si, como yo, tenéis los foros en un subdominio debéis saber que necesitáis tener las cookies configuradas para que funcionen entre vuestros subdominios y vuestro dominio principal. Para hacerlo, primero de todo id a vuestro panel de control del foro. En la barra lateral de la pestaña "General" veréis un grupo de opciones: "Configuración del servidor". Ahí dentro tenéis un enlace para acceder a la configuración de las cookies.

Dentro de esta configuración, debéis poner como dominio de las cookies un punto seguido de vuestro nombre de dominio. En mi caso **.underave.net**. El punto delante del dominio es importante porque algunos navegadores no reconocerían los subdominios sin él.

En directorio de la cookie aseguraros que apunta a la raíz del dominio: **/**

Ahora debéis aseguraros que en vuestro php.ini (o utilizando el método php ini_set) tenéis las cookies también configuradas como en el foro:

[sourcecode language="plain"]; The path for which the cookie is valid.
session.cookie_path = /
; The domain for which the cookie is valid.
session.cookie_domain = .underave.net[/sourcecode]

Hecho esto y subido vuestro php.ini al servidor (antes de subirlo quizás os interese echar un ojo al resto de opciones para ver qué se cuece por ahí) el login de usuarios ya debe funcionar sin problema alguno :)

## Y si el usuario quisiera cambiar alguno de sus datos?
{: #phpbb-sise }

A mi parecer, es importante que el usuario no tenga que actualizar sus datos varias veces. Es decir, si el usuario cambia su e-mail o su contraseña desde nuestra aplicación Cake, es importante que éste dato se actualice también en el foro.

Además, sería interesante modificar todos los enlaces de phpBB del perfil de usuario que tengan que ver con la edición de datos personales para que éstos enlacen hacia nuestra aplicación Cake.

Si antes he creado una conexión hacia nuestra base de datos de phpBB así como un modelo llamado <em>Forum</em> ha sido porque a partir de ahora trabajaremos con la base de datos en lugar de con el componente. ¿Porqué? Porque así veis que todo esto que hemos estado haciendo es posible hacerlo sin utilizar los métodos del núcleo de phpBB3. ¿Todo? Bueno no, todo no. Para el login de usuarios seguramente será necesario que utilicéis el componente (a no ser que intentéis crear a mano las cookies vosotros mismos).

El método que crearemos ahora será para cambiar la contraseña ya que el cambio de contraseña quizás sea de los datos del perfil más difíciles de modificar. Después de ver el ejemplo añadid tantos métodos como necesitéis (cambio de e-mail, de avatar ...).

Para cambiar cualquier dato de los usuarios del foro sería interesante tener un método en nuestro modelo Forum:

~~~php?start_inline=1
// /app/models/forum.php
/**
 * Actualiza un dato ($field) de un usuario a
 * partir de su $id en el foro con el valor $value
 *
 * @param integer $id of user
 * @param string $field to update
 * @param mixed $value
 * @return boolean true on success, false on failure
 */
function setUserField($id, $field, $value)
{
  $this->setSource('users');
  $this->primaryKey = 'user_id';
  $this->id = $id;
  return $this->saveField($field, $value);
}
~~~

Añadamos una vista para el cambio de contraseña:

~~~php
// /app/views/users/change_password.ctp
<?php
echo $form->create('User', array('action' => 'changePassword'));
echo $form->input('old_passwd', array('label' => __('Contraseña actual', true),'type' => 'password','type','value' => ''));
echo $form->input('password', array('label' => __('Contraseña', true),'type' => 'password','value' => ''));
echo $form->input('confirm_passwd', array('label' => __('Confirma la contraseña', true),'type' => 'password','value' => ''));
echo $form->end(__('Cambiar contraseña', true));
~~~

Y aquí viene el método de cambiar contraseña (está creado en el controlador usuarios pero no estaría de más separarlo un poco entre modelo y controlador):

~~~php?start_inline=1
// /app/controllers/users_controller.php
function changePassword()
{
  if (!empty($this->data)) {
    // Buscamos el usuario actual en la base de datos
    $user = $this->User->findById($this->Auth->user('id'));
    // Cargamos los datos en el modelo (para validarlos)
    $this->User->set($this->data);
    // Encriptamos la contraseña antigua para validarla
    $this->data['User']['old_passwd'] = $this->Auth->password($this->data['User']['old_passwd']);
    // Validamos y verificamos que la contraseña introducida coincide con la de la BDD
    if ($this->User->validates() && $this->data['User']['old_passwd'] == $user['User']['password']) {
      $password = $this->data['User']['password'];
      // Actualizamos la contraseña del foro
      $this->Forum->setUserField($user['User']['forums_id'], 'user_password', $this->Auth->password($this->data['User']['password']));
      // Actualizamos la contraseña del sistema
      $this->User->updateAll(array('User.password'=>'''.$this->Auth->password($password).'''),array('User.id'=>$user['User']['id']));
      $this->Session->setFlash(__('Tu contraseña ha sido cambiada con éxito', true),'flash_info');
      $this->redirect(array('controller'=>'users','action'=>'profile'));
    }
    // Si la contraseña no coincide con la guardada en la BDD mostramos error.
    if ($this->data['User']['old_passwd'] != $user['User']['password']) {
      $this->User->invalidate('old_passwd',__('La contraseña no es correcta', true));
    }
  }
}
~~~

Con esto ya podéis cambiar la contraseña en todo el sistema y ya sabéis cómo hacer para modificar el resto de datos. Al actualizar la contraseña he utilizado <em>user_password</em> como nombre de celda. Consultad vuestra base de datos de phpBB para saber los nombres de las celdas a actualizar.

Si quisierais utilizar la vía del componente y así no tener que utilizar la base de datos y el modelo Forum tendríais que añadir un método en el componente PhpBB3 que actualizara la celda. Para crear dicho método podéis consultar la documentación de phpBB3:

<blockquote>
  <ul>
    <li><a rel="nofollow" href="http://area51.phpbb.com/docs/code/" target="_blank">Especificaciones de métodos y clases de phpBB 3</a></li>
  </ul>
  <em>**Pista:** Seguramente necesitaréis utilizar la clase 'user' (cambiada por nosotros a fuser, recordad!!) y su método <a rel="nofollow" href="http://area51.phpbb.com/docs/code/phpBB3/user.html#optionset" target="_blank">optionset()</a>.</em>
</blockquote>

### Modificando vuestra plantilla de phpBB
{: #phpbb-sete }

Ahora sólo os faltaría modificar vuestra plantilla de phpBB para enlazar hacia vuestra aplicación Cake, con el registro de usuarios, el login y la edición de datos de vuestro perfil.

Podéis enlazar a ella o, en el caso de la edición de datos del perfil, tratar de modificar los formularios de phpBB para que envíen a la aplicación Cake y luego hacer algo como en el login con el referer para poder redirigir al usuario de nuevo al foro.

Esto lo dejo en vuestras manos dado que la solución es bastante abierta y ya llevo mucho rato <em>dándoos la tabarra</em>. Además, me parece que con las pistas que he dado ya tenéis más que suficiente para empezar ;)

Pues con esto creo que ya hemos terminado. Si veis cualquier fallo u os peta la aplicación por algún lado no dudéis en preguntar, comentar y despotricar sobre mí. Tened en cuenta que he modificado el código considerablemente (desde el propio Wordpress...) para tratar de simplificarlo y puede que me haya comido alguna línea o incluso hasta algún apartado entero (esperemos que no...).

En cuanto vea vuestros comentarios trataré de contestarlos :)
