---
layout: post
status: publish
published: true
title: Crear un Podcast en CakePHP
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<img class=\"alignright size-full wp-image-1761\" style=\"margin-left: 20px;\"
  title=\"podcast icon\" src=\"http://www.racotecnic.com/wp-content/uploads/2011/01/podcast_icon.png\"
  alt=\"\" width=\"200\" height=\"200\" />El otro día expliqué <a href=\"http://www.racotecnic.com/2011/01/unir-ficheros-mp3-en-un-unico-fichero-mp3-con-cakephp/\"
  target=\"_self\"><strong>cómo unir ficheros mp3 en un mismo fichero</strong></a>
  y dije que dejaría para más tarde lo de la creación del <strong>Podcast</strong>.
  Vamos a ello pues.\r\n\r\nPara <strong>crear nuestro Podcast</strong> necesitaremos,
  a parte de CakePHP, la librería getid3, ya que para que itunes coja bien las imágenes
  de cada podcast lo mejor que podemos hacer es añadir la imagen al mp3 directamente.\r\n\r\nSuponiendo
  que habéis leído <a href=\"http://www.racotecnic.com/2011/01/unir-ficheros-mp3-en-un-unico-fichero-mp3-con-cakephp/\"
  target=\"_self\">el tutorial del otro día</a> voy a ir directo al grano...\r\n\r\nLo
  primero que haremos es escribir la información ID3 a nuestro fichero de podcast.
  Para el ejemplo utilizaré el componente que tengo hecho para <a href=\"http://getid3.org\"
  target=\"_self\">getid3</a> y que he(mos) utilizado anteriormente. Lo podéis descargar
  del post anterior o de <a href=\"https://github.com/elboletaire/CakePHP-Getid3-Component\"
  target=\"_self\">github</a>."
wordpress_id: 1760
wordpress_url: http://www.racotecnic.com/?p=1760
date: '2011-02-13 23:23:36 +0100'
date_gmt: '2011-02-13 22:23:36 +0100'
categories:
- Programació
- Web
tags:
- RSS
- CakePHP
- CakePHP 1.3
- CakePHP 1.2
- Podcast
- iTunes
---
<p><img class="alignright size-full wp-image-1761" style="margin-left: 20px;" title="podcast icon" src="http://www.racotecnic.com/wp-content/uploads/2011/01/podcast_icon.png" alt="" width="200" height="200" />El otro día expliqué <a href="http://www.racotecnic.com/2011/01/unir-ficheros-mp3-en-un-unico-fichero-mp3-con-cakephp/" target="_self"><strong>cómo unir ficheros mp3 en un mismo fichero</strong></a> y dije que dejaría para más tarde lo de la creación del <strong>Podcast</strong>. Vamos a ello pues.</p>
<p>Para <strong>crear nuestro Podcast</strong> necesitaremos, a parte de CakePHP, la librería getid3, ya que para que itunes coja bien las imágenes de cada podcast lo mejor que podemos hacer es añadir la imagen al mp3 directamente.</p>
<p>Suponiendo que habéis leído <a href="http://www.racotecnic.com/2011/01/unir-ficheros-mp3-en-un-unico-fichero-mp3-con-cakephp/" target="_self">el tutorial del otro día</a> voy a ir directo al grano...</p>
<p>Lo primero que haremos es escribir la información ID3 a nuestro fichero de podcast. Para el ejemplo utilizaré el componente que tengo hecho para <a href="http://getid3.org" target="_self">getid3</a> y que he(mos) utilizado anteriormente. Lo podéis descargar del post anterior o de <a href="https://github.com/elboletaire/CakePHP-Getid3-Component" target="_self">github</a>.<a id="more"></a><a id="more-1760"></a></p>
<p>[php]&lt;?php<br />
// .. aquí tendríamos la carga del mp3 al servidor o la unión de los mp3 ..<br />
// ....<br />
// Escribimos la información id3..<br />
$id3_data = array(<br />
	'title' =&gt; 'Título del podcast',<br />
	'artist' =&gt; 'Artista(s)',<br />
	'album' =&gt; 'Álbum',<br />
	'year'	=&gt; 'Año',<br />
	'genre' =&gt; 'Género musical',<br />
	'comment' =&gt; 'Comentario',<br />
	'images' =&gt; array(<br />
		array(<br />
			'image' =&gt; '/ruta/completa/hacia/la/imagen.jpg',<br />
			'type' =&gt; 'cover', // tipos válidos: cover, back y cd,<br />
			'mime' =&gt; 'image/jpg',<br />
			'description' =&gt; 'Nombre o descripción que queramos poner'<br />
		),<br />
		array(<br />
			'image' =&gt; '/ruta/completa/hacia/la/imagen.jpg',<br />
			'type' =&gt; 'cover', // tipos válidos: cover, back y cd,<br />
			'mime' =&gt; 'image/jpg',<br />
			'description' =&gt; 'Nombre o descripción que queramos poner'<br />
		),<br />
		array(<br />
			// ... más imágenes (itunes sólo carga una, así que a partir de la primera es ocupar más espacio..<br />
		)<br />
	)<br />
);<br />
if ( $this-&gt;Getid3-&gt;write($podcast, $id3_data) )<br />
{<br />
	// Los datos se han escrito correctamente<br />
}<br />
else<br />
{<br />
	pr($this-&gt;Getid3-&gt;errors);<br />
}<br />
[/php]</p>
<p>Con algún programa para gestionar etiquetas <em>id3 </em>(como <a href="http://kid3.sourceforge.net/" target="_self">kid3</a> por ejemplo) o con un simple reproductor podréis comprobar si se han escrito correctamente las etiquetas <em>id3</em>.</p>
<p>Ahora necesitamos crear una plantilla (<em>layout</em>) para nuestro podcast, ya que la estructura básica de un podcast difiere un poco respecto a la de un RSS convencional.</p>
<p>Para no complicarnos mucho y para hacer este layout lo más versátil posible simplemente concatenaremos los elementos que nos interesen delante del contenido (cada ítem del podcast). Así que a partir del <a href="http://book.cakephp.org/view/1461/Creating-an-RSS-feed-with-the-RssHelper" target="_self">layout de RSS de CakePHP</a>...</p>
<p>[php highlight="13,14,15,16,17,18,19,20,21"]&lt;?php // /app/views/layouts/xml/podcast.ctp</p>
<p>echo $this-&gt;Rss-&gt;header();<br />
if (!isset($documentData)) {<br />
    $documentData = array();<br />
}<br />
if (!isset($channelData)) {<br />
    $channelData = array();<br />
}<br />
if (!isset($channelData['title'])) {<br />
    $channelData['title'] = $title_for_layout;<br />
}<br />
$before = &quot;&quot;;<br />
if ( !empty($beforeContent) &amp;&amp; is_array($beforeContent) )<br />
	{<br />
	foreach ( $beforeContent as $i )<br />
	{<br />
		$before .= $i;<br />
	}<br />
}<br />
$channel = $this-&gt;Rss-&gt;channel(array(), $channelData, $before . $content_for_layout);<br />
echo $this-&gt;Rss-&gt;document($documentData,$channel);[/php]</p>
<p>Lo único que he hecho es añadir las líneas 13 a 20 y la variable <code>$before</code> en la línea 21.</p>
<p>Con esto podremos <strong>mandar un array de elementos XML</strong> desde nuestra vista del podcast con toda la información extra que queramos. Si no acabáis de verlo tranquilos porque ahora con la vista del podcast os acabará de quedar claro.</p>
<p>Del mismo modo que con el layout, utilizo como base <a href="http://book.cakephp.org/view/1461/Creating-an-RSS-feed-with-the-RssHelper" target="_self">la vista de RSS de CakePHP</a>.</p>
<p>Aquí viene la vista:</p>
<p>[php]&lt;?php // /app/views/podcasts/podcasts/index.ctp<br />
// Pasamos info a la variable documentData del layout<br />
$this-&gt;set('documentData', array('xmlns:itunes' =&gt; 'http://www.itunes.com/dtds/podcast-1.0.dtd'));<br />
// Pasamos información a la variable channelData del layout<br />
$this-&gt;set('channelData', array(<br />
	'title' =&gt; 'Racó Tècnic Podcast',<br />
	'link' =&gt; $this-&gt;Xml-&gt;url(array('controller' =&gt; 'podcasts', 'action' =&gt; 'index'), true),<br />
	'description' =&gt; __(&quot;Racó Tècnic Audio &amp; Video Podcasts&quot;, true) . '.',<br />
	'language' =&gt; &quot;es&quot;,<br />
	'image' =&gt; array(<br />
		'url' =&gt; $this-&gt;Xml-&gt;url('/img/logo.jpg', true),<br />
		'link' =&gt; $this-&gt;Xml-&gt;url('/', true),<br />
		'width' =&gt; 144,<br />
		'height' =&gt; 144,<br />
		'title' =&gt; &quot;Racó Tècnic logo&quot;<br />
	)));</p>
<p>// Aquí pasamos la información a la variable $beforeContent del layout<br />
$this-&gt;set('beforeContent',<br />
	array(<br />
		$this-&gt;Xml-&gt;elem('image', array(<br />
			'namespace' =&gt; 'itunes',<br />
			'href' =&gt; $this-&gt;Xml-&gt;url('/img/logo.jpg', true)<br />
		)),<br />
		$this-&gt;Xml-&gt;elem('author', array('namespace' =&gt; 'itunes'), &quot;El Boletaire&quot;)<br />
	)<br />
);<br />
// Empezamos a añadir &lt;item&gt;s a nuestro fichero podcast<br />
foreach ($podcasts as $podcast)<br />
{<br />
	$time = strtotime($podcast['Podcast']['created']);</p>
<p>	$link = array(<br />
		'controller' =&gt; 'foo',<br />
		'action' =&gt; 'view',<br />
		'slug' =&gt; $podcast['Podcast']['slug']<br />
	);<br />
	App::import('Sanitize');<br />
	// This is the part where we clean the body text for output as the description<br />
	// of the rss item, this needs to have only text to make sure the feed validates<br />
	// Descripción del podcast<br />
	$bodyText = preg_replace('=\(.*?\)=is', '', strip_tags($podcast['Podcast']['description']));<br />
	$bodyText = $this-&gt;Text-&gt;stripLinks($bodyText);<br />
	$bodyText = Sanitize::stripAll($bodyText);<br />
	$bodyText = $this-&gt;Text-&gt;truncate($bodyText, array('limit' =&gt; 400, 'exact' =&gt; false));</p>
<p>	// Título del podcast<br />
	$item = $this-&gt;Xml-&gt;elem('title', null, h($podcat['Podcast']['title']));<br />
	// Autores<br />
	$item .= $this-&gt;Xml-&gt;elem('author', array('namespace' =&gt; 'itunes'), h($podcast['Podcast']['authors']));<br />
	// Enlace y guid del podcast<br />
	$item .= $this-&gt;Xml-&gt;elem('link', null, $this-&gt;Html-&gt;url($link, true));<br />
	$item .= $this-&gt;Xml-&gt;elem('guid', array('isPermaLink' =&gt; &quot;true&quot;), $this-&gt;Html-&gt;url($link, true));<br />
	// Añadimos la descripción<br />
	$item .= $this-&gt;Xml-&gt;elem('summary', array('namespace' =&gt; 'itunes'), h($bodyText));<br />
	$item .= $this-&gt;Xml-&gt;elem('description', null, h($bodyText));<br />
	// Fecha de publicación<br />
	$item .= $this-&gt;Xml-&gt;elem('pubDate', null, $this-&gt;Rss-&gt;time($podcast['Podcast']['created']));</p>
<p>	// Añadimos la carátula<br />
	if ( isset($podcast['Cover'][0]['file']) ) {<br />
		$item .= $this-&gt;Xml-&gt;elem('image', array(<br />
			'namespace' =&gt; 'itunes',<br />
			'href' =&gt; $this-&gt;Xml-&gt;url('/img/' . $podcast['Cover'][0]['file'], true)<br />
		));<br />
	}<br />
	// El fichero de podcast<br />
	$item .= $this-&gt;Xml-&gt;elem('enclosure', array(<br />
		'url' =&gt; Router::url('/files/podcasts/' . $podcast['Podcast']['file'], true),<br />
		'length' =&gt; filesize($podcast['Podcast']['file']),<br />
		'type' =&gt; 'audio/mpeg' // formato mime del archivo<br />
	));</p>
<p>	echo  $this-&gt;Xml-&gt;elem('item', null, $item);<br />
}<br />
[/php]</p>
<p>Fijaros bien que todas las URL que he creado las he hecho especificando el segundo parámetro del método "url"; de este modo nos devolverá siempre URL absolutas en lugar de relativas (que es como debe ser en un RSS).</p>
<p>Bien, con esto tendríamos las vistas pero tenemos que decirle a cake que nos las cargue en algún momento. A mi me gusta acceder a través del <strong>nombre_del_controlador.pod</strong></p>
<p>Para hacerle entender a Cake que queremos que distinga las direcciones terminadas en .pod tenemos que abrir nuestro fichero de rutas (<em>routes.php</em>) y añadir la siguiente línea:</p>
<p>[php]&lt;?php // /app/config/routes.php<br />
Router::parseExtensions('pod');<br />
// Si queréis utilizar más extensiones, como rss u otras<br />
// que necesitéis simplemente id añadiendo parámetros:<br />
// Router::parseExtensions('pod','rss','mrss');[/php]</p>
<p>En nuestro controlador necesitaremos cargar el componente <em>Request Handler</em> que nos permitirá distinguir desde el controlador los accesos a una página terminada en <strong>.pod</strong>:</p>
<p>[php]&lt;?php // /app/controllers/podcasts_controller.php<br />
class PodcastsController extends AppController<br />
{<br />
	var $components = array('Getid3', 'RequestHandler');<br />
	var $helpers = array('Xml', 'Rss', 'Html');</p>
<p>	public function index()<br />
	{<br />
		// Desactivamos el renderizado automático<br />
		$this-&gt;autoRender = false;<br />
		if ( $this-&gt;RequestHandler-&gt;prefers('pod') ) {<br />
			// Hacemos lo que tengamos que hacer para poblar nuestro podcast<br />
			// $podcasts = $this-&gt;Podcast-&gt;find(...)</p>
<p>			// Cargamos la vista y el layout del podcast<br />
			$this-&gt;render('podcasts/index','xml/podcast');<br />
		}<br />
		// Si no es podcast hacemos el render normal<br />
		else $this-&gt;render();<br />
	}<br />
}[/php]</p>
<p>Como podéis ver el método "prefers" nos permite distinguir entre una terminación u otra. Así pues, si añadiésemos la terminación "jpeg", haríamos <em>$this-&gt;RequestHandler-&gt;prefers("jpeg")</em> para averiguar si el usuario accede a través de ella.</p>
<p>Con esto ya tendríais vuestro podcast funcionando. Para probarlo podéis añadirlo a iTunes desde <em>Avanzado / Subscribirse a un podcast </em>y acto seguido aparecerá en vuestro listado de podcasts.</p>
<p>Si queréis mandarlo a iTunes para que aparezca en la iTunes store podéis hacerlo desde <a href="https://phobos.apple.com/WebObjects/MZFinance.woa/wa/publishPodcast" target="_blank">este enlace</a>.</p>
<p>Si queréis ver un ejemplo podéis ver el podcast del <a href="http://musicavermella.com">netlabel música vermella</a> en <a href="http://itunes.apple.com/es/podcast/musica-vermella-podcast/id417624155" target="_self">itunes</a> o desde la <a href="http://musicavermella.com/#rss" target="_self">propia página web</a>.</p>
<blockquote><p><strong>Ejemplo</strong></p>
<ul>
<li><a href="http://itunes.apple.com/es/podcast/musica-vermella-podcast/id417624155" target="_self">Música Vermella Podcast (iTunes)</a></li>
<li><a href="http://musicavermella.com/#rss">Música Vermella Podcast (Website)</a></li>
</ul>
<p><strong>Referencias</strong></p>
<ul>
<li><a href="http://www.apple.com/itunes/podcasts/specs.html" target="_self">iTunes Podcast Specs</a></li>
<li><a href="http://book.cakephp.org/" target="_self">CakePHP Book</a></li>
<li><a href="http://api.cakephp.org/" target="_self">CakePHP Api</a></li>
</ul>
</blockquote>
<p>A disfrutarlo :)</p>
