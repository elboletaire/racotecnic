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
  como rsync o similares. Después de buscar un rato la única solución viable
  que he encontrado ha sido lftp, ya que es el único modo que he encontrado de hacer
  copias incrementales vía FTP."
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

~~~bash
lftp -c 'set ftp:list-options -a;
    open ftp://usuarioftp:passwordftp@hostftp;
    lcd /directorio/donde/copiar;
    cd /directorio/local/a/copiar;
    mirror --reverse \
           --delete;
    close -a;'
~~~

Como también quería hacer backups de MySQL he decidido entretenerme un rato y hacer mi primer script de bash para hacer copias de mysql y directorios del sistema periódicamente (cada dos días a través de un cron).

Para utilizar el script necesitaréis tener instalado en vuestro servidor linux los paquetes lftp y mailx (o hairloom-mailx); este último servirá para enviarnos un e-mail en caso de error en la subida de nuestros backups. <a id="more"></a><a id="more-1811"></a>

~~~bash
#!/bin/bash

# :: General Backup Setup ::
BACKUP=/tmp/backup.$$
NOW=$(date +'%Y%m%d')
EMAILID='tu_correo@ejemplo.com'
DOMYSQL=1 # 0 para no hacer copia de seguridad de mysql
DOSYSTEM=1 # 0 para no hacer copia de seguridad del sistema
DEBUG=0 # 1 activa un poco de debug (pero solo un poco xD)

# :: File System Backup Setup ::
FOLDERS=( '/home/usuario/Documentos' '/home/usuario/Imágenes' )
# FTP destination folder
SFOLDER='directorio_destino_donde_guardar_la_copia'

# :: MySQL Backup Setup ::
MUSER='usuarioSQL'
MPASS='pass'
MHOST='localhost'
# MySQL FTP destination folder
MFOLDER='directorio_destino_donde_guardar_los_sql'

# :: FTP server Setup ::
# Root FTP folder
RCD='/directorio_raiz_del_servidor'
FUSER='usuario'
FPASS='contraseña'
FHOST='servidor.dominio'
FOPTIONS='set ftp:list-options -a;set ftp:ssl-allow no' #;set net:limit-total-rate 61440'

# end config

# :: Binaries ::
MYSQL='$(which mysql)'
MYSQLDUMP='$(which mysqldump)'
GZIP='$(which gzip)'
FTP='$(which lftp)'

debug() {
  if [ $DEBUG == 1 ]; then
    echo $1
  fi
}

if [ $DOMYSQL == 1 ]; then
  # Create backup folder
  debug 'Creating backup folder ${BACKUP}'
  [ ! -d $BACKUP ] &amp;&amp; mkdir -p '${BACKUP}' || :

  # Start MySQL backup
  debug 'Showing databases...'
  DBS='$($MYSQL -u $MUSER -h $MHOST -p$MPASS -Bse 'show databases')'
  for db in $DBS
  do
   if [ $db != 'information_schema' ]; then
   debug 'Creating $db.sql.gz backup file'
   FILE=$BACKUP/$db.sql.gz
   $MYSQLDUMP -u $MUSER -h $MHOST -p$MPASS $db | $GZIP -9 > $FILE
   chmod 755 $FILE
   fi
  done
  # Start FTP backup using lftp
  debug 'Starting FTP transaction for MySQL backup files...'
  $FTP -c '$FOPTIONS;
  open ftp://$FUSER:$FPASS@$FHOST;
  lcd $BACKUP;
  cd $RCD/$MFOLDER;
  mkdir ${NOW};
  cd ${NOW};
  mirror  --reverse \
      --delete;
  close -a;'

  # Find out if ftp mysql backup failed or not
  if [ '$?' != '0' ]; then
   debug 'FTP upload failed'
   T=/tmp/backup.fail
   echo 'Date: $(date)'>$T
   echo 'Hostname: $(hostname)' >>$T
   echo 'Backup failed' >>$T
   mail  -s 'MYSQL BACKUP FAILED' '$EMAILID' <$T
   rm -f $T
  fi

  # Delete files
  debug 'Removing files...'
  if [ $DEBUG ]; then
    rm -frv $BACKUP
  else
    rm -fr $BACKUP
  fi
fi

if [ $DOSYSTEM == 1 ]; then
  # Start System Backup
  # Get number of folders
  FELEM=${#FOLDERS[@]}
  for (( i=0;i<$FELEM;i++)); do
    THISFOLDER=${FOLDERS[${i}]}
    if [ -d $THISFOLDER ]; then
      debug '$THISFOLDER exists'
      REMOTEFOLDER=( $(echo $THISFOLDER | tr '/' ' ') )
      REMOTEFOLDER=${REMOTEFOLDER[${#REMOTEFOLDER[@]}-1]}
      debug 'Using $REMOTEFOLDER as remote folder name'
      debug 'Starting FTP transaction from $THISFOLDER to $RCD/$SFOLDER/$REMOTEFOLDER'
      # FTP transfer
      $FTP -c '$FOPTIONS;
        open ftp://$FUSER:$FPASS@$FHOST;
        lcd $THISFOLDER;
        cd $RCD/$SFOLDER;
        mkdir $REMOTEFOLDER;
        cd $REMOTEFOLDER;
        mirror  --reverse \
            --delete;
        close -a;'
      # Find out if ftp system backup failed
      if [ '$?' != '0' ]; then
       debug 'File system backup failed'
       T=/tmp/backup.fail
       echo 'Date: $(date)'>$T
       echo 'Hostname: $(hostname)' >>$T
       echo 'Backup failed on dir $THISFOLDER' >>$T
       mail  -s 'SYSTEM BACKUP FAILED' '$EMAILID' <$T
       rm -f $T
      fi
    fi
  done
fi
~~~

Como he dicho, es el primer script de bash que he hecho en la vida (a parte de alguno otro realmente tonto..) así que si me proponéis ideas para mejorarlo o encontráis algún error os agradecería que me lo comentarais :)
