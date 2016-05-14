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
  empezad por eliminar todo lo que tenga que ver con la caché).\r\n\r\n<blockquote>\r\n<ul>\r\n\t<li>Ejemplo
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
<p>Con este pequeño tutorial aprenderéis a leer hilos RSS en CakePHP y mostrarlos "con clase" utilizando el framework de JavaScript jQuery.</p>
<p>Si no tenéis ni idea de Cake pero utilizáis un poco el tarro seguro que podréis aprovechar este mismo ejemplo para <strong>leer hilos RSS mediante PHP y jQuery</strong> (una pista: empezad por eliminar todo lo que tenga que ver con la caché).</p>
<blockquote>
<ul>
<li>Ejemplo en <a title="Visitar underave" href="http://www.underave.net/barna23/">underave</a>: <a href="http://www.underave.net/barna23/blogs">http://www.underave.net/barna23/blogs</a></li>
<li>Ejemplo del tutorial: <a href="http://www.racotecnic.com/tutorials/cake/pages/blogs">http://www.racotecnic.com/tutorials/cake/pages/blogs</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/11/rss_cake.zip">Descargar ficheros del ejemplo</a></li>
</ul>
</blockquote>
<p>Para este tutorial sólo necesitáis <a rel="nofollow" href="http://www.jquery.com" target="_blank">jQuery</a> (yo utilizo la v. 1.3.2) y <a rel="nofollow" href="http://www.cakephp.org" target="_blank">CakePHP</a> (en mi caso la v. 1.2.4.8284 [1.2.5 stable]).</p>
<p><a id="more"></a><a id="more-1177"></a><br />
Vamos a utilizar nuestro fichero <i>pages_controller.php</i> para gestionar los hilos. Si no lo tenéis creado, creadlo. Recordad que debéis hacerlo en la carpeta <i>/app/controllers/</i> y que el contenido de este fichero debe ser, para empezar, idéntico que el fichero <i>/cake/libs/controller/pages_controller.php</i>; algo así:</p>
<p>[php highlight="5,6"]&lt;?php // /app/controllers/pages_controller.php<br />
class PagesController extends AppController {<br />
	var $name = 'Pages';<br />
	var $uses = array();<br />
	var $components = array('RequestHandler');<br />
	var $cacheDuration = '+3 hours';</p>
<p>	function display()<br />
	{<br />
		$path = func_get_args();</p>
<p>		$count = count($path);<br />
		if (!$count) {<br />
			$this-&gt;redirect('/');<br />
		}<br />
		$page = $subpage = $title = null;</p>
<p>		if (!empty($path[0])) {<br />
			$page = $path[0];<br />
		}<br />
		if (!empty($path[1])) {<br />
			$subpage = $path[1];<br />
		}<br />
		if (!empty($path[$count - 1])) {<br />
			$title = Inflector::humanize($path[$count - 1]);<br />
		}<br />
		$this-&gt;set(compact('page', 'subpage', 'title'));<br />
		$this-&gt;render(join('/', $path));<br />
	}<br />
}[/php]</p>
<p>Para ahorrar tiempo he añadido ya —en azul— un par de cosas que vamos a necesitar.</p>
<p>En la <b>línea 5</b> he añadido el "<a href="http://book.cakephp.org/view/174/request-handling" target="_blank" rel="nofollow">RequestHandler</a>" ya que vamos a trabajar con Ajax y necesitaremos uno de sus métodos.</p>
<p>En la <b>línea 6</b> he inicializado la variable <i>$cacheDuration</i> donde almacenamos el tiempo de actualización de la caché (3 horas en el caso del ejemplo). Si lo preferís podéis iniciarla más adelante como una variable normal dentro de un método en lugar de crearla como variable de clase.</p>
<p>Sabiendo esto, pasemos a la creación del resto de métodos del controlador <i>PagesController</i>:<br />
[php]// continuación de /app/controllers/pages_controller.php<br />
function beforeFilter()<br />
{<br />
	// Desactivamos debug para todo el controlador<br />
	Configure::write('debug',0);<br />
	// En caso de utilizar el componente Auth, damos permiso a las secciones necesarias<br />
	//$this-&gt;Auth-&gt;allowedActions = array('rss');<br />
	parent::beforeFilter();<br />
}</p>
<p>function rss($name = null, $limit = 8, $cache = true)<br />
{<br />
	// Desactivamos auto render de las vistas<br />
	$this-&gt;autoRender = false;<br />
	$options = compact('limit','cache');<br />
	// Si la solicitud es Ajax<br />
	if($this-&gt;RequestHandler-&gt;isAjax()){<br />
		// Cargamos layout ajax.ctp<br />
		$this-&gt;layout = 'ajax';<br />
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
		if((isset($options['cache']) &amp;&amp; $options['cache'] == false) || ($feeds = Cache::read(&quot;$name.feed&quot;)) == false){<br />
			$feeds = $this-&gt;_getFeeds($url);<br />
			// Si el parámetro cache es true guardamos en caché<br />
			if($options['cache'] == true){<br />
				Cache::set(array('duration' =&gt; $this-&gt;cacheDuration));<br />
				Cache::write(&quot;$name.feed&quot;,$feeds);<br />
			}<br />
		}<br />
		// Limitamos los resultados<br />
		if(isset($options['limit']) &amp;&amp; count($feeds) &gt; $options['limit'])<br />
			$feeds = array_slice($feeds, 0, $options['limit']);<br />
		// Guardamos la variable $data<br />
		$this-&gt;set('data', $feeds);<br />
		// Cargamos fichero json.ctp<br />
		$this-&gt;render('/ajax/json');<br />
	}else $this-&gt;redirect('/');<br />
}</p>
<p>private function _getFeeds($url)<br />
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
	foreach($xml-&gt;channel-&gt;item as $item){<br />
		$out[] = array(<br />
			'title' 		=&gt; (string)$item-&gt;title,<br />
			'description' 	=&gt; (string)$item-&gt;description,<br />
			'pubDate' 		=&gt; strtotime($item-&gt;pubDate),<br />
			'link' 			=&gt; (string)$item-&gt;link<br />
		);<br />
	}<br />
	// Devolvemos el hilo<br />
	return $out;<br />
  }[/php]</p>
<p>Como siempre digo, el código habla por si solo y para el resto están los comentarios ;) Sólo cabría mencionar un par de cosas:</p>
<p>El layout <em>ajax.ctp</em> (línea 19) no hace falta que lo creéis ya que CakePHP ya lo incluye en su núcleo.</p>
<p>El fichero <em>json.ctp</em> (línea 49) sólo contiene el <i>echo</i> de un <i>json_encode</i>:<br />
[php]&lt;?php // /app/views/ajax/json.ctp<br />
echo json_encode($data) ?&gt;[/php]</p>
<p>El fichero <i>json.ctp</i> lo he creado en la carpeta ajax porque todo lo relacionado con ajax lo meto en la carpeta /app/views/ajax/ para tenerlo todo en el mismo sitio. A demás, son ficheros tan genéricos que los utilizo desde casi todas las secciones así que ya me va bien tenerlos en una carpeta por separado.</p>
<p>Si lo preferís, en lugar de crear la vista json, podéis optar por hacer un <i>echo</i> de un <i>json_encode</i> en el controlador directamente, aunque eso rompe un poco con el patrón MVC.</p>
<p><strong>Para que el método rss funcione es importante que creemos una ruta hacia /rss</strong>:<br />
[php]// /app/config/routes.php<br />
Router::connect('/rss/:feed',<br />
	array('controller'=&gt;'pages','action'=&gt;'rss'),<br />
	array(<br />
		'feed'=&gt;'[a-z]+',<br />
		'pass'=&gt;array('feed')<br />
	)<br />
);[/php]</p>
<p>Dicho esto, pasemos rápidamente a la vista que mostrará los hilos RSS (en mi caso la he llamado <i>blogs.ctp</i>):<br />
[php highlight="2,5,6,7"]// /app/views/pages/blogs.ctp<br />
&lt;?php $javascript-&gt;link('page_specific/blogs',false) ?&gt;<br />
&lt;p&gt;&lt;?php echo $html-&gt;link('Leer hilos RSS en CakePHP utilizando jQuery','http://www.racotecnic.com/2009/11/leer-hilos-rss-en-cakephp-utilizando-jquery') ?&gt;&lt;/p&gt;<br />
&lt;?php echo $html-&gt;link($html-&gt;image('http://www.underave.net/barna23/img/blogs/raco.png', array('alt'=&gt;'Racó Tècnic', 'class'=&gt;'titol_blog')),'http://www.racotecnic.com',array('target'=&gt;'_blank'),false,false) ?&gt;<br />
&lt;ul class=&quot;blogs&quot; id=&quot;raco&quot;&gt;<br />
	&lt;li&gt;&lt;?php __(&quot;Cargando&quot;) ?&gt;...&lt;/li&gt;<br />
&lt;/ul&gt;<br />
&lt;?php echo $html-&gt;link($html-&gt;image('http://www.underave.net/barna23/img/blogs/unde.png', array('alt'=&gt;'Underave\'s Blog: Be underground', 'class'=&gt;'titol_blog')),'http://blog.underave.net',null,false,false) ?&gt;<br />
&lt;ul class=&quot;blogs&quot; id=&quot;underave&quot;&gt;<br />
	&lt;li&gt;&lt;?php __(&quot;Cargando&quot;) ?&gt;...&lt;/li&gt;<br />
&lt;/ul&gt;<br />
&lt;?php echo $html-&gt;link($html-&gt;image('http://www.underave.net/barna23/img/blogs/zeta.png', array('alt'=&gt;'Plan [Zeta]', 'class'=&gt;'titol_blog')),'http://planzeta.underave.net',array('target'=&gt;'_blank'),false,false) ?&gt;<br />
&lt;ul class=&quot;blogs&quot; id=&quot;zeta&quot;&gt;<br />
	&lt;li&gt;&lt;?php __(&quot;Cargando&quot;) ?&gt;...&lt;/li&gt;<br />
&lt;/ul&gt;<br />
&lt;?php echo $html-&gt;link($html-&gt;image('http://www.underave.net/barna23/img/blogs/psico.png', array('alt'=&gt;'Psico Actividad', 'class'=&gt;'titol_blog')),'http://psicoactividad.underave.net',array('target'=&gt;'_blank'),false,false) ?&gt;<br />
&lt;ul class=&quot;blogs&quot; id=&quot;psico&quot;&gt;<br />
	&lt;li&gt;&lt;?php __(&quot;Cargando&quot;) ?&gt;...&lt;/li&gt;<br />
&lt;/ul&gt;[/php]</p>
<p>En la <b>línea 2</b> he añadido el fichero javascript que se encargará de cargar los hilos RSS (y será el siguiente paso del tutorial).</p>
<p>En las <b>líneas 5, 6 y 7</b> (y luego se repite para cada blog) he añadido una lista de elementos con una ID cada uno.<strong> Esta ID debe coincidir con las opciones que hayáis puesto en el <i>switch</i> del método <i>rss</i></strong> (en <i>pages_controller.php</i>).</p>
<p>Sólo nos queda hacer el fichero JavaScript encargado de cargar los hilos:<br />
[js]// /app/webroot/js/page_specific/blogs.js<br />
$(function(){<br />
	// ID de cada blog (debe coincidir con las ID de la vista y las del controlador)<br />
	var blogs = ['underave','zeta','psico','raco'];<br />
	$.each(blogs, function(i, blog){<br />
		// Obtenemos JSON para cada blog<br />
		$.getJSON(webroot+'rss/'+blog,function(data){<br />
			// Ocultamos el texto &quot;Cargando...&quot;<br />
			$('#'+blog).fadeOut('normal',function(){<br />
				// Eliminamos el texto &quot;Cargando...&quot;<br />
				$(this).html('');<br />
				// Añadimos un ítem a la lista por cada enlace recibido<br />
				$.each(data, function(i, item){<br />
					$('&lt;li&gt;&lt;a href=&quot;'+item.link+'&quot; target=&quot;_top&quot;&gt;'+item.title.substr(0,1).toUpperCase() + item.title.substr(1,item.title.length).toLowerCase()+'&lt;/a&gt;&lt;/li&gt;').appendTo(&quot;#&quot;+blog);<br />
				});<br />
				// Lo mostramos todo<br />
				$(this).fadeIn('normal');<br />
			});<br />
		});<br />
	});<br />
});[/js]</p>
<p>El trozo de item.title.subtr(0,1).toUpperCase() + item.title..... es una pijada mía para que salga sólo la primera letra en mayúscula y el resto en minúscula. Si lo queréis sacar simplemente poned "item.title" y ya estará ;)</p>
<p>Pues ya está, ya lo tenemos :D Si todo ha ido bien deberíais verlo parecido a alguno de los ejemplos.</p>
<blockquote>
<ul>
<li>Ejemplo en <a title="Visitar underave" href="http://www.underave.net/barna23/">underave</a>: <a href="http://www.underave.net/barna23/blogs">http://www.underave.net/barna23/blogs</a></li>
<li>Ejemplo del tutorial: <a href="http://www.racotecnic.com/tutorials/cake/pages/blogs">http://www.racotecnic.com/tutorials/cake/pages/blogs</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/11/rss_cake.zip">Descargar ficheros del ejemplo</a></li>
</ul>
</blockquote>
