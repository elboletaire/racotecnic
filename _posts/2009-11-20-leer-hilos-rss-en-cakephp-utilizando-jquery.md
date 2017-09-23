---
layout: post
status: publish
published: true
title: Leer hilos RSS en CakePHP utilizando jQuery
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Con este pequeño tutorial aprenderéis a leer hilos RSS en CakePHP y mostrarlos
  \"con clase\" utilizando el framework de JavaScript jQuery."
wordpress_id: 1177
wordpress_url: http://racotecnic.com/?p=1177
redirect_from:
- "?p=1177"
date: '2009-11-20 14:41:14 +0100'
date_gmt: '2009-11-20 13:41:14 +0100'
categories:
- Programació
- Web
tags:
- PHP
- JavaScript
- jQuery
- RSS
- XML
- CakePHP
---

Con este pequeño tutorial aprenderéis a leer hilos RSS en CakePHP y mostrarlos "con clase" utilizando el framework de JavaScript jQuery.

Si no tenéis ni idea de Cake pero utilizáis un poco el tarro seguro que podréis aprovechar este mismo ejemplo para **leer hilos RSS mediante PHP y jQuery** (una pista: empezad por eliminar todo lo que tenga que ver con la caché).

<blockquote>
  <ul>
    <li>Ejemplo en <a title="Visitar underave" href="http://www.underave.net/barna23/">underave</a>: <a href="http://www.underave.net/barna23/blogs">http://www.underave.net/barna23/blogs</a></li>
    <li>Ejemplo del tutorial: <a href="http://www.racotecnic.com/tutorials/cake/pages/blogs">http://www.racotecnic.com/tutorials/cake/pages/blogs</a></li>
    <li><a href="http://www.racotecnic.com/tutorials/2009/11/rss_cake.zip">Descargar ficheros del ejemplo</a></li>
  </ul>
</blockquote>

Para este tutorial sólo necesitáis <a rel="nofollow" href="http://www.jquery.com" target="_blank">jQuery</a> (yo utilizo la v. 1.3.2) y <a rel="nofollow" href="http://www.cakephp.org" target="_blank">CakePHP</a> (en mi caso la v. 1.2.4.8284 [1.2.5 stable]).

<a id="more"></a><a id="more-1177"></a>

Vamos a utilizar nuestro fichero <i>pages_controller.php</i> para gestionar los hilos. Si no lo tenéis creado, creadlo. Recordad que debéis hacerlo en la carpeta <i>/app/controllers/</i> y que el contenido de este fichero debe ser, para empezar, idéntico que el fichero <i>/cake/libs/controller/pages_controller.php</i>; algo así:

~~~php
<?php
// /app/controllers/pages_controller.php
class PagesController extends AppController
{
  var $name = 'Pages';
  var $uses = array();
  var $components = array('RequestHandler');
  var $cacheDuration = '+3 hours';

  function display()
  {
    $path = func_get_args();

    $count = count($path);
    if (!$count) {
      $this->redirect('/');
    }
    $page = $subpage = $title = null;

    if (!empty($path[0])) {
      $page = $path[0];
    }
    if (!empty($path[1])) {
      $subpage = $path[1];
    }
    if (!empty($path[$count - 1])) {
      $title = Inflector::humanize($path[$count - 1]);
    }
    $this->set(compact('page', 'subpage', 'title'));
    $this->render(join('/', $path));
  }
}
~~~

Para ahorrar tiempo he añadido ya —en azul— un par de cosas que vamos a necesitar.

En la <b>línea 5</b> he añadido el "<a href="http://book.cakephp.org/view/174/request-handling" target="_blank" rel="nofollow">RequestHandler</a>" ya que vamos a trabajar con Ajax y necesitaremos uno de sus métodos.

En la <b>línea 6</b> he inicializado la variable <i>$cacheDuration</i> donde almacenamos el tiempo de actualización de la caché (3 horas en el caso del ejemplo). Si lo preferís podéis iniciarla más adelante como una variable normal dentro de un método en lugar de crearla como variable de clase.

Sabiendo esto, pasemos a la creación del resto de métodos del controlador <i>PagesController</i>:

~~~php?start_inline=1
// continuación de /app/controllers/pages_controller.php
function beforeFilter()
{
  // Desactivamos debug para todo el controlador
  Configure::write('debug', 0);
  // En caso de utilizar el componente Auth, damos permiso a las secciones necesarias
  //$this->Auth->allowedActions = array('rss');
  parent::beforeFilter();
}

function rss($name = null, $limit = 8, $cache = true)
{
  // Desactivamos auto render de las vistas
  $this->autoRender = false;
  $options = compact('limit','cache');
  // Si la solicitud es Ajax
  if ($this->RequestHandler->isAjax()) {
    // Cargamos layout ajax.ctp
    $this->layout = 'ajax';
    // Url según nombre recibido por parámetro
    switch ($name) {
      case 'psico':
        $url = 'http://psicoactividad.underave.net/feed';
        break;
      case 'zeta':
        $url = 'http://planzeta.underave.net/feed';
        break;
      case 'raco':
        $url = 'http://www.racotecnic.com/feed';
        break;
      case 'underave':
      default:
        $url = 'http://blog.underave.net/feed';
    }
    // Obtenemos los hilos
    if ((isset($options['cache']) && $options['cache'] == false) || ($feeds = Cache::read('$name.feed')) == false) {
      $feeds = $this->_getFeeds($url);
      // Si el parámetro cache es true guardamos en caché
      if ($options['cache'] == true) {
        Cache::set(array('duration' => $this->cacheDuration));
        Cache::write('$name.feed', $feeds);
      }
    }
    // Limitamos los resultados
    if (isset($options['limit']) && count($feeds) > $options['limit'])
      $feeds = array_slice($feeds, 0, $options['limit']);
    // Guardamos la variable $data
    $this->set('data', $feeds);
    // Cargamos fichero json.ctp
    $this->render('/ajax/json');
  } else $this->redirect('/');
}

private function _getFeeds($url)
{
  // Configuramos la conexión curl
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
  curl_setopt($ch, CURLOPT_URL, $url);
  // Ejecutamos la conexión
  $feed = curl_exec($ch);
  curl_close($ch);
  // En caso de error detenemos ejecución
  if (!$feed)  return false;
  // Creamos objeto SimpleXmlElement
  $xml = new SimpleXmlElement($feed);
  // Leemos el hilo RSS y lo guardamos en la variable $out
  foreach ($xml->channel->item as $item) {
    $out[] = array(
      'title'       => (string)$item->title,
      'description' => (string)$item->description,
      'pubDate'     => strtotime($item->pubDate),
      'link'        => (string)$item->link
    );
  }
  // Devolvemos el hilo
  return $out;
}
~~~

Como siempre digo, el código habla por si solo y para el resto están los comentarios ;) Sólo cabría mencionar un par de cosas:

El layout <em>ajax.ctp</em> (línea 19) no hace falta que lo creéis ya que CakePHP ya lo incluye en su núcleo.

El fichero <em>json.ctp</em> (línea 49) sólo contiene el <i>echo</i> de un <i>json_encode</i>:

~~~php
<?php // /app/views/ajax/json.ctp
echo json_encode($data);
~~~

El fichero <i>json.ctp</i> lo he creado en la carpeta ajax porque todo lo relacionado con ajax lo meto en la carpeta /app/views/ajax/ para tenerlo todo en el mismo sitio. A demás, son ficheros tan genéricos que los utilizo desde casi todas las secciones así que ya me va bien tenerlos en una carpeta por separado.

Si lo preferís, en lugar de crear la vista json, podéis optar por hacer un <i>echo</i> de un <i>json_encode</i> en el controlador directamente, aunque eso rompe un poco con el patrón MVC.

**Para que el método rss funcione es importante que creemos una ruta hacia /rss**:

~~~php?start_inline=1
// /app/config/routes.php
Router::connect('/rss/:feed',
  array('controller' => 'pages','action' => 'rss'),
  array(
    'feed' => '[a-z]+',
    'pass' => array('feed')
  )
);
~~~

Dicho esto, pasemos rápidamente a la vista que mostrará los hilos RSS (en mi caso la he llamado <i>blogs.ctp</i>):

~~~php
// /app/views/pages/blogs.ctp
<?php $javascript->link('page_specific/blogs',false) ?>

<?php echo $html->link('Leer hilos RSS en CakePHP utilizando jQuery','http://www.racotecnic.com/2009/11/leer-hilos-rss-en-cakephp-utilizando-jquery') ?>
<?php echo $html->link($html->image('http://www.underave.net/barna23/img/blogs/raco.png', array('alt'=>'Racó Tècnic', 'class'=>'titol_blog')),'http://www.racotecnic.com',array('target'=>'_blank'),false,false) ?>
<ul class='blogs' id='raco'>
  <li><?php __('Cargando') ?>...</li>
</ul>
<?php echo $html->link($html->image('http://www.underave.net/barna23/img/blogs/unde.png', array('alt'=>'Underave\'s Blog: Be underground', 'class'=>'titol_blog')),'http://blog.underave.net',null,false,false) ?>
<ul class='blogs' id='underave'>
  <li><?php __('Cargando') ?>...</li>
</ul>
<?php echo $html->link($html->image('http://www.underave.net/barna23/img/blogs/zeta.png', array('alt'=>'Plan [Zeta]', 'class'=>'titol_blog')),'http://planzeta.underave.net',array('target'=>'_blank'),false,false) ?>
<ul class='blogs' id='zeta'>
  <li><?php __('Cargando') ?>...</li>
</ul>
<?php echo $html->link($html->image('http://www.underave.net/barna23/img/blogs/psico.png', array('alt'=>'Psico Actividad', 'class'=>'titol_blog')),'http://psicoactividad.underave.net',array('target'=>'_blank'),false,false) ?>
<ul class='blogs' id='psico'>
  <li><?php __('Cargando') ?>...</li>
</ul>
~~~

En la <b>línea 2</b> he añadido el fichero javascript que se encargará de cargar los hilos RSS (y será el siguiente paso del tutorial).

En las <b>líneas 5, 6 y 7</b> (y luego se repite para cada blog) he añadido una lista de elementos con una ID cada uno.<strong> Esta ID debe coincidir con las opciones que hayáis puesto en el <i>switch</i> del método <i>rss</i></strong> (en <i>pages_controller.php</i>).

Sólo nos queda hacer el fichero JavaScript encargado de cargar los hilos:

~~~javascript
// /app/webroot/js/page_specific/blogs.js
jQuery(function($) {
  // ID de cada blog (debe coincidir con las ID de la vista y las del controlador)
  var blogs = ['underave', 'zeta', 'psico', 'raco'];
  $.each(blogs, function(i, blog) {
    // Obtenemos JSON para cada blog
    $.getJSON(webroot + 'rss/' + blog, function(data) {
      // Ocultamos el texto 'Cargando...'
      $('#' + blog).fadeOut('normal', function() {
        // Eliminamos el texto 'Cargando...'
        $(this).html('');
        // Añadimos un ítem a la lista por cada enlace recibido
        $.each(data, function(i, item) {
          $('<li><a href="' + item.link + '" target="_top">' + item.title.substr(0, 1).toUpperCase() + item.title.substr(1, item.title.length).toLowerCase() + '</a></li>').appendTo('#' + blog);
        });
        // Lo mostramos todo
        $(this).fadeIn('normal');
      });
    });
  });
});
~~~

El trozo de item.title.subtr(0,1).toUpperCase() + item.title..... es una pijada mía para que salga sólo la primera letra en mayúscula y el resto en minúscula. Si lo queréis sacar simplemente poned "item.title" y ya estará ;)

Pues ya está, ya lo tenemos :D Si todo ha ido bien deberíais verlo parecido a alguno de los ejemplos.

<blockquote>
  <ul>
    <li>Ejemplo en <a title="Visitar underave" href="http://www.underave.net/barna23/">underave</a>: <a href="http://www.underave.net/barna23/blogs">http://www.underave.net/barna23/blogs</a></li>
    <li>Ejemplo del tutorial: <a href="http://www.racotecnic.com/tutorials/cake/pages/blogs">http://www.racotecnic.com/tutorials/cake/pages/blogs</a></li>
    <li><a href="http://www.racotecnic.com/tutorials/2009/11/rss_cake.zip">Descargar ficheros del ejemplo</a></li>
  </ul>
</blockquote>
