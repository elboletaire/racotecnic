---
layout: post
status: publish
published: true
title: Instalar Nokia Trolltech Qt 4 en Mac OS X
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Esta semana he tenido la suerte de conseguir un MacBook (el modelo antiguo,
  de hace 3 años) por un módico precio y, cómo no, he empezado a llenarlo con todas
  las aplicaciones que necesito para programar (esto incluye tener que instalar una
  máquina virtual para poder instalar Visual Studio 2008 x] ).\r\n\r\nEl caso es que
  hoy mismo me he visto obligado a instalar el Framework de C++ <a title=\"Ir a QTsoftware.com\"
  href=\"http://www.qtsoftware.com/\" target=\"_blank\">Qt4</a> y como no he encontrado
  nada en español he decidido postear una ayuda ;)\r\n\r\nAntes de continuar debéis
  saber que existe un instalador para Mac, está en la misma <a href=\"http://www.qtsoftware.com/downloads/opensource/appdev/mac-os-cpp\"
  target=\"_blank\">página de descarga de las QTs</a> pero en letra pequeña, abajo
  de todo. Instala todo en pocos clics, ero desconozco si instala gcc y g++ (necesarios
  para compilar nuestras aplicaciones desarrolladas con QT).\r\n\r\nPrimero de todo
  debemos descargar el conjunto de desarrollo de Mac Xcode. Es un fichero .dmg de
  aproximadamente 1GB que podéis descargar gratuitamente de la <a title=\"Apple Developer
  Connection\" href=\"http://connect.apple.com\" target=\"_blank\">página web de desarrollo
  de mac</a> (necesitáis estar registrados).\r\n\r\n"
wordpress_id: 170
wordpress_url: http://racoinformatic.underave.net/?p=170
date: '2009-01-24 11:30:07 +0100'
date_gmt: '2009-01-24 10:30:07 +0100'
categories:
- Programació
- Aplicacions
- Mac
tags:
- QT
- C++
- Configurar aplicació
- Leopard
---

Esta semana he tenido la suerte de conseguir un MacBook (el modelo antiguo, de hace 3 años) por un módico precio y, cómo no, he empezado a llenarlo con todas las aplicaciones que necesito para programar (esto incluye tener que instalar una máquina virtual para poder instalar Visual Studio 2008 x] ).

El caso es que hoy mismo me he visto obligado a instalar el Framework de C++ <a title="Ir a QTsoftware.com" href="http://www.qtsoftware.com/" target="_blank">Qt4</a> y como no he encontrado nada en español he decidido postear una ayuda ;)

Antes de continuar debéis saber que existe un instalador para Mac, está en la misma <a href="http://www.qtsoftware.com/downloads/opensource/appdev/mac-os-cpp" target="_blank">página de descarga de las QTs</a> pero en letra pequeña, abajo de todo. Instala todo en pocos clics, ero desconozco si instala gcc y g++ (necesarios para compilar nuestras aplicaciones desarrolladas con QT).

Primero de todo debemos descargar el conjunto de desarrollo de Mac Xcode. Es un fichero .dmg de aproximadamente 1GB que podéis descargar gratuitamente de la <a title="Apple Developer Connection" href="http://connect.apple.com" target="_blank">página web de desarrollo de mac</a> (necesitáis estar registrados).

<a id="more"></a><a id="more-170"></a>
Una vez registrados, en la seción <em>Downloads / Development Tools</em> buscamos la última versión de "Xcode Developer Tools" (actualmente es la versión 3.2.1).

Esto lo hacemos porque para instalar las Qts necesitamos el compilador gcc/g++ y viene en éste paquete. Instalaremos "System Tools" y "Unix Development Support" (ocupa aproximadamente 2,5GB).

Mientras lo instalamos podemos ir descargando la última versión de Qt desde la página oficial (actualmente en la <a title="Descargar QTs" href="http://www.qtsoftware.com/downloads/opensource/appdev" target="_blank">versión 4.4.3</a>).

Terminada la instalación de Xcode y con las QT descargadas, pasamos a la instalación de estas. Accedemos a una terminal de sistema (buscando "Terminal" en Spotlight) y entramos en la carpeta /tmp para descomprimir ahí los ficheros:

<span style="color: #808080;">host:~ user$</span> cd /tmp
<span style="color: #808080;"># Ficheros gz</span>
<span style="color: #808080;">host:tmp user$</span> gunzip qt-mac-opensource-src-4.4.3.tar.gz .
<span style="color: #808080;"># Ficheros tar</span>
<span style="color: #808080;">host:tmp user$</span> tar xvf qt-mac-opensource-src-4.4.3.tar .

Accedemos a la carpeta creada y pasamos a la configuración:

<span style="color: #808080;">host:tmp user$</span> cd qt-mac-opensource-src-4.4.3
<span style="color: #808080;">host:qt-mac[…]4.4.3 user$</span> ./configure

Esto llevará un rato... Cuando haya terminado hacemos make (esto aun llevará más rato [pero mucho, eh?]) y finalmente make install (esta última la ejecutaremos como superusuario):

<span style="color: #808080;">host:qt-mac[…]4.4.3 user$</span> ./configure
<span style="color: #808080;">host:qt-mac[…]4.4.3 user$</span> make
<span style="color: #808080;">host:qt-mac[…]4.4.3 user$</span> sudo make install

Cuando por fin termine la instalación pasaremos a decirle a la Terminal dónde se encuentran los ejeutables de las QT, para ello editaremos el fichero ".profile" (en caso de ser SSH, si fuera csh o tcsh seria el fichero ".login") situado en nuestra carpeta home:

<span style="color: #808080;">host:~ user$:</span> nano .profile

Y añadimos la siguiente línea:

export PATH=/usr/local/Trolltech/Qt-4.4.3/bin:$PATH

Y listo! Ya podemos empezar a compilar y ejecutar nuestros programas hechos con Qts!

Hace un mes salío una versión beta de un nuevo IDE para desarrollar con Qt. Se llama QTCreator y también lo podéis descargar gratuitamente <a title="Descargar QTCreator" href="http://www.qtsoftware.com/developer/qt-creator/qt-creator" target="_blank">desde la página web</a> (si habías probado QtDesigner esto os encantará ;) ).
<blockquote>
Página de referencia:

<ul>
<li><a href="http://doc.trolltech.com/4.4/install-mac.html" target="_blank">Installing Qt on Mac OS X (Trolltech)</a></li>
</ul>
</blockquote>
