---
status: publish
published: true
title: Detectar solicitud AJAX con PHP
wordpress_id: 1202
redirect_from:
- "?p=1202/"
date: '2009-11-26 20:46:22 +0100'
categories:
- Programació
- Web
tags:
- PHP
- Ajax
- Snippet
---

Si queréis **detectar las solicitudes AJAX mediante PHP** podéis hacerlo mediante la variable <em>HTTP_X_REQUESTED_WITH</em>:

~~~php
/* Verificamos si hay ajax  */
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  /* Contenido ajax */
} else {
  /* Contenido normal */
}
~~~

Id con cuidado porque algunos servidores no proporcionan la variable *HTTP_X_REQUESTED_WITH*, así que haced alguna prueba antes de ir con toda la confianza a usarlo directamente en vuestra aplicación ;)
