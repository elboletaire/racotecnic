---
layout: post
status: publish
published: true
title: 'Síntesis FM: El patito feo de la sintetización. (Parte 1)'
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 1983
wordpress_url: http://www.racotecnic.com/?p=1983
date: '2010-01-26 15:49:16 +0100'
date_gmt: '2010-01-26 14:49:16 +0100'
categories:
- General
tags: []
---
<blockquote><em>Este artículo proviene del audioblog, clausurado por su desuso y cuyas entradas han sido movidas a este blog para que no se pierdan en el olvido.</em>

Entrada escrita originalmente por <strong>909</strong>.</blockquote>

Fuera de la coña que pueda tener el titulo, no se va tan lejos de la realidad. La síntesis FM, no deja ser un proceso muy costoso en paciencia y esfuerzo, y muy alejado de la "nueva técnica" desarrollada llamada el "toqueteo", ya que, a diferencia con otros tipos de síntesis los resultados son muy dispares y una complejidad muy superior a cualquier otra síntesis. Fuera de la crítica, constructiva, sobre el "toqueteo" en la síntesis, esta no deja de ser una presima básica para cualquiera que quiera dedicarse a saber programar síntesis FM, ya veremos durante los siguientes articulos sobre síntesis FM, que es un hueso muy duro de roer y de resultados bastante aleatorios. Por lo que si quieres toquetear, cierra tu navegador y ponte a jugar con tu NI Massive, este no es tu sitio. :P

Antes de ponernos a explicar cómo funciona la síntesis FM, deberíamos hacer un poco de historia, y explicar qué es y qué instrumentos son sintetizadores FM. Vamos, de lo que va a tratar esta primera parte.

En 1973 <strong>John Chowning</strong>, el padre putativo de la síntesis FM, publica un artículo haciendo referencia a este punto y argumentando su descubrimiento al obtener sonidos por medio de procedimiento electrónicos utilizando una técnica familiar a la <span style="color: #99ccff;"><em><span style="color: #666699;"><strong>tecnología de radio</strong></span></em> </span>y <em><span style="color: #666699;"><strong>transmisión de ondas,</strong></span> </em>en búsqueda como objetivo de sonidos similares con la voz humana donde el contenido armónico espectral es de una riqueza formidable; Es decir, la síntesis FM nace de la teoría por la que <span style="color: #888888;"><em><strong><span style="color: #666699;">es posible alcanzar a programar sonidos naturales mediante una edición electrónica</span></strong></em></span>. Al estar experimentando con diferentes tipos y tasas de vibrato y tremolo en la voz, <strong><span style="color: #666699;">Chowning </span></strong>descubrió que con velocidades por encima de la capacidad humana y frecuencias con una rapidez similar a las de frecuencias de audio, comienzan a aparecer componentes armónicos proporcionales a mas o menos la frecuencia portadora del tono que se estaba haciendo vibrar. Así pues, el timbre de los sonidos tiene como característica principal un espectro relativamente complejo y que se desenvuelve con la duración del sonido. Por lo tanto <strong><em><span style="color: #666699;">cada elemento o componente del espectro posee su propio desarrollo individual produciendo un desarrollo espectral en la duración del sonido</span>.</em></strong>

Si nos ponemos un poco "científicos" descubrimos que en la FM, <em><span style="text-decoration: underline;">la frecuencia instantánea de una onda portadora es variada de acuerdo a una onda moduladora</span></em>, de tal forma que los cambios en la portadora se convierten en la frecuencia de la onda moduladora o<span style="color: #666699;"><strong> <em>frecuencia moduladora</em></strong></span>. La cantidad de variación en la onda portadora cambia alrededor de un promedio que se conoce como la desviación de picos de frecuencia entre ambas ondas y a la vez es proporcional a la amplitud de la onda moduladora. Los parámetros de una señal con características de frecuencia modulada son los siguientes:

<ul>
<li><img src="https://ccrma.stanford.edu/~juanig/articles/fundfm/img1.png" alt="$ {c, }$" width="18" height="33" align="middle" border="0" /> Frecuencia de la portadora o frecuencia promedio.</li>
<li><img src="https://ccrma.stanford.edu/~juanig/articles/fundfm/img2.png" alt="$ {m, }$" width="26" height="33" align="middle" border="0" /> Frecuencia moduladora.</li>
<li><img src="https://ccrma.stanford.edu/~juanig/articles/fundfm/img3.png" alt="$ {d, }$" width="20" height="35" align="middle" border="0" /> Desviación de picos de frecuencia.</li>
</ul>

En resumida cuentas, en síntesis FM normalment se utilizan varios osciladores, llamados <strong><em><span style="color: #666699;">operadores</span></em></strong>, donde unos actuan como generadores de onda y otros modulan en frecuencia esa señal. Estos, los operadores, se colocan de distintos modos, por ejemplo varios generando ondas distintas y uno modulando todos a distintas intensidades, creando lo que se denomina, <strong><span style="color: #666699;"><em>algoritmos</em></span></strong>.

Para saber que sintetizadores utilizan la síntesis FM hay que también hacer un poco de historia. Ya que <strong><span style="color: #666699;">Chownig </span></strong>vendió la patente de la síntesis FM a <strong><span style="color: #666699;">Yamaha </span></strong>en 1975. Yamaha lanzó posteriormente sus primeros sintetizadores de FM, los <span style="color: #666699;">GS-1</span> y <span style="color: #666699;">GS-2</span>, que eran muy caros y pesados. Yamaha pronto siguió con la serie del GS, que utilizó un par de más pequeños llamados <span style="color: #666699;">Combo CE20</span> y <span style="color: #666699;">CE25<span style="color: #000000;">, lo que podría llamarse la segunda generación FM de Yamaha</span> </span>.

La tercera generación Yamaha de sintetizadores se convirtió en su más popular. Éstos consistieron en el <span style="color: #666699;"><strong>DX7</strong></span> y el <span style="color: #666699;">DX9</span> (1983) y posteriormente la serie <span style="color: #666699;">TX <span style="color: #000000;">como los modelos </span>TX7 <span style="color: #000000;">y</span> TX81Z<span style="color: #000000;">, que no dejan de ser DX pero en formato modulo/rack, y poco más tarde los también famosos <span style="color: #666699;">FB-01</span></span></span>. Ambos modelos anteriormente mencionados, <span style="color: #666699;">DX7</span> y <span style="color: #666699;">DX9</span>, eran compactos y a un precio razonablemente, siendo el <span style="color: #666699;"><strong>DX7</strong></span> el primer sintetizador <em>all-digital</em> del mercado, . Llegó a ser y es imprescindible a muchos artistas de la música de los años 80, 90 y actuales, como por ejemplo: <em>Depeche Mode</em>, <em>Sneaker Pimps</em>, <em>Front 242</em>, <em>Beastie Boys, The Crystal Method, Kraftwerk, Underworld,</em> o incluso <em>Supertramp</em> y <em>Stevie Wonder</em>. Aunque para haceros un poco más de idea del "poderio" de los DX, el tema "<em>The Bells"</em>de Jeff Mills esta hecho apartir de un <span style="color: #666699;">DX-100</span>, la versión compacta del <span style="color: #666699;"><strong>DX7</strong></span>.

Una de las anécdotas interesantes sobre este sintetizador, <span style="color: #666699;"><strong>DX-7</strong></span>, es que durante la producción de la primera horneada. Sequential Circuits lanzó al mercado el <span style="color: #666699;"><em>Prophet 600</em></span>, <span style="text-decoration: underline;">el primer sintetizador MIDI</span>, obligando a reconfigurar los DX-7 para adaptarse al nuevo protocolo.

En la siguiente serie de fotografías podemos observar la evolución de los sintetizadores FM Yamaha.

[caption id="attachment_1987" align="aligncenter" width="297" caption="Yamaha GS-1"]<a href="http://www.racotecnic.com/wp-content/uploads/2011/07/gs1.jpg"><img class="size-full wp-image-1987" title="Yamaha GS-1" src="http://www.racotecnic.com/wp-content/uploads/2011/07/gs1.jpg" alt="Yamaha GS-1" width="297" height="203" /></a>[/caption]

[caption id="attachment_1990" align="aligncenter" width="304" caption="Yamaha CE-20"]<a href="http://www.racotecnic.com/wp-content/uploads/2010/01/yamahace20.jpg"><img class="size-full wp-image-1990" title="Yamaha CE-20" src="http://www.racotecnic.com/wp-content/uploads/2010/01/yamahace20.jpg" alt="Yamaha CE-20" width="304" height="99" /></a>[/caption]

[caption id="attachment_1985" align="aligncenter" width="300" caption="Yamaha DX-7"]<a href="http://www.racotecnic.com/wp-content/uploads/2011/07/dx71.gif"><img class="size-medium wp-image-1985" title="Yamaha DX-7" src="http://www.racotecnic.com/wp-content/uploads/2011/07/dx71-300x113.gif" alt="Yamaha DX-7" width="300" height="113" /></a>[/caption]

Aunque no nos entrentendremos mucho más sobre los diferentes sintetizadores FM caben destacar de otras marcas los <span style="color: #666699;"><strong>Roland D-50. </strong><span style="color: #000000;">Y</span></span> de modelos Yamaha posteriores al 1990, como los <span style="color: #666699;">DX-200</span> o los<span style="color: #666699;"> FS1R</span>. O incluso VSTi como <span style="color: #666699;">Native Instruments FM7-FM8</span>. A titulo personal os diría que si os interesa este tipo de sintetizadores, os entrentengais primero con un <span style="color: #666699;">FM8 </span>para familiarizarse un poco en como va el tema. Ya que, sobretodo las primeras veces es bastante frustrante los resultados que da, y más, si no tenemos una cierta dinámica en programación de sintetizadores.

Aquí os dejo también algunas fotos algunos de los instrumentos antes mencionados.

[caption id="attachment_1984" align="aligncenter" width="300" caption="Roland D-50"]<a href="http://www.racotecnic.com/wp-content/uploads/2011/07/d50.jpg"><img class="size-medium wp-image-1984" title="Roland D-50" src="http://www.racotecnic.com/wp-content/uploads/2011/07/d50-300x105.jpg" alt="Roland D-50" width="300" height="105" /></a>[/caption]

[caption id="attachment_1986" align="aligncenter" width="300" caption="Yamaha DX-200"]<a href="http://www.racotecnic.com/wp-content/uploads/2011/07/dx200.jpg"><img class="size-medium wp-image-1986" title="Yamaha DX-200" src="http://www.racotecnic.com/wp-content/uploads/2011/07/dx200-300x184.jpg" alt="Yamaha DX-200" width="300" height="184" /></a>[/caption]

Y ahora viene, posiblemente, la pregunta del millón: <strong>¿Por qué síntesis FM? </strong>Como diría algún pseudo-intelectual mientras se atusa la barba con su mano: <em>"Me agrada que me hagas esta pregunta".</em> :D

Basicamente la síntesis FM, y no exagero, es un tipo de síntesis es ilimitado. Puedes estar años programando con uno de ellos y nunca repetirás un patch. Eso es debido a que las configuraciones para la programación de un patch es al detalle, permitiendo además una libertad de movimientos de las partes del sintetizador que permiten esa libertad de creación de sonidos. También cabe destacar que casi siempre son sonidos sacados des de 0.

<em>"Si, si. Esto es muy bonito para un freak como tú. Pero ¿ Y los sonidos?" </em>Bueno, si os habéis quedado con la copla, ha salido varias veces durante este articulo mencionada la palabra <em>armónicos. </em>

Uno de los sonidos, bajo mi punto de vista, más bonitos de estos instrumentos, y concretamente de mi queridísimo <span style="color: #666699;"><strong>DX-7S</strong><span style="color: #000000;">, son los denominados <span style="color: #666699;"><em>Chords.</em><span style="color: #000000;"> Este sonido consiste en <span style="color: #666699;">crear una serie de armónicos a partir de la nota tocada</span>. Es decir para un intervalo o un acorde, se generará una serie de armónicos para cada nota, dependiendo si la serie armónica está programada para cada operador, o independientes entre operadores . Es el sonido tan común y caracteritisco de estilos como Dub Techno, Detroit, House y otros estilos varios. </span></span></span></span>

<span style="color: #666699;"><span style="color: #000000;"><span style="color: #666699;"><span style="color: #000000;">Hablando de Techno y sucedáneos, la FM también es capaz de sacar unos bajos y sub bajos muy gordos, agresivos, a la par que pads muy suaves con texturas muy finas, casi celestiales. Por supuesto, los órganos también son un punto fuerte, e inclusive, podemos tener un guitarra española, casi idéntica a una original. Ayer probando también intenté emular un violín, pero siempre queda ese resquicio sintético, aunque a mi me parece agradable. Como ya hemos dicho al principio, " <em>La síntesis FM nace de la teoría por la que es posible alcanzar a programar sonidos naturales mediante una edición electrónica<strong>"; </strong></em>por lo que siempre podéis intentar emular cualquier instrumento natural, aunque a veces los resultados no sean 100% al original. Y para rematar, algo que a mi me tiene encandilado, son los sonidos percusivos, algunos muy marcianos, tan utilizados en el minimal y en el Detroit Techno a lo más puro estilo <em>Axis, UR</em>.</span></span></span></span>

Por cierto, os dejo aquí la foto de mi <span style="color: #666699;"><strong>DX-7S </strong></span> junto a sus compañeros de estudio.

<span style="color: #666699;"><span style="color: #000000;"><span style="color: #666699;"><span style="color: #000000;"><a href="http://www.racotecnic.com/wp-content/uploads/2011/07/IMG_5375.jpg"><img class="aligncenter size-medium wp-image-1988" title="Estudio" src="http://www.racotecnic.com/wp-content/uploads/2011/07/IMG_5375-300x225.jpg" alt="Estudio" width="300" height="225" /></a><a href="http://audioblog.underave.net/wp-content/uploads/2010/01/IMG_5375.jpg"><br />
</a></span></span></span></span>

Hasta la siguiente entrega.
