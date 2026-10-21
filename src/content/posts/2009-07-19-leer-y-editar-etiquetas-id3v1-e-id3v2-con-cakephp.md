---
status: publish
published: true
title: Leer y editar etiquetas ID3v1 e ID3v2 con CakePHP 1.2
excerpt: "Si, como yo, estáis interesados en editar y leer las etiquetas ID3 de los ficheros mp3 que se suban a vuestro servidor, podéis hacerlo utilizando las funciones propias de PHP para ello (necesitáis que vuestro hosting lo tenga instalado) o bien, si os pasa igual que a mi que en mi hosting no tienen habilitadas estas funciones (y si no tienes un servidor dedicado no te las instalarán para no detener el servicio), podéis utilizar las classes de PHP GetID3"
wordpress_id: 679
redirect_from:
- "?p=679/"
date: '2009-07-19 20:24:15 +0200'
categories:
- Programació
- Web
tags:
- PHP
- CakePHP
- ID3
- getID3
- mp3
---

Si, como yo, estáis interesados en editar y leer las etiquetas ID3 de los ficheros mp3 que se suban a vuestro servidor, podéis hacerlo utilizando las <a title="ID3 en php.net" href="http://es.php.net/manual/en/book.id3.php" target="_blank" rel="noopener">funciones propias de PHP para ello</a> (necesitáis que vuestro hosting lo tenga instalado) o bien, si os pasa igual que a mi que en mi hosting no tienen habilitadas estas funciones (y si no tienes un servidor dedicado no te las instalarán para no detener el servicio), podéis utilizar las classes de PHP <a title="Visitar página del proyecto GetID3" href="http://www.getid3.org" target="_blank" rel="noopener">GetID3</a>.

Si no la conocíais os recomiendo que la descarguéis y hagáis alguna prueba con ella, realmente se le puede sacar mucho jugo ya que con ella no sólo podemos editar etiquetas ID3; esto son algunos de los muchos formatos cuya información podéis consultar y / o editar con este magnífico conjunto de clases:



> **getID3()** is a PHP script that extracts useful information from MP3s &amp; other multimedia file formats:
>
> - **Tag formats:**
>   + [ID3v1](http://www.id3.org/id3v1.html) (v1.0 &amp; v1.1)
>   + [ID3v2 (v2.2, v2.3 &amp; v2.4)](http://www.id3.org/)
>   + [APE tags (v1 &amp; v2)](http://www.personal.uni-jena.de/%7Epfk/mpp/sv8/apetag.html)
>   + [(Ogg) VorbisComment](http://www.xiph.org/ogg/vorbis/doc/v-comment.html)
>   + Lyrics3 ([v1](http://www.id3.org/lyrics3.html) &amp; [v2](http://www.id3.org/lyrics3200.html))
> - **Lossy Audio-only formats:**
>   + [MP3, MP2, MP1](http://www.mp3-tech.org/programmer/frame_header.html) (MPEG-1, layer III/II/I audio, including Fraunhofer, Xing and [LAME VBR/CBR headers](http://gabriel.mp3-tech.org/mp3infotag.html))
>   + [Ogg Vorbis](http://www.xiph.org/)
>   + [AAC](http://www.audiocoding.com/wiki/index.php?page=AAC) &amp; MP4
>   + [AC-3](http://www.dolby.com/digital/)
>   + [RealAudio](http://www.real.com/)
> - **Lossless Audio-only formats:**
>   + [WAV](http://en.wikipedia.org/wiki/Wav) (including extended chunks such as BWF and CART)
>   + [AIFF](http://en.wikipedia.org/wiki/Aiff)
>   + [FLAC](http://flac.sourceforge.net/) &amp; OggFLAC
>   + [LPAC (Lossless Predictive Audio Compressor)](http://www-ft.ee.tu-berlin.de/%7Eliebchen/lpac.html)
>   + [Apple Lossless Audio Codec](http://www.apple.com/itunes/import.html)
>   + [RealAudio Lossless](http://www.real.com/)
>   + [CD-audio (*.cda)](http://en.wikipedia.org/wiki/CD_Audio)
>   + [MIDI](http://en.wikipedia.org/wiki/Midi#MIDI_file_formats)
> - **Audio-Video formats:**
>   + [AVI](http://en.wikipedia.org/wiki/Audio_Video_Interleave)
>   + [Matroska](http://www.matroska.org/)
>   + [ASF (ASF, Windows Media Audio (WMA), Windows Media Video (WMV))](http://www.microsoft.com/windowsmedia/)
>   + [MPEG-1](http://en.wikipedia.org/wiki/MPEG-1) &amp; [MPEG-2](http://en.wikipedia.org/wiki/MPEG-2)
>   + [Quicktime](http://www.apple.com/quicktime/)
>   + [RealVideo](http://www.real.com/)
> - **Graphic formats:**
>   + [JPEG](http://en.wikipedia.org/wiki/JPEG)
>   + [PNG](http://en.wikipedia.org/wiki/Portable_Network_Graphics)
>   + [GIF](http://en.wikipedia.org/wiki/Graphics_Interchange_Format)
>   + [BMP (Windows &amp; OS/2)](http://en.wikipedia.org/wiki/BMP_file_format)
>   + [TIFF](http://en.wikipedia.org/wiki/Tagged_Image_File_Format)
>   + [SWF (Flash)](http://www.openswf.org/)
> - **Data formats:**
>   + [ZIP](http://en.wikipedia.org/wiki/ZIP_%28file_format%29)
>   + [TAR](http://en.wikipedia.org/wiki/Tar_%28file_format%29)
>   + [GZIP](http://en.wikipedia.org/wiki/Gzip)
>   + [ISO 9660 (CD-ROM image)](http://en.wikipedia.org/wiki/ISO_image)
> - **Metadata types:**
>   + [EXIF (Exchangeable image file format)](http://en.wikipedia.org/wiki/Exchangeable_image_file_format)
> - **getID3() can write:**
>   + [ID3v1 (v1 &amp; v1.1)](http://en.wikipedia.org/wiki/ID3v1)
>   + [ID3v2 (v2.3, v2.4)](http://en.wikipedia.org/wiki/ID3v1)
>   + [APE (v2)](http://en.wikipedia.org/wiki/APE_tag)
>   + [Ogg Vorbis comments](http://en.wikipedia.org/wiki/Ogg)
>   + [FLAC comments](http://en.wikipedia.org/wiki/Free_Lossless_Audio_Codec)

He eliminado unos cuantos formatos de la lista, si queréis verlos todos id a su página web.

¡Al grano! Ya conocemos las clases ID3 (aunque sea un poco por encima, como yo..) y queremos implementarlas en nuestra aplicación de Cake.

No es muy complicado si utilizamos las demos que nos dan en el zip que nos descargamos de getID3.org. Simplemente debemos tener en cuenta que los "require" que utilicen en las demos debemos substituirlas por <a href="http://api.cakephp.org/class/app#method-Appimport" rel="noopener nofollow" target="_blank" title="Ver documentación del método">App::import('vendor','rutadelaclase')</a>.

Lo primero que deberemos hacer será descargar getID3. Si queréis editar etiquetas ID3v2 deberéis descargar la versión estable (actualmente la <a href="http://sourceforge.net/projects/getid3/files/getID3()%201.x/getid3-1.7.9.zip/download" target="_blank" rel="noopener nofollow" title="Desargar">1.7.9</a>) ya que en la versión beta (actualmente la <a href="http://sourceforge.net/projects/getid3/files/getID3%28%29%20beta/getid3-2.0.0b5.zip/download" rel="noopener nofollow" target="_blank" title="Descargar">2.0.0-b5</a>) no funcionan las clases necesarias.

Una vez descargado, lo descomprimimos y lo subimos a la carpeta vendors de nuestro proyecto Cake (para mayor comodidad renombrar la carpeta a "getid3"). Seguramente <a href="http://cakebaker.42dh.com/2006/08/11/why-are-there-two-vendors-folders-in-cakephp/" target="_blank" rel="noopener nofollow" title="Why are there two vendors folders in CakePHP?">habréis visto que existen dos carpetas *vendor*</a> en vuestra aplicación de Cake. Debéis ponerlo en la que se encuentra en la carpeta raíz (junto con las carpeta "app" y "cake").

Ahora que ya tenemos nuestro plugin en la aplicación debemos crear un componente que nos sirva de conexión entre las librerías getID3 y nuestro Cake.

Para hacerlo utilizaremos como referencia las demos "demo.basic.php" y "demo.simple.write.php". Recordad que hay que substituir los *require* e *includes* por App::import(). Este es el resultado que he obtenido yo:

~~~php
<?php
class Getid3Component extends Object
{
  function __construct() {
    set_time_limit(20 * 3600);
    ignore_user_abort(false);
  }

  function extract($filename) {
    // Importamos el fichero getid3.php que contiene la classe getID3
    App::import('vendor', 'getid3/getid3', array('file' => 'getid3.php'));
    // Initialize getID3 engine
    $getID3 = new getID3;

    // Analyze file and store returned data in $ThisFileInfo
    $ThisFileInfo = $getID3->analyze($filename);
    // Devolvemos un array con toda la información del fichero
    return $ThisFileInfo;
  }

  function write($filename, $data)
  {
    App::import('vendor', 'getid3/getid3/getid3');

    // Initialize getID3 engine
    $getID3 = new getID3;
    // Indicamos a getID3 que utilice la codificación de Cake
    $getID3->setOption(array('encoding' => Configure::read('App.encoding')));

    App::import('vendor', 'getid3/getid3', array('file' => 'write.php'));

    // Initialize getID3 tag-writing module
    $tagwriter = new getid3_writetags;

    $tagwriter->filename       = $filename;
    $tagwriter->tagformats     = array('id3v1', 'id3v2.3');

    // set various options (optional)
    $tagwriter->overwrite_tags = true;
    $tagwriter->tag_encoding   = Configure::read('App.encoding');
    $tagwriter->remove_other_tags = true;

    // populate data array
    $TagData['title'][]   = $data['title'];
    $TagData['artist'][]  = $data['artist'];
    $TagData['album'][]   = $data['album'];
    $TagData['year'][]    = $data['year'];
    $TagData['genre'][]   = $data['genre'];
    $TagData['comment'][] = $data['comment'];
    $TagData['track'][]   = $data['track'];

    $tagwriter->tag_data = $TagData;

    // write tags
    if ($tagwriter->WriteTags()) {
      if (!empty($tagwriter->warnings)) {
        return $tagwriter->warnings;
      }
      return true;
    } else {
      return $tagwriter->errors;
    }
  }
}
~~~

Recordad que los componentes van en la carpeta `app/controllers/components` y que el nombre de este fichero deberá ser `getid3.php`.

Ahora que ya tenemos nuestro componente vayamos al controlador sobre el que queramos utilizarlo y añadamoslo al resto de componentes:

~~~php
<?php
class AudiosController extends AppController
{
  var $name = 'Audios';
  var $components = array('Upload', 'Getid3');
  // [...]
}
~~~

Y sólo nos queda saber cómo utilizarlo:

~~~php
$datos = array(
  'album' => 'Nombre del álbum',
  'title' => 'Título del tema',
  'artist' => 'Artista',
  'year' => 'Año',
  'genre' => 'Estilo',
  'comment' => 'Comentario'
);
$this->Getid2->write('rutadelfichero.mp3', $datos);
~~~

Y para leer los datos de un mp3:

~~~php
$this->Getid2->extract('rutadelfichero.mp3')
~~~

Que nos dará una salida similar a [ésta](/2009/07/leer-y-editar-etiquetas-id3v1-e-id3v2-con-cakephp/#sortida).

Habéis visto más o menos el método de implementar funciones de getID3 en CakePHP. Ahora es tarea vuestra intentar añadir más funcionalidades a vuestro complemento según vuestras necesidades.

Como siempre, espero que le sirva a alguien!

> Páginas de referencia:
>
> - <a href="http://www.getid3.org" target="_blank" rel="noopener nofollow">getID3.org
> - <a href="http://api.cakephp.org" target="_blank" rel="noopener nofollow">API de CakePHP
> - <a href="http://www.devarticles.in/cakephp/getid3-component-for-cakephp/" target="_blank" rel="noopener nofollow">GetID3 component for CakePHP</a>

Salida de mi fichero de prueba mp3:

    Array
    (
        [GETID3_VERSION] => 1.7.9-20090308
        [filesize] => 263776
        [avdataoffset] => 4096
        [avdataend] => 263648
        [fileformat] => mp3
        [audio] => Array
            (
                [dataformat] => mp3
                [channels] => 2
                [sample_rate] => 44100
                [bitrate] => 128000
                [channelmode] => stereo
                [bitrate_mode] => cbr
                [lossless] =>
                [encoder_options] => CBR128
                [compression_ratio] => 0.0907029478458
                [streams] => Array
                    (
                        [0] => Array
                            (
                                [dataformat] => mp3
                                [channels] => 2
                                [sample_rate] => 44100
                                [bitrate] => 128000
                                [channelmode] => stereo
                                [bitrate_mode] => cbr
                                [lossless] =>
                                [encoder_options] => CBR128
                                [compression_ratio] => 0.0907029478458
                            )

                    )

            )

        [tags] => Array
            (
                [id3v1] => Array
                    (
                        [title] => Array
                            (
                                [0] => Títol del tema
                            )

                        [artist] => Array
                            (
                                [0] => Jo mateix
                            )

                        [album] => Array
                            (
                                [0] => Muahahahahah
                            )

                        [year] => Array
                            (
                                [0] => 2009
                            )

                        [comment] => Array
                            (
                                [0] => from www.underave.net
                            )

                        [genre] => Array
                            (
                                [0] => Techno
                            )

                    )

                [id3v2] => Array
                    (
                        [title] => Array
                            (
                                [0] => Títol del tema
                            )

                        [artist] => Array
                            (
                                [0] => Jo mateix
                            )

                        [album] => Array
                            (
                                [0] => Muahahahahah
                            )

                        [year] => Array
                            (
                                [0] => 2009
                            )

                        [genre] => Array
                            (
                                [0] => Techno
                            )

                        [comments] => Array
                            (
                                [0] => from www.underave.net
                            )

                    )

            )

        [encoding] => ISO-8859-1
        [filename] => Bong0.mp3
        [filepath] => /public_html/waste/v3.2/app/webroot/files/mp3
        [filenamepath] => /public_html/waste/v3.2/app/webroot/files/mp3/Bong0.mp3
        [id3v2] => Array
            (
                [header] => 1
                [flags] => Array
                    (
                        [unsynch] =>
                        [exthead] =>
                        [experim] =>
                    )

                [majorversion] => 3
                [minorversion] => 0
                [headerlength] => 4096
                [tag_offset_start] => 0
                [tag_offset_end] => 4096
                [encoding] => UTF-8
                [comments] => Array
                    (
                        [title] => Array
                            (
                                [0] => Títol del tema
                            )

                        [artist] => Array
                            (
                                [0] => Jo mateix
                            )

                        [album] => Array
                            (
                                [0] => Muahahahahah
                            )

                        [year] => Array
                            (
                                [0] => 2009
                            )

                        [genre] => Array
                            (
                                [0] => Techno
                            )

                        [comments] => Array
                            (
                                [0] => from www.underave.net
                            )

                    )

                [TIT2] => Array
                    (
                        [0] => Array
                            (
                                [frame_name] => TIT2
                                [frame_flags_raw] => 0
                                [data] => ��T���t�o�l� �d�e�l� �t�e�m�a�
                                [datalength] => 31
                                [dataoffset] => 10
                                [framenamelong] => Title/songname/content description
                                [framenameshort] => title
                                [flags] => Array
                                    (
                                        [TagAlterPreservation] =>
                                        [FileAlterPreservation] =>
                                        [ReadOnly] =>
                                        [compression] =>
                                        [Encryption] =>
                                        [GroupingIdentity] =>
                                    )

                                [encodingid] => 1
                                [encoding] => UTF-16
                            )

                    )

                [TPE1] => Array
                    (
                        [0] => Array
                            (
                                [frame_name] => TPE1
                                [frame_flags_raw] => 0
                                [data] => ��J�o� �m�a�t�e�i�x�
                                [datalength] => 21
                                [dataoffset] => 51
                                [framenamelong] => Lead performer(s)/Soloist(s)
                                [framenameshort] => artist
                                [flags] => Array
                                    (
                                        [TagAlterPreservation] =>
                                        [FileAlterPreservation] =>
                                        [ReadOnly] =>
                                        [compression] =>
                                        [Encryption] =>
                                        [GroupingIdentity] =>
                                    )

                                [encodingid] => 1
                                [encoding] => UTF-16
                            )

                    )

                [TALB] => Array
                    (
                        [0] => Array
                            (
                                [frame_name] => TALB
                                [frame_flags_raw] => 0
                                [data] => ��M�u�a�h�a�h�a�h�a�h�a�h�
                                [datalength] => 27
                                [dataoffset] => 82
                                [framenamelong] => Album/Movie/Show title
                                [framenameshort] => album
                                [flags] => Array
                                    (
                                        [TagAlterPreservation] =>
                                        [FileAlterPreservation] =>
                                        [ReadOnly] =>
                                        [compression] =>
                                        [Encryption] =>
                                        [GroupingIdentity] =>
                                    )

                                [encodingid] => 1
                                [encoding] => UTF-16
                            )

                    )

                [TYER] => Array
                    (
                        [0] => Array
                            (
                                [frame_name] => TYER
                                [frame_flags_raw] => 0
                                [data] => ��2�0�0�9�
                                [datalength] => 11
                                [dataoffset] => 119
                                [framenamelong] => Year
                                [framenameshort] => year
                                [flags] => Array
                                    (
                                        [TagAlterPreservation] =>
                                        [FileAlterPreservation] =>
                                        [ReadOnly] =>
                                        [compression] =>
                                        [Encryption] =>
                                        [GroupingIdentity] =>
                                    )

                                [encodingid] => 1
                                [encoding] => UTF-16
                            )

                    )

                [TCON] => Array
                    (
                        [0] => Array
                            (
                                [frame_name] => TCON
                                [frame_flags_raw] => 0
                                [data] => ��T�e�c�h�n�o�
                                [datalength] => 15
                                [dataoffset] => 140
                                [framenamelong] => Content type
                                [framenameshort] => genre
                                [flags] => Array
                                    (
                                        [TagAlterPreservation] =>
                                        [FileAlterPreservation] =>
                                        [ReadOnly] =>
                                        [compression] =>
                                        [Encryption] =>
                                        [GroupingIdentity] =>
                                    )

                                [encodingid] => 1
                                [encoding] => UTF-16
                            )

                    )

                [COMM] => Array
                    (
                        [0] => Array
                            (
                                [frame_name] => COMM
                                [frame_flags_raw] => 0
                                [data] => ��f�r�o�m� �w�w�w�.�u�n�d�e�r�a�v�e�.�n�e�t�
                                [datalength] => 50
                                [dataoffset] => 165
                                [framenamelong] => Comments
                                [framenameshort] => comments
                                [flags] => Array
                                    (
                                        [TagAlterPreservation] =>
                                        [FileAlterPreservation] =>
                                        [ReadOnly] =>
                                        [compression] =>
                                        [Encryption] =>
                                        [GroupingIdentity] =>
                                    )

                                [encodingid] => 1
                                [encoding] => UTF-16
                                [language] => eng
                                [languagename] => English
                                [description] =>
                            )

                    )

                [TRCK] => Array
                    (
                        [0] => Array
                            (
                                [frame_name] => TRCK
                                [frame_flags_raw] => 0
                                [data] =>
                                [datalength] => 1
                                [dataoffset] => 225
                                [framenamelong] => Track number/Position in set
                                [framenameshort] => track_number
                                [flags] => Array
                                    (
                                        [TagAlterPreservation] =>
                                        [FileAlterPreservation] =>
                                        [ReadOnly] =>
                                        [compression] =>
                                        [Encryption] =>
                                        [GroupingIdentity] =>
                                    )

                                [encodingid] => 1
                                [encoding] => UTF-16
                            )

                    )

                [padding] => Array
                    (
                        [start] => 236
                        [length] => 3860
                        [valid] => 1
                    )

            )

        [id3v1] => Array
            (
                [title] => Títol del tema
                [artist] => Jo mateix
                [album] => Muahahahahah
                [year] => 2009
                [comment] => from www.underave.net
                [genre] => Techno
                [comments] => Array
                    (
                        [title] => Array
                            (
                                [0] => Títol del tema
                            )

                        [artist] => Array
                            (
                                [0] => Jo mateix
                            )

                        [album] => Array
                            (
                                [0] => Muahahahahah
                            )

                        [year] => Array
                            (
                                [0] => 2009
                            )

                        [comment] => Array
                            (
                                [0] => from www.underave.net
                            )

                        [genre] => Array
                            (
                                [0] => Techno
                            )

                    )

                [padding_valid] => 1
                [tag_offset_end] => 263776
                [tag_offset_start] => 263648
                [encoding] => ISO-8859-1
            )

        [mime_type] => audio/mpeg
        [mpeg] => Array
            (
                [audio] => Array
                    (
                        [raw] => Array
                            (
                                [synch] => 4094
                                [version] => 3
                                [layer] => 1
                                [protection] => 0
                                [bitrate] => 9
                                [sample_rate] => 0
                                [padding] => 0
                                [private] => 0
                                [channelmode] => 0
                                [modeextension] => 0
                                [copyright] => 0
                                [original] => 1
                                [emphasis] => 0
                            )

                        [version] => 1
                        [layer] => 3
                        [channelmode] => stereo
                        [channels] => 2
                        [sample_rate] => 44100
                        [protection] => 1
                        [private] =>
                        [modeextension] =>
                        [copyright] =>
                        [original] => 1
                        [emphasis] => none
                        [crc] => 54304
                        [padding] =>
                        [bitrate] => 128000
                        [framelength] => 417
                        [bitrate_mode] => cbr
                    )

            )

        [playtime_seconds] => 16.222
        [tags_html] => Array
            (
                [id3v1] => Array
                    (
                        [title] => Array
                            (
                                [0] => T&amp;iacute;tol del tema
                            )

                        [artist] => Array
                            (
                                [0] => Jo mateix
                            )

                        [album] => Array
                            (
                                [0] => Muahahahahah
                            )

                        [year] => Array
                            (
                                [0] => 2009
                            )

                        [comment] => Array
                            (
                                [0] => from www.underave.net
                            )

                        [genre] => Array
                            (
                                [0] => Techno
                            )

                    )

                [id3v2] => Array
                    (
                        [title] => Array
                            (
                                [0] => T&amp;#237;tol del tema
                            )

                        [artist] => Array
                            (
                                [0] => Jo mateix
                            )

                        [album] => Array
                            (
                                [0] => Muahahahahah
                            )

                        [year] => Array
                            (
                                [0] => 2009
                            )

                        [genre] => Array
                            (
                                [0] => Techno
                            )

                        [comments] => Array
                            (
                                [0] => from www.underave.net
                            )

                    )

            )

        [bitrate] => 128000
        [playtime_string] => 0:16
    )
