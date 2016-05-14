---
layout: post
status: publish
published: true
title: Instalar zsh en Windows con "oh my zsh" y enlace en menús contextuales utilizando
  cygwin
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Posh-git mola pero si, como yo, sois algo amantes
  de linux y encima habéis probado zsh sabréis que zsh mola mucho más. Podemos instalar
  zsh en windows utilizando cygwin de manera bastante sencilla y con un par de
  cambios en el registro de windows tendremos un enlace en el menú contextual para
  abrir zsh en cualquier directorio rápidamente."
wordpress_id: 2154
wordpress_url: http://www.racotecnic.com/?p=2154
date: '2013-12-07 01:09:15 +0100'
date_gmt: '2013-12-07 00:09:15 +0100'
categories:
- Programació
- Windows
- Administració
tags:
- Shell
- bash
- zsh
- cygwin
- minTTY
- oh my zsh
---

<a title="github.com/dahlbyk/posh-git" href="https://github.com/dahlbyk/posh-git" rel="external nofollow">Posh-git</a> mola pero si, como yo, sois algo amantes de linux y encima habéis probado zsh sabréis que <b>zsh mola mucho más</b>.

<a href="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-23.08.16.png"><img src="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-23.08.16.png" alt="zsh under windows using cygwin" width="644" height="236" class="aligncenter size-full wp-image-2242" style="height:auto" /></a>

Podemos **instalar zsh en windows** utilizando cygwin de manera bastante sencilla y <b>con un par</b> de cambios en el registro de windows tendremos un enlace en el menú contextual para abrir zsh en cualquier directorio rápidamente.

<a style="display: block; text-align: center;" href="http://www.racotecnic.com/wp-content/uploads/2013/12/obre-zsh.png"><img class="aligncenter size-full wp-image-2163" alt="obre zsh aquí" src="http://www.racotecnic.com/wp-content/uploads/2013/12/obre-zsh.png" width="433" height="131" /></a>

<a id="more"></a><a id="more-2154"></a>

<b>Antes de empezar tenéis que tener en cuenta lo siguiente</b>: a la hora de crear el enlace del menú contextual hay que crear dos entradas en el registro de windows, una para cuando hacemos clic derecho sobre un directorio seleccionado (accederemos a dicho directorio) y la otra para cuando hacemos clic derecho sin tener un directorio seleccionado (accederemos al directorio actual).

¿Porqué os digo esto? Porque para poder crear la primera entrada en el registro (hacer clic derecho sobre un directorio seleccionado) **sólo podemos hacerlo si instalamos la versión de cygwin de 32 bits** ya que no hay manera de hacerlo si no es con el paquete `chere`.

Es decir que si no queréis dicha opción del menú contextual podéis optar por descargar la versión de 64 bits en lugar de la de 32<del>, aunque no os lo recomiendo ya que yo no he logrado hacer funcionar del todo bien lo del menú contextual en dicha versión (y el tutorial está enfocado a la versión de 32 bits, vamos que <em>me limpio las manos</em> con la de 64)</del>. Chere ya está disponible para 64 bits así que no tendréis problema si lo hacéis con el instalador de x64.

<a title="Descargar cygwin x32" href="http://cygwin.com/install.html" rel="nofollow">Descargad cygwin</a> e instalad con normalidad (siguiente, siguiente...) hasta que lleguéis al listado de paquetes a instalar.

<a style="display: block; text-align: center;" href="http://www.racotecnic.com/wp-content/uploads/2013/12/packages.png"><img class="aligncenter size-full wp-image-2156" alt="cygwin packages" src="http://www.racotecnic.com/wp-content/uploads/2013/12/packages.png" width="546" height="399" /></a>

Cuando lleguéis al listado utilizad el buscador y marcad para descargar los siguientes paquetes:

<ul>
  <li><b>chere</b> necesario para poder abrir la ubicación del directorio seleccionado. Ubicado en «Shells». No es necesario que la instaléis si no queréis abrir el menú contextual al hacer clic derecho sobre un directorio.</li>
  <li><b>zsh</b> ubicado en «Shells».</li>
  <li><b>curl</b> o <b>wget</b> cualquiera nos servirá para instalar oh-my-zsh. Ambos ubicados en «Web».</li>
  <li><b>git</b> necesario para instalar oh-my-zsh. Ubicado en «Devel».</li>
  <li><b>ncurses</b> necesario desde cygwin 1.7, ya que no viene incluido con el sistema base. Este paquete tiene ejecutables de sistema necesarios por el instalador de oh-my-zsh.</li>
</ul>

Y terminad la instalación (siguiente, siguiente...).

Ahora vamos a <a href="https://github.com/robbyrussell/oh-my-zsh" title="Página del proyecto oh-my-zsh" rel="external nofollow">instalar oh-my-zsh</a>. Para ello abrid una consola de cygwin. Si durante la instalación desmarcasteis el checkbox para añadir el acceso directo podéis ejecutar la consola accediendo a la carpeta de instalación de cygwin y ejecutando el fichero `Cygwin.bat`.

<a href="http://www.racotecnic.com/wp-content/uploads/2013/12/curl.png" style="display:block;text-align:center"><img src="http://www.racotecnic.com/wp-content/uploads/2013/12/curl.png" alt="bash init" width="595" height="232" class="aligncenter size-full wp-image-2172" /></a>

En la consola ejecutad lo siguiente:

~~~bash
# Si hemos instalado curl
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
# Si hemos instalado wget
wget --no-check-certificate https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O - | sh
~~~

Esto instalará oh-my-zsh en vuestro directorio `$HOME` de cygwin (exactamente igual que en linux).

Ahora que tenemos oh-my-zsh instalado pondremos zsh como la consola por defecto para nuestro usuario.

Para ello hay que modificar el fichero `/etc/passwd`. Podéis hacerlo con vuestro editor favorito (a.k.a. sublime text, geany, notepad++...) accediendo al directorio de instalación de cygwin/etc y modificando el fichero passwd o si lo preferís podéis hacerlo mediante la propia consola de cygwin, utilizando el editor vi:

~~~bash
vi /etc/passwd
~~~

Buscáis vuestro usuario y al final de la línea substituís `/bin/bash` por `/bin/zsh` .

Si ejecutáis de nuevo el terminal de cygwin debería mostraros una consola de zsh como esta:

<a href="http://www.racotecnic.com/wp-content/uploads/2013/12/zsh-init.png"><img src="http://www.racotecnic.com/wp-content/uploads/2013/12/zsh-init.png" alt="zsh-init" width="595" height="232" class="aligncenter size-full wp-image-2174" /></a>

<b>Ojo:</b> Si habéis ejecutado la consola utilizando `Cygwin.bat` tendréis que modificar dicho fichero antes de ejecutarlo para modificar ahí el terminal por defecto, ya que éste fichero ignora la configuración en `/etc/passwd`. Para ello, editadlo y reemplazad `bash` por `zsh`, dejándolo así:

    @echo off

    C:
    chdir C:\cygwin\bin

    zsh --login -i

Ya tenemos zsh instalado y corriendo como si de una instalación de linux se tratara. Podemos modificar el fichero `.zshrc` para cambiar opciones como el tema o los plugins que zsh debería cargar al iniciar. A mi me gusta especialmente <a href="http://www.racotecnic.com/2013/12/tema-de-oh-my-zsh-inspirado-en-af-magic-y-posh-git/">el tema <del>`af-magic`</del> racotecnic</a>:

<a href="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-21.28.46.png"><img src="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-21.28.46.png" alt="oh my zsh racotecnic theme" width="595" height="334" class="aligncenter size-full wp-image-2230" /></a>

Bien, ahora que tenemos el terminal configurado es hora de añadir el acceso directo en nuestro menú contextual.

Si habéis instalado cygwin en la raíz de C:\ podéis <a href="http://www.racotecnic.com/wp-content/uploads/2013/12/minTTY_zsh.zip">descargar este fichero</a> para **instalar rápidamente el acceso directo del menú contextual. Ojo que está en catalán** así que si queréis cambiarlo tendréis que abrirlo con un editor de texto y cambiar el «Obre zsh» por «Abrir zsh».

Si queréis ver paso por paso cómo he creado el acceso directo en el menú contextual seguid los pasos que os describo a continuación. En caso contrario, ya habéis terminado de instalar zsh con oh-my-zsh en windows :D.

#### Para los curiosos

Ejecutad el editor de registro de windows (windows + R y luego `regedit`) y desplegad el primer registro `HKEY_CLASSES_ROOT`.

<a href="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-06-21.41.20.png"><img src="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-06-21.41.20.png" alt="HKEY_CLASSES_ROOT" width="670" height="384" class="aligncenter size-full wp-image-2180" style="height:auto" /></a>

En él buscad el subregistro `Directory`. De aquí nos interesan dos registros: `Background` y `shell`. En el primero crearemos el registro para abrir un terminal en el directorio actual y el segundo nos servirá para cuando hagamos clic derecho sobre un directorio (y siempre que éste esté seleccionado).

Desplegad `Background` y en `shell` haced clic derecho / Nuevo / Clave y le ponéis un nombre como `minTTYzsh`. En la columna de la derecha hacéis doble clic sobre `(Predeterminado)` y escribís el texto que queráis mostrar en el menú contextual, yo tengo puesto «Obre zsh».

<a href="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-00.16.59.png"><img src="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-00.16.59.png" alt="minTTYzsh key" width="604" height="285" class="aligncenter size-full wp-image-2197" /></a>

Si queréis añadirle un icono a la opción del menú desplegable, en la columna de la derecha hacéis clic derecho / Nuevo / Valor de cadena y como nombre le ponéis «Icon». Hacéis doble clic sobre él e indicáis la ruta hacia un icono o un ejecutable (.exe) que contenga iconos. Para indicar el índice de un icono (en caso de que el .ico o el .exe tenga múltiples iconos) tenéis que indicarlo separado de una coma: `C:\\cygwin\\cygwin.ico,1`.

En nuestro caso indicaremos el icono de mintty, ya que es el ejecutable que utilizaremos como consola: `C:\\cygwin\\bin\\mintty.exe`

<a href="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-00.21.35.png"><img src="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-00.21.35.png" alt="mintty icon" width="645" height="269" class="aligncenter size-full wp-image-2199" /></a>

Haced clic derecho en el escritorio y podréis comprobar cómo aparece ya la opción creada en el menú contextual. Pero dicha opción no tiene comando asociado, así que vamos a creárselo.

En la columa de la izquiera del editor de registro de windows hacéis clic derecho sobre la clave creada anteriormente `minTTYzsh` y seleccionáis Nuevo / Clave y le ponéis como nombre `command`.

Después de hacer esto hacemos doble clic en el nombre de la columna de la derecha, que aparecerá como (Predeterminado). En el editor que nos aparecerá introducimos lo siguiente: `C:\\cygwin\\bin\\mintty.exe --size=120,40 /bin/env CHERE_INVOKING=1 /bin/zsh -l`

<a href="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-00.26.44.png"><img src="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-00.26.44-1024x259.png" alt="minTTYzsh command" width="1024" height="259" class="aligncenter size-large wp-image-2201" style="height:auto" /></a>

Haced clic derecho de nuevo en el escritorio y comprobad que funciona el enlace del menú contextual. Si habéis seguido los pasos con todo detalle debería de funcionar sin problemas.

<a style="display: block; text-align: center;" href="http://www.racotecnic.com/wp-content/uploads/2013/12/obre-zsh.png"><img class="aligncenter size-full wp-image-2163" alt="obre zsh aquí" src="http://www.racotecnic.com/wp-content/uploads/2013/12/obre-zsh.png" width="433" height="131" /></a>

Para añadir la entrada de registro que nos permitirá abrir la consola en un directorio seleccionado seguid los pasos de antes pero en lugar de crear la clave `minTTYzsh` en `Directory/Background/shell` deberéis crearla directamente en `Directory/shell` y en el momento de indicar el comando a ejecutar tendréis que introducir lo siguiente:

`C:\\cygwin\\bin\\mintty.exe --size=120,40 /bin/env /bin/xhere /bin/zsh '%L'`

En el caso anterior también podríamos haber iniciado la consola indicando `/bin/xhere` pero tengo la sensación que del otro modo es algo más rápido al cargar (notaréis que en este caso al ejecutar el terminal empieza con «`Starting /bin/zsh`»)

El parámetro `--size` lo indico para hacer algo más grande el terminal de minTTY ya que por defecto lo encuentro algo pequeño.

En todo caso, **ya tenéis zsh con oh-my-zsh funcionando bajo windows y con la opción en los menús contextuales** :D

**Update a 10 de enero de 2014:** Acabo de encontrar en github un script en bash que debería instalar los paquetes necesarios en cygwin y configurarlo para que funcione con zsh. No lo he probado pero no pinta nada mal, podéis echarle un ojo desde aquí: <a href="https://github.com/haithembelhaj/oh-my-cygwin" rel="nofollow external">https://github.com/haithembelhaj/oh-my-cygwin</a>.

**Update a 15 de febrero de 2014:** En windows 8.1 he tenido problemas para lograr tener oh-my-zsh funcionando. El terminal estaba escupiendo un montón de código y me daba el error <i>compdef: unknown command or service: git</i> repetidas veces antes de, finalmente, mostrar el prompt. <a href="https://github.com/robbyrussell/oh-my-zsh/issues/630" rel="nofollow external">En este post</a> he encontrado la solución y ha sido tan sencillo como hacer lo siguiente:

~~~bash
# accedemos a nuestro directorio home
cd
# listamos el directorio en busca del fichero .zcompdump
ls -lha
~~~

Seguramente veáis un fichero llamado `.zcompdump-VuestroUsuario`. Lo que está sucediendo es que, por motivos que desconozco, zsh va a buscar ese fichero en lugar de el fichero .zcompdump. Ahora que sabemos el nombre del fichero, solucionemos el problema:

~~~bash
compinit
# zsh compinit: insecure directories, run compaudit for list.
# Ignore insecure directories and continue [y] or abort compinit [n]? y
cat .zcompdump > .zcompdump-VuestroUsuario
~~~

Aseguraros de que `.zcompdump-VuestroUsuario` coincida exactamente con el fichero que antes habéis visto listado. Cerrad el terminal y volved a abrirlo y debería de estar solucionado.

<blockquote>
  **Más información y fuentes:**
  <ul>
    <li><a href="http://unix.stackexchange.com/a/18411/10942" rel="nofollow external">Best way to use a shell with Cygwin in Windows 7 - Unix &amp; Linux Stack Exchange</a></li>
    <li><a href="http://www.iamntz.com/1059/frontend-developer/how-to-use-mintty-with-cygwin-by-default/" rel="nofollow external">How to use Mintty with Cygwin (by default)</a></li>
    <li><a href="http://www.typeof.co/post/a-better-terminal-for-windows" rel="external nofollow">A better terminal for Windows</a></li>
    <li><a href="https://github.com/haithembelhaj/oh-my-cygwin" rel="external nofollow">Oh-my-cygwin</a>
  </ul>
</blockquote>
