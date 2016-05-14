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
<p>Recientemente he creado un podcast para la página de <a href="http://www.musicavermella.com" target="_blank">Música Vermella</a> con el inconveniente añadido de que se suben mp3 independientes para cada publicación.</p>
<p>Para solucionarlo he utilizado la librería getid3 para unir los ficheros mp3 de cada publicación en un único fichero mp3.</p>
<p>Para verlo podéis agregar el <a href="http://musicavermella.com/releases.pod">Podcast de Música Vermella</a> a vuestro cliente de Podcast (iTunes, Rythmbox, Banshee, Miro...).</p>
<p>Quería hacer un tutorial sobre cómo crear un podcast con CakePHP pero lo dejaré para otro tutorial por tal de no complicar este.</p>
<blockquote><p><strong>Puedes ver la segunda parte aquí:</strong> <a href="http://www.racotecnic.com/2011/02/crear-un-podcast-en-cakephp/">Crear un Podcast en CakePHP</a></p></blockquote>
<p>Para empezar necesitaréis descargar la librería <a href="http://getid3.org" target="_blank">Getid3</a>. Descargad la versión estable por si acaso ya que la versión beta falla con las etiquetas id3 (que no utilizaremos) así que si queréis utilizarla es bajo vuestra propia responsabilidad.<a id="more"></a><a id="more-1751"></a></p>
<p><a href="http://sourceforge.net/project/showfiles.php?group_id=55859&amp;package_id=50965" target="_blank">Getid3 versión 1.8.2 (estable)</a></p>
<p>Descomprimid el contenido del fichero que descarguéis en Getid3 y ponedlo en la carpeta /app/vendors, de manera que quede así:</p>
<pre>/app/vendors/getid3/demos/
/app/vendors/getid3/getid3/
/app/vendors/getid3/helperapps/
/app/vendors/getid3/demás ficheros</pre>
<p>Ahora necesitaremos el método para unir los mp3. Lo podéis encontrar en la carpeta de demos de getid3. De todos modos os dejo aquí un pequeño componente que tengo yo para utilizar getid3:</p>
<p>[php]<br />
&lt;?php<br />
// /app/controllers/components/getid3.php<br />
class Getid3Component extends Object<br />
{<br />
	public $errors = array();</p>
<p>	function __construct()<br />
	{<br />
		set_time_limit(20*3600);<br />
		ignore_user_abort(false);<br />
	}</p>
<p>	function error($text)<br />
	{<br />
		array_push($this-&gt;errors, $text);<br />
	}</p>
<p>	function extract($filename)<br />
	{</p>
<p>		App::import('vendor','getid3/getid3',array('file'=&gt;'getid3.php'));<br />
		// Initialize getID3 engine<br />
		$getID3 = new getID3;<br />
		$getID3-&gt;setOption(array('encoding' =&gt; Configure::read('App.encoding')));</p>
<p>		// Analyze file and store returned data in $ThisFileInfo<br />
		$ThisFileInfo = $getID3-&gt;analyze($filename);</p>
<p>		return $ThisFileInfo;<br />
	}</p>
<p>	function read($filename) { return $this-&gt;extract($filename); }</p>
<p>	function getId3Clean($filename)<br />
	{<br />
		$info = $this-&gt;read($filename);</p>
<p>		$id3 = array();<br />
		foreach ( $info['tags'] as $tag )<br />
		{<br />
			foreach ( $tag as $key =&gt; $val )<br />
			{<br />
				if ( empty($id3[$key]) )<br />
				{<br />
					$id3[$key] = $val[0];<br />
				}<br />
				else<br />
				{<br />
					if ( strlen($val[0]) &gt; strlen($id3[$key]) )<br />
					{<br />
						$id3[$key] = $val[0];<br />
					}<br />
				}<br />
			}<br />
		}<br />
		return $id3;<br />
	}</p>
<p>	function getCustomTags($filename)<br />
	{<br />
		$id3 = $this-&gt;getId3Clean($filename);<br />
		$vars = array(<br />
			'description'	=&gt; 'content_group_description',<br />
			'set'			=&gt; 'part_of_a_set'<br />
		);<br />
		foreach ( $vars as $k =&gt; $v )<br />
		{<br />
			if ( !empty($id3[$v]) )<br />
			{<br />
				$id3[$k] = $id3[$v];<br />
				unset($id3[$v]);<br />
			}<br />
		}<br />
		return $id3;<br />
	}</p>
<p>	function write($filename, $data)<br />
	{<br />
		App::import('vendor','getid3/getid3/getid3');</p>
<p>		// Initialize getID3 engine<br />
		$getID3 = new getID3;<br />
		$getID3-&gt;setOption(array('encoding'=&gt;Configure::read('App.encoding')));</p>
<p>		App::import('vendor','getid3/getid3',array('file'=&gt;'write.php'));</p>
<p>		// Initialize getID3 tag-writing module<br />
		$tagwriter = new getid3_writetags;</p>
<p>		//$tagwriter-&gt;filename       = '/path/to/file.mp3';<br />
		$tagwriter-&gt;filename       = $filename;<br />
		$tagwriter-&gt;tagformats     = array('id3v1', 'id3v2.3');</p>
<p>		// set various options (optional)<br />
		$tagwriter-&gt;overwrite_tags = true;<br />
		$tagwriter-&gt;tag_encoding   = Configure::read('App.encoding');<br />
		$tagwriter-&gt;remove_other_tags = true;</p>
<p>		// populate data array<br />
		$TagData['title'][]   = !empty($data['title'])?$data['title']:null;<br />
		$TagData['artist'][]  = !empty($data['artist'])?$data['artist']:null;<br />
		$TagData['album'][]   = !empty($data['album'])?$data['album']:null;;<br />
		$TagData['year'][]    = !empty($data['year'])?$data['year']:null;;<br />
		$TagData['genre'][]   = !empty($data['genre'])?$data['genre']:null;;<br />
		$TagData['comment'][] = 'from www.underave.net';<br />
		$TagData['track'][]   = !empty($data['track'])?$data['track']:null;;</p>
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
	}</p>
<p>	function joinMp3($file_out, $files_in)<br />
	{<br />
		foreach ( $files_in as $nextinputfilename ) {<br />
			if ( !is_readable($nextinputfilename) ) {<br />
				$this-&gt;error('Cannot read &quot;' . $nextinputfilename . '&quot;');<br />
			}<br />
		}<br />
		if ( !empty($this-&gt;errors) ) return false;</p>
<p>		if ( !is_writeable(dirname($file_out)) ) {<br />
			$this-&gt;error('Cannot write &quot;' . $file_out . '&quot;');<br />
			return false;<br />
		}</p>
<p>		App::import('vendor','getid3/getid3',array('file'=&gt;'getid3.php'));<br />
		if ( $fp_output = @fopen($file_out, 'wb') ) {<br />
			// Initialize getID3 engine<br />
			$getID3 = new getID3;<br />
			foreach ($files_in as $nextinputfilename) {</p>
<p>				$current_file_info = $getID3-&gt;analyze($nextinputfilename);<br />
				if ($current_file_info['fileformat'] == 'mp3') {</p>
<p>					if ($fp_source = @fopen($nextinputfilename, 'rb')) {</p>
<p>						$current_output_position = ftell($fp_output);</p>
<p>						// copy audio data from first file<br />
						fseek($fp_source, $current_file_info['avdataoffset'], SEEK_SET);<br />
						while ( !feof($fp_source) &amp;&amp; (ftell($fp_source) &lt; $current_file_info['avdataend']) ) {<br />
							fwrite($fp_output, fread($fp_source, 32768));<br />
						}</p>
<p>						fclose($fp_source);<br />
						// trim post-audio data (if any) copied from first file that we don't need or want<br />
						$end_offset = $current_output_position + ($current_file_info['avdataend'] - $current_file_info['avdataoffset']);<br />
						fseek($fp_output, $end_offset, SEEK_SET);<br />
						ftruncate($fp_output, $end_offset);<br />
					} else {<br />
						$this-&gt;error('failed to open &quot;'.$nextinputfilename.'&quot; for reading');<br />
						fclose($fp_output);<br />
						return false;</p>
<p>					}<br />
				} else {<br />
					$this-&gt;error('&quot;'.$nextinputfilename.'&quot; is not MP3 format');<br />
					fclose($fp_output);<br />
					return false;<br />
				}<br />
			}<br />
		} else {<br />
			$this-&gt;error('failed to open &quot;'.$file_out.'&quot; for writing');<br />
			return false;<br />
		}<br />
		fclose($fp_output);<br />
		return true;<br />
	}<br />
}<br />
[/php]</p>
<p>Con este componente podéis tanto unir mp3 como leer y escribir etiquetas id3.</p>
<p>Evidentemente, antes de poder utilizar el componente debéis declararlo en el array de componentes de vuestro controlador:</p>
<p>[php]<br />
class FooController extends AppController {<br />
	$components = array('Getid3');<br />
}[/php]</p>
<p>Para unir mp3 en un solo fichero no tenéis más que pasarle como primer parámetro la ruta del fichero de salida y como segundo parámetro pasarle un array con las ubicaciones de los ficheros mp3:</p>
<p>[php]<br />
$destino = WWW_ROOT . 'files' . DS . 'podcasts' . DS . 'fichero_destino.mp3';<br />
$mp3 = array(<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero1.mp3',<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero2.mp3',<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero3.mp3',<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero4.mp3',<br />
	WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero5.mp3'<br />
);<br />
if ( $this-&gt;Getid3-&gt;joinMp3($destino, $mp3) )<br />
{<br />
	// fichero creado correctamente<br />
}<br />
else<br />
{<br />
	pr($this-&gt;Getid3-&gt;errors);<br />
}<br />
[/php]</p>
<p>Y con esto termina este sencillo tutorial sobre <strong>cómo crear un podcast a partir de varios mp3</strong>.</p>
<p>Como he dicho al inicio, pronto explicaré <a href="http://www.racotecnic.com/2011/02/crear-un-podcast-en-cakephp/">cómo crear el XML de dicho Podcast</a> para que podáis agregarlo a iTunes o cualquier otro <em>podcatcher</em>.</p>
