---
layout: post
status: publish
published: true
title: Cambiar máquina virtual de Java (JVM) en Eclipse 3.4.x
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Hace un tiempo expliqué</a> cómo cambiar la máquina virtual de
  java utilizada por defecto en Eclipse. Ésta ha cambiado en la versión 3.4 respecto
  a la que yo expliqué (≤ 3.2)."
wordpress_id: 520
wordpress_url: http://racotecnic.com/?p=520
date: '2009-05-03 16:45:53 +0200'
date_gmt: '2009-05-03 15:45:53 +0200'
categories:
- Programació
- Linux
- Aplicacions
- Mac
- Windows
tags:
- Eclipse
- Java
---

<a title="Ver artículo" href="http://racotecnic.com/2009/01/cambiar-maquina-virtual-de-java-en-eclipse/" target="_self">Hace un tiempo expliqué</a> cómo cambiar la máquina virtual de java utilizada por defecto en <a title="Visitar página oficial de Eclipse" href="http://www.eclipse.org" target="_blank">Eclipse</a>.

Ésta ha cambiado en la versión 3.4 respecto a la que yo expliqué (≤ 3.2). En
lugar de utilizar un fichero llamado "java_home" para indicar la máquina virtual
a utilizar se utiliza un fichero general de configuración, llamado `eclipse.ini`.
Éste se encuentra en la carpeta raíz de vuestro eclipse.

Para indicar la máquina virtual debéis poner `-vm` seguido de un salto de línea
y la ruta de la máquina virtual de java deseada (en mi caso
`/usr/lib64/jvm/java-6-sun/bin/java`).

En linux y mac:

~~~
-vm
/usr/lib64/jvm/java-6-sun/bin/java**
-showsplash
org.eclipse.platform
-framework
plugins/org.eclipse.osgi_3.4.3.R34x_v20081215-1030.jar
-vmargs
-Dosgi.requiredJavaVersion=1.5
-Xms40m
-Xmx512m
-XX:MaxPermSize=256m
~~~

En windows*:

~~~
-vm
C:\Java\JDK.5\bin\javaw.exe**
-showsplash
org.eclipse.platform
-framework
plugins/org.eclipse.osgi_3.4.3.R34x_v20081215-1030.jar
-vmargs
-Dosgi.requiredJavaVersion=1.5
-Xms40m
-Xmx512m
-XX:MaxPermSize=256m
~~~

_* Ignorad a partir de `-showsplash` cambiando la ruta por la que os convenga._

<blockquote>
  Página de referencia:
  <ul>
    <li><a title="Ir a la página original" href="http://wiki.eclipse.org/Eclipse.ini" target="_blank">Eclipsepedia - Eclipse.ini</a></li>
  </ul>
</blockquote>
