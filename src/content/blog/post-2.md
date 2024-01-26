---
title: 'Un diseño básico: semantica en el esquema'
description: 'Lorem ipsum dolor sit amet'
datePub: 'Jul 08 2022'
# thumbnail: '/blog-placeholder-3.jpg'
tags : ['css3','html5']
---

Ya tienes definidos los colores y estas ansioso por empezara ver contenido en tu página. Conoces varios elementos de HTML y sabes que puedes dividir la página en `<header>`, `<main>` y `<footer>` para organizarla mejor. Vas por buen camino, pero ¿y ahora que?

Quieres ver contenido rápido para poder pensar que tamaños usar, que separación poner, y que tamaños de letra, etc. Sin darte cuenta, has llenado la etiqueta `<header>` de etiquetas `<div>` con estilos en línea. 

## El problema de la "comodidad"

Siempre será más cómodo trabajar directamente con etiquetas `<div>` a la hora de esquematizar tu contenido, pero no siempre es correcto. El uso correcto de semantica es muy importante porque mejora la legibilidad de tu código, mejora la accesibilidad para usuarios de lectores de pantalla y mejora el <abbr title="search engine optimization">SEO</abbr>.

En el siguiente ejemplo, hay un montón de cosas mal, que probablemente no hagas, pero es importante para demostrar conceptos básicos de semantica y errores comunes.

```html
<body>
	<header >
		<div style="height: 16rem; background-image: url('/assets/banner.png')">
		</div>
		<div>
			<div>
				<img src="/assets/logo.png" style="width: 64px; height: 64px;"/>
			</div>
			<div style="margin-left: auto; display: flex; gap: .5rem;">
				<a href="#">inicio</a>
				<a href="#">el equipo</a>
				<a href="#">servicios</a>
				<a href="#">contacto</a>
			</div>
		</div>
	</header>
	<main>
		<h1>Empresa Generica!</h1>
		<p>lorem impsum lorem impsum...</p>
		<p>lorem impsum lorem impsum...</p>
		<p>lorem impsum lorem impsum...</p>

		<h2>Nuestro equipo</h2>
		<p>lorem impsum lorem impsum...</p>
		<p>lorem impsum lorem impsum...</p>
		<p>lorem impsum lorem impsum...</p>

		<h1>Nuestros productos!</h1>
		<div style="display: flex; gap: .5rem; flex-wrap: wrap;">
			<div style="width: 24rem; border: 1px solid black; padding: .5rem">
				<img src="/assets/producto-1.png"/>
				<h3>Producto #1</h3>
				<p>lorem impsum lorem impsum...</p>
			</div>
			<div style="width: 24rem; border: 1px solid black; padding: .5rem">
				<img src="/assets/producto-1.png"/>
				<h3>Producto #1</h3>
				<p>lorem impsum lorem impsum...</p>
				<!-- ... -->
			</div>
			<div style="width: 24rem; border: 1px solid black; padding: .5rem">
				<img src="/assets/producto-1.png"/>
				<h3>Producto #2</h3>
				<p>lorem impsum lorem impsum...</p>
				<!-- ... -->
			</div>
			<!-- ... -->
		</div>

		<h1>Nuestros socios!</h1>
		<div style="display: flex; gap: .5rem; flex-direction: column;">
			<div style="width: 24rem; border: 1px solid black; padding: .5rem">
				<h3>Socio #1</h3>
				<!-- ... -->
			</div>
			<div style="width: 24rem; border: 1px solid black; padding: .5rem">
				<h3>Socio #2</h3>
				<!-- ... -->
			</div>
			<!-- ... -->
		</div>
	</main>
	<footer>
		<!-- contenido del footer -->
	</footer>
</body>
```
Este post no va a explicar la semantica a detalle, solo puntos importantes a la hora de esquematizar. Hay un video muy bueno en youtube que explica estos conceptos a profundidad [aquí](https://youtu.be/3nYLTiY5skU?si=aVGP8y7Yrd601h6N).

Lo primero que habrás notado es que hay más de una etiqueta `<h1>`, en un documento, solo puede haber una etiqueta `<h1>`, pues es el titulo **debe englobar a todo el contenido de esta documento**. La lista de errores son los siguientes:

- etiquetas `<img>` sin declarar texto alternativo (`alt`).
- usar un `<h3>` seguido de un `<h1>` sin un `<h2>` de por medio.
- no usar `<nav>` para especificar un elemento de navegación.

Estos son los errores más comunes. Sin embargo, otros importantes son:

- no usar `<article>` para segmentar contenido auto-conclusivo que, en este caso, son cada producto que esta listando.
- no usar `<section>` para segmentar secciones con objetivos diferentes que, en este caso, serían la sección de productos con la sección de información.
- no usar `<aside>` para declarar información ajena al flujo del contenido principal, es decir, información suplementaria pero no indispensable ni importante, que, en este caso, sería la sección de socios.
- no usar `<ul>` (y `<li>`) para declarar listas de elmenetos que, en este caso, serían los enlaces. También, se podrían declarar los productos dentro de una "lista de productos" y terminar con algo como `<ul><li><article>...</article></li></ul>`, pero no es estrictamente necesario, ya que el article se declara a sí mismo como un bloque de información autoconcluyente.

Como mencioné antes, esta no es una guia profunda de semantica así que solo mencionaré lo crucial, si deseas saber más sobre que hacen cada uno de estos elementos, puedes consultar directamente a la [fuente](https://html.spec.whatwg.org/multipage/sections.html).

## Usar bien la semantica también es cómodo

```html
<body>
	<header>
		<section style="height: 16rem; background-image: url('/assets/banner.png')" aria-label="banner">
		</section>
		<nav>
			<picture>
				<img src="/assets/logo.png" alt="logo de la empresa 123" style="width: 64px; height: 64px;"/>
			</picture>
			<ul style="margin-left: auto; display: flex; gap: .5rem;">
				<li><a href="#">inicio</a></li>
				<li><a href="#">el equipo</a></li>
				<li><a href="#">servicios</a></li>
				<li><a href="#">contacto</a></li>
			</ul>
		</nav>
	</header>
	<main>
		<h1>Empresa Generica!</h1>

		<section>
			<h2>Sobre la empresa</h2>
			<p>lorem impsum lorem impsum...</p>
			<p>lorem impsum lorem impsum...</p>
			<p>lorem impsum lorem impsum...</p>
		</section>

		<section>
			<h2>Nuestro equipo</h2>
			<p>lorem impsum lorem impsum...</p>
			<p>lorem impsum lorem impsum...</p>
			<p>lorem impsum lorem impsum...</p>
		</section>

		<section>
			<h2>Nuestros productos!</h2>
			<ul style="display: flex; gap: .5rem; flex-wrap: wrap;">
				<li>
					<article style="width: 24rem; border: 1px solid black; padding: .5rem">
						<img src="/assets/producto-1.png"/>
						<h3>Producto #1</h3>
						<p>lorem impsum lorem impsum...</p>
					</article>
				</li>
				<li>
					<article style="width: 24rem; border: 1px solid black; padding: .5rem">
						<img src="/assets/producto-1.png"/>
						<h3>Producto #1</h3>
						<p>lorem impsum lorem impsum...</p>
						<!-- ... -->
				</article>
				</li>
				<li>
					<article style="width: 24rem; border: 1px solid black; padding: .5rem">
						<img src="/assets/producto-1.png"/>
						<h3>Producto #2</h3>
						<p>lorem impsum lorem impsum...</p>
						<!-- ... -->
					</article>
				</li>
				<!-- ... -->
			</ul>
		</section>

		<aside>
			<h2>Nuestros socios!</h2>
			<ul style="display: flex; gap: .5rem; flex-direction: column;">
				<li style="width: 24rem; border: 1px solid black; padding: .5rem">
					<h3>Socio #1</h3>
					<!-- ... -->
				</li>
				<li style="width: 24rem; border: 1px solid black; padding: .5rem">
					<h3>Socio #2</h3>
					<!-- ... -->
				</li>
				<!-- ... -->
			</ul>
		</aside>
	</main>
	<footer>
		<!-- contenido del footer -->
	</footer>
</body>
```

_Es indispensable usar_ `<section>`_?_ En los casos mostrados, no necesariamente, pero ayuda bastante a diferenciar los fragmentos del contenido según su función.

Es proable que te preguntes que es `aria-label` si lo leiste en la sección del banner. `aria-label` es un atributo de accesibilidad que ayuda a los lectores de pantalla a enteder la funcion de un elemento. Se usa mucho en botones con iconos que un lector de pantalla no puede entender. Imagina un botón con una flecha hacia la derecha en un, visualmente entendemos que es un botón de navegación, pero **una maquina lectora de pantalla** que asiste a un usuario con dificultades visuales no. Para saber más de aria, puedes ver este [enlace](https://www.w3.org/WAI/tutorials/).

Con este ejemplo, se puede apreciar mejor que hace cada elemento en la página y mejora enormemente la experiencia de desarollo porque vemos y entendemos lo que hacemos con mayor fácilidad. Ahora solo falta mover todo el CSS en línea a una etiqueta style (o a un archivo `.css` independiente).

## Usar clases

Si haz realizado este paso, seguro que te has topado con el obstaculo más poderoso que tiene un desarollador, el poner nombres. Que nombres le pondras a cada clase que usaras en este fragmento de código, que elementos llevaran una clase y cuales serán referenciados como parte del anterior, ¿y si lo dejo así? ¿acaso hay problema?.

Bien, refactorizar este código puede ser desafiante al inicio, pero es muy **necesario**, ya que no escala **nada bien** al agregar productos o socios.

Como siempre, no es necesario reinventar la rueda. Existe una metodología ampliamente usada y es [BEM](https://getbem.com). Hay similares como se explica en la misma página; sin embargo, BEM es la más sencilla de entender y aplicar.

### BEM, que es?

La filosofia de BEM plantea separar los elementos en pantalla por **B**loques, **E**lementos y **M**odificadores. Un bloque es un framgento de código auto contenido que es _casi_ independiente del resto de esquema. Un elemento es una pieza de un bloque, que no tiene significado ni funcion fuera de su bloque, y un modificador es aquel que permite la diferenciación de un bloque (o elemento) que se encuentre en algún estado especifico.

Miremos el siguiente ejemplo:

```html
<nav class="gen-nav">
	<img class="gen-nav_logo" src="/assets/logo.png" alt="logo de la empresa 123" style="width: 64px; height: 64px;"/>
	<ul class="gen-nav_list">
		<li><a class="gen-nav_link gen-nav_link-disabled" href="#"></a></li>
		<li><a class="gen-nav_link" href="#"></a></li>
		<li><a class="gen-nav_link gen-nav_link-active" href="#"></a></li>
		<li><a class="gen-nav_link" href="#"></a></li>
		<li><a class="gen-nav_link" href="#"></a></li>
	</ul>
</nav>
```

Claramente podemos determinar que hace cada clase y la diferencia entre un bloque y un elemento. Sin embargo, parece una aproximación muy verbosa, ¿no?

La respuesta de la mayoría de usuarios de BEM es, "puede ser, pero lo vale". Y tienen razón, nombrar clases es una de las barreras más odiosas que hay en el mundo del desarrollo, como lo es nombrar variables en la programación. No vale nombrar tus variables `x`,`y`,`z`,`w`,`h`, etc.

BEM ha ayudado a muchos principantes a entender los fundamentos de organización para poder crear sus propias formas de estructurar y organizar código. Es justo por eso que **no vamos a usar BEM**.

### Vanilla CSS es asombroso

Dese tiempos recientes, no sé cuando exactamente porque chatGPT no me quiso decir, css admite de forma nativa en múltiples navegadores el nesting. Es decir, podemos especificar selectores **dentro** de selectores padres, lo cual es asombroso.

Eso significa que podemos convertir lo que aprendimos en BEM y, con un código HTML así:

```html
<nav class="gen-nav">
	<img src="/assets/logo.png" alt="logo de la empresa 123" style="width: 64px; height: 64px;"/>
	<ul>
		<li><a class="disabled" href="#"></a></li>
		<li><a class="" href="#"></a></li>
		<li><a class="active" href="#"></a></li>
		<li><a class="" href="#"></a></li>
		<li><a class="" href="#"></a></li>
	</ul>
</nav>
```

Hacer un CSS así:

```css
nav.gen-nav {
	& {
		/*estilos del bloque */
	}
	& > img {
		/*estilos de la imagen */
	}
	& > ul {
		/*estilos de la lista */
	}
	& > ul > li > a {
		/*estilos de los enlaces */
	}
	& > ul > li > a.active {
		/*estilos de los enlaces activos*/
	}
	& > ul > li > a.disabled {
		/*estilos de los enlaces desactivados*/
	}
}
```

Esto permite convertir clases en namespaces, que permite agrupar y aislar estilos especificos. Sin embargo, se ve un poco feo y desordenado. Vamos a "mejorarlo".

```css
nav.gen-nav {
	& {
		/*estilos del bloque */
	}
	& > img {
		/*estilos de la imagen */
	}
	& > ul {
		/*estilos de la lista */
	}

	& > ul > li > a {
		& { 
			/*estilos de los enlaces */
		}
		&.active { /*estilos de los enlaces activos*/ }
		&.disabled { /*estilos de los enlaces desactivados*/ }
	}
}
```

Ahora hemos añadido más niveles de nesting que permiten agrupar los **M**odificadores dentro del elemento al cual _modifican_. Esto se ve bien, pero cuidado. El empezar a crear anidaciones en exeso se puede convertir en un caos, es por eso que se debe recordar BEM y solo anidar **E**lementos dentro de **B**loques cuando sea necesario. Si en caso se tuviese un **B**loque con muchos **E**lementos, es muy probable que ciertos **E**lementos en realidad sean **B**loques dentro de **B**loques, como la lista de enlaces `<ul>` dentro del `<nav>`. En este caso, háremos lo siguiente:

```css
nav.gen-nav {
	& {
		/*estilos del bloque */
	}
	& > img {
		/*estilos de la imagen */
	}

	& ul.nav_link_list {
		& {
			/*estilos de la lista */
		}
		& > li > a {
			& { 
				/*estilos de los enlaces */
			}
			&.active { /*estilos de los enlaces activos*/ }
			&.disabled { /*estilos de los enlaces desactivados*/ }
		}
	}
}
```

Así hemos reconocido que la lista de enlaces es **B**loque hijo del **B**loque de navegación. Además, al no especificar su relación como hijo directo (usando el selector `>`), podemos mover la lista dentro de otras etiquetas `<div>` si necesitamos añadir estilos especiales.

Esta aproximación usa las ideas fundamentales de BEM sin saturar el código HTML de clases con nombres largos. Sin embargo, este es un punto de vista subjetivo. Si tienes una idea diferente o eres un purista de BEM, puedes aventurarte a organizarte como desees, esto solo es una sugerencia y no estoy afirmando que sea objetivamente mejor.