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
  de todo, necesitamos unos cuantos paquetes esenciales...\r\n<ul>\r\n\t<li>Vnc4server</li>\r\n\t<li>Firefox</li>\r\n\t<li>ImageMagick</li>\r\n</ul>\r\nCon
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
<p><a href="http://www.racotecnic.com/wp-content/uploads/2011/09/prova2.jpg"><img class="alignright size-thumbnail wp-image-2016" title="prova2" src="http://www.racotecnic.com/wp-content/uploads/2011/09/prova2-150x150.jpg" alt="" width="150" height="150" /></a>Puede que os interese <strong>hacer capturas de pantalla de páginas web</strong> para poder <strong>mostrar una previsualización de una</strong><strong> web</strong> en el apartado de links de vuestro site.</p>
<p>Para ello podéis utilizar alguno de los muchos servicios que corren por ahí —como <a href="http://www.websnapr.com/" rel="external nofollow">Websnapr</a>, <a href="http://www.webshotspro.com/" rel="external nofollow">WebShotsPro</a>, <a href="http://www.thumbalizr.com/" rel="external nofollow">thumbalizr</a>... O bien, si disponéis de un servidor dedicado (véase el que todos tenemos en la cocina o el baño) podéis crear vuestro propio script para tomar capturas de pantalla. Y ésto es a lo que vamos :P</p>
<p>Antes de empezar.. os advierto que he hecho las pruebas desde ubuntu server maverick, pero esto en teoría debería de ser más o menos igual para el resto de versiones (tanto desktop como server).</p>
<p>Si lo que queréis es hacer capturas de pantalla desde Windows, quizás os interese <a href="http://iecapt.sourceforge.net/" target="_blank">IECapt</a>.</p>
<p>Primero de todo, necesitamos unos cuantos paquetes esenciales...</p>
<ul>
<li>Vnc4server</li>
<li>Firefox</li>
<li>ImageMagick</li>
</ul>
<p>Con VNCServer crearemos una instancia virtual en la que ejecutaremos Firefox para, posteriormente, tomar la captura de la pantalla con el método import de imagemagick.</p>
<p>Instalad los paquetes como haríais habitualmente...</p>
<p>[bash]sudo apt-get install vnc4server firefox imagemagick[/bash]</p>
<p><a id="more"></a><a id="more-2011"></a></p>
<p>Si trabajáis con ubuntu server os va a doler porque firefox baja un huevo de paquetes.. pero es lo que hay U_U</p>
<p>Una vez instalados todos los paquetes, vamos a crear nuestro script para generar screenshots:</p>
<p>[bash]#!/bin/bash</p>
<p>display=&quot;:23&quot;<br />
export DISPLAY=&quot;:23&quot;</p>
<p>vncserver -geometry 1280x1024 -depth 24 -name &quot;screenshoots&quot; $display &amp;<br />
# esperamos a que cargue vnc sin problemas...<br />
sleep 5<br />
# cargamos firefox con una página en blanco<br />
firefox -display $display -width 1280 -height 1024 -url &quot;about:blank&quot; &amp;</p>
<p>while read -a line ; do<br />
	echo &quot;Carregant... ${line[1]}&quot;<br />
	firefox -remote &quot;openURL(${line[1]})&quot;<br />
	# o bien... firefox -display $display &quot;${line[1]}&quot;<br />
	sleep 5<br />
	echo &quot;Desant... ${line[0]}.jpg&quot;<br />
	import -window root &quot;${line[0]}&quot;.jpg<br />
done &lt; listado.txt</p>
<p>vncserver -kill $display[/bash]</p>
<p>¿Qué hace este script?</p>
<ol>
<li>Crea una instancia de vncserver a 1280x1024px</li>
<li>Carga firefox en esa instancia a la misma resolución</li>
<li>Carga el fichero "listado.txt" (que ahora veremos) que contiene una línea con una palabra única seguida de un tabulador y una URL.</li>
<li>Abre la página web que pertoque, esperando 5 segundos para dar tiempo a cargar</li>
<li>Toma la captura de pantalla y la guarda con la palabra única y extensión .jpg</li>
</ol>
<p>El fichero "listado.txt" deberá estar en el mismo directorio que el script y ser en este formato:</p>
<p>[text]underave	http://www.underave.net<br />
musicavermella	http://www.musicavermella.com<br />
thefuture	http://www.thefutureimperfect.com<br />
snooppets	http://www.snooppets.com<br />
[/text]</p>
<p><strong>Es importante que este fichero tenga un salto de línea al final</strong>, sino la última url dará error.</p>
<p>Hecho esto ya debería de funcionar, simplemente ejecutad el script y veréis que en pantalla van saliendo los mensajes "Carregant" (Cargando) y "Desant" (Guardando) a medida que va avanzando en el listado.</p>
<p>Cuando tengáis los screenshots probablemente os daréis cuenta de que la imagen no es sólo de la página web, sino que también sale el navegador.</p>
<p>Para evitar esto he estado probando con parámetro <code>-screen</code> en lugar de <code>-window</code> pero supongo que no hace lo que pensaba que hacía xD. Así que la única solución que se me ocurre es que ejecutéis una instancia de VNCServer con firefox para poder ocultarle todas las barras posibles (la de navegación y la de favoritos).</p>
<p>[bash]export DISPLAY=&quot;:23&quot;<br />
vncserver -geometry 1280x1024 -depth 24 -name &quot;screenshoots&quot; :23 &amp;<br />
firefox -display :23 -width 1280 -height 1024 -url &quot;about:blank&quot; &amp;[/bash]</p>
<p>Una vez esté corriendo utilizad vuestro cliente de vnc habitual (yo utilizo <a href="http://www.tightvnc.com/" rel="nofollow external">TightVNC</a>) y conectaros para poder configurar firefox. En el caso de TightVNC, para indicar el display que estamos utilizando simplemente hay que concatenarlo al final de la ip o nombre de host ([IP|HOST]:DISPLAY), por ejemplo <code>192.168.1.2:23</code></p>
<p>Si además queréis que no se muestren las pestañas, abrid las opciones de firefox, buscad la opción que dice "Mostrar pestañas siempre" y desmarcadla. Ahora, para que esto funcione, tenemos que decirle a firefox que nos abra las nuevas ventanas en la ventana que esté abierta, ya que si nos abre una pestaña más nos mostrará de nuevo la barra de pestañas.</p>
<p>Si queréis evitar esto, en la barra de navegación (utilizad Control+L si os la habéis cargado ya) introducid la URL <code>about:config</code>, buscad el registro <code>browser.link.open_newwindow</code> y cambiad su valor de <strong>3</strong> a <strong>2</strong>.</p>
<p>Cerrad vuestro firefox con normalidad y volved a ejecutar el script para ver el resultado.</p>
<p>Pues ahí lo tenéis, utilizando un poco la imaginación, con algún cron y alguna clase en PHP podríais tener las miniaturas guardadas en vuestra web.</p>
<p>Si queréis recortar las imágenes para que no se vean el resto de bordes de firefox podéis tratar de utilizar el método <a href="http://www.imagemagick.org/script/mogrify.php?ImageMagick=th1vkjq027vromjp62lk806r03" rel="nofollow external">mogrify</a> de ImageMagick para hacer un crop.</p>
<p>O podéis hacerlo mediante PHP con alguna clase como <a title="Clase PHP para tratar imágenes (rotar, redimensionar, añadir marcas de agua..)" href="http://www.racotecnic.com/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/">Watimage</a> :D</p>
<blockquote><p><strong>Fuentes...</strong></p>
<ul>
<li><a href="http://www.debian-administration.org/article/413/website_screenshot_server_on_debian_stable" rel="external nofollow">Website screenshot server on debian stable</a></li>
<li><a href="http://stackoverflow.com/questions/2781000/processing-a-tab-delimited-file-with-shell-script-processing/2787573#2787573" rel="external nofollow">Processing a tab delimited file with shell script processing</a></li>
<li><a href="https://developer.mozilla.org/en/Command_Line_Options#-ProfileManager" rel="external nofollow">Mozilla Firefox Command Line Options</a></li>
<li><a href="http://www-archive.mozilla.org/unix/remote.html" rel="external nofollow">Remote control of unix mozilla</a></li>
<li><a href="http://www.imagemagick.org/www/import.html" rel="external nofollow">ImageMagick import</a></li>
<li><a href="http://forums.mozillazine.org/viewtopic.php?f=38&amp;t=1648545" rel="external nofollow">Firefox -remote using the *same* tab</a></li>
</ul>
</blockquote>
