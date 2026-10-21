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
  los de Cake no lo encontré hasta la semana pasada. CakePHP Debug Kit es un
  plugin desarrollado por los creadores de CakePHP que nos facilita una barra de herramientas
  con todo lo necesario para debugar nuestra aplicación sin herramientas adicionales
  (vamos, que con el notepad y el debugkit tiramos millas :D)."
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

Hace ya mucho que existe seguramente, pero con lo escondido que lo tenían los de Cake no lo encontré hasta la semana pasada.

CakePHP Debug Kit es un plugin desarrollado por los creadores de CakePHP que nos facilita una barra de herramientas con todo lo necesario para debugar nuestra aplicación sin herramientas adicionales (vamos, que con el notepad y el debugkit tiramos millas :D).

Para descargarlo podéis hacerlo desde GitHub: <a href="https://github.com/cakephp/debug_kit/archives/master">https://github.com/cakephp/debug_kit/archives/master</a>

Una vez descargado cambiadle el nombre a la carpeta por 'debug_kit' y ponedla en cualquiera de los directorios "plugins" de vuestra aplicación (/plugins y /app/plugins). Una vez copiado simplemente tenéis que cargar el componente Toolbar:

~~~php?start_inline=1
var $components = array('DebugKit.Toolbar');
~~~

... y aseguraros que vuestro nivel de debug es 2 con `Configure::write('debug', 2)` en el fichero `core.php`.

Edit: si estáis utilizando el elemento sql_dump eliminadlo de vuestro template. De lo contrario no se mostrarán las consultas en el DebugKit.

<a href="{{ site.url }}/uploads/2010/11/debug_kit1.png">
  <img class="alignnone size-full wp-image-1667" title="debug_kit1" src="{{ site.url }}/uploads/2010/11/debug_kit1.png" alt="" />
</a>

<a id="more"></a><a id="more-1661"></a>

Y a partir de este momento en vuestra página web aparecerá un botón con el icono de CakePHP en la parte superior derecha. Al hacer clic nos mostrará un menú con una serie de opciones:

<ul>
  <li>History: todavía no tengo muy claro para qué sirve.. xD</li>
  <li>Session: nos muestra todos los datos guardados de la sesión actual.</li>
  <li>Request: parámetros de cake, peticiones GET, POST y Cookies, además de información sobre la ruta actual (routes).</li>
  <li>SqlLog</li>
  <li>Timer: temporización del tiempo de ejecución de la aplicación. También muestra la memoria utilizada para la carga.</li>
  <li>Log: todo aquello que guardemos con $this->log</li>
  <li>Variables: otras variables de Cake ($this->data, $this->validationErrors, etc..)</li>
</ul>

<a href="{{ site.url }}/uploads/2010/11/debug_kit2.png">
  <img title="debug_kit2" src="{{ site.url }}/uploads/2010/11/debug_kit2.png" alt="" />
</a>
<a href="{{ site.url }}/uploads/2010/11/debug_kit3.png">
  <img title="debug_kit3" src="{{ site.url }}/uploads/2010/11/debug_kit3.png" alt="" />
</a>
<a href="{{ site.url }}/uploads/2010/11/debug_kit4.png">
  <img title="debug_kit4" src="{{ site.url }}/uploads/2010/11/debug_kit4.png" alt="" />
</a>

Por lo que puedo leer en otras páginas el uso de esta barra de herramientas incrementa considerablemente el uso de la memoria RAM del servidor. Si tenéis problemas con ello tendréis que aumentar el memory_limit hasta al menos 128MB+.

Tampoco tiene soporte para IE6, aunque esto no creo que sea un gran problema a estas alturas :)
