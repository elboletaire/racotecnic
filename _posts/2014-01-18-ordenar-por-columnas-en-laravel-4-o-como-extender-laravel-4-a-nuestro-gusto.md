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
excerpt: "Si has trasteado o estás trasteando con Laravel 4 habrás
  notado que está algo verde. Entre varias cosas se echa en falta que no tenga una
  manera sencilla para poder ordenar los resultados por columnas."
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

Si has trasteado o estás trasteando con <a href="http://laravel.com/" title="Web oficial de Laravel" rel="nofollow external">Laravel 4</a> habrás notado que está algo verde. Entre varias cosas se echa en falta que no tenga una manera sencilla para poder ordenar los resultados por columnas.

Dado que yo vengo de CakePHP, me he inspirado en él para crear el sistema de ordenación por columnas, así que si en Cake podemos crear un enlace para ordenar así:

~~~php?start_inline=1
<tr>
    <th><?php echo $this->Paginator->sort('id') ?></th>
    <th><?php echo $this->Paginator->sort('name', 'Nom') ?></th>
    <th><?php echo $this->Paginator->sort('address', 'Adreça') ?></th>
</tr>
~~~

En este tutorial verás cómo hacer para poder ordenar así, utilizando blade (el sistema de plantillas por defecto de Laravel 4):

~~~html
<tr>
    <th>{{ "{{ $posts->sort('id') "}}}}</th>
    <th>{{ "{{ $posts->sort('name', 'Nom') "}}}}</th>
    <th>{{ "{{ $posts->sort('address', 'Adreça') "}}}}</th>
</tr>
~~~

<a href="http://www.racotecnic.com/wp-content/uploads/2014/01/laravel_paginate.png" style="display:block; text-align:center"><img src="http://www.racotecnic.com/wp-content/uploads/2014/01/laravel_paginate.png" alt="laravel_paginate" width="328" height="121" class="aligncenter size-full wp-image-2297" /></a>

Para poder hacer esto tendrás que extender el paginador de Laravel para añadirle las funciones que necesites (como `sort`).

Dado que lo que es ordenar en sí no tiene ninguna complicación y lo puedes encontrar documentado, en este tutorial me centraré más en <strong>cómo extender classes de Laravel 4 para adaptarlo a tus necesidades</strong> y de paso verás cómo tener la ordenación por columnas bien organizada (a nivel código) para mejor reutilización en futuros proyectos.
<blockquote>
<strong>Nota:</strong> Debido al continuo desarrollo de Laravel este tutorial ha quedado rápidamente desfasado. He actualizado todos los enlaces para que funcionen correctamente pero ten en cuenta que algunos de estos ficheros han cambiado mucho o directamente ya no existen.</blockquote>

<a id="more"></a><a id="more-2277"></a>

Antes de empezar me gustaría aclarar que no soy experto en Laravel ni mucho menos, simplemente me puse a trastear con él, vi que no tenía esta funcionalidad y exploré hasta encontrar la manera de integrarlo mejor en mi aplicación. Gracias a ello aprendí mucho mejor cómo funciona Laravel (internamente) y es en parte esto lo que quiero compartir contigo.

Por otro lado, a pesar de que el siguiente post rebosa de referencias externas a documentación, código incrustado y código en github, no estaría de más que hubieras leído la documentación de Laravel 4 antes de empezar.

## Entendiendo el paginador

### La <i>Facade</i> Paginator

> <b>Nota:</b> Si no sabes qué es una <i>Facade</i>, <a href="http://laravel.com/docs/facades" rel="nofollow external" title="Abrir documentación sobre Facades">repásate la documentación</a>.

Para hacer todo esto lo primero que hay que hacer es entender cómo funciona el paginador actual de Laravel 4. Vayamos al grano.

Si accedes al directorio <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination" rel="nofollow external">vendor/laravel/framework/src/Illuminate/Pagination</a> verás que hay un directorio llamado <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/views" title="Ver en github" rel="nofollow external">views</a>, un fichero `composer.json` y cuatro ficheros php.

En la carpeta `views` hay tres plantillas para mostrar los <a href="http://laravel.com/docs/pagination" rel="nofollow external">botones de la paginación</a>. Si no leíste la documentación de Laravel sobre la paginación, gracias a este directorio acabas de averiguar que los botones de paginación tienen plantillas y que hay tres definidas por defecto.

El fichero `composer.json` ignóralo y de los ficheros PHP, fíjate en los tres siguientes:

- [Paginator.php](https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/Paginator.php)
- [PaginationServiceProvider.php](https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/PaginationServiceProvider.php)
- [Environment.php](https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/Environment.php)

El fichero `Paginator.php` es el que realmente te interesa ya que aquí es donde residen métodos como <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/Paginator.php#L176" rel="nofollow external" title="Ver en github">`links()`</a> y por tanto es donde te interesa añadir el método `sort()`.

No obstante, para poder hacer todo esto posible necesitarás hacer tu propio `PaginationServiceProvider.php` y tu propio `Environment.php`, ya que es en esos dos ficheros donde se inicializa el paginador.

Para entender esto mejor, abre tu fichero `app.php` y en el array de providers fíjate que, entre varios providers, <a href="https://github.com/laravel/laravel/tree/3ad58caba6c79c487deecb2fd7b0ea94e45b4f38/app/config/app.php#L98" title="Ver en github" rel="nofollow external">hay el siguiente</a>:

~~~php?start_inline=1
return array(
    // ... otros parámetros de configuración ...

    'providers' => array(
        // ... otros providers ...
        'Illuminate\Pagination\PaginationServiceProvider',
        // ... más providers ...
    )

    // ... más parámetros de configuración ...
);
~~~

Así pues, para cargar el paginador lo primero que hace Laravel es cargar la clase `PaginationServiceProvider`.

Si abres este fichero podrás observar cómo en el método <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/PaginationServiceProvider.php#L23" title="Ver en github" rel="nofollow external">`register`</a> se inicializa la clase `Environment`.

~~~php?start_inline=1
/**
 * Register the service provider.
 *
 * @return void
 */
public function register()
{
    $this->app['paginator'] = $this->app->share(function($app)
    {
        $paginator = new Environment($app['request'], $app['view'], $app['translator']);

        $paginator->setViewName($app['config']['view.pagination']);

        return $paginator;
    });
}
~~~

Y en la clase `Enviornment`, finalmente, en el método <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Pagination/Environment.php#L103" title="Ver en github" rel="nofollow external">`make()`</a> se innicializa la clase `Paginator`.

~~~php?start_inline=1
/**
 * Get a new paginator instance.
 *
 * @param  array  $items
 * @param  int    $total
 * @param  int    $perPage
 * @return \Illuminate\Pagination\Paginator
 */
public function make(array $items, $total, $perPage)
{
    $paginator = new Paginator($this, $items, $total, $perPage);

    return $paginator->setupPaginationContext();
}
~~~

<b>Resumiendo:</b> En `app.php` se carga el `PaginationServiceProvider` que carga `Environment` que a su vez carga `Paginator`; así que habrá que crear tres clases para poder crear el método `sort()`.

### El método paginate de Eloquent

Esto que has visto únicamente es para añadir el método `sort()`, que básicamente pintará enlaces en las vistas, pero todavía tienes que hacer que la paginación te haga caso y ordene según los parámetros establecidos.

Si recuerdas <a href="http://laravel.com/docs/pagination" rel="nofollow external" title="Abrir documentación sobre la paginación">la documentación de Laravel</a>, para hacer la paginación de elementos debes hacer algo así (los ejemplos a continuación son de un controlador):

~~~php?start_inline=1
public function index()
{
    $posts = Post::paginate(20);

    return View::make('posts.admin.index')->with('posts', $posts);
}
~~~

Éste método <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Database/Eloquent/Builder.php" rel="nofollow external" title="Ver en github">`paginate()`</a> forma parte del `Builder` de Eloquent, así que también habrá que extenderlo si quieres que la paginación tome parámetros adicionales de la URL para ordenar los resultados.

Si en lugar de paginar como en el ejemplo anterior lo hubiera hecho así:

~~~php?start_inline=1
public function index()
{
    $posts = Db::table('posts')->paginate('15');

    return View::make('posts.admin.index')->with('posts', $posts);
}
~~~

En vez de modificar el Builder de Eloquent tendrías que modificar el <a href="https://github.com/laravel/framework/tree/a54dda66de814f8c2085e71c69e44e91f1b46a9c/src/Illuminate/Database/Query/Builder.php#L1394" rel="nofollow external" title="Ver en github">Builder de queries</a>. Aun así, en este tutorial me centraré en el método `paginate()` del Builder de Eloquent (primer ejemplo).

No obstante, el Builder de Eloquent no se carga igual que el paginador. Éste está inyectado en los modelos, por lo que podrías modificar el método `paginate` directamente redefiniéndolo en el modelo deseado, ya que éste extiende de Eloquent:

~~~php?start_inline=1
// app/models/Post.php
class Post extends Eloquent
{
    public function paginate($perPage, $columns = array('*'), $orderBy = array())
    {
        // nuestros cambios para ordenar por columna
    }
}
~~~

Fácilmente puedes añadirlo en un nuevo modelo padre del cual extender, por ejemplo `AppModel` (ya que digo que vengo de CakePHP, voy a demostrarlo):

~~~php?start_inline=1
// app/models/AppModel.php
class AppModel extends Eloquent
{
    public function paginate($perPage, $columns = array('*'), $orderBy = array())
    {
        // nuestros cambios para ordenar por columna
    }
}

// app/models/Post.php
class Post extends AppModel
{

}
~~~

Pero esto en realidad no sería muy reusable, así que en su lugar, y ya que Laravel está pensado para ser utilizado con PHP >= 5.4, lo que harás será crear un <a href="http://www.php.net/manual/es/language.oop5.traits.php" rel="nofollow external" title="Ver en php.net">trait</a>.

Habiendo creado el trait simplemente habrá que indicarlo en aquellos modelos donde quieras utilizarlo:

~~~php?start_inline=1
class Post extends Eloquent
{
    use OrderBy; // donde OrderBy es el nombre que has puesto al trait
}
~~~

## Los cambios

Confiando en que has entendido algo de lo que he explicado hasta ahora, resumiré los cambios a hacer y enlazaré hacia los ficheros que <a href="https://github.com/elboletaire/laravel-utils-and-extensions" rel="external" title="Ver proyecto en github">he publicado en github</a>.

Yo tengo todas mis extensiones dentro del directorio `app/library/Minombre/Extensions`, pero tienes que poder ponerlas en cualquier directorio que cargue clases Laravel siempre y cuando respetes los <i>namespaces</i>.

### Yendo al grano

Si quieres ahorrarte el proceso que viene a continuación <a href="https://github.com/elboletaire/laravel-utils-and-extensions" rel="external" title="Ver proyecto en github">puedes añadir mi proyecto</a> como un submódulo de tu proyecto fácilmente:

~~~bash
git submodule add https://github.com/elboletaire/laravel-utils-and-extensions.git app/library/Elboletaire
~~~

Si no utilizas git <a href="https://github.com/elboletaire/laravel-utils-and-extensions/archive/master.zip" rel="nofollow">descarga directamente el zip de github</a> y descomprime los contenidos del fichero en un nuevo directorio `app/library/Elboletaire`.

### El método `sort`

Volviendo al resumen, tienes que crear tu propio <a href="https://github.com/elboletaire/laravel-utils-and-extensions/blob/master/Extensions/Pagination/PaginationServiceProvider.php" rel="nofollow external" title="Ver en github">`PaginationServiceProvider`</a> para en él cargar un nuevo <a href="https://github.com/elboletaire/laravel-utils-and-extensions/blob/master/Extensions/Pagination/Environment.php" rel="nofollow external" title="Ver en github">`Environment`</a> que finalmente será quien cargue el <a href="https://github.com/elboletaire/laravel-utils-and-extensions/blob/master/Extensions/Pagination/Paginator.php" rel="nofollow external" title="Ver en github">`Paginator`</a>.

Es en ésta última clase `Paginator` donde deberás definir el método sort y otros métodos necesarios para que éste funcione correctamente. Como digo muy a menudo, el código habla por sí solo, así que no me centraré en explicarlo.

Una vez has creado tus ficheros (con su contenido, evidentemente) tienes que modificar el array de `providers` para que cargue tu `PaginationServiceProvider` en lugar de el de Laravel:

~~~php?start_inline=1
return array(
    // [...]

    'providers' => array(
        // reemplazas el original
        // 'Illuminate\Pagination\PaginationServiceProvider',
        // por el tuyo
        'Elboletaire\Extensions\Pagination\PaginationServiceProvider'
    )

    // [...]
);
~~~

### El método `paginate`

Crea un trait en el mismo directorio donde has creado los ficheros anteriores; éste será el encaragdo de modificar la consulta hacia la base de datos a partir de los datos recibidos vía `GET`.

Puedes ponerle el nombre que quieras, al mío lo he llamado <a href="https://github.com/elboletaire/laravel-utils-and-extensions/blob/master/Extensions/Pagination/PaginatorSort.php" rel="nofollow external" title="Ver en github">`PaginatorSort`</a>, pero como digo es cuestión de gustos.

Una vez creado y hecha la lógica sólo hay que llamarlo desde el modelo que quieras que tenga ordenación por columnas:

~~~php?start_inline=1
class Post extends Eloquent
{
    use Elboletaire\Extensions\Pagination\PaginatorSort;
}
~~~


### Añadiendo paginación

Hechos estos dos sencillos pasos, ya puedes añadir a tus vistas los enlaces para poder ordenar por columna:

~~~php?start_inline=1
<tr>
    <th>{{ "{{ $posts->sort('id') "}}}}</th>
    <th>{{ "{{ $posts->sort('name', 'Nombre') "}}}}</th>
</tr>
~~~

Y mientras tu controlador (o ruta) cargue los datos de la paginación <strong>mediante el modelo</strong> (al que previamente has cargado el trait creado):

~~~php?start_inline=1
public function index()
{
    $posts = Post::paginate(20);

    return View::make('posts.admin.index')->with('posts', $posts);
}
~~~

...la paginación estaría funcionando. <i>Congrats my friend</i> :D

Si quieres puedes especificar el orden por defecto pasándolo como tercer parámetro:

~~~php?start_inline=1
public function index()
{
    $posts = Post::paginate(20, null, 'name asc');
    // o bien pasado como array:
    $posts = Post::paginate(20, null, array(
        'direction' => 'asc',
        'sort'      => 'name'
    ));

    return View::make('posts.admin.index')->with('posts', $posts);
}
~~~

## Fin [referencias y esas cosas]

Si eres lector asiduo (aunque aquí no nos vaya mucho esto de la asiduidad..) sabrás que estoy abierto a que me preguntéis lo que sea —otra cosa es si sabré contestar...

El repositorio está colgado en github, entre otras cosas, para que la gente colabore; así que si te animas ya sabes.

<blockquote>
  <strong>Más información y fuentes:</strong>

<ul>
    <li><a rel="nofollow external" href="http://laravel.com/docs">Documentación de Laravel</a></li>
    <li><a rel="nofollow external" href="http://www.php.net/manual/en/language.oop5.traits.php">Documentación acerca de los traits</a></li>
    <li><a rel="nofollow external" href="http://forums.laravel.io/viewtopic.php?pid=39576#p39576">How to extend Illuminate\Database\Eloquent\Builder class?</a></li>
  </ul>
</blockquote>
