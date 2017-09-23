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
excerpt: "Después de mucho tiempo liado con el fin de curso y tras mucho
  investigar con CakePHP por fin escribo algo al respecto. Para los que no lo
  sepáis, **CakePHP** es un framework de PHP que nos permite programar más rápido
  nuestras aplicaciones web PHP ya que nos ofrece las herramientas para que empecemos
  a escribir el código que realmente necesitamos: la lógica de la aplicación."
wordpress_id: 617
wordpress_url: http://racotecnic.com/?p=617
redirect_from:
- "?p=617"
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
  <em>Entrada actualizada a 18 de junio de 2009. Los cambios son desde <a href="#ampliacio">aquí</a></em>
  <b>Existe una entrada más reciente relacionada con este tema: <a href="/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp/" target="_top">Subida de ficheros con Uploadify y validación Ajax en CakePHP</a></b>
</blockquote>

Después de mucho tiempo liado con el fin de curso y tras mucho investigar con CakePHP por fin escribo algo al respecto. Para los que no lo sepáis, **CakePHP** es un <a title="Definición de framework" href="http://es.wikipedia.org/wiki/Framework" target="_blank"><em>framework</em></a> de PHP que nos permite programar más rápido nuestras aplicaciones web PHP ya que nos ofrece las herramientas para que empecemos a escribir el código que realmente necesitamos: la lógica de la aplicación.

Si no conocíais CakePHP y os ha interesado el tema echad un ojo a <a title="Visitar web de CakePHP" href="http://www.cakephp.org" target="_blank">su página web</a>, <a title="Descargas de CakePHP" href="http://cakephp.org/downloads" target="_blank">descargaos una copia</a> y empezad a hacer pruebas. En su web podréis encontrar la <a title="Comenzando con CakePHP" href="http://book.cakephp.org/es/view/4/Comenzando-con-CakePHP" target="_blank">mayor parte de la documentación</a> y todo lo demás, como no, en <a title="Realmente hacía falta enlazarlo?" href="http://www.google.es" target="_blank">google</a>.

En este artículo explicaré cómo integrar <a title="Página web oficial de uploadify" href="http://www.uploadify.com/" target="_blank">uploadify</a>, un sistema de carga de ficheros con Flash y JavaScript (utilizando el <em>framework</em> <a title="Página web oficial de jQuery" href="http://jquery.com/" target="_blank">jQuery</a>) a CakePHP para permitirnos cargar múltiples ficheros sin tener que refrescar la página, así como poder cargar ficheros de gran tamaño.

<a id="more"></a><a id="more-617"></a>
Antes de empezar, sobreentiendo que tenéis conocimientos sobre CakePHP, así como que habéis utilizado algún sistema de carga de ficheros con flash, tipo <a title="Página web oficial de uploadify" href="http://www.uploadify.com/" target="_blank">uploadify</a> o <a title="Página web oficial de swfUpload" href="http://swfupload.org/" target="_blank">swfupload</a> alguna vez en vuestra vida (aunque no haya sido con Cake). Tampoco estaría de más tener conocimientos de jQuery, para poder gestionar las subidas de ficheros de forma asíncrona. También asumo que ya tenéis CakePHP funcionando en algun servidor.

Dicho esto, empecemos...

Descargamos la última versión de <a title="jQuery downloads" href="http://code.google.com/p/jqueryjs/downloads/list" target="_blank">jQuery</a> (en mi caso la <a title="jQuery 1.3.2 minified" href="http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js" target="_blank">v. 1.3.2</a>) y copiamos o movemos el fichero JavaScript a nuestro directorio de ficheros JavaScript, situado en la carpeta <em>webroot</em> (en <em>/app/webroot/js</em>).

Descargamos la última versión de <a title="Descargar uploadify" href="http://www.uploadify.com/download/" target="_blank">uploadify</a> (en mi caso la <a title="uploadify v 1.6.2. GPL" href="http://www.uploadify.com/_files/jquery.uploadify-v1.6.2.zip" target="_self">v. 1.6.2 GPL</a>). Al descargar uploadify nos daremos cuenta que el paso anterior ha sido inútil dado que en la carpeta de uploadify ya viene jQuery :p estos fallos los tiene cualquiera... u.u

De la carpeta de uploadify nos interesan los siguientes ficheros:

- cancel.png
- jquery.uploadify.js
- uploader.swf
- uploadify.css

el resto eliminadlos (para lo que haremos no son necesarios, no obstante recomiendo que echéis un vistazo a todo ello). Renombrad la carpeta a "uploadify" y movedla dentro del directorio de JavaScripts de <em>webroot</em> (<em>app/webroot/js</em>). Opcionalmente podéis copiar el código del fichero <em>uploadify.css</em> a vuestro fichero css si lo preferís, de este modo podríais descartar también el fichero <em>uploadify.css</em> que apenas contiene 20 líneas.

Ahora que ya tenemos todos los JavaScripts necesarios, pasemos a la parte de los controladores y las vistas.

Para gestionar la subida de ficheros necesitaréis un <em>Component</em> (o bien programar toda la gestión de ficheros "a pelo" en vuestros controladores). Yo he utilizado <em>"<a title="Image Upload Component para CakePHP" href="http://labs.iamkoa.net/2007/10/23/image-upload-component-cakephp/" target="_blank">Image Upload Component</a>"</em>, que además de gestionarme la carga de cualquier tipo de fichero me permite recortar imágenes, generar miniaturas y otras acciones relacionadas con imágenes. <a title="Descargar upload component" href="http://iamkoa.net/mint/pepper/orderedlist/downloads/download.php?file=http%3A//labs.iamkoa.net/wp-content/uploads/2007/11/uploads-component-11062007.zip" target="_blank">Una vez descargado</a> el <em>Upload Component</em> nos quedamos con el fichero <strong><em>upload.php</em></strong> que hay dentro del directorio <em>/app/controllers/components</em> y lo copiamos en este mismo directorio, pero de nuestro proyecto.

Aquí viene el código del controlador, en mi caso "images_controller":

~~~php
<?php
class ImagesController extends AppController
{
  var $name = 'Images';
  var $components = array('Upload');
  var $helpers = array('Uploadify');

  function beforeFilter()
  {
    // Si la acción es subir ficheros
    if ($this->action == 'upload') {
      if (isset($this->params['pass'][0])){
        // Iniciamos la sesión con el id de sesión pasado como parámetro
        $this->Session->id($this->params['pass'][0]);
        $this->Session->start();
      } else {
        $this->redirect('/');
      }
    }
    // Cargamos el beforeFilter superior (en AppController o Controller)
    parent::beforeFilter();
  }

  function upload()
  {
    // Desactivamos el rendering de la vista para este método
    $this->autoRender = false;
    if (isset($this->params['form']['Filedata'])) {
      // Creamos una miniatura
      $thumb = $this->Upload->upload($this->params['form']['Filedata'],'img/thumb/', null, array('type' => 'resizecrop', 'size' => array('150', '150'), 'output' => 'jpg'));
      // Si no se crea correctamente
      if ($thumb) {
        // Generamos un log con los errores
        $this->log('L\'usuari ' . $this->Auth->user('username') .
          ' ha tingut errors intentant crear una miniatura: ' .
          implode(' | ', $this->Upload->errors),'upload');
      } else {
        // Si la miniatura se ha creado subimos el fichero a tamaño original
        $result = $this->Upload->upload($this->params['form']['Filedata'],'img/',$this->Upload->result);
        if (!$result) {
          // Si la imagen se sube correctamente enviamos el nombre de ésta al usuario
          echo $this->Upload->result;
          exit;
        } else {
          // En caso contrario generamos un log de error
          $this->log('L\'usuari ' . $this->Auth->user('username') .
            ' ha tingut errors intentant pujar una imatge: ' .
            implode(' | ', $this->Upload->errors),'upload');
          echo __('Error pujant el fitxer');
          exit;
        }
      }
    }
  }

  function add()
  {
    // Guardamos los datos en la base de datos
    if (!empty($this->data)) {
      $this->Image->save($this->data);
    }
  }
}
~~~

Si no entendéis algo podéis referiros a la <a href="http://api.cakephp.org" target="_blank" title="Ir a la API">api</a> y al <a href="http://book.cakephp.org" target="_blank" title="Ir al libro de recetas de Cake">libro de recetas</a> de Cake o, en caso de ser con la generación de imágenes a la ayuda del <a title="Image Upload Component para CakePHP" href="http://labs.iamkoa.net/2007/10/23/image-upload-component-cakephp/" target="_blank">Image Upload Component</a>.

Como podéis ver he instanciado un <em>helper</em> que se llama "Uploadify". Lo he creado yo para insertar el código JavaScript de uploadify en las vistas y si lo queréis lo podéis descargar desde <a href='{{ site.url }}/uploads/2009/06/uploadify_helper.zip'>aquí</a>. Cuando llegue el momento de explicar las vistas pondré los ejemplos utilizando el código convencional y el código del <em>helper</em>.

Siguiendo con el controlador "images_controller", el <em>beforeFilter</em> se encarga de iniciar la sesión en caso de que ésta no exista, a partir de un ID que le pasaremos desde la vista como primer parámetro. Sin estas líneas en que se inicia la sesión de nuevo seguramente tendríais problemas al enviar el fichero; éste se enviaría pero al llegar al 100% os daría un IO error (en mac y linux) o bien os incrustará la ventana de login por ahí en medio (en windows). Una vez iniciada la sesión se llama al <em>beforeFilter</em> superior para realizar las tareas pertinentes.

Las tareas del método upload están descritas en los comentarios y no creo que haga falta entrar en más detalles. Para más detalles, como he dicho antes, dirigíos a la ayuda de Cake o del Image Upload Component.

En el método add() hacemos las tareas necesarias para guardar los datos.
<blockquote>
<em>**Nota:** El envío de ficheros debéis hacerlo al mismo controlador. Si intentáis hacer un envío de ficheros desde el controlador "images" al controlador "files" (por ejemplo), NO FUNCIONARÁ. No sé porqué, así que si alguien encuentra el modo de hacerlo o sabe porqué pasa agradecería que me lo comentara por aquí.</em></blockquote>

Ya tenemos el controlador con su componente, ahora nos quedan únicamente la vista, pero antes explicaré cómo funciona el helper que he creado para aquellos que quieran utilizarlo...

Primero decir que es la primera "versión" (si es que se le puede llamar así), así que veréis que hay algún fallo o cosa sin terminar. Con el tiempo quizás lo mejore, aunque por el momento me funciona perfectamente tal como está.

Una vez iniciado el <em>helper</em> en el controlador únicamente tenéis que llamar a la función "<em>startUploader</em>" de dicho <em>helper</em>. Como primer parámetro debéis pasar un array asociativo con el id de la capa del uploader como clave y el directorio destino como valor de la clave. Lamentablemente el directorio de destino no está implementado en este ejemplo, pero utilizando un poco la cabeza seguro que podréis descubrir cómo utilizarlo ;).

Como segundo parámetro se le pasa un array, también asociativo, con las opciones de uploadify (que podéis mirar desde <a href="http://www.uploadify.com/documentation/" target="_blank" title="Ver documentación de uploadify">aquí</a>). El tercer parámetro es por si ponéis varios uploadify en una misma página, para no volver a cargar los ficheros JavaScript y css; pasadle como parámetro "false" a partir del segundo uploader que añadáis.

Aquí tenéis el código que he utilizado para la vista:

~~~php
<h2><?php __('Pujar imatges') ?></h2>
<?= $form->create('Image', array('action' => 'add')) ?>
<div id='imageFile'><?php __('Necessites JavaScript i Flash per poder pujar fitxers') ?></div>
<div id='uploaded' style='display:none'>
  <div id='files'>
  </div>
  <?= $form->submit(__('Guardar',true)); ?>
</div>
<?= $html->link(__('Enviar',true),'javascript:$(\'#imageFile\').fileUploadStart()'); ?>
<?= $form->end() ?>
~~~

Como veis he creado un formulario que envía a la acción <em>add</em> del controlador. Dentro de este he creado una primera capa donde se cargará uploadify (con la id "imageFile") seguida de una capa donde irán apareciendo las imágenes (en la capa "files" para ser más exactos) que se vayan subiendo. Esta capa está oculta (style="display:none") ya que no nos interesa que el usuario la vea hasta que hayamos recibido el primer fichero.

Ahora que ya tenemos el formulario insertemos el JavaScript para que todo funcione (en la misma vista). Primero os pongo la metodología para el Helper y después el equivalente en HTML / JavaScript:

~~~php
<?=
$uploadify->startUploader(
  array('imageFile' => 'img/'),
  array('imageFile' => array(
    'buttonText' => __('Cercar fitxers',true),
    'script' => 'upload/' . $session->id(),
    'fileExt' => '*.jpg;*.jpeg;*.png;*.gif',
    'fileDesc' => 'Fitxers d\\\'imatge',
    'multi' => 'true',
    'onError' => 'function (a, b, c, d) {
      if (d.status == 404) {
        alert(\'Could not find upload script. Use a path relative to: ' . getcwd() . '\');
      } else if (d.type === "HTTP") {
        alert(\'error \' + d.type + \': \' + d.status);
      } else if (d.type === "File Size") {
        alert(c.name + \' \' + d.type + \' Limit: \' + Math.round(d.sizeLimit / 1024) + \'KB\');
      } else {
        alert(\'error \' + d.type + \': \' + d.text);
      }
    }',
    'onComplete' => 'function(evt, queueID, fileObj, response, data) {
      $("#uploaded").show();
      $("#uploaded #files").append(\'' . $html->image("thumb/'+response+'") . '<input type="text" value="\'+response+\'" /><input type="hidden" value="\'+response+\'" />\');
    }',
    'onAllComplete' => 'function(){
      $("input[type=\\\'submit\\\']").removeAttr("disabled");
    }'
  ))
); ?>
~~~

Equivalente en JavaScript:

~~~javascript
$(document).ready(function() {
  $('#imageFile').fileUpload ({
    'uploader' : '/js/uploadify/uploader.swf',
    'script' : 'upload/<?= $session->id() ?>',
    'buttonText' : 'Cercar fitxers',
    'onError' : function (a, b, c, d) {
      if (d.status == 404) {
        alert('Could not find upload script. Use a path relative to: <?= getcwd() ?>');
      } else if (d.type === 'HTTP') {
        alert('error ' + d.type + ': ' + d.status);
      } else if (d.type === 'File Size') {
        alert(c.name + ' ' + d.type + ' Limit: ' + Math.round(d.sizeLimit / 1024) + 'KB');
      } else {
        alert('error ' + d.type + ': ' + d.text);
      }
    },
    'onComplete' : function(evt, queueID, fileObj, response, data) {
      $('#uploaded').show();
      $('#uploaded #files').append('<img src="/img/thumb/' + response + '" alt="" /><input type="text" value="' + response + '" /><input type="hidden" value="' + response + '" />');
    },
    'onAllComplete' : function(){
      $("input[type='submit']").removeAttr('disabled');
    },
    'cancelImg' : '/js/uploadify/cancel.png',
    'fileExt' : '*.jpg;*.jpeg;*.png;*.gif',
    'fileDesc' : 'Fitxers d\'imatge',
    'multi' : 'true',
    'folder': 'img/'
  });
});

~~~

Sobre todo fijaros en que le paso como segundo parámetro a la url "upload" la id de la sesión actual. Esto junto con el beforeFilter del controlador puede ser vital para que os funcione correctamente uploadify con Cake.

He declarado tres funciones a ejecutar con uploadify: <em>onError</em>, <em>onComplete</em> y <em>onAllComplete</em>. La primera es por si sucede algún error con la carga del fichero, es simplemente para depuración pero nunca está de más tenerlo. Una vez os funcione correctamente la subida de ficheros podéis eliminarlo sin miedo alguno.

La función <em>onComplete</em> se encarga de hacer visible la capa "uploaded" y de ir insertando en ella las miniaturas de las imágenes que se vayan subiendo (ubicadas en la carpeta /webroot/img/thumb/). A demás de insertar las imágenes genera un textbox con el nombre del fichero, para que el usuario pueda poner el nombre deseado y un campo oculto con el nombre del fichero (para poder guardar su ruta en la base de datos).

Finalmente la función <em>onAllComplete</em> se encarga de eliminar el atributo "disabled" del botón de envío del formulario.
<a name="ampliacio"></a>
Aquí tenéis la vista al completo con el helper:

~~~php
<?= $uploadify->startUploader(
  array('imageFile' => 'img/'),
  array('imageFile' => array(
    'buttonText' => __('Cercar fitxers',true),
    'script' => 'upload/' . $session->id(),
    'fileExt' => '*.jpg;*.jpeg;*.png;*.gif',
    'fileDesc' => 'Fitxers d\\\'imatge',
    'multi' => 'true',
    'onError' => 'function (a, b, c, d) {
      if (d.status == 404) {
        alert(\'Could not find upload script. Use a path relative to: ' . getcwd() . '\');
      } else if (d.type === "HTTP") {
        alert(\'error \' + d.type + \': \' + d.status);
      } else if (d.type === "File Size") {
        alert(c.name + \' \' + d.type + \' Limit: \' + Math.round(d.sizeLimit / 1024) + \'KB\');
      } else alert(\'error \' + d.type + \': \' + d.text);
    }',
    'onComplete' => 'function(evt, queueID, fileObj, response, data){
      $("#uploaded").show();
      $("#uploaded #files").append(\'' . $html->image("thumb/' + response + '") . '<input type="text" value="\' + response + \'" /><input type="hidden" value="\' + response + \'" />\');
    }',
    'onAllComplete' => 'function(){
      $("input[type=\\\'submit\\\']").removeAttr("disabled");
    }'
  ))
); ?>
<h2><?php __('Pujar imatges') ?></h2>
<?= $form->create('Image',array('action' => 'add')) ?>
<div id="imageFile"><?php __("Necessites JavaScript i Flash per poder pujar fitxers") ?></div>
<div id="uploaded" style="display:none">
  <div id="files">
  </div>
  <?= $form->submit(__("Guardar",true)); ?>
</div>
<?= $html->link(__("Enviar",true),'javascript:$("#imageFile").fileUploadStart()'); ?>
<?= $form->end() ?>
~~~

Y con Javascript:

~~~javascript
<script type='text/javascript'>
$(document).ready(function() {
  $('#imageFile').fileUpload ({
    'uploader' : '/js/uploadify/uploader.swf',
    'script' : 'upload/<?= $session->id() ?>',
    'buttonText' : 'Cercar fitxers',
    'onError' : function (a, b, c, d) {
         if (d.status == 404)
            alert('Could not find upload script. Use a path relative to: <?= getcwd() ?>');
         else if (d.type === 'HTTP')
            alert('error ' + d.type + ': ' + d.status);
         else if (d.type ==='File Size')
            alert(c.name + ' ' + d.type + ' Limit: ' + Math.round(d.sizeLimit / 1024) + 'KB');
         else alert('error ' + d.type + ': ' + d.text);},
    'onComplete' : function(evt, queueID, fileObj, response, data) {
      $('#uploaded').show();
      $('#uploaded #files').append('<img src="/img/thumb/' + response + '" alt="" /><input type="text" value="' + response + '" /><input type="hidden" value="' + response + '" />');
    },
    'onAllComplete' : function() {
      $('input[type=\'submit\']').removeAttr('disabled');
    },
    'cancelImg' : '/js/uploadify/cancel.png',
    'fileExt' : '*.jpg;*.jpeg;*.png;*.gif',
    'fileDesc' : 'Fitxers d\'imatge',
    'multi' : 'true',
    'folder': 'img/'
  });
});
</script>
<h2><?php __('Pujar imatges') ?></h2>
<?= $form->create('Image', array('action' => 'add')) ?>
<div id='imageFile'><?php __('Necessites JavaScript i Flash per poder pujar fitxers') ?></div>
<div id='uploaded' style='display:none'>
  <div id='files'>

  </div>
  <?= $form->submit(__('Guardar', true)); ?>
</div>
<?= $html->link(__('Enviar', true),'javascript:$('#imageFile').fileUploadStart()'); ?>
<?=$form->end() ?>
~~~

Vale, recordemos un poco todo lo que hemos hecho para ver que no nos hemos dejado nada:

- Hemos descargado jQuery y Uploadify
- Hemos guardado los ficheros que nos interesaban de ambas librerías en nuestro proyecto
- Hemos creado el controlador (/app/controllers/images_controller.php)"
- Hemos creado la vista (/app/view/images/add.ctp)
- Algo que no he dicho (pero que es bastante lógico..) es haber creado una carpeta donde se guardarán los ficheros, con permisos de escritura (755, 777... en sistemas UNIX/Linux)
- Tampoco he dicho que hay que crear un modelo (/app/models/image.php), pero si tenéis conocimientos de Cake seguro que ya lo sabíais ;)

Para terminar os explicaré cómo funcionará el proceso de envío. Aquí tendría que hacer un diagrama de estados o algo así pero la verdad es que no apetece nada... :p

- El usuario accederá a la página "images/add" y se le mostrará un botón con el que subir imágenes.
- Una vez seleccionado(s) el/los fichero(s) a subir, el usuario le da a "enviar" y se inicia la transferencia del éste.
- Una vez ha terminado el fichero y ha llegado correctamente al servidor, este/estos se procesan y en caso de éxito se devuelve el/los nombre(s) de fichero(s) resultante(s) al usuario. A partir de este/estos nombre(s) de fichero(s) nos encargaremos de que vea una(s) miniatura(s) de la(s) imagen(es) subida(s) (qué pesadito con el plural, eh?).
- A demás de las miniaturas le mostraremos un textbox al lado de cada una para que pueda poner el nombre si quiere.
- Cuando haya editado todos los nombres le dará al botón "guardar" que aparecerá a partir del primer fichero subido pero que no estará activo hasta que todos los ficheros hayan subido al servidor.
- Aquí hay una cosa que yo no hago en el ejemplo porque no me quiero complicar pero que creo conveniente que hagáis si no queréis llenar vuestro servidor de ficheros sin uso. Sería necesario guardar las rutas de ficheros una vez subidos por si el usuario no le diera a "guardar". De éste modo podríais hacer un método con el que eliminar ficheros inutilizados fácilmente.

Pues ahí lo tenéis. Creo que me ha salido una guía algo pobre :( es lo que tiene hacerla con algo de prisa... Cuando tenga algo más de tiempo intentaré colgar un ejemplo sobre esto.

<blockquote style="text-align:center">
  <em><b>Si has terminado este tutorial satisfactoriamente mírate este otro: <a href="/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp">Subida de ficheros con Uploadify y validación Ajax en CakePHP</a></b></em>
</blockquote>

Espero que no tengáis muchas dudas. De todos modos sabéis que estoy abierto a preguntas a través de los comentarios si os surge cualquier duda!

<blockquote>
  Páginas de referencia:
  <ul>
    <li><a title="Documentación de uploadify" href="http://www.uploadify.com/documentation/" target="_blank">Uploadify documentation</a></li>
    <li><a title="Ver documentación de jQuery" href="http://docs.jquery.com/Main_Page" target="_blank">jQuery</a></li>
    <li><a title="Página del proyecto CakePHP" href="http://www.cakephp.org" target="_blank">CakePHP</a> | <a title="Documentación de CakePHP" href="http://book.cakephp.org/">Book</a> | <a title="API de CakePHP" href="http://api.cakephp.org/" target="_blank">API</a></li>
    <li><a title="Página del proyecto SWFUpload" href="http://swfupload.org" target="_blank">SWFUpload</a> | <a title="Documentación de SWFupload" href="http://swfupload.org/documentation" target="_blank">API</a> | <a title="Foros de swfupload" href="http://swfupload.org/forum" target="_blank">Foros</a></li>
    <li><a title="Buscar en Google" href="http://www.google.cat" target="_blank">Google</a> (cómo no..)</li>
  </ul>
</blockquote>
