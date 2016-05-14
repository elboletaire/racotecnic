---
layout: post
status: publish
published: true
title: Backups incrementales vía FTP en Linux
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Recientemente he decidido pagar un servidor compartido para hacer las copias
  de seguridad de mis documentos, imágenes y demás. Es un servidor realmente barato
  pero con la pega que no tengo acceso vía SSH, lo que me ha impedido utilizar aplicaciones
  como rsync o similares.\r\n\r\nDespués de buscar un rato la única solución viable
  que he encontrado ha sido lftp, ya que es el único modo que he encontrado de hacer
  copias incrementales vía FTP.\r\n\r\nlftp tiene un método llamado \"mirror\" que
  es el que nos permitirá hacer esto. Un ejemplo sencillo de su uso sería...\r\n\r\n[bash]lftp
  -c &quot;set ftp:list-options -a;\r\n\t\topen ftp://usuarioftp:passwordftp@hostftp;\r\n\t\tlcd
  /directorio/donde/copiar;\r\n\t\tcd /directorio/local/a/copiar;\r\n\t\tmirror --reverse
  \\\r\n\t\t       --delete;\r\n\t\tclose -a;&quot;[/bash]\r\n\r\nComo también quería
  hacer backups de MySQL he decidido entretenerme un rato y hacer mi primer script
  de bash para hacer copias de mysql y directorios del sistema periódicamente (cada
  dos días a través de un cron).\r\n\r\nPara utilizar el script necesitaréis tener
  instalado en vuestro servidor linux los paquetes lftp y mailx (o hairloom-mailx);
  este último servirá para enviarnos un e-mail en caso de error en la subida de nuestros
  backups. "
wordpress_id: 1811
wordpress_url: http://www.racotecnic.com/?p=1811
date: '2011-02-06 21:26:48 +0100'
date_gmt: '2011-02-06 20:26:48 +0100'
categories:
- Programació
- Linux
- Administració
tags:
- Shell
- Codi
- backup
- lftp
- bash
---
<p>Recientemente he decidido pagar un servidor compartido para hacer las copias de seguridad de mis documentos, imágenes y demás. Es un servidor realmente barato pero con la pega que no tengo acceso vía SSH, lo que me ha impedido utilizar aplicaciones como rsync o similares.</p>
<p>Después de buscar un rato la única solución viable que he encontrado ha sido lftp, ya que es el único modo que he encontrado de hacer copias incrementales vía FTP.</p>
<p>lftp tiene un método llamado "mirror" que es el que nos permitirá hacer esto. Un ejemplo sencillo de su uso sería...</p>
<p>[bash]lftp -c &quot;set ftp:list-options -a;<br />
		open ftp://usuarioftp:passwordftp@hostftp;<br />
		lcd /directorio/donde/copiar;<br />
		cd /directorio/local/a/copiar;<br />
		mirror --reverse \<br />
		       --delete;<br />
		close -a;&quot;[/bash]</p>
<p>Como también quería hacer backups de MySQL he decidido entretenerme un rato y hacer mi primer script de bash para hacer copias de mysql y directorios del sistema periódicamente (cada dos días a través de un cron).</p>
<p>Para utilizar el script necesitaréis tener instalado en vuestro servidor linux los paquetes lftp y mailx (o hairloom-mailx); este último servirá para enviarnos un e-mail en caso de error en la subida de nuestros backups. <a id="more"></a><a id="more-1811"></a></p>
<p>[bash]#!/bin/bash</p>
<p># :: General Backup Setup ::<br />
BACKUP=/tmp/backup.$$<br />
NOW=$(date +&quot;%Y%m%d&quot;)<br />
EMAILID=&quot;tu_correo@ejemplo.com&quot;<br />
DOMYSQL=1 # 0 para no hacer copia de seguridad de mysql<br />
DOSYSTEM=1 # 0 para no hacer copia de seguridad del sistema<br />
DEBUG=0 # 1 activa un poco de debug (pero solo un poco xD)</p>
<p># :: File System Backup Setup ::<br />
FOLDERS=( '/home/usuario/Documentos' '/home/usuario/Imágenes' )<br />
# FTP destination folder<br />
SFOLDER=&quot;directorio_destino_donde_guardar_la_copia&quot;</p>
<p># :: MySQL Backup Setup ::<br />
MUSER=&quot;usuarioSQL&quot;<br />
MPASS=&quot;pass&quot;<br />
MHOST=&quot;localhost&quot;<br />
# MySQL FTP destination folder<br />
MFOLDER=&quot;directorio_destino_donde_guardar_los_sql&quot;</p>
<p># :: FTP server Setup ::<br />
# Root FTP folder<br />
RCD=&quot;/directorio_raiz_del_servidor&quot;<br />
FUSER=&quot;usuario&quot;<br />
FPASS=&quot;contraseña&quot;<br />
FHOST=&quot;servidor.dominio&quot;<br />
FOPTIONS=&quot;set ftp:list-options -a;set ftp:ssl-allow no&quot; #;set net:limit-total-rate 61440&quot;</p>
<p># end config</p>
<p># :: Binaries ::<br />
MYSQL=&quot;$(which mysql)&quot;<br />
MYSQLDUMP=&quot;$(which mysqldump)&quot;<br />
GZIP=&quot;$(which gzip)&quot;<br />
FTP=&quot;$(which lftp)&quot;</p>
<p>debug() {<br />
	if [ $DEBUG == 1 ]; then<br />
		echo $1<br />
	fi<br />
}</p>
<p>if [ $DOMYSQL == 1 ]; then<br />
	# Create backup folder<br />
	debug &quot;Creating backup folder ${BACKUP}&quot;<br />
	[ ! -d $BACKUP ] &amp;&amp; mkdir -p &quot;${BACKUP}&quot; || :</p>
<p>	# Start MySQL backup<br />
	debug &quot;Showing databases...&quot;<br />
	DBS=&quot;$($MYSQL -u $MUSER -h $MHOST -p$MPASS -Bse 'show databases')&quot;<br />
	for db in $DBS<br />
	do<br />
	 if [ $db != &quot;information_schema&quot; ]; then<br />
	 debug &quot;Creating $db.sql.gz backup file&quot;<br />
	 FILE=$BACKUP/$db.sql.gz<br />
	 $MYSQLDUMP -u $MUSER -h $MHOST -p$MPASS $db | $GZIP -9 &gt; $FILE<br />
	 chmod 755 $FILE<br />
	 fi<br />
	done<br />
	# Start FTP backup using lftp<br />
	debug &quot;Starting FTP transaction for MySQL backup files...&quot;<br />
	$FTP -c &quot;$FOPTIONS;<br />
	open ftp://$FUSER:$FPASS@$FHOST;<br />
	lcd $BACKUP;<br />
	cd $RCD/$MFOLDER;<br />
	mkdir ${NOW};<br />
	cd ${NOW};<br />
	mirror  --reverse \<br />
			--delete;<br />
	close -a;&quot;</p>
<p>	# Find out if ftp mysql backup failed or not<br />
	if [ &quot;$?&quot; != &quot;0&quot; ]; then<br />
	 debug &quot;FTP upload failed&quot;<br />
	 T=/tmp/backup.fail<br />
	 echo &quot;Date: $(date)&quot;&gt;$T<br />
	 echo &quot;Hostname: $(hostname)&quot; &gt;&gt;$T<br />
	 echo &quot;Backup failed&quot; &gt;&gt;$T<br />
	 mail  -s &quot;MYSQL BACKUP FAILED&quot; &quot;$EMAILID&quot; &lt;$T<br />
	 rm -f $T<br />
	fi</p>
<p>	# Delete files<br />
	debug &quot;Removing files...&quot;<br />
	if [ $DEBUG ]; then<br />
		rm -frv $BACKUP<br />
	else<br />
		rm -fr $BACKUP<br />
	fi<br />
fi</p>
<p>if [ $DOSYSTEM == 1 ]; then<br />
	# Start System Backup<br />
	# Get number of folders<br />
	FELEM=${#FOLDERS[@]}<br />
	for (( i=0;i&lt;$FELEM;i++)); do<br />
		THISFOLDER=${FOLDERS[${i}]}<br />
		if [ -d $THISFOLDER ]; then<br />
			debug &quot;$THISFOLDER exists&quot;<br />
			REMOTEFOLDER=( $(echo $THISFOLDER | tr &quot;/&quot; &quot; &quot;) )<br />
			REMOTEFOLDER=${REMOTEFOLDER[${#REMOTEFOLDER[@]}-1]}<br />
			debug &quot;Using $REMOTEFOLDER as remote folder name&quot;<br />
			debug &quot;Starting FTP transaction from $THISFOLDER to $RCD/$SFOLDER/$REMOTEFOLDER&quot;<br />
			# FTP transfer<br />
			$FTP -c &quot;$FOPTIONS;<br />
				open ftp://$FUSER:$FPASS@$FHOST;<br />
				lcd $THISFOLDER;<br />
				cd $RCD/$SFOLDER;<br />
				mkdir $REMOTEFOLDER;<br />
				cd $REMOTEFOLDER;<br />
				mirror  --reverse \<br />
						--delete;<br />
				close -a;&quot;<br />
			# Find out if ftp system backup failed<br />
			if [ &quot;$?&quot; != &quot;0&quot; ]; then<br />
			 debug &quot;File system backup failed&quot;<br />
			 T=/tmp/backup.fail<br />
			 echo &quot;Date: $(date)&quot;&gt;$T<br />
			 echo &quot;Hostname: $(hostname)&quot; &gt;&gt;$T<br />
			 echo &quot;Backup failed on dir $THISFOLDER&quot; &gt;&gt;$T<br />
			 mail  -s &quot;SYSTEM BACKUP FAILED&quot; &quot;$EMAILID&quot; &lt;$T<br />
			 rm -f $T<br />
			fi<br />
		fi<br />
	done<br />
fi<br />
[/bash]</p>
<p>Como he dicho, es el primer script de bash que he hecho en la vida (a parte de alguno otro realmente tonto..) así que si me proponéis ideas para mejorarlo o encontráis algún error os agradecería que me lo comentarais :)</p>
