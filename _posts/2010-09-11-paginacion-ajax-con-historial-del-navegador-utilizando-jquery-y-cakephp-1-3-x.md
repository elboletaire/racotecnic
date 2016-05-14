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
  wp-image-1621 alignright\" title=\"pagination\" src=\"http://racotecnic.com/wp-content/uploads/2010/09/pagination.png\"
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
<p><a href="http://racotecnic.com/tutorials/cake13/pags"><img class="size-full wp-image-1621 alignright" title="pagination" src="http://racotecnic.com/wp-content/uploads/2010/09/pagination.png" alt="" width="279" height="126" /></a>Voy a explicaros una manera sencilla de hacer la paginación de vuestras webs y aplicaciones hechas con CakePHP en Ajax utilizando jQuery y un plugin para que el historial del navegador funcione correctamente.</p>
<p>Para <a href="http://racotecnic.com/tutorials/cake13/pags">mi ejemplo</a> he utilizado <a rel="nofollow external" href="http://github.com/cakephp/cakephp/downloads">CakePHP 1.3.3</a> y <a rel="nofollow external" href="http://jquery.com/">jQuery 1.4.2</a>. El plugin que comentaba anteriormente se llama jQuery History Plugin y lo podéis <a rel="external nofollow" href="http://github.com/tkyk/jquery-history-plugin">descargar de gitHub</a>.</p>
<p>Bien pues vamos a ello. Empecemos por el controlador. Simplemente tenéis que tener en cuenta que vamos a utilizar el <em>helper </em>de JavaScript, así que debemos activarlo:</p>
<p><a id="more"></a><a id="more-1614"></a></p>
<p>[php]&lt;?php<br />
class PagsController extends AppController<br />
{<br />
    var $helpers = array('Javascript');</p>
<p>    public function index()<br />
    {<br />
        $this-&gt;set('pags', $this-&gt;paginate());<br />
    }<br />
}[/php]</p>
<p>Ya veis que no tiene ninguna complicación. La vista tampoco es nada del otro mundo:</p>
<p>[php]&lt;table id=&quot;pags&quot;&gt;<br />
    &lt;thead&gt;<br />
        &lt;tr&gt;<br />
            &lt;th&gt;&lt;?php echo $paginator-&gt;sort('id') ?&gt;&lt;/th&gt;<br />
            &lt;th&gt;&lt;?php echo $paginator-&gt;sort('title') ?&gt;&lt;/th&gt;<br />
            &lt;th&gt;&lt;?php echo $paginator-&gt;sort('conent') ?&gt;&lt;/th&gt;<br />
            &lt;th&gt;&lt;?php echo $paginator-&gt;sort('created') ?&gt;&lt;/th&gt;<br />
            &lt;th&gt;&lt;?php echo $paginator-&gt;sort('modified') ?&gt;&lt;/th&gt;<br />
        &lt;/tr&gt;<br />
    &lt;/thead&gt;<br />
    &lt;tbody&gt;<br />
        &lt;?php foreach ( $pags as $pag ): ?&gt;<br />
        &lt;tr&gt;<br />
            &lt;td&gt;&lt;?php echo $pag['Pag']['id'] ?&gt;&lt;/td&gt;<br />
            &lt;td&gt;&lt;?php echo $pag['Pag']['title'] ?&gt;&lt;/td&gt;<br />
            &lt;td&gt;&lt;?php echo $pag['Pag']['conent'] ?&gt;&lt;/td&gt;<br />
            &lt;td&gt;&lt;?php echo $pag['Pag']['created'] ?&gt;&lt;/td&gt;<br />
            &lt;td&gt;&lt;?php echo $pag['Pag']['modified'] ?&gt;&lt;/td&gt;<br />
        &lt;/tr&gt;<br />
        &lt;?php endforeach ?&gt;<br />
        &lt;tr&gt;<br />
            &lt;td&gt;&lt;?php echo $paginator-&gt;prev('« Anterior') ?&gt;&lt;/td&gt;<br />
            &lt;td colspan=&quot;3&quot;&gt;&lt;?php echo $paginator-&gt;numbers() ?&gt;&lt;/td&gt;<br />
            &lt;td&gt;&lt;?php echo $paginator-&gt;next('Siguiente »') ?&gt;&lt;/td&gt;<br />
        &lt;/tr&gt;<br />
    &lt;/tbody&gt;<br />
&lt;/table&gt;<br />
&lt;div class=&quot;ajax-loader&quot;&gt;<br />
	&lt;?php echo $this-&gt;Html-&gt;image('loader.gif', array('alt' =&gt; 'Cargando...','style' =&gt; 'display: none')) ?&gt;<br />
&lt;/div&gt;<br />
[/php]</p>
<p>Bien, ya tenemos la parte sencilla. Vamos al intríngulis de la cuestión: el JavaScript (o el <em>jQuery</em>, mejor dicho..).</p>
<p>En la vista que tenemos creada, vamos a cargar <em>jQuery </em>y el plugin de historial, que debéis tener ya descargados en vuestra carpeta <em>js</em>:</p>
<p>[php]&lt;?php<br />
$this-&gt;Javascript-&gt;link(array('jquery-1.4.2.min', 'jquery.history'), false);[/php]</p>
<p>Y ahora, la paginación con Ajax. Debajo de la línea que acabamos de añadir para cargar <em>jQuery </em>y el <em>History plugin</em> añadid lo siguiente:</p>
<p>[php]<br />
$script = '<br />
jQuery(function($) { // paso $ para no tener problemas con otros frameworks JS<br />
	$.history.init(function(url){<br />
		if ( url == &quot;&quot; ) url = &quot;'.$this-&gt;Html-&gt;url(array('controller' =&gt; 'pags', 'action' =&gt; 'index')).'&quot;; // si no recibimos URL tenemos que cargar el índice<br />
                $(&quot;.ajax-loader img&quot;).fadeIn(); // mostramos el gif animado<br />
		$.ajax({<br />
			type: &quot;GET&quot;,<br />
			url: url,<br />
			dataType: &quot;html&quot;,<br />
			success: function(data) {<br />
				$(&quot;#pags&quot;).html($(data).find(&quot;#pags&quot;));<br />
		                $(&quot;.ajax-loader img&quot;).fadeOut(); // ocultamos el gif animado<br />
			}<br />
		});<br />
	});</p>
<p>	$(&quot;a[href*=/page:]&quot;).live(&quot;click&quot;, function(e) {<br />
		$.history.load($(this).attr(&quot;href&quot;));<br />
		e.preventDefault(); // return false;<br />
	});<br />
});<br />
';<br />
$this-&gt;Javascript-&gt;codeBlock($script, array('inline' =&gt; false));[/php]</p>
<p>Bien, ¿qué estamos haciendo aquí? Voy a explicarlo paso por paso.</p>
<p>Hay que tener en cuenta que el plugin de historial hace que el código sea un poco distinto a si no lo tuviéramos con dicho plugin, ya que el método <code>$.history.init()</code> es el que se encarga de cargar la página mediante Ajax cuando <code>$.history.load()</code> es instanciado.</p>
<p>Por esto, dentro del método <code>$.history.init()</code> ejecutamos nuestro método de carga mediante Ajax. En la primera línea le indicamos que si no recibe url ésta debe ser el índice de nuestra paginación. Sin esta línea cada vez que entraseis a la página raíz (sin <em>hash</em>) tendríais un error de JavaScript, además de que no funcionaría el historial con la primera página nunca.</p>
<p>Después de eso, llamamos al método <code>$.ajax()</code> para hacer nuestra petición Ajax. De aquí todo está explicado en la documentación, salvo esta línea:</p>
<p>[js]$(&quot;#pags&quot;).html($(data).find(&quot;#pags&quot;));[/js]</p>
<p>Aquí indicamos que queremos reemplazar todo el contenido de la tabla <em>#pags</em> con ese mismo contenido de nuestra petición Ajax (de ahí el <code>$(data).find("#pags")</code> donde filtramos "#pags" de "data" [nuestra respuesta Ajax]).</p>
<p>Por último, en este trozo de código:</p>
<p>[js]$(&quot;a[href*=/page:]&quot;).live(&quot;click&quot;, function(e) {<br />
        $.history.load($(this).attr(&quot;href&quot;));<br />
        e.preventDefault(); // return false;<br />
    });[/js]</p>
<p>Estamos indicando que siempre que se pulse un enlace que contenga en su ruta (href) "/page:" se dispare el método <code>$.history.load()</code>, al que le pasamos la url del enlace que estemos pulsando.</p>
<p>Utilizamos el método "live" de jQuery, ya que al reemplazar los botones de la tabla, sin <em>live</em>, éstos no funcionarían.</p>
<p>El <code>e.preventDefault();</code> equivale al típico <code>return false;</code> que utilizamos para evitar que el botón ejecute su método por defecto (cargar la página sin Ajax).</p>
<p>Pues ya está, de esta manera tan sencilla tenemos <strong>paginación Ajax con historial del navegador gracias a jQuery en nuestra aplicación CakePHP</strong>.</p>
<p>Podéis ver un ejemplo en la siguiente dirección: <a href="http://racotecnic.com/tutorials/cake13/pags">http://racotecnic.com/tutorials/cake13/pags</a>.</p>
<p>El problema de éste método de paginación es que, aunque le ahorramos tiempo de carga al cliente, nuestro servidor carga toda la página igualmente. Si quisierais reducir la carga de vuestro servidor con Ajax quizás deberíais ingeniároslas para cargar sólo esa parte de la vista y devolverla en formato XHTML en un JSON (o en un JSON directamente) y repoblar vuestra tabla con dicho resultado.</p>
<p>Algún día trataré de hacer un tutorial explicando esto con detalle ;)</p>
<blockquote><p><strong>Enlaces:</strong></p>
<ul>
<li><a href="http://racotecnic.com/tutorials/cake13/pags">Demo del tutorial</a></li>
<li><a href="http://racotecnic.com/tutorials/2010/09/cake_jquery_pagination.zip">Descarga .zip con los ficheros utilizados</a></li>
<li><a rel="nofollow external" href="http://cakephp.org/">CakePHP</a></li>
<li><a rel="nofollow external" href="http://jquery.com/">jQuery</a></li>
<li><a rel="nofollow external" href="http://github.com/tkyk/jquery-history-plugin">jQuery History Plugin</a></li>
<li><a href="http://www.preloaders.net">Cargadores Ajax (gifs animados)</a></li>
</ul>
</blockquote>
<blockquote><p><strong>Edit:</strong> Cuando escribí esto no recordaba que la nueva versión de CakePHP lleva helpers para jQuery y para todo lo relacionado con Ajax. En cuanto pueda investigo cómo va el asunto y creo un tutorial con ello, pero mientras tanto...</p>
<p><a href="http://book.cakephp.org/view/1592/Js" target="_blank" rel="nofollow">http://book.cakephp.org/view/1592/Js</a><br />
<a href="http://book.cakephp.org/view/1434/HTML" target="_blank" rel="nofollow">hhttp://book.cakephp.org/view/1434/HTML</a></p>
<p>Podéis ir echando un vistazo por vuestra cuenta :D</p></blockquote>
