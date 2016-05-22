---
layout: post
status: publish
published: true
title: Acceso root a estructura de ficheros SO Android 2.2 en Toshiba Folio 100
class: no-line-numbers
author:
  display_name: manuso245
  login: manuso245
  email: manuso245@gmail.com
author_login: manuso245
author_email: manuso245@gmail.com
wordpress_id: 1859
wordpress_url: http://www.racotecnic.com/?p=1859
date: '2011-03-16 23:18:00 +0100'
date_gmt: '2011-03-16 22:18:00 +0100'
categories:
- Linux
- Administració
- Telefonia
tags:
- Java
- Android
- Ubuntu
- ADB
---

## Requisitos <img class="alignright size-full wp-image-1861" title="android-logo" src="{{ site.url }}/uploads/2011/03/android-logo.jpg" alt="" width="158" height="178" />

<ol>
  <li>Ubuntu 9.10. Testeado por otros usuarios en 10.04</li>
  <li><a href="http://developer.android.com/sdk/index.html">Android SDK y platform-tools</a> concretamente la herramienta <a href="http://developer.android.com/guide/developing/tools/adb.html">ADB</a> (Android Debug Bridge)</li>
  <li>Un dispositivo Android, en mi caso una <a href="http://www.toshiba-multimedia.com/es/journe-tabletas-marcos-digitales/folio100/">Tablet Toshiba Folio 100</a> con Android 2.2 con el SO cambiado (el test se realizó con el <a href="http://dext3r.komodin.org/">TNTModFolio de Dexter</a>)</li>
</ol>

## Definición Conceptual

Nuestro problema principal era que teníamos una web desarrollada en un servidor de test y para acceder a ella necesitábamos modificar el archivo <<<em>hosts</em>>> para añadir una directiva de nombres.

Lo primero que apreciamos en la Tablet de Toshiba fue que no podíamos acceder al market ni a las google apps ya que viene restringido de fábrica. Nos decantamos, así, por instalar un mod del SO desarrollado por Dexter. Estos mods tienen una eficacia y mejoras contrastadas y nos decidimos finalmente por el TNTMod.

El TNTMod te permite tener permisos <em>root </em>en tu dispositivo pero para modificar los archivos de sistema hay que ser un poco más creativo.

El único método que me ha dado resultado es el uso y configuración de ADB, una aplicación estilo <em>putty </em>para acceder mediante <em>Shell </em>o comando típicos como <em>pull </em>o <em>push </em>a los archivos de SO de un dispositivo Android. Mediante ADB es posible conectarse con un terminal a los archivos de sistema y comprobar la ruta del archivo hosts. También permite traértelo al pc local, modificarlo y después volverlo a meter en el sistema de archivos del dispositivo.<a id="more"></a><a id="more-1859"></a>

## Procedimiento

Primero de todo hay que descargar e instalar android SDK (necesitarrás JAVA SDK):

- Descargar tar.gz para Linux
- Extraer en carpeta personal
- Acceder a `/home/carpeta_personal/android-sdk/tools/android`
- Instalar todos paquetes disponibles

Ahora es momento de conectar la Toshiba Folio 100 al PC y hacer lo siguiente...

- Activar el USB DEBUG en Android (<strong><em>Ajustes -> Aplicaciones -> Desarrollo)</em></strong>
- `/home/carpeta_personal/android-sdk/platform-tool/adb devices`
- Nos devolverá una salida de este tipo: <strong><em>???????? No Permissions</em></strong>

Hay que configurar el driver para que reconozca la Tablet:

- Entrar en `/etc/udev/rules.d/`
- Dentro de este directorio tiene que haber un fichero llamado `51-android.rules` o con otro número.
- Editamos este fichero para añadir la siguiente línea:

~~~bash
SUBSYSTEMS=='usb', ATTRS{idVendor}=='0bb4',ATTRS{idProduct}=='0c97', MODE='0666'
~~~

Como, seguramente, no sabremos el idVendor y el idProduct del dispositivo hacemos:

~~~bash
lsusb
~~~

Esto nos mostrará la información de los dispositivos usb conectados.

Seguidamente le damos permisos y reiniciamos el server de ADB:

~~~bash
sudo chmod a+r /etc/udev/rules.d/51-android.rules
sudo ~/android-sdk/tools/adb kill-server
sudo ~/android-sdk/tools/adb start-server
# * daemon not running. starting it now on port 5037 *
# * daemon started successfully *
~/android-sdk/tools/adb devices
# List of devices attached
# HT03JNX00008 device
~~~

Una vez tenemos el dispositivo vamos a acceder a él:

~~~bash
~/android-sdk/tools/adb shell
su
mount
# rootfs / rootfs ro 0 0
# tmpfs /dev tmpfs rw,mode=755 0 0
# devpts /dev/pts devpts rw,mode=600 0 0
# proc /proc proc rw 0 0
# sysfs /sys sysfs rw 0 0
# tmpfs /sqlite_stmt_journals tmpfs rw,size=4096k 0 0
# /dev/block/mtdblock3 /system yaffs2 ro 0 0
# /dev/block/mtdblock5 /data yaffs2 rw,nosuid,nodev 0 0
# /dev/block/mtdblock4 /cache yaffs2 rw,nosuid,nodev 0 0
# /dev/block/mmcblk0p1 /sdcard vfat rw,dirsync,nosuid,nodev,noexec,uid=1000,gid=1000,fmask=0711,dmask=0700,codepage=cp437,iocharset=iso8859-1,utf8 0 0
~~~

Remontamos el FS como rw para poder escribir o hacer pushes:

~~~bash
mount -o remount,rw -t yaffs2 /dev/block/mtdblock3 /system
~~~

**YA TENEMOS ACCESO COMPLETO**

## Cosas a tener en cuenta

Si apagamos el dispositivo habrá que hacer otra vez la parte del mount ya que el dispositivo por defecto monta /system en ro. Si se desea dejar permanentemente en rw modificar reglas de mount.

En todo momento del proceso hay que activar el modo debug de USB en la distro de Android que utilicemos.
<div id="_mcePaste" class="mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow: hidden;"><img class="aligncenter size-full wp-image-1864" title="android" src="{{ site.url }}/uploads/2011/03/android.jpg" alt="" width="570" height="356" /></div>
