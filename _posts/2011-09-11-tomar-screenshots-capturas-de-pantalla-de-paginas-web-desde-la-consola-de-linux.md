---
layout: post
status: publish
published: true
title: Tomar screenshots / capturas de pantalla de páginas web desde la consola de
  Linux
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<a href=\"http://www.racotecnic.com/wp-content/uploads/2011/09/prova2.jpg\"><img
  class=\"alignright size-thumbnail wp-image-2016\" title=\"prova2\" src=\"http://www.racotecnic.com/wp-content/uploads/2011/09/prova2-150x150.jpg\"
  alt=\"\" width=\"150\" height=\"150\" /></a>Puede que os interese <strong>hacer
  capturas de pantalla de páginas web</strong> para poder <strong>mostrar una previsualización
  de una</strong><strong> web</strong> en el apartado de links de vuestro site.\r\n\r\nPara
  ello podéis utilizar alguno de los muchos servicios que corren por ahí —como <a
  href=\"http://www.websnapr.com/\" rel=\"external nofollow\">Websnapr</a>, <a href=\"http://www.webshotspro.com/\"
  rel=\"external nofollow\">WebShotsPro</a>, <a href=\"http://www.thumbalizr.com/\"
  rel=\"external nofollow\">thumbalizr</a>... O bien, si disponéis de un servidor
  dedicado (véase el que todos tenemos en la cocina o el baño) podéis crear vuestro
  propio script para tomar capturas de pantalla. Y ésto es a lo que vamos :P\r\n\r\nAntes
  de empezar.. os advierto que he hecho las pruebas desde ubuntu server maverick,
  pero esto en teoría debería de ser más o menos igual para el resto de versiones
  (tanto desktop como server).\r\n\r\nSi lo que queréis es hacer capturas de pantalla
  desde Windows, quizás os interese <a href=\"http://iecapt.sourceforge.net/\" target=\"_blank\">IECapt</a>.\r\n\r\nPrimero
  de todo, necesitamos unos cuantos paquetes esenciales...\r\n
<ul>\r\n\t<li>Vnc4server</li>\r\n\t<li>Firefox</li>\r\n\t<li>ImageMagick</li>\r\n</ul>\r\nCon
  VNCServer crearemos una instancia virtual en la que ejecutaremos Firefox para, posteriormente,
  tomar la captura de la pantalla con el método import de imagemagick.\r\n\r\nInstalad
  los paquetes como haríais habitualmente...\r\n\r\n[bash]sudo apt-get install vnc4server
  firefox imagemagick[/bash]\r\n\r\n"
wordpress_id: 2011
wordpress_url: http://www.racotecnic.com/?p=2011
date: '2011-09-11 13:18:28 +0200'
date_gmt: '2011-09-11 12:18:28 +0200'
categories:
- Programació
- Linux
- Web
tags:
- Firefox
- ImageMagick
- VNC
---

<a href="http://www.racotecnic.com/wp-content/uploads/2011/09/prova2.jpg"><img class="alignright size-thumbnail wp-image-2016" title="prova2" src="http://www.racotecnic.com/wp-content/uploads/2011/09/prova2-150x150.jpg" alt="" width="150" height="150" /></a>Puede que os interese <strong>hacer capturas de pantalla de páginas web</strong> para poder <strong>mostrar una previsualización de una</strong><strong> web</strong> en el apartado de links de vuestro site.

Para ello podéis utilizar alguno de los muchos servicios que corren por ahí —como <a href="http://www.websnapr.com/" rel="external nofollow">Websnapr</a>, <a href="http://www.webshotspro.com/" rel="external nofollow">WebShotsPro</a>, <a href="http://www.thumbalizr.com/" rel="external nofollow">thumbalizr</a>... O bien, si disponéis de un servidor dedicado (véase el que todos tenemos en la cocina o el baño) podéis crear vuestro propio script para tomar capturas de pantalla. Y ésto es a lo que vamos :P

Antes de empezar.. os advierto que he hecho las pruebas desde ubuntu server maverick, pero esto en teoría debería de ser más o menos igual para el resto de versiones (tanto desktop como server).

Si lo que queréis es hacer capturas de pantalla desde Windows, quizás os interese <a href="http://iecapt.sourceforge.net/" target="_blank">IECapt</a>.

Primero de todo, necesitamos unos cuantos paquetes esenciales...

<ul>
<li>Vnc4server</li>
<li>Firefox</li>
<li>ImageMagick</li>
</ul>

Con VNCServer crearemos una instancia virtual en la que ejecutaremos Firefox para, posteriormente, tomar la captura de la pantalla con el método import de imagemagick.

Instalad los paquetes como haríais habitualmente...

[bash]sudo apt-get install vnc4server firefox imagemagick[/bash]

<a id="more"></a><a id="more-2011"></a>

Si trabajáis con ubuntu server os va a doler porque firefox baja un huevo de paquetes.. pero es lo que hay U_U

Una vez instalados todos los paquetes, vamos a crear nuestro script para generar screenshots:

[bash]#!/bin/bash

display=':23'
export DISPLAY=':23'

vncserver -geometry 1280x1024 -depth 24 -name 'screenshoots' $display &amp;
# esperamos a que cargue vnc sin problemas...
sleep 5
# cargamos firefox con una página en blanco
firefox -display $display -width 1280 -height 1024 -url 'about:blank' &amp;

while read -a line ; do
	echo 'Carregant... ${line[1]}'
	firefox -remote 'openURL(${line[1]})'
	# o bien... firefox -display $display '${line[1]}'
	sleep 5
	echo 'Desant... ${line[0]}.jpg'
	import -window root '${line[0]}'.jpg
done < listado.txt

vncserver -kill $display[/bash]

¿Qué hace este script?
<ol>
<li>Crea una instancia de vncserver a 1280x1024px</li>
<li>Carga firefox en esa instancia a la misma resolución</li>
<li>Carga el fichero "listado.txt" (que ahora veremos) que contiene una línea con una palabra única seguida de un tabulador y una URL.</li>
<li>Abre la página web que pertoque, esperando 5 segundos para dar tiempo a cargar</li>
<li>Toma la captura de pantalla y la guarda con la palabra única y extensión .jpg</li>
</ol>

El fichero "listado.txt" deberá estar en el mismo directorio que el script y ser en este formato:

[text]underave	http://www.underave.net
musicavermella	http://www.musicavermella.com
thefuture	http://www.thefutureimperfect.com
snooppets	http://www.snooppets.com
[/text]

<strong>Es importante que este fichero tenga un salto de línea al final</strong>, sino la última url dará error.

Hecho esto ya debería de funcionar, simplemente ejecutad el script y veréis que en pantalla van saliendo los mensajes "Carregant" (Cargando) y "Desant" (Guardando) a medida que va avanzando en el listado.

Cuando tengáis los screenshots probablemente os daréis cuenta de que la imagen no es sólo de la página web, sino que también sale el navegador.

Para evitar esto he estado probando con parámetro `-screen` en lugar de `-window` pero supongo que no hace lo que pensaba que hacía xD. Así que la única solución que se me ocurre es que ejecutéis una instancia de VNCServer con firefox para poder ocultarle todas las barras posibles (la de navegación y la de favoritos).

[bash]export DISPLAY=':23'
vncserver -geometry 1280x1024 -depth 24 -name 'screenshoots' :23 &amp;
firefox -display :23 -width 1280 -height 1024 -url 'about:blank' &amp;[/bash]

Una vez esté corriendo utilizad vuestro cliente de vnc habitual (yo utilizo <a href="http://www.tightvnc.com/" rel="nofollow external">TightVNC</a>) y conectaros para poder configurar firefox. En el caso de TightVNC, para indicar el display que estamos utilizando simplemente hay que concatenarlo al final de la ip o nombre de host ([IP|HOST]:DISPLAY), por ejemplo `192.168.1.2:23`

Si además queréis que no se muestren las pestañas, abrid las opciones de firefox, buscad la opción que dice "Mostrar pestañas siempre" y desmarcadla. Ahora, para que esto funcione, tenemos que decirle a firefox que nos abra las nuevas ventanas en la ventana que esté abierta, ya que si nos abre una pestaña más nos mostrará de nuevo la barra de pestañas.

Si queréis evitar esto, en la barra de navegación (utilizad Control+L si os la habéis cargado ya) introducid la URL `about:config`, buscad el registro `browser.link.open_newwindow` y cambiad su valor de <strong>3</strong> a <strong>2</strong>.

Cerrad vuestro firefox con normalidad y volved a ejecutar el script para ver el resultado.

Pues ahí lo tenéis, utilizando un poco la imaginación, con algún cron y alguna clase en PHP podríais tener las miniaturas guardadas en vuestra web.

Si queréis recortar las imágenes para que no se vean el resto de bordes de firefox podéis tratar de utilizar el método <a href="http://www.imagemagick.org/script/mogrify.php?ImageMagick=th1vkjq027vromjp62lk806r03" rel="nofollow external">mogrify</a> de ImageMagick para hacer un crop.

O podéis hacerlo mediante PHP con alguna clase como <a title="Clase PHP para tratar imágenes (rotar, redimensionar, añadir marcas de agua..)" href="http://www.racotecnic.com/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/">Watimage</a> :D
<blockquote>
<strong>Fuentes...</strong>

<ul>
<li><a href="http://www.debian-administration.org/article/413/website_screenshot_server_on_debian_stable" rel="external nofollow">Website screenshot server on debian stable</a></li>
<li><a href="http://stackoverflow.com/questions/2781000/processing-a-tab-delimited-file-with-shell-script-processing/2787573#2787573" rel="external nofollow">Processing a tab delimited file with shell script processing</a></li>
<li><a href="https://developer.mozilla.org/en/Command_Line_Options#-ProfileManager" rel="external nofollow">Mozilla Firefox Command Line Options</a></li>
<li><a href="http://www-archive.mozilla.org/unix/remote.html" rel="external nofollow">Remote control of unix mozilla</a></li>
<li><a href="http://www.imagemagick.org/www/import.html" rel="external nofollow">ImageMagick import</a></li>
<li><a href="http://forums.mozillazine.org/viewtopic.php?f=38&amp;t=1648545" rel="external nofollow">Firefox -remote using the *same* tab</a></li>
</ul>
</blockquote>
