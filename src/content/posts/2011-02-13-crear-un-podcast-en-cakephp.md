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
excerpt: "El otro día expliqué **cómo unir ficheros mp3 en un mismo fichero**
  y dije que dejaría para más tarde lo de la creación del **Podcast**. Vamos a
  ello pues."
wordpress_id: 1760
wordpress_url: http://racotecnic.com/?p=1760
redirect_from:
- "?p=1760/"
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

<img style="margin-left: 20px;" title="podcast icon" src="{{ site.url }}/uploads/2011/01/podcast_icon.png" alt="" />

El otro día expliqué <a href="{{ site.url }}/2011/01/unir-ficheros-mp3-en-un-unico-fichero-mp3-con-cakephp/" target="_self">**cómo unir ficheros mp3 en un mismo fichero**</a> y dije que dejaría para más tarde lo de la creación del **Podcast**. Vamos a ello pues.

Para **crear nuestro Podcast** necesitaremos, a parte de CakePHP, la librería getid3, ya que para que itunes coja bien las imágenes de cada podcast lo mejor que podemos hacer es añadir la imagen al mp3 directamente.

Suponiendo que habéis leído <a href="{{ site.url }}/2011/01/unir-ficheros-mp3-en-un-unico-fichero-mp3-con-cakephp/" target="_self">el tutorial del otro día</a> voy a ir directo al grano...

Lo primero que haremos es escribir la información ID3 a nuestro fichero de podcast. Para el ejemplo utilizaré el componente que tengo hecho para <a href="http://getid3.org" target="_self">getid3</a> y que he(mos) utilizado anteriormente. Lo podéis descargar del post anterior o de <a href="https://github.com/elboletaire/CakePHP-Getid3-Component" target="_self">github</a>.<a id="more"></a><a id="more-1760"></a>

~~~php
<?php
// .. aquí tendríamos la carga del mp3 al servidor o la unión de los mp3 ..
// ....
// Escribimos la información id3..
$id3_data = array(
  'title'   => 'Título del podcast',
  'artist'  => 'Artista(s)',
  'album'   => 'Álbum',
  'year'    => 'Año',
  'genre'   => 'Género musical',
  'comment' => 'Comentario',
  'images'  => array(
    array(
      'image'       => '/ruta/completa/hacia/la/imagen.jpg',
      'type'        => 'cover', // tipos válidos: cover, back y cd,
      'mime'        => 'image/jpg',
      'description' => 'Nombre o descripción que queramos poner'
    ),
    array(
      'image'       => '/ruta/completa/hacia/la/imagen.jpg',
      'type'        => 'cover', // tipos válidos: cover, back y cd,
      'mime'        => 'image/jpg',
      'description' => 'Nombre o descripción que queramos poner'
    ),
    array(
      // ... más imágenes (itunes sólo carga una, así que a partir de la primera es ocupar más espacio..
    )
  )
);
if ($this->Getid3->write($podcast, $id3_data)) {
  // Los datos se han escrito correctamente
} else {
  pr($this->Getid3->errors);
}
~~~

Con algún programa para gestionar etiquetas <em>id3 </em>(como <a href="http://kid3.sourceforge.net/" target="_self">kid3</a> por ejemplo) o con un simple reproductor podréis comprobar si se han escrito correctamente las etiquetas <em>id3</em>.

Ahora necesitamos crear una plantilla (<em>layout</em>) para nuestro podcast, ya que la estructura básica de un podcast difiere un poco respecto a la de un RSS convencional.

Para no complicarnos mucho y para hacer este layout lo más versátil posible simplemente concatenaremos los elementos que nos interesen delante del contenido (cada ítem del podcast). Así que a partir del <a href="http://book.cakephp.org/view/1461/Creating-an-RSS-feed-with-the-RssHelper" target="_self">layout de RSS de CakePHP</a>...

~~~php
<?php
// /app/views/layouts/xml/podcast.ctp
echo $this->Rss->header();
if (!isset($documentData)) {
  $documentData = array();
}
if (!isset($channelData)) {
  $channelData = array();
}
if (!isset($channelData['title'])) {
  $channelData['title'] = $title_for_layout;
}
$before = '';
if (!empty($beforeContent) && is_array($beforeContent)) {
  foreach ($beforeContent as $i) {
    $before .= $i;
  }
}
$channel = $this->Rss->channel(array(), $channelData, $before . $content_for_layout);
echo $this->Rss->document($documentData,$channel);
~~~

Lo único que he hecho es añadir las líneas 13 a 20 y la variable `$before` en la línea 21.

Con esto podremos **mandar un array de elementos XML** desde nuestra vista del podcast con toda la información extra que queramos. Si no acabáis de verlo tranquilos porque ahora con la vista del podcast os acabará de quedar claro.

Del mismo modo que con el layout, utilizo como base <a href="http://book.cakephp.org/view/1461/Creating-an-RSS-feed-with-the-RssHelper" target="_self">la vista de RSS de CakePHP</a>.

Aquí viene la vista:

~~~php
<?php
// /app/views/podcasts/podcasts/index.ctp
// Pasamos info a la variable documentData del layout
$this->set('documentData', array('xmlns:itunes' => 'http://www.itunes.com/dtds/podcast-1.0.dtd'));
// Pasamos información a la variable channelData del layout
$this->set('channelData', array(
  'title'       => 'Racó Tècnic Podcast',
  'link'        => $this->Xml->url(array('controller' => 'podcasts', 'action' => 'index'), true),
  'description' => __('Racó Tècnic Audio & Video Podcasts.', true),
  'language'    => 'es',
  'image'       => array(
    'url'    => $this->Xml->url('/img/logo.jpg', true),
    'link'   => $this->Xml->url('/', true),
    'width'  => 144,
    'height' => 144,
    'title'  => 'Racó Tècnic logo'
  )
));

// Aquí pasamos la información a la variable $beforeContent del layout
$this->set('beforeContent',
  array(
    $this->Xml->elem('image', array(
      'namespace' => 'itunes',
      'href' => $this->Xml->url('/img/logo.jpg', true)
    )),
    $this->Xml->elem('author', array('namespace' => 'itunes'), 'El Boletaire')
  )
);
// Empezamos a añadir <item>s a nuestro fichero podcast
foreach ($podcasts as $podcast)
{
  $time = strtotime($podcast['Podcast']['created']);

  $link = array(
    'controller' => 'foo',
    'action'     => 'view',
    'slug'       => $podcast['Podcast']['slug']
  );
  App::import('Sanitize');
  // This is the part where we clean the body text for output as the description
  // of the rss item, this needs to have only text to make sure the feed validates
  // Descripción del podcast
  $bodyText = preg_replace('=\(.*?\)=is', '', strip_tags($podcast['Podcast']['description']));
  $bodyText = $this->Text->stripLinks($bodyText);
  $bodyText = Sanitize::stripAll($bodyText);
  $bodyText = $this->Text->truncate($bodyText, array('limit' => 400, 'exact' => false));

  // Título del podcast
  $item = $this->Xml->elem('title', null, h($podcat['Podcast']['title']));
  // Autores
  $item .= $this->Xml->elem('author', array('namespace' => 'itunes'), h($podcast['Podcast']['authors']));
  // Enlace y guid del podcast
  $item .= $this->Xml->elem('link', null, $this->Html->url($link, true));
  $item .= $this->Xml->elem('guid', array('isPermaLink' => 'true'), $this->Html->url($link, true));
  // Añadimos la descripción
  $item .= $this->Xml->elem('summary', array('namespace' => 'itunes'), h($bodyText));
  $item .= $this->Xml->elem('description', null, h($bodyText));
  // Fecha de publicación
  $item .= $this->Xml->elem('pubDate', null, $this->Rss->time($podcast['Podcast']['created']));

  // Añadimos la carátula
  if (isset($podcast['Cover'][0]['file'])) {
    $item .= $this->Xml->elem('image', array(
      'namespace' => 'itunes',
      'href' => $this->Xml->url('/img/' . $podcast['Cover'][0]['file'], true)
    ));
  }
  // El fichero de podcast
  $item .= $this->Xml->elem('enclosure', array(
    'url'    => Router::url('/files/podcasts/' . $podcast['Podcast']['file'], true),
    'length' => filesize($podcast['Podcast']['file']),
    'type'   => 'audio/mpeg' // formato mime del archivo
  ));

  echo  $this->Xml->elem('item', null, $item);
}
~~~

Fijaros bien que todas las URL que he creado las he hecho especificando el segundo parámetro del método "url"; de este modo nos devolverá siempre URL absolutas en lugar de relativas (que es como debe ser en un RSS).

Bien, con esto tendríamos las vistas pero tenemos que decirle a cake que nos las cargue en algún momento. A mi me gusta acceder a través del **nombre_del_controlador.pod**

Para hacerle entender a Cake que queremos que distinga las direcciones terminadas en .pod tenemos que abrir nuestro fichero de rutas (<em>routes.php</em>) y añadir la siguiente línea:

~~~php
<?php // /app/config/routes.php
Router::parseExtensions('pod');
// Si queréis utilizar más extensiones, como rss u otras
// que necesitéis simplemente id añadiendo parámetros:
// Router::parseExtensions('pod','rss','mrss');
~~~

En nuestro controlador necesitaremos cargar el componente <em>Request Handler</em> que nos permitirá distinguir desde el controlador los accesos a una página terminada en **.pod**:

~~~php
<?php // /app/controllers/podcasts_controller.php
class PodcastsController extends AppController
{
  var $components = array('Getid3', 'RequestHandler');
  var $helpers = array('Xml', 'Rss', 'Html');

  public function index()
  {
    // Desactivamos el renderizado automático
    $this->autoRender = false;
    if ($this->RequestHandler->prefers('pod')) {
      // Hacemos lo que tengamos que hacer para poblar nuestro podcast
      // $podcasts = $this->Podcast->find(...)

      // Cargamos la vista y el layout del podcast
      $this->render('podcasts/index','xml/podcast');
    }
    // Si no es podcast hacemos el render normal
    else $this->render();
  }
}
~~~

Como podéis ver el método "prefers" nos permite distinguir entre una terminación u otra. Así pues, si añadiésemos la terminación "jpeg", haríamos <em>$this->RequestHandler->prefers("jpeg")</em> para averiguar si el usuario accede a través de ella.

Con esto ya tendríais vuestro podcast funcionando. Para probarlo podéis añadirlo a iTunes desde <em>Avanzado / Subscribirse a un podcast </em>y acto seguido aparecerá en vuestro listado de podcasts.

Si queréis mandarlo a iTunes para que aparezca en la iTunes store podéis hacerlo desde <a href="https://phobos.apple.com/WebObjects/MZFinance.woa/wa/publishPodcast" target="_blank">este enlace</a>.

Si queréis ver un ejemplo podéis ver el podcast del <a href="http://musicavermella.com">netlabel música vermella</a> en <a href="http://itunes.apple.com/es/podcast/musica-vermella-podcast/id417624155" target="_self">itunes</a> o desde la <a href="http://musicavermella.com/#rss" target="_self">propia página web</a>.

> **Ejemplo**
>
- <a href="http://itunes.apple.com/es/podcast/musica-vermella-podcast/id417624155" target="_self">Música Vermella Podcast (iTunes)</a>
- <a href="http://musicavermella.com/#rss">Música Vermella Podcast (Website)</a>
>
> **Referencias**
>
> - <a href="http://www.apple.com/itunes/podcasts/specs.html" target="_self">iTunes Podcast Specs</a>
> - <a href="http://book.cakephp.org/" target="_self">CakePHP Book</a>
> - <a href="http://api.cakephp.org/" target="_self">CakePHP Api</a>

A disfrutarlo :)
