---
layout: post
status: publish
published: true
title: Grave vulnerabilidad en todas las versiones de Windows
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<em>**Fuente: **<a href=\"http://www.genbeta.com/windows/vulnerabilidad-muy-critica-en-todas-las-versiones-de-windows\"
  target=\"_blank\">GenBeta</a></em>\r\n\r\n¡Urgente! Se ha detectado una **vulnerabilidad
  muy crítica en  todas las versiones de Windows desde 1993**, un “0-day” en
  toda  regla, que permite escalar privilegios y **ejecutar código con  permisos
  de sistema**, equivalentes a efectos prácticos a los de  administrador.\r\n\r\nPor
  ahora **no existe parche, y el exploit es fácilmente  aprovechable**
  por cualquiera. La causa es un fallo de diseño que  persiste en todas las versiones
  de Windows de 32 bits desde 1993, por  lo que **afecta a Windows 2000, 2003,
  2008, XP, Vista y 7**.\r\n\r\nEl fallo se encuentra en el soporte “legacy”
  que permite ejecutar  aplicaciones de 16 bits. Resulta que el sistema no valida
  correctamente  el cambio de contexto y pila que se efectúa al llamar al manejador
  \ #GP trap. Windows comete varios fallos, toma como ciertas varias  suposiciones
  que son incorrectas y el resultado es una puerta abierta  al sistema con alfombra
  roja y luces de neón.\r\n\r\nCon un código que va en contra de dichas suposiciones,
  un usuario  malicioso puede realizar un cambio de contexto y **ejecutar código
  \ con derechos de Sistema**, que están por encima incluso del de  los administradores.\r\n\r\n"
wordpress_id: 1286
wordpress_url: http://racotecnic.underave.net/?p=1286
date: '2010-01-20 18:14:43 +0100'
date_gmt: '2010-01-20 17:14:43 +0100'
categories:
- Windows
tags:
- Exploit
- 0-day
---

<em>**Fuente: **<a href="http://www.genbeta.com/windows/vulnerabilidad-muy-critica-en-todas-las-versiones-de-windows" target="_blank">GenBeta</a></em>

¡Urgente! Se ha detectado una **vulnerabilidad muy crítica en  todas las versiones de Windows desde 1993**, un “0-day” en toda  regla, que permite escalar privilegios y **ejecutar código con  permisos de sistema**, equivalentes a efectos prácticos a los de  administrador.

Por ahora **no existe parche, y el exploit es fácilmente  aprovechable** por cualquiera. La causa es un fallo de diseño que  persiste en todas las versiones de Windows de 32 bits desde 1993, por  lo que **afecta a Windows 2000, 2003, 2008, XP, Vista y 7**.

El fallo se encuentra en el soporte “legacy” que permite ejecutar  aplicaciones de 16 bits. Resulta que el sistema no valida correctamente  el cambio de contexto y pila que se efectúa al llamar al manejador  #GP trap. Windows comete varios fallos, toma como ciertas varias  suposiciones que son incorrectas y el resultado es una puerta abierta  al sistema con alfombra roja y luces de neón.

Con un código que va en contra de dichas suposiciones, un usuario  malicioso puede realizar un cambio de contexto y **ejecutar código  con derechos de Sistema**, que están por encima incluso del de  los administradores.

<a id="more"></a><a id="more-1286"></a>
**Tavis Ormandy**, el investigador que detectó el  fallo, **notificó a Microsoft en junio de 2009** de este  problema, y al poco le confirmaron que estaba en lo cierto. En todo este  tiempo, no se ha publicado parche al respecto, lo que ha motivado a  Ormandy el hacer pública la vulnerabilidad para forzar a que desde  Redmond se pongan las pilas.

Los principales afectados son aquellas empresas que mantienen los  sistemas de sus empleados con privilegios limitados. Para usuarios  domésticos, que habitualmente usan cuentas de administrador, la cosa no  afecta demasiado, porque escalar privilegios no es necesario para poner  en riesgo el sistema.

Aunque no hay parche, **existe una sencilla vía de evitar la  vulnerabilidad**. Tan sólo hay que deshabilitar el soporte para  aplicaciones de 16 bits, que en la mayor parte de los casos no supondrá  problema alguno. Para ello, hay que habilitar **“Impedir el acceso  a aplicaciones de 16 bits”** en la Consola de Políticas  (gpedit.msc), dentro de “Configuración de equipo – Plantillas  administrativas – Componentes de Windows – Compatibilidad de  aplicación”. Hay que forzar una actualización de las políticas en los  sistemas que dependan del controlador de dominio para que se aplique el  cambio.

¡Urgente! Se ha detectado una vulnerabilidad muy crítica en todas las versiones de Windows desde 1993, un “0-day” en toda regla, que permite escalar privilegios y ejecutar código con permisos de sistema, equivalentes a efectos prácticos a los de administrador.

Por ahora no existe parche, y el exploit es fácilmente aprovechable por cualquiera. La causa es un fallo de diseño que persiste en todas las versiones de Windows de 32 bits desde 1993, por lo que afecta a Windows 2000, 2003, 2008, XP, Vista y 7.

El fallo se encuentra en el soporte “legacy” que permite ejecutar aplicaciones de 16 bits. Resulta que el sistema no valida correctamente el cambio de contexto y pila que se efectúa al al llamar al manejador #GP trap. Windows comete varios fallos, toma como ciertas varias suposiciones que son incorrectas, y el resultado es una puerta abierta al sistema con alfombra roja y luces de neón.

Con un código que va en contra de dichas suposiciones, un usuario malicioso puede realizar un cambio de contexto y ejecutar código con derechos de Sistema, que están por encima incluso del de los administradores.

Tavis Ormandy, el investigador que detectó el fallo, notificó a Microsoft en junio de 2009 de este problema, y al poco le confirmaron que estaba en lo cierto. En todo este tiempo, no se ha publicado parche al respecto, lo que ha motivado a Ormandy el hacer pública la vulnerabilidad para forzar a que desde Redmond se pongan las pilas.

Los principales afectados son aquellas empresas que mantienen los sistemas de sus empleados con privilegios limitados. Para usuarios domésticos, que habitualmente usan cuentas de administrador, la cosa no afecta demasiado, porque escalar privilegios no es necesario para poner en riesgo el sistema.

Aunque no hay parche, existe una sencilla vía de evitar la vulnerabilidad. Tan sólo hay que deshabilitar el soporte para aplicaciones de 16 bits, que en la mayor parte de los casos no supondrá problema alguno. Para ello, hay que habilitar “Impedir el acceso a aplicaciones de 16 bits” en la Consola de Políticas (gpedit.msc), dentro de “Configuración de equipo – Plantillas administrativas – Componentes de Windows – Compatibilidad de aplicación”. Hay que forzar una actualización de las políticas en los sistemas que dependan del controlador de dominio para que se aplique el cambio.

<em>**Fuente: **<a href="http://www.genbeta.com/windows/vulnerabilidad-muy-critica-en-todas-las-versiones-de-windows" target="_blank">GenBeta</a></em>
