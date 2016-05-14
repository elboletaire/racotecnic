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
  \"con clase\" utilizando el framework de JavaScript jQuery.\r\n\r\nSi no tenéis
  ni idea de Cake pero utilizáis un poco el tarro seguro que podréis aprovechar este
  mismo ejemplo para <strong>leer hilos RSS mediante PHP y jQuery</strong> (una pista:
  empezad por eliminar todo lo que tenga que ver con la caché).\r\n\r\n<blockquote>\r\n
<ul>\r\n\t<li>Ejemplo
  en <a title=\"Visitar underave\" href=\"http://www.underave.net/barna23/\">underave</a>:
  <a href=\"http://www.underave.net/barna23/blogs\">http://www.underave.net/barna23/blogs</a></li>\r\n\t<li>Ejemplo
  del tutorial: <a href=\"http://www.racotecnic.com/tutorials/cake/pages/blogs\">http://www.racotecnic.com/tutorials/cake/pages/blogs</a></li>\r\n\t<li><a
  href=\"http://www.racotecnic.com/tutorials/2009/11/rss_cake.zip\">Descargar ficheros
  del ejemplo</a></li>\r\n</ul>\r\n</blockquote>\r\nPara este tutorial sólo necesitáis
  <a rel=\"nofollow\" href=\"http://www.jquery.com\" target=\"_blank\">jQuery</a>
  (yo utilizo la v. 1.3.2) y <a rel=\"nofollow\" href=\"http://www.cakephp.org\" target=\"_blank\">CakePHP</a>
  (en mi caso la v. 1.2.4.8284 [1.2.5 stable]).\r\n\r\n"
wordpress_id: 1177
wordpress_url: http://racotecnic.underave.net/?p=1177
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

Si no tenéis ni idea de Cake pero utilizáis un poco el tarro seguro que podréis aprovechar este mismo ejemplo para <strong>leer hilos RSS mediante PHP y jQuery</strong> (una pista: empezad por eliminar todo lo que tenga que ver con la caché).
<blockquote>

<ul>
<li>Ejemplo en <a title="Visitar underave" href="http://www.underave.net/barna23/">underave</a>: <a href="http://www.underave.net/barna23/blogs">http://www.underave.net/barna23/blogs</a></li>
<li>Ejemplo del tutorial: <a href="http://www.racotecnic.com/tutorials/cake/pages/blogs">http://www.racotecnic.com/tutorials/cake/pages/blogs</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/11/rss_cake.zip">Descargar ficheros del ejemplo</a></li>
</ul>
</blockquote>

Para este tutorial sólo necesitáis <a rel="nofollow" href="http://www.jquery.com" target="_blank">jQuery</a> (yo utilizo la v. 1.3.2) y <a rel="nofollow" href="http://www.cakephp.org" target="_blank">CakePHP</a> (en mi caso la v. 1.2.4.8284 [1.2.5 stable]).

<a id="more"></a><a id="more-1177"></a><br />
Vamos a utilizar nuestro fichero <i>pages_controller.php</i> para gestionar los hilos. Si no lo tenéis creado, creadlo. Recordad que debéis hacerlo en la carpeta <i>/app/controllers/</i> y que el contenido de este fichero debe ser, para empezar, idéntico que el fichero <i>/cake/libs/controller/pages_controller.php</i>; algo así:

[php highlight="5,6"]<?php // /app/controllers/pages_controller.php<br />
class PagesController extends AppController {<br />
	var $name = 'Pages';<br />
	var $uses = array();<br />
	var $components = array('RequestHandler');<br />
	var $cacheDuration = '+3 hours';

	function display()<br />
	{<br />
		$path = func_get_args();

		$count = count($path);<br />
		if (!$count) {<br />
			$this->redirect('/');<br />
		}<br />
		$page = $subpage = $title = null;

		if (!empty($path[0])) {<br />
			$page = $path[0];<br />
		}<br />
		if (!empty($path[1])) {<br />
			$subpage = $path[1];<br />
		}<br />
		if (!empty($path[$count - 1])) {<br />
			$title = Inflector::humanize($path[$count - 1]);<br />
		}<br />
		$this->set(compact('page', 'subpage', 'title'));<br />
		$this->render(join('/', $path));<br />
	}<br />
}[/php]

Para ahorrar tiempo he añadido ya —en azul— un par de cosas que vamos a necesitar.

En la <b>línea 5</b> he añadido el "<a href="http://book.cakephp.org/view/174/request-handling" target="_blank" rel="nofollow">RequestHandler</a>" ya que vamos a trabajar con Ajax y necesitaremos uno de sus métodos.

En la <b>línea 6</b> he inicializado la variable <i>$cacheDuration</i> donde almacenamos el tiempo de actualización de la caché (3 horas en el caso del ejemplo). Si lo preferís podéis iniciarla más adelante como una variable normal dentro de un método en lugar de crearla como variable de clase.

Sabiendo esto, pasemos a la creación del resto de métodos del controlador <i>PagesController</i>:<br />
[php]// continuación de /app/controllers/pages_controller.php<br />
function beforeFilter()<br />
{<br />
	// Desactivamos debug para todo el controlador<br />
	Configure::write('debug',0);<br />
	// En caso de utilizar el componente Auth, damos permiso a las secciones necesarias<br />
	//$this->Auth->allowedActions = array('rss');<br />
	parent::beforeFilter();<br />
}

function rss($name = null, $limit = 8, $cache = true)<br />
{<br />
	// Desactivamos auto render de las vistas<br />
	$this->autoRender = false;<br />
	$options = compact('limit','cache');<br />
	// Si la solicitud es Ajax<br />
	if($this->RequestHandler->isAjax()){<br />
		// Cargamos layout ajax.ctp<br />
		$this->layout = 'ajax';<br />
		// Url según nombre recibido por parámetro<br />
		switch($name){<br />
			case 'psico':<br />
				$url = 'http://psicoactividad.underave.net/feed';<br />
				break;<br />
			case 'zeta':<br />
				$url = 'http://planzeta.underave.net/feed';<br />
				break;<br />
			case 'raco':<br />
				$url = 'http://www.racotecnic.com/feed';<br />
				break;<br />
			case 'underave':<br />
			default:<br />
				$url = 'http://blog.underave.net/feed';<br />
		}<br />
		// Obtenemos los hilos<br />
		if((isset($options['cache']) &amp;&amp; $options['cache'] == false) || ($feeds = Cache::read('$name.feed')) == false){<br />
			$feeds = $this->_getFeeds($url);<br />
			// Si el parámetro cache es true guardamos en caché<br />
			if($options['cache'] == true){<br />
				Cache::set(array('duration' => $this->cacheDuration));<br />
				Cache::write('$name.feed',$feeds);<br />
			}<br />
		}<br />
		// Limitamos los resultados<br />
		if(isset($options['limit']) &amp;&amp; count($feeds) > $options['limit'])<br />
			$feeds = array_slice($feeds, 0, $options['limit']);<br />
		// Guardamos la variable $data<br />
		$this->set('data', $feeds);<br />
		// Cargamos fichero json.ctp<br />
		$this->render('/ajax/json');<br />
	}else $this->redirect('/');<br />
}

private function _getFeeds($url)<br />
{<br />
	// Configuramos la conexión curl<br />
	$ch = curl_init();<br />
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);<br />
	curl_setopt($ch, CURLOPT_HEADER, 0);<br />
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);<br />
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);<br />
	curl_setopt($ch, CURLOPT_URL, $url);<br />
	// Ejecutamos la conexión<br />
	$feed = curl_exec($ch);<br />
	curl_close($ch);<br />
	// En caso de error detenemos ejecución<br />
	if(!$feed)  return false;<br />
	// Creamos objeto SimpleXmlElement<br />
	$xml = new SimpleXmlElement($feed);<br />
	// Leemos el hilo RSS y lo guardamos en la variable $out<br />
	foreach($xml->channel->item as $item){<br />
		$out[] = array(<br />
			'title' 		=> (string)$item->title,<br />
			'description' 	=> (string)$item->description,<br />
			'pubDate' 		=> strtotime($item->pubDate),<br />
			'link' 			=> (string)$item->link<br />
		);<br />
	}<br />
	// Devolvemos el hilo<br />
	return $out;<br />
  }[/php]

Como siempre digo, el código habla por si solo y para el resto están los comentarios ;) Sólo cabría mencionar un par de cosas:

El layout <em>ajax.ctp</em> (línea 19) no hace falta que lo creéis ya que CakePHP ya lo incluye en su núcleo.

El fichero <em>json.ctp</em> (línea 49) sólo contiene el <i>echo</i> de un <i>json_encode</i>:<br />
[php]<?php // /app/views/ajax/json.ctp<br />
echo json_encode($data) ?>[/php]

El fichero <i>json.ctp</i> lo he creado en la carpeta ajax porque todo lo relacionado con ajax lo meto en la carpeta /app/views/ajax/ para tenerlo todo en el mismo sitio. A demás, son ficheros tan genéricos que los utilizo desde casi todas las secciones así que ya me va bien tenerlos en una carpeta por separado.

Si lo preferís, en lugar de crear la vista json, podéis optar por hacer un <i>echo</i> de un <i>json_encode</i> en el controlador directamente, aunque eso rompe un poco con el patrón MVC.

<strong>Para que el método rss funcione es importante que creemos una ruta hacia /rss</strong>:<br />
[php]// /app/config/routes.php<br />
Router::connect('/rss/:feed',<br />
	array('controller'=>'pages','action'=>'rss'),<br />
	array(<br />
		'feed'=>'[a-z]+',<br />
		'pass'=>array('feed')<br />
	)<br />
);[/php]

Dicho esto, pasemos rápidamente a la vista que mostrará los hilos RSS (en mi caso la he llamado <i>blogs.ctp</i>):<br />
[php highlight="2,5,6,7"]// /app/views/pages/blogs.ctp<br />
<?php $javascript->link('page_specific/blogs',false) ?><br />

<?php echo $html->link('Leer hilos RSS en CakePHP utilizando jQuery','http://www.racotecnic.com/2009/11/leer-hilos-rss-en-cakephp-utilizando-jquery') ?><br />
<?php echo $html->link($html->image('http://www.underave.net/barna23/img/blogs/raco.png', array('alt'=>'Racó Tècnic', 'class'=>'titol_blog')),'http://www.racotecnic.com',array('target'=>'_blank'),false,false) ?><br />
<ul class='blogs' id='raco'><br />
	<li><?php __('Cargando') ?>...</li><br />
</ul><br />
<?php echo $html->link($html->image('http://www.underave.net/barna23/img/blogs/unde.png', array('alt'=>'Underave\'s Blog: Be underground', 'class'=>'titol_blog')),'http://blog.underave.net',null,false,false) ?><br />
<ul class='blogs' id='underave'><br />
	<li><?php __('Cargando') ?>...</li><br />
</ul><br />
<?php echo $html->link($html->image('http://www.underave.net/barna23/img/blogs/zeta.png', array('alt'=>'Plan [Zeta]', 'class'=>'titol_blog')),'http://planzeta.underave.net',array('target'=>'_blank'),false,false) ?><br />
<ul class='blogs' id='zeta'><br />
	<li><?php __('Cargando') ?>...</li><br />
</ul><br />
<?php echo $html->link($html->image('http://www.underave.net/barna23/img/blogs/psico.png', array('alt'=>'Psico Actividad', 'class'=>'titol_blog')),'http://psicoactividad.underave.net',array('target'=>'_blank'),false,false) ?><br />
<ul class='blogs' id='psico'><br />
	<li><?php __('Cargando') ?>...</li><br />
</ul>[/php]

En la <b>línea 2</b> he añadido el fichero javascript que se encargará de cargar los hilos RSS (y será el siguiente paso del tutorial).

En las <b>líneas 5, 6 y 7</b> (y luego se repite para cada blog) he añadido una lista de elementos con una ID cada uno.<strong> Esta ID debe coincidir con las opciones que hayáis puesto en el <i>switch</i> del método <i>rss</i></strong> (en <i>pages_controller.php</i>).

Sólo nos queda hacer el fichero JavaScript encargado de cargar los hilos:<br />
[js]// /app/webroot/js/page_specific/blogs.js<br />
$(function(){<br />
	// ID de cada blog (debe coincidir con las ID de la vista y las del controlador)<br />
	var blogs = ['underave','zeta','psico','raco'];<br />
	$.each(blogs, function(i, blog){<br />
		// Obtenemos JSON para cada blog<br />
		$.getJSON(webroot+'rss/'+blog,function(data){<br />
			// Ocultamos el texto 'Cargando...'<br />
			$('#'+blog).fadeOut('normal',function(){<br />
				// Eliminamos el texto 'Cargando...'<br />
				$(this).html('');<br />
				// Añadimos un ítem a la lista por cada enlace recibido<br />
				$.each(data, function(i, item){<br />
					$('<li><a href=''+item.link+'' target='_top'>'+item.title.substr(0,1).toUpperCase() + item.title.substr(1,item.title.length).toLowerCase()+'</a></li>').appendTo('#'+blog);<br />
				});<br />
				// Lo mostramos todo<br />
				$(this).fadeIn('normal');<br />
			});<br />
		});<br />
	});<br />
});[/js]

El trozo de item.title.subtr(0,1).toUpperCase() + item.title..... es una pijada mía para que salga sólo la primera letra en mayúscula y el resto en minúscula. Si lo queréis sacar simplemente poned "item.title" y ya estará ;)

Pues ya está, ya lo tenemos :D Si todo ha ido bien deberíais verlo parecido a alguno de los ejemplos.
<blockquote>

<ul>
<li>Ejemplo en <a title="Visitar underave" href="http://www.underave.net/barna23/">underave</a>: <a href="http://www.underave.net/barna23/blogs">http://www.underave.net/barna23/blogs</a></li>
<li>Ejemplo del tutorial: <a href="http://www.racotecnic.com/tutorials/cake/pages/blogs">http://www.racotecnic.com/tutorials/cake/pages/blogs</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/11/rss_cake.zip">Descargar ficheros del ejemplo</a></li>
</ul>
</blockquote>
