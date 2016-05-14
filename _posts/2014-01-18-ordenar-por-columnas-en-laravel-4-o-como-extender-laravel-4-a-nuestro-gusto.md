---
layout: post
status: publish
published: true
title: Ordenar por columnas en Laravel 4 o cómo extender Laravel 4 a tu gusto
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Si has trasteado o estás trasteando con <a href=\"http://laravel.com/\"
  title=\"Web oficial de Laravel\" rel=\"nofollow external\">Laravel 4</a> habrás
  notado que está algo verde. Entre varias cosas se echa en falta que no tenga una
  manera sencilla para poder ordenar los resultados por columnas.\r\n\r\nDado que
  yo vengo de CakePHP, me he inspirado en él para crear el sistema de ordenación por
  columnas, así que si en Cake podemos crear un enlace para ordenar así:\r\n\r\n[php]\r\n&lt;tr&gt;\r\n
  \   &lt;th&gt;&lt;?php echo $this-&gt;Paginator-&gt;sort('id') ?&gt;&lt;/th&gt;\r\n
  \   &lt;th&gt;&lt;?php echo $this-&gt;Paginator-&gt;sort('name', 'Nom') ?&gt;&lt;/th&gt;\r\n
  \   &lt;th&gt;&lt;?php echo $this-&gt;Paginator-&gt;sort('address', 'Adreça') ?&gt;&lt;/th&gt;\r\n&lt;/tr&gt;\r\n[/php]\r\n\r\nEn
  este tutorial verás cómo hacer para poder ordenar así, utilizando blade (el sistema
  de plantillas por defecto de Laravel 4):\r\n\r\n[php]\r\n&lt;tr&gt;\r\n    &lt;th&gt;{{
  $posts-&gt;sort('id') }}&lt;/th&gt;\r\n    &lt;th&gt;{{ $posts-&gt;sort('name',
  'Nom') }}&lt;/th&gt;\r\n    &lt;th&gt;{{ $posts-&gt;sort('address', 'Adreça') }}&lt;/th&gt;\r\n&lt;/tr&gt;\r\n[/php]\r\n\r\n<a
  href=\"http://www.racotecnic.com/wp-content/uploads/2014/01/laravel_paginate.png\"
  style=\"display:block; text-align:center\"><img src=\"http://www.racotecnic.com/wp-content/uploads/2014/01/laravel_paginate.png\"
  alt=\"laravel_paginate\" width=\"328\" height=\"121\" class=\"aligncenter size-full
  wp-image-2297\" /></a>\r\n\r\nPara poder hacer esto tendrás que extender el paginador
  de Laravel para añadirle las funciones que necesites (como <code>sort</code>).\r\n\r\nDado
  que lo que es ordenar en sí no tiene ninguna complicación y lo puedes encontrar
  documentado, en este tutorial me centraré más en <strong>cómo extender classes de
  Laravel 4 para adaptarlo a tus necesidades</strong> y de paso verás cómo tener la
  ordenación por columnas bien organizada (a nivel código) para mejor reutilización
  en futuros proyectos.\r\n\r\n<blockquote><strong>Nota:</strong> Debido al continuo
  desarrollo de Laravel este tutorial ha quedado rápidamente desfasado. He actualizado
  todos los enlaces para que funcionen correctamente pero ten en cuenta que algunos
  de estos ficheros han cambiado mucho o directamente ya no existen.</blockquote>\r\n\r\n"
wordpress_id: 2277
wordpress_url: http://www.racotecnic.com/?p=2277
date: '2014-01-18 18:30:38 +0100'
date_gmt: '2014-01-18 17:30:38 +0100'
categories:
- Programació
- Web
tags:
- Paginació
- Laravel
- Laravel 4
- Eloquent
- Blade
---
<p>Si has trasteado o estás trasteando con <a href="http://laravel.com/" title="Web oficial de Laravel" rel="nofollow external">Laravel 4</a> habrás notado que está algo verde. Entre varias cosas se echa en falta que no tenga una manera sencilla para poder ordenar los resultados por columnas.</p>
<p>Dado que yo vengo de CakePHP, me he inspirado en él para crear el sistema de ordenación por columnas, así que si en Cake podemos crear un enlace para ordenar así:</p>
<p>[php]<br />
&lt;tr&gt;<br />
    &lt;th&gt;&lt;?php echo $this-&gt;Paginator-&gt;sort('id') ?&gt;&lt;/th&gt;<br />
    &lt;th&gt;&lt;?php echo $this-&gt;Paginator-&gt;sort('name', 'Nom') ?&gt;&lt;/th&gt;<br />
    &lt;th&gt;&lt;?php echo $this-&gt;Paginator-&gt;sort('address', 'Adreça') ?&gt;&lt;/th&gt;<br />
&lt;/tr&gt;<br />
[/php]</p>
<p>En este tutorial verás cómo hacer para poder ordenar así, utilizando blade (el sistema de plantillas por defecto de Laravel 4):</p>
<p>[php]<br />
&lt;tr&gt;<br />
    &lt;th&gt;{{ $posts-&gt;sort('id') }}&lt;/th&gt;<br />
    &lt;th&gt;{{ $posts-&gt;sort('name', 'Nom') }}&lt;/th&gt;<br />
    &lt;th&gt;{{ $posts-&gt;sort('address', 'Adreça') }}&lt;/th&gt;<br />
&lt;/tr&gt;<br />
[/php]</p>
<p><a href="http://www.racotecnic.com/wp-content/uploads/2014/01/laravel_paginate.png" style="display:block; text-align:center"><img src="http://www.racotecnic.com/wp-content/uploads/2014/01/laravel_paginate.png" alt="laravel_paginate" width="328" height="121" class="aligncenter size-full wp-image-2297" /></a></p>
<p>Para poder hacer esto tendrás que extender el paginador de Laravel para añadirle las funciones que necesites (como <code>sort</code>).</p>
<p>Dado que lo que es ordenar en sí no tiene ninguna complicación y lo puedes encontrar documentado, en este tutorial me centraré más en <strong>cómo extender classes de Laravel 4 para adaptarlo a tus necesidades</strong> y de paso verás cómo tener la ordenación por columnas bien organizada (a nivel código) para mejor reutilización en futuros proyectos.</p>
<blockquote><p><strong>Nota:</strong> Debido al continuo desarrollo de Laravel este tutorial ha quedado rápidamente desfasado. He actualizado todos los enlaces para que funcionen correctamente pero ten en cuenta que algunos de estos ficheros han cambiado mucho o directamente ya no existen.</p></blockquote>
<p><a id="more"></a><a id="more-2277"></a></p>
<p>Antes de empezar me gustaría aclarar que no soy experto en Laravel ni mucho menos, simplemente me puse a trastear con él, vi que no tenía esta funcionalidad y exploré hasta encontrar la manera de integrarlo mejor en mi aplicación. Gracias a ello aprendí mucho mejor cómo funciona Laravel (internamente) y es en parte esto lo que quiero compartir contigo.</p>
<p>Por otro lado, a pesar de que el siguiente post rebosa de referencias externas a documentación, código incrustado y código en github, no estaría de más que hubieras leído la documentación de Laravel 4 antes de empezar.</p>
<h3>Entendiendo el paginador</h3>
<h4>La <i>Facade</i> Paginator</h4>
<blockquote><p><b>Nota:</b> Si no sabes qué es una <i>Facade</i>, <a href="http://laravel.com/docs/facades" rel="nofollow external" title="Abrir documentación sobre Facades">repásate la documentación</a>.</p></blockquote>
<p>Para hacer todo esto lo primero que hay que hacer es entender cómo funciona el paginador actual de Laravel 4. Vayamos al grano.</p>
<p>Si accedes al directorio <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination" rel="nofollow external">vendor/laravel/framework/src/Illuminate/Pagination</a> verás que hay un directorio llamado <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/views" title="Ver en github" rel="nofollow external">views</a>, un fichero <code>composer.json</code> y cuatro ficheros php.</p>
<p>En la carpeta <code>views</code> hay tres plantillas para mostrar los <a href="http://laravel.com/docs/pagination" rel="nofollow external">botones de la paginación</a>. Si no leíste la documentación de Laravel sobre la paginación, gracias a este directorio acabas de averiguar que los botones de paginación tienen plantillas y que hay tres definidas por defecto.</p>
<p>El fichero <code>composer.json</code> ignóralo y de los ficheros PHP, fíjate en los tres siguientes:</p>
<ul>
<li><a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/Paginator.php" title="Ver en github" rel="nofollow external">Paginator.php</a></li>
<li><a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/PaginationServiceProvider.php" title="Ver en github" rel="nofollow external">PaginationServiceProvider.php</a></li>
<li><a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/Environment.php" title="Ver en github" rel="nofollow external">Environment.php</a></li>
</ul>
<p>El fichero <code>Paginator.php</code> es el que realmente te interesa ya que aquí es donde residen métodos como <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/Paginator.php#L176" rel="nofollow external" title="Ver en github"><code>links()</code></a> y por tanto es donde te interesa añadir el método <code>sort()</code>.</p>
<p>No obstante, para poder hacer todo esto posible necesitarás hacer tu propio <code>PaginationServiceProvider.php</code> y tu propio <code>Environment.php</code>, ya que es en esos dos ficheros donde se inicializa el paginador.</p>
<p>Para entender esto mejor, abre tu fichero <code>app.php</code> y en el array de providers fíjate que, entre varios providers, <a href="https://github.com/laravel/laravel/tree/3ad58caba6c79c487deecb2fd7b0ea94e45b4f38/app/config/app.php#L98" title="Ver en github" rel="nofollow external">hay el siguiente</a>:</p>
<p>[php]<br />
return array(<br />
    // ... otros parámetros de configuración ...</p>
<p>    'providers' =&gt; array(<br />
        // ... otros providers ...<br />
        'Illuminate\Pagination\PaginationServiceProvider',<br />
        // ... más providers ...<br />
    )</p>
<p>    // ... más parámetros de configuración ...<br />
);<br />
[/php]</p>
<p>Así pues, para cargar el paginador lo primero que hace Laravel es cargar la clase <code>PaginationServiceProvider</code>.</p>
<p>Si abres este fichero podrás observar cómo en el método <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/PaginationServiceProvider.php#L23" title="Ver en github" rel="nofollow external"><code>register</code></a> se inicializa la clase <code>Environment</code>.</p>
<p>[php highlight="10"]<br />
/**<br />
 * Register the service provider.<br />
 *<br />
 * @return void<br />
 */<br />
public function register()<br />
{<br />
    $this-&gt;app['paginator'] = $this-&gt;app-&gt;share(function($app)<br />
    {<br />
        $paginator = new Environment($app['request'], $app['view'], $app['translator']);</p>
<p>        $paginator-&gt;setViewName($app['config']['view.pagination']);</p>
<p>        return $paginator;<br />
    });<br />
}<br />
[/php]</p>
<p>Y en la clase <code>Enviornment</code>, finalmente, en el método <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/Environment.php#L103" title="Ver en github" rel="nofollow external"><code>make()</code></a> se innicializa la clase <code>Paginator</code>.</p>
<p>[php highlight="11"]<br />
/**<br />
 * Get a new paginator instance.<br />
 *<br />
 * @param  array  $items<br />
 * @param  int    $total<br />
 * @param  int    $perPage<br />
 * @return \Illuminate\Pagination\Paginator<br />
 */<br />
public function make(array $items, $total, $perPage)<br />
{<br />
    $paginator = new Paginator($this, $items, $total, $perPage);</p>
<p>    return $paginator-&gt;setupPaginationContext();<br />
}<br />
[/php]</p>
<p><b>Resumiendo:</b> En <code>app.php</code> se carga el <code>PaginationServiceProvider</code> que carga <code>Environment</code> que a su vez carga <code>Paginator</code>; así que habrá que crear tres clases para poder crear el método <code>sort()</code>.</p>
<h4>El método paginate de Eloquent</h4>
<p>Esto que has visto únicamente es para añadir el método <code>sort()</code>, que básicamente pintará enlaces en las vistas, pero todavía tienes que hacer que la paginación te haga caso y ordene según los parámetros establecidos.</p>
<p>Si recuerdas <a href="http://laravel.com/docs/pagination" rel="nofollow external" title="Abrir documentación sobre la paginación">la documentación de Laravel</a>, para hacer la paginación de elementos debes hacer algo así (los ejemplos a continuación son de un controlador):</p>
<p>[php]<br />
public function index()<br />
{<br />
    $posts = Post::paginate(20);</p>
<p>    return View::make('posts.admin.index')-&gt;with('posts', $posts);<br />
}<br />
[/php]</p>
<p>Éste método <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Database/Eloquent/Builder.php" rel="nofollow external" title="Ver en github"><code>paginate()</code></a> forma parte del <code>Builder</code> de Eloquent, así que también habrá que extenderlo si quieres que la paginación tome parámetros adicionales de la URL para ordenar los resultados.</p>
<p>Si en lugar de paginar como en el ejemplo anterior lo hubiera hecho así:</p>
<p>[php]<br />
public function index()<br />
{<br />
    $posts = Db::table('posts')-&gt;paginate('15');</p>
<p>    return View::make('posts.admin.index')-&gt;with('posts', $posts);<br />
}<br />
[/php]</p>
<p>En vez de modificar el Builder de Eloquent tendrías que modificar el <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Database/Query/Builder.php#L1394" rel="nofollow external" title="Ver en github">Builder de queries</a>. Aun así, en este tutorial me centraré en el método <code>paginate()</code> del Builder de Eloquent (primer ejemplo).</p>
<p>No obstante, el Builder de Eloquent no se carga igual que el paginador. Éste está inyectado en los modelos, por lo que podrías modificar el método <code>paginate</code> directamente redefiniéndolo en el modelo deseado, ya que éste extiende de Eloquent:</p>
<p>[php]<br />
// app/models/Post.php<br />
class Post extends Eloquent<br />
{<br />
    public function paginate($perPage, $columns = array('*'), $orderBy = array())<br />
    {<br />
        // nuestros cambios para ordenar por columna<br />
    }<br />
}<br />
[/php]</p>
<p>Fácilmente puedes añadirlo en un nuevo modelo padre del cual extender, por ejemplo <code>AppModel</code> (ya que digo que vengo de CakePHP, voy a demostrarlo):</p>
<p>[php]<br />
// app/models/AppModel.php<br />
class AppModel extends Eloquent<br />
{<br />
    public function paginate($perPage, $columns = array('*'), $orderBy = array())<br />
    {<br />
        // nuestros cambios para ordenar por columna<br />
    }<br />
}</p>
<p>// app/models/Post.php<br />
class Post extends AppModel<br />
{</p>
<p>}<br />
[/php]</p>
<p>Pero esto en realidad no sería muy reusable, así que en su lugar, y ya que Laravel está pensado para ser utilizado con PHP >= 5.4, lo que harás será crear un <a href="http://www.php.net/manual/es/language.oop5.traits.php" rel="nofollow external" title="Ver en php.net">trait</a>.</p>
<p>Habiendo creado el trait simplemente habrá que indicarlo en aquellos modelos donde quieras utilizarlo:</p>
<p>[php]<br />
class Post extends Eloquent<br />
{<br />
    use OrderBy; // donde OrderBy es el nombre que has puesto al trait<br />
}<br />
[/php]</p>
<h3>Los cambios</h3>
<p>Confiando en que has entendido algo de lo que he explicado hasta ahora, resumiré los cambios a hacer y enlazaré hacia los ficheros que <a href="https://github.com/elboletaire/laravel-utils-and-extensions" rel="external" title="Ver proyecto en github">he publicado en github</a>.</p>
<p>Yo tengo todas mis extensiones dentro del directorio <code>app/library/Minombre/Extensions</code>, pero tienes que poder ponerlas en cualquier directorio que cargue clases Laravel siempre y cuando respetes los <i>namespaces</i>.</p>
<h4>Yendo al grano</h4>
<p>Si quieres ahorrarte el proceso que viene a continuación <a href="https://github.com/elboletaire/laravel-utils-and-extensions" rel="external" title="Ver proyecto en github">puedes añadir mi proyecto</a> como un submódulo de tu proyecto fácilmente:</p>
<p>[bash]<br />
git submodule add https://github.com/elboletaire/laravel-utils-and-extensions.git app/library/Elboletaire<br />
[/bash]</p>
<p>Si no utilizas git <a href="https://github.com/elboletaire/laravel-utils-and-extensions/archive/master.zip" rel="nofollow">descarga directamente el zip de github</a> y descomprime los contenidos del fichero en un nuevo directorio <code>app/library/Elboletaire</code>.</p>
<h4>El método <code>sort</code></h4>
<p>Volviendo al resumen, tienes que crear tu propio <a href="https://github.com/elboletaire/laravel-utils-and-extensions/blob/master/Extensions/Pagination/PaginationServiceProvider.php" rel="nofollow external" title="Ver en github"><code>PaginationServiceProvider</code></a> para en él cargar un nuevo <a href="https://github.com/elboletaire/laravel-utils-and-extensions/blob/master/Extensions/Pagination/Environment.php" rel="nofollow external" title="Ver en github"><code>Environment</code></a> que finalmente será quien cargue el <a href="https://github.com/elboletaire/laravel-utils-and-extensions/blob/master/Extensions/Pagination/Paginator.php" rel="nofollow external" title="Ver en github"><code>Paginator</code></a>.</p>
<p>Es en ésta última clase <code>Paginator</code> donde deberás definir el método sort y otros métodos necesarios para que éste funcione correctamente. Como digo muy a menudo, el código habla por sí solo, así que no me centraré en explicarlo.</p>
<p>Una vez has creado tus ficheros (con su contenido, evidentemente) tienes que modificar el array de <code>providers</code> para que cargue tu <code>PaginationServiceProvider</code> en lugar de el de Laravel:</p>
<p>[php]<br />
return array(<br />
    // [...]</p>
<p>    'providers' =&gt; array(<br />
        // reemplazas el original<br />
        // 'Illuminate\Pagination\PaginationServiceProvider',<br />
        // por el tuyo<br />
        'Elboletaire\Extensions\Pagination\PaginationServiceProvider'<br />
    )</p>
<p>    // [...]<br />
);<br />
[/php]</p>
<h4>El método <code>paginate</code></h4>
<p>Crea un trait en el mismo directorio donde has creado los ficheros anteriores; éste será el encaragdo de modificar la consulta hacia la base de datos a partir de los datos recibidos vía <code>GET</code>.</p>
<p>Puedes ponerle el nombre que quieras, al mío lo he llamado <a href="https://github.com/elboletaire/laravel-utils-and-extensions/blob/master/Extensions/Pagination/PaginatorSort.php" rel="nofollow external" title="Ver en github"><code>PaginatorSort</code></a>, pero como digo es cuestión de gustos.</p>
<p>Una vez creado y hecha la lógica sólo hay que llamarlo desde el modelo que quieras que tenga ordenación por columnas:</p>
<p>[php]<br />
class Post extends Eloquent<br />
{<br />
    use Elboletaire\Extensions\Pagination\PaginatorSort;<br />
}<br />
[/php]</p>
<h4>Añadiendo paginación</h4>
<p>Hechos estos dos sencillos pasos, ya puedes añadir a tus vistas los enlaces para poder ordenar por columna:</p>
<p>[php]<br />
&lt;tr&gt;<br />
    &lt;th&gt;{{ $posts-&gt;sort('id') }}&lt;/th&gt;<br />
    &lt;th&gt;{{ $posts-&gt;sort('name', 'Nombre') }}&lt;/th&gt;<br />
&lt;/tr&gt;<br />
[/php]</p>
<p>Y mientras tu controlador (o ruta) cargue los datos de la paginación <strong>mediante el modelo</strong> (al que previamente has cargado el trait creado):</p>
<p>[php]<br />
public function index()<br />
{<br />
    $posts = Post::paginate(20);</p>
<p>    return View::make('posts.admin.index')-&gt;with('posts', $posts);<br />
}<br />
[/php]</p>
<p>...la paginación estaría funcionando. <i>Congrats my friend</i> :D</p>
<p>Si quieres puedes especificar el orden por defecto pasándolo como tercer parámetro:</p>
<p>[php]<br />
public function index()<br />
{<br />
    $posts = Post::paginate(20, null, 'name asc');<br />
    // o bien pasado como array:<br />
    $posts = Post::paginate(20, null, array(<br />
        'direction' =&gt; 'asc',<br />
        'sort'      =&gt; 'name'<br />
    ));</p>
<p>    return View::make('posts.admin.index')-&gt;with('posts', $posts);<br />
}<br />
[/php]</p>
<h3>Fin [referencias y esas cosas]</h3>
<p>Si eres lector asiduo (aunque aquí no nos vaya mucho esto de la asiduidad..) sabrás que estoy abierto a que me preguntéis lo que sea —otra cosa es si sabré contestar...</p>
<p>El repositorio está colgado en github, entre otras cosas, para que la gente colabore; así que si te animas ya sabes.</p>
<blockquote><p><strong>Más información y fuentes:</strong></p>
<ul>
<li><a rel="nofollow external" href="http://laravel.com/docs">Documentación de Laravel</a></li>
<li><a rel="nofollow external" href="http://www.php.net/manual/en/language.oop5.traits.php">Documentación acerca de los traits</a></li>
<li><a rel="nofollow external" href="http://forums.laravel.io/viewtopic.php?pid=39576#p39576">How to extend Illuminate\Database\Eloquent\Builder class?</a></li>
</ul>
</blockquote>
