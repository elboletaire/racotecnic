---
layout: post
status: publish
published: true
title: iBotnet, la primera Botnet Mac
class: no-line-numbers
author:
  display_name: '909'
  login: '909'
  email: gerardperucha@hotmail.com
author_login: '909'
author_email: gerardperucha@hotmail.com
excerpt: "Hola a tod@s, No sabéis lo mal que me sabe tener que dar malas
  noticias, y más si se refiere a Mac, pero bueno..."
wordpress_id: 483
wordpress_url: http://racotecnic.com/?p=483
date: '2009-04-23 18:37:48 +0200'
date_gmt: '2009-04-23 17:37:48 +0200'
categories:
- Aplicacions
- Disseny
- Mac
- Windows
tags:
- Malware
- trojan
- OS X
- Virus
- Botnet
- Iwork'09
- Photoshop CS4
---

Hola a tod@s,

No sabéis lo mal que me sabe tener que dar malas noticias, y más si se refiere a Mac, pero bueno...

Una de los grandes reclamos que lleva haciendo uso la compañí­a Apple durante estos años ha sido que su sistema opertivo, OS X, era  impenetrable e inmune al malware. Pues nada, se acabó el ir por la calle orgulloso de que nuestro ordenador estaba 100% libre de este tipo de software. Ya que se ha detectado la primera Botnet para los ordenadores de la empresa Apple Inc.

Todo empezó a principios de año cuando la empresa <strong>Intrego</strong>, empresa dedicada a la elaboración de antivirus para Apple, alertó de que corria un troyano encubierto dentro de la versión pirata de Iwork'09, la que podéis encontrar en cualquier torrent o páginas tales como Vagos, Taringa, etc. Aún así, se calcula que el mismo día de este aviso se descargó esta aplicación unas 20.000 veces.

<a id="more"></a><a id="more-483"></a>

Pero, ¿quien es? ¿A qué nos estamos enfrentando? Bueno nuestro "hamijo" en cuestión se llama <strong>OSX.Trojan.iServices.A</strong>. Este programa se encuentra en un paquete extra que lleva el instalador de iWork09 llamado<strong> iWorkService.pkg</strong>. Al instalar iWork 09, se instala también el paquete iWorkServices. El instalador del troyano se ejecuta en cuanto el usuario inicia la instalación de iWork, después de que el instalador solicite la contraseña de administrador.

Este software se instala como elemento de arranque (en `/System/Librería/StartupItems/iWorkServices`, un lugar reservado normalmente a los elementos de arranque de Apple), donde tiene permisos de lectura, escritura y ejecución como “root”. Una vez instalado la aplicación iWork funciona normalmente, pero por debajo esta aplicación se conecta a un servidor remoto por Internet, lo que le da la posibilidad de conectarse y llevar acabo acciones remotas e incluso descargar otros componentes a nuestro Mac.

Jodido, verdad? Pues agarraros que viene la segunda parte.

El mes pasado los investigadores de la empresa <strong>Symantec</strong>, la empresa que desarrolla el antivirus Norton, han dado  la voz de alarma de que se detectó una nueva versión de este troyano, el <strong>OSX.Trojan.iServices.B</strong> en un copia pirata del programa <strong>Adobe Photoshop CS4</strong>. La forma de colarse es la misma, el troyano se encuentra en el crack que da el serial. Ya que extrae un ejecutable de sus datos e instala una puerta trasera en `/var/tmp/`, un directorio que no se elimina al reiniciar el equipo. (Si se vuelve a ejecutar el crack, el troyano crea un nuevo ejecutable con otro nombre, estos nombres, que son aleatorios, dificultan la eliminación segura del troyano).

El crack solicita la contraseña de administrador, abriendo la puerta trasera con privilegios de root . Se copia el ejecutable en `/usr/bin/DivX` y se crea un elemento de arranque en `/System/Librería/StartupItems/DivX`. El programa comprueba si se ha ejecutado con privilegios de root y guarda el hash de la contraseña en el archivo `/var/root/.DivX`. Seguidamente, escucha un puerto TCP aleatorio, responde a solicitudes como GET / HTTP/1.0 enviando un paquete de 209 bytes y se conecta repetidamente a dos direcciones IP.

Hecho esto, la aplicación de crack abre una imagen de disco escondida en su carpeta de recursos, en una carpeta denominada .data, y procede a craquear el programa Photoshop, permitiendo su uso.

La primera versión de este troyano fue vista descargando código nuevo en equipos infectados, que se utilizaron luego para un <strong>ataque de DDoS </strong>(<em>denegación de servicio distribuida</em>). Un ataque DDoS es un ataque que causa que un servicio o recurso sea inaccesible a los usuarios legítimos. Normalmente provoca la pérdida de la conectividad de la red por el consumo del ancho de banda de la red de la víctima o sobrecarga de los recursos de los ordenador del sistema de la víctima, pero en este caso son varios ordenadores los que atacan a la misma vez. Dado que esta nueva variante emplea la misma tecnología y contacta con los mismos servidores remotos.

Si ya os habeís instalado estas programas. La recomendación es que os instaleís un antivirus como <a title="securemac" href="http://macscan.securemac.com/files/iServicesTrojanRemovalTool.dmg">(</a><a title="securemac" href="http://macscan.securemac.com/files/iServicesTrojanRemovalTool.dmg">iServices Trojan Removal</a>) o los anteriores mencionados de la empresa intrego y eliminar las siguientes carpetas

    /System/Library/StartupItems/DivX
    /System/Library/StartupItems/iWorkServices

Ahora la pregunta es: <em>Seguro que no son las propias empresas que han distribuido este malware por la red?</em> Ya que el mercado de Mac es gigantesco y muy suculento para estas empresas.

Zalú'!

<blockquote>
  <a title="Botnet" href="http://es.wikipedia.org/wiki/Botnet" target="_blank">Definición de Botnet en la Wikipedia</a>
</blockquote>
