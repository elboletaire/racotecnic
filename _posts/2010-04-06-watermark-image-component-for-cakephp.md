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
excerpt: "<blockquote>**Note: **This Component has been updated and you
  can find the changes here: <a title=\"Clase PHP para tratar imágenes (rotar, redimensionar,
  añadir marcas de agua..)\" href=\"http://www.racotecnic.com/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/\">/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/</a></blockquote>\r\nTime
  ago I created a **CakePHP component for applying watermarks to images**.
  Slowly I extended it and now in addition to applying watermarks is used to **rotate
  and resize images**.\r\n\r\nYou can still improve it a lot, especially in
  terms of code, but as it works and I have little time, I can barely make improvements.<img
  class=\"alignright\" title=\"all_together\" src=\"http://www.racotecnic.com/wp-content/uploads/2010/04/all_together.jpeg\"
  alt=\"\" width=\"171\" height=\"170\" />\r\n
## Tested from:\r\n
<ul>\r\n\t<li>Linux
  php 5.2.10</li>\r\n\t<li>Linux php 5.2.13</li>\r\n\t<li>Windows php 5.3.1</li>\r\n\t<li>Windows
  php 5.3.2</li>\r\n</ul>\r\n
## Well Known Bugs:\r\n
<ul>\r\n\t<li><del>Uses
  the method <a rel=\"nofollow\" href=\"http://php.net/manual/en/function.mime-content-type.php\"
  target=\"_blank\">mime_content_type</a> that as they say in php.net: <em>This function
  has been deprecated as the PECL extension <a rel=\"nofollow\" href=\"http://www.php.net/manual/en/ref.fileinfo.php\"
  target=\"_blank\">Fileinfo</a> provides the same functionality (and more) in a much
  cleaner way.</em></del> **[ SOLVED ]**</li>\r\n\t<li>By rotating a
  transparent PNG image at an angle that is not a multiple of 90º the extra generated
  background is not transparent.</li>\r\n</ul>\r\n
## Download:\r\n<a rel=\"nofollow\"
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
<blockquote>**Note: **This Component has been updated and you can find the changes here: <a title="Clase PHP para tratar imágenes (rotar, redimensionar, añadir marcas de agua..)" href="http://www.racotecnic.com/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/">/2011/04/clase-php-para-tratar-imagenes-rotar-redimensionar-anadir-marcas-de-agua/</a></blockquote>

Time ago I created a **CakePHP component for applying watermarks to images**. Slowly I extended it and now in addition to applying watermarks is used to **rotate and resize images**.

You can still improve it a lot, especially in terms of code, but as it works and I have little time, I can barely make improvements.<img class="alignright" title="all_together" src="http://www.racotecnic.com/wp-content/uploads/2010/04/all_together.jpeg" alt="" width="171" height="170" />

## Tested from:

<ul>
<li>Linux php 5.2.10</li>
<li>Linux php 5.2.13</li>
<li>Windows php 5.3.1</li>
<li>Windows php 5.3.2</li>
</ul>

## Well Known Bugs:

<ul>
<li><del>Uses the method <a rel="nofollow" href="http://php.net/manual/en/function.mime-content-type.php" target="_blank">mime_content_type</a> that as they say in php.net: <em>This function has been deprecated as the PECL extension <a rel="nofollow" href="http://www.php.net/manual/en/ref.fileinfo.php" target="_blank">Fileinfo</a> provides the same functionality (and more) in a much cleaner way.</em></del> **[ SOLVED ]**</li>
<li>By rotating a transparent PNG image at an angle that is not a multiple of 90º the extra generated background is not transparent.</li>
</ul>

## Download:

<a rel="nofollow" href="http://github.com/elboletaire/Watimage/archives/master" target="_blank">http://github.com/elboletaire/Watimage/archives/master</a>

<a id="more"></a><a id="more-1455"></a>

## Usage:

~~~php
<?php // /app/controllers/foo_controller.php
class FooController extends AppController
{
	var $name = 'Foo';
	// Remember to initialize the component
	var $components = array('Watermark');

	public function upload()
	{
		// ... upload stuff
		if ( $is_uploaded )
		{
			$this->Watermark->setImage($image_path);
			$this->Watermark->resize(array('type' => 'resizecrop', 'size' => array(450,450)));
			$this->Watermark->generate($dest_path);
			// ... more stuff ...
		}
	}
}
~~~

**Original files used for demonstrations:**
<img class="size-full wp-image-1464 aligncenter" title="imatge23" src="{{ site.url }}/uploads/2010/04/imatge23.jpg" alt="" width="425" height="500" />
<img class="alignnone size-full wp-image-1470" title="watermark" src="{{ site.url }}/uploads/2010/04/watermark.png" alt="" width="177" height="50" />

### Resize:

<img class="alignnone size-full wp-image-1461" title="resizecrop" src="{{ site.url }}/uploads/2010/04/resizecrop.jpeg" alt="" width="300" height="200" />

~~~php
$this->Watermark->setImage($image_path);
$this->Watermark->resize(array('type' => 'resizecrop'), 'size' => array('300', '200'));
$this->Watermark->generate($dest_path);
~~~
<h5>Resize types:</h5>

<ul>
<li>**resize**: Maintains the aspect ratio of the image and makes sure that it fits within the max width and max height (thus some side will be smaller).</li>
<li>**resizemin**: Maintains aspect ratio but resizes the image so that once one side meets its max width or max height condition, it stays at that size (thus one side will be larger).</li>
<li>**resizecrop**: Resize to max, then crop to center.</li>
<li>**crop**: A straight centered crop.</li>
</ul>

<em>* Resizing criteria extracted from <a rel="nofollow" href="http://labs.iamkoa.net/2007/10/23/image-upload-component-cakephp/" target="_blank">iamkoa labs image upload component</a></em>

### Rotate:

<img class="size-full wp-image-1466 aligncenter" title="rotate" src="{{ site.url }}/uploads/2010/04/rotate.jpeg" alt="" width="655" height="655" />

~~~php
$this->Watermark->setImage($image_path);
$this->Watermark->rotateImage(array('degrees' => 45));
$this->Watermark->generate($dest_path);
~~~

### Apply watermark:

<img class="alignnone size-full wp-image-1472" title="watermark" src="{{ site.url }}/uploads/2010/04/watermark.jpeg" alt="" width="425" height="500" />

~~~php
$this->Watermark->setImage($image_path);
$this->Watermark->setWatermark(array('file' => $watermark_file, 'position' => 'bottom right', 'size' => '150%'));
$this->Watermark->applyWatermark();
$this->Watermark->generate($dest_path);
~~~

### All together:

<img class="alignnone size-full wp-image-1473" title="all_together" src="{{ site.url }}/uploads/2010/04/all_together.jpeg" alt="" width="355" height="354" />

~~~php
$this->Watermark->setImage($image_path);
$this->Watermark->setWatermark(array('file' => 'watermark.png', 'position' => 'bottom right', 'size' => '150%'));
$this->Watermark->resize(array('type' => 'resizecrop', 'size' => array('300', '200')));
$this->Watermark->applyWatermark();
$this->Watermark->rotateImage(array('degrees' => 45, 'bgcolor' => 0));
$this->Watermark->generate($dest_path);

~~~

Changing order:

<img class="alignnone size-full wp-image-1475" title="all_together2" src="{{ site.url }}/uploads/2010/04/all_together2.jpeg" alt="" width="300" height="200" />

~~~php
$this->Watermark->setImage($image_path);
$this->Watermark->setWatermark(array('file' => 'watermark.png', 'position' => 'bottom right', 'size' => '150%'));
$this->Watermark->rotateImage(array('degrees' => 45, 'bgcolor' => 0));
$this->Watermark->resize(array('type' => 'resizecrop', 'size' => array('300', '200')));
$this->Watermark->applyWatermark();
$this->Watermark->generate($dest_path);
~~~

### Show image instead of saving it:

~~~php
$this->Watermark->setImage($image_path);
$this->Watermark->generate(); // Without params
~~~

### With errors:

~~~php
// every component method return false on error
if ( !$this->Watermark->setImage($image_path) )
{
	// whatever
	print_r($this->Watermark->errors);
}

if ( !$this->Watermark->resize(array('type' => 'resizecrop', 'size' => 250)) )
{
	// ...
}

if ( !$this->Watermark->generate() )
{
	// ...
}
~~~
