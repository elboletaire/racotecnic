---
layout: post
status: publish
published: true
title: Rango Dinámico y Bit Depth, esos grandes desconocidos
author:
  display_name: '909'
  login: '909'
  email: gerardperucha@hotmail.com
  url: ''
author_login: '909'
author_email: gerardperucha@hotmail.com
excerpt: "Bueno me estreno como bloggeador, a ver que tal se me da ;)\r\n\r\nMuchas
  veces escuchamos temas y nos parecen absolutos temazos y otra veces nos parecen
  una pérdida de tiempo. En cierta medida es por la música que se escucha. Pero hoy
  vamos un poco más allá. Ya me atrevo a decir, que parte de que un tema acabe por
  agradarnos es debido a que existen dos conceptos que últimamente no se tienen muy
  en encuenta en producción.\r\n\r\nMe refiero al **Rango Dinámico**.\r\n\r\nQué
  es? Pues no es más que la diferencia entre el pico(peaks) más alto posible y el
  umbral de ruido, Sí, siempre hay una base de ruido, hasta en el mejor estudio insonorizado.
  Y esto como afecta a que lo que escuche sea un temazo? Muy fácil, ya que esta variación
  de amplitud influye en la intensidad sonora, en como fluye el tema, la diferencia
  en fuertes y débiles.  También hay que tener en cuenta la amplitud nominal específica
  de cada equipo, lo que se denomina el **techo dinámico o Headroom**.
  Normalmente se queda en 120Db, ya que es el límite que permiten los circuitos integrados.
  Lo que nosotros escuchamos de todo esto es el **SNR**, **signal
  noise ratio**, es decir la relación entre el ruido residual y la señal promedio
  del tema.\r\n\r\n"
wordpress_id: 271
wordpress_url: http://racotecnic.underave.net/?p=271
date: '2009-03-19 12:56:52 +0100'
date_gmt: '2009-03-19 11:56:52 +0100'
categories:
- Audio
tags:
- Rango dinámico
- Bit depth
- Mastering
- Audio digital
---

Bueno me estreno como bloggeador, a ver que tal se me da ;)

Muchas veces escuchamos temas y nos parecen absolutos temazos y otra veces nos parecen una pérdida de tiempo. En cierta medida es por la música que se escucha. Pero hoy vamos un poco más allá. Ya me atrevo a decir, que parte de que un tema acabe por agradarnos es debido a que existen dos conceptos que últimamente no se tienen muy en encuenta en producción.

Me refiero al **Rango Dinámico**.

Qué es? Pues no es más que la diferencia entre el pico(peaks) más alto posible y el umbral de ruido, Sí, siempre hay una base de ruido, hasta en el mejor estudio insonorizado. Y esto como afecta a que lo que escuche sea un temazo? Muy fácil, ya que esta variación de amplitud influye en la intensidad sonora, en como fluye el tema, la diferencia en fuertes y débiles.  También hay que tener en cuenta la amplitud nominal específica de cada equipo, lo que se denomina el **techo dinámico o Headroom**. Normalmente se queda en 120Db, ya que es el límite que permiten los circuitos integrados. Lo que nosotros escuchamos de todo esto es el **SNR**, **signal noise ratio**, es decir la relación entre el ruido residual y la señal promedio del tema.

<a id="more"></a><a id="more-271"></a>

Si trasladamos esto a nuestros quehaceres como músicos quiere decir que ninguna frecuencia que estemos usando dentro de nuestro tema debe ser fija, lo que se denomina <em>average</em>, y que demasiada compresión es mala también, ya que puede aplastar el sonido, ya que aplicar un compresor disminuye las diferencias dinámicas. Esto también incluye la mezcla y la normalización (de la que hablaremos más adelante) Donde algunos recursos nos pueden ayudar a lograr que nuestro tema abarque el mayor rango dinámico en todas sus frecuencias. Como por ejemplo: Si se reduce la amplitud dela frecuencias medias, aproximadamente las frecuencias de 250Hz, se consigue potenciar frecuencias de 5KHz.

Otro recurso que a veces fallamos cuando estamos tocando algún sintetizador, ya sea analógico o digital, o cuando estamos realizando la mezcla  es el **Bit Depth o Resolución/Cuantización de bits** .

El <em>**Bit Depth**</em> es la amplitud de variaciones de una onda de sonido. Traducido al cristiano, el número de bits registrados por <em>sample</em>. Esto afecta al concepto antes explicado, rango dinámico, ya que a mayor profundidad de bits, mayor posibilidad de trabajar con amplios rangos dinámicos, lo que se denomina **rule-of-thumb**. Ya que por ejemplo, si trabajamos con sintetizadores de 8 bits, que están tan de moda, estamos diciendo que este sintetizador, la onda que envía de salida, solo permite registrar 256 variaciones en la amplitud dela onda. Recordemos que8 bits = 2 a  la 8. Con esto no quiero decir que un sintetizador de 8 bits sea malo, cada uno hace su función, pero se encuentran muchos casos donde se le piden peras al olmo, cuando todos sabemos que tienes que ir al peral. Me gustaría hacer hincapié en este concepto sobretodo para los usamos sintetizadores analógicos, cajas ritmos, <em>samplers</em>. Ya que el <em>bit depth</em> dentro de un PCM, la representación digital de un sonido analógico, recrea el máximo rango dinámico, lo que quiere decir que el sonido sera más real.

Volvamos entonces a la pregunta antes formulada. ¿Cómo afecta esto a que mi tema para que suene a bien? Bueno el <em>bit depth</em> limita la cantidad de rango dinámico y <em>signal noise ratio</em>. Lo que hace que si abarcamos una mayor resolución de bits podremos interactuar con más precisión dentro del tema que estemos componiendo y por consiguiente mejorar la señal de salida del conjunto.

Aun así, siento ser así de aguafiestas, el problema del <em>bit depth</em> viene dado a que hoy en día usamos un formato que tiene una compresión muy baja y mala, como el MP3 o WMA. Aunque tu exportes  a 24 bits, no quiere decir que el MP3/WMA  tenga un <em>bit depth</em> de 24 bits, ya que tu los has masterizado a 24 bits pero luego ha sido comprimido y es donde se falla. Esto también pasa incluso si copiamos directamente a un CD, ya que los CD's se graban a 16 bits.
