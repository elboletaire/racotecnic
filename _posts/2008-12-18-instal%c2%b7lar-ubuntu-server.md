---
layout: post
status: publish
published: true
title: Instal·lar ubuntu server
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Som uns quants els que estem arreplegats
  en aquest blog i, espero, poc a poc anirem escrivint tot allò que creiem útil de
  compartir. Jo probablement em dediqui a
  explicar més coses relacionades amb programació web que amb cap altra cosa i per
  aquest motiu començo el blog amb una feina tant senzilla com és la d'instalar un
  servidor amb ubuntu."
wordpress_id: 33
wordpress_url: http://racoinformatic.underave.net/?p=33
date: '2008-12-18 13:45:48 +0100'
date_gmt: '2008-12-18 12:45:48 +0100'
categories:
- Linux
tags:
- Particions
- Instal·lació S.O.
---

Som uns quants els que estem arreplegats en aquest blog i, espero, poc a poc anirem escrivint tot allò que creiem útil de compartir.

Jo probablement em dediqui a explicar més coses relacionades amb programació web que amb cap altra cosa i per aquest motiu començo el blog amb una feina tant senzilla com és la d'instalar un servidor amb ubuntu.

Escullo ubuntu perquè no sóc pas administrador, sinó usuari i m'agrada la facilitat d'ús d'aquest sistema operatiu.

Com que és versió servidor no té entorn gràfic, per tant pots fer servir qualsevol cpu que tinguis tirada per casa (aquell pentium II que encara deus guardar a l'armari ;) ).

Bé doncs, anem per feina...

<a href="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex.png">
  <img class="size-full wp-image-36 aligncenter" title="captura-sun-xvm-virtualbox-ubuntu-hwvirtex" src="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex.png" alt="Instal·lació d'ubuntu server" width="576" height="432" />
</a>

<a id="more"></a><a id="more-33"></a>

Un cop <a href="http://www.ubuntu.com/getubuntu/download" target="_blank">descarregat ubuntu</a> i gravat en un CD, iniciem l'ordinador des del CD (<a href="http://aceitunassinhueso.com/wiki/index.php/Iniciar_desde_CD" target="_blank">possibles problemes</a>) i comencem la instal·lació.

És important que **tingueu l'ordinador connectat a internet** (amb cable)!!!!

A la selecció d'idioma us aconsello que empreu anglès, ja que si mai teniu cap problema la major part dels errors els trobareu en anglès per internet molt abans que en català o en castellà. A més avui dia el traductor de google no va gens malament (per aquells que tingueu problemes amb l'idioma).

<figure>
  <a href="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-1.png"><img class="size-full wp-image-37" title="captura-sun-xvm-virtualbox-ubuntu-hwvirtex-1" src="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-1.png" alt="Selecció d'idioma" width="576" height="432" /></a>
  <figcaption>
    Selecció d&#39;idioma
  </figcaption>
</figure>

Un cop iniciat el programa d'instal·lació ens tornarà a demanar l'idioma (si abans us havíeu equivocat ara podeu rectificar). Després d'això, si heu escollit anglès preneu cura de la ubicació en la que esteu, haureu d'indicar "Other" i buscar la vostra ubicació (probablement "Europe" / "Spain").

<figure>
  <a href="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-3.png"><img class="size-full wp-image-40" title="captura-sun-xvm-virtualbox-ubuntu-hwvirtex-3" src="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-3.png" alt="Detecció de l'idioma" width="576" height="178" /></a>
  <figcaption>
    Detecció de l&#39;idioma
  </figcaption>
</figure>

Passat aquest punt ens demanarà si volem detectar l'idioma del teclat (keyboard layout), li indiquem que sí i passem la prova que ens demana.

Finalment ens indicarà si l'idioma del teclat és "es", en cas que no et marqui "es" torna a fer la prova perquè provablement no l'hagis fet bé. Un cop fet això ens demana el nom que li posarem a la màquina i finalment la ubicació horària.

Bé, cap problema fins ara no? Tot bastant fàcil.

<figure>
  <a href="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-4.png"><img class="size-full wp-image-41" title="captura-sun-xvm-virtualbox-ubuntu-hwvirtex-4" src="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-4.png" alt="Particions dels discos" width="576" height="432" /></a>
  <figcaption>
    Particions dels discos
  </figcaption>
</figure>

Ara comença el tema de les particions, on la cosa es posa interessant. Em podria esplaiar molt i explicar-vos mil coses sobre el <a href="http://dns.bdat.net/documentos/sistema_ficheros/html/" target="_blank">sistema de fitxers de linux</a>, però confio que si esteu instal·lant una versió de servidor és perquè ja heu provat versions d'"escriptori" (desktop) així doncs no m'hi capficaré molt en explicar certes coses, si no enteneu quelcom sabeu que podeu emprar google o seguir les referències que vagi fent.

A l'hora de partir els discos podeu fer mil eleccions i totes elles poden ser vàlides, però aquí us ensenyaré a partir el disc pensant en tenir diferents grups d'usuaris per a diferents dominis. És a dir, la idea és que el nostre servidor pugui contenir diferents pàgines webs en diferents carpetes (cada grup d'usuaris té la seva pròpia carpeta) i després a cada carpeta li podrem assignar una IP diferent dins la nostra xarxa interna per, finalment, enroutar diferents dominis a cada IP (això ja de manera externa).

Així doncs, escollim particionat manual i creem la següent taula de particions:

- Partició de com a mínim 5GB amb sistema de fitxers **ext3** punt de muntatge **/** (arrel). Partició de tipus **primària**.
- Partició de ***MB per a la partició d'intercanvi (**SWAP**).  Partició **primària** (si la vostra màquina no és gaire potent és recomanable posar el doble del que tenim en RAM a la memòria SWAP, però amb les màquines d'avui dia podríeu tenir l'ordinador funcionant sense partició d'intercanvi).
- La resta d'espai se l'assignarem al punt de muntatge **/home** amb sistema de fitxers **ReiserFS**.

Escullo <a href="http://es.wikipedia.org/wiki/ReiserFS" target="_blank">ReiserFS</a> per a la partició /home perquè amb el sistema de fitxers ReiserFS aprofiteu millor els vostres disc durs (no té pèrdua d'espai) i és molt efectiu en servidors web. De tota manera, donat que se suposa que això és un equip domèstic no hi hauria cap problema en posar ambdos sistemes de fitxers com a ReiserFS o com a <a href="http://es.wikipedia.org/wiki/Ext3" target="_blank">ext3</a>.

Al final us haurà d'haver quedat una taula de particions similar a la següent (teniu en compte que estic treballant amb una màquina virtual que només té 10GB d'espai):

<figure>
  <a href="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-6.png"><img class="size-full wp-image-42" title="captura-sun-xvm-virtualbox-ubuntu-hwvirtex-6" src="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-6.png" alt="Taula de particions" width="576" height="432" /></a>
  <figcaption>
    Taula de particions
  </figcaption>
</figure>

Seleccioneu "Finish partitioning" i començarà a instal·lar el sistema base.

<a href="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-7.png"><img class="aligncenter size-full wp-image-43" title="captura-sun-xvm-virtualbox-ubuntu-hwvirtex-7" src="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-7.png" alt="captura-sun-xvm-virtualbox-ubuntu-hwvirtex-7" width="563" height="136" /> </a>
Un cop acabada la instal·lació dels paquets bàsics ens demanarà informació sobre l'usuari que voldrem emprar (nom, contrassenya...) i ens preguntarà si volem crear una carpeta privada encriptada per a ocultar millor les dades. Això ho deixo al vostre criteri, encara que si només voleu el servidor com a servidor web no trobo que faci falta.

Ara passarà a configurar "apt" per començar a descarregar paquets d'internet, ens demanarà la configuració del servidor intermediari (proxy), com segurament no en tindrem el deixem en blanc i continuem. Ens pregunta què volem fer a l'hora d'actualitzar el sistema, escollim "No automatic updates" ja que sempre és millor fer-les manualment. La tercera opció, <a href="http://www.canonical.com/projects/landscape" target="_blank">Landscape</a>, és una eina d'administració de <a href="http://www.canonical.com/" target="_blank">Canonical</a>, no he tingut el gust de provar-la però no pinta gens malament, ara... has de pagar 150$ anuals per cada node que vulguis administrar amb Landscape.

<figure>
  <a href="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-8.png"><img class="size-full wp-image-44" title="captura-sun-xvm-virtualbox-ubuntu-hwvirtex-8" src="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-8.png" alt="Instal·lació d'altres paquets" width="576" height="432" /></a>
  <figcaption>
    Instal·lació d&#39;altres paquets
  </figcaption>
</figure>

Ara escollirem els paquets addicionals que vulguem instal·lar. Donat que aquest mini manual és per a instal·lar només Ubuntu server, no marcaré cap paquet. La meva intenció és ensenyar-vos a instal·lar aquests paquets des de la consola més endavant, però si necessiteu ¡JA! un servidor web, marqueu la segona opció, <a href="http://ca.wikipedia.org/wiki/LAMP" target="_blank">LAMP</a> server (Linux Apache + MySQL + PHP, Python i/o Ruby).

Acabem la instal·lació prement continuar.

<a href="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-9.png"><img class="aligncenter size-full wp-image-45" title="captura-sun-xvm-virtualbox-ubuntu-hwvirtex-9" src="{{ site.url }}/uploads/2008/12/captura-sun-xvm-virtualbox-ubuntu-hwvirtex-9.png" alt="captura-sun-xvm-virtualbox-ubuntu-hwvirtex-9" width="557" height="129" /></a>

Bé, com heu pogut veure, no ha estat res que no poguéssiu haver fet vosaltres sols.
