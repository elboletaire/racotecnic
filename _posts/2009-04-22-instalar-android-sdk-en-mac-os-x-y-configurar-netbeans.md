---
layout: post
status: publish
published: true
title: Instalar Android SDK en Mac OS X y configurar Netbeans
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Vamos a instalar el SDK Android (para desarrollar aplicaciones en Java*
  para teléfonos móviles con sistema operativo Android) en nuestro Mac OS X (en mi
  caso <em>Leopard</em>, no creo que haya muchas diferencias con versiones anteriores).\r\n\r\nDescarguemos
  el SDK de la <a title=\"Ir a la página\" href=\"http://developer.android.com/\"
  target=\"_blank\">página de desarrollo de Android,</a> en la <a title=\"Ir a la
  página\" href=\"http://developer.android.com/sdk/1.1_r1/index.html\" target=\"_blank\">sección
  de descargas</a>.\r\n\r\nLa versión actual es la 1.1 y mi versión de Java la 1.5
  (no puedo actualizar dado que la 1.6 por el momento sólo está para Duo 2 Core).
  El enlace para dicha revisión de Android es el siguiente:\r\n\r\n<a title=\"Ir a
  la página\" href=\"http://developer.android.com/sdk/download.html?v=android-sdk-mac_x86-1.1_r1.zip\"
  target=\"_blank\">http://developer.android.com/sdk/download.html?v=android-sdk-mac_x86-1.1_r1.zip</a>\r\n\r\n"
wordpress_id: 476
wordpress_url: http://racotecnic.underave.net/?p=476
date: '2009-04-22 00:52:24 +0200'
date_gmt: '2009-04-21 23:52:24 +0200'
categories:
- Programació
- Aplicacions
- Mac
tags:
- Java
- Android
- Netbeans
---

Vamos a instalar el SDK Android (para desarrollar aplicaciones en Java* para teléfonos móviles con sistema operativo Android) en nuestro Mac OS X (en mi caso <em>Leopard</em>, no creo que haya muchas diferencias con versiones anteriores).

Descarguemos el SDK de la <a title="Ir a la página" href="http://developer.android.com/" target="_blank">página de desarrollo de Android,</a> en la <a title="Ir a la página" href="http://developer.android.com/sdk/1.1_r1/index.html" target="_blank">sección de descargas</a>.

La versión actual es la 1.1 y mi versión de Java la 1.5 (no puedo actualizar dado que la 1.6 por el momento sólo está para Duo 2 Core). El enlace para dicha revisión de Android es el siguiente:

<a title="Ir a la página" href="http://developer.android.com/sdk/download.html?v=android-sdk-mac_x86-1.1_r1.zip" target="_blank">http://developer.android.com/sdk/download.html?v=android-sdk-mac_x86-1.1_r1.zip</a>

<a id="more"></a><a id="more-476"></a>
Una vez descargado lo descomprimimos y lo copiamos donde queramos. En mi caso lo he copiado en /Applications/Android

Ahora debemos editar nuestro fichero ".profile" situado en nuestra carpeta de Inicio. Para ello abramos una terminal y tecleemos:

[bash]nano .profile[/bash]

Si está en blanco no os preocupéis, el fichero no viene creado por defecto y si no lo habéis editado anteriormente no existirá.

Ahora hay que añadir una línea a este fichero para indicar dónde tenemos las librerías de Android. Modificad "/Applications/Android" por vuestra ruta:

[bash]export PATH=${PATH}:/Applications/Android/Tools[/bash]

Guardamos el fichero (con "control + o") y salimos de nano ("control + x"). Necesitamos reiniciar la sesión para que los cambios tengan efecto, así que ya sabéis... <em>manzanita / Cerrar sesión de x</em>.

Ya le hemos dicho al compilador de java dónde están ubicadas las librerías. Ahora sólo falta configurar Netbeans. Abrámoslo y vamos a <em>Herramientas / Conectores</em>. En <em>Conectores</em> seleccionamos la pestaña Configuración y le damos al botón "Agregar" para añadir un nuevo repositorio de actualización, que es el siguiente:

http://kenai.com/downloads/nbandroid/updates.xml

Una vez agregado seleccionáis la pestaña <em>Complementos disponibles</em>, buscáis Android y lo marcáis. El resto es "metodología windows" (siguiente, siguiente, siguiente...).

Cuando lo tengáis instalado, al crear un nuevo proyecto, podréis seleccionar <em>Android Application</em> como plantilla de proyecto.

<a href="{{ site.url }}/uploads/2009/04/nuevo-proyecto-android.png"><img class="size-full wp-image-477 aligncenter" title="nuevo-proyecto-android" src="{{ site.url }}/uploads/2009/04/nuevo-proyecto-android.png" alt="nuevo-proyecto-android" width="375" height="95" /></a>

*Esto está mal dicho, ya que aunque la aplicación la desarrollemos en Java luego ésta es traducida a un lenguaje comprensible por los dispositivos con S.O. Android.
