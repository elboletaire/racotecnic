---
status: publish
published: true
title: Eliminar mensaje de copia pirata de Windows Genuine Advantage
wordpress_id: 366
redirect_from:
- "?p=366/"
date: '2009-03-23 16:46:21 +0100'
categories:
- Windows
tags:
- Regedit
- WinXP
---

> Si todavía no sufres este mensaje y lo que buscas es la manera de evitarlo,
<a title="Evitar mensaje de Windows Genuine Advantage" href="/2009/07/evitar-mensaje-de-windows-office-genuine-advantage/" target="_self">pulsa aquí</a>

La manera de quitar el aviso:  “Podría ser una víctima de falsificación de software. Esta copia de Windows no ha superado el proceso de validación de Windows Original” es tan sencillo como:

- Abrimos el bloc de notas y pegamos el siguiente código:

~~~
taskkill /im wgatray.exe
Del c:WindowsSystem32WgaTray.exe
Del c:WindowsSystem32dllcacheWgaTray.exe
echo Windows Registry Editor Version 5.00 >%temp%WGANFIX.REG
echo. >>%temp%WGANFIX.REG
echo [-HKEY_LOCAL_MACHINESOFTWAREMicrosoftWindows NTCurrentVersionWinlogonNotifyWgaLogon] >>%temp%WGANFIX.REG
regedit /s %temp%WGANFIX.REG
del %temp%WGANFIX.REG
del c:windowssystem32wgalogon.dll
del c:windowssystem32dllcachewgalogon.dll
~~~

- **Guardamos el archivo** como "loquequieras**.bat**". Por ejemplo "quitaraviso**.bat**"
- **Ejecutamos el programa** que acabamos de crear haciendo dos clics sobre él y reiniciamos el ordenador y el mensaje de aviso de que Windows no es original desaparece.


