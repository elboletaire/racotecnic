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
excerpt: "Recientemente he creado un podcast para la página de Música Vermella
  con el inconveniente añadido de que se suben mp3 independientes para cada publicación.
  Para solucionarlo he utilizado la librería getid3 para unir los ficheros mp3 de
  cada publicación en un único fichero mp3."
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

> **Puedes ver la segunda parte aquí:** <a href="http://www.racotecnic.com/2011/02/crear-un-podcast-en-cakephp/">Crear un Podcast en CakePHP</a>

Para empezar necesitaréis descargar la librería <a href="http://getid3.org" target="_blank">Getid3</a>. Descargad la versión estable por si acaso ya que la versión beta falla con las etiquetas id3 (que no utilizaremos) así que si queréis utilizarla es bajo vuestra propia responsabilidad.<a id="more"></a><a id="more-1751"></a>

<a href="http://sourceforge.net/project/showfiles.php?group_id=55859&amp;package_id=50965" target="_blank">Getid3 versión 1.8.2 (estable)</a>

Descomprimid el contenido del fichero que descarguéis en Getid3 y ponedlo en la carpeta /app/vendors, de manera que quede así:

    /app/vendors/getid3/demos/
    /app/vendors/getid3/getid3/
    /app/vendors/getid3/helperapps/
    /app/vendors/getid3/demás ficheros
{: .no-line-numbers }

Ahora necesitaremos el método para unir los mp3. Lo podéis encontrar en la carpeta de demos de getid3. De todos modos os dejo aquí un pequeño componente que tengo yo para utilizar getid3:

~~~php
<?php
// /app/controllers/components/getid3.php
class Getid3Component extends Object
{
  public $errors = array();

  function __construct()
  {
    set_time_limit(20*3600);
    ignore_user_abort(false);
  }

  function error($text)
  {
    array_push($this->errors, $text);
  }

  function extract($filename)
  {

    App::import('vendor','getid3/getid3',array('file'=>'getid3.php'));
    // Initialize getID3 engine
    $getID3 = new getID3;
    $getID3->setOption(array('encoding' => Configure::read('App.encoding')));

    // Analyze file and store returned data in $ThisFileInfo
    $ThisFileInfo = $getID3->analyze($filename);

    return $ThisFileInfo;
  }

  function read($filename) { return $this->extract($filename); }

  function getId3Clean($filename)
  {
    $info = $this->read($filename);

    $id3 = array();
    foreach ($info['tags'] as $tag) {
      foreach ($tag as $key => $val) {
        if (empty($id3[$key])) {
          $id3[$key] = $val[0];
        }
        else {
          if (strlen($val[0]) > strlen($id3[$key])) {
            $id3[$key] = $val[0];
          }
        }
      }
    }
    return $id3;
  }

  function getCustomTags($filename)
  {
    $id3 = $this->getId3Clean($filename);
    $vars = array(
      'description' => 'content_group_description',
      'set'         => 'part_of_a_set'
    );
    foreach ($vars as $k => $v) {
      if (!empty($id3[$v])) {
        $id3[$k] = $id3[$v];
        unset($id3[$v]);
      }
    }
    return $id3;
  }

  function write($filename, $data)
  {
    App::import('vendor', 'getid3/getid3/getid3');

    // Initialize getID3 engine
    $getID3 = new getID3;
    $getID3->setOption(array('encoding' => Configure::read('App.encoding')));

    App::import('vendor','getid3/getid3', array('file' => 'write.php'));

    // Initialize getID3 tag-writing module
    $tagwriter = new getid3_writetags;

    //$tagwriter->filename       = '/path/to/file.mp3';
    $tagwriter->filename   = $filename;
    $tagwriter->tagformats = array('id3v1', 'id3v2.3');

    // set various options (optional)
    $tagwriter->overwrite_tags    = true;
    $tagwriter->tag_encoding      = Configure::read('App.encoding');
    $tagwriter->remove_other_tags = true;

    // populate data array
    $TagData['title'][]   = !empty($data['title'])?$data['title']:null;
    $TagData['artist'][]  = !empty($data['artist'])?$data['artist']:null;
    $TagData['album'][]   = !empty($data['album'])?$data['album']:null;;
    $TagData['year'][]    = !empty($data['year'])?$data['year']:null;;
    $TagData['genre'][]   = !empty($data['genre'])?$data['genre']:null;;
    $TagData['comment'][] = 'from www.underave.net';
    $TagData['track'][]   = !empty($data['track'])?$data['track']:null;;

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

  function joinMp3($file_out, $files_in)
  {
    foreach ($files_in as $nextinputfilename) {
      if (!is_readable($nextinputfilename)) {
        $this->error('Cannot read "' . $nextinputfilename . '"');
      }
    }
    if (!empty($this->errors)) return false;

    if (!is_writeable(dirname($file_out))) {
      $this->error('Cannot write "' . $file_out . '"');
      return false;
    }

    App::import('vendor', 'getid3/getid3', array('file' => 'getid3.php'));
    if ($fp_output = @fopen($file_out, 'wb')) {
      // Initialize getID3 engine
      $getID3 = new getID3;
      foreach ($files_in as $nextinputfilename) {
        $current_file_info = $getID3->analyze($nextinputfilename);
        if ($current_file_info['fileformat'] == 'mp3') {
          if ($fp_source = @fopen($nextinputfilename, 'rb')) {
            $current_output_position = ftell($fp_output);

            // copy audio data from first file
            fseek($fp_source, $current_file_info['avdataoffset'], SEEK_SET);
            while (!feof($fp_source) &amp;&amp; (ftell($fp_source) < $current_file_info['avdataend'])) {
              fwrite($fp_output, fread($fp_source, 32768));
            }

            fclose($fp_source);
            // trim post-audio data (if any) copied from first file that we don't need or want
            $end_offset = $current_output_position + ($current_file_info['avdataend'] - $current_file_info['avdataoffset']);
            fseek($fp_output, $end_offset, SEEK_SET);
            ftruncate($fp_output, $end_offset);
          } else {
            $this->error('failed to open ''.$nextinputfilename.'' for reading');
            fclose($fp_output);
            return false;
          }
        } else {
          $this->error('''.$nextinputfilename.'' is not MP3 format');
          fclose($fp_output);
          return false;
        }
      }
    } else {
      $this->error('failed to open ''.$file_out.'' for writing');
      return false;
    }
    fclose($fp_output);
    return true;
  }
}
~~~

Con este componente podéis tanto unir mp3 como leer y escribir etiquetas id3.

Evidentemente, antes de poder utilizar el componente debéis declararlo en el array de componentes de vuestro controlador:

~~~php?start_inline=1
class FooController extends AppController {
  $components = array('Getid3');
}
~~~

Para unir mp3 en un solo fichero no tenéis más que pasarle como primer parámetro la ruta del fichero de salida y como segundo parámetro pasarle un array con las ubicaciones de los ficheros mp3:

~~~php?start_inline=1
$destino = WWW_ROOT . 'files' . DS . 'podcasts' . DS . 'fichero_destino.mp3';
$mp3 = array(
  WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero1.mp3',
  WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero2.mp3',
  WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero3.mp3',
  WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero4.mp3',
  WWW_ROOT . 'files' . DS . 'mp3' . DS . 'fichero5.mp3'
);
if ($this->Getid3->joinMp3($destino, $mp3)) {
  // fichero creado correctamente
} else {
  pr($this->Getid3->errors);
}
~~~

Y con esto termina este sencillo tutorial sobre **cómo crear un podcast a partir de varios mp3**.

Como he dicho al inicio, pronto explicaré <a href="http://www.racotecnic.com/2011/02/crear-un-podcast-en-cakephp/">cómo crear el XML de dicho Podcast</a> para que podáis agregarlo a iTunes o cualquier otro <em>podcatcher</em>.
