---
layout: post
status: publish
published: true
title: Unir ficheros mp3 en un único fichero mp3 con CakePHP
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Recientemente he creado un podcast para la página de <a href=\"http://www.musicavermella.com\"
  target=\"_blank\">Música Vermella</a> con el inconveniente añadido de que se suben
  mp3 independientes para cada publicación.\r\n\r\nPara solucionarlo he utilizado
  la librería getid3 para unir los ficheros mp3 de cada publicación en un único fichero
  mp3.\r\n\r\nPara verlo podéis agregar el <a href=\"http://musicavermella.com/releases.pod\">Podcast
  de Música Vermella</a> a vuestro cliente de Podcast (iTunes, Rythmbox, Banshee,
  Miro...).\r\n\r\nQuería hacer un tutorial sobre cómo crear un podcast con CakePHP
  pero lo dejaré para otro tutorial por tal de no complicar este.\r\n\r\n<blockquote><strong>Puedes
  ver la segunda parte aquí:</strong> <a href=\"http://www.racotecnic.com/2011/02/crear-un-podcast-en-cakephp/\">Crear
  un Podcast en CakePHP</a></blockquote>\r\n\r\nPara empezar necesitaréis descargar
  la librería <a href=\"http://getid3.org\" target=\"_blank\">Getid3</a>. Descargad
  la versión estable por si acaso ya que la versión beta falla con las etiquetas id3
  (que no utilizaremos) así que si queréis utilizarla es bajo vuestra propia responsabilidad."
wordpress_id: 1751
wordpress_url: http://www.racotecnic.com/?p=1751
date: '2011-01-16 23:16:34 +0100'
date_gmt: '2011-01-16 22:16:34 +0100'
categories:
- Programació
- Web
tags:
- CakePHP
- ID3
- getID3
- mp3
- CakePHP 1.1
- CakePHP 1.3
- CakePHP 1.2
---

Recientemente he creado un podcast para la página de <a href="http://www.musicavermella.com" target="_blank">Música Vermella</a> con el inconveniente añadido de que se suben mp3 independientes para cada publicación.

Para solucionarlo he utilizado la librería getid3 para unir los ficheros mp3 de cada publicación en un único fichero mp3.

Para verlo podéis agregar el <a href="http://musicavermella.com/releases.pod">Podcast de Música Vermella</a> a vuestro cliente de Podcast (iTunes, Rythmbox, Banshee, Miro...).

Quería hacer un tutorial sobre cómo crear un podcast con CakePHP pero lo dejaré para otro tutorial por tal de no complicar este.
<blockquote>
<strong>Puedes ver la segunda parte aquí:</strong> <a href="http://www.racotecnic.com/2011/02/crear-un-podcast-en-cakephp/">Crear un Podcast en CakePHP</a></blockquote>

Para empezar necesitaréis descargar la librería <a href="http://getid3.org" target="_blank">Getid3</a>. Descargad la versión estable por si acaso ya que la versión beta falla con las etiquetas id3 (que no utilizaremos) así que si queréis utilizarla es bajo vuestra propia responsabilidad.<a id="more"></a><a id="more-1751"></a>

<a href="http://sourceforge.net/project/showfiles.php?group_id=55859&amp;package_id=50965" target="_blank">Getid3 versión 1.8.2 (estable)</a>

Descomprimid el contenido del fichero que descarguéis en Getid3 y ponedlo en la carpeta /app/vendors, de manera que quede así:

/app/vendors/getid3/demos/
/app/vendors/getid3/getid3/
/app/vendors/getid3/helperapps/
/app/vendors/getid3/demás ficheros

Ahora necesitaremos el método para unir los mp3. Lo podéis encontrar en la carpeta de demos de getid3. De todos modos os dejo aquí un pequeño componente que tengo yo para utilizar getid3:

[php]<br />
<?php<br />
// /app/controllers/components/getid3.php<br />
class Getid3Component extends Object<br />
{<br />
	public $errors = array();

	function __construct()<br />
	{<br />
		set_time_limit(20*3600);<br />
		ignore_user_abort(false);<br />
	}

	function error($text)<br />
	{<br />
		array_push($this->errors, $text);<br />
	}

	function extract($filename)<br />
	{

		App::import('vendor','getid3/getid3',array('file'=>'getid3.php'));<br />
		// Initialize getID3 engine<br />
		$getID3 = new getID3;<br />
		$getID3->setOption(array('encoding' => Configure::read('App.encoding')));

		// Analyze file and store returned data in $ThisFileInfo<br />
		$ThisFileInfo = $getID3->analyze($filename);

		return $ThisFileInfo;<br />
	}

	function read($filename) { return $this->extract($filename); }

	function getId3Clean($filename)<br />
	{<br />
		$info = $this->read($filename);

		$id3 = array();<br />
		foreach ( $info['tags'] as $tag )<br />
		{<br />
			foreach ( $tag as $key => $val )<br />
			{<br />
				if ( empty($id3[$key]) )<br />
				{<br />
					$id3[$key] = $val[0];<br />
				}<br />
				else<br />
				{<br />
					if ( strlen($val[0]) > strlen($id3[$key]) )<br />
					{<br />
						$id3[$key] = $val[0];<br />
					}<br />
				}<br />
			}<br />
		}<br />
		return $id3;<br />
	}

	function getCustomTags($filename)<br />
	{<br />
		$id3 = $this->getId3Clean($filename);<br />
		$vars = array(<br />
			'description'	=> 'content_group_description',<br />
			'set'			=> 'part_of_a_set'<br />
		);<br />
		foreach ( $vars as $k => $v )<br />
		{<br />
			if ( !empty($id3[$v]) )<br />
			{<br />
				$id3[$k] = $id3[$v];<br />
				unset($id3[$v]);<br />
			}<br />
		}<br />
		return $id3;<br />
	}

	function write($filename, $data)<br />
	{<br />
		App::import('vendor','getid3/getid3/getid3');

		// Initialize getID3 engine<br />
		$getID3 = new getID3;<br />
		$getID3->setOption(array('encoding'=>Configure::read('App.encoding')));

		App::import('vendor','getid3/getid3',array('file'=>'write.php'));

		// Initialize getID3 tag-writing module<br />
		$tagwriter = new getid3_writetags;

		//$tagwriter->filename       = '/path/to/file.mp3';<br />
		$tagwriter->filename       = $filename;<br />
		$tagwriter->tagformats     = array('id3v1', 'id3v2.3');

		// set various options (optional)<br />
		$tagwriter->overwrite_tags = true;<br />
		$tagwriter->tag_encoding   = Configure::read('App.encoding');<br />
		$tagwriter->remove_other_tags = true;

		// populate data array<br />
		$TagData['title'][]   = !empty($data['title'])?$data['title']:null;<br />
		$TagData['artist'][]  = !empty($data['artist'])?$data['artist']:null;<br />
		$TagData['album'][]   = !empty($data['album'])?$data['album']:null;;<br />
		$TagData['year'][]    = !empty($data['year'])?$data['year']:null;;<br />
		$TagData['genre'][]   = !empty($data['genre'])?$data['genre']:null;;<br />
		$TagData['comment'][] = 'from www.underave.net';<br />
		$TagData['track'][]   = !empty($data['track'])?$data['track']:null;;

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
	}

	function joinMp3($file_out, $files_in)<br />
	{<br />
		foreach ( $files_in as $nextinputfilename ) {<br />
			if ( !is_readable($nextinputfilename) ) {<br />
				$this->error('Cannot read '' . $nextinputfilename . ''');<br />
			}<br />
		}<br />
		if ( !empty($this->errors) ) return false;

		if ( !is_writeable(dirname($file_out)) ) {<br />
			$this->error('Cannot write '' . $file_out . ''');<br />
			return false;<br />
		}

		App::import('vendor','getid3/getid3',array('file'=>'getid3.php'));<br />
		if ( $fp_output = @fopen($file_out, 'wb') ) {<br />
			// Initialize getID3 engine<br />
			$getID3 = new getID3;<br />
			foreach ($files_in as $nextinputfilename) {

				$current_file_info = $getID3->analyze($nextinputfilename);<br />
				if ($current_file_info['fileformat'] == 'mp3') {

					if ($fp_source = @fopen($nextinputfilename, 'rb')) {

						$current_output_position = ftell($fp_output);

						// copy audio data from first file<br />
						fseek($fp_source, $current_file_info['avdataoffset'], SEEK_SET);<br />
						while ( !feof($fp_source) &amp;&amp; (ftell($fp_source) < $current_file_info['avdataend']) ) {<br />
							fwrite($fp_output, fread($fp_source, 32768));<br />
						}

						fclose($fp_source);<br />
						// trim post-audio data (if any) copied from first file that we don't need or want<br />
						$end_offset = $current_output_position + ($current_file_info['avdataend'] - $current_file_info['avdataoffset']);<br />
						fseek($fp_output, $end_offset, SEEK_SET);<br />
						ftruncate($fp_output, $end_offset);<br />
					} else {<br />
						$this->error('failed to open ''.$nextinputfilename.'' for reading');<br />
						fclose($fp_output);<br />
						return false;

					}<br />
				} else {<br />
					$this->error('''.$nextinputfilename.'' is not MP3 format');<br />
					fclose($fp_output);<br />
					return false;<br />
				}<br />
			}<br />
		} else {<br />
			$this->error('failed to open ''.$file_out.'' for writing');<br />
			return false;<br />
		}<br />
		fclose($fp_output);<br />
		return true;<br />
	}<br />
}<br />
[/php]

Con este componente podéis tanto unir mp3 como leer y escribir etiquetas id3.

Evidentemente, antes de poder utilizar el componente debéis declararlo en el array de componentes de vuestro controlador:

[php]<br />
class FooController extends AppController {<br />
	$components = array('Getid3');<br />
}[/php]

Para unir mp3 en un solo fichero no tenéis más que pasarle como primer parámetro la ruta del fichero de salida y como segundo parámetro pasarle un array con las ubicaciones de los ficheros mp3:

[php]<br />
$destino = WWW_ROOT . 'files' . DS . 'podcasts' . DS . 'fichero_destino.mp3';<br />
$mp3 = array(<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero1.mp3',<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero2.mp3',<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero3.mp3',<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero4.mp3',<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero5.mp3'<br />
);<br />
if ( $this->Getid3->joinMp3($destino, $mp3) )<br />
{<br />
	// fichero creado correctamente<br />
}<br />
else<br />
{<br />
	pr($this->Getid3->errors);<br />
}<br />
[/php]

Y con esto termina este sencillo tutorial sobre <strong>cómo crear un podcast a partir de varios mp3</strong>.

Como he dicho al inicio, pronto explicaré <a href="http://www.racotecnic.com/2011/02/crear-un-podcast-en-cakephp/">cómo crear el XML de dicho Podcast</a> para que podáis agregarlo a iTunes o cualquier otro <em>podcatcher</em>.
