---
layout: post
status: publish
published: true
title: Instalar PHP 5.4.X en Ubuntu 11.10 / 12.04.X
class: no-line-numbers
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 2071
wordpress_url: http://www.racotecnic.com/?p=2071
date: '2012-05-14 12:00:46 +0200'
date_gmt: '2012-05-14 11:00:46 +0200'
categories:
- Programació
- Linux
- Administració
tags:
- PHP
- Ubuntu
- PHP5
- Ubuntu 12.04
- Ubuntu Quantal
- Ubuntu 11.10
- Ubuntu Oneiric
---

Podéis instalar la versión más reciente estable de PHP 5.4 en vuestro Ubuntu muy fácilmente gracias a este repositorio:

<a href="https://launchpad.net/~ondrej/+archive/php5" rel="nofollow external">https://launchpad.net/~ondrej/+archive/php5</a>

Añadid el repositorio siguiendo estos pasos y debería funcionar (provado en Ubuntu 12.04):

~~~bash
sudo add-apt-repository ppa:ondrej/php5
~~~

> **Nota (a 23/11/2013):** Parece ser que este repositorio es en el que el usuario (ondrej) pretende tener los paquetes más actualizados (php 5.5 y apache 2.4 ahora mismo). Si lo que queréis es utilizar la última versión de php 5.4 (old stable) tenéis que utilizar este otro repositorio en su lugar: `ppa:ondrej/php5-oldstable`

Si no tenéis el comando `add-apt-repository` es porque no tenéis el paquete `python-software-properties` instalado. Instaladlo con aptitude si es así y podréis ejecutar el comando sin problemas.
Una vez añadido el repositorio actualizáis la lista de paquetes:

~~~bash
sudo apt-get update
~~~

E instaláis php5:

~~~bash
sudo apt-get install php5 php5-cli php5-whatever
~~~

Probado en Ubuntu 11.10 y 12.04 x64 tanto con el módulo de apache mod_php5 como con fastFCGI (con apache en modo worker).
