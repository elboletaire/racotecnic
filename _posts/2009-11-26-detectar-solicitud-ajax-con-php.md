---
layout: post
status: publish
published: true
title: Detectar solicitud AJAX con PHP
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 1202
wordpress_url: http://racotecnic.underave.net/?p=1202
date: '2009-11-26 20:46:22 +0100'
date_gmt: '2009-11-26 19:46:22 +0100'
categories:
- Programació
- Web
tags:
- PHP
- Ajax
- Snippet
---

Si queréis <strong>detectar las solicitudes AJAX mediante PHP</strong> podéis hacerlo mediante la variable <em>HTTP_X_REQUESTED_WITH</em>:

[php]/* Verificamos si hay ajax  */<br />
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &amp;&amp; strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {<br />
	/* Contenido ajax */<br />
}else{<br />
	/* Contenido normal */<br />
}[/php]

Id con cuidado porque algunos servidores no proporcionan la variable <em>HTTP_X_REQUESTED_WITH</em>, así que haced alguna prueba antes de ir con toda la confianza a usarlo directamente en vuestra aplicación ;)
