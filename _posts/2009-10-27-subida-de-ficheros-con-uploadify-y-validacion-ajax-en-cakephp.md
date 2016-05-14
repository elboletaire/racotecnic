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
  podéis ver el resultado del tutorial que voy a explicar en este enlace:\r\n<blockquote>\r\n
<ul>\r\n\t<li><a
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

Ya hacía tiempo que tenía ganas de escribir una entrada "de estas" :D (de estas quiero decir de programación y con muuuucho muuuucho código, como a mí me gustan :P).

Hace unos meses conté <a title="Leer artículo" href="http://www.racotecnic.com/2009/06/subida-de-ficheros-en-cakephp-con-uploadify-y-jquery/" target="_self">cómo podíais utilizar el plugin Uploadify (de jQuery) para subir ficheros a vuestro portal hecho con CakePHP</a>. Hoy iremos un poco más allá y crearemos un <strong>upload de imágenes con validación de campos con Ajax</strong>.

Antes de empezar estaría bien que hubierais leído el anterior tutorial —e incluso haberlo probado— para tener algo de práctica en el asunto. Este tutorial será (bastante) de ampliación del anterior. Quiero decir que habrá cosas en las que no profundizaré porque ya lo hice en el anterior, así como que en este hay mejoras, como la gestión de la respuesta de uploadify con JSON en lugar de con texto plano.

Si queréis podéis ver el resultado del tutorial que voy a explicar en este enlace:
<blockquote>

<ul>
<li><a href="http://www.racotecnic.com/tutorials/cake/images/add">Ejemplo (las imágenes se borran cada vez que se accede a la página)</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/10/image_upload.zip">Descargar archivos del ejemplo</a></li>
</ul>
</blockquote>

<a id="more"></a><a id="more-746"></a><br />
Pongámonos a ello. Primero de todo, como siempre, ¿qué necesitamos?

<ul>
<li><a rel="nofollow" href="http://www.cakephp.org" target="_blank">CakePHP</a> (v. 1.2.4.8284 [1.2.5 stable])</li>
<li>Un componente para gestionar ficheros subidos, <a rel="nofollow" href="http://labs.iamkoa.net/2007/10/23/image-upload-component-cakephp/" target="_blank">como este</a></li>
<li><a rel="nofollow" href="http://www.jquery.com" target="_blank">jQuery</a> (v. 1.3.2)</li>
<li><a rel="nofollow" href="http://www.uploadify.com" target="_blank">Uploadify</a> (v. 2.1.0)</li>
</ul>

<em>(las versiones que he puesto entre paréntesis son las que he utilizado yo para el tutorial)</em>

¿Y qué queremos hacer?

<ul>
<li>Mostraremos una vista con el botón de carga de ficheros (el de uploadify) y un botón desactivado para enviar el formulario.</li>
<li>El usuario seleccionará las imágenes deseadas y uploadify empezará a hacer la carga de imágenes</li>
<li>A medida que las imágenes vayan llegando al servidor generaremos dos miniaturas de la imagen (una para su futuro uso como miniatura y la otra sólo para mostrársela al usuario en el formulario de envío de imágenes) y guardaremos la original.</li>
<li>Si todas las imágenes se han guardado correctamente, mostraremos al usuario la imagen con todos los campos que pueda rellenar sobre la imagen. Si no se hubieran guardado correctamente se le mostrará al usuario un mensaje de error.</li>
<li>Una vez subidas todas las imágenes activamos el botón (eliminamos el atributo "disabled") del formulario.</li>
<li>Cuando el usuario envíe el formulario pasaremos a hacer la validación Ajax.</li>
<li>Si todos los datos son correctos los guardamos y eliminamos la miniatura que no utilizaremos.</li>
</ul>

Y este es un resultado aproximado de cómo os podría quedar (paso por paso):

<a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges1.png"><img class="alignnone size-thumbnail wp-image-747" title="upload_imatges1" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges1-150x150.png" alt="upload_imatges1" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges2.png"><img class="alignnone size-thumbnail wp-image-748" title="upload_imatges2" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges2-150x150.png" alt="upload_imatges2" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges3.png"><img class="alignnone size-thumbnail wp-image-749" title="upload_imatges3" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges3-150x150.png" alt="upload_imatges3" width="150" height="150" /></a>

<a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges4.png"><img class="alignnone size-thumbnail wp-image-750" title="upload_imatges4" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges4-150x150.png" alt="upload_imatges4" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges5.png"><img class="alignnone size-thumbnail wp-image-751" title="upload_imatges5" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges5-150x150.png" alt="upload_imatges5" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges6.png"><img class="alignnone size-thumbnail wp-image-752" title="upload_imatges6" src="http://www.racotecnic.com/wp-content/uploads/2009/09/upload_imatges6-150x150.png" alt="upload_imatges6" width="150" height="150" /></a>

Como la otra vez, descargamos todo lo necesario y lo ponemos en nuestro proyecto. Así es como he organizado los ficheros en mi proyecto:

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

A diferencia de otros plugins de jquery, uploadify no especifica la imagen "cancel.png" mediante CSS; lo hace mediante JavaScript y gracias a ello no tenemos que hacer ninguna modificación al CSS.

Hay una cosa que no he mencionado en los pasos de "¿qué queremos hacer?" y que encuentro que es bastante importante. Pensad un momento en el procedimiento de subir imágenes con este sistema...

Una vez el usuario ha seleccionado las imágenes estas empiezan a subir. Cuando han subido todas generamos ficheros (miniaturas, así como el archivo original) que guardamos en el servidor y que, si el usuario no diera al botón de "Guardar" del formulario, quedarían en nuestro servidor ocupando espacio.

Mi solución para este problema ha sido crear una tabla llamada "<em>tempfiles</em>" donde introduzco la ruta completa del fichero. Así después podré eliminar todos los ficheros temporales con un simple clic desde mi panel de administración o, si me gustara el contenido de estos ficheros temporales, podría añadirlos fácilmente a la base de datos sin tener que volver a subir los ficheros.

A diferencia del anterior tutorial, en este os explicaré desde la creación de las tablas SQL (cosa que no hice en el anterior).

Creemos entonces una tabla <em>tempfiles</em> con dos campos (id y <em>location</em>) y una tabla <em>images</em> con los campos que creamos necesarios:

<a href="http://www.racotecnic.com/wp-content/uploads/2009/09/model_tempfiles.png"><img class="alignnone size-full wp-image-757" style="vertical-align: middle;" title="model_tempfiles" src="http://www.racotecnic.com/wp-content/uploads/2009/09/model_tempfiles.png" alt="model_tempfiles" width="143" height="88" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2009/09/model_images.png"><img class="alignnone size-full wp-image-756" style="vertical-align: middle;" title="model_images" src="http://www.racotecnic.com/wp-content/uploads/2009/09/model_images.png" alt="model_images" width="158" height="184" /></a>

[sql]CREATE  TABLE IF NOT EXISTS `images` (<br />
  `id` INT NOT NULL AUTO_INCREMENT,<br />
  `name` VARCHAR(45) NOT NULL ,<br />
  `description` VARCHAR(255) NULL ,<br />
  `tags` TEXT NULL ,<br />
  `file` VARCHAR(100) NULL ,<br />
  `created` DATETIME NULL ,<br />
  `modified` DATETIME NULL ,<br />
  PRIMARY KEY (`id`) )<br />
ENGINE = InnoDB;

CREATE  TABLE IF NOT EXISTS `tempfiles` (<br />
  `id` INT NOT NULL AUTO_INCREMENT,<br />
  `location` VARCHAR(350) NULL ,<br />
  PRIMARY KEY (`id`) )<br />
ENGINE = InnoDB;[/sql]

Y sus modelos correspondientes, image.php y tempfile.php:

[php]// /app/models/tempfile.php<br />
<?php<br />
class Tempfile extends AppModel<br />
{<br />
	var $name = 'Tempfile';<br />
}<br />
[/php]

[php]// /app/models/image.php<br />
<?php<br />
class Image extends AppModel {<br />
	var $name = 'Image';<br />
	var $validate = array(<br />
		'name'=>array(<br />
			'length'=>array(<br />
				'rule'=>array('between',3,45),<br />
				'message'=>'El nombre debe contener entre 3 y 45 caracteres')),<br />
		'description'=>array(<br />
			'length'=>array(<br />
				'rule'=>array('maxLength',100),<br />
				'message'=>'La descripción no puede tener más de 255 caracteres')));<br />
}[/php]

Necesitaremos tres carpetas para guardar las imágenes. Una para las imágenes a tamaño completo, otra para las miniaturas y otra para los ficheros temporales (las miniaturas que mostraremos al usuario). Creadlas en la carpeta <em>img</em> y dadles permiso de escritura:

<ul>
<li>/app/webroot/img/upload/full/</li>
<li>/app/webroot/img/upload/thumb/</li>
<li>/app/webroot/img/upload/tmp/</li>
</ul>

Ahora pasamos a la vista para añadir imágenes:

[php]// /app/views/images/add.ctp<br />
<?php<br />
$javascript->codeBlock('var webroot=''.$this->webroot.'';var sessionId = '' . $session->id() .'';',array('inline'=>false));<br />
$javascript->link(<br />
	array(<br />
		'jquery-1.3.2.min',<br />
		'swfobject',<br />
		'jquery.uploadify.min',<br />
		'page_specific/images'<br />
	), false);<br />
?><br />
<div id='add-images' class='add-info'><br />
	<? __('Subir imágenes') ?><br />
	<div class='contenido'><br />
			<?= $form->create() ?><br />
			<div class='input upload'><br />
				<div id='imageFile'><?php __('Necesitas JavaScript y Flash para poder subir ficheros') ?></div><br />
			</div><br />
			<div id='ajaxLoad' style='display:none;'><?= $html->image('ajax_load.gif', array('alt' =>__('Carregant...',true))) ?></div><br />
			<?= $form->end(array('label'=>__('Guardar',true),'disabled'=>'disabled')) ?><br />
	</div><br />
</div>[/php]

La primera línea es para iniciar dos variables de JavaScript, una de ellas con la ruta webroot y la otra con la id de la sesión de PHP. Quizás os interese poner esta porción de código en vuestro layout para aprovecharlo desde cualquier controlador/vista del proyecto.

Como véis hemos cargado jQuery, swfobject (de uploadify, tiene que cargarse antes de uploadify siempre), uploadify y un fichero que crearemos más adelante llamado "images.js" y situado en la carpeta /app/webroot/js/page_specific/.

También hemos creado una capa oculta llamada "ajaxLoad" que contiene una imagen para cuando hagamos la validación con Ajax.

Ahora que tenemos la vista empezaremos su fichero JavaScript images.js. Digo empezaremos porque iremos por partes, primero haremos la subida de ficheros y luego la validación con Ajax.

[js]// /app/webroot/js/page_specific/images.js<br />
$(function(){<br />
	/**<br />
	 * Validació amb Ajax<br />
	 */<br />
	var _loadingDiv = $('#ajaxLoad');

	// Muestra la capa #flashMessage encima de la capa con clase .add-info<br />
	function flashMessage(message,classe){<br />
		$(document.createElement('div'))<br />
			.css('display', 'none')<br />
			.attr('id','flashMessage')<br />
			.addClass(classe)<br />
			.html(message)<br />
			.insertBefore($('.add-info')).fadeIn();<br />
	}

// Sólo para Auth<br />
//	function onTimeOut(data){<br />
//		flashMessage(data.message,'error');<br />
//	    window.setTimeout(function() {<br />
//	        window.location.href = webroot + 'users/login';<br />
//	    }, 2500);<br />
//	}<br />
// Fin Auth

	// Contador de IDs<br />
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
				$('.input.upload').append(<br />
					// Creamos una capa que contenga la imagen resultante de fondo<br />
					$('<div></div>').css({<br />
						'background': 'left center no-repeat url(' + webroot + 'img/upload/tmp/' + imageObj.success.data + ')',<br />
						'width': '385px'<br />
					}).attr('id','imatge'+item)<br />
						// Creamos una capa con los inputs<br />
						.append($('<div></div>').css({<br />
							'margin-left': '105px'<br />
							// Afegim missatge d'èxit i inputs<br />
						}).append(imageObj.success.message + '<br/>' +<br />
							'<label for='ImageName'+item+''>Nombre de la imagen<em>*</em></label>'+<br />
							'<input maxlength='45' type='text' name='data[Image][name]['+item+']' value='' +<br />
							imageObj.success.data.replace(/\.([a-zA-Z]){3,4}$/,'') + '' id='ImageName'+item+'' />' +<br />
							'<label for='ImageDescription'+item+''>Descripción (255 caracteres máximo)</label>' +<br />
							'<input maxlength='255' type='text' name='data[Image][description]['+item+']' id='ImageDescription'+item+'' />' +<br />
							'<label for='ImageTags'+item+''>Etiquetas (separadas por comas)</label>' +<br />
							'<textarea name='data[Image][tags]['+item+']' id='ImageTags'+item+''></textarea>' +<br />
							'<input type='hidden' name='data[Image][file]['+item+']' value='' + imageObj.success.data + '' />' +<br />
							'<div style='clear:both'></div>'<br />
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
			$('#imageFile, #imageFileUploader').fadeOut('fast');<br />
			$(':submit').removeAttr('disabled');<br />
		}<br />
	});<br />
});[/js]

La función <strong>flashMessage</strong> sirve para generar una capa "flashMessage" dinámica justo encima de la capa con clase ".add-info".

La función <strong>onTimeOut</strong> sólo es para los que utilicéis el componente Auth. En caso de terminarse la sesión muestra un mensaje al usuario y lo redirige hacia la página de login pasado un rato.
<blockquote>
<strong>Nota:</strong> Esta no es la vía correcta para mostrar un error conforme  la sesión del usuario ha expirado. Podéis ver la explicación que hago al  respecto <a href="../2009/12/cakephp-auth-component-ajaxlogin/">aquí</a>.</blockquote>

Finalmente, en la función de carga de uploadify indicamos los parámetros que nos interesen y generamos una función <strong>OnComplete</strong> a nuestro gusto. En este ejemplo lo que he hecho es generar una capa (con id imatgeX, donde X es el número de ID actual, según el contador de IDs) con una miniatura de fondo que he generado exclusivamente para mostrársela al usuario en este formulario. Dentro de esta capa hay otra capa con las etiquetas y los inputs que necesito.

Es importante que todos elementos del formulario que queráis meter dinámicamente aquí lleven una ID única con un número al final. Esto nos servirá más adelante para la validación con Ajax.

Cuando todos los ficheros han terminado de subir mostramos un mensaje (con clase ".info"), eliminamos el botón de uploadify y eliminamos el atributo <em>disabled</em> del botón <em>submit</em> (y por tanto lo activamos).

Pasemos al controlador. Primero la construcción de éste, su función beforeRender (importante, lo expliqué en el anterior tutorial), el método <em>add</em> (vacío) y el método <em>upload</em>:

[php]// /app/controllers/images_controller.php<br />
<?php<br />
class ImagesController extends AppController<br />
{<br />
	var $name = 'Images';<br />
	// ¡Importante cargar RequestHandler!!<br />
	var $components = array('Upload','RequestHandler');<br />
	// Helpers necesarios<br />
	var $helpers = array('Html','Form','Javascript');<br />
	// Modelos a utilizar<br />
	var $uses = array('Image','Tempfile');

	function beforeFilter()<br />
	{<br />
		if($this->action == 'upload'){<br />
			if (isset($this->params['pass'][0])){<br />
				$this->Session->id($this->params['pass'][0]);<br />
				$this->Session->start();<br />
			}else{<br />
				$this->redirect('/');<br />
			}<br />
		}<br />
		// Si utilizamos Auth debemos dar permiso a todo el mundo a las acciones 'upload' y 'ajaxAdd'<br />
		//$this->Auth->allowedActions = array('upload','ajaxAdd');<br />
		parent::beforeFilter();<br />
	}

	function add()<br />
	{<br />
		$this->pageTitle = __('Añadir imágenes');<br />
	}

	function upload()<br />
	{<br />
		// Desactivamos el debug (necesario siempre que trabajamos con Ajax)<br />
		Configure::write('debug', 0);<br />
		//header('Content-type: text/x-json');<br />
		$this->autoRender = false;<br />
		$this->layout = 'ajax';<br />
		if (isset($this->params['form']['Filedata'])){<br />
// Si utilizáis Auth eliminad estos comentarios<br />
//			$user = $this->Auth->user();<br />
//			if (!empty($user)){<br />
// Fin Auth<br />
				// Creamos la primera miniatura<br />
				$thumb = $this->Upload->upload(<br />
					$this->params['form']['Filedata'],'img/upload/thumb/', null,<br />
					array(<br />
						'type' => 'resizecrop',<br />
						'size' => array(400,250),<br />
						'output' => 'jpg',<br />
						'quality'=>80),<br />
					array('jpg','jpeg','png','gif'));<br />
				// Si no se crea correctamente gestionamos los errores<br />
				if (!empty($this->Upload->errors)){<br />
					// Error que mostraremos al usuario<br />
					$message = __('Error subiendo el fichero',true);<br />
					// Guardamos el nombre original del fichero<br />
					$data = $this->params['form']['Filedata']['name'];<br />
					$this->set('errors', compact('message','data'));<br />
					// Creamos un log con el auténtico error<br />
					$this->log('Error creando la miniatura: ' .<br />
						implode(' | ',$this->Upload->errors),'upload/images');<br />
				} else {<br />
					// Si se ha guardado correctamente guardamos el 'fichero temporal' en la BD<br />
					$file = $this->Upload->result;<br />
					$location = realpath(WWW_ROOT . 'img/upload/thumb/' . $file);<br />
					$tempfile['location'] = $location;<br />
					$this->Tempfile->save($tempfile,false);<br />
					// Generamos una miniatura temporal (la que mostraremos al usuario al guardar las imágenes)<br />
					$tempThumb = $this->Upload->upload(<br />
						$this->params['form']['Filedata'],'img/upload/tmp/', null,<br />
						array(<br />
							'type' => 'resizecrop',<br />
							'size' => array(100,150),<br />
							'output' => 'jpg',<br />
							'quality'=>80),<br />
						array('jpg','jpeg','png','gif'));<br />
					if(!empty($this->Upload->errors)){<br />
						// Si tiene errores lo guardamos en un log. A mi parecer, aquí no nos interesa mostrar error al usuario (ya que en realidad es una imagen temporal que más adelante borraremos)<br />
						$this->log('Error creando la miniatura temporal: ' .<br />
							implode(' | ',$this->Upload->errors),'upload/images');<br />
					} else {<br />
						// Si no hay errores guardamos el 'fichero temporal'<br />
						$location = realpath(WWW_ROOT . 'img/upload/tmp/' . $this->Upload->result);<br />
						$tempfile['location'] = $location;<br />
						// Es importante hacer el 'create' a partir de la segunda vez<br />
						$this->Tempfile->create($tempfile);<br />
						$this->Tempfile->save();<br />
					}<br />
					// Si se ha creado la primera miniatura subimos la original a la carpeta deseada<br />
					$result = $this->Upload->upload($this->params['form']['Filedata'], 'img/upload/full/', $this->Upload->result);<br />
					if (!empty($this->Upload->errors)){<br />
						// Si no se guarda generamos log<br />
						$this->log('Error subiendo la imagen: ' .<br />
							implode(' | ',$this->Upload->errors),'upload/images');<br />
						// Y mostramos mensaje de error al usuario<br />
						$message = __('Error subiendo el fichero',true);<br />
						$data = $this->params['form']['Filedata']['name'];<br />
						$this->set('errors', compact('message','data'));<br />
					}else{<br />
						// Guardamos 'fichero temporal'<br />
						$data = $this->Upload->result;<br />
						$location = realpath(WWW_ROOT . 'img/upload/full/' . $data);<br />
						$tempfile['location'] = $location;<br />
						$this->Tempfile->create($tempfile);<br />
						$this->Tempfile->save();<br />
						// Mostramos mensaje de éxito al usuario<br />
						$message = sprintf(__('%s subido correctamente.',true),'<b>' . $this->params['form']['Filedata']['name'] . '</b>');<br />
						$this->set('success',compact('data','message'));<br />
					}<br />
				}<br />
// Si utilizáis Auth eliminad estos comentarios<br />
//			}else{<br />
//    			$message = '<b>' . __('Error',true) . ':</b> ' . __('Tu sesión ha expirado. Vuelve a iniciarla por favor',true);<br />
//				$this->set('sessionTimeOut',compact('message'));<br />
//			}<br />
// Fin Auth<br />
			// Renderizamos la vista (/views/ajax/upload.ctp)<br />
			$this->render('/ajax/upload');<br />
		}<br />
	}<br />
}[/php]

A parte de los comentarios y el código (que hablan por sí solos.. ;) ) quiero comentar un par de cosillas...

La cabecera que está comentada (Content-Type: text/x-json) la puse en su momento porque en Internet Explorer 8 y Opera 10 me daba algunos problemas si no ponía esta cabecera. Ahora sin ella me funciona correctamente (realmente había más cosas que interferían en su funcionamiento con IE y Opera), así que la he comentado por si la tuvierais que utilizar en algún momento.

Respecto a los comentarios sobre el componente de autenticación (Auth)... en caso de que en vuestra web queráis restringir las subidas a usuarios registrados deberéis descomentar las líneas comentadas para que, en caso de que al usuario le expire la sesión mientras está subiendo imágenes, se le muestre un mensaje de error (sin esto, en caso de expirar la sesión, no se mostraría <strong>nada</strong> al usuario).
<blockquote>
<strong>Nota:</strong> Esta no es la vía correcta para mostrar un error conforme la sesión del usuario ha expirado. Podéis ver la explicación que hago al respecto <a href="http://www.racotecnic.com/2009/12/cakephp-auth-component-ajaxlogin/">aquí</a>.</blockquote>

En cuanto al render de la vista... ahora pasaremos a la creación de la vista upload.ctp y veréis que el fichero es muy genérico. Quiero decir que con este mismo fichero podéis gestionar cualquier subida de ficheros que hagáis con Ajax, así que, tener que generar una vista idéntica para cada sección en que tengáis subida de ficheros, es algo absurdo.

Digo esto porque lo que hago yo es meter todos los ficheros relacionados con ajax en la carpeta <em>/app/views/ajax/</em> y así los utilizo desde cualquier controlador (de ahí el "$this->render('/ajax/upload')".

Vamos a por el fichero upload.ctp:

[php]// /app/views/ajax/upload.ctp<br />
<?php<br />
$output = array();<br />
if(isset($errors)) {<br />
	$output = Set::insert($output, 'errors',<br />
		array(<br />
			'message' => $errors['message'],<br />
			'data' => $errors['data']<br />
		));<br />
} elseif (isset($success)) {<br />
	$output = Set::insert($output, 'success',<br />
		array(<br />
			'message' => $success['message'],<br />
			'data' => $success['data']<br />
		));<br />
}<br />
// Sólo para Auth<br />
//elseif (isset($sessionTimeOut)){<br />
//	$output = Set::insert($output, 'sessionTimeOut', array('message' => $sessionTimeOut['message']));<br />
//}<br />
// Fin Auth<br />
echo $javascript->object($output);[/php]

Este fichero es el encargado de convertir el array que le enviemos desde el controlador con la información (ya sea un error o un mensaje de éxito) a JSON. La salida que generará será algo así:

[js] // En caso de éxito<br />
{<br />
	'success':<br />
	{<br />
		'message':'<b>nombre_de_fichero.jpg<\/b> subido correctamente.',<br />
		'data':'nombre_de_fichero.jpg'<br />
	}<br />
}<br />
// En caso de error<br />
{<br />
	'errors':<br />
	{<br />
		'message':'Error subiendo el fichero',<br />
		'data':'nombre_de_fichero.jpg'<br />
	}<br />
}[/js]

El campo "data" no lo utilizaremos en este caso, pero está ahí para que veáis que se pueden enviar tantos datos de respuesta como queráis.

Bien, con esto hemos terminado lo que sería la carga de ficheros. Nuestro método <em>upload</em> nos gestiona el fichero subido guardándolo en el servidor y devolviéndonos un mensaje como respuesta (tanto si la subida ha dado error como si no). Además nuestra función JavaScript se encarga de generarnos un formulario dinámicamente a medida que va recibiendo los nombres de imagen.

Ahora nos faltaría hacer la validación con Ajax de nuestro formulario.

Empezaremos por acabar de completar el fichero JavaScript. Al fichero images.js añadidle las siguientes funciones:

[js]// Continuación del fichero /app/webroot/js/page_specific/images.js<br />
// Convierte una_frase a unaFrase<br />
function camelize(string) {<br />
	var a = string.split('_'), i;<br />
	s = [];<br />
	for (i=0; i<a.length; i++){<br />
		s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));<br />
	}<br />
	s = s.join('');<br />
	return s;<br />
}

// Decide qué función ejecutar según los datos recibidos (si es 'error' o 'success')<br />
function afterValidate(data, status){<br />
	console.log(data);<br />
	console.log(webroot + 'images/ajaxAdd');<br />
	$('.error-message, #flashMessage').remove();<br />
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
}

// Esta función sirve para eliminar imágenes de la pantalla<br />
// del usuario cuando estas han sido guardadas correctamente<br />
function onSaved(data){<br />
	$.each(data, function(id, item){<br />
		$('#imatge'+id).slideUp('slow',function(){<br />
			$(this).css({'background': 'none'})<br />
				.html('<b class='ok'>'+item.message+'</b>').slideDown('slow');<br />
		});<br />
	});<br />
}

// En caso de error hacemos un bucle entre los errores y<br />
// los mostramos cada uno en su input correspondiente<br />
function onError(data){<br />
	flashMessage(data.message,'error');<br />
	$('.add-info :submit').removeAttr('disabled');<br />
	$('#ajaxLoad').fadeOut();<br />
	$.each(data.data, function(key){<br />
		$.each(data.data[key], function(model, errors){<br />
			for (fieldName in this) {<br />
				var element = $('#' + camelize(model + '_' + fieldName) + key);<br />
				var _insert = $(document.createElement('div')).insertAfter(element).hide()<br />
				.addClass('error-message').text(this[fieldName]).slideDown();<br />
			}<br />
		});<br />
	});<br />
};

// En caso de guardarse todo correctamente mostramos mensaje<br />
// y redirigimos al usuario donde queramos<br />
function onSuccess(data){<br />
	$('#ImageAddForm').slideUp('slow');<br />
	flashMessage(data.message,'info');<br />
	$('#ajaxLoad').fadeOut();<br />
	window.setTimeout(function() {<br />
		window.location.href = webroot + 'images/index';<br />
	}, 1500);<br />
};

// Envío del formulario mediante Ajax<br />
$('#ImageAddForm').submit(function(){<br />
	// Desactivamos el botón de submit<br />
	$('.add-info :submit').attr('disabled','disabled');<br />
	// Mostramos imagen de carga<br />
	$('#ajaxLoad').fadeIn();<br />
	// Eliminamos (si hubiera) mensajes de error<br />
	$('#flashMessage').fadeOut();<br />
	$('.error-message').slideUp();<br />
	$.post(webroot + 'images/ajaxAdd',<br />
		$(this).serializeArray(),<br />
		afterValidate,<br />
		'json'<br />
	);<br />
	return false;<br />
});[/js]

La función <strong>camelize</strong> es la encargada de convertir las cadenas como_esta a cadenas comoEsta. Esto nos sirve para encontrar la id del textbox al que está vinculado el error a partir de los errores retornados en JSON.

La función <strong>afterValidate</strong> es la que decide qué función se ejecutará según la respuesta que recibamos (<em>success</em>, <em>error</em> o <em>sessionTimeOut</em>).

La función <strong>onSaved</strong> es la encargada de, en caso de que haya imágenes con errores y otras no (y al volver a enviar el usuario el formulario), eliminar del formulario las imágenes guardadas correctamente.

<strong>onError</strong> se encarga de mostrar un <em>flashMessage</em> mostrando el mensaje de error general y cada uno de los errores de validación.

Si todas las imágenes se guardan correctamente se ejecuta <strong>onSuccess</strong> que se encarga de ocultar todo el formulario haciendo un efecto <em>slideUp</em>, mostrar un <em>flashMessage</em>, ocultar la imágen de carga de Ajax y finalmente redirige al usuario a la página deseada (en el ejemplo lo redirijo a la misma página).

El último método es el encargado de enviar el formulario mediante Ajax.

De la vista ya no tenemos que tocar nada más así que pasemos al método <em>ajaxAdd</em> del controlador.

[php] // /app/controllers/images_controller.php<br />
function ajaxAdd()<br />
{<br />
	Configure::write('debug', 0);<br />
	$this->autoRender = false;<br />
	$this->layout = 'ajax';<br />
	if ($this->RequestHandler->isAjax()){<br />
		if (!empty($this->data)){<br />
			// Si utilizáis Auth eliminad estos comentarios<br />
			//$user = $this->Auth->user();<br />
			//if (!empty($user)){<br />
				// Inicializamos las variables que contendrán errores y demás información<br />
				$data = $dataOk = array();<br />
				$error = false;<br />
				// Iniciamos un bucle con todas las imágenes que recibamos<br />
				foreach($this->data['Image']['name'] as $key=>$name){<br />
					// Nombre de fichero<br />
					$imageFile = $this->data['Image']['file'][$key];<br />
					// Datos a guardar de la imagen<br />
					$imageData = array(<br />
						'Image'=>array(<br />
							'name'		=> $name,<br />
							'tags'		=> $this->data['Image']['tags'][$key],<br />
							'description'=>$this->data['Image']['description'][$key],<br />
							'file'		=> $imageFile));<br />
					// Inicializamos el modelo (importante ya que estamos haciendo un bucle)<br />
					$this->Image->create($imageData);<br />
					// Validamos los campos<br />
					if ($this->Image->validates()){<br />
						// Guardamos la imagen en la base de datos<br />
						$image = $this->Image->save($imageData);<br />
						if (!empty($image)){<br />
							// Eliminamos los 'ficheros temporales'<br />
							$location = array('tmp','full','thumb');<br />
							foreach ($location as $dir){<br />
								$loc = realpath(WWW_ROOT . 'img/upload/' . $dir . '/' . $imageFile);<br />
								// Si la carpeta es 'tmp' eliminamos la imagen del servidor<br />
								if($dir == 'tmp'){<br />
									if (!unlink($loc)) $this->log('Error eliminando miniatura temporal ' . $imageFile);<br />
									else $this->Tempfile->deleteAll(array('Tempfile.location'=>$loc));<br />
								}else $this->Tempfile->deleteAll(array('Tempfile.location'=>$loc));<br />
							}<br />
							// Mensaje a mostrar cuando una sola imagen es guardada<br />
							$message = sprintf(__('Imagen %s guardada correctamente',true),$imageFile);<br />
							$dataOk[$key] = array('message'=>$message,'data'=>$imageFile);<br />
						}<br />
					}else {<br />
						// Errores<br />
						$error = true;<br />
						$Image = $this->Image->invalidFields();<br />
						$data[$key] = compact('Image');<br />
					}<br />
				}<br />
				// Si no tenemos errores..<br />
				if(!$error){<br />
					$message = '<b>' . __('Todas las imágenes han sido guardadas correctamente', true) . '</b>';<br />
					$data = $this->data;<br />
					$this->set('success',compact('message','data'));<br />
				} else {<br />
					$message = '<b>' . __('Error',true) . ':</b> ' . __('Hay campos que no son válidos, compruébalos por favor.',true);<br />
					$set = compact('message','data');<br />
					// Si tenemos algunas imágenes guardadas y otras no guardamos la variable dataOk<br />
					if(!empty($dataOk)) $set = array_merge($set,compact('dataOk'));<br />
					$this->set('errors',$set);<br />
				}<br />
// Auth<br />
//        		}else{<br />
//        			$message = '<b>' . __('Error',true) . ':</b> ' . __('Tu sesión ha expirado. Vuelve a iniciarla por favor',true);<br />
//					$data = $this->data;<br />
//					$this->set('sessionTimeOut',compact('message','data'));<br />
//        		}<br />
// fin Auth<br />
		}<br />
		$this->render('/ajax/form_validation_array');<br />
	}else $this->redirect('/');<br />
}[/php]

Este es un poco más complicado que el de upload por una simple razón: tenemos un array de datos en lugar de un único dato.

Si os fijáis en el código veréis que dentro del foreach he utilizado la variable <em>$key</em> para definir la clave del elemento actual. Es importante utilizarla para que mantenga el orden de las imágenes. No nos interesa para nada que nos guarde la tercera imagen del formulario y nos diga que la que se ha guardado correctamente es la primera..

A parte de eso y como a menudo digo... el código habla por sí solo y además está bien comentado, así que si os lo miráis bien lo entenderéis sin problemas.

Por último nos falta crear la vista "form_validation_array" que, del mismo modo que en el método upload, se encargará de convertir el array resultante a JSON:

[php]// /app/views/ajax/form_validation_array.ctp<br />
<?php<br />
$output = array();<br />
if(isset($errors)) {<br />
	// Si hay errores<br />
	$output = Set::insert($output, 'errors', array('message' => $errors['message']));<br />
	foreach ($errors['data'] as $key => $item) {<br />
		foreach($item as $model => $errs){<br />
			foreach ($errs as $field => $message) {<br />
				$output['errors']['data'][$key][$model][$field] = $message;<br />
			}<br />
		}<br />
	}<br />
	// En caso de haberse guardado alguna imagen<br />
	if(!empty($errors['dataOk'])){<br />
		foreach($errors['dataOk'] as $key => $item){<br />
			foreach($item as $field => $message){<br />
				$output['saved'][$key][$field] = $message;<br />
			}<br />
		}<br />
	}<br />
// Si todas se han guardado correctamente...<br />
}elseif (isset($success)) {<br />
	$output = Set::insert($output, 'success', array('message' => $success['message']));<br />
}<br />
// Sólo para Auth<br />
//elseif (!isset($auth)){<br />
//	$output = Set::insert($output, 'sessionTimeOut', array(<br />
//        'message' => $sessionTimeOut['message'],<br />
//        'data' => $sessionTimeOut['data']<br />
//	));<br />
//}<br />
// fin Auth<br />
echo $javascript->object($output);[/php]

Y su salida aproximada:

[js]// Si ha habido algún error (fijaros que una de las imágenes se ha guardado correctamente)<br />
{'errors':{<br />
	'message':'<b>Error:<\/b> Hay campos que no son v\u00e1lidos, compru\u00e9balos por favor.',<br />
	'data':{<br />
		'0':{<br />
			'Image':{<br />
				'name':'El nombre debe contener entre 3 y 45 caracteres'<br />
				}<br />
		},'2':{<br />
			'Image':{<br />
				'name':'El nombre debe contener entre 3 y 45 caracteres'<br />
				}<br />
			}<br />
		}<br />
	},'saved':{<br />
		'1':{<br />
			'message':'Imagen 1165589284_f0.jpg guardada correctamente',<br />
			'data':'1165589284_f0.jpg'<br />
		}<br />
	}<br />
}

// Si todo ha ido bien<br />
{'success':{<br />
	'message':'<b>Todas las im\u00e1genes han sido guardadas correctamente<\/b>'<br />
}}<br />
[/js]

Pues ya está! Si habéis seguido todos los pasos correctamente deberíais tener vuestro upload funcionando.

A continuación os dejo el ejemplo que he ido haciendo a medida que hacía el tutorial así como un fichero .zip con todos los ficheros del proyecto.
<blockquote>

<ul>
<li><a href="http://www.racotecnic.com/tutorials/cake/images/add">Ejemplo (las imágenes se borran cada vez que se accede a la página)</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/10/image_upload.zip">Descargar archivos del ejemplo</a></li>
</ul>
</blockquote>

Nada más, como siempre.. espero que le sirva a alguien :) y si tenéis cualquier duda podéis postearla en los comentarios que trataré de contestarla cuanto antes.
<blockquote>
Páginas de referencia:

<ul>
<li><a rel="nofollow" href="http://jamnite.blogspot.com/2009/05/cakephp-form-validation-with-ajax-using.html" target="_blank">CakePHP Form Validation with Ajax Using jQuery</a></li>
<li><a rel="nofollow" href="http://api.cakephp.org" target="_blank">API de CakePHP</a></li>
<li><a rel="nofollow" href="http://docs.jquery.org" target="_blank">API de jQuery</a></li>
</ul>
</blockquote>
