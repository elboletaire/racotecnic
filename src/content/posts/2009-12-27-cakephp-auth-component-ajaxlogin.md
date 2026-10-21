---
status: publish
published: true
title: CakePHP Auth Component ajaxLogin
excerpt: "Si habéis leído mi tutorial sobre la subida de ficheros con uploadify y validación Ajax en CakePHP recordaréis que separé los métodos add y ajax_add, ya que pensé que el único modo que había de mostrar un error de sesión al usuario era separando los métodos para, a uno de ellos darle permisos de acceso y al otro no."
wordpress_id: 1269
redirect_from:
- "?p=1269/"
date: '2009-12-27 15:10:01 +0100'
categories:
- Programació
- Web
tags:
- PHP
- CakePHP
- Ajax
- Snippet
---

Si habéis leído mi tutorial sobre la [subida de ficheros con uploadify y validación Ajax en CakePHP](/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp/) recordaréis que separé los métodos *add* y *ajax_add*, ya que pensé que el único modo que había de mostrar un error de sesión al usuario era separando los métodos para, a uno de ellos darle permisos de acceso y al otro no.

De este modo podía mostrar un error de "sesión expirada" al usuario, así:

~~~php
$user = $this->Auth->user();
if (!empty($user)) {
  // Código para añadir el elemento
} else {
  $message = '<b>' . __('Error', true) . ':</b> ' . __('Tu sesión ha expirado, vuelve a iniciarla por favor', true);
  $data = $this->data;
  $this->set('sessionTimeOut', compact('message', 'data'));
}
~~~



Pues bien, acabo de descubrir que el componente *Auth* tiene una variable llamada *ajaxLogin* con la que podemos evitarnos todas estas líneas de código en cada uno de nuestros métodos tratados con ajax. Además esto nos permitirá poner ambos métodos (*add* y *ajax_add*) en un mismo método y utilizar el *RequestHandler* para distinguir los procesos a realizar de ambos.

Esta variable debéis configurarla en vuestro *beforeFilter* (probablemente del *AppController* aunque puede que prefiráis hacerlo en cada controlador por separado):

~~~php
$this->Auth->ajaxLogin = '/ajax/ajax_login';
~~~

Y después crear la vista correspondiente. La vista correspondiente al tutorial de subida de ficheros con uploadify y validación ajax sería así:

~~~php
<?php // /app/views/ajax/ajax_login.ctp
$message = __('La teva sessió ha expirat. Torna a iniciar-la siusplau',true);
$sessionTimeOut = compact('message');
echo json_encode(compact('sessionTimeOut'));
~~~

El método *json_encode* es de PHP 5.2, así que si tenéis una versión anterior de PHP tendréis que utilizar el Helper de JavaScript para mostrar el resultado en JSON.
