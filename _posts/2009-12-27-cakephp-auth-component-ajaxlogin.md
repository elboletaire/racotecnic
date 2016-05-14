---
layout: post
status: publish
published: true
title: CakePHP Auth Component ajaxLogin
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Si habéis leído mi tutorial sobre la <a href=\"http://www.racotecnic.com/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp/\">subida
  de ficheros con uploadify y validación Ajax en CakePHP</a> recordaréis que separé
  los métodos <em>add</em> y <em>ajax_add</em>, ya que pensé que el único modo que
  había de mostrar un error de sesión al usuario era separando los métodos para, a
  uno de ellos darle permisos de acceso y al otro no.\r\n\r\nDe este modo podía mostrar
  un error de \"sesión expirada\" al usuario, así:\r\n\r\n[php]$user = $this->Auth->user();\r\nif(!empty($user)){\r\n\t//
  Código para añadir el elemento\r\n}else{\r\n\t$message = '<b>' .
  __('Error',true) . ':</b> ' . __('Tu sesión ha expirado,
  vuelve a iniciarla por favor',true);\r\n\t$data = $this->data;\r\n\t$this->set('sessionTimeOut',compact('message','data'));\r\n}[/php]\r\n\r\n"
wordpress_id: 1269
wordpress_url: http://racotecnic.underave.net/?p=1269
date: '2009-12-27 15:10:01 +0100'
date_gmt: '2009-12-27 14:10:01 +0100'
categories:
- Programació
- Web
tags:
- PHP
- CakePHP
- Ajax
- Snippet
---

Si habéis leído mi tutorial sobre la <a href="http://www.racotecnic.com/2009/10/subida-de-ficheros-con-uploadify-y-validacion-ajax-en-cakephp/">subida de ficheros con uploadify y validación Ajax en CakePHP</a> recordaréis que separé los métodos <em>add</em> y <em>ajax_add</em>, ya que pensé que el único modo que había de mostrar un error de sesión al usuario era separando los métodos para, a uno de ellos darle permisos de acceso y al otro no.

De este modo podía mostrar un error de "sesión expirada" al usuario, así:

[php]$user = $this->Auth->user();
if(!empty($user)){
	// Código para añadir el elemento
}else{
	$message = '<b>' . __('Error',true) . ':</b> ' . __('Tu sesión ha expirado, vuelve a iniciarla por favor',true);
	$data = $this->data;
	$this->set('sessionTimeOut',compact('message','data'));
}[/php]

<a id="more"></a><a id="more-1269"></a>

Pues bien, acabo de descubrir que el componente <em>Auth</em> tiene una variable llamada <em>ajaxLogin</em> con la que podemos evitarnos todas estas líneas de código en cada uno de nuestros métodos tratados con ajax. Además esto nos permitirá poner ambos métodos (<em>add</em> y <em>ajax_add</em>) en un mismo método y utilizar el <em>RequestHandler</em> para distinguir los procesos a realizar de ambos.

Esta variable debéis configurarla en vuestro <em>beforeFilter</em> (probablemente del <em>AppController</em> aunque puede que prefiráis hacerlo en cada controlador por separado):

[php]$this->Auth->ajaxLogin = '/ajax/ajax_login';[/php]

Y después crear la vista correspondiente. La vista correspondiente al tutorial de subida de ficheros con uploadify y validación ajax sería así:

[php]<?php // /app/views/ajax/ajax_login.ctp
$message = __('La teva sessió ha expirat. Torna a iniciar-la siusplau',true);
$sessionTimeOut = compact('message');
echo json_encode(compact('sessionTimeOut'));[/php]

El método <em>json_encode</em> es de PHP 5.2, así que si tenéis una versión anterior de PHP tendréis que utilizar el Helper de JavaScript para mostrar el resultado en JSON.
