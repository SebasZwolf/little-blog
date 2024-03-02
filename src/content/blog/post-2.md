---
title: "Preparación básica: Semántica para entender TÚ código"
desc: "Recomendaciones generales del uso de semántica y sus beneficios para incrementar la legibilidad del código."
datePub: 2024-03-01T00:00:00-05:00

thumbnail:
 img :  '/post-2.thumbnail.webp'
 alt : 'comparación de un layouy confuso usando divs y uno descriptivo usando elementos semánticos'
tags:
  - html5
  - css3
related:
  - post-1
  - post-3
---

Ya tienes definidos los colores y estas ansioso por empezara ver contenido en tu página. Conoces varios elementos de HTML y sabes que puedes dividir la página en `<header>`, `<main>` y `<footer>` para organizarla mejor. Vas por buen camino, pero ¿y ahora que?

Quieres ver contenido rápido para poder pensar que tamaños usar, que separación poner, y que tamaños de letra, etc. Sin darte cuenta, has llenado la etiqueta `<header>` de etiquetas `<div>` con estilos en línea. 

## El problema de la "comodidad"

Siempre será más cómodo trabajar directamente con etiquetas `<div>` a la hora de esquematizar tu contenido, pero no siempre es correcto. El uso correcto de semántica es muy importante porque mejora la legibilidad de tu código, mejora la accesibilidad para usuarios de lectores de pantalla y mejora el <abbr title="search engine optimization">SEO</abbr>.

En el siguiente ejemplo, hay un montón de cosas mal, que probablemente no hagas, pero es importante para demostrar conceptos básicos de semántica y errores comunes.

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
Este post no va a explicar la semántica a detalle, solo puntos importantes a la hora de esquematizar. Hay un video muy bueno en youtube que explica estos conceptos a profundidad [aquí](https://youtu.be/3nYLTiY5skU?si=aVGP8y7Yrd601h6N).

Lo primero que habrás notado es que hay más de una etiqueta `<h1>`, en un documento, solo puede haber una etiqueta `<h1>`, pues es el titulo **debe englobar a todo el contenido de esta documento**. La lista de errores son los siguientes:

- etiquetas `<img>` sin declarar texto alternativo (`alt`).
- usar un `<h3>` seguido de un `<h1>` sin un `<h2>` de por medio.
- no usar `<nav>` para especificar un elemento de navegación.

Estos son los errores más comunes. Sin embargo, otros importantes son:

- no usar `<article>` para segmentar contenido auto-conclusivo que, en este caso, son cada producto que esta listando.
- no usar `<section>` para segmentar secciones con objetivos diferentes que, en este caso, serían la sección de productos con la sección de información.
- no usar `<aside>` para declarar información ajena al flujo del contenido principal, es decir, información suplementaria pero no indispensable ni importante, que, en este caso, sería la sección de socios.
- no usar `<ul>` (y `<li>`) para declarar listas de elmenetos que, en este caso, serían los enlaces. También, se podrían declarar los productos dentro de una "lista de productos" y terminar con algo como `<ul><li><article>...</article></li></ul>`, pero no es estrictamente necesario, ya que el article se declara a sí mismo como un bloque de información autoconcluyente.

Como mencioné antes, esta no es una guia profunda de semántica así que solo mencionaré lo crucial, si deseas saber más sobre que hacen cada uno de estos elementos, puedes consultar directamente a la [fuente](https://html.spec.whatwg.org/multipage/sections.html).

## Usar bien la semántica también es cómodo

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
		</section>

		<section>
			<h2>Nuestro equipo</h2>
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
				</article>
				</li>
				<li>
					<article style="width: 24rem; border: 1px solid black; padding: .5rem">
						<img src="/assets/producto-1.png"/>
						<h3>Producto #2</h3>
						<p>lorem impsum lorem impsum...</p>
					</article>
				</li>
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
