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
excerpt: "En esta guía os explicaré cómo <strong>realizar la instalación de un servidor
  Windows Apache + MySQL + PHP (WAMP) con múltiples versiones de PHP</strong> para
  distintos servidores virtuales.\r\n\r\nEn realidad me centraré en la configuración
  tanto de Apache como de PHP para que tengáis todo funcionando como es debido, de
  aquí que diga lo de \"a pelo\".\r\n\r\nInstalaréis todo a partir de las páginas
  oficiales, tal como, creo, debería de ser siempre (y dejarse estar de mierdas prefabricadas).\r\n\r\nAntes
  de empezar quiero dejar claro que ni soy de Microsoft, ni de Apache, ni de MySQL,
  ni de PHP; así que si tenéis algún problema no soy la persona a quién deberéis preguntar.\r\n\r\nLa
  metodología que explicaré a continuación la he utilizado anteriormente con éxito
  en múltiples máquinas y en varios sistemas operativos además de la instalación que
  realizo en una máquina virtual mientras os explico este tutorial paso por paso.\r\n\r\nEl
  proceso lo voy a realizar desde Windows 7 x64, pero como he dicho lo he tenido funcionando
  en varios sistemas operativos sin problemas:\r\n<ul>\r\n    <li>Windows XP x86</li>\r\n
  \   <li>Windows 7 x64 y x86</li>\r\n    <li>Windows 8 x64</li>\r\n    <li>Windows
  8.1 x64</li>\r\n</ul>\r\nComo podéis ver, en la versión 32 bits de windows 8 no
  lo he probado pero, como digo, debería funcionar (me pregunto quién corre un Win8
  a 32 bits).\r\n\r\nEn cuanto a las versiones de software, yo personalmente recuerdo
  haber probado, al menos:\r\n<ul>\r\n    <li>Apache 2.0, 2.2 y 2.4</li>\r\n    <li>MySQL
  5.5</li>\r\n    <li>PHP 5.3, 5.4, 5.5 y 5.6</li>\r\n</ul>\r\nDe hecho yo en mi ordenador
  tengo todas esas versiones de PHP instaladas pero, por motivos obvios, en este tutorial
  voy a utilizar la última versión de apache y las dos últimas versiones de PHP (el
  mínimo necesario para poder enseñaros cómo configurar múltiples versiones por virtualhost).\r\n\r\nTodo
  ello utilizando las versiones de 64 bits, pero procuraré poneros los enlaces actuales
  para las versiones de 32 bits.\r\n<blockquote>Antes de empezar es importantísimo
  que comprobéis que tenéis todas las actualizaciones del sistema al día. Especialmente
  interesa tener <em>.NET Framework</em> instalado y actualizado para poder correr
  cualquiera de las aplicaciones que vamos a instalar. En mi caso la última actualización
  fue .NET Framework 4.5.2.</blockquote>\r\n\r\n"
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
<p>En esta guía os explicaré cómo <strong>realizar la instalación de un servidor Windows Apache + MySQL + PHP (WAMP) con múltiples versiones de PHP</strong> para distintos servidores virtuales.</p>
<p>En realidad me centraré en la configuración tanto de Apache como de PHP para que tengáis todo funcionando como es debido, de aquí que diga lo de "a pelo".</p>
<p>Instalaréis todo a partir de las páginas oficiales, tal como, creo, debería de ser siempre (y dejarse estar de mierdas prefabricadas).</p>
<p>Antes de empezar quiero dejar claro que ni soy de Microsoft, ni de Apache, ni de MySQL, ni de PHP; así que si tenéis algún problema no soy la persona a quién deberéis preguntar.</p>
<p>La metodología que explicaré a continuación la he utilizado anteriormente con éxito en múltiples máquinas y en varios sistemas operativos además de la instalación que realizo en una máquina virtual mientras os explico este tutorial paso por paso.</p>
<p>El proceso lo voy a realizar desde Windows 7 x64, pero como he dicho lo he tenido funcionando en varios sistemas operativos sin problemas:</p>
<ul>
<li>Windows XP x86</li>
<li>Windows 7 x64 y x86</li>
<li>Windows 8 x64</li>
<li>Windows 8.1 x64</li>
</ul>
<p>Como podéis ver, en la versión 32 bits de windows 8 no lo he probado pero, como digo, debería funcionar (me pregunto quién corre un Win8 a 32 bits).</p>
<p>En cuanto a las versiones de software, yo personalmente recuerdo haber probado, al menos:</p>
<ul>
<li>Apache 2.0, 2.2 y 2.4</li>
<li>MySQL 5.5</li>
<li>PHP 5.3, 5.4, 5.5 y 5.6</li>
</ul>
<p>De hecho yo en mi ordenador tengo todas esas versiones de PHP instaladas pero, por motivos obvios, en este tutorial voy a utilizar la última versión de apache y las dos últimas versiones de PHP (el mínimo necesario para poder enseñaros cómo configurar múltiples versiones por virtualhost).</p>
<p>Todo ello utilizando las versiones de 64 bits, pero procuraré poneros los enlaces actuales para las versiones de 32 bits.</p>
<blockquote><p>Antes de empezar es importantísimo que comprobéis que tenéis todas las actualizaciones del sistema al día. Especialmente interesa tener <em>.NET Framework</em> instalado y actualizado para poder correr cualquiera de las aplicaciones que vamos a instalar. En mi caso la última actualización fue .NET Framework 4.5.2.</p></blockquote>
<p><a id="more"></a><a id="more-2326"></a></p>
<h3><a id="user-content-estructura-de-la-instalación" class="anchor" href="#estructura-de-la-instalaci%C3%B3n"></a>Estructura de la instalación</h3>
<p>Podéis escoger instalar cada cosa donde os dé la gana, pero procurad tenerlo en cuenta a la hora de configurar cada cosa.</p>
<p>Para hacer las cosas sencillas y por tenerlo todo ordenado yo siempre he seguido esta estructura de directorios:</p>
<pre><code>C:\httpd\apache -&gt; Apache 2.4
C:\httpd\phpXX  -&gt; Cada una de las versiones de PHP
C:\httpd\www    -&gt; Directorio raíz de todos mis proyectos en desarrollo
</code></pre>
<p>MySQL dejo que se instale donde quiera ya que no me preocupa tener copia de sus ficheros. Evidentemente hago copia de seguridad de las bases de datos pero no es el tema que nos concierne ahora.</p>
<h3><a id="user-content-instalando-apache" class="anchor" href="#instalando-apache"></a>Instalando Apache</h3>
<p>Desde hace relativamente poco la descarga de binarios de Apache ya no se realiza desde el sitio oficial. En su lugar ellos mismos te recomiendan varios sites alternativos desde los que efectuar la descarga.</p>
<p>Podéis ver esto <a href="http://ftp.cixug.es/apache//httpd/binaries/win32/">desde cualquiera de los mirrors de descarga de apache, bajo <code>binaries/win32</code></a>.</p>
<p>Yo personalmente recomiendo <a href="http://www.apachelounge.com/">ApacheLounge</a> y os guiaré para descargar desde ahí los ficheros.</p>
<p>Os guiaré, pero de todos modos pondré los enlaces directos a los ficheros que yo he utilizado (no os lo recomiendo ya que sacan versiones nuevas constantemente).</p>
<p>Entrad en ApacheLounge y seguid estos pasos para descargar todo lo necesario:</p>
<ul>
<li>Id a <a href="http://www.apachelounge.com/download/">descargas</a>. En la barra lateral veréis que pone "VC11" y "VC10", eso es la versión necesaria del compilador de Visual C++ proporcionado por Microsoft.</li>
<li>Descargad la versión que os interese de Apache, en mi caso descargo la versión <a href="http://www.apachelounge.com/download/VC11/binaries/httpd-2.4.12-win64-VC11.zip">2.4.12 Win64 desde VC11</a>.</li>
<li>Dependiendo de la versión que hayáis descargado tenéis que descargar el compilador de C++. Veréis que está enlazado cerca de la misma descarga de Apache. En mi caso descargo <a href="http://www.microsoft.com/en-us/download/details.aspx?id=30679">VC11 vcredist_x64/86.exe</a> asegurándome de marcar la casilla <code>VSU_4\vcredist_x64.exe</code> ya que estoy descargando para 64 bits.</li>
<li>Descargad también el módulo de apache <code>mod_fcgid</code>. En el caso de Apache 2.4 los módulos vienen todos en un mismo zip así que en mi caso descargo <a href="http://www.apachelounge.com/download/VC11/modules/modules-2.4-win64-VC11.zip">modules-2.4-win64-VC11.zip</a>.</li>
</ul>
<p>Ahora que ya tenemos todo lo necesario en cuanto a Apache se refiere, procederemos a instalarlo.</p>
<p>Instalad primero VC10 (u 11) ya que es requisito indispensable para que Apache funcione.</p>
<p>Una vez instalado, descomprimid Apache y movedlo donde lo queráis instalar. En mi caso descomprimo apache en <code>C:\httpd\apache</code> de modo que accediendo a dicho directorio me queda el contenido del .zip (múltiples directorios y ficheros, entre ellos <code>INSTALL.txt</code> con detalles sobre cómo instalar Apache).</p>
<p>Como en mi caso no quiero utilizar el directorio <code>htdocs</code> que viene dentro del directorio de apache creo ahora el directorio <code>C:\httpd\www</code>.</p>
<p>Descomprimid también el módulo <code>mod_fcgid</code>. Os interesa únicamente el fichero <code>mod_fcgid.so</code> que desplazaréis dentro del directorio <code>modules</code> del directorio raíz de apache, en mi caso <code>C:\httpd\apache\modules</code> quedando <code>C:\httpd\apache\modules\mod_fcgid.so</code> listo para ser cargado por apache.</p>
<p>Hecho esto necesitáis configurar Apache para indicarle el directorio donde lo habéis ubicado. Para ello abrid el fichero <code>C:\httpd\apache\conf\httpd.conf</code> con el bloc de notas (o con vuestro editor de código favorito) —huelga decir que editar ese fichero con Word o WordPad sería una idiotez.</p>
<p>Cerca de la línea 37 encontraréis:</p>
<pre><code>ServerRoot "C:/Apache24"
</code></pre>
<p>Debéis cambiarlo a vuestra ubicación que siguiendo esta guía sería:</p>
<pre><code>ServerRoot "C:/httpd/apache"
</code></pre>
<p>Para ir más rápido, buscad todas las coincidencias en el documento de <code>C:/Apache24</code> y reemplazadlas con vuestra ubicación de instalación. Esto debería de reemplazar varias cosas como el <code>DocumentRoot</code> o la ubicación de los <code>cgi-bin</code>.</p>
<p>Dado que, en mi caso, el <code>DocumentRoot</code> lo quiero en otra ubicación, lo cambio en los dos sitios donde requiere (líneas 242 y 243 aproximadamente) a <code>C:\httpd\www</code>.</p>
<p>En esa misma configuración de <code>Directory</code> (cerca de la línea 243) debéis aseguraros de que se pueden ejecutar scripts cgi, dado que utilizaréis fastcgi para ejecutar PHP. Para ello debéis añadir <code>ExecCGI</code> detrás de las opciones, quedando esa línea así:</p>
<pre><code>Options Indexes FollowSymlinks ExecCGI
</code></pre>
<p>Ahora, cerca de la línea 176, cuando terminan de cargar todos los módulos debéis añadir el módulo <code>mod_fcgid</code> tal que así:</p>
<pre><code>LoadModule fcgid_module modules/mod_fcgid.so
</code></pre>
<p>También sería un buen momento para que revisárais qué módulos de los que hay comentados os interesa tener habilitados para descomentarlos (como el típico <code>mod_rewrite</code>).</p>
<p>Para avanzar faena, cambiad <code>DirectoryIndex</code> para que coja ficheros php por defecto:</p>
<pre><code>DirectoryIndex index.php index.html index.htm
</code></pre>
<p>Al final de todo del documento añadid las siguientes líneas:</p>
<pre><code># 200MB of file upload limit
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
</code></pre>
<p>El último trozo está comentado a propósito, ya que instalaremos y probaremos Apache antes de instalar PHP.</p>
<p>Ya lo tenéis todo listo, guardad el documento e id a ejecutar Apache. Para ello abrid un terminal (cmd o PowerShell, tanto da) y ejecutad lo siguiente:</p>
<pre><code>cd C:\httpd\apache\bin
</code></pre>
<p>Ahora que estáis en el directorio de ejecutables de Apache ejecutadlo para ver si arranca:</p>
<pre><code>.\httpd.exe
</code></pre>
<blockquote><p>Ojo! Algunas aplicaciones como Skype utilizan el puerto 80 si ven que no está ocupado. Por ello es recomendable que cerréis cualquier aplicación que tengáis corriendo antes de ejecutar Apache. Si no lo hacéis simplemente os saltará un error indicando que dicho puerto está ocupado.</p></blockquote>
<p>Si todo ha ido bien únicamente os aparecerá una alerta indicando que no se ha indicado un <code>ServerName</code>. Sino os mostrará claramente el error y deberéis de arreglarlo. En mi caso mientras hacía este tutorial olvidé crear el directorio <code>www</code> y me saltó este error:</p>
<pre><code>Syntax error on line 243 of C:/httpd/apache/conf/httpd.conf:
DocumentRoot must be a directory
</code></pre>
<p>Utilizando vuestro navegador podéis acceder a <a href="http://localhost">http://localhost</a> y comprobar que el servidor funciona correctamente.</p>
<p>Perfecto, pero no hemos instalado Apache. Sólo hemos comprobado que funcionaba correctamente antes de instalarlo.</p>
<p>Para instalarlo debéis ejecutar un terminal con derechos de administrador. Una vez abierta y habiendo accedido a <code>C:\httpd\apache\bin</code> ejecutad:</p>
<pre><code>.\httpd.exe -k install
</code></pre>
<p>Para hacer que <code>ApacheMonitor</code> se ejecute cuando arranquéis el ordenador únicamente tenéis que crearle un acceso directo en la sección <code>Inicio</code> del menú Inicio (un poco redundante, sí).</p>
<p><a href="http://www.racotecnic.com/wp-content/uploads/2015/03/apache_monitor.png"><img src="http://www.racotecnic.com/wp-content/uploads/2015/03/apache_monitor.png" alt="En català no és pas tant redundant, oi?" width="233" height="77" class="aligncenter size-full wp-image-2334" /></a></p>
<p>Hecho. Si os da el gusanillo reiniciad el ordenador y acceded de nuevo a <a href="http://localhost">http://localhost</a> para comprobar que todo sigue funcionando OK.</p>
<h3><a id="user-content-instalando-php" class="anchor" href="#instalando-php"></a>Instalando PHP</h3>
<p>Id a la <a href="http://windows.php.net/download/">página de descargas de PHP para windows</a> y descargad todas las versiones de PHP que queráis tener instaladas.</p>
<p>Al descargarlas únicamente debéis tener en cuenta la arquitectura que estéis instalando (en mi caso x64) y que <strong>Apache es Thread Safe</strong>.</p>
<p><a href="https://instagram.com/elboletaire/"><img src="http://www.racotecnic.com/wp-content/uploads/2015/03/thread_safe.jpg" alt="Thread safe" width="612" height="612" class="aligncenter size-full wp-image-2332" /></a></p>
<p>En mi instalación descargo <a href="http://windows.php.net/downloads/releases/php-5.6.6-Win32-VC11-x64.zip">PHP 5.6 (5.6.6) VC11 x64 Thread Safe (2015-Feb-19 01:45:29)</a> y <a href="http://windows.php.net/downloads/releases/php-5.5.22-Win32-VC11-x64.zip">PHP 5.5 (5.5.22) VC11 x64 Thread Safe (2015-Feb-19 01:38:01)</a>.</p>
<p>Una vez tenéis todo descargado, lo descomprimís y lo movéis hacia el directorio <code>C:\httpd</code>. Poned nombres cortos a los directorios:</p>
<pre><code>C:\httpd\php56
C:\httpd\php55
</code></pre>
<p>Ya está PHP instalado, pero no configurado.</p>
<p>Si queréis poder ejecutar <code>php.exe</code> desde vuestro terminal deberéis añadir a la variable de entorno <code>PATH</code> el directorio de la versión que queráis utilizar. En caso de hacerlo también deberéis crear una nueva variable de entorno <code>PHPRC</code> con el mismo directorio que habéis añadido al <code>PATH</code>.</p>
<p>Ahora tenéis que entrar en cada instalación de php que habéis instalado y renombrar el fichero <code>php.ini-development</code> a <code>php.ini</code> y hacer los cambios que indicaré a continuación.</p>
<p>Buscad el siguiente trozo:</p>
<pre><code>; On windows:
; extension_dir = "ext"
</code></pre>
<p>Y descomentad la línea de <code>extension_dir</code>, quedando así:</p>
<pre><code>; On windows:
extension_dir = "ext"
</code></pre>
<p>Buscad el trozo donde estén todas las extensiones y descomentad las que os interesen. Las encontraréis en este formato:</p>
<pre><code>;extension=php_bz2.dll
;extension=php_curl.dll
;extension=php_fileinfo.dll
;[...]
</code></pre>
<p>Estas tres primeras que he puesto yo seguramente os interesará activarlas, al igual que <code>gd2</code>, <code>gettext</code>, <code>intl</code>, <code>mbstring</code>, <code>exif</code>, <code>mysql</code>, <code>mysqli</code>, <code>pdo_mysql</code> y/u <code>openssl</code>.</p>
<p>Hecho esto en todos los ficheros <code>php.ini</code> de nuestras instalaciones, es momento de acabar de configurar apache para que ejecute ficheros php con nuestra versión por defecto de PHP.</p>
<p>Volved al fichero <code>httpd.conf</code> de apache y al final del documento, descomentad:</p>
<pre><code># Set PHP 5.6 as default php-cgi executable
AddHandler fcgid-script .php
FcgidInitialEnv PHPRC "C:/httpd/php56"
FcgidWrapper "C:/httpd/php56/php-cgi.exe" .php
</code></pre>
<p>Utilizando <code>ApacheMonitor</code> reiniciad Apache. Cread un fichero <code>index.php</code> en el directorio <code>www</code> con un <code>phpinfo</code> dentro:</p>
<div class="highlight highlight-php">
<pre><span class="pl-s2"><span class="pl-k">&lt;</span>?<span class="pl-c1">php</span> <span class="pl-s3">phpinfo</span>(); </span><span class="pl-pse"><span class="pl-s2">?</span>&gt;</span></pre>
</div>
<p>Y acceded a <a href="http://localhost">http://localhost</a> para verificar que PHP funciona correctamente.</p>
<h3><a id="user-content-utilizando-distintas-versiones-de-php-en-nuestros-servidores-virtuales" class="anchor" href="#utilizando-distintas-versiones-de-php-en-nuestros-servidores-virtuales"></a>Utilizando distintas versiones de PHP en nuestros servidores virtuales</h3>
<p>Ahora que ya tenéis Apache y la versión de PHP por defecto corriendo, llega el momento de explicaros cómo cambiar entre versiones de PHP.</p>
<p>Para utilizar esta metodología es necesario el uso de servidores virtuales, así que en el fichero <code>httpd.conf</code> descomentáis la línea donde carga el fichero de VirtualHosts:</p>
<pre><code># Virtual hosts
Include conf/extra/httpd-vhosts.conf
</code></pre>
<p>Descomentada esa línea abrís el fichero <code>conf/extra/httpd-vhosts.conf</code> en cuestión y creáis un par de servidores virtuales que irán con distintas versiones de PHP.</p>
<p>Para el ejemplo crearéis dos servidores virtuales <code>php55.loc</code> y <code>php56.loc</code>, así que lo primero que haréis es crear sus directorios:</p>
<pre><code>C:\httpd\www\php55.loc
C:\httpd\www\php56.loc
</code></pre>
<p>Y en el fichero <code>httpd-vhosts.conf</code> previamente abierto creamos los servidores virtuales:</p>
<pre><code>&lt;VirtualHost *:80&gt;
    # Indicamos que queremos utilizar PHP 5.5
    FcgidInitialEnv PHPRC "C:/httpd/php55"
    FcgidWrapper "C:/httpd/php55/php-cgi.exe" .php

    DocumentRoot "C:/httpd/www/php55.loc"
    ServerName php55.loc
    ServerAlias www.php55.loc
    ErrorLog "logs/php55.loc-error.log"
    CustomLog "logs/php55.loc-access.log" common
&lt;/VirtualHost&gt;
&lt;VirtualHost *:80&gt;
    # Dado que utilizo PHP 5.6 por defecto no me es
    # necesario especificar nada a fastcgi

    DocumentRoot "C:/httpd/www/php56.loc"
    ServerName php56.loc
    ServerAlias www.php56.loc
    ErrorLog "logs/php56.loc-error.log"
    CustomLog "logs/php56.loc-access.log" common
&lt;/VirtualHost&gt;
</code></pre>
<p>Para ir acabando añadid al fichero hosts de sistema (<code>C:\Windows\System32\drivers\etc\hosts</code>) los dominios de los servidores virtuales:</p>
<pre><code>127.0.0.1    php55.loc www.php55.loc
127.0.0.1    php56.loc www.php56.loc
</code></pre>
<p>Copiad el fichero <code>index.php</code> que hemos creado antes en el directorio <code>www</code> a cada directorio de cada host virtual.</p>
<p>Finalmente reiniciad apache utilizando ApacheMonitor y acceded con vuestro navegador a <a href="http://php55.loc">http://php55.loc</a> y <a href="http://php56.loc">http://php56.loc</a> para verificar que todo ha funcionado correctamente.</p>
<p>Estoy seguro de que sí :)</p>
<p><a href="http://www.racotecnic.com/wp-content/uploads/2015/03/php.loc_.png"><img src="http://www.racotecnic.com/wp-content/uploads/2015/03/php.loc_-1024x732.png" alt="php.loc" class="aligncenter size-large wp-image-2336" /></a></p>
<h3><a id="user-content-instalar-mysql" class="anchor" href="#instalar-mysql"></a>Instalar MySQL</h3>
<p>Descargad el <a href="http://dev.mysql.com/downloads/windows/installer/5.6.html">instalador de MySQL</a> y procurad instalar lo que os interese (con el servidor ya basta).</p>
<p>Podéis optar por escoger la instalación por defecto para desarrolladores (os instalará cosas que no necesita un desarrollador PHP habitualmente), o bien podéis instalar los paquetes que queráis manualmente.</p>
<p>En el caso de mi instalación escojo únicamente el servidor de MySQL en su versión x64.</p>
<p>Y para instalar, "siguiente, siguiente, siguiente"...</p>
<h3><a id="user-content-enlaces-útiles-y-referencias" class="anchor" href="#enlaces-%C3%BAtiles-y-referencias"></a>Enlaces útiles y referencias</h3>
<p>Me gustaría enlazar a las referencias pero no puedo ya que hace demasiado tiempo que ando haciendo todo este proceso de memoria y no recuerdo exactamente de dónde saqué la información. Sé que al final lo hice funcionar gracias a alguien que explicaba cómo correr FastCGI en Linux, pero ni de coña lograría encontrar el enlace original.</p>
<p>A parte de esto (que lo digo en parte para que seáis conscientes de que todo se puede encontrar buscándolo), os adjunto los ficheros de configuración resultantes tras la configuración explicada en este tutorial.</p>
