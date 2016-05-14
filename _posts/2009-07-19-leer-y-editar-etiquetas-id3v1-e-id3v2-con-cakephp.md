---
layout: post
status: publish
published: true
title: Leer y editar etiquetas ID3v1 e ID3v2 con CakePHP 1.2
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Si, como yo, estáis interesados en editar y leer las etiquetas ID3 de los
  ficheros mp3 que se suban a vuestro servidor, podéis hacerlo utilizando las <a title=\"ID3
  en php.net\" href=\"http://es.php.net/manual/en/book.id3.php\" target=\"_blank\">funciones
  propias de PHP para ello</a> (necesitáis que vuestro hosting lo tenga instalado)
  o bien, si os pasa igual que a mi que en mi hosting no tienen habilitadas estas
  funciones (y si no tienes un servidor dedicado no te las instalarán para no detener
  el servicio), podéis utilizar las classes de PHP <a title=\"Visitar página del proyecto
  GetID3\" href=\"http://www.getid3.org\" target=\"_blank\">GetID3</a>.\r\n\r\nSi
  no las conocíais os recomiendo que las descarguéis y hagáis alguna prueba con ellas,
  realmente se les puede sacar mucho jugo ya que con ella no solo podemos editar etiquetas
  ID3; esto son algunos de los muchos formatos cuya información podéis consultar y
  / o editar con este magnífico conjunto de clases:\r\n\r\n"
wordpress_id: 679
wordpress_url: http://racotecnic.underave.net/?p=679
date: '2009-07-19 20:24:15 +0200'
date_gmt: '2009-07-19 19:24:15 +0200'
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

Si, como yo, estáis interesados en editar y leer las etiquetas ID3 de los ficheros mp3 que se suban a vuestro servidor, podéis hacerlo utilizando las <a title="ID3 en php.net" href="http://es.php.net/manual/en/book.id3.php" target="_blank">funciones propias de PHP para ello</a> (necesitáis que vuestro hosting lo tenga instalado) o bien, si os pasa igual que a mi que en mi hosting no tienen habilitadas estas funciones (y si no tienes un servidor dedicado no te las instalarán para no detener el servicio), podéis utilizar las classes de PHP <a title="Visitar página del proyecto GetID3" href="http://www.getid3.org" target="_blank">GetID3</a>.

Si no las conocíais os recomiendo que las descarguéis y hagáis alguna prueba con ellas, realmente se les puede sacar mucho jugo ya que con ella no solo podemos editar etiquetas ID3; esto son algunos de los muchos formatos cuya información podéis consultar y / o editar con este magnífico conjunto de clases:

<a id="more"></a><a id="more-679"></a>
<blockquote>
<strong>getID3()</strong> is a PHP script that extracts useful information from MP3s &amp; other multimedia file formats:

<ul>
<li><strong>Tag formats:</strong>

<ul>
<li><a href="http://www.id3.org/id3v1.html">ID3v1</a> (v1.0 &amp; v1.1)</li>
<li><a href="http://www.id3.org/">ID3v2 (v2.2, v2.3 &amp; v2.4)</a></li>
<li><a href="http://www.personal.uni-jena.de/%7Epfk/mpp/sv8/apetag.html">APE tags (v1 &amp; v2)</a></li>
<li><a href="http://www.xiph.org/ogg/vorbis/doc/v-comment.html">(Ogg) VorbisComment</a></li>
<li>Lyrics3 (<a href="http://www.id3.org/lyrics3.html">v1</a> &amp; <a href="http://www.id3.org/lyrics3200.html">v2</a>)</li>
</ul>
</li>
<li><strong>Lossy Audio-only formats:</strong>

<ul>
<li><a href="http://www.mp3-tech.org/programmer/frame_header.html">MP3, MP2, MP1</a> (MPEG-1, layer III/II/I audio, including Fraunhofer, Xing and <a href="http://gabriel.mp3-tech.org/mp3infotag.html">LAME VBR/CBR headers</a>)</li>
<li><a href="http://www.xiph.org/">Ogg Vorbis</a></li>
<li><a href="http://www.audiocoding.com/wiki/index.php?page=AAC">AAC</a> &amp; MP4</li>
<li><a href="http://www.dolby.com/digital/">AC-3</a></li>
<li><a href="http://www.real.com/">RealAudio</a></li>
</ul>
</li>
<li><strong>Lossless Audio-only formats:</strong>

<ul>
<li><a href="http://en.wikipedia.org/wiki/Wav">WAV</a> (including extended chunks such as BWF and CART)</li>
<li><a href="http://en.wikipedia.org/wiki/Aiff">AIFF</a></li>
<li><a href="http://flac.sourceforge.net/">FLAC</a> &amp; OggFLAC</li>
<li><a href="http://www-ft.ee.tu-berlin.de/%7Eliebchen/lpac.html">LPAC (Lossless Predictive Audio Compressor)</a></li>
<li><a href="http://www.apple.com/itunes/import.html">Apple Lossless Audio Codec</a></li>
<li><a href="http://www.real.com/">RealAudio Lossless</a></li>
<li><a href="http://en.wikipedia.org/wiki/CD_Audio">CD-audio (*.cda)</a></li>
<li><a href="http://en.wikipedia.org/wiki/Midi#MIDI_file_formats">MIDI</a></li>
</ul>
</li>
<li><strong>Audio-Video formats:</strong>

<ul>
<li><a href="http://en.wikipedia.org/wiki/Audio_Video_Interleave">AVI</a></li>
<li><a href="http://www.matroska.org/">Matroska</a></li>
<li><a href="http://www.microsoft.com/windowsmedia/">ASF (ASF, Windows Media Audio (WMA), Windows Media Video (WMV))</a></li>
<li><a href="http://en.wikipedia.org/wiki/MPEG-1">MPEG-1</a> &amp; <a href="http://en.wikipedia.org/wiki/MPEG-2">MPEG-2</a></li>
<li><a href="http://www.apple.com/quicktime/">Quicktime</a></li>
<li><a href="http://www.real.com/">RealVideo</a></li>
</ul>
</li>
<li><strong>Graphic formats:</strong>

<ul>
<li><a href="http://en.wikipedia.org/wiki/JPEG">JPEG</a></li>
<li><a href="http://en.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></li>
<li><a href="http://en.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></li>
<li><a href="http://en.wikipedia.org/wiki/BMP_file_format">BMP (Windows &amp; OS/2)</a></li>
<li><a href="http://en.wikipedia.org/wiki/Tagged_Image_File_Format">TIFF</a></li>
<li><a href="http://www.openswf.org/">SWF (Flash)</a></li>
</ul>
</li>
<li><strong>Data formats:</strong>

<ul>
<li><a href="http://en.wikipedia.org/wiki/ZIP_%28file_format%29">ZIP</a></li>
<li><a href="http://en.wikipedia.org/wiki/Tar_%28file_format%29">TAR</a></li>
<li><a href="http://en.wikipedia.org/wiki/Gzip">GZIP</a></li>
<li><a href="http://en.wikipedia.org/wiki/ISO_image">ISO 9660 (CD-ROM image)</a></li>
</ul>
</li>
<li><strong>Metadata types:</strong>

<ul>
<li><a href="http://en.wikipedia.org/wiki/Exchangeable_image_file_format">EXIF (Exchangeable image file format)</a></li>
</ul>
</li>
</ul>

<strong>getID3() can write:</strong>

<ul>
<li><a href="http://en.wikipedia.org/wiki/ID3v1">ID3v1 (v1 &amp; v1.1)</a></li>
<li><a href="http://en.wikipedia.org/wiki/ID3v1">ID3v2 (v2.3, v2.4)</a></li>
<li><a href="http://en.wikipedia.org/wiki/APE_tag">APE (v2)</a></li>
<li><a href="http://en.wikipedia.org/wiki/Ogg">Ogg Vorbis comments</a></li>
<li><a href="http://en.wikipedia.org/wiki/Free_Lossless_Audio_Codec">FLAC comments</a></li>
</ul>
</blockquote>

He eliminado unos cuantos formatos de la lista, si queréis verlos todos id a su página web.

¡Al grano! Ya conocemos las clases ID3 (aunque sea un poco por encima, como yo..) y queremos implementarlas en nuestra aplicación de Cake.

No es muy complicado si utilizamos las demos que nos dan en el zip que nos descargamos de getID3.org. Simplemente debemos tener en cuenta que los "require" que utilicen en las demos debemos substituirlas por <a href="http://api.cakephp.org/class/app#method-Appimport" rel="nofollow" target="_blank" title="Ver documentación del método">App::import('vendor','rutadelaclase')</a>.

Lo primero que deberemos hacer será descargar getID3. Si queréis editar etiquetas ID3v2 deberéis descargar la versión estable (actualmente la <a href="http://sourceforge.net/projects/getid3/files/getID3()%201.x/getid3-1.7.9.zip/download" target="_blank" rel="nofollow" title="Desargar">1.7.9</a>) ya que en la versión beta (actualmente la <a href="http://sourceforge.net/projects/getid3/files/getID3%28%29%20beta/getid3-2.0.0b5.zip/download" rel="nofollow" target="_blank" title="Descargar">2.0.0-b5</a>) no funcionan las clases necesarias.

Una vez descargado, lo descomprimimos y lo subimos a la carpeta vendors de nuestro proyecto Cake (para mayor comodidad renombrar la carpeta a "getid3"). Seguramente <a href="http://cakebaker.42dh.com/2006/08/11/why-are-there-two-vendors-folders-in-cakephp/" target="_blank" rel="nofollow" title="Why are there two vendors folders in CakePHP?">habréis visto que existen dos carpetas <em>vendor</em></a> en vuestra aplicación de Cake. Debéis ponerlo en la que se encuentra en la carpeta raíz (junto con las carpeta "app" y "cake").

Ahora que ya tenemos nuestro plugin en la aplicación debemos crear un componente que nos sirva de conexión entre las librerías getID3 y nuestro Cake.

Para hacerlo utilizaremos como referencia las demos "demo.basic.php" y "demo.simple.write.php". Recordad que hay que substituir los <em>require</em> e <em>includes</em> por App::import(). Este es el resultado que he obtenido yo:

[php]<?php<br />
class Getid3Component extends Object<br />
{<br />
	function __construct()	{<br />
		set_time_limit(20*3600);<br />
		ignore_user_abort(false);<br />
	}

	function extract($filename)	{<br />
		// Importamos el fichero getid3.php que contiene la classe getID3<br />
		App::import('vendor','getid3/getid3',array('file'=>'getid3.php'));<br />
		// Initialize getID3 engine<br />
		$getID3 = new getID3;

		// Analyze file and store returned data in $ThisFileInfo<br />
		$ThisFileInfo = $getID3->analyze($filename);<br />
		// Devolvemos un array con toda la información del fichero<br />
		return $ThisFileInfo;<br />
	}

	function write($filename, $data)<br />
	{<br />
		App::import('vendor','getid3/getid3/getid3');

		// Initialize getID3 engine<br />
		$getID3 = new getID3;<br />
		// Indicamos a getID3 que utilice la codificación de Cake<br />
		$getID3->setOption(array('encoding'=>Configure::read('App.encoding')));

		App::import('vendor','getid3/getid3',array('file'=>'write.php'));

		// Initialize getID3 tag-writing module<br />
		$tagwriter = new getid3_writetags;

		//$tagwriter->filename       = $filename;<br />
		$tagwriter->filename       = $filename;<br />
		$tagwriter->tagformats     = array('id3v1', 'id3v2.3');

		// set various options (optional)<br />
		$tagwriter->overwrite_tags = true;<br />
		$tagwriter->tag_encoding   = Configure::read('App.encoding');<br />
		$tagwriter->remove_other_tags = true;

		// populate data array<br />
		$TagData['title'][]   = $data['title'];<br />
		$TagData['artist'][]  = $data['artist'];<br />
		$TagData['album'][]   = $data['album'];<br />
		$TagData['year'][]    = $data['year'];<br />
		$TagData['genre'][]   = $data['genre'];<br />
		$TagData['comment'][] = $data['comment'];<br />
		$TagData['track'][]   = $data['track'];

		$tagwriter->tag_data = $TagData;

		// write tags<br />
		if ($tagwriter->WriteTags()) {<br />
			if (!empty($tagwriter->warnings)) {<br />
				return $tagwriter->warnings;<br />
			}<br />
			return true;<br />
		} else {<br />
			return $tagwriter->errors;<br />
		}<br />
	}<br />
}[/php]

Recordad que los componentes van en la carpeta <i>app/controllers/components</i> y que el nombre de este fichero deberá ser <i>getid3.php</i>.

Ahora que ya tenemos nuestro componente vayamos al controlador sobre el que queramos utilizarlo y añadamoslo al resto de componentes:

[php]<?php<br />
class AudiosController extends AppController<br />
{<br />
	var $name = 'Audios';<br />
	var $components = array('Upload','Getid3');<br />
[/php]

Y sólo nos queda saber cómo utilizarlo:<br />
[php]$datos = array(<br />
				'album'=>'Nombre del álbum',<br />
				'title'=>'Título del tema',<br />
				'artist'=>'Artista',<br />
				'year'=>'Año',<br />
				'genre'=>'Estilo',<br />
				'comment'=>'Comentario');<br />
	$this->Getid2->write('rutadelfichero.mp3',$datos);<br />
[/php]

Y para leer los datos de un mp3:<br />
[php light="true"]<br />
$this->Getid2->extract('rutadelfichero.mp3')<br />
[/php]

Que nos dará una salida similar a <a href="http://www.racotecnic.com/2009/07/leer-y-editar-etiquetas-id3v1-y-id3v2-con-cakephp/#sortida">ésta</a>.

Habéis visto más o menos el método de implementar funciones de getID3 en CakePHP. Ahora es tarea vuestra intentar añadir más funcionalidades a vuestro complemento según vuestras necesidades.

Como siempre, espero que le sirva a alguien!
<blockquote>

Páginas de referencia:

<ul>
<li><a href="http://www.getid3.org" target="_blank" rel="nofollow">getID3.org</li>
<li><a href="http://api.cakephp.org" target="_blank" rel="nofollow">API de CakePHP</li>
<li><a href="http://www.devarticles.in/cakephp/getid3-component-for-cakephp/" target="_blank" rel="nofollow">GetID3 component for CakePHP</a></li>
</ul>
</blockquote>

<!--more--><br />
<a name="sortida"></a><br />
Salida de mi fichero de prueba mp3:<br />
[plain]Array<br />
(<br />
    [GETID3_VERSION] => 1.7.9-20090308<br />
    [filesize] => 263776<br />
    [avdataoffset] => 4096<br />
    [avdataend] => 263648<br />
    [fileformat] => mp3<br />
    [audio] => Array<br />
        (<br />
            [dataformat] => mp3<br />
            [channels] => 2<br />
            [sample_rate] => 44100<br />
            [bitrate] => 128000<br />
            [channelmode] => stereo<br />
            [bitrate_mode] => cbr<br />
            [lossless] =><br />
            [encoder_options] => CBR128<br />
            [compression_ratio] => 0.0907029478458<br />
            [streams] => Array<br />
                (<br />
                    [0] => Array<br />
                        (<br />
                            [dataformat] => mp3<br />
                            [channels] => 2<br />
                            [sample_rate] => 44100<br />
                            [bitrate] => 128000<br />
                            [channelmode] => stereo<br />
                            [bitrate_mode] => cbr<br />
                            [lossless] =><br />
                            [encoder_options] => CBR128<br />
                            [compression_ratio] => 0.0907029478458<br />
                        )

                )

        )

    [tags] => Array<br />
        (<br />
            [id3v1] => Array<br />
                (<br />
                    [title] => Array<br />
                        (<br />
                            [0] => Títol del tema<br />
                        )

                    [artist] => Array<br />
                        (<br />
                            [0] => Jo mateix<br />
                        )

                    [album] => Array<br />
                        (<br />
                            [0] => Muahahahahah<br />
                        )

                    [year] => Array<br />
                        (<br />
                            [0] => 2009<br />
                        )

                    [comment] => Array<br />
                        (<br />
                            [0] => from www.underave.net<br />
                        )

                    [genre] => Array<br />
                        (<br />
                            [0] => Techno<br />
                        )

                )

            [id3v2] => Array<br />
                (<br />
                    [title] => Array<br />
                        (<br />
                            [0] => Títol del tema<br />
                        )

                    [artist] => Array<br />
                        (<br />
                            [0] => Jo mateix<br />
                        )

                    [album] => Array<br />
                        (<br />
                            [0] => Muahahahahah<br />
                        )

                    [year] => Array<br />
                        (<br />
                            [0] => 2009<br />
                        )

                    [genre] => Array<br />
                        (<br />
                            [0] => Techno<br />
                        )

                    [comments] => Array<br />
                        (<br />
                            [0] => from www.underave.net<br />
                        )

                )

        )

    [encoding] => ISO-8859-1<br />
    [filename] => Bong0.mp3<br />
    [filepath] => /public_html/waste/v3.2/app/webroot/files/mp3<br />
    [filenamepath] => /public_html/waste/v3.2/app/webroot/files/mp3/Bong0.mp3<br />
    [id3v2] => Array<br />
        (<br />
            [header] => 1<br />
            [flags] => Array<br />
                (<br />
                    [unsynch] =><br />
                    [exthead] =><br />
                    [experim] =><br />
                )

            [majorversion] => 3<br />
            [minorversion] => 0<br />
            [headerlength] => 4096<br />
            [tag_offset_start] => 0<br />
            [tag_offset_end] => 4096<br />
            [encoding] => UTF-8<br />
            [comments] => Array<br />
                (<br />
                    [title] => Array<br />
                        (<br />
                            [0] => Títol del tema<br />
                        )

                    [artist] => Array<br />
                        (<br />
                            [0] => Jo mateix<br />
                        )

                    [album] => Array<br />
                        (<br />
                            [0] => Muahahahahah<br />
                        )

                    [year] => Array<br />
                        (<br />
                            [0] => 2009<br />
                        )

                    [genre] => Array<br />
                        (<br />
                            [0] => Techno<br />
                        )

                    [comments] => Array<br />
                        (<br />
                            [0] => from www.underave.net<br />
                        )

                )

            [TIT2] => Array<br />
                (<br />
                    [0] => Array<br />
                        (<br />
                            [frame_name] => TIT2<br />
                            [frame_flags_raw] => 0<br />
                            [data] => ��T���t�o�l� �d�e�l� �t�e�m�a�<br />
                            [datalength] => 31<br />
                            [dataoffset] => 10<br />
                            [framenamelong] => Title/songname/content description<br />
                            [framenameshort] => title<br />
                            [flags] => Array<br />
                                (<br />
                                    [TagAlterPreservation] =><br />
                                    [FileAlterPreservation] =><br />
                                    [ReadOnly] =><br />
                                    [compression] =><br />
                                    [Encryption] =><br />
                                    [GroupingIdentity] =><br />
                                )

                            [encodingid] => 1<br />
                            [encoding] => UTF-16<br />
                        )

                )

            [TPE1] => Array<br />
                (<br />
                    [0] => Array<br />
                        (<br />
                            [frame_name] => TPE1<br />
                            [frame_flags_raw] => 0<br />
                            [data] => ��J�o� �m�a�t�e�i�x�<br />
                            [datalength] => 21<br />
                            [dataoffset] => 51<br />
                            [framenamelong] => Lead performer(s)/Soloist(s)<br />
                            [framenameshort] => artist<br />
                            [flags] => Array<br />
                                (<br />
                                    [TagAlterPreservation] =><br />
                                    [FileAlterPreservation] =><br />
                                    [ReadOnly] =><br />
                                    [compression] =><br />
                                    [Encryption] =><br />
                                    [GroupingIdentity] =><br />
                                )

                            [encodingid] => 1<br />
                            [encoding] => UTF-16<br />
                        )

                )

            [TALB] => Array<br />
                (<br />
                    [0] => Array<br />
                        (<br />
                            [frame_name] => TALB<br />
                            [frame_flags_raw] => 0<br />
                            [data] => ��M�u�a�h�a�h�a�h�a�h�a�h�<br />
                            [datalength] => 27<br />
                            [dataoffset] => 82<br />
                            [framenamelong] => Album/Movie/Show title<br />
                            [framenameshort] => album<br />
                            [flags] => Array<br />
                                (<br />
                                    [TagAlterPreservation] =><br />
                                    [FileAlterPreservation] =><br />
                                    [ReadOnly] =><br />
                                    [compression] =><br />
                                    [Encryption] =><br />
                                    [GroupingIdentity] =><br />
                                )

                            [encodingid] => 1<br />
                            [encoding] => UTF-16<br />
                        )

                )

            [TYER] => Array<br />
                (<br />
                    [0] => Array<br />
                        (<br />
                            [frame_name] => TYER<br />
                            [frame_flags_raw] => 0<br />
                            [data] => ��2�0�0�9�<br />
                            [datalength] => 11<br />
                            [dataoffset] => 119<br />
                            [framenamelong] => Year<br />
                            [framenameshort] => year<br />
                            [flags] => Array<br />
                                (<br />
                                    [TagAlterPreservation] =><br />
                                    [FileAlterPreservation] =><br />
                                    [ReadOnly] =><br />
                                    [compression] =><br />
                                    [Encryption] =><br />
                                    [GroupingIdentity] =><br />
                                )

                            [encodingid] => 1<br />
                            [encoding] => UTF-16<br />
                        )

                )

            [TCON] => Array<br />
                (<br />
                    [0] => Array<br />
                        (<br />
                            [frame_name] => TCON<br />
                            [frame_flags_raw] => 0<br />
                            [data] => ��T�e�c�h�n�o�<br />
                            [datalength] => 15<br />
                            [dataoffset] => 140<br />
                            [framenamelong] => Content type<br />
                            [framenameshort] => genre<br />
                            [flags] => Array<br />
                                (<br />
                                    [TagAlterPreservation] =><br />
                                    [FileAlterPreservation] =><br />
                                    [ReadOnly] =><br />
                                    [compression] =><br />
                                    [Encryption] =><br />
                                    [GroupingIdentity] =><br />
                                )

                            [encodingid] => 1<br />
                            [encoding] => UTF-16<br />
                        )

                )

            [COMM] => Array<br />
                (<br />
                    [0] => Array<br />
                        (<br />
                            [frame_name] => COMM<br />
                            [frame_flags_raw] => 0<br />
                            [data] => ��f�r�o�m� �w�w�w�.�u�n�d�e�r�a�v�e�.�n�e�t�<br />
                            [datalength] => 50<br />
                            [dataoffset] => 165<br />
                            [framenamelong] => Comments<br />
                            [framenameshort] => comments<br />
                            [flags] => Array<br />
                                (<br />
                                    [TagAlterPreservation] =><br />
                                    [FileAlterPreservation] =><br />
                                    [ReadOnly] =><br />
                                    [compression] =><br />
                                    [Encryption] =><br />
                                    [GroupingIdentity] =><br />
                                )

                            [encodingid] => 1<br />
                            [encoding] => UTF-16<br />
                            [language] => eng<br />
                            [languagename] => English<br />
                            [description] =><br />
                        )

                )

            [TRCK] => Array<br />
                (<br />
                    [0] => Array<br />
                        (<br />
                            [frame_name] => TRCK<br />
                            [frame_flags_raw] => 0<br />
                            [data] =><br />
                            [datalength] => 1<br />
                            [dataoffset] => 225<br />
                            [framenamelong] => Track number/Position in set<br />
                            [framenameshort] => track_number<br />
                            [flags] => Array<br />
                                (<br />
                                    [TagAlterPreservation] =><br />
                                    [FileAlterPreservation] =><br />
                                    [ReadOnly] =><br />
                                    [compression] =><br />
                                    [Encryption] =><br />
                                    [GroupingIdentity] =><br />
                                )

                            [encodingid] => 1<br />
                            [encoding] => UTF-16<br />
                        )

                )

            [padding] => Array<br />
                (<br />
                    [start] => 236<br />
                    [length] => 3860<br />
                    [valid] => 1<br />
                )

        )

    [id3v1] => Array<br />
        (<br />
            [title] => Títol del tema<br />
            [artist] => Jo mateix<br />
            [album] => Muahahahahah<br />
            [year] => 2009<br />
            [comment] => from www.underave.net<br />
            [genre] => Techno<br />
            [comments] => Array<br />
                (<br />
                    [title] => Array<br />
                        (<br />
                            [0] => Títol del tema<br />
                        )

                    [artist] => Array<br />
                        (<br />
                            [0] => Jo mateix<br />
                        )

                    [album] => Array<br />
                        (<br />
                            [0] => Muahahahahah<br />
                        )

                    [year] => Array<br />
                        (<br />
                            [0] => 2009<br />
                        )

                    [comment] => Array<br />
                        (<br />
                            [0] => from www.underave.net<br />
                        )

                    [genre] => Array<br />
                        (<br />
                            [0] => Techno<br />
                        )

                )

            [padding_valid] => 1<br />
            [tag_offset_end] => 263776<br />
            [tag_offset_start] => 263648<br />
            [encoding] => ISO-8859-1<br />
        )

    [mime_type] => audio/mpeg<br />
    [mpeg] => Array<br />
        (<br />
            [audio] => Array<br />
                (<br />
                    [raw] => Array<br />
                        (<br />
                            [synch] => 4094<br />
                            [version] => 3<br />
                            [layer] => 1<br />
                            [protection] => 0<br />
                            [bitrate] => 9<br />
                            [sample_rate] => 0<br />
                            [padding] => 0<br />
                            [private] => 0<br />
                            [channelmode] => 0<br />
                            [modeextension] => 0<br />
                            [copyright] => 0<br />
                            [original] => 1<br />
                            [emphasis] => 0<br />
                        )

                    [version] => 1<br />
                    [layer] => 3<br />
                    [channelmode] => stereo<br />
                    [channels] => 2<br />
                    [sample_rate] => 44100<br />
                    [protection] => 1<br />
                    [private] =><br />
                    [modeextension] =><br />
                    [copyright] =><br />
                    [original] => 1<br />
                    [emphasis] => none<br />
                    [crc] => 54304<br />
                    [padding] =><br />
                    [bitrate] => 128000<br />
                    [framelength] => 417<br />
                    [bitrate_mode] => cbr<br />
                )

        )

    [playtime_seconds] => 16.222<br />
    [tags_html] => Array<br />
        (<br />
            [id3v1] => Array<br />
                (<br />
                    [title] => Array<br />
                        (<br />
                            [0] => T&amp;iacute;tol del tema<br />
                        )

                    [artist] => Array<br />
                        (<br />
                            [0] => Jo mateix<br />
                        )

                    [album] => Array<br />
                        (<br />
                            [0] => Muahahahahah<br />
                        )

                    [year] => Array<br />
                        (<br />
                            [0] => 2009<br />
                        )

                    [comment] => Array<br />
                        (<br />
                            [0] => from www.underave.net<br />
                        )

                    [genre] => Array<br />
                        (<br />
                            [0] => Techno<br />
                        )

                )

            [id3v2] => Array<br />
                (<br />
                    [title] => Array<br />
                        (<br />
                            [0] => T&amp;#237;tol del tema<br />
                        )

                    [artist] => Array<br />
                        (<br />
                            [0] => Jo mateix<br />
                        )

                    [album] => Array<br />
                        (<br />
                            [0] => Muahahahahah<br />
                        )

                    [year] => Array<br />
                        (<br />
                            [0] => 2009<br />
                        )

                    [genre] => Array<br />
                        (<br />
                            [0] => Techno<br />
                        )

                    [comments] => Array<br />
                        (<br />
                            [0] => from www.underave.net<br />
                        )

                )

        )

    [bitrate] => 128000<br />
    [playtime_string] => 0:16<br />
)<br />
[/plain]
