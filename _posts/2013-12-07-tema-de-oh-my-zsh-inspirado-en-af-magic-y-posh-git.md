---
layout: post
status: publish
published: true
title: Tema de oh my zsh inspirado en af-magic y posh-git
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
<p>Hoy me he entretenido en crear un tema para zsh inspirado en <code>af-magic</code> pero añadiendo los <i>features</i> de <a title="Ir al proyecto posh-git" href="https://github.com/dahlbyk/posh-git" rel="nofollow external">posh-git</a>, mostrando información detallada sobre el estado actual de git (ficheros modificados, creados, etc).</p>
<p><a href="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-21.28.46.png"><img class="aligncenter size-full wp-image-2230" alt="oh my zsh racotecnic theme" src="http://www.racotecnic.com/wp-content/uploads/2013/12/Captura-de-pantalla-2013-12-07-21.28.46.png" width="595" height="334" /></a></p>
<ul style="text-align:center; list-style: none; font-size: 140%; text-transform: uppercase; margin: 25px 0">
<li style="display:inline; margin-right: 20px; padding: 0"><a href="https://github.com/elboletaire/zsh-theme-racotecnic/archive/master.zip" rel="nofollow">Descargar zip</a></li>
<li style="display:inline; padding: 0"><a href="https://github.com/elboletaire/zsh-theme-racotecnic" rel="external nofollow">Ir a github</a></li>
</ul>
<p>Muestra los datos <a title="Detalles sobre posh-git" href="https://github.com/dahlbyk/posh-git#the-prompt" rel="nofollow external">exactamente igual que lo hace posh-git</a>, salvo por que me he comido los ceros (no me parecen necesarios) y le he hecho un pequeño añadido: en caso de tener cambios <i>stashed</i> mostrará un asterisco en el lateral derecho:</p>
<p><a href="http://www.racotecnic.com/wp-content/uploads/2013/12/git_stash_zsh.png"><img class="aligncenter size-full wp-image-2240" style="height: auto;" alt="git stash racotecnic zsh theme" src="http://www.racotecnic.com/wp-content/uploads/2013/12/git_stash_zsh.png" width="658" height="250" /></a></p>
<p>Para instalarlo simplemente <a title="Descargar tema zsh de racotecnic" href="https://github.com/elboletaire/zsh-theme-racotecnic/raw/master/racotecnic.zsh-theme" rel="nofollow external">tenéis que descargarlo</a> en vuestro directorio <code>.oh-my-zsh/themes</code> y modificar la variable <code>ZSH_THEME</code> para cargar el template:</p>
<p>[bash]ZSH_THEME=&quot;racotecnic&quot;[/bash]</p>
<p>Guardáis el fichero <code>.zshrc</code> y lo recargáis para que surta efecto:</p>
<p>[bash]source ~/.zshrc[/bash]</p>
<p>Ea :)</p>
<p>PD. No dudéis en colaborar en github o comentármelo por aquí si se os ocurre cualquier mejora.</p>
