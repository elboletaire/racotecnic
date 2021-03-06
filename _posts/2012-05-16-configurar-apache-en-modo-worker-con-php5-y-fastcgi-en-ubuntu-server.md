---
layout: post
status: publish
published: true
title: Configurar apache en modo mpm worker con php5 y fastcgi en ubuntu server
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Quizás hayáis escuchado hablar del módulo mpm
  worker para apache. Si no, yo os hago un breve resumen (corregidme si me equivoco)."
wordpress_id: 2053
wordpress_url: http://www.racotecnic.com/?p=2053
date: '2012-05-16 07:00:00 +0200'
date_gmt: '2012-05-16 06:00:00 +0200'
categories:
- Linux
- Administració
tags:
- Apache
- Ubuntu
- PHP5
- Apache2
- apache-mpm-worker
- fastCGI
- Ubuntu 12.04
- Ubuntu Quantal
- Ubuntu 11.10
- Ubuntu Oneiric
---

Quizás hayáis escuchado hablar del módulo <a title="Apache MPM worker" href="http://httpd.apache.org/docs/2.2/mod/worker.html" rel="nofollow external">mpm worker para apache</a>. Si no, yo os hago un breve resumen (corregidme si me equivoco).

<a title="Multi-Processing Modules (MPMs)" href="http://httpd.apache.org/docs/2.2/mpm.html" rel="external nofollow">Al compilar apache</a> podemos escoger el modo en que éste maneja los procesos del servidor. Según el modo que utilicemos se nos ofrecen ciertos pros y contras. Los pros del modo worker de apache es que es bastante más rápido que el modo prefork (que es el que viene habilitado por defecto). Los "contras" del modo worker es que el módulo de php para apache no es compatible con él y en lugar de ello deberemos utilizar el módulo de cgi.

A pesar de que he dicho lo de "al compilar", no os preocupéis; podemos cambiar el modo en que funciona apache de manera rápida con aptitude.

Podéis encontrar más información y diferencias entre MPMs en: <a href="http://httpd.apache.org/docs/2.2/mpm.html" rel="nofollow external">http://httpd.apache.org/docs/2.2/mpm.html</a>.

Paquetes que necesitamos:

<ul>
  <li>apache2</li>
  <li>apache2-mpm-worker</li>
  <li>libapache2-mod-fcgid</li>
  <li>php5-cli</li>
  <li>php5-cgi</li>
</ul>

~~~bash
sudo apt-get install apache2 apache2-mpm-worker libapache2-mod-fcgid php5-cli php5-cgi
~~~
{: .no-line-numbers }

Una vez instalados, vamos a configurar apache para que ejecute ficheros php utilizando el módulo fastCGI:
<a id="more"></a><a id="more-2053"></a>

~~~bash
sudo nano /etc/apache/conf.d/php
~~~
{: .no-line-numbers }

Pegad esto:

~~~conf
<Directory /usr/share>
  AddHandler fcgid-script .php
  FCGIWrapper /usr/lib/cgi-bin/php5 .php
  Options ExecCGI FollowSymlinks Indexes
</Directory>

<Files ~ (\.php)>
  AddHandler fcgid-script .php
  FCGIWrapper /usr/lib/cgi-bin/php5 .php
  Options +ExecCGI
  allow from all
</Files>
~~~

> **Nota:** Al actualizar a php 5.4 he necesitado descomentar el último trozo del fichero de configuración `/etc/apache2/mods-enabled/php5_cgi.conf` ya que sinó me descargaba los ficheros php en lugar de ejecutarlos. El trozo al que me refiero es este:
>
> ~~~conf
> ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
> <Directory '/usr/lib/cgi-bin'>
>   AllowOverride None
>   Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
>   Order allow,deny
>   Allow from all
> </Directory>
> Acton application/x-httpd-php /cgi-bin/php5
> ~~~

Reiniciad apache:

~~~bash
sudo service apache2 restart
~~~
{: .no-line-numbers }

Y para acabar de finiquitar, provad un fichero php en vuestro servidor:

~~~bash
sudo echo '<?php phpinfo()' > /var/www/index.php
~~~
{: .no-line-numbers }

Si el parámetro no funciona simplemente cread un fichero index.php en vuestro webroot con el contenido

~~~php
<?php phpinfo();
~~~
{: .no-line-numbers }

Accedéis a <a href="http://localhost" rel="nofollow external">http://localhost</a> <em>et voilà</em>; Apache2 con módulo MPM-worker y PHP5 con FastCGI funcionando.

Si queréis verificar que realmente apache está funcionando en modo worker, podéis ejecutar el comando

~~~bash
:~$ apache2 -l
Compiled in modules:
  core.c
  mod_log_config.c
  mod_logio.c
  worker.c
  http_core.c
  mod_so.c
~~~
{: .no-line-numbers }

Fijaros que está cargado el módulo **worker.c**. Os recuerdo que por defecto apache viene con **prefork.c** por defecto.

Ahora vendría "lo wapo": el <em>fine tuning</em>. Una de las mejores fuentes que encontraréis para saber como "tunear" vuestro apache es la propia documentación de apache:

<a href="http://httpd.apache.org/docs/2.2/mod/mpm_common.html" rel="nofollow external">httpd.apache.org/docs/2.2/mod/mpm_common.html</a>

E id revisando con herramientas como `top` o `ps` los recursos que consume.

Éste otro enlace puede que os dé alguna ayuda, a pesar de que está enfocado a funcionar con glassfish:

<a href="http://alexandru-ersenie.com/2011/09/19/performance-tuning-for-apache-worker-model-with-glassfish-application-server/" rel="nofollow external">http://alexandru-ersenie.com/2011/09/19/performance-tuning-for-apache-worker-model-with-glassfish-application-server/</a>

Además tendríais que hacerle algún tipo de test de estrés, claro.. pero ese es un tema como para hacer un artículo entero, así que yo lo dejo para otro día, pero os animo a que busquéis por google, que seguro que encontráis unas cuantas vías para "estresar" vuestro servidor.

> **Más información y fuentes:**
>
> - Multi-Processing Modules (MPMs): <a href="http://httpd.apache.org/docs/2.2/mpm.html" rel="nofollow">http://httpd.apache.org/docs/2.2/mpm.html</a>
> - Apache MPM worker: <a href="http://httpd.apache.org/docs/2.2/mod/worker.html" rel="nofollow">http://httpd.apache.org/docs/2.2/mod/worker.html</a>
> - Error 403 en ficheros PHP utilizando apache-mpm-worker: <a href="http://stackoverflow.com/a/10557461/407456" rel="nofollow">http://stackoverflow.com/a/10557461/407456</a>
> - Test de velocidad comparativo entre prefork y worker: <a href="http://getasysadmin.com/2011/11/apache2-worker-prefork-ispconfig-benchmark/" rel="nofollow">http://getasysadmin.com/2011/11/apache2-worker-prefork-ispconfig-benchmark/</a>
> - Improving PHP performance with apache2-mpm-worker mod_fcgid: <a href="http://phphints.wordpress.com/2009/01/10/improving-php-performance-with-apache2-mpm-worker-mod_fcgid-2/" rel="nofollow">http://phphints.wordpress.com/2009/01/10/improving-php-performance-with-apache2-mpm-worker-mod_fcgid-2/</a>

PS. A todo esto.. todo el tutorial lo he hecho utilizando Ubuntu Server 12.04 x64 :)
