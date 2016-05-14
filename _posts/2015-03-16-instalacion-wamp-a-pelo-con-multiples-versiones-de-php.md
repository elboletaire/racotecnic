---
layout: post
status: publish
published: true
title: Instalación WAMP a pelo con múltiples versiones de PHP o cómo configurar Apache
  para correr varias versiones de PHP en distintos servidores virtuales
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "En esta guía os explicaré cómo realizar la instalación de un servidor
  Windows Apache + MySQL + PHP (WAMP) con múltiples versiones de PHP para
  distintos servidores virtuales."
wordpress_id: 2326
wordpress_url: http://www.racotecnic.com/?p=2326
date: '2015-03-16 23:50:52 +0100'
date_gmt: '2015-03-16 22:50:52 +0100'
categories:
- Web
- Windows
- Administració
tags:
- PHP
- MySQL
- Apache
- Apache2
- fastCGI
---

En esta guía os explicaré cómo **realizar la instalación de un servidor Windows Apache + MySQL + PHP (WAMP) con múltiples versiones de PHP** para distintos servidores virtuales.

En realidad me centraré en la configuración tanto de Apache como de PHP para que tengáis todo funcionando como es debido, de aquí que diga lo de "a pelo".

Instalaréis todo a partir de las páginas oficiales, tal como, creo, debería de ser siempre (y dejarse estar de mierdas prefabricadas).

Antes de empezar quiero dejar claro que ni soy de Microsoft, ni de Apache, ni de MySQL, ni de PHP; así que si tenéis algún problema no soy la persona a quién deberéis preguntar.

La metodología que explicaré a continuación la he utilizado anteriormente con éxito en múltiples máquinas y en varios sistemas operativos además de la instalación que realizo en una máquina virtual mientras os explico este tutorial paso por paso.

El proceso lo voy a realizar desde Windows 7 x64, pero como he dicho lo he tenido funcionando en varios sistemas operativos sin problemas:

<ul>
  <li>Windows XP x86</li>
  <li>Windows 7 x64 y x86</li>
  <li>Windows 8 x64</li>
  <li>Windows 8.1 x64</li>
</ul>

Como podéis ver, en la versión 32 bits de windows 8 no lo he probado pero, como digo, debería funcionar (me pregunto quién corre un Win8 a 32 bits).

En cuanto a las versiones de software, yo personalmente recuerdo haber probado, al menos:

<ul>
  <li>Apache 2.0, 2.2 y 2.4</li>
  <li>MySQL 5.5</li>
  <li>PHP 5.3, 5.4, 5.5 y 5.6</li>
</ul>

De hecho yo en mi ordenador tengo todas esas versiones de PHP instaladas pero, por motivos obvios, en este tutorial voy a utilizar la última versión de apache y las dos últimas versiones de PHP (el mínimo necesario para poder enseñaros cómo configurar múltiples versiones por virtualhost).

Todo ello utilizando las versiones de 64 bits, pero procuraré poneros los enlaces actuales para las versiones de 32 bits.
<blockquote>
Antes de empezar es importantísimo que comprobéis que tenéis todas las actualizaciones del sistema al día. Especialmente interesa tener <em>.NET Framework</em> instalado y actualizado para poder correr cualquiera de las aplicaciones que vamos a instalar. En mi caso la última actualización fue .NET Framework 4.5.2.</blockquote>

<a id="more"></a><a id="more-2326"></a>

## <a id="user-content-estructura-de-la-instalación" class="anchor" href="#estructura-de-la-instalaci%C3%B3n"></a>Estructura de la instalación

Podéis escoger instalar cada cosa donde os dé la gana, pero procurad tenerlo en cuenta a la hora de configurar cada cosa.

Para hacer las cosas sencillas y por tenerlo todo ordenado yo siempre he seguido esta estructura de directorios:

    C:\httpd\apache -> Apache 2.4
    C:\httpd\phpXX  -> Cada una de las versiones de PHP
    C:\httpd\www    -> Directorio raíz de todos mis proyectos en desarrollo

MySQL dejo que se instale donde quiera ya que no me preocupa tener copia de sus ficheros. Evidentemente hago copia de seguridad de las bases de datos pero no es el tema que nos concierne ahora.

## <a id="user-content-instalando-apache" class="anchor" href="#instalando-apache"></a>Instalando Apache

Desde hace relativamente poco la descarga de binarios de Apache ya no se realiza desde el sitio oficial. En su lugar ellos mismos te recomiendan varios sites alternativos desde los que efectuar la descarga.

Podéis ver esto <a href="http://ftp.cixug.es/apache//httpd/binaries/win32/">desde cualquiera de los mirrors de descarga de apache, bajo `binaries/win32`</a>.

Yo personalmente recomiendo <a href="http://www.apachelounge.com/">ApacheLounge</a> y os guiaré para descargar desde ahí los ficheros.

Os guiaré, pero de todos modos pondré los enlaces directos a los ficheros que yo he utilizado (no os lo recomiendo ya que sacan versiones nuevas constantemente).

Entrad en ApacheLounge y seguid estos pasos para descargar todo lo necesario:

<ul>
  <li>Id a <a href="http://www.apachelounge.com/download/">descargas</a>. En la barra lateral veréis que pone "VC11" y "VC10", eso es la versión necesaria del compilador de Visual C++ proporcionado por Microsoft.</li>
  <li>Descargad la versión que os interese de Apache, en mi caso descargo la versión <a href="http://www.apachelounge.com/download/VC11/binaries/httpd-2.4.12-win64-VC11.zip">2.4.12 Win64 desde VC11</a>.</li>
  <li>Dependiendo de la versión que hayáis descargado tenéis que descargar el compilador de C++. Veréis que está enlazado cerca de la misma descarga de Apache. En mi caso descargo <a href="http://www.microsoft.com/en-us/download/details.aspx?id=30679">VC11 vcredist_x64/86.exe</a> asegurándome de marcar la casilla `VSU_4\vcredist_x64.exe` ya que estoy descargando para 64 bits.</li>
  <li>Descargad también el módulo de apache `mod_fcgid`. En el caso de Apache 2.4 los módulos vienen todos en un mismo zip así que en mi caso descargo <a href="http://www.apachelounge.com/download/VC11/modules/modules-2.4-win64-VC11.zip">modules-2.4-win64-VC11.zip</a>.</li>
</ul>

Ahora que ya tenemos todo lo necesario en cuanto a Apache se refiere, procederemos a instalarlo.

Instalad primero VC10 (u 11) ya que es requisito indispensable para que Apache funcione.

Una vez instalado, descomprimid Apache y movedlo donde lo queráis instalar. En mi caso descomprimo apache en `C:\httpd\apache` de modo que accediendo a dicho directorio me queda el contenido del .zip (múltiples directorios y ficheros, entre ellos `INSTALL.txt` con detalles sobre cómo instalar Apache).

Como en mi caso no quiero utilizar el directorio `htdocs` que viene dentro del directorio de apache creo ahora el directorio `C:\httpd\www`.

Descomprimid también el módulo `mod_fcgid`. Os interesa únicamente el fichero `mod_fcgid.so` que desplazaréis dentro del directorio `modules` del directorio raíz de apache, en mi caso `C:\httpd\apache\modules` quedando `C:\httpd\apache\modules\mod_fcgid.so` listo para ser cargado por apache.

Hecho esto necesitáis configurar Apache para indicarle el directorio donde lo habéis ubicado. Para ello abrid el fichero `C:\httpd\apache\conf\httpd.conf` con el bloc de notas (o con vuestro editor de código favorito) —huelga decir que editar ese fichero con Word o WordPad sería una idiotez.

Cerca de la línea 37 encontraréis:

    ServerRoot "C:/Apache24"

Debéis cambiarlo a vuestra ubicación que siguiendo esta guía sería:

    ServerRoot "C:/httpd/apache"

Para ir más rápido, buscad todas las coincidencias en el documento de `C:/Apache24` y reemplazadlas con vuestra ubicación de instalación. Esto debería de reemplazar varias cosas como el `DocumentRoot` o la ubicación de los `cgi-bin`.

Dado que, en mi caso, el `DocumentRoot` lo quiero en otra ubicación, lo cambio en los dos sitios donde requiere (líneas 242 y 243 aproximadamente) a `C:\httpd\www`.

En esa misma configuración de `Directory` (cerca de la línea 243) debéis aseguraros de que se pueden ejecutar scripts cgi, dado que utilizaréis fastcgi para ejecutar PHP. Para ello debéis añadir `ExecCGI` detrás de las opciones, quedando esa línea así:

    Options Indexes FollowSymlinks ExecCGI

Ahora, cerca de la línea 176, cuando terminan de cargar todos los módulos debéis añadir el módulo `mod_fcgid` tal que así:

    LoadModule fcgid_module modules/mod_fcgid.so

También sería un buen momento para que revisárais qué módulos de los que hay comentados os interesa tener habilitados para descomentarlos (como el típico `mod_rewrite`).

Para avanzar faena, cambiad `DirectoryIndex` para que coja ficheros php por defecto:

    DirectoryIndex index.php index.html index.htm

Al final de todo del documento añadid las siguientes líneas:

~~~conf
# 200MB of file upload limit
FcgidMaxRequestLen 209715200
# Set minimum timeouts
FcgidConnectTimeout 240
FcgidIOTimeout 240
FcgidBusyScanInterval 240
FcgidBusyTimeout 240

# Set PHP 5.6 as default php-cgi executable
# AddHandler fcgid-script .php
# FcgidInitialEnv PHPRC "C:/httpd/php56"
# FcgidWrapper "C:/httpd/php56/php-cgi.exe" .php
~~~

El último trozo está comentado a propósito, ya que instalaremos y probaremos Apache antes de instalar PHP.

Ya lo tenéis todo listo, guardad el documento e id a ejecutar Apache. Para ello abrid un terminal (cmd o PowerShell, tanto da) y ejecutad lo siguiente:

    cd C:\httpd\apache\bin

Ahora que estáis en el directorio de ejecutables de Apache ejecutadlo para ver si arranca:

    .\httpd.exe

>Ojo! Algunas aplicaciones como Skype utilizan el puerto 80 si ven que no está
ocupado. Por ello es recomendable que cerréis cualquier aplicación que tengáis
corriendo antes de ejecutar Apache. Si no lo hacéis simplemente os saltará un
error indicando que dicho puerto está ocupado.

Si todo ha ido bien únicamente os aparecerá una alerta indicando que no se ha
indicado un `ServerName`. Sino os mostrará claramente el error y deberéis de
arreglarlo. En mi caso mientras hacía este tutorial olvidé crear el directorio
`www` y me saltó este error:

    Syntax error on line 243 of C:/httpd/apache/conf/httpd.conf:
    DocumentRoot must be a directory

Utilizando vuestro navegador podéis acceder a <a href="http://localhost">http://localhost</a> y comprobar que el servidor funciona correctamente.

Perfecto, pero no hemos instalado Apache. Sólo hemos comprobado que funcionaba correctamente antes de instalarlo.

Para instalarlo debéis ejecutar un terminal con derechos de administrador. Una vez abierta y habiendo accedido a `C:\httpd\apache\bin` ejecutad:

~~~bat
.\httpd.exe -k install
~~~

Para hacer que `ApacheMonitor` se ejecute cuando arranquéis el ordenador únicamente tenéis que crearle un acceso directo en la sección `Inicio` del menú Inicio (un poco redundante, sí).

<a href="http://www.racotecnic.com/wp-content/uploads/2015/03/apache_monitor.png"><img src="http://www.racotecnic.com/wp-content/uploads/2015/03/apache_monitor.png" alt="En català no és pas tant redundant, oi?" width="233" height="77" class="aligncenter size-full wp-image-2334" /></a>

Hecho. Si os da el gusanillo reiniciad el ordenador y acceded de nuevo a <a href="http://localhost">http://localhost</a> para comprobar que todo sigue funcionando OK.

## <a id="user-content-instalando-php" class="anchor" href="#instalando-php"></a>Instalando PHP

Id a la <a href="http://windows.php.net/download/">página de descargas de PHP para windows</a> y descargad todas las versiones de PHP que queráis tener instaladas.

Al descargarlas únicamente debéis tener en cuenta la arquitectura que estéis instalando (en mi caso x64) y que **Apache es Thread Safe**.

<a href="https://instagram.com/elboletaire/"><img src="http://www.racotecnic.com/wp-content/uploads/2015/03/thread_safe.jpg" alt="Thread safe" width="612" height="612" class="aligncenter size-full wp-image-2332" /></a>

En mi instalación descargo <a href="http://windows.php.net/downloads/releases/php-5.6.6-Win32-VC11-x64.zip">PHP 5.6 (5.6.6) VC11 x64 Thread Safe (2015-Feb-19 01:45:29)</a> y <a href="http://windows.php.net/downloads/releases/php-5.5.22-Win32-VC11-x64.zip">PHP 5.5 (5.5.22) VC11 x64 Thread Safe (2015-Feb-19 01:38:01)</a>.

Una vez tenéis todo descargado, lo descomprimís y lo movéis hacia el directorio `C:\httpd`. Poned nombres cortos a los directorios:

    C:\httpd\php56
    C:\httpd\php55

Ya está PHP instalado, pero no configurado.

Si queréis poder ejecutar `php.exe` desde vuestro terminal deberéis añadir a la variable de entorno `PATH` el directorio de la versión que queráis utilizar. En caso de hacerlo también deberéis crear una nueva variable de entorno `PHPRC` con el mismo directorio que habéis añadido al `PATH`.

Ahora tenéis que entrar en cada instalación de php que habéis instalado y renombrar el fichero `php.ini-development` a `php.ini` y hacer los cambios que indicaré a continuación.

Buscad el siguiente trozo:

~~~ini
; On windows:
; extension_dir = "ext"
~~~


Y descomentad la línea de `extension_dir`, quedando así:

~~~ini
; On windows:
extension_dir = "ext"
~~~

Buscad el trozo donde estén todas las extensiones y descomentad las que os interesen. Las encontraréis en este formato:

~~~ini
;extension=php_bz2.dll
;extension=php_curl.dll
;extension=php_fileinfo.dll
;[...]
~~~

Estas tres primeras que he puesto yo seguramente os interesará activarlas, al igual que `gd2`, `gettext`, `intl`, `mbstring`, `exif`, `mysql`, `mysqli`, `pdo_mysql` y/u `openssl`.

Hecho esto en todos los ficheros `php.ini` de nuestras instalaciones, es momento de acabar de configurar apache para que ejecute ficheros php con nuestra versión por defecto de PHP.

Volved al fichero `httpd.conf` de apache y al final del documento, descomentad:

~~~conf
# Set PHP 5.6 as default php-cgi executable
AddHandler fcgid-script .php
FcgidInitialEnv PHPRC "C:/httpd/php56"
FcgidWrapper "C:/httpd/php56/php-cgi.exe" .php
~~~

Utilizando `ApacheMonitor` reiniciad Apache. Cread un fichero `index.php` en el directorio `www` con un `phpinfo` dentro:
<div class="highlight highlight-php">

<span class="pl-s2"><span class="pl-k"><</span>?<span class="pl-c1">php</span> <span class="pl-s3">phpinfo</span>(); </span><span class="pl-pse"><span class="pl-s2">?</span>></span>
</div>

Y acceded a <a href="http://localhost">http://localhost</a> para verificar que PHP funciona correctamente.

## <a id="user-content-utilizando-distintas-versiones-de-php-en-nuestros-servidores-virtuales" class="anchor" href="#utilizando-distintas-versiones-de-php-en-nuestros-servidores-virtuales"></a>Utilizando distintas versiones de PHP en nuestros servidores virtuales

Ahora que ya tenéis Apache y la versión de PHP por defecto corriendo, llega el momento de explicaros cómo cambiar entre versiones de PHP.

Para utilizar esta metodología es necesario el uso de servidores virtuales, así que en el fichero `httpd.conf` descomentáis la línea donde carga el fichero de VirtualHosts:

~~~conf
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
~~~

Descomentada esa línea abrís el fichero `conf/extra/httpd-vhosts.conf` en cuestión y creáis un par de servidores virtuales que irán con distintas versiones de PHP.

Para el ejemplo crearéis dos servidores virtuales `php55.loc` y `php56.loc`, así que lo primero que haréis es crear sus directorios:

    C:\httpd\www\php55.loc
    C:\httpd\www\php56.loc

Y en el fichero `httpd-vhosts.conf` previamente abierto creamos los servidores virtuales:

~~~apache
<VirtualHost *:80>
    # Indicamos que queremos utilizar PHP 5.5
    FcgidInitialEnv PHPRC "C:/httpd/php55"
    FcgidWrapper "C:/httpd/php55/php-cgi.exe" .php

    DocumentRoot "C:/httpd/www/php55.loc"
    ServerName php55.loc
    ServerAlias www.php55.loc
    ErrorLog "logs/php55.loc-error.log"
    CustomLog "logs/php55.loc-access.log" common
</VirtualHost>
<VirtualHost *:80>
    # Dado que utilizo PHP 5.6 por defecto no me es
    # necesario especificar nada a fastcgi

    DocumentRoot "C:/httpd/www/php56.loc"
    ServerName php56.loc
    ServerAlias www.php56.loc
    ErrorLog "logs/php56.loc-error.log"
    CustomLog "logs/php56.loc-access.log" common
</VirtualHost>
~~~

Para ir acabando añadid al fichero hosts de sistema (`C:\Windows\System32\drivers\etc\hosts`) los dominios de los servidores virtuales:

    127.0.0.1    php55.loc www.php55.loc
    127.0.0.1    php56.loc www.php56.loc

Copiad el fichero `index.php` que hemos creado antes en el directorio `www` a cada directorio de cada host virtual.

Finalmente reiniciad apache utilizando ApacheMonitor y acceded con vuestro navegador a <a href="http://php55.loc">http://php55.loc</a> y <a href="http://php56.loc">http://php56.loc</a> para verificar que todo ha funcionado correctamente.

Estoy seguro de que sí :)

<a href="http://www.racotecnic.com/wp-content/uploads/2015/03/php.loc_.png"><img src="http://www.racotecnic.com/wp-content/uploads/2015/03/php.loc_-1024x732.png" alt="php.loc" class="aligncenter size-large wp-image-2336" /></a>

## <a id="user-content-instalar-mysql" class="anchor" href="#instalar-mysql"></a>Instalar MySQL

Descargad el <a href="http://dev.mysql.com/downloads/windows/installer/5.6.html">instalador de MySQL</a> y procurad instalar lo que os interese (con el servidor ya basta).

Podéis optar por escoger la instalación por defecto para desarrolladores (os instalará cosas que no necesita un desarrollador PHP habitualmente), o bien podéis instalar los paquetes que queráis manualmente.

En el caso de mi instalación escojo únicamente el servidor de MySQL en su versión x64.

Y para instalar, "siguiente, siguiente, siguiente"...

## <a id="user-content-enlaces-útiles-y-referencias" class="anchor" href="#enlaces-%C3%BAtiles-y-referencias"></a>Enlaces útiles y referencias

Me gustaría enlazar a las referencias pero no puedo ya que hace demasiado tiempo que ando haciendo todo este proceso de memoria y no recuerdo exactamente de dónde saqué la información. Sé que al final lo hice funcionar gracias a alguien que explicaba cómo correr FastCGI en Linux, pero ni de coña lograría encontrar el enlace original.

A parte de esto (que lo digo en parte para que seáis conscientes de que todo se puede encontrar buscándolo), os adjunto los ficheros de configuración resultantes tras la configuración explicada en este tutorial.
