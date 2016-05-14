---
layout: post
status: publish
published: true
title: Validar datos duplicados en CakePHP
author:
  display_name: Booletaire
  login: elboletaire
  email: elboletaire@gmail.com
  url: http://www.underave.net
author_login: elboletaire
author_email: elboletaire@gmail.com
author_url: http://www.underave.net
excerpt: "Hoy mismo he necesitado de una validación para verificar si un dato ya existe
  en la base de datos. Dado que CakePHP 1.1 (en versiones posteriores a la 1.2 podéis
  utilizar \"isUnique\") no lleva una validación en su núcleo para estos menesteres
  he tenido que crearla y ahora la comparto con vosotros:\r\n\r\n[php]/**\r\n * Verifica
  si un campo existe en la base de datos\r\n * Si estamos editando se excluye el valor
  guardado en la validación\r\n * @param array $data\r\n * @param string $field Nom
  de la cel·la a verificar\r\n * @return\r\n */\r\n\r\npublic function checkUnique($data)\r\n{\r\n\t$field
  = array_pop(array_keys($data));\r\n\t$data = array_pop(array_values($data));\r\n\r\n\t//
  Si estem editant...\r\n\tif(isset($this-&gt;data[$this-&gt;name]['id']))\r\n\t{\r\n\t\tif
  ($field == $this-&gt;field($field, array($this-&gt;name . '.id' =&gt; $this-&gt;data[$this-&gt;name]['id'])))\r\n\t\t{\r\n\t\t\treturn
  true;\r\n\t\t}\r\n\t}\r\n\t// Si no estem editant...\r\n\tif($this-&gt;hasField($field))
  {\r\n\t\treturn $this-&gt;isUnique(array($field =&gt; $data));\r\n\t}\r\n}[/php]\r\n\r\n"
wordpress_id: 1406
wordpress_url: http://racotecnic.underave.net/?p=1406
date: '2010-02-25 21:28:51 +0100'
date_gmt: '2010-02-25 20:28:51 +0100'
categories:
- Programació
- Web
tags:
- PHP
- CakePHP
- Snippet
- Codi
- CakePHP 1.1
---
<p>Hoy mismo he necesitado de una validación para verificar si un dato ya existe en la base de datos. Dado que CakePHP 1.1 (en versiones posteriores a la 1.2 podéis utilizar "isUnique") no lleva una validación en su núcleo para estos menesteres he tenido que crearla y ahora la comparto con vosotros:</p>
<p>[php]/**<br />
 * Verifica si un campo existe en la base de datos<br />
 * Si estamos editando se excluye el valor guardado en la validación<br />
 * @param array $data<br />
 * @param string $field Nom de la cel·la a verificar<br />
 * @return<br />
 */</p>
<p>public function checkUnique($data)<br />
{<br />
	$field = array_pop(array_keys($data));<br />
	$data = array_pop(array_values($data));</p>
<p>	// Si estem editant...<br />
	if(isset($this-&gt;data[$this-&gt;name]['id']))<br />
	{<br />
		if ($field == $this-&gt;field($field, array($this-&gt;name . '.id' =&gt; $this-&gt;data[$this-&gt;name]['id'])))<br />
		{<br />
			return true;<br />
		}<br />
	}<br />
	// Si no estem editant...<br />
	if($this-&gt;hasField($field)) {<br />
		return $this-&gt;isUnique(array($field =&gt; $data));<br />
	}<br />
}[/php]</p>
<p><a id="more"></a><a id="more-1406"></a></pre>
<p>Para utilizarlo no tenéis más que añadir el trozo de código en el modelo deseado (normalmente en AppModel, para poder utilizarlo desde cualquier modelo) y añadir la validación en el modelo que queráis:</p>
<p>[php]var $validate = array('NOMBRE DE LA CELDA A VALIDAR' =&gt; array(<br />
	'rule'		=&gt; 'checkUnique',<br />
	'message' 	=&gt; 'Blahblahblah'));[/php]</p>
<p>Un ejemplo muy común:</p>
<p>[php]var $validate = array('username' =&gt; array(<br />
	'rule'		=&gt; 'checkUnique',<br />
	'message' 	=&gt; 'Ya existe un usuario registrado con este nombre!'));[/php]</p>
<p>Que lo disfrutéis :)</p>
<p><strong>Edición:</strong> Se me olvidó comentar que, a diferencia del método de validación <em>checkUnique</em> que se utiliza en el post <a href="http://www.racotecnic.com/2010/01/integrando-cakephp-y-phpbb-3-x/">Inegrando CakePHP y PhpBB 3.x</a>, este método sirve también a la hora de editar un ítem ya que, en ese caso, retorna <code>true</code> si el valor de la celda coincide con el ya guardado en la base de datos.</p>
