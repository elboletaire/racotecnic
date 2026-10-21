---
layout: post
status: publish
published: true
title: MyJDB, un sistema de base de datos en JavaScript
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 1401
wordpress_url: http://racotecnic.com/?p=1401
redirect_from:
- "?p=1401/"
date: '2010-02-25 20:47:40 +0100'
date_gmt: '2010-02-25 19:47:40 +0100'
categories:
- Programació
- Web
tags:
- JavaScript
- Bases de dades
- MyJDB
- JavaScriptDB
---

El próximo lunes 1 de marzo (de 2010) verá la luz la primera versión de <a title="Web oficial de MyJDB" href="http://www.myjdb.org/" target="_blank">MyJDB</a>, un sistema de bases de datos inspirado en JavaScriptDB (muerto hacia el 2005..) resucitado por Luis García.

Lo mas destacado de esta versión (beta 1.1.0), que es más un puente hacia lo que se quiere llegar, es la optimización del código, aunque es la primera optimización los resultados han sido cuanto menos sorprendentes. Entre sus cambios destacan los siguientes:

<ul>
<li>Relicenciamiento a GPL 3.</li>
<li>Documentación interna completa y en Ingles, así como las variables que pasan del catalán al ingles para internacionalizar el proyecto.</li>
<li>Reestructuración completa del código.</li>
<li>Nuevo analizador sintactico del Select sobre un 40% más rápido.</li>
<li>Tipado de datos de los campos de las tablas, lo que nos ayuda a evaluar correctamente números, cadenas y sobre todo fechas.</li>
<li>El algoritmo para realizar JOIN entre dos tablas es alrededor de 640 veces más rápido.</li>
<li>Se ha añadido el uso de between, el uso de parentesis, reconocimiento de '<=>'.</li>
<li>Implementación de la clausula limit.</li>
<li>Reconocimiento de is, is not, is null, is not null y unknown.</li>
<li>Realización de un select con sólo contando el tiempo de la clausula where alrededor de un 40 veces más rápido.</li>
<li>Evaluación de la clausula where alrededor de un 94% más rápido.</li>
<li>La evaluación de una condición LIKE es alrededor de 8 veces más rápida.</li>
<li>La clausula Order by es alrededor de 2 veces más rápido.</li>
</ul>

Los tiempos han sido medidos con Firefox y el prerfilador de Firebug, con lo que aun queda probarlo en el resto de navegadores, y este es el objetivo de lanzar la beta, probarla y hacerla compatibles con el resto de navegadores (no van a incluir IE6, sólo versiones de IE7 hacia arriba).

Yo personalmente me pregunto cómo será todo el tema de la seguridad... ya que siendo una base de datos mediante JavaScript lo primero en lo que pienso es la manipulación que se puede hacer de código gracias a aplicaciones como firebug.
