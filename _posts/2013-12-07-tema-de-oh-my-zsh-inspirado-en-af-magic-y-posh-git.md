---
layout: post
status: publish
published: true
title: Tema de oh my zsh inspirado en af-magic y posh-git
class: no-line-numbers
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
wordpress_id: 2227
wordpress_url: http://www.racotecnic.com/?p=2227
date: '2013-12-07 21:45:02 +0100'
date_gmt: '2013-12-07 20:45:02 +0100'
categories:
- Programació
- Linux
- Windows
- Administració
tags:
- Shell
- zsh
- oh my zsh
---

Hoy me he entretenido en crear un tema para zsh inspirado en `af-magic` pero añadiendo los <i>features</i> de <a title="Ir al proyecto posh-git" href="https://github.com/dahlbyk/posh-git" rel="nofollow external">posh-git</a>, mostrando información detallada sobre el estado actual de git (ficheros modificados, creados, etc).

<a href="{{ site.url }}/uploads/2013/12/Captura-de-pantalla-2013-12-07-21.28.46.png"><img class="aligncenter size-full wp-image-2230" alt="oh my zsh racotecnic theme" src="{{ site.url }}/uploads/2013/12/Captura-de-pantalla-2013-12-07-21.28.46.png" width="595" height="334" /></a>
<ul style="text-align:center; list-style: none; font-size: 140%; text-transform: uppercase; margin: 25px 0">
<li style="display:inline; margin-right: 20px; padding: 0"><a href="https://github.com/elboletaire/zsh-theme-racotecnic/archive/master.zip" rel="nofollow">Descargar zip</a></li>
<li style="display:inline; padding: 0"><a href="https://github.com/elboletaire/zsh-theme-racotecnic" rel="external nofollow">Ir a github</a></li>
</ul>

Muestra los datos <a title="Detalles sobre posh-git" href="https://github.com/dahlbyk/posh-git#the-prompt" rel="nofollow external">exactamente igual que lo hace posh-git</a>, salvo por que me he comido los ceros (no me parecen necesarios) y le he hecho un pequeño añadido: en caso de tener cambios <i>stashed</i> mostrará un asterisco en el lateral derecho:

<a href="{{ site.url }}/uploads/2013/12/git_stash_zsh.png"><img class="aligncenter size-full wp-image-2240" style="height: auto;" alt="git stash racotecnic zsh theme" src="{{ site.url }}/uploads/2013/12/git_stash_zsh.png" width="658" height="250" /></a>

Para instalarlo simplemente <a title="Descargar tema zsh de racotecnic" href="https://github.com/elboletaire/zsh-theme-racotecnic/raw/master/racotecnic.zsh-theme" rel="nofollow external">tenéis que descargarlo</a> en vuestro directorio `.oh-my-zsh/themes` y modificar la variable `ZSH_THEME` para cargar el template:

~~~bash
ZSH_THEME='racotecnic'
~~~

Guardáis el fichero `.zshrc` y lo recargáis para que surta efecto:

~~~bash
source ~/.zshrc
~~~

Ea :)

PD. No dudéis en colaborar en github o comentármelo por aquí si se os ocurre cualquier mejora.
