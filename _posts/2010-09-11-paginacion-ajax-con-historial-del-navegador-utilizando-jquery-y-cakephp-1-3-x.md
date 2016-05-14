---
layout: post
status: publish
published: true
title: Paginación Ajax con historial del navegador utilizando jQuery y CakePHP 1.3.x
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<a href=\"http://racotecnic.com/tutorials/cake13/pags\"><img class=\"size-full
  wp-image-1621 alignright\" title=\"pagination\" src=\"{{ site.url }}/uploads/2010/09/pagination.png\"
  alt=\"\" width=\"279\" height=\"126\" /></a>Voy a explicaros una manera sencilla
  de hacer la paginación de vuestras webs y aplicaciones hechas con CakePHP en Ajax
  utilizando jQuery y un plugin para que el historial del navegador funcione correctamente.\r\n\r\nPara
  <a href=\"http://racotecnic.com/tutorials/cake13/pags\">mi ejemplo</a> he utilizado
  <a rel=\"nofollow external\" href=\"http://github.com/cakephp/cakephp/downloads\">CakePHP
  1.3.3</a> y <a rel=\"nofollow external\" href=\"http://jquery.com/\">jQuery 1.4.2</a>.
  El plugin que comentaba anteriormente se llama jQuery History Plugin y lo podéis
  <a rel=\"external nofollow\" href=\"http://github.com/tkyk/jquery-history-plugin\">descargar
  de gitHub</a>.\r\n\r\nBien pues vamos a ello. Empecemos por el controlador. Simplemente
  tenéis que tener en cuenta que vamos a utilizar el <em>helper </em>de JavaScript,
  así que debemos activarlo:\r\n\r\n"
wordpress_id: 1614
wordpress_url: http://racotecnic.underave.net/?p=1614
date: '2010-09-11 15:20:16 +0200'
date_gmt: '2010-09-11 14:20:16 +0200'
categories:
- Programació
- Web
tags:
- jQuery
- CakePHP
- Ajax
- CakePHP 1.3
- CakePHP 1.2
- Paginació
---

<a href="http://racotecnic.com/tutorials/cake13/pags"><img class="size-full wp-image-1621 alignright" title="pagination" src="{{ site.url }}/uploads/2010/09/pagination.png" alt="" width="279" height="126" /></a>Voy a explicaros una manera sencilla de hacer la paginación de vuestras webs y aplicaciones hechas con CakePHP en Ajax utilizando jQuery y un plugin para que el historial del navegador funcione correctamente.

Para <a href="http://racotecnic.com/tutorials/cake13/pags">mi ejemplo</a> he utilizado <a rel="nofollow external" href="http://github.com/cakephp/cakephp/downloads">CakePHP 1.3.3</a> y <a rel="nofollow external" href="http://jquery.com/">jQuery 1.4.2</a>. El plugin que comentaba anteriormente se llama jQuery History Plugin y lo podéis <a rel="external nofollow" href="http://github.com/tkyk/jquery-history-plugin">descargar de gitHub</a>.

Bien pues vamos a ello. Empecemos por el controlador. Simplemente tenéis que tener en cuenta que vamos a utilizar el <em>helper </em>de JavaScript, así que debemos activarlo:

<a id="more"></a><a id="more-1614"></a>

~~~php
<?php
class PagsController extends AppController
{
    var $helpers = array('Javascript');

    public function index()
    {
        $this->set('pags', $this->paginate());
    }
}
~~~

Ya veis que no tiene ninguna complicación. La vista tampoco es nada del otro mundo:

~~~php
<table id='pags'>
    <thead>
        <tr>
            <th><?php echo $paginator->sort('id') ?></th>
            <th><?php echo $paginator->sort('title') ?></th>
            <th><?php echo $paginator->sort('conent') ?></th>
            <th><?php echo $paginator->sort('created') ?></th>
            <th><?php echo $paginator->sort('modified') ?></th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ( $pags as $pag ): ?>
        <tr>
            <td><?php echo $pag['Pag']['id'] ?></td>
            <td><?php echo $pag['Pag']['title'] ?></td>
            <td><?php echo $pag['Pag']['conent'] ?></td>
            <td><?php echo $pag['Pag']['created'] ?></td>
            <td><?php echo $pag['Pag']['modified'] ?></td>
        </tr>
        <?php endforeach ?>
        <tr>
            <td><?php echo $paginator->prev('« Anterior') ?></td>
            <td colspan='3'><?php echo $paginator->numbers() ?></td>
            <td><?php echo $paginator->next('Siguiente »') ?></td>
        </tr>
    </tbody>
</table>
<div class='ajax-loader'>
	<?php echo $this->Html->image('loader.gif', array('alt' => 'Cargando...','style' => 'display: none')) ?>
</div>

~~~

Bien, ya tenemos la parte sencilla. Vamos al intríngulis de la cuestión: el JavaScript (o el <em>jQuery</em>, mejor dicho..).

En la vista que tenemos creada, vamos a cargar <em>jQuery </em>y el plugin de historial, que debéis tener ya descargados en vuestra carpeta <em>js</em>:

~~~php
<?php
$this->Javascript->link(array('jquery-1.4.2.min', 'jquery.history'), false);
~~~

Y ahora, la paginación con Ajax. Debajo de la línea que acabamos de añadir para cargar <em>jQuery </em>y el <em>History plugin</em> añadid lo siguiente:

~~~php

$script = '
jQuery(function($) { // paso $ para no tener problemas con otros frameworks JS
	$.history.init(function(url){
		if ( url == '' ) url = ''.$this->Html->url(array('controller' => 'pags', 'action' => 'index')).''; // si no recibimos URL tenemos que cargar el índice
                $('.ajax-loader img').fadeIn(); // mostramos el gif animado
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function(data) {
				$('#pags').html($(data).find('#pags'));
		                $('.ajax-loader img').fadeOut(); // ocultamos el gif animado
			}
		});
	});

	$('a[href*=/page:]').live('click', function(e) {
		$.history.load($(this).attr('href'));
		e.preventDefault(); // return false;
	});
});
';
$this->Javascript->codeBlock($script, array('inline' => false));
~~~

Bien, ¿qué estamos haciendo aquí? Voy a explicarlo paso por paso.

Hay que tener en cuenta que el plugin de historial hace que el código sea un poco distinto a si no lo tuviéramos con dicho plugin, ya que el método `$.history.init()` es el que se encarga de cargar la página mediante Ajax cuando `$.history.load()` es instanciado.

Por esto, dentro del método `$.history.init()` ejecutamos nuestro método de carga mediante Ajax. En la primera línea le indicamos que si no recibe url ésta debe ser el índice de nuestra paginación. Sin esta línea cada vez que entraseis a la página raíz (sin <em>hash</em>) tendríais un error de JavaScript, además de que no funcionaría el historial con la primera página nunca.

Después de eso, llamamos al método `$.ajax()` para hacer nuestra petición Ajax. De aquí todo está explicado en la documentación, salvo esta línea:

~~~javascript
$('#pags').html($(data).find('#pags'));
~~~

Aquí indicamos que queremos reemplazar todo el contenido de la tabla <em>#pags</em> con ese mismo contenido de nuestra petición Ajax (de ahí el `$(data).find("#pags")` donde filtramos "#pags" de "data" [nuestra respuesta Ajax]).

Por último, en este trozo de código:

~~~javascript
$('a[href*=/page:]').live('click', function(e) {
        $.history.load($(this).attr('href'));
        e.preventDefault(); // return false;
    });
~~~

Estamos indicando que siempre que se pulse un enlace que contenga en su ruta (href) "/page:" se dispare el método `$.history.load()`, al que le pasamos la url del enlace que estemos pulsando.

Utilizamos el método "live" de jQuery, ya que al reemplazar los botones de la tabla, sin <em>live</em>, éstos no funcionarían.

El `e.preventDefault();` equivale al típico `return false;` que utilizamos para evitar que el botón ejecute su método por defecto (cargar la página sin Ajax).

Pues ya está, de esta manera tan sencilla tenemos **paginación Ajax con historial del navegador gracias a jQuery en nuestra aplicación CakePHP**.

Podéis ver un ejemplo en la siguiente dirección: <a href="http://racotecnic.com/tutorials/cake13/pags">http://racotecnic.com/tutorials/cake13/pags</a>.

El problema de éste método de paginación es que, aunque le ahorramos tiempo de carga al cliente, nuestro servidor carga toda la página igualmente. Si quisierais reducir la carga de vuestro servidor con Ajax quizás deberíais ingeniároslas para cargar sólo esa parte de la vista y devolverla en formato XHTML en un JSON (o en un JSON directamente) y repoblar vuestra tabla con dicho resultado.

Algún día trataré de hacer un tutorial explicando esto con detalle ;)
<blockquote>
**Enlaces:**

<ul>
<li><a href="http://racotecnic.com/tutorials/cake13/pags">Demo del tutorial</a></li>
<li><a href="http://racotecnic.com/tutorials/2010/09/cake_jquery_pagination.zip">Descarga .zip con los ficheros utilizados</a></li>
<li><a rel="nofollow external" href="http://cakephp.org/">CakePHP</a></li>
<li><a rel="nofollow external" href="http://jquery.com/">jQuery</a></li>
<li><a rel="nofollow external" href="http://github.com/tkyk/jquery-history-plugin">jQuery History Plugin</a></li>
<li><a href="http://www.preloaders.net">Cargadores Ajax (gifs animados)</a></li>
</ul>
</blockquote>
<blockquote>
**Edit:** Cuando escribí esto no recordaba que la nueva versión de CakePHP lleva helpers para jQuery y para todo lo relacionado con Ajax. En cuanto pueda investigo cómo va el asunto y creo un tutorial con ello, pero mientras tanto...

<a href="http://book.cakephp.org/view/1592/Js" target="_blank" rel="nofollow">http://book.cakephp.org/view/1592/Js</a>
<a href="http://book.cakephp.org/view/1434/HTML" target="_blank" rel="nofollow">hhttp://book.cakephp.org/view/1434/HTML</a>

Podéis ir echando un vistazo por vuestra cuenta :D</blockquote>
