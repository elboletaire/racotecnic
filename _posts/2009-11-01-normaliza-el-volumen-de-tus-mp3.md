---
layout: post
status: publish
published: true
title: Normaliza el volumen de tus mp3
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "¿¿No estáis hartos de tener que ir subiendo y bajando el volumen de los
  altavoces porque cada canción tiene un volumen distinto??\r\n\r\nCon mp3gain podéis
  <strong>normalizar el volumen</strong> de vuestros <strong>mp3</strong> muy fácilmente
  (para los usuarios que manejen habitualmente la consola.. claro xD).\r\n\r\nPodéis
  descargar mp3gain de la <a title=\"Página del proyecto en sourceforge\" href=\"http://sourceforge.net/projects/mp3gain/\"
  target=\"_blank\">página oficial</a> (está disponible para Windows y en código fuente).
  Los usuarios que utilicéis debian o ubuntu podréis encontrarlo en los repositorios.\r\n\r\nPara
  utilizarlo recomiendo que utilicéis la opción de normalizado automático, la \"-r\":\r\n\r\n[bash
  light=\"true\"]mp3gain -r *.mp3[/bash]\r\n\r\nHaciendo esto dentro de una carpeta
  con mp3 normalizaréis cada uno de ellos a un volumen estándar.\r\n\r\n"
wordpress_id: 908
wordpress_url: http://racotecnic.underave.net/?p=908
date: '2009-11-01 01:54:03 +0100'
date_gmt: '2009-11-01 00:54:03 +0100'
categories:
- Linux
- Aplicacions
- Audio
- Windows
tags:
- mp3
- Shell
- Consola
---

¿¿No estáis hartos de tener que ir subiendo y bajando el volumen de los altavoces porque cada canción tiene un volumen distinto??

Con mp3gain podéis <strong>normalizar el volumen</strong> de vuestros <strong>mp3</strong> muy fácilmente (para los usuarios que manejen habitualmente la consola.. claro xD).

Podéis descargar mp3gain de la <a title="Página del proyecto en sourceforge" href="http://sourceforge.net/projects/mp3gain/" target="_blank">página oficial</a> (está disponible para Windows y en código fuente). Los usuarios que utilicéis debian o ubuntu podréis encontrarlo en los repositorios.

Para utilizarlo recomiendo que utilicéis la opción de normalizado automático, la "-r":

[bash light="true"]mp3gain -r *.mp3[/bash]

Haciendo esto dentro de una carpeta con mp3 normalizaréis cada uno de ellos a un volumen estándar.

<a id="more"></a><a id="more-908"></a><br />
[bash light="true"]01 Freeson - Mozart is Back.mp3<br />
Applying mp3 gain change of -1 to 01 Freeson - Mozart is Back.mp3...<br />
02 TDF - Just a trip.mp3<br />
Applying mp3 gain change of -4 to 02 TDF - Just a trip.mp3...<br />
03 Madame - Bleeding Trees.mp3<br />
Applying mp3 gain change of -2 to 03 Madame - Bleeding Trees.mp3...<br />
04 Dj Fane a.k.a Skrachnbass - Shit Me Good.mp3<br />
Applying mp3 gain change of -3 to 04 Dj Fane a.k.a Skrachnbass - Shit Me Good.mp3...<br />
05 Naw - Skorch The Floor!.mp3<br />
Applying mp3 gain change of -6 to 05 Naw - Skorch The Floor!.mp3...<br />
06 Pisu - Dubstep Warrior.mp3<br />
Applying mp3 gain change of -3 to 06 Pisu - Dubstep Warrior.mp3...<br />
07 Dijeyow - Lookgyal.mp3<br />
Applying mp3 gain change of -4 to 07 Dijeyow - Lookgyal.mp3...<br />
08 Oddiohm - 2levels.mp3<br />
Applying mp3 gain change of -5 to 08 Oddiohm - 2levels.mp3...<br />
09 M_Box - Decadence Live.mp3<br />
Applying mp3 gain change of -2 to 09 M_Box - Decadence Live.mp3...<br />
10 Dj Danik - Chun Li Stage.mp3<br />
Applying mp3 gain change of -5 to 10 Dj Danik - Chun Li Stage.mp3...<br />
11 Murdarah - Ladera Da Morte.mp3<br />
Applying mp3 gain change of -5 to 11 Murdarah - Ladera Da Morte.mp3...<br />
12 Fernival - Tempfesta.mp3<br />
Applying mp3 gain change of -3 to 12 Fernival - Tempfesta.mp3...<br />
13 Jera - Gentleman.mp3<br />
Applying mp3 gain change of -4 to 13 Jera - Gentleman.mp3...<br />
13 Montek - Know Your Limits.mp3<br />
Applying mp3 gain change of -7 to 13 Montek - Know Your Limits.mp3...<br />
14 Pinyol - Elepumbab.mp3<br />
Applying mp3 gain change of 1 to 14 Pinyol - Elepumbab.mp3...<br />
15 Icebreaker - Melamina Sunrise.mp3<br />
Applying mp3 gain change of -4 to 15 Icebreaker - Melamina Sunrise.mp3...<br />
16 Korby - Journeys.mp3<br />
Applying mp3 gain change of -1 to 16 Korby - Journeys.mp3...<br />
17 Monolith Vs Bunkertronics - Lifesupport System (Bunkersphere Bodymix).mp3<br />
Applying mp3 gain change of -4 to 17 Monolith Vs Bunkertronics - Lifesupport System (Bunkersphere Bodymix).mp3...<br />
18 Sikotik - Roow.mp3<br />
[19/19] 97% of 5572608 bytes analyzed[/bash]

Si queréis normalizar todos los mp3 de una carpeta podéis hacerlo con con algún código bash como este:<br />
[bash]find . -type d -print |<br />
while read dirname<br />
do<br />
  cd '$dirname'<br />
  mp3gain -r -k *.mp3<br />
  cd -<br />
done[/bash]

Aunque no os recomiendo utilizar este porque no es muy seguro y no funciona del todo. Como suele decirse, <b><em>use at your own risk</em></b>. Lo mejor es que lo hagáis carpeta por carpeta. Para ahorraros trabajo podríais haceros un script de nautilus ;)
