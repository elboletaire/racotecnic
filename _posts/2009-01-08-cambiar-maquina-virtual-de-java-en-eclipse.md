---
layout: post
status: publish
published: true
title: Cambiar máquina virtual de Java (JVM) en Eclipse ≤ 3.2.x
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 78
wordpress_url: http://racoinformatic.underave.net/?p=78
date: '2009-01-08 14:07:48 +0100'
date_gmt: '2009-01-08 13:07:48 +0100'
categories:
- Programació
- Linux
- Aplicacions
tags:
- Eclipse
- Java
- Configurar aplicació
---
<blockquote>Este post se refiere a versiones de eclipse anteriores a la 3.2, si deseas cambiar la máquina virtual de java para la versión 3.4.x <a title="Cambiar máquina virtual de Java (JVM) en Eclipse 3.4.x" href="http://racotecnic.underave.net/2009/05/cambiar-maquina-virtual-de-java-jvm-en-eclipse-34x/" target="_self">haz clic aquí</a>.</blockquote>

Posteo aquí una ayuda rápida para aquellos que necesiten cambiar / añadir su máquina virtual preferida a <a title="Eclipse" href="http://www.eclipse.org/" target="_blank">Eclipse</a>. Por defecto Eclipse (en Linux al menos..) <em>no viene bien configurado</em> (normalmente pasa con Java6) para cargar la máquina virtual Java de Sun y si no lo configuramos no deja de dar errores extraños (pero carga la aplicación igualmente).

Para arreglarlo es tan sencillo como editar el fichero "java_home" que se encuentra en la carpeta /etc/eclipse añadiendo la ubicación de la máquina virtual que queramos  por defecto (en mi caso /usr/lib/jvm/java-6-sun-1.6.0.10/) en la primera línea (para evitar que cargue máquinas virtuales que no tengamos instaladas..):

user@host:~$ sudo nano /etc/eclipse/java_home

# This file determines the search order the Eclipse Platform uses to find a
# compatible JAVA_HOME. This setting may be overridden on a per-user basis by
# altering the JAVA_HOME setting in ~/.eclipse/eclipserc.

#/usr/lib/jvm/java-7-icedtea
######## LÍNEA INSERTADA ########
/usr/lib/jvm/java-6-sun-1.6.0.10/
#################################
/usr/lib/jvm/java-gcj
/usr/lib/kaffe/pthreads
# Como he dicho no está bien añadido (para Java 6), pues como vemos en las dos
# siguientes líneas sí aparece, pero evidentemente no funciona
/usr/lib/jvm/java-6-sun
/usr/lib/jvm/java-1.5.0-sun
/usr/lib/j2se/1.5
/usr/lib/j2se/1.4
/usr/lib/j2sdk1.5-ibm
/usr/lib/j2sdk1.4-ibm
/usr/lib/j2sdk1.6-sun
/usr/lib/j2sdk1.5-sun
/usr/lib/j2sdk1.4-sun

¡Y listo! Reiniciamos Eclipse y debería empezar a funcionar correctamente ^^
