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
  POST.\r\n\r\nHarto de pasarme el día haciendo esto:\r\n\r\n~~~php
$variable = array($_POST['var1'],$_POST['var2'],$_POST['var3'],$_POST['varN']);
~~~\r\n\r\n...decidí
  hacer una función que me hiciera la tarea un poco más sencilla; aquí está:\r\n\r\n"
wordpress_id: 525
wordpress_url: http://racotecnic.com/?p=525
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

Haciendo un poco de orden por el ordenador he encontrado una función que hice
para el último trabajo en el que estuve. Me dedicaba sobre todo a crear
aplicaciones de entrada de datos mediante PHP, así que me pasaba el día
recuperando información POST.

Harto de pasarme el día haciendo esto:

~~~php?start_inline=1
$variable = array($_POST['var1'],$_POST['var2'],$_POST['var3'],$_POST['varN']);
~~~

...decidí hacer una función que me hiciera la tarea un poco más sencilla; aquí está:

~~~php?start_inline=1
function fillPost($keys, $exclude = null)
{
  $array = array();
  // Fem un bucle amb tota la informació post
  foreach ($_POST as $key => $val) {
    // Si la variable keys és un array
    if (is_array($keys)) {
      // I la clau actual és dins de l'array, llavors afegim la clau i el valor en el nou array
      if (in_array($key, $keys)) {
        $array[$key] = $val;
      }
    // Si no és array i el seu contingut és exactament ALL
    } elseif ($keys === 'ALL') {
      // Si l'exclude és especificat
      if (isset($exclude)) {
        // És un array
        if (is_array($exclude)) {
          // I la clau actual NO hi és en l'array, llavors afegim la clau i el valor en el nou array
          if (!in_array($key,$exclude)) {
            $array[$key] = $val;
          }
        // Sinó és un array
        } else {
          if ($key != $exclude) {
            $array[$key] = $val;
          }
        }
      // Si no especifiquem l'exclude afegim tots els valors
      } else {
        $array[$key] = $val;
      }
    // Si no és cap de les anteriors (únicament especifiquem una clau) la retornem amb el seu valor
    } else {
      return $_POST[$keys];
    }
  }
  return $array;
}
~~~

## ¿Qué hace?

Recupera toda la información POST y la vuelca en un array según las claves que le hayamos especificado. Este array generado es un array asociativo con las mismas claves que las recibidas vía POST.

Podemos recuperar las claves deseadas (pasándolas en un array) o bien podemos recuperarlas todas (indicando "ALL").

También funciona a la inversa, es decir... si le pasámos como parámetro `$keys = "ALL" y como segundo parámetro ($exclude) un array con nombres de variables POST guardará en el array todas las claves POST excepto las que hayamos indicado como segundo parámetro.

## ¿Cómo funciona?

<blockquote>
  <h5><em><span style="color: #888888;">array</span> fillPost ( <span style="color: #888888;">array/string</span> $keys [, <span style="color: #888888;">array/string</span> $exclude ] )</em></h5>
  <strong><em>keys</em></strong>
  Una cadena de texto o un array de cadenas de texto indicando las claves que deseamos. Si utilizamos "<em>ALL</em>" recuperamos toda la información.
  <strong><em>exclude</em></strong>
  Una cadena de texto o un array de cadenas de texto indicando las claves que NO deseamos incluir (útil utilizando "<em>ALL</em>" como parámetro <em>keys</em>.
  <strong><em>Variables que retorna</em></strong>
  Un array asociativo.
</blockquote>

#### Comentarios del código (traducidos)

- Generamos un bucle con toda la información POST
  + Si la variable $keys es un array...
    * Y la clave actual se encuentra dentro del array, entondes añadimos la clave y el valor al nuevo array</li>
  + Si no es un array y su contenido es exactamente "ALL"...
    * Si se especifica la variable exclude...
      - Y ésta es un array...
        + Si la clave actual NO está en el array de eclusiones, la añadimos al nuevo array</li>
      - Si no es un array...
        + Si la clave actual NO es la de la variable $exclude, se añade al nuevo array</li>
    * Si no se especifica la variable $exlude...
      - Se añaden todos los campos al nuevo array</li>
  + Si no es ninguna de las anteriores (es decir, si sólo hemos indicado una clave) se devuelve dicha clave.

## Ejemplos

Recuperando algunas claves $_POST:

~~~php?start_inline=1
$datos = array('nombre', 'password', 'email');
$post = fillPost($datos);
print_r($post);
~~~

Salida aproximada:

    Array
    (
        ['nombre'] => "Valor de la variable $_POST['nombre']"
        ['password'] => "Valor de la variable $_POST['password']"
        ['email'] => "Valor de la variable $_POST['email']"
    )

Recuperando todas las claves $_POST menos algunas:

~~~php?start_inline=1
$excluir = array('nombre', 'password', 'email');
$post = fillPost('ALL', $excluir);
print_r($post);
~~~

Salida aproximada:

    Array
    (
        ['avatar'] => "Valor de la variable $_POST['avatar']"
        ['fecha_nacimiento'] => "Valor de la variable $_POST['fecha_nacimiento']"
        ['cualquierVariablePostQueNoEstéEnExclude'] => ....
    )

Todavía se podría mejorar un poco añadiendo un tercer parámetro por referencia (por si nos interesa modificar la tabla por refencia) y probablemente alguna cosilla más, pero eso ya os lo dejo a vuestro gusto :)
