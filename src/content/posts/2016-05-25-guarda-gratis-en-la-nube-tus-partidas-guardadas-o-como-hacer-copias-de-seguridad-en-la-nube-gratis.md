---
layout: post
title: "Guarda GRATIS en la nube tus partidas guardadas o cómo hacer copias de seguridad en la nube gratis"
modified: 2016-05-25 19:15:51 +0200
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
image:
  feature:
  credit:
  creditlink:
comments:
share:
categories:
- Windows
- Linux
- Mac
tags: [Consola]
---

Ya hace unos años que hago esto y la verdad es que es muy práctico. Consiste
básicamente en subir automáticamente las partidas guardadas a un servicio en la
nube como
<a href="https://db.tt/5HdFOXd" target="_blank" rel="nofollow">Dropbox</a>,
Mega u ownCloud.

Me voy a centrar en hablar de partidas guardadas, pero el caso es que lo que
aprenderéis es a automatizar el proceso de copia en la nube, de modo que lo
podéis aprovechar para hacer copia de más cosas (como de vuestros documentos más
importantes).

Antes de empezar, aclarar que voy a hacer el tutorial para Mac, Linux y Win, pero
en el caso de Windows todos los ejemplos serán con versiones posteriores a Windows
Vista. Si estás utilizando Windows XP (seriously?) deberás buscar las
ubicaciones equivalentes.

Básicamente necesitaréis una cuenta en cualquier servicio en la nube que tenga
cliente de sincronización. ¿Que qué coño es eso de "cliente de sincronización"?
Pues una aplicación que se encarga de tener sincronizados tus ficheros entre tu
ordenador y el servicio de almacenaje en cuestión, a.k.a. "la nube".

Así que [lo primero es crearse la cuenta si no lo habéis hecho ya](https://db.tt/5HdFOXd).

A continuación dejo enlazados los clientes de los tres servicios que he mencionado:

- [**Dropbox:**](https://db.tt/5HdFOXd) https://www.dropbox.com/install
- **Mega:** https://mega.nz/#sync
- **ownCloud:** https://owncloud.com/products/desktop-clients/

> No es intención de esta guía explicar las diferencias entre ellos ni tampoco
comparar sus características. Dejo a vuestra elección el servicio a elegir
—en caso de no estar utilizando uno ya.

Ahora que ya tenéis cuenta en la nube y tenéis el cliente instalado, procedamos
a hacer la copia en la nube.

Antes de proceder, necesito que entendáis mínimamente qué es lo que vamos a hacer,
aunque si os la suda y queréis hacer el mono copiando-pegando podéis pasar a la
parte final.

Lo que vamos a hacer es crear un "enlace simbólico" (_symlink_ en inglés) en la
carpeta de Dropbox que enlace hacia la carpeta donde estén las partidas guardadas
en cuestión.

En sistemas Unix (como Mac o Linux) un enlace simbólico suele ser lo mismo que un
acceso directo (_shortcut_ en inglés), pero en Windows no tienen nada que ver:

- Un acceso directo es un fichero con extensión `.lnk`. Si creamos un acceso
  directo a una partida guardada en nuestro servicio en la nube lo que estaremos
  haciendo es subir un fichero con estensión `.lnk` a dropbox. Vamos, algo inútil.
- Un enlace simbólico no tiene extensión específica, pero siempre comparte las
  características de aquello que hemos enlazado. Esto quiere decir que si enlazamos
  simbólicamente una carpeta nuestro sistema se creerá que esa carpeta está ahí.
  O dicho de otro modo, si hacemos un enlace simbólico hacia una carpeta en nuestro
  dropbox, dropbox creerá que es una carpeta, subiendo los contenidos de ésta
  (pero en nuestro sistema sólo nos ocupará espacio la carpeta real).

Dicho esto, **da igual el orden en que hagáis el enlace simbólico**; podéis tener
las carpetas originales en el servicio de la nube y enlazar hacia la carpeta
de la partida guardada (es lo que hago yo cuando instalo un juego del que ya tengo
partida guardada) o bien puede ser al revés: que tengáis la partida guardada en
su directorio original y creéis un enlace hacia ella en el servicio de la nube
(es lo que hago la primera vez que instalo un juego).

Vamos, que podéis utilizar uno u otro indistintamente, pero en mi caso utilizo
según me conviene, por comodidad. Así no tengo que ir moviendo ficheros de un
sitio a otro.

Al grano
--------

Bueno, ahora sólo nos queda una cosa: crear el enlace simbólico.

Para ello necesitas saber la ubicación exacta de:

- La partida guardada a salvar en la nube (cada juego guarda donde le da la puta gana).
- La ubicación en tu servicio de la nube donde lo quieras almacenar.

Os recomiendo que creéis una carpeta en vuestro servicio en la nube para tenerlo
todo bien agrupado. En los ejemplos utilizaré la ubicación
`C:\Users\USUARIO\ownCloud\Saved Games`

El primer ejemplo lo haré con **The Witcher 3**. Las partidas guardadas están en
`Mis Documentos/The Witcher 3` que, si no habéis cambiado la ubicación de la carpeta
`Mis Documentos` debería ser:

`C:\Users\USUARIO\Documents\The Witcher 3`

Vale, ahora viene la parte que no he avisado y a la que muchos tendréis miedo: la
consola.

Abrid una consola con permisos de administración (tecla de Windows, escribes `cmd`
y le das a `Shift + Enter`) y teclead lo siguiente:

~~~bash
mklink /?
~~~

El comando en cuestión es `mklink` y al pasarle `/?` como parámetro, os devolverá
la ayuda, que debería ser algo parecido a esto:

    Crea un vínculo simbólico.

    MKLINK [[/D] | [/H] | [/J]] Vínculo Destino

            /D      Crea un vínculo simbólico a un directorio. El valor
                    predeterminado es un vínculo simbólico a un archivo.
            /H      Crea un vínculo físico en lugar de un vínculo simbólico.
            /J      Crea una unión de directorios.
            Vínculo Especifica el nombre del nuevo vínculo simbólico.
            Destino Especifica la ruta (relativa o absoluta) a la que hace
                    referencia el nuevo vínculo.

Tal como pone en la ayuda, tendremos que indicar tres parámetros:

- `/D` para indicar que estamos haciendo un enlace simbólico de un directorio.
- `Vínculo` la ubicación del vínculo simbólico.
- `Destino` a qué enlaza ese vínculo simbólico.

Así pues, siguiendo el ejemplo de The Witcher 3, en mi caso debería hacer:

~~~bash
mklink /D "C:\Users\USUARIO\ownCloud\Saved Games\The Witcher 3" "C:\Users\USUARIO\Documents\The Witcher 3"
~~~
> No hace falta entrecomillar los parámetros si la ubicación no tiene espacios.

Y listos. Como resultado la consola os indicará que el enlace simbólico ha sido creado.

Sistemas UNIX (Linux / Mac)
---------------------------

En el caso de los sistemas UNIX el comando a utilizar es `ln`. Utilizad
`ln --help` para ver todas las opciones posibles (es bastante más extenso que
el comando `MKLINK` de Windows).

Siguiendo el ejemplo de Windows, aquí tenéis que tener en cuenta que los argumentos
`Vículo` y `Destino` están intercambiados y que habrá que utilizar la opción `-s`
para indicarle que es un enlace simbólico.

Así pues, siguiendo el ejemplo de Windows de The Witcher 3 (que por desgracia no
está para sistemas Unix), sería:

~~~bash
ln -s  /home/USUARIO/Documents/The\ Witcher\ 3 /home/USUARIO/ownCloud/Saved\ Games/The\ Witcher\ 3
~~~

Más ejemplos
------------

Para no liar seguiré utilizando la misma ubicación para mis partidas guardadas,
`C:\Users\USUARIO\ownCloud\Saved Games`.

### Rockstar Games / GTA

En este caso copio la carpeta `Rockstar Games` entera:

~~~bash
mklink /D "C:\Users\USUARIO\ownCloud\Saved Games\Rockstar Games" "C:\Users\USUARIO\Documents\Rockstar Games"
~~~

Unix:

~~~bash
ln -s /home/USUARIO/Documents/Rockstar\ Games /home/USUARIO/ownCloud/Saved\ Games
~~~

### Tropico 4 / 5

~~~bash
mklink /D "C:\Users\USUARIO\ownCloud\Saved Games\Tropico 4" "C:\Users\USUARIO\AppData\Roaming\tropico 4"
mklink /D "C:\Users\USUARIO\ownCloud\Saved Games\Tropico 5" "C:\Users\USUARIO\AppData\Roaming\tropico 5"
~~~

Unix:

~~~bash
ln -s /home/USUARIO/Documents/Tropico\ 4 /home/USUARIO/ownCloud/Saved\ Games
ln -s /home/USUARIO/Documents/Tropico\ 5 /home/USUARIO/ownCloud/Saved\ Games
~~~

Más usos
--------

- Copias de seguridad de todo tipo.
- Mover una aplicación/juego entre discos duros y crear un enlace simbólico evitará que
  tengáis que reinstalarlo o reubicar sus accesos directos.
- Organizar ficheros o directorios.
- Compartir ficheros en múltiples directorios sin ocupar el espacio que todos
  ellos requieren y teniendo todos los ficheros en cuestión actualizados.
