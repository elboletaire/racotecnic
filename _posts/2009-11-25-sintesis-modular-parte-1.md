---
layout: post
status: publish
published: true
title: Sintesis modular (Parte 1)
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 1969
wordpress_url: http://www.racotecnic.com/?p=1969
date: '2009-11-25 07:37:58 +0100'
date_gmt: '2009-11-25 06:37:58 +0100'
categories:
- General
tags: []
---
<blockquote><em>Este artículo proviene del audioblog, clausurado por su desuso y cuyas entradas han sido movidas a este blog para que no se pierdan en el olvido.</em>

Entrada escrita originalmente por **909**.</blockquote>

<img class="aligncenter" src="http://parumi.org/curso_produccion_musical_linux/cap4/real-modular-synth.png" alt="" width="545" height="546" />

Para empezar, le daremos un repaso rápido a lo que en si un sinteizador modular, ya que quizas sea la primera vez que te encuentres con este tipo de "cacharros".

Mirando por la red he encontrado la siguiente definición que creo que La definición de la naturaleza propiamente dicha de la síntesis modular es la modulación del flujo.

Otra de las claves de la defición, es que, los sintetizadores modulares son instrumentos que no son fijos en la forma en que la mayoría de los sintetizadores son. Sus propietarios estan continuamente añadiendo y cambiando módulos, cambiar el alcance y enfoque de su sistema, dependiendo de sus gustos y objetivos actuales.

Visto que este tipo de sintetizadores se construyen apartir de modulos, veamos los diferentes modulos que podemos encontrar. Los principales para la construcción de uno modular serían: **VCO, VCA, VCF, EG y/o LFO**. Luego puedes encontrar modulos de efectos, secuenciadores, logic gates, modulos Sync (de MIDI a CV), glides, re-triggers y un largo etcetera de modulos.

<ul>
<li>**VCO:** Corresponde al oscilador. Este modulo es el encargado de generar una nota a una frecuencia concordante a la tecla que hayamos tocado de nuestro teclado, con un tipo de onda. (Sinoidal, sierra, cuadrada, etc)</li>
<li>**LFO:** Coresponde al oscilador de baja frecuencia. Este oscilador altera el tono de una manera periodica del oscilador principal, produciendo el vibrato.</li>
<li>**VCA:** Corresponde al amplificador. Este amplificador es el que aumenta la amplitud de la onda. (Recordad, que <span style="text-decoration: underline;">todas estas ondas son eléctricas</span>, es decir hasta que no pasa por un altavoz no transforma en "algo" audible.)</li>
<li>**EG:** Corresponde al generador de envolventes. Cuando una tocas una tecla, se dispara una señal que llega a este, que provoca una tensión para controlar la onda del amplificador. Al controlar la onda del <span style="color: #666699;">**VCA**</span> provaca la genreación de lo que se denomina <span style="color: #666699;">**ADSR**</span> (Attack, Decay, Sustain y Release). Aunque también podemos encontrar otras varientes, como por ejemplo: <span style="color: #666699;">**AHDSR**</span> (Attack, Hold, Decay, Release) este tipo envolvente es lo podemos encontrar en los famosos Korg MS-20, aunque las verdaderas estrellas de dicho sintetizador son los filtros.</li>
<li>**VCF:** Corresponde a los filtros. El filtro recorta harmonicos de la onda que genera el oscilador, antes de pasar por el VCA. Existen muchos tipos de filtros, como por ejemplo: <strong><span style="color: #666699;">HP</span>, <span style="color: #666699;">BP</span>, <span style="color: #666699;">LP</span></strong> y/o<strong> <span style="color: #666699;">C</span><span style="color: #666699;">omb</span></strong>.</li>
</ul>

Para que no suene tanto a chino, en el siguiente diagrama podemos observar el esquema básico de un sintetizador:

<img class="size-full wp-image-961  aligncenter" src="{{ site.url }}/uploads/2009/11/sinte001.gif" alt="Esquema sintetizador" width="500" height="379" />

Para empezar, antes de ir con la elección de los modulos, hay que ver las principales características de los fabricantes de sintes modulares ( formatos, voltaje, tipo de conexiones etc ). Ya que puede darse el caso que se compre un modulo super-chulo pero que es incompatible con el votlaje o con el formato del propio modulo. En la siguiente tabla, se puede observar las caracteristicas de varios fabricantes.
<table style="text-align: center;" width="582" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="137"><strong><span style="text-decoration: underline;">Marca</span></strong></td>
<td valign="top" width="137"><strong><span style="text-decoration: underline;">Formato</span></strong></td>
<td valign="top" width="141"><strong><span style="text-decoration: underline;">Conexiones</span></strong></td>
<td valign="top" width="167"><strong><span style="text-decoration: underline;">Web</span></strong></td>
</tr>
<tr>
<td valign="top" width="137">**Cwejman**</td>
<td valign="top" width="137"><span style="color: #888888;"><strong><span style="color: #666699;">Eurorack</span></strong></span></td>
<td valign="top" width="141"><span style="color: #888888;"><strong><span style="color: #666699;">Jack 3,5mm</span></strong></span></td>
<td valign="top" width="167"><a href="OpenSite('www.cwejman.net')">www.cwejman.net</a></td>
</tr>
<tr>
<td valign="top" width="137">**Doepfer**</td>
<td valign="top" width="137"><span style="color: #888888;"><strong><span style="color: #666699;">Eurorack</span></strong></span></td>
<td valign="top" width="141"><span style="color: #888888;"><strong><span style="color: #666699;">Jack 3,5mm</span></strong></span></td>
<td valign="top" width="167"><a href="OpenSite('www.doepfer.de')">www.doepfer.de</a></td>
</tr>
<tr>
<td valign="top" width="137">**Analogue Solutions**</td>
<td valign="top" width="137"><span style="color: #888888;"><strong><span style="color: #666699;">Eurorack</span></strong></span></td>
<td valign="top" width="141"><span style="color: #888888;"><strong><span style="color: #666699;">Jack 3,5mm</span></strong></span></td>
<td valign="top" width="167"><a href="OpenSite('www.analoguesolutions.com')">www.analoguesolutions.com</a></td>
</tr>
<tr>
<td valign="top" width="137">**Plan B**</td>
<td valign="top" width="137"><span style="color: #888888;"><strong><span style="color: #666699;">Eurorack</span></strong></span></td>
<td valign="top" width="141"><span style="color: #888888;"><strong><span style="color: #666699;">Jack 3,5mm</span></strong></span></td>
<td valign="top" width="167"><a href="OpenSite('www.ear-group.net')">www.ear-group.net</a></td>
</tr>
<tr>
<td valign="top" width="137">**Paia**</td>
<td valign="top" width="137"><span style="color: #888888;"><strong><span style="color: #ff0000;">Frac</span></strong></span></td>
<td valign="top" width="141"><span style="color: #888888;"><strong><span style="color: #666699;">Jack 3,5mm</span></strong></span></td>
<td valign="top" width="167"><a href="OpenSite('www.paia.com')">www.paia.com</a></td>
</tr>
<tr>
<td valign="top" width="137">**Livewire Electronics**</td>
<td valign="top" width="137"><span style="color: #888888;"><strong><span style="color: #666699;">Eurorack</span></strong></span></td>
<td valign="top" width="141"><span style="color: #888888;"><strong><span style="color: #666699;">Jack 3,5mm</span></strong></span></td>
<td valign="top" width="167"><a href="OpenSite('www.livewire-synthesizers.com')">www.livewire-synthesizers.com</a></td>
</tr>
<tr>
<td valign="top" width="137">**Tip Top**</td>
<td valign="top" width="137"><span style="color: #888888;"><strong><span style="color: #666699;">Eurorack</span></strong></span></td>
<td valign="top" width="141"><span style="color: #888888;"><strong><span style="color: #666699;">Jack 3,5mm</span></strong></span></td>
<td valign="top" width="167"><a href="OpenSite('www.tiptopaudio.com')">www.tiptopaudio.com</a></td>
</tr>
</tbody>
</table>

El formato **Eurorack**, basados en los <span style="color: #666699;">**bastidores Rack**</span>,** **es el formato standar a dia de hoy. Esto queda palpable en las dimensiones de los compresores, croosovers que podaís ver en cualquier fiestas, clubs o estudios de audio, por ejemplo, o en la informatica para albergar servidores. Las medidas del formato se basan basada en las espeficaciones definadas en la <a href="http://www.server-racks.com/eia-310.html">EIA-310 </a>. <strong><span style="color: #888888;"><span style="color: #666699;">El ancho</span></span> </strong>esta normalizado, siempre es de <span style="color: #888888;"><span style="color: #666699;">**19"**</span></span>, recordemos que **1"(pulgada) = 2,54cm .·. 19" = 48,26cm. **Mientras que la altura viene determinada por la altura propia del aparato. Para unificar los fabricantes crearon una **unidad rack**, **U**,que determina <span style="color: #888888;"><strong><span style="color: #666699;">la altura del aparato</span></strong></span>. Hay aparatos que requieren solo 1U, como ejemplo, una Motu 828 y otras que necesitan varios <em>"slots"</em>como por ejemplo los servidores normalmente necesitan 4U. Esta medida **U =**<span style="color: #000000;">** 1,75" = 2,54 cm.** Por lo que si nos dicen que el modulo son 4U, la conversión sería así: Si **4U = 7" ? 4U = 10,16cm . **Los modulos que venden para estos sistemas de son de 3U, ya que, las columnas de los racks se distrubuyen cada 3U.</span>

Una vez vista las caracteriticas propias de cada fabricante, llega la gran pregunta: ¿Qué queremos que haga nuestro modular? Al ser un sintetizador creado por modulos indepedendientes, a nivel físico, entre ellos, podemos crear des de una caja de ritmos, o un procesador de señal externa, o sintetizador puro y duro. En este caso vamos usarlo tanto para crear sonidos propios, como para la modificación de una señal externa que le entre al modular.

A modo de curiosidad-ejemplo, un modular hecho para funcionar como caja de ritmos. Como se puede observar se han susituido los componentes/modulos de un sintetizador (VCO, VCA) por modulos que contienen los samples con los sonidos de la caja. Por experencia propia, estas cajas son las más divertidas con las que me he podido encontrar, quien tenga cualquier modelo de las cajas <a href="http://img38.imageshack.us/img38/2223/15092009112.jpg" target="_blank">Vermona DRM</a>, lo sabe. ;)<img class="aligncenter size-full wp-image-1029" src="{{ site.url }}/uploads/2009/11/PlugPlay_13.jpg" alt="Modular Drum Machine" width="600" height="335" />
<h3>**OSCILADOR CONTROLADO POR VOLTAJE - VCO:**</h3>

El VCO, <em>el corazón de un sintetizador</em>, es un circuito electrónico que tiene una señal de salida, cuya frecuencia depende del valor de la amplitud de una tensión de entrada. <img class="alignleft" src="http://farm1.static.flickr.com/76/185348936_7ace4daa75.jpg?v=0" alt="" width="375" height="500" />Un módulo de VCO típico proporciona simultáneamente diferentes tipos de formas de onda a sus salidas. Las formas de onda más comunes son: <span style="color: #666699;">**Sinoidal**, **cuadrada**, **triángular** </span>y <span style="color: #808080;"><strong><span style="color: #666699;">diente de sierra (<em>sawtooths</em>)</span></strong><span style="color: #333333;">, llegando </span></span>algunos incluso a proporcionar estas ondas invertidas, e incluso sawtooths no invertidas.

Como se puede observar en la imagen un VCO standar tiene las siguientes entradas CV simultáneas:

<ul>
<li>Una entrada <span style="color: #666699;">**1Volt/octave**</span> utilizado conjuntamente con un teclado o un secuenciador salida CV.</li>
<li>Una entrada de frecuencia modulada (<span style="color: #666699;">**FM**</span>) <em>lineal</em>,con un knob para atenuar, aunque también se puede dar el caso de que se incluya también una entrada <em>exponencial</em>, con un potenciametro para atenuar.</li>
<li>Una entrada de Pulse Width Modulation (<span style="color: #666699;">**PWM**</span>).</li>
<li>Una entrada de sincronización .</li>
<li>En algunos casos, en este modulo Doepfer no esta presente, existe un knob adicional llamado <span style="color: #666699;">**Fine Tuning**</span> para los ajustes discretos de la frecuencia.</li>
</ul>
<h3 style="text-align: left;">**AMPLIFICADOR CONTROLADO POR VOLTAJE - VCA:**</h3>

<img class="alignleft" src="http://www.doepfer.de/A1323.gif" alt="" width="138" height="461" />

<strong><span style="color: #666699;">·</span></strong><span style="color: #666699;">**Modo lineal** </span>:<strong> f(g) = k · v<sub> c</sub> |</strong> <span style="color: #888888;"><strong><span style="color: #666699;">g</span> </strong></span>= ganancia; <span style="color: #666699;">**v**</span> = el voltage; <strong><span style="color: #666699;">k</span></strong>= constante de augmento. (El valor que damos al girar el knob gain)

<strong><span style="color: #666699;">·Modo exponecial</span> </strong>: <strong>f(g) = k <sup>v</sup>· c |</strong> <span style="color: #666699;">**g**</span> = ganancia, <span style="color: #666699;">**v**</span> = el voltage, <strong><span style="color: #666699;">k</span></strong>= constante de augmento.

<img class="alignleft size-full wp-image-1101" src="{{ site.url }}/uploads/2009/11/fig10.gif" alt="Función modo exponecial y lineal de un VCA" width="225" height="172" />

Vista la representación gráfica de las dos funciones para expresar el como aumenta la ganacia respecto al modo (función) que utilizemos ; saquemos las conclusiones al respecto.

Como se puede observar , en el <em><span style="color: #666699;">**modo linear**</span></em> <span style="text-decoration: underline;">el aumento de la ganancia es contastante respecto al voltage que se le de</span>. Mientras que en modo exponecial, al ser una función donde uno de los valores del polinomio esta elevado a un valor, en este caso respecto al voltage, la función se vuelve parabolica, por lo que el aumento de la ganacia no será constante. Si dejamos el tema modular a un lado, y miramos las propiedades de la parabola que crea podemos sacar la siguiente conclusión para el <em><span style="color: #666699;">**modo exponecial**</span></em>: <em><span style="color: #000000;"><span style="text-decoration: underline;">A mayor valor del voltage más rápido crece la ganacia</span></span></em>. Como curiosidad este tipo de funciones, <em>Exp</em> o <em>Lin</em>, también se da en las diversas fases de las envolventes e incluso pueden llegar a dar una respuesta negativa o postiva.

Para hacerlo más "visual"; En este caso más audible :P. He echado mano de mi Dave Smith Evolver para que se pueda apreciar la diferencia "practica" de los dos modos.
<h3></h3>
<h3></h3>
<h3>**GENERADOR DE ENVOLVENTES - EG:**</h3>

Un generador de envolvente es un circuito que genera una señal susceptible de controlar algún parámetro dentro de un sistema de síntesis. Normalmente, un EG se dispara con un evento <em><span style="color: #666699;">**note on**</span></em> , y por lo general, ataca a un VCA, a un VCF, etc.

Una cosa que me gustaría dejar claro antes de ponerse con lo que es una envolvente. Cabe decir que la envolvente no es solo un termino de sintesis, ya que, los DAW's basan las automatizaciones en envolventes. O por ejemplo, al pasar una señal de un kick por un compresor, un ataque largo dejará pasar los transitorios iniciales, y el sonido global será más impactante, porque el sonido empieza a comprimir más tarde que con un ataque corto.

Apostillado este comentario, veamos los parámetros de una envolvente ADSR:

**Attack:** Es el tiempo que la envolvente tarda en llegar desde el nivel cero hasta el nivel máximo.

Si una envolvente se usa para afectar a la amplitud, entonces el ataque es el tiempo que transcurre desde que una tecla es presionada hasta que el sonido alcanza su nivel máximo de volumen. Estos tiempos son de unos cuantos milisegundos, y entre mas corto sea, mas percusivo será el sonido, entre mas largo sea, mas suave será el sonido.

**Decay**: Es el tiempo que la envolvente tarda en descender desde su nivel máximo hasta el nivel de sostenido, el cual también es definido por la envolvente.

**Sustain**: A diferencia de los otros parámetros de una <em>ADSR,</em> <span style="text-decoration: underline;">el sustain no es tiempo, sino un nivel</span>. Es el nivel que conservará la envolvente mientras esté activa. En la mayoría de sintetizadores y samplers esto significa que el <em>sustain</em> es el nivel que la envolvente mantendrá mientras la tecla esté presionada.

**Release**: Es el tiempo que la envolvente tarda en descender desde el nivel de sustained, hasta el nivel. Normalmente, una envolvente pasa por su etapa de relajación después de que la tecla presionada es liberada.

Este tipo de envolvente no es una norma, pero si la más comun, ya que se pueden dar muchas tipos de envolventes. Ya que podemos encontrar des de la **AD** (Attack-Decay) tipica de los <span style="color: #666699;">**instrumentos naturales**</span>, una flauta, como la anteriormente mencionada **AHDSR **(Attack-Hold-Decay-Sustain-Release) de los <span style="color: #666699;">**Korg Ms-20**</span>, o la **ADSD** (Attack-Decay-Sustain-Decay) de los <span style="color: #666699;">**Minimoog**</span>. Esta última no tiene un valor de release, sino que el valor del decay sirve tanto para el propio decay, como para el release.

Para ver como funciona un ciruicto del EG, he cogido el modelo de la página (<a href="http://sam.atlantes.org/eg.html">http://sam.atlantes.org/eg.html</a>)
<img class="alignnone size-full wp-image-1160" src="{{ site.url }}/uploads/2009/11/eg1.gif" alt="eg1" width="565" height="400" />
Cuando le entra una tensión por la entrada GATE, la entrada TRIGG del circuito mutilfuncional 555 pasa a nivel bajo a través del colector del transistor bipolar. Cuando dicha tensión es superada, provoca que la salida Q (salida 3) del integrado se ponga a nivel alto durante un tiempo. Es esta salida la que cierra el interruptor CMOS formado por los pines 1, 2 y 13 del conmutador y que provoca una carga suave del condensador situado en el pin 6. Esta rampa de carga corresponde con el **attack **de la envolvente. Cuando el período de temporización termina (cuando el pin 6 alcanza un valor máximo), la salida Q pasa a nivel bajo, provocando que el interruptor 10,11,12 se abra y se conecte así el interruptor 3,4,5. Este interruptor provoca una descarga del condensador (**decay**) hasta que éste alcanza el nivel de voltaje determinado por el divisor de tension de **sustain**. El circuito se mantiene en este estado hasta que la entrada GATE vuelve a nivel bajo, momento en el cual el interruptor 6,8,9 se cierra y provoca una descarga total del condensador, el **release.**

De todos los VCO's que corren por el mercado, he decido coger el **Z3000** de la marca <strong><a href="http://www.tiptopaudio.com" target="_blank">Tip Top</a></strong>. He escogido el Tip Top, por que es compatible con los diferentes modulos de la marca Doepfer, ya que algunos modulos serán de dicha marca. Una de las principales opciones que hizo decidirme por un par de estos osciladores **Z3000** es la posibilidad de tener dos tipos de entradas de datos para la generación de una onda. Por una parte el oscilador es capaz de responder a frecuencías y por otro lado es capaz de entender datos musicales, como lo son las octavas y las notas. Veamos un poco las espeficaciones de este VCO:

<img class="aligncenter" src="http://1.bp.blogspot.com/_vFTGSIgYhew/SRODyHJXHnI/AAAAAAAAAKw/ehV1lVlyHvE/s400/z3000.jpg" alt="" width="224" height="400" />

Tipos de VFC:

<img class="aligncenter" src="http://synthesizers.com/q107f1.gif" alt="" width="316" height="1348" />
