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
<p>Si, como yo, estáis interesados en editar y leer las etiquetas ID3 de los ficheros mp3 que se suban a vuestro servidor, podéis hacerlo utilizando las <a title="ID3 en php.net" href="http://es.php.net/manual/en/book.id3.php" target="_blank">funciones propias de PHP para ello</a> (necesitáis que vuestro hosting lo tenga instalado) o bien, si os pasa igual que a mi que en mi hosting no tienen habilitadas estas funciones (y si no tienes un servidor dedicado no te las instalarán para no detener el servicio), podéis utilizar las classes de PHP <a title="Visitar página del proyecto GetID3" href="http://www.getid3.org" target="_blank">GetID3</a>.</p>
<p>Si no las conocíais os recomiendo que las descarguéis y hagáis alguna prueba con ellas, realmente se les puede sacar mucho jugo ya que con ella no solo podemos editar etiquetas ID3; esto son algunos de los muchos formatos cuya información podéis consultar y / o editar con este magnífico conjunto de clases:</p>
<p><a id="more"></a><a id="more-679"></a></p>
<blockquote><p><strong>getID3()</strong> is a PHP script that extracts useful information from MP3s &amp; other multimedia file formats:</p>
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
<p><strong>getID3() can write:</strong></p>
<ul>
<li><a href="http://en.wikipedia.org/wiki/ID3v1">ID3v1 (v1 &amp; v1.1)</a></li>
<li><a href="http://en.wikipedia.org/wiki/ID3v1">ID3v2 (v2.3, v2.4)</a></li>
<li><a href="http://en.wikipedia.org/wiki/APE_tag">APE (v2)</a></li>
<li><a href="http://en.wikipedia.org/wiki/Ogg">Ogg Vorbis comments</a></li>
<li><a href="http://en.wikipedia.org/wiki/Free_Lossless_Audio_Codec">FLAC comments</a></li>
</ul>
</blockquote>
<p>He eliminado unos cuantos formatos de la lista, si queréis verlos todos id a su página web.</p>
<p>¡Al grano! Ya conocemos las clases ID3 (aunque sea un poco por encima, como yo..) y queremos implementarlas en nuestra aplicación de Cake.</p>
<p>No es muy complicado si utilizamos las demos que nos dan en el zip que nos descargamos de getID3.org. Simplemente debemos tener en cuenta que los "require" que utilicen en las demos debemos substituirlas por <a href="http://api.cakephp.org/class/app#method-Appimport" rel="nofollow" target="_blank" title="Ver documentación del método">App::import('vendor','rutadelaclase')</a>.</p>
<p>Lo primero que deberemos hacer será descargar getID3. Si queréis editar etiquetas ID3v2 deberéis descargar la versión estable (actualmente la <a href="http://sourceforge.net/projects/getid3/files/getID3()%201.x/getid3-1.7.9.zip/download" target="_blank" rel="nofollow" title="Desargar">1.7.9</a>) ya que en la versión beta (actualmente la <a href="http://sourceforge.net/projects/getid3/files/getID3%28%29%20beta/getid3-2.0.0b5.zip/download" rel="nofollow" target="_blank" title="Descargar">2.0.0-b5</a>) no funcionan las clases necesarias.</p>
<p>Una vez descargado, lo descomprimimos y lo subimos a la carpeta vendors de nuestro proyecto Cake (para mayor comodidad renombrar la carpeta a "getid3"). Seguramente <a href="http://cakebaker.42dh.com/2006/08/11/why-are-there-two-vendors-folders-in-cakephp/" target="_blank" rel="nofollow" title="Why are there two vendors folders in CakePHP?">habréis visto que existen dos carpetas <em>vendor</em></a> en vuestra aplicación de Cake. Debéis ponerlo en la que se encuentra en la carpeta raíz (junto con las carpeta "app" y "cake").</p>
<p>Ahora que ya tenemos nuestro plugin en la aplicación debemos crear un componente que nos sirva de conexión entre las librerías getID3 y nuestro Cake.</p>
<p>Para hacerlo utilizaremos como referencia las demos "demo.basic.php" y "demo.simple.write.php". Recordad que hay que substituir los <em>require</em> e <em>includes</em> por App::import(). Este es el resultado que he obtenido yo:</p>
<p>[php]&lt;?php<br />
class Getid3Component extends Object<br />
{<br />
	function __construct()	{<br />
		set_time_limit(20*3600);<br />
		ignore_user_abort(false);<br />
	}</p>
<p>	function extract($filename)	{<br />
		// Importamos el fichero getid3.php que contiene la classe getID3<br />
		App::import('vendor','getid3/getid3',array('file'=&gt;'getid3.php'));<br />
		// Initialize getID3 engine<br />
		$getID3 = new getID3;</p>
<p>		// Analyze file and store returned data in $ThisFileInfo<br />
		$ThisFileInfo = $getID3-&gt;analyze($filename);<br />
		// Devolvemos un array con toda la información del fichero<br />
		return $ThisFileInfo;<br />
	}</p>
<p>	function write($filename, $data)<br />
	{<br />
		App::import('vendor','getid3/getid3/getid3');</p>
<p>		// Initialize getID3 engine<br />
		$getID3 = new getID3;<br />
		// Indicamos a getID3 que utilice la codificación de Cake<br />
		$getID3-&gt;setOption(array('encoding'=&gt;Configure::read('App.encoding')));</p>
<p>		App::import('vendor','getid3/getid3',array('file'=&gt;'write.php'));</p>
<p>		// Initialize getID3 tag-writing module<br />
		$tagwriter = new getid3_writetags;</p>
<p>		//$tagwriter-&gt;filename       = $filename;<br />
		$tagwriter-&gt;filename       = $filename;<br />
		$tagwriter-&gt;tagformats     = array('id3v1', 'id3v2.3');</p>
<p>		// set various options (optional)<br />
		$tagwriter-&gt;overwrite_tags = true;<br />
		$tagwriter-&gt;tag_encoding   = Configure::read('App.encoding');<br />
		$tagwriter-&gt;remove_other_tags = true;</p>
<p>		// populate data array<br />
		$TagData['title'][]   = $data['title'];<br />
		$TagData['artist'][]  = $data['artist'];<br />
		$TagData['album'][]   = $data['album'];<br />
		$TagData['year'][]    = $data['year'];<br />
		$TagData['genre'][]   = $data['genre'];<br />
		$TagData['comment'][] = $data['comment'];<br />
		$TagData['track'][]   = $data['track'];</p>
<p>		$tagwriter-&gt;tag_data = $TagData;</p>
<p>		// write tags<br />
		if ($tagwriter-&gt;WriteTags()) {<br />
			if (!empty($tagwriter-&gt;warnings)) {<br />
				return $tagwriter-&gt;warnings;<br />
			}<br />
			return true;<br />
		} else {<br />
			return $tagwriter-&gt;errors;<br />
		}<br />
	}<br />
}[/php]</p>
<p>Recordad que los componentes van en la carpeta <i>app/controllers/components</i> y que el nombre de este fichero deberá ser <i>getid3.php</i>.</p>
<p>Ahora que ya tenemos nuestro componente vayamos al controlador sobre el que queramos utilizarlo y añadamoslo al resto de componentes:</p>
<p>[php]&lt;?php<br />
class AudiosController extends AppController<br />
{<br />
	var $name = 'Audios';<br />
	var $components = array('Upload','Getid3');<br />
[/php]</p>
<p>Y sólo nos queda saber cómo utilizarlo:<br />
[php]$datos = array(<br />
				'album'=&gt;'Nombre del álbum',<br />
				'title'=&gt;&quot;Título del tema&quot;,<br />
				'artist'=&gt;&quot;Artista&quot;,<br />
				'year'=&gt;&quot;Año&quot;,<br />
				'genre'=&gt;'Estilo',<br />
				'comment'=&gt;&quot;Comentario&quot;);<br />
	$this-&gt;Getid2-&gt;write('rutadelfichero.mp3',$datos);<br />
[/php]</p>
<p>Y para leer los datos de un mp3:<br />
[php light="true"]<br />
$this-&gt;Getid2-&gt;extract('rutadelfichero.mp3')<br />
[/php]</p>
<p>Que nos dará una salida similar a <a href="http://www.racotecnic.com/2009/07/leer-y-editar-etiquetas-id3v1-y-id3v2-con-cakephp/#sortida">ésta</a>.</p>
<p>Habéis visto más o menos el método de implementar funciones de getID3 en CakePHP. Ahora es tarea vuestra intentar añadir más funcionalidades a vuestro complemento según vuestras necesidades.</p>
<p>Como siempre, espero que le sirva a alguien!</p>
<blockquote><p>
Páginas de referencia:</p>
<ul>
<li><a href="http://www.getid3.org" target="_blank" rel="nofollow">getID3.org</li>
<li><a href="http://api.cakephp.org" target="_blank" rel="nofollow">API de CakePHP</li>
<li><a href="http://www.devarticles.in/cakephp/getid3-component-for-cakephp/" target="_blank" rel="nofollow">GetID3 component for CakePHP</a></li>
</ul>
</blockquote>
<p><!--more--><br />
<a name="sortida"></a><br />
Salida de mi fichero de prueba mp3:<br />
[plain]Array<br />
(<br />
    [GETID3_VERSION] =&gt; 1.7.9-20090308<br />
    [filesize] =&gt; 263776<br />
    [avdataoffset] =&gt; 4096<br />
    [avdataend] =&gt; 263648<br />
    [fileformat] =&gt; mp3<br />
    [audio] =&gt; Array<br />
        (<br />
            [dataformat] =&gt; mp3<br />
            [channels] =&gt; 2<br />
            [sample_rate] =&gt; 44100<br />
            [bitrate] =&gt; 128000<br />
            [channelmode] =&gt; stereo<br />
            [bitrate_mode] =&gt; cbr<br />
            [lossless] =&gt;<br />
            [encoder_options] =&gt; CBR128<br />
            [compression_ratio] =&gt; 0.0907029478458<br />
            [streams] =&gt; Array<br />
                (<br />
                    [0] =&gt; Array<br />
                        (<br />
                            [dataformat] =&gt; mp3<br />
                            [channels] =&gt; 2<br />
                            [sample_rate] =&gt; 44100<br />
                            [bitrate] =&gt; 128000<br />
                            [channelmode] =&gt; stereo<br />
                            [bitrate_mode] =&gt; cbr<br />
                            [lossless] =&gt;<br />
                            [encoder_options] =&gt; CBR128<br />
                            [compression_ratio] =&gt; 0.0907029478458<br />
                        )</p>
<p>                )</p>
<p>        )</p>
<p>    [tags] =&gt; Array<br />
        (<br />
            [id3v1] =&gt; Array<br />
                (<br />
                    [title] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Títol del tema<br />
                        )</p>
<p>                    [artist] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Jo mateix<br />
                        )</p>
<p>                    [album] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Muahahahahah<br />
                        )</p>
<p>                    [year] =&gt; Array<br />
                        (<br />
                            [0] =&gt; 2009<br />
                        )</p>
<p>                    [comment] =&gt; Array<br />
                        (<br />
                            [0] =&gt; from www.underave.net<br />
                        )</p>
<p>                    [genre] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Techno<br />
                        )</p>
<p>                )</p>
<p>            [id3v2] =&gt; Array<br />
                (<br />
                    [title] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Títol del tema<br />
                        )</p>
<p>                    [artist] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Jo mateix<br />
                        )</p>
<p>                    [album] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Muahahahahah<br />
                        )</p>
<p>                    [year] =&gt; Array<br />
                        (<br />
                            [0] =&gt; 2009<br />
                        )</p>
<p>                    [genre] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Techno<br />
                        )</p>
<p>                    [comments] =&gt; Array<br />
                        (<br />
                            [0] =&gt; from www.underave.net<br />
                        )</p>
<p>                )</p>
<p>        )</p>
<p>    [encoding] =&gt; ISO-8859-1<br />
    [filename] =&gt; Bong0.mp3<br />
    [filepath] =&gt; /public_html/waste/v3.2/app/webroot/files/mp3<br />
    [filenamepath] =&gt; /public_html/waste/v3.2/app/webroot/files/mp3/Bong0.mp3<br />
    [id3v2] =&gt; Array<br />
        (<br />
            [header] =&gt; 1<br />
            [flags] =&gt; Array<br />
                (<br />
                    [unsynch] =&gt;<br />
                    [exthead] =&gt;<br />
                    [experim] =&gt;<br />
                )</p>
<p>            [majorversion] =&gt; 3<br />
            [minorversion] =&gt; 0<br />
            [headerlength] =&gt; 4096<br />
            [tag_offset_start] =&gt; 0<br />
            [tag_offset_end] =&gt; 4096<br />
            [encoding] =&gt; UTF-8<br />
            [comments] =&gt; Array<br />
                (<br />
                    [title] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Títol del tema<br />
                        )</p>
<p>                    [artist] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Jo mateix<br />
                        )</p>
<p>                    [album] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Muahahahahah<br />
                        )</p>
<p>                    [year] =&gt; Array<br />
                        (<br />
                            [0] =&gt; 2009<br />
                        )</p>
<p>                    [genre] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Techno<br />
                        )</p>
<p>                    [comments] =&gt; Array<br />
                        (<br />
                            [0] =&gt; from www.underave.net<br />
                        )</p>
<p>                )</p>
<p>            [TIT2] =&gt; Array<br />
                (<br />
                    [0] =&gt; Array<br />
                        (<br />
                            [frame_name] =&gt; TIT2<br />
                            [frame_flags_raw] =&gt; 0<br />
                            [data] =&gt; ��T���t�o�l� �d�e�l� �t�e�m�a�<br />
                            [datalength] =&gt; 31<br />
                            [dataoffset] =&gt; 10<br />
                            [framenamelong] =&gt; Title/songname/content description<br />
                            [framenameshort] =&gt; title<br />
                            [flags] =&gt; Array<br />
                                (<br />
                                    [TagAlterPreservation] =&gt;<br />
                                    [FileAlterPreservation] =&gt;<br />
                                    [ReadOnly] =&gt;<br />
                                    [compression] =&gt;<br />
                                    [Encryption] =&gt;<br />
                                    [GroupingIdentity] =&gt;<br />
                                )</p>
<p>                            [encodingid] =&gt; 1<br />
                            [encoding] =&gt; UTF-16<br />
                        )</p>
<p>                )</p>
<p>            [TPE1] =&gt; Array<br />
                (<br />
                    [0] =&gt; Array<br />
                        (<br />
                            [frame_name] =&gt; TPE1<br />
                            [frame_flags_raw] =&gt; 0<br />
                            [data] =&gt; ��J�o� �m�a�t�e�i�x�<br />
                            [datalength] =&gt; 21<br />
                            [dataoffset] =&gt; 51<br />
                            [framenamelong] =&gt; Lead performer(s)/Soloist(s)<br />
                            [framenameshort] =&gt; artist<br />
                            [flags] =&gt; Array<br />
                                (<br />
                                    [TagAlterPreservation] =&gt;<br />
                                    [FileAlterPreservation] =&gt;<br />
                                    [ReadOnly] =&gt;<br />
                                    [compression] =&gt;<br />
                                    [Encryption] =&gt;<br />
                                    [GroupingIdentity] =&gt;<br />
                                )</p>
<p>                            [encodingid] =&gt; 1<br />
                            [encoding] =&gt; UTF-16<br />
                        )</p>
<p>                )</p>
<p>            [TALB] =&gt; Array<br />
                (<br />
                    [0] =&gt; Array<br />
                        (<br />
                            [frame_name] =&gt; TALB<br />
                            [frame_flags_raw] =&gt; 0<br />
                            [data] =&gt; ��M�u�a�h�a�h�a�h�a�h�a�h�<br />
                            [datalength] =&gt; 27<br />
                            [dataoffset] =&gt; 82<br />
                            [framenamelong] =&gt; Album/Movie/Show title<br />
                            [framenameshort] =&gt; album<br />
                            [flags] =&gt; Array<br />
                                (<br />
                                    [TagAlterPreservation] =&gt;<br />
                                    [FileAlterPreservation] =&gt;<br />
                                    [ReadOnly] =&gt;<br />
                                    [compression] =&gt;<br />
                                    [Encryption] =&gt;<br />
                                    [GroupingIdentity] =&gt;<br />
                                )</p>
<p>                            [encodingid] =&gt; 1<br />
                            [encoding] =&gt; UTF-16<br />
                        )</p>
<p>                )</p>
<p>            [TYER] =&gt; Array<br />
                (<br />
                    [0] =&gt; Array<br />
                        (<br />
                            [frame_name] =&gt; TYER<br />
                            [frame_flags_raw] =&gt; 0<br />
                            [data] =&gt; ��2�0�0�9�<br />
                            [datalength] =&gt; 11<br />
                            [dataoffset] =&gt; 119<br />
                            [framenamelong] =&gt; Year<br />
                            [framenameshort] =&gt; year<br />
                            [flags] =&gt; Array<br />
                                (<br />
                                    [TagAlterPreservation] =&gt;<br />
                                    [FileAlterPreservation] =&gt;<br />
                                    [ReadOnly] =&gt;<br />
                                    [compression] =&gt;<br />
                                    [Encryption] =&gt;<br />
                                    [GroupingIdentity] =&gt;<br />
                                )</p>
<p>                            [encodingid] =&gt; 1<br />
                            [encoding] =&gt; UTF-16<br />
                        )</p>
<p>                )</p>
<p>            [TCON] =&gt; Array<br />
                (<br />
                    [0] =&gt; Array<br />
                        (<br />
                            [frame_name] =&gt; TCON<br />
                            [frame_flags_raw] =&gt; 0<br />
                            [data] =&gt; ��T�e�c�h�n�o�<br />
                            [datalength] =&gt; 15<br />
                            [dataoffset] =&gt; 140<br />
                            [framenamelong] =&gt; Content type<br />
                            [framenameshort] =&gt; genre<br />
                            [flags] =&gt; Array<br />
                                (<br />
                                    [TagAlterPreservation] =&gt;<br />
                                    [FileAlterPreservation] =&gt;<br />
                                    [ReadOnly] =&gt;<br />
                                    [compression] =&gt;<br />
                                    [Encryption] =&gt;<br />
                                    [GroupingIdentity] =&gt;<br />
                                )</p>
<p>                            [encodingid] =&gt; 1<br />
                            [encoding] =&gt; UTF-16<br />
                        )</p>
<p>                )</p>
<p>            [COMM] =&gt; Array<br />
                (<br />
                    [0] =&gt; Array<br />
                        (<br />
                            [frame_name] =&gt; COMM<br />
                            [frame_flags_raw] =&gt; 0<br />
                            [data] =&gt; ��f�r�o�m� �w�w�w�.�u�n�d�e�r�a�v�e�.�n�e�t�<br />
                            [datalength] =&gt; 50<br />
                            [dataoffset] =&gt; 165<br />
                            [framenamelong] =&gt; Comments<br />
                            [framenameshort] =&gt; comments<br />
                            [flags] =&gt; Array<br />
                                (<br />
                                    [TagAlterPreservation] =&gt;<br />
                                    [FileAlterPreservation] =&gt;<br />
                                    [ReadOnly] =&gt;<br />
                                    [compression] =&gt;<br />
                                    [Encryption] =&gt;<br />
                                    [GroupingIdentity] =&gt;<br />
                                )</p>
<p>                            [encodingid] =&gt; 1<br />
                            [encoding] =&gt; UTF-16<br />
                            [language] =&gt; eng<br />
                            [languagename] =&gt; English<br />
                            [description] =&gt;<br />
                        )</p>
<p>                )</p>
<p>            [TRCK] =&gt; Array<br />
                (<br />
                    [0] =&gt; Array<br />
                        (<br />
                            [frame_name] =&gt; TRCK<br />
                            [frame_flags_raw] =&gt; 0<br />
                            [data] =&gt;<br />
                            [datalength] =&gt; 1<br />
                            [dataoffset] =&gt; 225<br />
                            [framenamelong] =&gt; Track number/Position in set<br />
                            [framenameshort] =&gt; track_number<br />
                            [flags] =&gt; Array<br />
                                (<br />
                                    [TagAlterPreservation] =&gt;<br />
                                    [FileAlterPreservation] =&gt;<br />
                                    [ReadOnly] =&gt;<br />
                                    [compression] =&gt;<br />
                                    [Encryption] =&gt;<br />
                                    [GroupingIdentity] =&gt;<br />
                                )</p>
<p>                            [encodingid] =&gt; 1<br />
                            [encoding] =&gt; UTF-16<br />
                        )</p>
<p>                )</p>
<p>            [padding] =&gt; Array<br />
                (<br />
                    [start] =&gt; 236<br />
                    [length] =&gt; 3860<br />
                    [valid] =&gt; 1<br />
                )</p>
<p>        )</p>
<p>    [id3v1] =&gt; Array<br />
        (<br />
            [title] =&gt; Títol del tema<br />
            [artist] =&gt; Jo mateix<br />
            [album] =&gt; Muahahahahah<br />
            [year] =&gt; 2009<br />
            [comment] =&gt; from www.underave.net<br />
            [genre] =&gt; Techno<br />
            [comments] =&gt; Array<br />
                (<br />
                    [title] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Títol del tema<br />
                        )</p>
<p>                    [artist] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Jo mateix<br />
                        )</p>
<p>                    [album] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Muahahahahah<br />
                        )</p>
<p>                    [year] =&gt; Array<br />
                        (<br />
                            [0] =&gt; 2009<br />
                        )</p>
<p>                    [comment] =&gt; Array<br />
                        (<br />
                            [0] =&gt; from www.underave.net<br />
                        )</p>
<p>                    [genre] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Techno<br />
                        )</p>
<p>                )</p>
<p>            [padding_valid] =&gt; 1<br />
            [tag_offset_end] =&gt; 263776<br />
            [tag_offset_start] =&gt; 263648<br />
            [encoding] =&gt; ISO-8859-1<br />
        )</p>
<p>    [mime_type] =&gt; audio/mpeg<br />
    [mpeg] =&gt; Array<br />
        (<br />
            [audio] =&gt; Array<br />
                (<br />
                    [raw] =&gt; Array<br />
                        (<br />
                            [synch] =&gt; 4094<br />
                            [version] =&gt; 3<br />
                            [layer] =&gt; 1<br />
                            [protection] =&gt; 0<br />
                            [bitrate] =&gt; 9<br />
                            [sample_rate] =&gt; 0<br />
                            [padding] =&gt; 0<br />
                            [private] =&gt; 0<br />
                            [channelmode] =&gt; 0<br />
                            [modeextension] =&gt; 0<br />
                            [copyright] =&gt; 0<br />
                            [original] =&gt; 1<br />
                            [emphasis] =&gt; 0<br />
                        )</p>
<p>                    [version] =&gt; 1<br />
                    [layer] =&gt; 3<br />
                    [channelmode] =&gt; stereo<br />
                    [channels] =&gt; 2<br />
                    [sample_rate] =&gt; 44100<br />
                    [protection] =&gt; 1<br />
                    [private] =&gt;<br />
                    [modeextension] =&gt;<br />
                    [copyright] =&gt;<br />
                    [original] =&gt; 1<br />
                    [emphasis] =&gt; none<br />
                    [crc] =&gt; 54304<br />
                    [padding] =&gt;<br />
                    [bitrate] =&gt; 128000<br />
                    [framelength] =&gt; 417<br />
                    [bitrate_mode] =&gt; cbr<br />
                )</p>
<p>        )</p>
<p>    [playtime_seconds] =&gt; 16.222<br />
    [tags_html] =&gt; Array<br />
        (<br />
            [id3v1] =&gt; Array<br />
                (<br />
                    [title] =&gt; Array<br />
                        (<br />
                            [0] =&gt; T&amp;iacute;tol del tema<br />
                        )</p>
<p>                    [artist] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Jo mateix<br />
                        )</p>
<p>                    [album] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Muahahahahah<br />
                        )</p>
<p>                    [year] =&gt; Array<br />
                        (<br />
                            [0] =&gt; 2009<br />
                        )</p>
<p>                    [comment] =&gt; Array<br />
                        (<br />
                            [0] =&gt; from www.underave.net<br />
                        )</p>
<p>                    [genre] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Techno<br />
                        )</p>
<p>                )</p>
<p>            [id3v2] =&gt; Array<br />
                (<br />
                    [title] =&gt; Array<br />
                        (<br />
                            [0] =&gt; T&amp;#237;tol del tema<br />
                        )</p>
<p>                    [artist] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Jo mateix<br />
                        )</p>
<p>                    [album] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Muahahahahah<br />
                        )</p>
<p>                    [year] =&gt; Array<br />
                        (<br />
                            [0] =&gt; 2009<br />
                        )</p>
<p>                    [genre] =&gt; Array<br />
                        (<br />
                            [0] =&gt; Techno<br />
                        )</p>
<p>                    [comments] =&gt; Array<br />
                        (<br />
                            [0] =&gt; from www.underave.net<br />
                        )</p>
<p>                )</p>
<p>        )</p>
<p>    [bitrate] =&gt; 128000<br />
    [playtime_string] =&gt; 0:16<br />
)<br />
[/plain]</p>
