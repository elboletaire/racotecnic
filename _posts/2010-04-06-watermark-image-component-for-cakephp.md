---
layout: post
status: publish
published: true
title: Watermark & Image Component for CakePHP
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "<blockquote><strong>Note: </strong>This Component has been updated and you
  can find the changes here: <a title=\"Clase PHP para tratar imágenes (rotar, redimensionar,
  añadir marcas de agua..)\" href=\"http://www.racotecnic.com/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/\">/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/</a></blockquote>\r\nTime
  ago I created a <strong>CakePHP component for applying watermarks to images</strong>.
  Slowly I extended it and now in addition to applying watermarks is used to <strong>rotate
  and resize images</strong>.\r\n\r\nYou can still improve it a lot, especially in
  terms of code, but as it works and I have little time, I can barely make improvements.<img
  class=\"alignright\" title=\"all_together\" src=\"http://www.racotecnic.com/wp-content/uploads/2010/04/all_together.jpeg\"
  alt=\"\" width=\"171\" height=\"170\" />\r\n<h3>Tested from:</h3>\r\n
<ul>\r\n\t<li>Linux
  php 5.2.10</li>\r\n\t<li>Linux php 5.2.13</li>\r\n\t<li>Windows php 5.3.1</li>\r\n\t<li>Windows
  php 5.3.2</li>\r\n</ul>\r\n<h3>Well Known Bugs:</h3>\r\n
<ul>\r\n\t<li><del>Uses
  the method <a rel=\"nofollow\" href=\"http://php.net/manual/en/function.mime-content-type.php\"
  target=\"_blank\">mime_content_type</a> that as they say in php.net: <em>This function
  has been deprecated as the PECL extension <a rel=\"nofollow\" href=\"http://www.php.net/manual/en/ref.fileinfo.php\"
  target=\"_blank\">Fileinfo</a> provides the same functionality (and more) in a much
  cleaner way.</em></del> <strong>[ SOLVED ]</strong></li>\r\n\t<li>By rotating a
  transparent PNG image at an angle that is not a multiple of 90º the extra generated
  background is not transparent.</li>\r\n</ul>\r\n<h3>Download:</h3>\r\n<a rel=\"nofollow\"
  href=\"http://github.com/elboletaire/Watimage/archives/master\" target=\"_blank\">http://github.com/elboletaire/Watimage/archives/master</a>\r\n\r\n"
wordpress_id: 1455
wordpress_url: http://racotecnic.underave.net/?p=1455
date: '2010-04-06 08:53:33 +0200'
date_gmt: '2010-04-06 07:53:33 +0200'
categories:
- Programació
- Web
tags:
- PHP
- CakePHP
- Codi
- Component
- marca d'aigua
---
<blockquote><strong>Note: </strong>This Component has been updated and you can find the changes here: <a title="Clase PHP para tratar imágenes (rotar, redimensionar, añadir marcas de agua..)" href="http://www.racotecnic.com/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/">/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/</a></blockquote>

Time ago I created a <strong>CakePHP component for applying watermarks to images</strong>. Slowly I extended it and now in addition to applying watermarks is used to <strong>rotate and resize images</strong>.

You can still improve it a lot, especially in terms of code, but as it works and I have little time, I can barely make improvements.<img class="alignright" title="all_together" src="http://www.racotecnic.com/wp-content/uploads/2010/04/all_together.jpeg" alt="" width="171" height="170" />
<h3>Tested from:</h3>

<ul>
<li>Linux php 5.2.10</li>
<li>Linux php 5.2.13</li>
<li>Windows php 5.3.1</li>
<li>Windows php 5.3.2</li>
</ul>
<h3>Well Known Bugs:</h3>

<ul>
<li><del>Uses the method <a rel="nofollow" href="http://php.net/manual/en/function.mime-content-type.php" target="_blank">mime_content_type</a> that as they say in php.net: <em>This function has been deprecated as the PECL extension <a rel="nofollow" href="http://www.php.net/manual/en/ref.fileinfo.php" target="_blank">Fileinfo</a> provides the same functionality (and more) in a much cleaner way.</em></del> <strong>[ SOLVED ]</strong></li>
<li>By rotating a transparent PNG image at an angle that is not a multiple of 90º the extra generated background is not transparent.</li>
</ul>
<h3>Download:</h3>

<a rel="nofollow" href="http://github.com/elboletaire/Watimage/archives/master" target="_blank">http://github.com/elboletaire/Watimage/archives/master</a>

<a id="more"></a><a id="more-1455"></a>
<h3>Usage:</h3>

[php]<?php // /app/controllers/foo_controller.php<br />
class FooController extends AppController<br />
{<br />
	var $name = 'Foo';<br />
	// Remember to initialize the component<br />
	var $components = array('Watermark');

	public function upload()<br />
	{<br />
		// ... upload stuff<br />
		if ( $is_uploaded )<br />
		{<br />
			$this->Watermark->setImage($image_path);<br />
			$this->Watermark->resize(array('type' => 'resizecrop', 'size' => array(450,450)));<br />
			$this->Watermark->generate($dest_path);<br />
			// ... more stuff ...<br />
		}<br />
	}<br />
}[/php]

<strong>Original files used for demonstrations:</strong><br />
<img class="size-full wp-image-1464 aligncenter" title="imatge23" src="http://racotecnic.com/wp-content/uploads/2010/04/imatge23.jpg" alt="" width="425" height="500" /><br />
<img class="alignnone size-full wp-image-1470" title="watermark" src="http://racotecnic.com/wp-content/uploads/2010/04/watermark.png" alt="" width="177" height="50" />
<h4>Resize:</h4>

<img class="alignnone size-full wp-image-1461" title="resizecrop" src="http://racotecnic.com/wp-content/uploads/2010/04/resizecrop.jpeg" alt="" width="300" height="200" />

[php]$this->Watermark->setImage($image_path);<br />
$this->Watermark->resize(array('type' => 'resizecrop'), 'size' => array('300', '200'));<br />
$this->Watermark->generate($dest_path);[/php]
<h5>Resize types:</h5>

<ul>
<li><strong>resize</strong>: Maintains the aspect ratio of the image and makes sure that it fits within the max width and max height (thus some side will be smaller).</li>
<li><strong>resizemin</strong>: Maintains aspect ratio but resizes the image so that once one side meets its max width or max height condition, it stays at that size (thus one side will be larger).</li>
<li><strong>resizecrop</strong>: Resize to max, then crop to center.</li>
<li><strong>crop</strong>: A straight centered crop.</li>
</ul>

<em>* Resizing criteria extracted from <a rel="nofollow" href="http://labs.iamkoa.net/2007/10/23/image-upload-component-cakephp/" target="_blank">iamkoa labs image upload component</a></em>
<h4>Rotate:</h4>

<img class="size-full wp-image-1466 aligncenter" title="rotate" src="http://racotecnic.com/wp-content/uploads/2010/04/rotate.jpeg" alt="" width="655" height="655" />

[php]$this->Watermark->setImage($image_path);<br />
$this->Watermark->rotateImage(array('degrees' => 45));<br />
$this->Watermark->generate($dest_path);[/php]
<h4>Apply watermark:</h4>

<img class="alignnone size-full wp-image-1472" title="watermark" src="http://racotecnic.com/wp-content/uploads/2010/04/watermark.jpeg" alt="" width="425" height="500" />

[php]$this->Watermark->setImage($image_path);<br />
$this->Watermark->setWatermark(array('file' => $watermark_file, 'position' => 'bottom right', 'size' => '150%'));<br />
$this->Watermark->applyWatermark();<br />
$this->Watermark->generate($dest_path);[/php]
<h4>All together:</h4>

<img class="alignnone size-full wp-image-1473" title="all_together" src="http://racotecnic.com/wp-content/uploads/2010/04/all_together.jpeg" alt="" width="355" height="354" />

[php]$this->Watermark->setImage($image_path);<br />
$this->Watermark->setWatermark(array('file' => 'watermark.png', 'position' => 'bottom right', 'size' => '150%'));<br />
$this->Watermark->resize(array('type' => 'resizecrop', 'size' => array('300', '200')));<br />
$this->Watermark->applyWatermark();<br />
$this->Watermark->rotateImage(array('degrees' => 45, 'bgcolor' => 0));<br />
$this->Watermark->generate($dest_path);<br />
[/php]

Changing order:

<img class="alignnone size-full wp-image-1475" title="all_together2" src="http://racotecnic.com/wp-content/uploads/2010/04/all_together2.jpeg" alt="" width="300" height="200" />

[php]$this->Watermark->setImage($image_path);<br />
$this->Watermark->setWatermark(array('file' => 'watermark.png', 'position' => 'bottom right', 'size' => '150%'));<br />
$this->Watermark->rotateImage(array('degrees' => 45, 'bgcolor' => 0));<br />
$this->Watermark->resize(array('type' => 'resizecrop', 'size' => array('300', '200')));<br />
$this->Watermark->applyWatermark();<br />
$this->Watermark->generate($dest_path);[/php]
<h4>Show image instead of saving it:</h4>

[php]$this->Watermark->setImage($image_path);<br />
$this->Watermark->generate(); // Without params[/php]
<h4>With errors:</h4>

[php]// every component method return false on error<br />
if ( !$this->Watermark->setImage($image_path) )<br />
{<br />
	// whatever<br />
	print_r($this->Watermark->errors);<br />
}

if ( !$this->Watermark->resize(array('type' => 'resizecrop', 'size' => 250)) )<br />
{<br />
	// ...<br />
}

if ( !$this->Watermark->generate() )<br />
{<br />
	// ...<br />
}[/php]
