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
  un **upload de imágenes con validación de campos con Ajax**.\r\n\r\nAntes
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

Hace unos meses conté <a title="Leer artículo" href="http://www.racotecnic.com/2009/06/subida-de-ficheros-en-cakephp-con-uploadify-y-jquery/" target="_self">cómo podíais utilizar el plugin Uploadify (de jQuery) para subir ficheros a vuestro portal hecho con CakePHP</a>. Hoy iremos un poco más allá y crearemos un **upload de imágenes con validación de campos con Ajax**.

Antes de empezar estaría bien que hubierais leído el anterior tutorial —e incluso haberlo probado— para tener algo de práctica en el asunto. Este tutorial será (bastante) de ampliación del anterior. Quiero decir que habrá cosas en las que no profundizaré porque ya lo hice en el anterior, así como que en este hay mejoras, como la gestión de la respuesta de uploadify con JSON en lugar de con texto plano.

Si queréis podéis ver el resultado del tutorial que voy a explicar en este enlace:
<blockquote>

<ul>
<li><a href="http://www.racotecnic.com/tutorials/cake/images/add">Ejemplo (las imágenes se borran cada vez que se accede a la página)</a></li>
<li><a href="http://www.racotecnic.com/tutorials/2009/10/image_upload.zip">Descargar archivos del ejemplo</a></li>
</ul>
</blockquote>

<a id="more"></a><a id="more-746"></a>
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

[sql]CREATE  TABLE IF NOT EXISTS `images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL ,
  `description` VARCHAR(255) NULL ,
  `tags` TEXT NULL ,
  `file` VARCHAR(100) NULL ,
  `created` DATETIME NULL ,
  `modified` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;

CREATE  TABLE IF NOT EXISTS `tempfiles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(350) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;[/sql]

Y sus modelos correspondientes, image.php y tempfile.php:

~~~php
// /app/models/tempfile.php
<?php
class Tempfile extends AppModel
{
	var $name = 'Tempfile';
}

~~~

~~~php
// /app/models/image.php
<?php
class Image extends AppModel {
	var $name = 'Image';
	var $validate = array(
		'name'=>array(
			'length'=>array(
				'rule'=>array('between',3,45),
				'message'=>'El nombre debe contener entre 3 y 45 caracteres')),
		'description'=>array(
			'length'=>array(
				'rule'=>array('maxLength',100),
				'message'=>'La descripción no puede tener más de 255 caracteres')));
}
~~~

Necesitaremos tres carpetas para guardar las imágenes. Una para las imágenes a tamaño completo, otra para las miniaturas y otra para los ficheros temporales (las miniaturas que mostraremos al usuario). Creadlas en la carpeta <em>img</em> y dadles permiso de escritura:

<ul>
<li>/app/webroot/img/upload/full/</li>
<li>/app/webroot/img/upload/thumb/</li>
<li>/app/webroot/img/upload/tmp/</li>
</ul>

Ahora pasamos a la vista para añadir imágenes:

~~~php
// /app/views/images/add.ctp
<?php
$javascript->codeBlock('var webroot=''.$this->webroot.'';var sessionId = '' . $session->id() .'';',array('inline'=>false));
$javascript->link(
	array(
		'jquery-1.3.2.min',
		'swfobject',
		'jquery.uploadify.min',
		'page_specific/images'
	), false);
?>
<div id='add-images' class='add-info'>
	<? __('Subir imágenes') ?>
	<div class='contenido'>
			<?= $form->create() ?>
			<div class='input upload'>
				<div id='imageFile'><?php __('Necesitas JavaScript y Flash para poder subir ficheros') ?></div>
			</div>
			<div id='ajaxLoad' style='display:none;'><?= $html->image('ajax_load.gif', array('alt' =>__('Carregant...',true))) ?></div>
			<?= $form->end(array('label'=>__('Guardar',true),'disabled'=>'disabled')) ?>
	</div>
</div>
~~~

La primera línea es para iniciar dos variables de JavaScript, una de ellas con la ruta webroot y la otra con la id de la sesión de PHP. Quizás os interese poner esta porción de código en vuestro layout para aprovecharlo desde cualquier controlador/vista del proyecto.

Como véis hemos cargado jQuery, swfobject (de uploadify, tiene que cargarse antes de uploadify siempre), uploadify y un fichero que crearemos más adelante llamado "images.js" y situado en la carpeta /app/webroot/js/page_specific/.

También hemos creado una capa oculta llamada "ajaxLoad" que contiene una imagen para cuando hagamos la validación con Ajax.

Ahora que tenemos la vista empezaremos su fichero JavaScript images.js. Digo empezaremos porque iremos por partes, primero haremos la subida de ficheros y luego la validación con Ajax.

~~~javascript
// /app/webroot/js/page_specific/images.js
$(function(){
	/**
	 * Validació amb Ajax
	 */
	var _loadingDiv = $('#ajaxLoad');

	// Muestra la capa #flashMessage encima de la capa con clase .add-info
	function flashMessage(message,classe){
		$(document.createElement('div'))
			.css('display', 'none')
			.attr('id','flashMessage')
			.addClass(classe)
			.html(message)
			.insertBefore($('.add-info')).fadeIn();
	}

// Sólo para Auth
//	function onTimeOut(data){
//		flashMessage(data.message,'error');
//	    window.setTimeout(function() {
//	        window.location.href = webroot + 'users/login';
//	    }, 2500);
//	}
// Fin Auth

	// Contador de IDs
	var item = 0;
	$('#imageFile').uploadify({
		'uploader' : webroot + 'flash/uploadify.swf',
		'script' : webroot +'images/upload/'+sessionId,
		'buttonText' : 'Buscar imágenes',
		'cancelImg' : webroot + 'img/botons/cancel.png',
		'auto' : 'true',
		'multi' : 'true',
		'simUploadLimit' : 3,
		'queueSizeLimit' : 10,
		'sizeLimit' : 800*1024,
		'fileExt' : '*.jpg;*.png;*.jpeg;*.gif',
		'fileDesc' : 'Imágenes',
		'onComplete' : function(evt, queueId, fileObj, response, data){
			// Interpretamos la respuesta JSON como un objeto
			var imageObj = eval('(' + response + ')');
			if (imageObj.success){
				$('.input.upload').append(
					// Creamos una capa que contenga la imagen resultante de fondo
					$('<div></div>').css({
						'background': 'left center no-repeat url(' + webroot + 'img/upload/tmp/' + imageObj.success.data + ')',
						'width': '385px'
					}).attr('id','imatge'+item)
						// Creamos una capa con los inputs
						.append($('<div></div>').css({
							'margin-left': '105px'
							// Afegim missatge d'èxit i inputs
						}).append(imageObj.success.message + '' +
							'<label for='ImageName'+item+''>Nombre de la imagen<em>*</em></label>'+
							'<input maxlength='45' type='text' name='data[Image][name]['+item+']' value='' +
							imageObj.success.data.replace(/\.([a-zA-Z]){3,4}$/,'') + '' id='ImageName'+item+'' />' +
							'<label for='ImageDescription'+item+''>Descripción (255 caracteres máximo)</label>' +
							'<input maxlength='255' type='text' name='data[Image][description]['+item+']' id='ImageDescription'+item+'' />' +
							'<label for='ImageTags'+item+''>Etiquetas (separadas por comas)</label>' +
							'<textarea name='data[Image][tags]['+item+']' id='ImageTags'+item+''></textarea>' +
							'<input type='hidden' name='data[Image][file]['+item+']' value='' + imageObj.success.data + '' />' +
							'<div style='clear:both'></div>'
						)
					)
				);
				// Incrementamos contador de ids
				item++;
			}else if (imageObj.errors) {
				// En caso de error mostramos flashmessage
				flashMessage(imageObj.errors.message,'error');
			}
// Sólo para Auth
//			else if (imageObj.sessionTimeOut){
//				onTimeOut(imageObj.sessionTimeOut);
//			}
// Fin auth
			},
		'onAllComplete' : function(evt, data){
			flashMessage('Se han subido todas las imágenes. Recuerda enviar el formulario','info');
			$('#imageFile, #imageFileUploader').fadeOut('fast');
			$(':submit').removeAttr('disabled');
		}
	});
});
~~~

La función **flashMessage** sirve para generar una capa "flashMessage" dinámica justo encima de la capa con clase ".add-info".

La función **onTimeOut** sólo es para los que utilicéis el componente Auth. En caso de terminarse la sesión muestra un mensaje al usuario y lo redirige hacia la página de login pasado un rato.
<blockquote>
**Nota:** Esta no es la vía correcta para mostrar un error conforme  la sesión del usuario ha expirado. Podéis ver la explicación que hago al  respecto <a href="../2009/12/cakephp-auth-component-ajaxlogin/">aquí</a>.</blockquote>

Finalmente, en la función de carga de uploadify indicamos los parámetros que nos interesen y generamos una función **OnComplete** a nuestro gusto. En este ejemplo lo que he hecho es generar una capa (con id imatgeX, donde X es el número de ID actual, según el contador de IDs) con una miniatura de fondo que he generado exclusivamente para mostrársela al usuario en este formulario. Dentro de esta capa hay otra capa con las etiquetas y los inputs que necesito.

Es importante que todos elementos del formulario que queráis meter dinámicamente aquí lleven una ID única con un número al final. Esto nos servirá más adelante para la validación con Ajax.

Cuando todos los ficheros han terminado de subir mostramos un mensaje (con clase ".info"), eliminamos el botón de uploadify y eliminamos el atributo <em>disabled</em> del botón <em>submit</em> (y por tanto lo activamos).

Pasemos al controlador. Primero la construcción de éste, su función beforeRender (importante, lo expliqué en el anterior tutorial), el método <em>add</em> (vacío) y el método <em>upload</em>:

~~~php
// /app/controllers/images_controller.php
<?php
class ImagesController extends AppController
{
	var $name = 'Images';
	// ¡Importante cargar RequestHandler!!
	var $components = array('Upload','RequestHandler');
	// Helpers necesarios
	var $helpers = array('Html','Form','Javascript');
	// Modelos a utilizar
	var $uses = array('Image','Tempfile');

	function beforeFilter()
	{
		if($this->action == 'upload'){
			if (isset($this->params['pass'][0])){
				$this->Session->id($this->params['pass'][0]);
				$this->Session->start();
			}else{
				$this->redirect('/');
			}
		}
		// Si utilizamos Auth debemos dar permiso a todo el mundo a las acciones 'upload' y 'ajaxAdd'
		//$this->Auth->allowedActions = array('upload','ajaxAdd');
		parent::beforeFilter();
	}

	function add()
	{
		$this->pageTitle = __('Añadir imágenes');
	}

	function upload()
	{
		// Desactivamos el debug (necesario siempre que trabajamos con Ajax)
		Configure::write('debug', 0);
		//header('Content-type: text/x-json');
		$this->autoRender = false;
		$this->layout = 'ajax';
		if (isset($this->params['form']['Filedata'])){
// Si utilizáis Auth eliminad estos comentarios
//			$user = $this->Auth->user();
//			if (!empty($user)){
// Fin Auth
				// Creamos la primera miniatura
				$thumb = $this->Upload->upload(
					$this->params['form']['Filedata'],'img/upload/thumb/', null,
					array(
						'type' => 'resizecrop',
						'size' => array(400,250),
						'output' => 'jpg',
						'quality'=>80),
					array('jpg','jpeg','png','gif'));
				// Si no se crea correctamente gestionamos los errores
				if (!empty($this->Upload->errors)){
					// Error que mostraremos al usuario
					$message = __('Error subiendo el fichero',true);
					// Guardamos el nombre original del fichero
					$data = $this->params['form']['Filedata']['name'];
					$this->set('errors', compact('message','data'));
					// Creamos un log con el auténtico error
					$this->log('Error creando la miniatura: ' .
						implode(' | ',$this->Upload->errors),'upload/images');
				} else {
					// Si se ha guardado correctamente guardamos el 'fichero temporal' en la BD
					$file = $this->Upload->result;
					$location = realpath(WWW_ROOT . 'img/upload/thumb/' . $file);
					$tempfile['location'] = $location;
					$this->Tempfile->save($tempfile,false);
					// Generamos una miniatura temporal (la que mostraremos al usuario al guardar las imágenes)
					$tempThumb = $this->Upload->upload(
						$this->params['form']['Filedata'],'img/upload/tmp/', null,
						array(
							'type' => 'resizecrop',
							'size' => array(100,150),
							'output' => 'jpg',
							'quality'=>80),
						array('jpg','jpeg','png','gif'));
					if(!empty($this->Upload->errors)){
						// Si tiene errores lo guardamos en un log. A mi parecer, aquí no nos interesa mostrar error al usuario (ya que en realidad es una imagen temporal que más adelante borraremos)
						$this->log('Error creando la miniatura temporal: ' .
							implode(' | ',$this->Upload->errors),'upload/images');
					} else {
						// Si no hay errores guardamos el 'fichero temporal'
						$location = realpath(WWW_ROOT . 'img/upload/tmp/' . $this->Upload->result);
						$tempfile['location'] = $location;
						// Es importante hacer el 'create' a partir de la segunda vez
						$this->Tempfile->create($tempfile);
						$this->Tempfile->save();
					}
					// Si se ha creado la primera miniatura subimos la original a la carpeta deseada
					$result = $this->Upload->upload($this->params['form']['Filedata'], 'img/upload/full/', $this->Upload->result);
					if (!empty($this->Upload->errors)){
						// Si no se guarda generamos log
						$this->log('Error subiendo la imagen: ' .
							implode(' | ',$this->Upload->errors),'upload/images');
						// Y mostramos mensaje de error al usuario
						$message = __('Error subiendo el fichero',true);
						$data = $this->params['form']['Filedata']['name'];
						$this->set('errors', compact('message','data'));
					}else{
						// Guardamos 'fichero temporal'
						$data = $this->Upload->result;
						$location = realpath(WWW_ROOT . 'img/upload/full/' . $data);
						$tempfile['location'] = $location;
						$this->Tempfile->create($tempfile);
						$this->Tempfile->save();
						// Mostramos mensaje de éxito al usuario
						$message = sprintf(__('%s subido correctamente.',true),'<b>' . $this->params['form']['Filedata']['name'] . '</b>');
						$this->set('success',compact('data','message'));
					}
				}
// Si utilizáis Auth eliminad estos comentarios
//			}else{
//    			$message = '<b>' . __('Error',true) . ':</b> ' . __('Tu sesión ha expirado. Vuelve a iniciarla por favor',true);
//				$this->set('sessionTimeOut',compact('message'));
//			}
// Fin Auth
			// Renderizamos la vista (/views/ajax/upload.ctp)
			$this->render('/ajax/upload');
		}
	}
}
~~~

A parte de los comentarios y el código (que hablan por sí solos.. ;) ) quiero comentar un par de cosillas...

La cabecera que está comentada (Content-Type: text/x-json) la puse en su momento porque en Internet Explorer 8 y Opera 10 me daba algunos problemas si no ponía esta cabecera. Ahora sin ella me funciona correctamente (realmente había más cosas que interferían en su funcionamiento con IE y Opera), así que la he comentado por si la tuvierais que utilizar en algún momento.

Respecto a los comentarios sobre el componente de autenticación (Auth)... en caso de que en vuestra web queráis restringir las subidas a usuarios registrados deberéis descomentar las líneas comentadas para que, en caso de que al usuario le expire la sesión mientras está subiendo imágenes, se le muestre un mensaje de error (sin esto, en caso de expirar la sesión, no se mostraría **nada** al usuario).
<blockquote>
**Nota:** Esta no es la vía correcta para mostrar un error conforme la sesión del usuario ha expirado. Podéis ver la explicación que hago al respecto <a href="http://www.racotecnic.com/2009/12/cakephp-auth-component-ajaxlogin/">aquí</a>.</blockquote>

En cuanto al render de la vista... ahora pasaremos a la creación de la vista upload.ctp y veréis que el fichero es muy genérico. Quiero decir que con este mismo fichero podéis gestionar cualquier subida de ficheros que hagáis con Ajax, así que, tener que generar una vista idéntica para cada sección en que tengáis subida de ficheros, es algo absurdo.

Digo esto porque lo que hago yo es meter todos los ficheros relacionados con ajax en la carpeta <em>/app/views/ajax/</em> y así los utilizo desde cualquier controlador (de ahí el "$this->render('/ajax/upload')".

Vamos a por el fichero upload.ctp:

~~~php
// /app/views/ajax/upload.ctp
<?php
$output = array();
if(isset($errors)) {
	$output = Set::insert($output, 'errors',
		array(
			'message' => $errors['message'],
			'data' => $errors['data']
		));
} elseif (isset($success)) {
	$output = Set::insert($output, 'success',
		array(
			'message' => $success['message'],
			'data' => $success['data']
		));
}
// Sólo para Auth
//elseif (isset($sessionTimeOut)){
//	$output = Set::insert($output, 'sessionTimeOut', array('message' => $sessionTimeOut['message']));
//}
// Fin Auth
echo $javascript->object($output);
~~~

Este fichero es el encargado de convertir el array que le enviemos desde el controlador con la información (ya sea un error o un mensaje de éxito) a JSON. La salida que generará será algo así:

~~~javascript
 // En caso de éxito
{
	'success':
	{
		'message':'<b>nombre_de_fichero.jpg<\/b> subido correctamente.',
		'data':'nombre_de_fichero.jpg'
	}
}
// En caso de error
{
	'errors':
	{
		'message':'Error subiendo el fichero',
		'data':'nombre_de_fichero.jpg'
	}
}
~~~

El campo "data" no lo utilizaremos en este caso, pero está ahí para que veáis que se pueden enviar tantos datos de respuesta como queráis.

Bien, con esto hemos terminado lo que sería la carga de ficheros. Nuestro método <em>upload</em> nos gestiona el fichero subido guardándolo en el servidor y devolviéndonos un mensaje como respuesta (tanto si la subida ha dado error como si no). Además nuestra función JavaScript se encarga de generarnos un formulario dinámicamente a medida que va recibiendo los nombres de imagen.

Ahora nos faltaría hacer la validación con Ajax de nuestro formulario.

Empezaremos por acabar de completar el fichero JavaScript. Al fichero images.js añadidle las siguientes funciones:

~~~javascript
// Continuación del fichero /app/webroot/js/page_specific/images.js
// Convierte una_frase a unaFrase
function camelize(string) {
	var a = string.split('_'), i;
	s = [];
	for (i=0; i<a.length; i++){
		s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));
	}
	s = s.join('');
	return s;
}

// Decide qué función ejecutar según los datos recibidos (si es 'error' o 'success')
function afterValidate(data, status){
	console.log(data);
	console.log(webroot + 'images/ajaxAdd');
	$('.error-message, #flashMessage').remove();
	if (data.errors || data.saved) {
		if(data.saved){
			onSaved(data.saved);
		}
		onError(data.errors);
	} else if (data.success) {
		onSuccess(data.success);
	}
// Auth
//	 else if (data.sessionTimeOut){
//		onTimeOut(data.sessionTimeOut);
//	}
// fin Auth
}

// Esta función sirve para eliminar imágenes de la pantalla
// del usuario cuando estas han sido guardadas correctamente
function onSaved(data){
	$.each(data, function(id, item){
		$('#imatge'+id).slideUp('slow',function(){
			$(this).css({'background': 'none'})
				.html('<b class='ok'>'+item.message+'</b>').slideDown('slow');
		});
	});
}

// En caso de error hacemos un bucle entre los errores y
// los mostramos cada uno en su input correspondiente
function onError(data){
	flashMessage(data.message,'error');
	$('.add-info :submit').removeAttr('disabled');
	$('#ajaxLoad').fadeOut();
	$.each(data.data, function(key){
		$.each(data.data[key], function(model, errors){
			for (fieldName in this) {
				var element = $('#' + camelize(model + '_' + fieldName) + key);
				var _insert = $(document.createElement('div')).insertAfter(element).hide()
				.addClass('error-message').text(this[fieldName]).slideDown();
			}
		});
	});
};

// En caso de guardarse todo correctamente mostramos mensaje
// y redirigimos al usuario donde queramos
function onSuccess(data){
	$('#ImageAddForm').slideUp('slow');
	flashMessage(data.message,'info');
	$('#ajaxLoad').fadeOut();
	window.setTimeout(function() {
		window.location.href = webroot + 'images/index';
	}, 1500);
};

// Envío del formulario mediante Ajax
$('#ImageAddForm').submit(function(){
	// Desactivamos el botón de submit
	$('.add-info :submit').attr('disabled','disabled');
	// Mostramos imagen de carga
	$('#ajaxLoad').fadeIn();
	// Eliminamos (si hubiera) mensajes de error
	$('#flashMessage').fadeOut();
	$('.error-message').slideUp();
	$.post(webroot + 'images/ajaxAdd',
		$(this).serializeArray(),
		afterValidate,
		'json'
	);
	return false;
});
~~~

La función **camelize** es la encargada de convertir las cadenas como_esta a cadenas comoEsta. Esto nos sirve para encontrar la id del textbox al que está vinculado el error a partir de los errores retornados en JSON.

La función **afterValidate** es la que decide qué función se ejecutará según la respuesta que recibamos (<em>success</em>, <em>error</em> o <em>sessionTimeOut</em>).

La función **onSaved** es la encargada de, en caso de que haya imágenes con errores y otras no (y al volver a enviar el usuario el formulario), eliminar del formulario las imágenes guardadas correctamente.

**onError** se encarga de mostrar un <em>flashMessage</em> mostrando el mensaje de error general y cada uno de los errores de validación.

Si todas las imágenes se guardan correctamente se ejecuta **onSuccess** que se encarga de ocultar todo el formulario haciendo un efecto <em>slideUp</em>, mostrar un <em>flashMessage</em>, ocultar la imágen de carga de Ajax y finalmente redirige al usuario a la página deseada (en el ejemplo lo redirijo a la misma página).

El último método es el encargado de enviar el formulario mediante Ajax.

De la vista ya no tenemos que tocar nada más así que pasemos al método <em>ajaxAdd</em> del controlador.

~~~php
 // /app/controllers/images_controller.php
function ajaxAdd()
{
	Configure::write('debug', 0);
	$this->autoRender = false;
	$this->layout = 'ajax';
	if ($this->RequestHandler->isAjax()){
		if (!empty($this->data)){
			// Si utilizáis Auth eliminad estos comentarios
			//$user = $this->Auth->user();
			//if (!empty($user)){
				// Inicializamos las variables que contendrán errores y demás información
				$data = $dataOk = array();
				$error = false;
				// Iniciamos un bucle con todas las imágenes que recibamos
				foreach($this->data['Image']['name'] as $key=>$name){
					// Nombre de fichero
					$imageFile = $this->data['Image']['file'][$key];
					// Datos a guardar de la imagen
					$imageData = array(
						'Image'=>array(
							'name'		=> $name,
							'tags'		=> $this->data['Image']['tags'][$key],
							'description'=>$this->data['Image']['description'][$key],
							'file'		=> $imageFile));
					// Inicializamos el modelo (importante ya que estamos haciendo un bucle)
					$this->Image->create($imageData);
					// Validamos los campos
					if ($this->Image->validates()){
						// Guardamos la imagen en la base de datos
						$image = $this->Image->save($imageData);
						if (!empty($image)){
							// Eliminamos los 'ficheros temporales'
							$location = array('tmp','full','thumb');
							foreach ($location as $dir){
								$loc = realpath(WWW_ROOT . 'img/upload/' . $dir . '/' . $imageFile);
								// Si la carpeta es 'tmp' eliminamos la imagen del servidor
								if($dir == 'tmp'){
									if (!unlink($loc)) $this->log('Error eliminando miniatura temporal ' . $imageFile);
									else $this->Tempfile->deleteAll(array('Tempfile.location'=>$loc));
								}else $this->Tempfile->deleteAll(array('Tempfile.location'=>$loc));
							}
							// Mensaje a mostrar cuando una sola imagen es guardada
							$message = sprintf(__('Imagen %s guardada correctamente',true),$imageFile);
							$dataOk[$key] = array('message'=>$message,'data'=>$imageFile);
						}
					}else {
						// Errores
						$error = true;
						$Image = $this->Image->invalidFields();
						$data[$key] = compact('Image');
					}
				}
				// Si no tenemos errores..
				if(!$error){
					$message = '<b>' . __('Todas las imágenes han sido guardadas correctamente', true) . '</b>';
					$data = $this->data;
					$this->set('success',compact('message','data'));
				} else {
					$message = '<b>' . __('Error',true) . ':</b> ' . __('Hay campos que no son válidos, compruébalos por favor.',true);
					$set = compact('message','data');
					// Si tenemos algunas imágenes guardadas y otras no guardamos la variable dataOk
					if(!empty($dataOk)) $set = array_merge($set,compact('dataOk'));
					$this->set('errors',$set);
				}
// Auth
//        		}else{
//        			$message = '<b>' . __('Error',true) . ':</b> ' . __('Tu sesión ha expirado. Vuelve a iniciarla por favor',true);
//					$data = $this->data;
//					$this->set('sessionTimeOut',compact('message','data'));
//        		}
// fin Auth
		}
		$this->render('/ajax/form_validation_array');
	}else $this->redirect('/');
}
~~~

Este es un poco más complicado que el de upload por una simple razón: tenemos un array de datos en lugar de un único dato.

Si os fijáis en el código veréis que dentro del foreach he utilizado la variable <em>$key</em> para definir la clave del elemento actual. Es importante utilizarla para que mantenga el orden de las imágenes. No nos interesa para nada que nos guarde la tercera imagen del formulario y nos diga que la que se ha guardado correctamente es la primera..

A parte de eso y como a menudo digo... el código habla por sí solo y además está bien comentado, así que si os lo miráis bien lo entenderéis sin problemas.

Por último nos falta crear la vista "form_validation_array" que, del mismo modo que en el método upload, se encargará de convertir el array resultante a JSON:

~~~php
// /app/views/ajax/form_validation_array.ctp
<?php
$output = array();
if(isset($errors)) {
	// Si hay errores
	$output = Set::insert($output, 'errors', array('message' => $errors['message']));
	foreach ($errors['data'] as $key => $item) {
		foreach($item as $model => $errs){
			foreach ($errs as $field => $message) {
				$output['errors']['data'][$key][$model][$field] = $message;
			}
		}
	}
	// En caso de haberse guardado alguna imagen
	if(!empty($errors['dataOk'])){
		foreach($errors['dataOk'] as $key => $item){
			foreach($item as $field => $message){
				$output['saved'][$key][$field] = $message;
			}
		}
	}
// Si todas se han guardado correctamente...
}elseif (isset($success)) {
	$output = Set::insert($output, 'success', array('message' => $success['message']));
}
// Sólo para Auth
//elseif (!isset($auth)){
//	$output = Set::insert($output, 'sessionTimeOut', array(
//        'message' => $sessionTimeOut['message'],
//        'data' => $sessionTimeOut['data']
//	));
//}
// fin Auth
echo $javascript->object($output);
~~~

Y su salida aproximada:

~~~javascript
// Si ha habido algún error (fijaros que una de las imágenes se ha guardado correctamente)
{'errors':{
	'message':'<b>Error:<\/b> Hay campos que no son v\u00e1lidos, compru\u00e9balos por favor.',
	'data':{
		'0':{
			'Image':{
				'name':'El nombre debe contener entre 3 y 45 caracteres'
				}
		},'2':{
			'Image':{
				'name':'El nombre debe contener entre 3 y 45 caracteres'
				}
			}
		}
	},'saved':{
		'1':{
			'message':'Imagen 1165589284_f0.jpg guardada correctamente',
			'data':'1165589284_f0.jpg'
		}
	}
}

// Si todo ha ido bien
{'success':{
	'message':'<b>Todas las im\u00e1genes han sido guardadas correctamente<\/b>'
}}

~~~

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
