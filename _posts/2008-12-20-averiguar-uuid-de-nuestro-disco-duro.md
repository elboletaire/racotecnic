---
layout: post
status: publish
published: true
title: Averiguar UUID de nuestro disco duro
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Hoy me he encontrado con un problema que me ha llevado de cabeza un buen
  rato. Era una tontería, pero desde luego no era nada lógico.\r\n\r\nRecientemente
  instalé un disco duro de 1TB y al <a title=\"Búsqueda en google por 'configurar
  fstab'\" href=\"http://www.google.com/search?ie=UTF-8&amp;oe=UTF-8&amp;sourceid=navclient&amp;gfns=1&amp;q=configurar+fstab\"
  target=\"_blank\">configurar fstab</a> lo hice utilizando la ruta a los dispositivos
  (tipo \"/dev/sdd1\" y similares).\r\n\r\nTras llevar mi ordenador unos días sin
  apagarse, hoy lo he actualizado y al reiniciar me había cambiado los destinos de
  los discos duros. Es decir, sde ha pasado a ser sdc, sdc a ser sdd... y así con
  varios de ellos (desde luego, no lo encuentro nada lógico :S )\r\n\r\n"
wordpress_id: 63
wordpress_url: http://racoinformatic.underave.net/?p=63
date: '2008-12-20 03:03:41 +0100'
date_gmt: '2008-12-20 02:03:41 +0100'
categories:
- Linux
tags:
- fstab
- Particions
---

Hoy me he encontrado con un problema que me ha llevado de cabeza un buen rato. Era una tontería, pero desde luego no era nada lógico.

Recientemente instalé un disco duro de 1TB y al <a title="Búsqueda en google por 'configurar fstab'" href="http://www.google.com/search?ie=UTF-8&amp;oe=UTF-8&amp;sourceid=navclient&amp;gfns=1&amp;q=configurar+fstab" target="_blank">configurar fstab</a> lo hice utilizando la ruta a los dispositivos (tipo "/dev/sdd1" y similares).

Tras llevar mi ordenador unos días sin apagarse, hoy lo he actualizado y al reiniciar me había cambiado los destinos de los discos duros. Es decir, sde ha pasado a ser sdc, sdc a ser sdd... y así con varios de ellos (desde luego, no lo encuentro nada lógico :S )

<a id="more"></a><a id="more-63"></a>
La solución ha sido reemplazar estas rutas por "<a title="UUID en Wikipedia" href="http://en.wikipedia.org/wiki/UUID" target="_blank">UUID</a>". Para averiguar dicho identificador debéis hacer lo siguiente:

    user@user:~$ ls -l /dev/disk/by-uuid/

Esto nos mostrará nuestra tabla de particiones pero con el identificador de cada partición, algo similar a esto:

    lrwxrwxrwx 1 root root 10 2008-12-20 02:28 3004cc48-1d23-4c34-84ca-e1426c7c4645 -> ../../sdb1
    lrwxrwxrwx 1 root root 10 2008-12-20 02:28 3ddd2f0f-0f5c-408d-a3ae-3768f1433aa9 -> ../../sda3
    lrwxrwxrwx 1 root root 10 2008-12-20 02:28 461a0de5-a723-42d2-bc29-59c4718a6513 -> ../../sde2
    lrwxrwxrwx 1 root root 10 2008-12-20 01:28 4905-9B43 -> ../../sdj6
    lrwxrwxrwx 1 root root 10 2008-12-20 02:28 4f6871ab-0bb1-49e7-8f68-794f8a1b7adb -> ../../sdd1
    lrwxrwxrwx 1 root root 10 2008-12-20 02:28 74f3b691-0be5-421d-bd09-6000b9ba77a6 -> ../../sdc1
    lrwxrwxrwx 1 root root 10 2008-12-20 02:28 8500b4f6-d037-4090-94ec-4637017e37dc -> ../../sda5
    lrwxrwxrwx 1 root root 10 2008-12-20 01:28 8E5FB69810347B51 -> ../../sdj5
    lrwxrwxrwx 1 root root 10 2008-12-20 02:28 d6cd7914-57cd-4ba7-837d-e3777a22e127 -> ../../sda6
    lrwxrwxrwx 1 root root 10 2008-12-20 02:28 E41CC33A1CC30710 -> ../../sda1

Una vez ya tenemos la uuid de la unidad que nos interese, añadimos /editamos la línea correspondiente en el fichero fstab:

    user@user:~$ sudo nano /etc/fstab

Y ahí añadimos la línea que nos interese...

    # /dev/sdc1
    UUID=74f3b691-0be5-421d-bd09-6000b9ba77a6	/media/tera	reiserfs relatime	0	21

Este post está creado con la intención de ayudaros a averiguar las UUID de vuestros discos duros, si queréis más información sobre cómo configurar fstab podéis consultar cualquiera de estos enlaces:

<blockquote>
  <ul>
    <li><a href="http://es.wikipedia.org/wiki/Fstab" target="_blank">Información detallada de fstab en la Wikipedia</a></li>
    <li><a href="http://manual.sidux.com/es/part-uuid-es.htm" target="_blank">Información detallada sobre UUID i fstab</a></li>
    <li><a href="http://comunnicate.wordpress.com/2008/11/04/montar-particion-ntfs/" target="_blank">Montar partición NTFS en Ubuntu Intrepid Ibex</a></li>
    <li><a href="http://www.naguissa.com/blog.php?verpost&amp;comentario=601" target="_blank">Configurar fstab para montar unidades de windows o samba en el arranque</a></li>
    <li><a href="http://www.cristalab.com/tips/26881/montar-escribir-y-leer-particiones-ntfs-desde-ubuntu.html" target="_blank">Montar, Escribir y Leer particiones NTFS desde Ubuntu</a></li>
  </ul>
</blockquote>
