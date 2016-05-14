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
  -c 'set ftp:list-options -a;\r\n\t\topen ftp://usuarioftp:passwordftp@hostftp;\r\n\t\tlcd
  /directorio/donde/copiar;\r\n\t\tcd /directorio/local/a/copiar;\r\n\t\tmirror --reverse
  \\\r\n\t\t       --delete;\r\n\t\tclose -a;'[/bash]\r\n\r\nComo también quería
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

Recientemente he decidido pagar un servidor compartido para hacer las copias de seguridad de mis documentos, imágenes y demás. Es un servidor realmente barato pero con la pega que no tengo acceso vía SSH, lo que me ha impedido utilizar aplicaciones como rsync o similares.

Después de buscar un rato la única solución viable que he encontrado ha sido lftp, ya que es el único modo que he encontrado de hacer copias incrementales vía FTP.

lftp tiene un método llamado "mirror" que es el que nos permitirá hacer esto. Un ejemplo sencillo de su uso sería...

[bash]lftp -c 'set ftp:list-options -a;<br />
		open ftp://usuarioftp:passwordftp@hostftp;<br />
		lcd /directorio/donde/copiar;<br />
		cd /directorio/local/a/copiar;<br />
		mirror --reverse \<br />
		       --delete;<br />
		close -a;'[/bash]

Como también quería hacer backups de MySQL he decidido entretenerme un rato y hacer mi primer script de bash para hacer copias de mysql y directorios del sistema periódicamente (cada dos días a través de un cron).

Para utilizar el script necesitaréis tener instalado en vuestro servidor linux los paquetes lftp y mailx (o hairloom-mailx); este último servirá para enviarnos un e-mail en caso de error en la subida de nuestros backups. <a id="more"></a><a id="more-1811"></a>

[bash]#!/bin/bash

# :: General Backup Setup ::<br />
BACKUP=/tmp/backup.$$<br />
NOW=$(date +'%Y%m%d')<br />
EMAILID='tu_correo@ejemplo.com'<br />
DOMYSQL=1 # 0 para no hacer copia de seguridad de mysql<br />
DOSYSTEM=1 # 0 para no hacer copia de seguridad del sistema<br />
DEBUG=0 # 1 activa un poco de debug (pero solo un poco xD)

# :: File System Backup Setup ::<br />
FOLDERS=( '/home/usuario/Documentos' '/home/usuario/Imágenes' )<br />
# FTP destination folder<br />
SFOLDER='directorio_destino_donde_guardar_la_copia'

# :: MySQL Backup Setup ::<br />
MUSER='usuarioSQL'<br />
MPASS='pass'<br />
MHOST='localhost'<br />
# MySQL FTP destination folder<br />
MFOLDER='directorio_destino_donde_guardar_los_sql'

# :: FTP server Setup ::<br />
# Root FTP folder<br />
RCD='/directorio_raiz_del_servidor'<br />
FUSER='usuario'<br />
FPASS='contraseña'<br />
FHOST='servidor.dominio'<br />
FOPTIONS='set ftp:list-options -a;set ftp:ssl-allow no' #;set net:limit-total-rate 61440'

# end config

# :: Binaries ::<br />
MYSQL='$(which mysql)'<br />
MYSQLDUMP='$(which mysqldump)'<br />
GZIP='$(which gzip)'<br />
FTP='$(which lftp)'

debug() {<br />
	if [ $DEBUG == 1 ]; then<br />
		echo $1<br />
	fi<br />
}

if [ $DOMYSQL == 1 ]; then<br />
	# Create backup folder<br />
	debug 'Creating backup folder ${BACKUP}'<br />
	[ ! -d $BACKUP ] &amp;&amp; mkdir -p '${BACKUP}' || :

	# Start MySQL backup<br />
	debug 'Showing databases...'<br />
	DBS='$($MYSQL -u $MUSER -h $MHOST -p$MPASS -Bse 'show databases')'<br />
	for db in $DBS<br />
	do<br />
	 if [ $db != 'information_schema' ]; then<br />
	 debug 'Creating $db.sql.gz backup file'<br />
	 FILE=$BACKUP/$db.sql.gz<br />
	 $MYSQLDUMP -u $MUSER -h $MHOST -p$MPASS $db | $GZIP -9 > $FILE<br />
	 chmod 755 $FILE<br />
	 fi<br />
	done<br />
	# Start FTP backup using lftp<br />
	debug 'Starting FTP transaction for MySQL backup files...'<br />
	$FTP -c '$FOPTIONS;<br />
	open ftp://$FUSER:$FPASS@$FHOST;<br />
	lcd $BACKUP;<br />
	cd $RCD/$MFOLDER;<br />
	mkdir ${NOW};<br />
	cd ${NOW};<br />
	mirror  --reverse \<br />
			--delete;<br />
	close -a;'

	# Find out if ftp mysql backup failed or not<br />
	if [ '$?' != '0' ]; then<br />
	 debug 'FTP upload failed'<br />
	 T=/tmp/backup.fail<br />
	 echo 'Date: $(date)'>$T<br />
	 echo 'Hostname: $(hostname)' >>$T<br />
	 echo 'Backup failed' >>$T<br />
	 mail  -s 'MYSQL BACKUP FAILED' '$EMAILID' <$T<br />
	 rm -f $T<br />
	fi

	# Delete files<br />
	debug 'Removing files...'<br />
	if [ $DEBUG ]; then<br />
		rm -frv $BACKUP<br />
	else<br />
		rm -fr $BACKUP<br />
	fi<br />
fi

if [ $DOSYSTEM == 1 ]; then<br />
	# Start System Backup<br />
	# Get number of folders<br />
	FELEM=${#FOLDERS[@]}<br />
	for (( i=0;i<$FELEM;i++)); do<br />
		THISFOLDER=${FOLDERS[${i}]}<br />
		if [ -d $THISFOLDER ]; then<br />
			debug '$THISFOLDER exists'<br />
			REMOTEFOLDER=( $(echo $THISFOLDER | tr '/' ' ') )<br />
			REMOTEFOLDER=${REMOTEFOLDER[${#REMOTEFOLDER[@]}-1]}<br />
			debug 'Using $REMOTEFOLDER as remote folder name'<br />
			debug 'Starting FTP transaction from $THISFOLDER to $RCD/$SFOLDER/$REMOTEFOLDER'<br />
			# FTP transfer<br />
			$FTP -c '$FOPTIONS;<br />
				open ftp://$FUSER:$FPASS@$FHOST;<br />
				lcd $THISFOLDER;<br />
				cd $RCD/$SFOLDER;<br />
				mkdir $REMOTEFOLDER;<br />
				cd $REMOTEFOLDER;<br />
				mirror  --reverse \<br />
						--delete;<br />
				close -a;'<br />
			# Find out if ftp system backup failed<br />
			if [ '$?' != '0' ]; then<br />
			 debug 'File system backup failed'<br />
			 T=/tmp/backup.fail<br />
			 echo 'Date: $(date)'>$T<br />
			 echo 'Hostname: $(hostname)' >>$T<br />
			 echo 'Backup failed on dir $THISFOLDER' >>$T<br />
			 mail  -s 'SYSTEM BACKUP FAILED' '$EMAILID' <$T<br />
			 rm -f $T<br />
			fi<br />
		fi<br />
	done<br />
fi<br />
[/bash]

Como he dicho, es el primer script de bash que he hecho en la vida (a parte de alguno otro realmente tonto..) así que si me proponéis ideas para mejorarlo o encontráis algún error os agradecería que me lo comentarais :)
