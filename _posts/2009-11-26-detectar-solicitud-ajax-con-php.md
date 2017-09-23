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
wordpress_url: http://racotecnic.com/?p=1202
redirect_from:
- "?p=1202"
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

Si queréis **detectar las solicitudes AJAX mediante PHP** podéis hacerlo mediante la variable <em>HTTP_X_REQUESTED_WITH</em>:

~~~php?start_inline=1
/* Verificamos si hay ajax  */
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  /* Contenido ajax */
} else {
  /* Contenido normal */
}
~~~

Id con cuidado porque algunos servidores no proporcionan la variable <em>HTTP_X_REQUESTED_WITH</em>, así que haced alguna prueba antes de ir con toda la confianza a usarlo directamente en vuestra aplicación ;)
