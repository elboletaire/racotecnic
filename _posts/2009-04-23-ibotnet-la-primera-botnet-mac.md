---
layout: post
status: publish
published: true
title: iBotnet, la primera Botnet Mac
author:
  display_name: '909'
  login: '909'
  email: gerardperucha@hotmail.com
  url: ''
author_login: '909'
author_email: gerardperucha@hotmail.com
excerpt: "Hola a <span><span>tod</span></span>@s,\r\n\r\nNo <span><span>sabéis</span></span>
  lo mal que me sabe tener que dar malas noticias, y más si se refiere a <span><span>Mac</span></span>,
  pero bueno...\r\n\r\nUna de los grandes reclamos que lleva haciendo uso la <span>compañí­a</span>
  <span><span>Apple</span></span> durante estos años ha sido que su sistema <span><span>opertivo</span></span>,
  OS X, era  impenetrable e inmune al <span><span>malware</span></span>. Pues nada,
  se acabó el ir por la calle orgulloso de que nuestro ordenador estaba 100% libre
  de este tipo de software. Ya que se ha detectado la primera <span><span>Botnet</span></span>
  para los ordenadores de la empresa <span><span>Apple</span></span> <span><span>Inc</span></span>.\r\n\r\nTodo
  empezó a principios de año cuando la empresa <strong><span><span>Intrego</span></span></strong>,
  empresa dedicada a la elaboración de <span><span>antivirus</span></span> para <span><span>Apple</span></span>,
  alertó de que <span><span>corria</span></span> un troyano encubierto dentro de la
  versión pirata de Iwork'09, la que <span><span>podéis</span></span> encontrar en
  cualquier <span><span>torrent</span></span> o páginas tales como Vagos, <span><span>Taringa</span></span>,
  etc. Aún así, se calcula que el mismo <span><span>día</span></span> de este aviso
  se descargó esta aplicación unas 20.000 veces.\r\n\r\n"
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

Hola a <span><span>tod</span></span>@s,

No <span><span>sabéis</span></span> lo mal que me sabe tener que dar malas noticias, y más si se refiere a <span><span>Mac</span></span>, pero bueno...

Una de los grandes reclamos que lleva haciendo uso la <span>compañí­a</span> <span><span>Apple</span></span> durante estos años ha sido que su sistema <span><span>opertivo</span></span>, OS X, era  impenetrable e inmune al <span><span>malware</span></span>. Pues nada, se acabó el ir por la calle orgulloso de que nuestro ordenador estaba 100% libre de este tipo de software. Ya que se ha detectado la primera <span><span>Botnet</span></span> para los ordenadores de la empresa <span><span>Apple</span></span> <span><span>Inc</span></span>.

Todo empezó a principios de año cuando la empresa <strong><span><span>Intrego</span></span></strong>, empresa dedicada a la elaboración de <span><span>antivirus</span></span> para <span><span>Apple</span></span>, alertó de que <span><span>corria</span></span> un troyano encubierto dentro de la versión pirata de Iwork'09, la que <span><span>podéis</span></span> encontrar en cualquier <span><span>torrent</span></span> o páginas tales como Vagos, <span><span>Taringa</span></span>, etc. Aún así, se calcula que el mismo <span><span>día</span></span> de este aviso se descargó esta aplicación unas 20.000 veces.

<a id="more"></a><a id="more-483"></a>
Pero, ¿quien es? ¿A qué nos estamos enfrentando? Bueno nuestro "<span><span>hamijo</span></span>" en cuestión se llama<strong> OSX.<span><span>Trojan</span></span>.<span><span>iServices</span></span>.A</strong>. Este programa se encuentra en un paquete extra que lleva el instalador de iWork09 llamado<strong> <span><span>iWorkService</span></span>.<span><span>pkg</span></span></strong><span>. Al instalar <span>iWork</span> 09, </span>se instala también el paquete <span><span>iWorkServices</span></span>. El instalador del troyano se ejecuta en cuanto el usuario inicia la instalación de <span><span>iWork</span></span>, después de que el instalador solicite la contraseña de administrador. Este software se instala como elemento de <span><span>arran</span></span>que (en <strong>/<span><span>System</span></span>/Librería/<span><span>StartupItems</span></span>/<span><span>iWorkServices</span></span></strong>, un lugar reservado normalmente a los elementos de <span><span>arran</span></span>que de <span><span>Apple</span></span>), donde tiene permisos de lectura, escritura y ejecución como “<span><span>root</span></span>”. Una vez instalado la aplicación <span><span>iWork</span></span> funciona normalmente, pero por debajo esta aplicación se conecta a un servidor remoto por <span><span>Internet</span></span>, lo que le da la posibilidad de conectarse y llevar acabo acciones remotas e <span><span>incl</span></span>uso descargar otros componentes a nuestro <span><span>Mac</span></span>.

<span><span>Jodido</span></span>, verdad? Pues agarraros que viene la segunda parte.

El mes pasado los investigadores de la empresa <strong><span><span>Symantec</span></span></strong>, la empresa que desarrolla el <span><span>antivirus</span></span> <span><span>Norton</span></span>, han dado  la voz de alarma de que se <span><span>detectó</span></span> una nueva versión de este troyano, el <strong>OSX.<span><span>Trojan</span></span>.<span><span>iServices</span></span>.B</strong> en un copia pirata del programa <strong>Adobe <span><span>Photoshop</span></span> CS4</strong>. La forma de colarse es la misma, el troyano se encuentra en el <span><span>crack</span></span> que da el <span><span>seri</span></span>al. Ya que extrae un ejecutable de sus datos e instala una puerta trasera en /var/<span><span>tmp</span></span>/, un directorio que no se elimina al reiniciar el equipo. (Si se vuelve a ejecutar el <span><span>crack</span></span>, el troyano crea un nuevo ejecutable con otro nombre, estos nombres, que son aleatorios, dificultan la eliminación segura del troyano).

El <span><span>crack</span></span> solicita la contraseña de administrador, abriendo la puerta trasera con privilegios de root . Se copia el ejecutable en /<span><span>usr</span></span>/<span><span>bin</span></span>/<span><span>DivX</span></span> y se crea un elemento de <span><span>arran</span></span>que en /<span><span>System</span></span>/Librería/ <span><span>StartupItems</span></span>/<span><span>DivX</span></span>. El programa comprueba si se ha ejecutado con privilegios de <span><span>root</span></span> y guarda el <span><span>hash</span></span> de la contraseña en el archivo /var/<span><span>root</span></span>/.<span><span>DivX</span></span>. <span><span>Seguidamente</span></span>, escucha un puerto TCP aleatorio, <span><span>respon</span></span>de a solicitudes como GET / HTTP/1.0 enviando un paquete de 209 bytes y se conecta repetidamente a dos direcciones IP.
Hecho esto, la aplicación de <span><span>crack</span></span> abre una imagen de disco escondida en su carpeta de recursos, en una carpeta <span><span>denomi</span></span>nada .data, y <span><span>proce</span></span>de a craquear el programa <span><span>Photoshop</span></span>, permitiendo su uso.

La primera versión de este troyano fue vista descargando código nuevo en equipos infectados, que se utilizaron luego para un <strong>ataque de <span><span>DDoS</span></span> </strong>(<em>denegación de servicio distribuida</em>). Un ataque <span><span>DDoS</span></span> es un ataque que causa que un servicio o recurso sea inaccesible a los usuarios legítimos. Normalmente provoca la pérdida de la <span><span>conectividad</span></span> de la red por el consumo del ancho de banda de la red de la víctima o sobrecarga de los recursos de los ordenador del sistema de la víctima, pero en este caso son varios ordenadores los que atacan a la misma vez. Dado que esta nueva variante emplea la misma tecnología y contacta con los mismos servidores remotos.

Si ya os <span><span>habeís</span></span> instalado estas programas. La recomendación es que os <span><span>instaleís</span></span> un <span><span>antivirus</span></span> como <a title="securemac" href="http://macscan.securemac.com/files/iServicesTrojanRemovalTool.dmg">(</a><a title="securemac" href="http://macscan.securemac.com/files/iServicesTrojanRemovalTool.dmg"><span><span>iServices</span></span> <span><span>Trojan</span></span> <span><span>Remov</span></span>al</a>) o los anteriores mencionados de la empresa <span><span>intrego</span></span> y eliminar las siguientes carpetas

<strong>/<span><span>System</span></span>/<span><span>Library</span></span>/<span><span>StartupItems</span></span>/<span><span>DivX</span></span></strong>

<strong> /<span><span>System</span></span>/<span><span>Library</span></span>/<span><span>StartupItems</span></span>/<span><span>iWorkServices</span></span> </strong>

Ahora la pregunta es: <em>Seguro que no son las propias empresas que han distribuido este <span><span>malware</span></span> por la red?</em> Ya que el mercado de <span><span>Mac</span></span> es gigantesco y muy suculento para estas empresas.

<span>Zalú'!</span>
<blockquote>
<span><a title="Botnet" href="http://es.wikipedia.org/wiki/Botnet" target="_blank">Definición de Botnet en la Wikipedia</a>
</span></blockquote>
