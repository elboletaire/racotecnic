---
layout: post
status: publish
published: true
title: Instalar Google Chromium en Ubuntu
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Si queréis disfrutar de <strong>Google Chrome</strong> en vuestro ubuntu
  sin necesidad de instalar Wine ni Crossover podéis hacerlo fácilmente mediante los
  repositorios o directamente instalando un paquete Deb.\r\n\r\nPrimero de todo debemos
  editar nuestro fichero de recursos de los repositorios:\r\n\r\n[bash light=\"true\"]sudo
  nano /etc/apt/sources.list[/bash]\r\n\r\nY añadimos un par de líneas:\r\n\r\n[bash
  gutter=\"false\"]deb http://ppa.launchpad.net/chromium-daily/ppa/ubuntu NOMBRE_DE_VERSION
  main\r\ndeb-src http://ppa.launchpad.net/chromium-daily/ppa/ubuntu NOMBRE_DE_VERSION
  main[/bash]\r\n\r\n"
wordpress_id: 973
wordpress_url: http://racotecnic.underave.net/?p=973
date: '2009-11-13 15:45:35 +0100'
date_gmt: '2009-11-13 14:45:35 +0100'
categories:
- Linux
- Web
- Aplicacions
tags:
- Google Chrome
- Ubuntu
- Instal·lació Software
---
<p>Si queréis disfrutar de <strong>Google Chrome</strong> en vuestro ubuntu sin necesidad de instalar Wine ni Crossover podéis hacerlo fácilmente mediante los repositorios o directamente instalando un paquete Deb.</p>
<p>Primero de todo debemos editar nuestro fichero de recursos de los repositorios:</p>
<p>[bash light="true"]sudo nano /etc/apt/sources.list[/bash]</p>
<p>Y añadimos un par de líneas:</p>
<p>[bash gutter="false"]deb http://ppa.launchpad.net/chromium-daily/ppa/ubuntu NOMBRE_DE_VERSION main<br />
deb-src http://ppa.launchpad.net/chromium-daily/ppa/ubuntu NOMBRE_DE_VERSION main[/bash]</p>
<p><a id="more"></a><a id="more-973"></a><br />
La variable "NOMBRE_DE_VERSION" debéis substituirla por vuestra versión. Google Chromium está disponible para las siguientes versiones de Ubuntu:</p>
<ul>
<li><strong>hardy</strong> [Hardy Heron 8.04]</li>
<li><strong>intrepid</strong> [Intrepid Ibex 8.10]</li>
<li><strong>jaunty</strong> [Jaunty Jackalope 9.04]</li>
<li><strong>karmik</strong> [Karmik Koala 9.10]</li>
</ul>
<p>Ahora que tenemos el repositorio añadido debemos añadir la clave GPG:</p>
<p>[bash light="true"]sudo apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xfbef0d696de1c72ba5a835fe5a9bf3bb4e5e17b5[/bash]</p>
<p>Si este paso se ha hecho correctamente (debería, a no ser que modifiquen la clave :S) habrás visto algo así en tu consola:</p>
<p>[bash light="true"]Executing: gpg --ignore-time-conflict --no-options --no-default-keyring --secret-keyring /etc/apt/secring.gpg --trustdb-name /etc/apt/trustdb.gpg --keyring /etc/apt/trusted.gpg --recv-keys --keyserver keyserver.ubuntu.com 0xfbef0d696de1c72ba5a835fe5a9bf3bb4e5e17b5<br />
gpg: requesting key 4E5E17B5 from hkp server keyserver.ubuntu.com<br />
gpg: key 4E5E17B5: public key &quot;Launchpad PPA for chromium-daily&quot; imported<br />
gpg: no s'han trobat claus amb confiança absoluta<br />
gpg: Nombre total processat: 1<br />
gpg:               importades: 1  (RSA: 1)[/bash]</p>
<p>Ahora simplemente hacemos un update e instalamos:</p>
<p>[bash light="true"]sudo aptitude update<br />
sudo aptitude install chromium-browser[/bash]</p>
<p>¡Listo! Ya tenemos Google Chromium instalado en nuestro sistema :)</p>
