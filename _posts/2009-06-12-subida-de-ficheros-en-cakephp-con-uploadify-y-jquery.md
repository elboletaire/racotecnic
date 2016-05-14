---
layout: post
status: publish
published: true
title: Subida de ficheros en CakePHP 1.2 con uploadify y jQuery
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<blockquote>\r\n\t<em>Entrada actualizada a 18 de junio de 2009. Los cambios
  son desde <a href=\"#ampliacio\">aquí</a></em><br />\r\n\t<b>Existe una entrada
  más reciente relacionada con este tema: <a href=\"/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp/\"
  target=\"_top\">Subida de ficheros con Uploadify y validación Ajax en CakePHP</a></b>\r\n</blockquote>\r\n\r\nDespués
  de mucho tiempo liado con el fin de curso y tras mucho investigar con CakePHP por
  fin escribo algo al respecto. Para los que no lo sepáis, <strong>CakePHP</strong>
  es un <a title=\"Definición de framework\" href=\"http://es.wikipedia.org/wiki/Framework\"
  target=\"_blank\"><em>framework</em></a> de PHP que nos permite programar más rápido
  nuestras aplicaciones web PHP ya que nos ofrece las herramientas para que empecemos
  a escribir el código que realmente necesitamos: la lógica de la aplicación.\r\n\r\nSi
  no conocíais CakePHP y os ha interesado el tema echad un ojo a <a title=\"Visitar
  web de CakePHP\" href=\"http://www.cakephp.org\" target=\"_blank\">su página web</a>,
  <a title=\"Descargas de CakePHP\" href=\"http://cakephp.org/downloads\" target=\"_blank\">descargaos
  una copia</a> y empezad a hacer pruebas. En su web podréis encontrar la <a title=\"Comenzando
  con CakePHP\" href=\"http://book.cakephp.org/es/view/4/Comenzando-con-CakePHP\"
  target=\"_blank\">mayor parte de la documentación</a> y todo lo demás, como no,
  en <a title=\"Realmente hacía falta enlazarlo?\" href=\"http://www.google.es\" target=\"_blank\">google</a>.\r\n\r\nEn
  este artículo explicaré cómo integrar <a title=\"Página web oficial de uploadify\"
  href=\"http://www.uploadify.com/\" target=\"_blank\">uploadify</a>, un sistema de
  carga de ficheros con Flash y JavaScript (utilizando el <em>framework</em> <a title=\"Página
  web oficial de jQuery\" href=\"http://jquery.com/\" target=\"_blank\">jQuery</a>)
  a CakePHP para permitirnos cargar múltiples ficheros sin tener que refrescar la
  página, así como poder cargar ficheros de gran tamaño.\r\n\r\n"
wordpress_id: 617
wordpress_url: http://racotecnic.underave.net/?p=617
date: '2009-06-12 00:52:32 +0200'
date_gmt: '2009-06-11 23:52:32 +0200'
categories:
- Programació
- Web
tags:
- PHP
- jQuery
- CakePHP
- Uploadify
---
<blockquote>
	<em>Entrada actualizada a 18 de junio de 2009. Los cambios son desde <a href="#ampliacio">aquí</a></em><br />
	<b>Existe una entrada más reciente relacionada con este tema: <a href="/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp/" target="_top">Subida de ficheros con Uploadify y validación Ajax en CakePHP</a></b>
</p></blockquote>
<p>Después de mucho tiempo liado con el fin de curso y tras mucho investigar con CakePHP por fin escribo algo al respecto. Para los que no lo sepáis, <strong>CakePHP</strong> es un <a title="Definición de framework" href="http://es.wikipedia.org/wiki/Framework" target="_blank"><em>framework</em></a> de PHP que nos permite programar más rápido nuestras aplicaciones web PHP ya que nos ofrece las herramientas para que empecemos a escribir el código que realmente necesitamos: la lógica de la aplicación.</p>
<p>Si no conocíais CakePHP y os ha interesado el tema echad un ojo a <a title="Visitar web de CakePHP" href="http://www.cakephp.org" target="_blank">su página web</a>, <a title="Descargas de CakePHP" href="http://cakephp.org/downloads" target="_blank">descargaos una copia</a> y empezad a hacer pruebas. En su web podréis encontrar la <a title="Comenzando con CakePHP" href="http://book.cakephp.org/es/view/4/Comenzando-con-CakePHP" target="_blank">mayor parte de la documentación</a> y todo lo demás, como no, en <a title="Realmente hacía falta enlazarlo?" href="http://www.google.es" target="_blank">google</a>.</p>
<p>En este artículo explicaré cómo integrar <a title="Página web oficial de uploadify" href="http://www.uploadify.com/" target="_blank">uploadify</a>, un sistema de carga de ficheros con Flash y JavaScript (utilizando el <em>framework</em> <a title="Página web oficial de jQuery" href="http://jquery.com/" target="_blank">jQuery</a>) a CakePHP para permitirnos cargar múltiples ficheros sin tener que refrescar la página, así como poder cargar ficheros de gran tamaño.</p>
<p><a id="more"></a><a id="more-617"></a><br />
Antes de empezar, sobreentiendo que tenéis conocimientos sobre CakePHP, así como que habéis utilizado algún sistema de carga de ficheros con flash, tipo <a title="Página web oficial de uploadify" href="http://www.uploadify.com/" target="_blank">uploadify</a> o <a title="Página web oficial de swfUpload" href="http://swfupload.org/" target="_blank">swfupload</a> alguna vez en vuestra vida (aunque no haya sido con Cake). Tampoco estaría de más tener conocimientos de jQuery, para poder gestionar las subidas de ficheros de forma asíncrona. También asumo que ya tenéis CakePHP funcionando en algun servidor.</p>
<p>Dicho esto, empecemos...</p>
<p>Descargamos la última versión de <a title="jQuery downloads" href="http://code.google.com/p/jqueryjs/downloads/list" target="_blank">jQuery</a> (en mi caso la <a title="jQuery 1.3.2 minified" href="http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js" target="_blank">v. 1.3.2</a>) y copiamos o movemos el fichero JavaScript a nuestro directorio de ficheros JavaScript, situado en la carpeta <em>webroot</em> (en <em>/app/webroot/js</em>).</p>
<p>Descargamos la última versión de <a title="Descargar uploadify" href="http://www.uploadify.com/download/" target="_blank">uploadify</a> (en mi caso la <a title="uploadify v 1.6.2. GPL" href="http://www.uploadify.com/_files/jquery.uploadify-v1.6.2.zip" target="_self">v. 1.6.2 GPL</a>). Al descargar uploadify nos daremos cuenta que el paso anterior ha sido inútil dado que en la carpeta de uploadify ya viene jQuery :p estos fallos los tiene cualquiera... u.u</p>
<p>De la carpeta de uploadify nos interesan los siguientes ficheros:</p>
<ul>
<li>cancel.png</li>
<li>jquery.uploadify.js</li>
<li>uploader.swf</li>
<li>uploadify.css</li>
</ul>
<p>el resto eliminadlos (para lo que haremos no son necesarios, no obstante recomiendo que echéis un vistazo a todo ello). Renombrad la carpeta a "uploadify" y movedla dentro del directorio de JavaScripts de <em>webroot</em> (<em>app/webroot/js</em>). Opcionalmente podéis copiar el código del fichero <em>uploadify.css</em> a vuestro fichero css si lo preferís, de este modo podríais descartar también el fichero <em>uploadify.css</em> que apenas contiene 20 líneas.</p>
<p>Ahora que ya tenemos todos los JavaScripts necesarios, pasemos a la parte de los controladores y las vistas.</p>
<p>Para gestionar la subida de ficheros necesitaréis un <em>Component</em> (o bien programar toda la gestión de ficheros "a pelo" en vuestros controladores). Yo he utilizado <em>"<a title="Image Upload Component para CakePHP" href="http://labs.iamkoa.net/2007/10/23/image-upload-component-cakephp/" target="_blank">Image Upload Component</a>"</em>, que además de gestionarme la carga de cualquier tipo de fichero me permite recortar imágenes, generar miniaturas y otras acciones relacionadas con imágenes. <a title="Descargar upload component" href="http://iamkoa.net/mint/pepper/orderedlist/downloads/download.php?file=http%3A//labs.iamkoa.net/wp-content/uploads/2007/11/uploads-component-11062007.zip" target="_blank">Una vez descargado</a> el <em>Upload Component</em> nos quedamos con el fichero <strong><em>upload.php</em></strong> que hay dentro del directorio <em>/app/controllers/components</em> y lo copiamos en este mismo directorio, pero de nuestro proyecto.</p>
<p>Aquí viene el código del controlador, en mi caso "images_controller":</p>
<p><code>[php]&lt;?php<br />
class ImagesController extends AppController<br />
{<br />
	var $name = 'Images';<br />
	var $components = array('Upload');<br />
	var $helpers = array('Uploadify');</p>
<p>	function beforeFilter()<br />
	{<br />
		// Si la acción es subir ficheros<br />
		if($this-&gt;action == 'upload'){<br />
			if (isset($this-&gt;params['pass'][0])){<br />
				// Iniciamos la sesión con el id de sesión pasado como parámetro<br />
				$this-&gt;Session-&gt;id($this-&gt;params['pass'][0]);<br />
				$this-&gt;Session-&gt;start();<br />
			}else{<br />
				$this-&gt;redirect('/');<br />
			}<br />
		}<br />
		// Cargamos el beforeFilter superior (en AppController o Controller)<br />
		parent::beforeFilter();<br />
	}</p>
<p>	function upload()<br />
	{<br />
		// Desactivamos el rendering de la vista para este método<br />
		$this-&gt;autoRender = false;<br />
		if (isset($this-&gt;params['form']['Filedata'])){<br />
			// Creamos una miniatura<br />
			$thumb = $this-&gt;Upload-&gt;upload($this-&gt;params['form']['Filedata'],'img/thumb/', null, array('type' =&gt; 'resizecrop', 'size' =&gt; array('150', '150'), 'output' =&gt; 'jpg'));<br />
			// Si no se crea correctamente<br />
			if ($thumb)<br />
				// Generamos un log con los errores<br />
				$this-&gt;log(&quot;L'usuari &quot; . $this-&gt;Auth-&gt;user('username') .<br />
					&quot; ha tingut errors intentant crear una miniatura: &quot; .<br />
					implode(&quot; | &quot;, $this-&gt;Upload-&gt;errors),'upload');<br />
			else{<br />
				// Si la miniatura se ha creado subimos el fichero a tamaño original<br />
				$result = $this-&gt;Upload-&gt;upload($this-&gt;params['form']['Filedata'],'img/',$this-&gt;Upload-&gt;result);<br />
				if (!$result){<br />
					// Si la imagen se sube correctamente enviamos el nombre de ésta al usuario<br />
					echo $this-&gt;Upload-&gt;result;<br />
					exit;<br />
				}else{<br />
					// En caso contrario generamos un log de error<br />
					$this-&gt;log(&quot;L'usuari &quot; . $this-&gt;Auth-&gt;user('username') .<br />
						&quot; ha tingut errors intentant pujar una imatge: &quot; .<br />
						implode(&quot; | &quot;, $this-&gt;Upload-&gt;errors),'upload');<br />
					echo __(&quot;Error pujant el fitxer&quot;);<br />
					exit;<br />
				}<br />
			}<br />
		}<br />
	}</p>
<p>	function add()<br />
	{<br />
		// Guardamos los datos en la base de datos<br />
		if(!empty($this-&gt;data)){<br />
			$this-&gt;Image-&gt;save($this-&gt;data);<br />
		}<br />
	}<br />
}</p>
<p>[/php]</code></p>
<p>Si no entendéis algo podéis referiros a la <a href="http://api.cakephp.org" target="_blank" title="Ir a la API">api</a> y al <a href="http://book.cakephp.org" target="_blank" title="Ir al libro de recetas de Cake">libro de recetas</a> de Cake o, en caso de ser con la generación de imágenes a la ayuda del <a title="Image Upload Component para CakePHP" href="http://labs.iamkoa.net/2007/10/23/image-upload-component-cakephp/" target="_blank">Image Upload Component</a>.</p>
<p>Como podéis ver he instanciado un <em>helper</em> que se llama "Uploadify". Lo he creado yo para insertar el código JavaScript de uploadify en las vistas y si lo queréis lo podéis descargar desde <a href='http://www.racotecnic.com/wp-content/uploads/2009/06/uploadify_helper.zip'>aquí</a>. Cuando llegue el momento de explicar las vistas pondré los ejemplos utilizando el código convencional y el código del <em>helper</em>.</p>
<p>Siguiendo con el controlador "images_controller", el <em>beforeFilter</em> se encarga de iniciar la sesión en caso de que ésta no exista, a partir de un ID que le pasaremos desde la vista como primer parámetro. Sin estas líneas en que se inicia la sesión de nuevo seguramente tendríais problemas al enviar el fichero; éste se enviaría pero al llegar al 100% os daría un IO error (en mac y linux) o bien os incrustará la ventana de login por ahí en medio (en windows). Una vez iniciada la sesión se llama al <em>beforeFilter</em> superior para realizar las tareas pertinentes.</p>
<p>Las tareas del método upload están descritas en los comentarios y no creo que haga falta entrar en más detalles. Para más detalles, como he dicho antes, dirigíos a la ayuda de Cake o del Image Upload Component.</p>
<p>En el método add() hacemos las tareas necesarias para guardar los datos.</p>
<blockquote><p><em><strong>Nota:</strong> El envío de ficheros debéis hacerlo al mismo controlador. Si intentáis hacer un envío de ficheros desde el controlador "images" al controlador "files" (por ejemplo), NO FUNCIONARÁ. No sé porqué, así que si alguien encuentra el modo de hacerlo o sabe porqué pasa agradecería que me lo comentara por aquí.</em></p></blockquote>
<p>Ya tenemos el controlador con su componente, ahora nos quedan únicamente la vista, pero antes explicaré cómo funciona el helper que he creado para aquellos que quieran utilizarlo...</p>
<p>Primero decir que es la primera "versión" (si es que se le puede llamar así), así que veréis que hay algún fallo o cosa sin terminar. Con el tiempo quizás lo mejore, aunque por el momento me funciona perfectamente tal como está.</p>
<p>Una vez iniciado el <em>helper</em> en el controlador únicamente tenéis que llamar a la función "<em>startUploader</em>" de dicho <em>helper</em>. Como primer parámetro debéis pasar un array asociativo con el id de la capa del uploader como clave y el directorio destino como valor de la clave. Lamentablemente el directorio de destino no está implementado en este ejemplo, pero utilizando un poco la cabeza seguro que podréis descubrir cómo utilizarlo ;).</p>
<p>Como segundo parámetro se le pasa un array, también asociativo, con las opciones de uploadify (que podéis mirar desde <a href="http://www.uploadify.com/documentation/" target="_blank" title="Ver documentación de uploadify">aquí</a>). El tercer parámetro es por si ponéis varios uploadify en una misma página, para no volver a cargar los ficheros JavaScript y css; pasadle como parámetro "false" a partir del segundo uploader que añadáis.</p>
<p>Aquí tenéis el código que he utilizado para la vista:</p>
<p><code>[php]	&lt;h2&gt;&lt;?php __('Pujar imatges') ?&gt;&lt;/h2&gt;<br />
	&lt;?= $form-&gt;create('Image',array('action'=&gt;'add')) ?&gt;<br />
	&lt;div id=&quot;imageFile&quot;&gt;&lt;?php __(&quot;Necessites JavaScript i Flash per poder pujar fitxers&quot;) ?&gt;&lt;/div&gt;<br />
	&lt;div id=&quot;uploaded&quot; style=&quot;display:none&quot;&gt;<br />
		&lt;div id=&quot;files&quot;&gt;</p>
<p>		&lt;/div&gt;<br />
		&lt;?= $form-&gt;submit(__(&quot;Guardar&quot;,true)); ?&gt;<br />
	&lt;/div&gt;<br />
	&lt;?= $html-&gt;link(__(&quot;Enviar&quot;,true),'javascript:$(&quot;#imageFile&quot;).fileUploadStart()'); ?&gt;<br />
	&lt;?=$form-&gt;end() ?&gt;[/php]</code></p>
<p>Como veis he creado un formulario que envía a la acción <em>add</em> del controlador. Dentro de este he creado una primera capa donde se cargará uploadify (con la id "imageFile") seguida de una capa donde irán apareciendo las imágenes (en la capa "files" para ser más exactos) que se vayan subiendo. Esta capa está oculta (style="display:none") ya que no nos interesa que el usuario la vea hasta que hayamos recibido el primer fichero.</p>
<p>Ahora que ya tenemos el formulario insertemos el JavaScript para que todo funcione (en la misma vista). Primero os pongo la metodología para el Helper y después el equivalente en HTML / JavaScript:</p>
<p><code>[php]&lt;?= $uploadify-&gt;startUploader(<br />
	array('imageFile'=&gt;'img/'),<br />
	array('imageFile'=&gt;array(<br />
		'buttonText'=&gt;__('Cercar fitxers',true),<br />
		'script'=&gt;'upload/' . $session-&gt;id(),<br />
		'fileExt'=&gt;'*.jpg;*.jpeg;*.png;*.gif',<br />
		'fileDesc'=&gt;'Fitxers d\\\'imatge',<br />
		'multi'=&gt;'true',<br />
		'onError'=&gt;'function (a, b, c, d) {<br />
         if (d.status == 404)<br />
            alert(\'Could not find upload script. Use a path relative to: ' . getcwd() . '\');<br />
         else if (d.type === &quot;HTTP&quot;)<br />
            alert(\'error \'+d.type+\': \'+d.status);<br />
         else if (d.type ===&quot;File Size&quot;)<br />
            alert(c.name+\' \'+d.type+\' Limit: \'+Math.round(d.sizeLimit/1024)+\'KB\');<br />
         else alert(\'error \'+d.type+\': \'+d.text);}',<br />
		 'onComplete'=&gt;'function(evt, queueID, fileObj, response, data){$(&quot;#uploaded&quot;).show();$(&quot;#uploaded #files&quot;).append(\'' . $html-&gt;image(&quot;thumb/'+response+'&quot;) . '&lt;input type=&quot;text&quot; value=&quot;\'+response+\'&quot; /&gt;&lt;input type=&quot;hidden&quot; value=&quot;\'+response+\'&quot; /&gt;\');}',<br />
		 'onAllComplete'=&gt;'function(){$(&quot;input[type=\\\'submit\\\']&quot;).removeAttr(&quot;disabled&quot;);}'))) ?&gt;[/php]</code></p>
<p>Equivalente en JavaScript:</p>
<p><code>[js]$(document).ready(function() {<br />
	$('#imageFile').fileUpload ({<br />
		'uploader' : '/js/uploadify/uploader.swf',<br />
		'script' : 'upload/&lt;?= $session-&gt;id() ?&gt;',<br />
		'buttonText' : 'Cercar fitxers',<br />
		'onError' : function (a, b, c, d) {<br />
         if (d.status == 404)<br />
            alert('Could not find upload script. Use a path relative to: &lt;?= getcwd() ?&gt;');<br />
         else if (d.type === &quot;HTTP&quot;)<br />
            alert('error '+d.type+': '+d.status);<br />
         else if (d.type ===&quot;File Size&quot;)<br />
            alert(c.name+' '+d.type+' Limit: '+Math.round(d.sizeLimit/1024)+'KB');<br />
         else alert('error '+d.type+': '+d.text);},<br />
		'onComplete' : 'function(evt, queueID, fileObj, response, data){$(&quot;#uploaded&quot;).show();$(&quot;#uploaded #files&quot;).append('&lt;img src=&quot;/img/thumb/'+response+'&quot; alt=&quot;&quot; /&gt;&lt;input type=&quot;text&quot; value=&quot;'+response+'&quot; /&gt;&lt;input type=&quot;hidden&quot; value=&quot;'+response+'&quot; /&gt;');},<br />
		'onAllComplete' : 'function(){$(&quot;input[type=\'submit\']&quot;).removeAttr(&quot;disabled&quot;);}',<br />
		'cancelImg' : '/js/uploadify/cancel.png',<br />
		'fileExt' : '*.jpg;*.jpeg;*.png;*.gif',<br />
		'fileDesc' : 'Fitxers d\'imatge',<br />
		'multi' : 'true',<br />
		'folder': 'img/'<br />
	});<br />
});<br />
[/js]</code></p>
<p>Sobre todo fijaros en que le paso como segundo parámetro a la url "upload" la id de la sesión actual. Esto junto con el beforeFilter del controlador puede ser vital para que os funcione correctamente uploadify con Cake.</p>
<p>He declarado tres funciones a ejecutar con uploadify: <em>onError</em>, <em>onComplete</em> y <em>onAllComplete</em>. La primera es por si sucede algún error con la carga del fichero, es simplemente para depuración pero nunca está de más tenerlo. Una vez os funcione correctamente la subida de ficheros podéis eliminarlo sin miedo alguno.</p>
<p>La función <em>onComplete</em> se encarga de hacer visible la capa "uploaded" y de ir insertando en ella las miniaturas de las imágenes que se vayan subiendo (ubicadas en la carpeta /webroot/img/thumb/). A demás de insertar las imágenes genera un textbox con el nombre del fichero, para que el usuario pueda poner el nombre deseado y un campo oculto con el nombre del fichero (para poder guardar su ruta en la base de datos).</p>
<p>Finalmente la función <em>onAllComplete</em> se encarga de eliminar el atributo "disabled" del botón de envío del formulario.<br />
<a name="ampliacio"></a><br />
Aquí tenéis la vista al completo con el helper:</p>
<p><code>[php]<br />
&lt;?= $uploadify-&gt;startUploader(<br />
	array('imageFile'=&gt;'img/'),<br />
	array('imageFile'=&gt;array(<br />
		'buttonText'=&gt;__('Cercar fitxers',true),<br />
		'script'=&gt;'upload/' . $session-&gt;id(),<br />
		'fileExt'=&gt;'*.jpg;*.jpeg;*.png;*.gif',<br />
		'fileDesc'=&gt;'Fitxers d\\\'imatge',<br />
		'multi'=&gt;'true',<br />
		'onError'=&gt;'function (a, b, c, d) {<br />
         if (d.status == 404)<br />
            alert(\'Could not find upload script. Use a path relative to: ' . getcwd() . '\');<br />
         else if (d.type === &quot;HTTP&quot;)<br />
            alert(\'error \'+d.type+\': \'+d.status);<br />
         else if (d.type ===&quot;File Size&quot;)<br />
            alert(c.name+\' \'+d.type+\' Limit: \'+Math.round(d.sizeLimit/1024)+\'KB\');<br />
         else alert(\'error \'+d.type+\': \'+d.text);}',<br />
		 'onComplete'=&gt;'function(evt, queueID, fileObj, response, data){$(&quot;#uploaded&quot;).show();$(&quot;#uploaded #files&quot;).append(\'' . $html-&gt;image(&quot;thumb/'+response+'&quot;) . '&lt;input type=&quot;text&quot; value=&quot;\'+response+\'&quot; /&gt;&lt;input type=&quot;hidden&quot; value=&quot;\'+response+\'&quot; /&gt;\');}',<br />
		 'onAllComplete'=&gt;'function(){$(&quot;input[type=\\\'submit\\\']&quot;).removeAttr(&quot;disabled&quot;);}'))) ?&gt;<br />
&lt;h2&gt;&lt;?php __('Pujar imatges') ?&gt;&lt;/h2&gt;<br />
&lt;?= $form-&gt;create('Image',array('action'=&gt;'add')) ?&gt;<br />
&lt;div id=&quot;imageFile&quot;&gt;&lt;?php __(&quot;Necessites JavaScript i Flash per poder pujar fitxers&quot;) ?&gt;&lt;/div&gt;<br />
&lt;div id=&quot;uploaded&quot; style=&quot;display:none&quot;&gt;<br />
	&lt;div id=&quot;files&quot;&gt;</p>
<p>	&lt;/div&gt;<br />
	&lt;?= $form-&gt;submit(__(&quot;Guardar&quot;,true)); ?&gt;<br />
&lt;/div&gt;<br />
&lt;?= $html-&gt;link(__(&quot;Enviar&quot;,true),'javascript:$(&quot;#imageFile&quot;).fileUploadStart()'); ?&gt;<br />
&lt;?=$form-&gt;end() ?&gt;[/php]</code></p>
<p>Y con Javascript: </p>
<p><code>[js]&lt;script type=&quot;text/javascript&quot;&gt;<br />
$(document).ready(function() {<br />
	$('#imageFile').fileUpload ({<br />
		'uploader' : '/js/uploadify/uploader.swf',<br />
		'script' : 'upload/&lt;?= $session-&gt;id() ?&gt;',<br />
		'buttonText' : 'Cercar fitxers',<br />
		'onError' : function (a, b, c, d) {<br />
         if (d.status == 404)<br />
            alert('Could not find upload script. Use a path relative to: &lt;?= getcwd() ?&gt;');<br />
         else if (d.type === &quot;HTTP&quot;)<br />
            alert('error '+d.type+': '+d.status);<br />
         else if (d.type ===&quot;File Size&quot;)<br />
            alert(c.name+' '+d.type+' Limit: '+Math.round(d.sizeLimit/1024)+'KB');<br />
         else alert('error '+d.type+': '+d.text);},<br />
		'onComplete' : 'function(evt, queueID, fileObj, response, data){$(&quot;#uploaded&quot;).show();$(&quot;#uploaded #files&quot;).append('&lt;img src=&quot;/img/thumb/'+response+'&quot; alt=&quot;&quot; /&gt;&lt;input type=&quot;text&quot; value=&quot;'+response+'&quot; /&gt;&lt;input type=&quot;hidden&quot; value=&quot;'+response+'&quot; /&gt;');},<br />
		'onAllComplete' : 'function(){$(&quot;input[type=\'submit\']&quot;).removeAttr(&quot;disabled&quot;);}',<br />
		'cancelImg' : '/js/uploadify/cancel.png',<br />
		'fileExt' : '*.jpg;*.jpeg;*.png;*.gif',<br />
		'fileDesc' : 'Fitxers d\'imatge',<br />
		'multi' : 'true',<br />
		'folder': 'img/'<br />
	});<br />
});<br />
&lt;/script&gt;<br />
&lt;h2&gt;&lt;?php __('Pujar imatges') ?&gt;&lt;/h2&gt;<br />
&lt;?= $form-&gt;create('Image',array('action'=&gt;'add')) ?&gt;<br />
&lt;div id=&quot;imageFile&quot;&gt;&lt;?php __(&quot;Necessites JavaScript i Flash per poder pujar fitxers&quot;) ?&gt;&lt;/div&gt;<br />
&lt;div id=&quot;uploaded&quot; style=&quot;display:none&quot;&gt;<br />
	&lt;div id=&quot;files&quot;&gt;</p>
<p>	&lt;/div&gt;<br />
	&lt;?= $form-&gt;submit(__(&quot;Guardar&quot;,true)); ?&gt;<br />
&lt;/div&gt;<br />
&lt;?= $html-&gt;link(__(&quot;Enviar&quot;,true),'javascript:$(&quot;#imageFile&quot;).fileUploadStart()'); ?&gt;<br />
&lt;?=$form-&gt;end() ?&gt;[/js]</code></p>
<p>Vale, recordemos un poco todo lo que hemos hecho para ver que no nos hemos dejado nada:</p>
<ul>
<li>Hemos descargado jQuery y Uploadify</li>
<li>Hemos guardado los ficheros que nos interesaban de ambas librerías en nuestro proyecto</li>
<li>Hemos creado el controlador (/app/controllers/images_controller.php)"</li>
<li>Hemos creado la vista (/app/view/images/add.ctp)</li>
<li>Algo que no he dicho (pero que es bastante lógico..) es haber creado una carpeta donde se guardarán los ficheros, con permisos de escritura (755, 777... en sistemas UNIX/Linux)</li>
<li>Tampoco he dicho que hay que crear un modelo (/app/models/image.php), pero si tenéis conocimientos de Cake seguro que ya lo sabíais ;)</li>
</ul>
<p>Para terminar os explicaré cómo funcionará el proceso de envío. Aquí tendría que hacer un diagrama de estados o algo así pero la verdad es que no apetece nada... :p</p>
<ul>
<li>El usuario accederá a la página "images/add" y se le mostrará un botón con el que subir imágenes.</li>
<li>Una vez seleccionado(s) el/los fichero(s) a subir, el usuario le da a "enviar" y se inicia la transferencia del éste.</li>
<li>Una vez ha terminado el fichero y ha llegado correctamente al servidor, este/estos se procesan y en caso de éxito se devuelve el/los nombre(s) de fichero(s) resultante(s) al usuario. A partir de este/estos nombre(s) de fichero(s) nos encargaremos de que vea una(s) miniatura(s) de la(s) imagen(es) subida(s) (qué pesadito con el plural, eh?).</li>
<li>A demás de las miniaturas le mostraremos un textbox al lado de cada una para que pueda poner el nombre si quiere.</li>
<li>Cuando haya editado todos los nombres le dará al botón "guardar" que aparecerá a partir del primer fichero subido pero que no estará activo hasta que todos los ficheros hayan subido al servidor.</li>
<li>Aquí hay una cosa que yo no hago en el ejemplo porque no me quiero complicar pero que creo conveniente que hagáis si no queréis llenar vuestro servidor de ficheros sin uso. Sería necesario guardar las rutas de ficheros una vez subidos por si el usuario no le diera a "guardar". De éste modo podríais hacer un método con el que eliminar ficheros inutilizados fácilmente.</li>
</ul>
<p>Pues ahí lo tenéis. Creo que me ha salido una guía algo pobre :( es lo que tiene hacerla con algo de prisa... Cuando tenga algo más de tiempo intentaré colgar un ejemplo sobre esto.</p>
<blockquote style="text-align:center"><p><em><b>Si has terminado este tutorial satisfactoriamente mírate este otro: <a href="/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp">Subida de ficheros con Uploadify y validación Ajax en CakePHP</a></b></em></p></blockquote>
<p>Espero que no tengáis muchas dudas. De todos modos sabéis que estoy abierto a preguntas a través de los comentarios si os surge cualquier duda!</p>
<blockquote><p>Páginas de referencia:</p>
<ul>
<li><a title="Documentación de uploadify" href="http://www.uploadify.com/documentation/" target="_blank">Uploadify documentation</a></li>
<li><a title="Ver documentación de jQuery" href="http://docs.jquery.com/Main_Page" target="_blank">jQuery</a></li>
<li><a title="Página del proyecto CakePHP" href="http://www.cakephp.org" target="_blank">CakePHP</a> | <a title="Documentación de CakePHP" href="http://book.cakephp.org/">Book</a> | <a title="API de CakePHP" href="http://api.cakephp.org/" target="_blank">API</a></li>
<li><a title="Página del proyecto SWFUpload" href="http://swfupload.org" target="_blank">SWFUpload</a> | <a title="Documentación de SWFupload" href="http://swfupload.org/documentation" target="_blank">API</a> | <a title="Foros de swfupload" href="http://swfupload.org/forum" target="_blank">Foros</a></li>
<li><a title="Buscar en Google" href="http://www.google.cat" target="_blank">Google</a> (cómo no..)</li>
</ul>
</blockquote>
