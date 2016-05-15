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
excerpt: "Si queréis disfrutar de **Google Chrome** en vuestro ubuntu
  sin necesidad de instalar Wine ni Crossover podéis hacerlo fácilmente mediante los
  repositorios o directamente instalando un paquete Deb.\r\n\r\nPrimero de todo debemos
  editar nuestro fichero de recursos de los repositorios:\r\n\r\n[bash light=\"true\"]sudo
  nano /etc/apt/sources.list
~~~\r\n\r\nY añadimos un par de líneas:\r\n\r\n[bash
  gutter=\"false\"]deb http://ppa.launchpad.net/chromium-daily/ppa/ubuntu NOMBRE_DE_VERSION
  main\r\ndeb-src http://ppa.launchpad.net/chromium-daily/ppa/ubuntu NOMBRE_DE_VERSION
  main
~~~\r\n\r\n"
wordpress_id: 973
wordpress_url: http://racotecnic.com/?p=973
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

Si queréis disfrutar de **Google Chrome** en vuestro ubuntu sin necesidad de instalar Wine ni Crossover podéis hacerlo fácilmente mediante los repositorios o directamente instalando un paquete Deb.

Primero de todo debemos editar nuestro fichero de recursos de los repositorios:

[bash light="true"]sudo nano /etc/apt/sources.list
~~~

Y añadimos un par de líneas:

[bash gutter="false"]deb http://ppa.launchpad.net/chromium-daily/ppa/ubuntu NOMBRE_DE_VERSION main
deb-src http://ppa.launchpad.net/chromium-daily/ppa/ubuntu NOMBRE_DE_VERSION main
~~~

<a id="more"></a><a id="more-973"></a>
La variable "NOMBRE_DE_VERSION" debéis substituirla por vuestra versión. Google Chromium está disponible para las siguientes versiones de Ubuntu:

<ul>
<li>**hardy** [Hardy Heron 8.04]</li>
<li>**intrepid** [Intrepid Ibex 8.10]</li>
<li>**jaunty** [Jaunty Jackalope 9.04]</li>
<li>**karmik** [Karmik Koala 9.10]</li>
</ul>

Ahora que tenemos el repositorio añadido debemos añadir la clave GPG:

[bash light="true"]sudo apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 0xfbef0d696de1c72ba5a835fe5a9bf3bb4e5e17b5
~~~

Si este paso se ha hecho correctamente (debería, a no ser que modifiquen la clave :S) habrás visto algo así en tu consola:

[bash light="true"]Executing: gpg --ignore-time-conflict --no-options --no-default-keyring --secret-keyring /etc/apt/secring.gpg --trustdb-name /etc/apt/trustdb.gpg --keyring /etc/apt/trusted.gpg --recv-keys --keyserver keyserver.ubuntu.com 0xfbef0d696de1c72ba5a835fe5a9bf3bb4e5e17b5
gpg: requesting key 4E5E17B5 from hkp server keyserver.ubuntu.com
gpg: key 4E5E17B5: public key 'Launchpad PPA for chromium-daily' imported
gpg: no s'han trobat claus amb confiança absoluta
gpg: Nombre total processat: 1
gpg:               importades: 1  (RSA: 1)
~~~

Ahora simplemente hacemos un update e instalamos:

[bash light="true"]sudo aptitude update
sudo aptitude install chromium-browser
~~~

¡Listo! Ya tenemos Google Chromium instalado en nuestro sistema :)
