---
layout: post
status: publish
published: true
title: Obtener datos POST de manera rápida y sencilla con PHP
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Haciendo un poco de orden por el ordenador he encontrado una función que
  hice para el último trabajo en el que estuve. Me dedicaba sobre todo a crear aplicaciones
  de entrada de datos mediante PHP, así que me pasaba el día recuperando información
  POST.\r\n\r\nHarto de pasarme el día haciendo esto:\r\n\r\n[php]$variable = array($_POST['var1'],$_POST['var2'],$_POST['var3'],$_POST['varN']);[/php]\r\n\r\n...decidí
  hacer una función que me hiciera la tarea un poco más sencilla; aquí está:\r\n\r\n"
wordpress_id: 525
wordpress_url: http://racotecnic.underave.net/?p=525
date: '2009-05-08 02:10:43 +0200'
date_gmt: '2009-05-08 01:10:43 +0200'
categories:
- Programació
- Web
tags:
- PHP
- Funcions útils
- POST
---

Haciendo un poco de orden por el ordenador he encontrado una función que hice para el último trabajo en el que estuve. Me dedicaba sobre todo a crear aplicaciones de entrada de datos mediante PHP, así que me pasaba el día recuperando información POST.

Harto de pasarme el día haciendo esto:

[php]$variable = array($_POST['var1'],$_POST['var2'],$_POST['var3'],$_POST['varN']);[/php]

...decidí hacer una función que me hiciera la tarea un poco más sencilla; aquí está:

<a id="more"></a><a id="more-525"></a><br />
[php]function fillPost($keys,$exclude = null)<br />
{<br />
	$array = array();<br />
	// Fem un bucle amb tota la informació post<br />
	foreach ($_POST as $key=>$val){<br />
		// Si la variable keys és un array<br />
		if (is_array($keys)){<br />
			// I la clau actual és dins de l'array, llavors afegim la clau i el valor en el nou array<br />
			if (in_array($key, $keys)) $array[$key] = $val;<br />
		// Si no és array i el seu contingut és exactament ALL<br />
		}elseif($keys==='ALL'){<br />
			// Si l'exclude és especificat<br />
			if (isset($exclude)){<br />
				// És un array<br />
				if(is_array($exclude)){<br />
					// I la clau actual NO hi és en l'array, llavors afegim la clau i el valor en el nou array<br />
					if (!in_array($key,$exclude)) $array[$key] = $val;<br />
				// Sinó és un array<br />
				}else{<br />
					if ($key!=$exclude) $array[$key] = $val;<br />
				}<br />
			// Si no especifiquem l'exclude afegim tots els valors<br />
			}else{<br />
				$array[$key] = $val;<br />
			}<br />
		// Si no és cap de les anteriors (únicament especifiquem una clau) la retornem amb el seu valor<br />
		}else return $_POST[$keys];<br />
	}<br />
	return $array;<br />
}[/php]
<h2>¿Qué hace?</h2>

Recupera toda la información POST y la vuelca en un array según las claves que le hayamos especificado. Este array generado es un array asociativo con las mismas claves que las recibidas vía POST.

Podemos recuperar las claves deseadas (pasándolas en un array) o bien podemos recuperarlas todas (indicando "ALL").

También funciona a la inversa, es decir... si le pasámos como parámetro $keys = "ALL" y como segundo parámetro ($exclude) un array con nombres de variables POST guardará en el array todas las claves POST excepto las que hayamos indicado como segundo parámetro.
<h2>¿Cómo funciona?</h2>
<blockquote>
<h5><em><span style="color: #888888;">array</span> fillPost ( <span style="color: #888888;">array/string</span> $keys [, <span style="color: #888888;">array/string</span> $exclude ] )</em></h5>

<strong><em>keys</em></strong><br />
Una cadena de texto o un array de cadenas de texto indicando las claves que deseamos. Si utilizamos "<em>ALL</em>" recuperamos toda la información.

<strong><em>exclude</em></strong><br />
Una cadena de texto o un array de cadenas de texto indicando las claves que NO deseamos incluir (útil utilizando "<em>ALL</em>" como parámetro <em>keys</em>.

<strong><em>Variables que retorna</em></strong><br />
Un array asociativo.</blockquote>
<h5>Comentarios del código (traducidos)</h5>

<ul>
<li>Generamos un bucle con toda la información POST

<ul>
<li> Si la variable $keys es un array...

<ul>
<li>Y la clave actual se encuentra dentro del array, entondes añadimos la clave y el valor al nuevo array</li>
</ul>
</li>
<li> Si no es un array y su contenido es exactamente "ALL"...

<ul>
<li> Si se especifica la variable exclude...

<ul>
<li> Y ésta es un array...

<ul>
<li>Si la clave actual NO está en el array de eclusiones, la añadimos al nuevo array</li>
</ul>
</li>
<li> Si no es un array...

<ul>
<li>Si la clave actual NO es la de la variable $exclude, se añade al nuevo array</li>
</ul>
</li>
</ul>
</li>
<li> Si no se especifica la variable $exlude...

<ul>
<li> Se añaden todos los campos al nuevo array</li>
</ul>
</li>
</ul>
</li>
<li> Si no es ninguna de las anteriores (es decir, si sólo hemos indicado una clave) se devuelve dicha clave.</li>
</ul>
</li>
</ul>
<h2>Ejemplos</h2>

Recuperando algunas claves $_POST:<br />
[php]$datos = array('nombre','password','email');<br />
$post = fillPost($datos);<br />
print_r($post);[/php]<br />
Salida aproximada:

Array
(
    ['nombre'] => "Valor de la variable $_POST['nombre']"
    ['password'] => "Valor de la variable $_POST['password']"
    ['email'] => "Valor de la variable $_POST['email']"
)

Recuperando todas las claves $_POST menos algunas:<br />
[php]$excluir = array('nombre','password','email');<br />
$post = fillPost('ALL',$excluir);<br />
print_r($post);[/php]<br />
Salida aproximada:

Array
(
    ['avatar'] => "Valor de la variable $_POST['avatar']"
    ['fecha_nacimiento'] => "Valor de la variable $_POST['fecha_nacimiento']"
    ['cualquierVariablePostQueNoEstéEnExclude'] => ....
)

Todavía se podría mejorar un poco añadiendo un tercer parámetro por referencia (por si nos interesa modificar la tabla por refencia) y probablemente alguna cosilla más, pero eso ya os lo dejo a vuestro gusto :)
