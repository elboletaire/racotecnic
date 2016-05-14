---
layout: post
status: publish
published: true
title: Usando nuestro propio .htaccess en Wordpress
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Utilizar ficheros .htaccess para crear redirecciones o para mejorar SEO
  es una gran idea, pero desgraciadamente Wordpress modifica el fichero .htaccess
  cada vez que modificamos el contenido de una pagina o cambiamos la configuración
  de los permalinks (entre otros).\r\n\r\nRealmente es muy simple solucionar este
  problema. A continuación os pongo dos .htaccess. El primero de ellos muestra el
  fichero .htaccess original, el que desgraciadamente Wordpress modifica automáticamente
  cada vez que hacemos ediciones en nuestro blog. El segundo os mostrará dónde poner
  el texto en negrita correctamente.\r\n\r\nSólo hace falta que desplacéis los comentarios
  \"begin wordpress\" i \"end wordpress\" (en negrita) para que engloben únicamente
  el código de wordpress:\r\n\r\n"
wordpress_id: 185
wordpress_url: http://racoinformatic.underave.net/?p=185
date: '2009-03-03 13:09:34 +0100'
date_gmt: '2009-03-03 12:09:34 +0100'
categories:
- Programació
- Web
tags:
- Wordpress
- ".htaccess"
- Apache
---

Utilizar ficheros .htaccess para crear redirecciones o para mejorar SEO es una gran idea, pero desgraciadamente Wordpress modifica el fichero .htaccess cada vez que modificamos el contenido de una pagina o cambiamos la configuración de los permalinks (entre otros).

Realmente es muy simple solucionar este problema. A continuación os pongo dos .htaccess. El primero de ellos muestra el fichero .htaccess original, el que desgraciadamente Wordpress modifica automáticamente cada vez que hacemos ediciones en nuestro blog. El segundo os mostrará dónde poner el texto en negrita correctamente.

Sólo hace falta que desplacéis los comentarios "begin wordpress" i "end wordpress" (en negrita) para que engloben únicamente el código de wordpress:

<a id="more"></a><a id="more-185"></a><br />
EJEMPLO 1:

<strong># BEGIN WordPress</strong>

RewriteEngine On
RewriteBase /

RewriteCond %{HTTP_HOST} ^yoursite.com [nc]
RewriteRule (.*) http://www.yoursite.com/$1 [R=301,L]

RewriteRule ^dummyurl$ http://www.affiliateservice.com/afclick.php?o=6496 [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule . /index.php [L]

<strong># END WordPress</strong>

EJEMPLO 2:

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

RewriteCond %{HTTP_HOST} ^yoursite.com [nc]
RewriteRule (.*) http://www.yoursite.com/$1 [R=301,L]

RewriteRule ^dummyurl$ http://www.affiliateservice.com/afclick.php?o=6496 [L]

<span style="font-weight: bold;"># BEGIN WordPress</span>
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
<span style="font-weight: bold;"># END WordPress</span>

</IfModule>

Como podéis ver, los comentarios #BEGIN Wordpress i #END Wordpress delimitan el código htaccess de Wordpress, todo lo que haya dentro de esas marcas será modificado automáticamente por Wordpress cada vez que realicéis cambios en vuestro blog.

El resto del código .htaccess es indiferente, mas la primera parte es una simple redirección SEO para mostrar las www y la segunda es una redirección para publicidad. Pero como he dicho, es indistinto, lo importante es que emplacéis bien los comentarios de wordpress.
<blockquote>
Fuente:

<ul>
<li><a title="Permanent Link to Using Custom .htaccess File With Wordpress" href="http://www.mfartr.com/internet-marketing-web-tech/using-custom-htaccess-file-with-wordpress/">Using Custom .htaccess File With Wordpress</a></li>
</ul>
</blockquote>
