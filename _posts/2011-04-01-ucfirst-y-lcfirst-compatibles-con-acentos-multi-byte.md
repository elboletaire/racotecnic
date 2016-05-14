---
layout: post
status: publish
published: true
title: ucfirst y lcfirst compatibles con acentos (Multi Byte)
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<a href=\"http://www.racotecnic.com/wp-content/uploads/2011/04/mb1.png\"><img
  class=\"alignleft size-full wp-image-1884\" title=\"mb\" src=\"http://www.racotecnic.com/wp-content/uploads/2011/04/mb1.png\"
  alt=\"\" width=\"205\" height=\"195\" /></a>Llevo un rato peleándome con esto y
  finalmente he encontrado solución.\r\n\r\nEl caso es que los de PHP al hacer los
  métodos <a title=\"PHP: MultiByte String Functions\" href=\"http://php.net/manual/en/ref.mbstring.php\">MultiByte</a>
  (un apaño que harían al ver que se olvidaron del resto de juegos de caracteres...)
  no hicieron ni el de primera letra mayúscula ni minúscula.\r\n\r\nAmbos métodos
  me son muy útiles para activar / desactivar usuarios de una wiki (ya que un usuario
  no puede acceder al sistema mediawiki si tiene la primera letra en minúscula), así
  que en realidad no he tenido más remedio que hacerlo (nooo, yo no queríaaa..!! xD)"
wordpress_id: 1873
wordpress_url: http://www.racotecnic.com/?p=1873
date: '2011-04-01 15:44:46 +0200'
date_gmt: '2011-04-01 14:44:46 +0200'
categories:
- Programació
- Web
tags:
- PHP
- Snippet
- Codi
- MultiByte
- MediaWiki
- Codificació
---

<a href="http://www.racotecnic.com/wp-content/uploads/2011/04/mb1.png"><img class="alignleft size-full wp-image-1884" title="mb" src="http://www.racotecnic.com/wp-content/uploads/2011/04/mb1.png" alt="" width="205" height="195" /></a>Llevo un rato peleándome con esto y finalmente he encontrado solución.

El caso es que los de PHP al hacer los métodos <a title="PHP: MultiByte String Functions" href="http://php.net/manual/en/ref.mbstring.php">MultiByte</a> (un apaño que harían al ver que se olvidaron del resto de juegos de caracteres...) no hicieron ni el de primera letra mayúscula ni minúscula.

Ambos métodos me son muy útiles para activar / desactivar usuarios de una wiki (ya que un usuario no puede acceder al sistema mediawiki si tiene la primera letra en minúscula), así que en realidad no he tenido más remedio que hacerlo (nooo, yo no queríaaa..!! xD)<a id="more"></a><a id="more-1873"></a>

~~~php
// First letter uppercase
if ( !function_exists('mb_ucfirst') ) {
	function mb_ucfirst($str, $to_lower = false, $charset = 'utf-8')
	{
		$first = mb_strtoupper(mb_substr($str, 0, 1, $charset), $charset);
		$end = mb_substr($str, 1, mb_strlen($str, $charset), $charset);
		// Convert them all to lowercase (if specified)
		if ( $to_lower ) {
			$end = mb_strtolower($end, $charset);
		}
		return $first . $end;
	}
}
// First letter lowercase
if ( !function_exists('mb_lcfirst') ) {
	function mb_lcfirst($str, $charset = 'utf-8'){
		$first = mb_strtolower(mb_substr($str, 0, 1, $charset), $charset);
		return $first . mb_substr($str, 1, mb_strlen($str, $charset), $charset);
	}
}
~~~

Como podréis ver al método `mb_ucfirst` le he añadido un parámetro `$to_lower` que sirve para convertir el resto de la frase a minúscula (muy útil contra hoygans).

El parámetro `$charset` es el que más me ha dado por culo (al principio no lo tenía en cuenta); tened en cuenta vuestra codificación de caracteres y cambiadlo directamente en la función si es preciso.

Buen fin de semana!
<blockquote>
<strong>Referencias</strong>

<ul>
<li><a title="php.net" href="http://php.net/manual/en/ref.mbstring.php">PHP: Multibyte String Functions</a></li>

<a title="php.net" href="http://php.net/manual/en/ref.mbstring.php"> </a></ul>

<a title="php.net" href="http://php.net/manual/en/ref.mbstring.php"> </a></blockquote>
