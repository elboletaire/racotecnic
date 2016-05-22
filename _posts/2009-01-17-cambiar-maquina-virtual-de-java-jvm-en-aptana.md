---
layout: post
status: publish
published: true
title: Cambiar máquina virtual de Java (JVM) en Aptana
class: no-line-numbers
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 132
wordpress_url: http://racoinformatic.underave.net/?p=132
date: '2009-01-17 16:17:17 +0100'
date_gmt: '2009-01-17 15:17:17 +0100'
categories:
- Programació
- Linux
- Aplicacions
tags:
- Java
- Configurar aplicació
- Aptana
---

Hace poco expliqué <a title="Leer entrada" href="2009/01/cambiar-maquina-virtual-de-java-en-eclipse/" target="_self">cómo cambiar la máquina virtual de Java que utiliza Eclipse</a> al ejecutarse. Hoy explicaré cómo hacerlo en Aptana.

Aptana necesita Sun Java v. 1.5 ó superior para funcionar correctamente y, al igual que eclipse en Linux, por defecto no suele detectar la máquina virtual de Java correctamente. Para solucionarlo no tenéis más que añadirle el parámetro "-vm" (virtual machine) con la ruta a vuestra máquina virtual preferida al ejecutar aptana:

    user@host:~$ /usr/local/aptana/AptanaStudio -vm /usr/lib/jvm/java-6-sun-1.6.0.10/jre/bin/java

Cambiad la carpeta "/java-6-sun-1.6.0.10/" por la que corresponda en vuestro sistema.

Recordad que para ver cuáles tenéis disponibles podéis hacerlo desde consola mostrando el contenido de la carpeta jvm:

    user@host:~$ ls /usr/lib/jvm/

En la <a title="Cómo isntalar aptana (en inglés)" href="http://www.aptana.com/docs/index.php/Installing_Aptana_on_Linux" target="_blank">página web de Aptana</a> explican cómo cambiar la máquina virtual añadiendo una línea "export" a vuestro fichero ejecutable:

    export JAVA_HOME=/usr/lib/jvm/java-6-sun-1.6.0.10/bin/java
    export MOZILLA_FIVE_HOME=/usr/lib/xulrunner
    /usr/local/aptana/AptanaStudio

Pero no funciona, o al menos a mi no me funciona. Si alguien sabe el porqué agradeceré que me lo comente ;)
