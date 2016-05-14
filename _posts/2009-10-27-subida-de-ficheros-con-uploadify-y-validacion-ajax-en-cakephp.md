---
layout: post
status: publish
published: true
title: Subida de ficheros con Uploadify y validación Ajax en CakePHP
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Ya hacía tiempo que tenía ganas de escribir una entrada \"de estas\" :D
  (de estas quiero decir de programación y con muuuucho muuuucho código, como a mí
  me gustan :P).\r\n\r\nHace unos meses conté <a title=\"Leer artículo\" href=\"http://www.racotecnic.com/2009/06/subida-de-ficheros-en-cakephp-con-uploadify-y-jquery/\"
  target=\"_self\">cómo podíais utilizar el plugin Uploadify (de jQuery) para subir
  ficheros a vuestro portal hecho con CakePHP</a>. Hoy iremos un poco más allá y crearemos
  un <strong>upload de imágenes con validación de campos con Ajax</strong>.\r\n\r\nAntes
  de empezar estaría bien que hubierais leído el anterior tutorial —e incluso haberlo
  probado— para tener algo de práctica en el asunto. Este tutorial será (bastante)
  de ampliación del anterior. Quiero decir que habrá cosas en las que no profundizaré
  porque ya lo hice en el anterior, así como que en este hay mejoras, como la gestión
  de la respuesta de uploadify con JSON en lugar de con texto plano.\r\n\r\nSi queréis
  podéis ver el resultado del tutorial que voy a explicar en este enlace:\r\n<blockquote>\r\n<ul>\r\n\t<li><a
  href=\"http://www.racotecnic.com/tutorials/cake/images/add\">Ejemplo (las imágenes
  se borran cada vez que se accede a la página)</a></li>\r\n\t<li><a href=\"http://www.racotecnic.com/tutorials/2009/10/image_upload.zip\">Descargar
  archivos del ejemplo</a></li>\r\n</ul>\r\n</blockquote>\r\n"
wordpress_id: 746
wordpress_url: http://racotecnic.underave.net/?p=746
date: '2009-10-27 01:25:16 +0100'
date_gmt: '2009-10-27 00:25:16 +0100'
categories:
- Programació
- Web
tags:
- PHP
- JavaScript
- jQuery
- CakePHP
- Uploadify
- Ajax
---
<p>Ya hacía tiempo que tenía ganas de escribir una entrada "de estas" :D (de estas quiero decir de programación y con muuuucho muuuucho código, como a mí me gustan :P).</p>
<p>Hace unos meses conté <a title="Leer artículo" href="http://www.racotecnic.com/2009/06/subida-de-ficheros-en-cakephp-con-uploadify-y-jquery/" target="_self">cómo podíais utilizar el plugin Uploadify (de jQuery) para subir ficheros a vuestro portal hecho con CakePHP</a>. Hoy iremos un poco más allá y crearemos un <strong>upload de imágenes con validación de campos con Ajax</strong>.</p>
<p>Antes de empezar estaría bien que hubierais leído el anterior tutorial —e incluso haberlo probado— para tener algo de práctica en el asunto. Este tutorial será (bastante) de ampliación del anterior. Quiero decir que habrá cosas en las que no profundizaré porque ya lo hice en el anterior, así como que en este hay mejoras, como la gestión de la respuesta de uploadify con JSON en lugar de con texto plano.</p>
<p>Si queréis podéis ver el resultado del tutorial que voy a explicar en este enlace:</p>
<blockquote>
<ul>
<li><a href="http://www.racotecnic.com/tutorials/cake/images/add">Ejemplo (las imágenes se borran cada vez que se accede a la página)</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/10/image_upload.zip">Descargar archivos del ejemplo</a></li>
</ul>
</blockquote>
<p><a id="more"></a><a id="more-746"></a><br />
Pongámonos a ello. Primero de todo, como siempre, ¿qué necesitamos?</p>
<ul>
<li><a rel="nofollow" href="http://www.cakephp.org" target="_blank">CakePHP</a> (v. 1.2.4.8284 [1.2.5 stable])</li>
<li>Un componente para gestionar ficheros subidos, <a rel="nofollow" href="http://labs.iamkoa.net/2007/10/23/image-upload-component-cakephp/" target="_blank">como este</a></li>
<li><a rel="nofollow" href="http://www.jquery.com" target="_blank">jQuery</a> (v. 1.3.2)</li>
<li><a rel="nofollow" href="http://www.uploadify.com" target="_blank">Uploadify</a> (v. 2.1.0)</li>
</ul>
<p><em>(las versiones que he puesto entre paréntesis son las que he utilizado yo para el tutorial)</em></p>
<p>¿Y qué queremos hacer?</p>
<ul>
<li>Mostraremos una vista con el botón de carga de ficheros (el de uploadify) y un botón desactivado para enviar el formulario.</li>
<li>El usuario seleccionará las imágenes deseadas y uploadify empezará a hacer la carga de imágenes</li>
<li>A medida que las imágenes vayan llegando al servidor generaremos dos miniaturas de la imagen (una para su futuro uso como miniatura y la otra sólo para mostrársela al usuario en el formulario de envío de imágenes) y guardaremos la original.</li>
<li>Si todas las imágenes se han guardado correctamente, mostraremos al usuario la imagen con todos los campos que pueda rellenar sobre la imagen. Si no se hubieran guardado correctamente se le mostrará al usuario un mensaje de error.</li>
<li>Una vez subidas todas las imágenes activamos el botón (eliminamos el atributo "disabled") del formulario.</li>
<li>Cuando el usuario envíe el formulario pasaremos a hacer la validación Ajax.</li>
<li>Si todos los datos son correctos los guardamos y eliminamos la miniatura que no utilizaremos.</li>
</ul>
<p>Y este es un resultado aproximado de cómo os podría quedar (paso por paso):</p>
<p style="text-align: center;"><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges1.png"><img class="alignnone size-thumbnail wp-image-747" title="upload_imatges1" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges1-150x150.png" alt="upload_imatges1" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges2.png"><img class="alignnone size-thumbnail wp-image-748" title="upload_imatges2" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges2-150x150.png" alt="upload_imatges2" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges3.png"><img class="alignnone size-thumbnail wp-image-749" title="upload_imatges3" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges3-150x150.png" alt="upload_imatges3" width="150" height="150" /></a></p>
<p style="text-align: center;"><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges4.png"><img class="alignnone size-thumbnail wp-image-750" title="upload_imatges4" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges4-150x150.png" alt="upload_imatges4" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges5.png"><img class="alignnone size-thumbnail wp-image-751" title="upload_imatges5" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges5-150x150.png" alt="upload_imatges5" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges6.png"><img class="alignnone size-thumbnail wp-image-752" title="upload_imatges6" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges6-150x150.png" alt="upload_imatges6" width="150" height="150" /></a></p>
<p>Como la otra vez, descargamos todo lo necesario y lo ponemos en nuestro proyecto. Así es como he organizado los ficheros en mi proyecto:</p>
<ul>
<li>El componente de subida de ficheros en la carpeta /app/controllers/components/</li>
<li>jQuery en la carpeta /app/webroot/js/</li>
<li>Y uploadify...
<ul>
<li>Los JavaScript jquery.uploadify.js y swfobject en la carpeta /app/webroot/js/</li>
<li>El fichero uploadify.swf en la carpeta /app/webroot/flash/</li>
<li>La imagen cancel.png en la carpeta /app/webroot/img/</li>
<li>Y finalmente, el fichero uploadify.css en la carpeta /app/webroot/css/</li>
</ul>
</li>
</ul>
<p>A diferencia de otros plugins de jquery, uploadify no especifica la imagen "cancel.png" mediante CSS; lo hace mediante JavaScript y gracias a ello no tenemos que hacer ninguna modificación al CSS.</p>
<p>Hay una cosa que no he mencionado en los pasos de "¿qué queremos hacer?" y que encuentro que es bastante importante. Pensad un momento en el procedimiento de subir imágenes con este sistema...</p>
<p>Una vez el usuario ha seleccionado las imágenes estas empiezan a subir. Cuando han subido todas generamos ficheros (miniaturas, así como el archivo original) que guardamos en el servidor y que, si el usuario no diera al botón de "Guardar" del formulario, quedarían en nuestro servidor ocupando espacio.</p>
<p>Mi solución para este problema ha sido crear una tabla llamada "<em>tempfiles</em>" donde introduzco la ruta completa del fichero. Así después podré eliminar todos los ficheros temporales con un simple clic desde mi panel de administración o, si me gustara el contenido de estos ficheros temporales, podría añadirlos fácilmente a la base de datos sin tener que volver a subir los ficheros.</p>
<p>A diferencia del anterior tutorial, en este os explicaré desde la creación de las tablas SQL (cosa que no hice en el anterior).</p>
<p>Creemos entonces una tabla <em>tempfiles</em> con dos campos (id y <em>location</em>) y una tabla <em>images</em> con los campos que creamos necesarios:</p>
<p style="text-align: center;"><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/model_tempfiles.png"><img class="alignnone size-full wp-image-757" style="vertical-align: middle;" title="model_tempfiles" src="http://www.racotecnic.com/wp-content/uploads/2009/09/model_tempfiles.png" alt="model_tempfiles" width="143" height="88" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/model_images.png"><img class="alignnone size-full wp-image-756" style="vertical-align: middle;" title="model_images" src="http://www.racotecnic.com/wp-content/uploads/2009/09/model_images.png" alt="model_images" width="158" height="184" /></a></p>
<p>[sql]CREATE  TABLE IF NOT EXISTS `images` (<br />
  `id` INT NOT NULL AUTO_INCREMENT,<br />
  `name` VARCHAR(45) NOT NULL ,<br />
  `description` VARCHAR(255) NULL ,<br />
  `tags` TEXT NULL ,<br />
  `file` VARCHAR(100) NULL ,<br />
  `created` DATETIME NULL ,<br />
  `modified` DATETIME NULL ,<br />
  PRIMARY KEY (`id`) )<br />
ENGINE = InnoDB;</p>
<p>CREATE  TABLE IF NOT EXISTS `tempfiles` (<br />
  `id` INT NOT NULL AUTO_INCREMENT,<br />
  `location` VARCHAR(350) NULL ,<br />
  PRIMARY KEY (`id`) )<br />
ENGINE = InnoDB;[/sql]</p>
<p>Y sus modelos correspondientes, image.php y tempfile.php:</p>
<p>[php]// /app/models/tempfile.php<br />
&lt;?php<br />
class Tempfile extends AppModel<br />
{<br />
	var $name = 'Tempfile';<br />
}<br />
[/php]</p>
<p>[php]// /app/models/image.php<br />
&lt;?php<br />
class Image extends AppModel {<br />
	var $name = 'Image';<br />
	var $validate = array(<br />
		'name'=&gt;array(<br />
			'length'=&gt;array(<br />
				'rule'=&gt;array('between',3,45),<br />
				'message'=&gt;&quot;El nombre debe contener entre 3 y 45 caracteres&quot;)),<br />
		'description'=&gt;array(<br />
			'length'=&gt;array(<br />
				'rule'=&gt;array('maxLength',100),<br />
				'message'=&gt;&quot;La descripción no puede tener más de 255 caracteres&quot;)));<br />
}[/php]</p>
<p>Necesitaremos tres carpetas para guardar las imágenes. Una para las imágenes a tamaño completo, otra para las miniaturas y otra para los ficheros temporales (las miniaturas que mostraremos al usuario). Creadlas en la carpeta <em>img</em> y dadles permiso de escritura:</p>
<ul>
<li>/app/webroot/img/upload/full/</li>
<li>/app/webroot/img/upload/thumb/</li>
<li>/app/webroot/img/upload/tmp/</li>
</ul>
<p>Ahora pasamos a la vista para añadir imágenes:</p>
<p>[php]// /app/views/images/add.ctp<br />
&lt;?php<br />
$javascript-&gt;codeBlock('var webroot=&quot;'.$this-&gt;webroot.'&quot;;var sessionId = &quot;' . $session-&gt;id() .'&quot;;',array('inline'=&gt;false));<br />
$javascript-&gt;link(<br />
	array(<br />
		'jquery-1.3.2.min',<br />
		'swfobject',<br />
		'jquery.uploadify.min',<br />
		'page_specific/images'<br />
	), false);<br />
?&gt;<br />
&lt;div id=&quot;add-images&quot; class=&quot;add-info&quot;&gt;<br />
	&lt;? __('Subir imágenes') ?&gt;<br />
	&lt;div class=&quot;contenido&quot;&gt;<br />
			&lt;?= $form-&gt;create() ?&gt;<br />
			&lt;div class=&quot;input upload&quot;&gt;<br />
				&lt;div id=&quot;imageFile&quot;&gt;&lt;?php __(&quot;Necesitas JavaScript y Flash para poder subir ficheros&quot;) ?&gt;&lt;/div&gt;<br />
			&lt;/div&gt;<br />
			&lt;div id=&quot;ajaxLoad&quot; style=&quot;display:none;&quot;&gt;&lt;?= $html-&gt;image('ajax_load.gif', array('alt' =&gt;__('Carregant...',true))) ?&gt;&lt;/div&gt;<br />
			&lt;?= $form-&gt;end(array('label'=&gt;__(&quot;Guardar&quot;,true),'disabled'=&gt;'disabled')) ?&gt;<br />
	&lt;/div&gt;<br />
&lt;/div&gt;[/php]</p>
<p>La primera línea es para iniciar dos variables de JavaScript, una de ellas con la ruta webroot y la otra con la id de la sesión de PHP. Quizás os interese poner esta porción de código en vuestro layout para aprovecharlo desde cualquier controlador/vista del proyecto.</p>
<p>Como véis hemos cargado jQuery, swfobject (de uploadify, tiene que cargarse antes de uploadify siempre), uploadify y un fichero que crearemos más adelante llamado "images.js" y situado en la carpeta /app/webroot/js/page_specific/.</p>
<p>También hemos creado una capa oculta llamada "ajaxLoad" que contiene una imagen para cuando hagamos la validación con Ajax.</p>
<p>Ahora que tenemos la vista empezaremos su fichero JavaScript images.js. Digo empezaremos porque iremos por partes, primero haremos la subida de ficheros y luego la validación con Ajax.</p>
<p>[js]// /app/webroot/js/page_specific/images.js<br />
$(function(){<br />
	/**<br />
	 * Validació amb Ajax<br />
	 */<br />
	var _loadingDiv = $(&quot;#ajaxLoad&quot;);</p>
<p>	// Muestra la capa #flashMessage encima de la capa con clase .add-info<br />
	function flashMessage(message,classe){<br />
		$(document.createElement('div'))<br />
			.css('display', 'none')<br />
			.attr('id','flashMessage')<br />
			.addClass(classe)<br />
			.html(message)<br />
			.insertBefore($(&quot;.add-info&quot;)).fadeIn();<br />
	}</p>
<p>// Sólo para Auth<br />
//	function onTimeOut(data){<br />
//		flashMessage(data.message,'error');<br />
//	    window.setTimeout(function() {<br />
//	        window.location.href = webroot + 'users/login';<br />
//	    }, 2500);<br />
//	}<br />
// Fin Auth</p>
<p>	// Contador de IDs<br />
	var item = 0;<br />
	$('#imageFile').uploadify({<br />
		'uploader' : webroot + 'flash/uploadify.swf',<br />
		'script' : webroot +'images/upload/'+sessionId,<br />
		'buttonText' : 'Buscar imágenes',<br />
		'cancelImg' : webroot + 'img/botons/cancel.png',<br />
		'auto' : 'true',<br />
		'multi' : 'true',<br />
		'simUploadLimit' : 3,<br />
		'queueSizeLimit' : 10,<br />
		'sizeLimit' : 800*1024,<br />
		'fileExt' : '*.jpg;*.png;*.jpeg;*.gif',<br />
		'fileDesc' : 'Imágenes',<br />
		'onComplete' : function(evt, queueId, fileObj, response, data){<br />
			// Interpretamos la respuesta JSON como un objeto<br />
			var imageObj = eval('(' + response + ')');<br />
			if (imageObj.success){<br />
				$(&quot;.input.upload&quot;).append(<br />
					// Creamos una capa que contenga la imagen resultante de fondo<br />
					$(&quot;&lt;div&gt;&lt;/div&gt;&quot;).css({<br />
						'background': 'left center no-repeat url(' + webroot + 'img/upload/tmp/' + imageObj.success.data + ')',<br />
						'width': '385px'<br />
					}).attr('id','imatge'+item)<br />
						// Creamos una capa con los inputs<br />
						.append($(&quot;&lt;div&gt;&lt;/div&gt;&quot;).css({<br />
							'margin-left': '105px'<br />
							// Afegim missatge d'èxit i inputs<br />
						}).append(imageObj.success.message + '&lt;br/&gt;' +<br />
							'&lt;label for=&quot;ImageName'+item+'&quot;&gt;Nombre de la imagen&lt;em&gt;*&lt;/em&gt;&lt;/label&gt;'+<br />
							'&lt;input maxlength=&quot;45&quot; type=&quot;text&quot; name=&quot;data[Image][name]['+item+']&quot; value=&quot;' +<br />
							imageObj.success.data.replace(/\.([a-zA-Z]){3,4}$/,'') + '&quot; id=&quot;ImageName'+item+'&quot; /&gt;' +<br />
							'&lt;label for=&quot;ImageDescription'+item+'&quot;&gt;Descripción (255 caracteres máximo)&lt;/label&gt;' +<br />
							'&lt;input maxlength=&quot;255&quot; type=&quot;text&quot; name=&quot;data[Image][description]['+item+']&quot; id=&quot;ImageDescription'+item+'&quot; /&gt;' +<br />
							'&lt;label for=&quot;ImageTags'+item+'&quot;&gt;Etiquetas (separadas por comas)&lt;/label&gt;' +<br />
							'&lt;textarea name=&quot;data[Image][tags]['+item+']&quot; id=&quot;ImageTags'+item+'&quot;&gt;&lt;/textarea&gt;' +<br />
							'&lt;input type=&quot;hidden&quot; name=&quot;data[Image][file]['+item+']&quot; value=&quot;' + imageObj.success.data + '&quot; /&gt;' +<br />
							'&lt;div style=&quot;clear:both&quot;&gt;&lt;/div&gt;'<br />
						)<br />
					)<br />
				);<br />
				// Incrementamos contador de ids<br />
				item++;<br />
			}else if (imageObj.errors) {<br />
				// En caso de error mostramos flashmessage<br />
				flashMessage(imageObj.errors.message,'error');<br />
			}<br />
// Sólo para Auth<br />
//			else if (imageObj.sessionTimeOut){<br />
//				onTimeOut(imageObj.sessionTimeOut);<br />
//			}<br />
// Fin auth<br />
			},<br />
		'onAllComplete' : function(evt, data){<br />
			flashMessage('Se han subido todas las imágenes. Recuerda enviar el formulario','info');<br />
			$(&quot;#imageFile, #imageFileUploader&quot;).fadeOut('fast');<br />
			$(&quot;:submit&quot;).removeAttr('disabled');<br />
		}<br />
	});<br />
});[/js]</p>
<p>La función <strong>flashMessage</strong> sirve para generar una capa "flashMessage" dinámica justo encima de la capa con clase ".add-info".</p>
<p>La función <strong>onTimeOut</strong> sólo es para los que utilicéis el componente Auth. En caso de terminarse la sesión muestra un mensaje al usuario y lo redirige hacia la página de login pasado un rato.</p>
<blockquote><p><strong>Nota:</strong> Esta no es la vía correcta para mostrar un error conforme  la sesión del usuario ha expirado. Podéis ver la explicación que hago al  respecto <a href="../2009/12/cakephp-auth-component-ajaxlogin/">aquí</a>.</p></blockquote>
<p>Finalmente, en la función de carga de uploadify indicamos los parámetros que nos interesen y generamos una función <strong>OnComplete</strong> a nuestro gusto. En este ejemplo lo que he hecho es generar una capa (con id imatgeX, donde X es el número de ID actual, según el contador de IDs) con una miniatura de fondo que he generado exclusivamente para mostrársela al usuario en este formulario. Dentro de esta capa hay otra capa con las etiquetas y los inputs que necesito.</p>
<p>Es importante que todos elementos del formulario que queráis meter dinámicamente aquí lleven una ID única con un número al final. Esto nos servirá más adelante para la validación con Ajax.</p>
<p>Cuando todos los ficheros han terminado de subir mostramos un mensaje (con clase ".info"), eliminamos el botón de uploadify y eliminamos el atributo <em>disabled</em> del botón <em>submit</em> (y por tanto lo activamos).</p>
<p>Pasemos al controlador. Primero la construcción de éste, su función beforeRender (importante, lo expliqué en el anterior tutorial), el método <em>add</em> (vacío) y el método <em>upload</em>:</p>
<p>[php]// /app/controllers/images_controller.php<br />
&lt;?php<br />
class ImagesController extends AppController<br />
{<br />
	var $name = 'Images';<br />
	// ¡Importante cargar RequestHandler!!<br />
	var $components = array('Upload','RequestHandler');<br />
	// Helpers necesarios<br />
	var $helpers = array('Html','Form','Javascript');<br />
	// Modelos a utilizar<br />
	var $uses = array('Image','Tempfile');</p>
<p>	function beforeFilter()<br />
	{<br />
		if($this-&gt;action == 'upload'){<br />
			if (isset($this-&gt;params['pass'][0])){<br />
				$this-&gt;Session-&gt;id($this-&gt;params['pass'][0]);<br />
				$this-&gt;Session-&gt;start();<br />
			}else{<br />
				$this-&gt;redirect('/');<br />
			}<br />
		}<br />
		// Si utilizamos Auth debemos dar permiso a todo el mundo a las acciones 'upload' y 'ajaxAdd'<br />
		//$this-&gt;Auth-&gt;allowedActions = array('upload','ajaxAdd');<br />
		parent::beforeFilter();<br />
	}</p>
<p>	function add()<br />
	{<br />
		$this-&gt;pageTitle = __(&quot;Añadir imágenes&quot;);<br />
	}</p>
<p>	function upload()<br />
	{<br />
		// Desactivamos el debug (necesario siempre que trabajamos con Ajax)<br />
		Configure::write('debug', 0);<br />
		//header(&quot;Content-type: text/x-json&quot;);<br />
		$this-&gt;autoRender = false;<br />
		$this-&gt;layout = 'ajax';<br />
		if (isset($this-&gt;params['form']['Filedata'])){<br />
// Si utilizáis Auth eliminad estos comentarios<br />
//			$user = $this-&gt;Auth-&gt;user();<br />
//			if (!empty($user)){<br />
// Fin Auth<br />
				// Creamos la primera miniatura<br />
				$thumb = $this-&gt;Upload-&gt;upload(<br />
					$this-&gt;params['form']['Filedata'],'img/upload/thumb/', null,<br />
					array(<br />
						'type' =&gt; 'resizecrop',<br />
						'size' =&gt; array(400,250),<br />
						'output' =&gt; 'jpg',<br />
						'quality'=&gt;80),<br />
					array('jpg','jpeg','png','gif'));<br />
				// Si no se crea correctamente gestionamos los errores<br />
				if (!empty($this-&gt;Upload-&gt;errors)){<br />
					// Error que mostraremos al usuario<br />
					$message = __(&quot;Error subiendo el fichero&quot;,true);<br />
					// Guardamos el nombre original del fichero<br />
					$data = $this-&gt;params['form']['Filedata']['name'];<br />
					$this-&gt;set('errors', compact('message','data'));<br />
					// Creamos un log con el auténtico error<br />
					$this-&gt;log(&quot;Error creando la miniatura: &quot; .<br />
						implode(&quot; | &quot;,$this-&gt;Upload-&gt;errors),'upload/images');<br />
				} else {<br />
					// Si se ha guardado correctamente guardamos el 'fichero temporal' en la BD<br />
					$file = $this-&gt;Upload-&gt;result;<br />
					$location = realpath(WWW_ROOT . 'img/upload/thumb/' . $file);<br />
					$tempfile['location'] = $location;<br />
					$this-&gt;Tempfile-&gt;save($tempfile,false);<br />
					// Generamos una miniatura temporal (la que mostraremos al usuario al guardar las imágenes)<br />
					$tempThumb = $this-&gt;Upload-&gt;upload(<br />
						$this-&gt;params['form']['Filedata'],'img/upload/tmp/', null,<br />
						array(<br />
							'type' =&gt; 'resizecrop',<br />
							'size' =&gt; array(100,150),<br />
							'output' =&gt; 'jpg',<br />
							'quality'=&gt;80),<br />
						array('jpg','jpeg','png','gif'));<br />
					if(!empty($this-&gt;Upload-&gt;errors)){<br />
						// Si tiene errores lo guardamos en un log. A mi parecer, aquí no nos interesa mostrar error al usuario (ya que en realidad es una imagen temporal que más adelante borraremos)<br />
						$this-&gt;log(&quot;Error creando la miniatura temporal: &quot; .<br />
							implode(&quot; | &quot;,$this-&gt;Upload-&gt;errors),'upload/images');<br />
					} else {<br />
						// Si no hay errores guardamos el 'fichero temporal'<br />
						$location = realpath(WWW_ROOT . 'img/upload/tmp/' . $this-&gt;Upload-&gt;result);<br />
						$tempfile['location'] = $location;<br />
						// Es importante hacer el 'create' a partir de la segunda vez<br />
						$this-&gt;Tempfile-&gt;create($tempfile);<br />
						$this-&gt;Tempfile-&gt;save();<br />
					}<br />
					// Si se ha creado la primera miniatura subimos la original a la carpeta deseada<br />
					$result = $this-&gt;Upload-&gt;upload($this-&gt;params['form']['Filedata'], 'img/upload/full/', $this-&gt;Upload-&gt;result);<br />
					if (!empty($this-&gt;Upload-&gt;errors)){<br />
						// Si no se guarda generamos log<br />
						$this-&gt;log(&quot;Error subiendo la imagen: &quot; .<br />
							implode(&quot; | &quot;,$this-&gt;Upload-&gt;errors),'upload/images');<br />
						// Y mostramos mensaje de error al usuario<br />
						$message = __(&quot;Error subiendo el fichero&quot;,true);<br />
						$data = $this-&gt;params['form']['Filedata']['name'];<br />
						$this-&gt;set('errors', compact('message','data'));<br />
					}else{<br />
						// Guardamos 'fichero temporal'<br />
						$data = $this-&gt;Upload-&gt;result;<br />
						$location = realpath(WWW_ROOT . 'img/upload/full/' . $data);<br />
						$tempfile['location'] = $location;<br />
						$this-&gt;Tempfile-&gt;create($tempfile);<br />
						$this-&gt;Tempfile-&gt;save();<br />
						// Mostramos mensaje de éxito al usuario<br />
						$message = sprintf(__(&quot;%s subido correctamente.&quot;,true),&quot;&lt;b&gt;&quot; . $this-&gt;params['form']['Filedata']['name'] . &quot;&lt;/b&gt;&quot;);<br />
						$this-&gt;set('success',compact('data','message'));<br />
					}<br />
				}<br />
// Si utilizáis Auth eliminad estos comentarios<br />
//			}else{<br />
//    			$message = &quot;&lt;b&gt;&quot; . __(&quot;Error&quot;,true) . &quot;:&lt;/b&gt; &quot; . __(&quot;Tu sesión ha expirado. Vuelve a iniciarla por favor&quot;,true);<br />
//				$this-&gt;set('sessionTimeOut',compact('message'));<br />
//			}<br />
// Fin Auth<br />
			// Renderizamos la vista (/views/ajax/upload.ctp)<br />
			$this-&gt;render('/ajax/upload');<br />
		}<br />
	}<br />
}[/php]</p>
<p>A parte de los comentarios y el código (que hablan por sí solos.. ;) ) quiero comentar un par de cosillas...</p>
<p>La cabecera que está comentada (Content-Type: text/x-json) la puse en su momento porque en Internet Explorer 8 y Opera 10 me daba algunos problemas si no ponía esta cabecera. Ahora sin ella me funciona correctamente (realmente había más cosas que interferían en su funcionamiento con IE y Opera), así que la he comentado por si la tuvierais que utilizar en algún momento.</p>
<p>Respecto a los comentarios sobre el componente de autenticación (Auth)... en caso de que en vuestra web queráis restringir las subidas a usuarios registrados deberéis descomentar las líneas comentadas para que, en caso de que al usuario le expire la sesión mientras está subiendo imágenes, se le muestre un mensaje de error (sin esto, en caso de expirar la sesión, no se mostraría <strong>nada</strong> al usuario).</p>
<blockquote><p><strong>Nota:</strong> Esta no es la vía correcta para mostrar un error conforme la sesión del usuario ha expirado. Podéis ver la explicación que hago al respecto <a href="http://www.racotecnic.com/2009/12/cakephp-auth-component-ajaxlogin/">aquí</a>.</p></blockquote>
<p>En cuanto al render de la vista... ahora pasaremos a la creación de la vista upload.ctp y veréis que el fichero es muy genérico. Quiero decir que con este mismo fichero podéis gestionar cualquier subida de ficheros que hagáis con Ajax, así que, tener que generar una vista idéntica para cada sección en que tengáis subida de ficheros, es algo absurdo.</p>
<p>Digo esto porque lo que hago yo es meter todos los ficheros relacionados con ajax en la carpeta <em>/app/views/ajax/</em> y así los utilizo desde cualquier controlador (de ahí el "$this-&gt;render('/ajax/upload')".</p>
<p>Vamos a por el fichero upload.ctp:</p>
<p>[php]// /app/views/ajax/upload.ctp<br />
&lt;?php<br />
$output = array();<br />
if(isset($errors)) {<br />
	$output = Set::insert($output, 'errors',<br />
		array(<br />
			'message' =&gt; $errors['message'],<br />
			'data' =&gt; $errors['data']<br />
		));<br />
} elseif (isset($success)) {<br />
	$output = Set::insert($output, 'success',<br />
		array(<br />
			'message' =&gt; $success['message'],<br />
			'data' =&gt; $success['data']<br />
		));<br />
}<br />
// Sólo para Auth<br />
//elseif (isset($sessionTimeOut)){<br />
//	$output = Set::insert($output, 'sessionTimeOut', array('message' =&gt; $sessionTimeOut['message']));<br />
//}<br />
// Fin Auth<br />
echo $javascript-&gt;object($output);[/php]</p>
<p>Este fichero es el encargado de convertir el array que le enviemos desde el controlador con la información (ya sea un error o un mensaje de éxito) a JSON. La salida que generará será algo así:</p>
<p>[js] // En caso de éxito<br />
{<br />
	&quot;success&quot;:<br />
	{<br />
		&quot;message&quot;:&quot;&lt;b&gt;nombre_de_fichero.jpg&lt;\/b&gt; subido correctamente.&quot;,<br />
		&quot;data&quot;:&quot;nombre_de_fichero.jpg&quot;<br />
	}<br />
}<br />
// En caso de error<br />
{<br />
	&quot;errors&quot;:<br />
	{<br />
		&quot;message&quot;:&quot;Error subiendo el fichero&quot;,<br />
		&quot;data&quot;:&quot;nombre_de_fichero.jpg&quot;<br />
	}<br />
}[/js]</p>
<p>El campo "data" no lo utilizaremos en este caso, pero está ahí para que veáis que se pueden enviar tantos datos de respuesta como queráis.</p>
<p>Bien, con esto hemos terminado lo que sería la carga de ficheros. Nuestro método <em>upload</em> nos gestiona el fichero subido guardándolo en el servidor y devolviéndonos un mensaje como respuesta (tanto si la subida ha dado error como si no). Además nuestra función JavaScript se encarga de generarnos un formulario dinámicamente a medida que va recibiendo los nombres de imagen.</p>
<p>Ahora nos faltaría hacer la validación con Ajax de nuestro formulario.</p>
<p>Empezaremos por acabar de completar el fichero JavaScript. Al fichero images.js añadidle las siguientes funciones:</p>
<p>[js]// Continuación del fichero /app/webroot/js/page_specific/images.js<br />
// Convierte una_frase a unaFrase<br />
function camelize(string) {<br />
	var a = string.split('_'), i;<br />
	s = [];<br />
	for (i=0; i&lt;a.length; i++){<br />
		s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));<br />
	}<br />
	s = s.join('');<br />
	return s;<br />
}</p>
<p>// Decide qué función ejecutar según los datos recibidos (si es &quot;error&quot; o &quot;success&quot;)<br />
function afterValidate(data, status){<br />
	console.log(data);<br />
	console.log(webroot + 'images/ajaxAdd');<br />
	$(&quot;.error-message, #flashMessage&quot;).remove();<br />
	if (data.errors || data.saved) {<br />
		if(data.saved){<br />
			onSaved(data.saved);<br />
		}<br />
		onError(data.errors);<br />
	} else if (data.success) {<br />
		onSuccess(data.success);<br />
	}<br />
// Auth<br />
//	 else if (data.sessionTimeOut){<br />
//		onTimeOut(data.sessionTimeOut);<br />
//	}<br />
// fin Auth<br />
}</p>
<p>// Esta función sirve para eliminar imágenes de la pantalla<br />
// del usuario cuando estas han sido guardadas correctamente<br />
function onSaved(data){<br />
	$.each(data, function(id, item){<br />
		$(&quot;#imatge&quot;+id).slideUp('slow',function(){<br />
			$(this).css({'background': 'none'})<br />
				.html('&lt;b class=&quot;ok&quot;&gt;'+item.message+'&lt;/b&gt;').slideDown('slow');<br />
		});<br />
	});<br />
}</p>
<p>// En caso de error hacemos un bucle entre los errores y<br />
// los mostramos cada uno en su input correspondiente<br />
function onError(data){<br />
	flashMessage(data.message,'error');<br />
	$(&quot;.add-info :submit&quot;).removeAttr('disabled');<br />
	$(&quot;#ajaxLoad&quot;).fadeOut();<br />
	$.each(data.data, function(key){<br />
		$.each(data.data[key], function(model, errors){<br />
			for (fieldName in this) {<br />
				var element = $(&quot;#&quot; + camelize(model + '_' + fieldName) + key);<br />
				var _insert = $(document.createElement('div')).insertAfter(element).hide()<br />
				.addClass('error-message').text(this[fieldName]).slideDown();<br />
			}<br />
		});<br />
	});<br />
};</p>
<p>// En caso de guardarse todo correctamente mostramos mensaje<br />
// y redirigimos al usuario donde queramos<br />
function onSuccess(data){<br />
	$(&quot;#ImageAddForm&quot;).slideUp('slow');<br />
	flashMessage(data.message,'info');<br />
	$(&quot;#ajaxLoad&quot;).fadeOut();<br />
	window.setTimeout(function() {<br />
		window.location.href = webroot + 'images/index';<br />
	}, 1500);<br />
};</p>
<p>// Envío del formulario mediante Ajax<br />
$('#ImageAddForm').submit(function(){<br />
	// Desactivamos el botón de submit<br />
	$(&quot;.add-info :submit&quot;).attr('disabled','disabled');<br />
	// Mostramos imagen de carga<br />
	$(&quot;#ajaxLoad&quot;).fadeIn();<br />
	// Eliminamos (si hubiera) mensajes de error<br />
	$(&quot;#flashMessage&quot;).fadeOut();<br />
	$(&quot;.error-message&quot;).slideUp();<br />
	$.post(webroot + 'images/ajaxAdd',<br />
		$(this).serializeArray(),<br />
		afterValidate,<br />
		&quot;json&quot;<br />
	);<br />
	return false;<br />
});[/js]</p>
<p>La función <strong>camelize</strong> es la encargada de convertir las cadenas como_esta a cadenas comoEsta. Esto nos sirve para encontrar la id del textbox al que está vinculado el error a partir de los errores retornados en JSON.</p>
<p>La función <strong>afterValidate</strong> es la que decide qué función se ejecutará según la respuesta que recibamos (<em>success</em>, <em>error</em> o <em>sessionTimeOut</em>).</p>
<p>La función <strong>onSaved</strong> es la encargada de, en caso de que haya imágenes con errores y otras no (y al volver a enviar el usuario el formulario), eliminar del formulario las imágenes guardadas correctamente.</p>
<p><strong>onError</strong> se encarga de mostrar un <em>flashMessage</em> mostrando el mensaje de error general y cada uno de los errores de validación.</p>
<p>Si todas las imágenes se guardan correctamente se ejecuta <strong>onSuccess</strong> que se encarga de ocultar todo el formulario haciendo un efecto <em>slideUp</em>, mostrar un <em>flashMessage</em>, ocultar la imágen de carga de Ajax y finalmente redirige al usuario a la página deseada (en el ejemplo lo redirijo a la misma página).</p>
<p>El último método es el encargado de enviar el formulario mediante Ajax.</p>
<p>De la vista ya no tenemos que tocar nada más así que pasemos al método <em>ajaxAdd</em> del controlador.</p>
<p>[php] // /app/controllers/images_controller.php<br />
function ajaxAdd()<br />
{<br />
	Configure::write('debug', 0);<br />
	$this-&gt;autoRender = false;<br />
	$this-&gt;layout = 'ajax';<br />
	if ($this-&gt;RequestHandler-&gt;isAjax()){<br />
		if (!empty($this-&gt;data)){<br />
			// Si utilizáis Auth eliminad estos comentarios<br />
			//$user = $this-&gt;Auth-&gt;user();<br />
			//if (!empty($user)){<br />
				// Inicializamos las variables que contendrán errores y demás información<br />
				$data = $dataOk = array();<br />
				$error = false;<br />
				// Iniciamos un bucle con todas las imágenes que recibamos<br />
				foreach($this-&gt;data['Image']['name'] as $key=&gt;$name){<br />
					// Nombre de fichero<br />
					$imageFile = $this-&gt;data['Image']['file'][$key];<br />
					// Datos a guardar de la imagen<br />
					$imageData = array(<br />
						'Image'=&gt;array(<br />
							'name'		=&gt; $name,<br />
							'tags'		=&gt; $this-&gt;data['Image']['tags'][$key],<br />
							'description'=&gt;$this-&gt;data['Image']['description'][$key],<br />
							'file'		=&gt; $imageFile));<br />
					// Inicializamos el modelo (importante ya que estamos haciendo un bucle)<br />
					$this-&gt;Image-&gt;create($imageData);<br />
					// Validamos los campos<br />
					if ($this-&gt;Image-&gt;validates()){<br />
						// Guardamos la imagen en la base de datos<br />
						$image = $this-&gt;Image-&gt;save($imageData);<br />
						if (!empty($image)){<br />
							// Eliminamos los 'ficheros temporales'<br />
							$location = array('tmp','full','thumb');<br />
							foreach ($location as $dir){<br />
								$loc = realpath(WWW_ROOT . 'img/upload/' . $dir . '/' . $imageFile);<br />
								// Si la carpeta es &quot;tmp&quot; eliminamos la imagen del servidor<br />
								if($dir == 'tmp'){<br />
									if (!unlink($loc)) $this-&gt;log('Error eliminando miniatura temporal ' . $imageFile);<br />
									else $this-&gt;Tempfile-&gt;deleteAll(array('Tempfile.location'=&gt;$loc));<br />
								}else $this-&gt;Tempfile-&gt;deleteAll(array('Tempfile.location'=&gt;$loc));<br />
							}<br />
							// Mensaje a mostrar cuando una sola imagen es guardada<br />
							$message = sprintf(__(&quot;Imagen %s guardada correctamente&quot;,true),$imageFile);<br />
							$dataOk[$key] = array('message'=&gt;$message,'data'=&gt;$imageFile);<br />
						}<br />
					}else {<br />
						// Errores<br />
						$error = true;<br />
						$Image = $this-&gt;Image-&gt;invalidFields();<br />
						$data[$key] = compact('Image');<br />
					}<br />
				}<br />
				// Si no tenemos errores..<br />
				if(!$error){<br />
					$message = &quot;&lt;b&gt;&quot; . __(&quot;Todas las imágenes han sido guardadas correctamente&quot;, true) . &quot;&lt;/b&gt;&quot;;<br />
					$data = $this-&gt;data;<br />
					$this-&gt;set('success',compact('message','data'));<br />
				} else {<br />
					$message = &quot;&lt;b&gt;&quot; . __(&quot;Error&quot;,true) . &quot;:&lt;/b&gt; &quot; . __(&quot;Hay campos que no son válidos, compruébalos por favor.&quot;,true);<br />
					$set = compact('message','data');<br />
					// Si tenemos algunas imágenes guardadas y otras no guardamos la variable dataOk<br />
					if(!empty($dataOk)) $set = array_merge($set,compact('dataOk'));<br />
					$this-&gt;set('errors',$set);<br />
				}<br />
// Auth<br />
//        		}else{<br />
//        			$message = &quot;&lt;b&gt;&quot; . __(&quot;Error&quot;,true) . &quot;:&lt;/b&gt; &quot; . __(&quot;Tu sesión ha expirado. Vuelve a iniciarla por favor&quot;,true);<br />
//					$data = $this-&gt;data;<br />
//					$this-&gt;set('sessionTimeOut',compact('message','data'));<br />
//        		}<br />
// fin Auth<br />
		}<br />
		$this-&gt;render('/ajax/form_validation_array');<br />
	}else $this-&gt;redirect('/');<br />
}[/php]</p>
<p>Este es un poco más complicado que el de upload por una simple razón: tenemos un array de datos en lugar de un único dato.</p>
<p>Si os fijáis en el código veréis que dentro del foreach he utilizado la variable <em>$key</em> para definir la clave del elemento actual. Es importante utilizarla para que mantenga el orden de las imágenes. No nos interesa para nada que nos guarde la tercera imagen del formulario y nos diga que la que se ha guardado correctamente es la primera..</p>
<p>A parte de eso y como a menudo digo... el código habla por sí solo y además está bien comentado, así que si os lo miráis bien lo entenderéis sin problemas.</p>
<p>Por último nos falta crear la vista "form_validation_array" que, del mismo modo que en el método upload, se encargará de convertir el array resultante a JSON:</p>
<p>[php]// /app/views/ajax/form_validation_array.ctp<br />
&lt;?php<br />
$output = array();<br />
if(isset($errors)) {<br />
	// Si hay errores<br />
	$output = Set::insert($output, 'errors', array('message' =&gt; $errors['message']));<br />
	foreach ($errors['data'] as $key =&gt; $item) {<br />
		foreach($item as $model =&gt; $errs){<br />
			foreach ($errs as $field =&gt; $message) {<br />
				$output['errors']['data'][$key][$model][$field] = $message;<br />
			}<br />
		}<br />
	}<br />
	// En caso de haberse guardado alguna imagen<br />
	if(!empty($errors['dataOk'])){<br />
		foreach($errors['dataOk'] as $key =&gt; $item){<br />
			foreach($item as $field =&gt; $message){<br />
				$output['saved'][$key][$field] = $message;<br />
			}<br />
		}<br />
	}<br />
// Si todas se han guardado correctamente...<br />
}elseif (isset($success)) {<br />
	$output = Set::insert($output, 'success', array('message' =&gt; $success['message']));<br />
}<br />
// Sólo para Auth<br />
//elseif (!isset($auth)){<br />
//	$output = Set::insert($output, 'sessionTimeOut', array(<br />
//        'message' =&gt; $sessionTimeOut['message'],<br />
//        'data' =&gt; $sessionTimeOut['data']<br />
//	));<br />
//}<br />
// fin Auth<br />
echo $javascript-&gt;object($output);[/php]</p>
<p>Y su salida aproximada:</p>
<p>[js]// Si ha habido algún error (fijaros que una de las imágenes se ha guardado correctamente)<br />
{&quot;errors&quot;:{<br />
	&quot;message&quot;:&quot;&lt;b&gt;Error:&lt;\/b&gt; Hay campos que no son v\u00e1lidos, compru\u00e9balos por favor.&quot;,<br />
	&quot;data&quot;:{<br />
		&quot;0&quot;:{<br />
			&quot;Image&quot;:{<br />
				&quot;name&quot;:&quot;El nombre debe contener entre 3 y 45 caracteres&quot;<br />
				}<br />
		},&quot;2&quot;:{<br />
			&quot;Image&quot;:{<br />
				&quot;name&quot;:&quot;El nombre debe contener entre 3 y 45 caracteres&quot;<br />
				}<br />
			}<br />
		}<br />
	},&quot;saved&quot;:{<br />
		&quot;1&quot;:{<br />
			&quot;message&quot;:&quot;Imagen 1165589284_f0.jpg guardada correctamente&quot;,<br />
			&quot;data&quot;:&quot;1165589284_f0.jpg&quot;<br />
		}<br />
	}<br />
}</p>
<p>// Si todo ha ido bien<br />
{&quot;success&quot;:{<br />
	&quot;message&quot;:&quot;&lt;b&gt;Todas las im\u00e1genes han sido guardadas correctamente&lt;\/b&gt;&quot;<br />
}}<br />
[/js]</p>
<p>Pues ya está! Si habéis seguido todos los pasos correctamente deberíais tener vuestro upload funcionando.</p>
<p>A continuación os dejo el ejemplo que he ido haciendo a medida que hacía el tutorial así como un fichero .zip con todos los ficheros del proyecto.</p>
<blockquote>
<ul>
<li><a href="http://www.racotecnic.com/tutorials/cake/images/add">Ejemplo (las imágenes se borran cada vez que se accede a la página)</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/10/image_upload.zip">Descargar archivos del ejemplo</a></li>
</ul>
</blockquote>
<p>Nada más, como siempre.. espero que le sirva a alguien :) y si tenéis cualquier duda podéis postearla en los comentarios que trataré de contestarla cuanto antes.</p>
<blockquote><p>Páginas de referencia:</p>
<ul>
<li><a rel="nofollow" href="http://jamnite.blogspot.com/2009/05/cakephp-form-validation-with-ajax-using.html" target="_blank">CakePHP Form Validation with Ajax Using jQuery</a></li>
<li><a rel="nofollow" href="http://api.cakephp.org" target="_blank">API de CakePHP</a></li>
<li><a rel="nofollow" href="http://docs.jquery.org" target="_blank">API de jQuery</a></li>
</ul>
</blockquote>
