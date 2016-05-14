---
layout: post
status: publish
published: true
title: CakePHP Debug Kit
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Hace ya mucho que existe seguramente, pero con lo escondido que lo tenían
  los de Cake no lo encontré hasta la semana pasada.\r\n\r\nCakePHP Debug Kit es un
  plugin desarrollado por los creadores de CakePHP que nos facilita una barra de herramientas
  con todo lo necesario para debugar nuestra aplicación sin herramientas adicionales
  (vamos, que con el notepad y el debugkit tiramos millas :D).\r\n\r\nPara descargarlo
  podéis hacerlo desde GitHub: <a href=\"https://github.com/cakephp/debug_kit/archives/master\">https://github.com/cakephp/debug_kit/archives/master</a>\r\n\r\nUna
  vez descargado cambiadle el nombre a la carpeta por 'debug_kit' y ponedla en cualquiera
  de los directorios \"plugins\" de vuestra aplicación (/plugins y /app/plugins).
  Una vez copiado simplemente tenéis que cargar el componente Toolbar:\r\n\r\n[php
  light=\"true\"]var $components = array('DebugKit.Toolbar');[/php]\r\n\r\n... y aseguraros
  que vuestro nivel de debug es 2 (Configure::write('debug', 2);).\r\n\r\nEdit: si
  estáis utilizando el elemento sql_dump eliminadlo de vuestro template. De lo contrario
  no se mostrarán las consultas en el DebugKit.\r\n<p style=\"text-align: center;\"><a
  href=\"http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit1.png\"><img
  class=\"alignnone size-full wp-image-1667\" title=\"debug_kit1\" src=\"http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit1.png\"
  alt=\"\" width=\"557\" height=\"147\" /></a></p>\r\n<a href=\"http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit1.png\"></a>"
wordpress_id: 1661
wordpress_url: http://www.racotecnic.com/?p=1661
date: '2010-11-21 12:50:53 +0100'
date_gmt: '2010-11-21 11:50:53 +0100'
categories:
- Programació
tags:
- CakePHP
- CakePHP 1.3
- CakePHP 1.2
- Debug
- DebugKit
---
<p>Hace ya mucho que existe seguramente, pero con lo escondido que lo tenían los de Cake no lo encontré hasta la semana pasada.</p>
<p>CakePHP Debug Kit es un plugin desarrollado por los creadores de CakePHP que nos facilita una barra de herramientas con todo lo necesario para debugar nuestra aplicación sin herramientas adicionales (vamos, que con el notepad y el debugkit tiramos millas :D).</p>
<p>Para descargarlo podéis hacerlo desde GitHub: <a href="https://github.com/cakephp/debug_kit/archives/master">https://github.com/cakephp/debug_kit/archives/master</a></p>
<p>Una vez descargado cambiadle el nombre a la carpeta por 'debug_kit' y ponedla en cualquiera de los directorios "plugins" de vuestra aplicación (/plugins y /app/plugins). Una vez copiado simplemente tenéis que cargar el componente Toolbar:</p>
<p>[php light="true"]var $components = array('DebugKit.Toolbar');[/php]</p>
<p>... y aseguraros que vuestro nivel de debug es 2 (Configure::write('debug', 2);).</p>
<p>Edit: si estáis utilizando el elemento sql_dump eliminadlo de vuestro template. De lo contrario no se mostrarán las consultas en el DebugKit.</p>
<p style="text-align: center;"><a href="http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit1.png"><img class="alignnone size-full wp-image-1667" title="debug_kit1" src="http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit1.png" alt="" width="557" height="147" /></a></p>
<p><a href="http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit1.png"></a><a id="more"></a><a id="more-1661"></a>Y a partir de este momento en vuestra página web aparecerá un botón con el icono de CakePHP en la parte superior derecha. Al hacer clic nos mostrará un menú con una serie de opciones:</p>
<ul>
<li>History: todavía no tengo muy claro para qué sirve.. xD</li>
<li>Session: nos muestra todos los datos guardados de la sesión actual.</li>
<li>Request: parámetros de cake, peticiones GET, POST y Cookies, además de información sobre la ruta actual (routes).</li>
<li>SqlLog</li>
<li>Timer: temporización del tiempo de ejecución de la aplicación. También muestra la memoria utilizada para la carga.</li>
<li>Log: todo aquello que guardemos con $this-&gt;log</li>
<li>Variables: otras variables de Cake ($this-&gt;data, $this-&gt;validationErrors, etc..)</li>
</ul>
<p style="text-align: center;"><a href="http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit2.png"><img class="alignnone size-thumbnail wp-image-1666" title="debug_kit2" src="http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit2-150x150.png" alt="" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit3.png"><img class="alignnone size-thumbnail wp-image-1665" title="debug_kit3" src="http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit3-150x150.png" alt="" width="150" height="150" /></a><a href="http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit4.png"><img class="alignnone size-thumbnail wp-image-1670" title="debug_kit4" src="http://www.racotecnic.com/wp-content/uploads/2010/11/debug_kit4-150x150.png" alt="" width="150" height="150" /></a></p>
<p>Por lo que puedo leer en otras páginas el uso de esta barra de herramientas incrementa considerablemente el uso de la memoria RAM del servidor. Si tenéis problemas con ello tendréis que aumentar el memory_limit hasta al menos 128MB+.</p>
<p>Tampoco tiene soporte para IE6, aunque esto no creo que sea un gran problema a estas alturas :)</p>
