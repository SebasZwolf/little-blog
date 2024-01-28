---
title: "Preparación básica: BEM y Selectores CSS"
desc: "Aplicar de forma inteligente los fundamentos de BEM en una propuesta para la gestión de clases CSS aprovechando el nesting y selectores especificos."
thumbnail:
 img :  '/post-3.thumbnail.webp'
 alt : 'Ejemplo de análisis BEM a un articulo-carta de usuario mostrando Bloques, Elementos y Modificadores'
datePub: '2022-07-08T05:00:00.000Z'
tags:
  - css3
  - html5
related:
  - post-1
  - post-2
---

Cual es el peor enemigo del programador junior (y no junior), estructuras de datos complejas, la syntaxis de un nuevo lenguaje, la comunidad de stackoverflow, el estado actual de React, Java? No. El peor obstáculo es el nombrar cosas. Nombrar variables es un desafío en sí mismo. Podemos, como siempre, nombrar nuestras variables como x, y, z, w, h y entender sobre el contexto (y hacernos la vida imposible después), pero hacer eso en CSS y crear nombres de clases aleatorias no declarativas es el equivalente alocar memoria en `c++` con `new`. Simplemente es una mala práctica y se puede evitar fácilmente.

## pódemos aplicar BEM

Como siempre, no es necesario reinventar la rueda. Existe una metodología ampliamente usada y es [BEM](https://getbem.com). Hay similares como se explica en la misma página; sin embargo, BEM es la más sencilla de explicar y aplicar.

La filosofia de BEM plantea separar los elementos en pantalla por **B**loques, **E**lementos y **M**odificadores. Un **B**loque es un framgento de código auto contenido que es _casi_ independiente del resto de esquema. Un **E**lemento es una pieza de un bloque, que no tiene significado ni funcion fuera de su bloque, y un **M**odificador es aquel que le atribuye a un bloque (o elemento) algún comportamiento o estado especifico (principalmente thematicas de colores como: `danger` o `warning` en [Boostrap](https://getbootstrap.com/docs/5.3/customize/color/#colors)).

Miremos el siguiente ejemplo:

```html
<nav class="gen-nav">
	<img class="gen-nav_logo" src="/assets/logo.png" alt="logo de la empresa 123" style="width: 64px; height: 64px;"/>
	<ul class="gen-nav_list">
		<li><a class="gen-nav_link gen-nav_link--disabled" href="#"></a></li>
		<li><a class="gen-nav_link" href="#"></a></li>
		<li><a class="gen-nav_link gen-nav_link--active" href="#"></a></li>
		<li><a class="gen-nav_link" href="#"></a></li>
		<li><a class="gen-nav_link" href="#"></a></li>
	</ul>
</nav>
```

Claramente podemos determinar que hace cada clase y como:

- `.gen-nav` es un **B**loque.
- `.gen-nav_list`, `.gen-nav_logo` y `.gen-nav_link` son **E**lementos
- `.gen-nav_link-active` y `.gen-nav_link--disabled` son **M**odificadores del elemento `.gen-nav_lin`

Aunque declarativa y comprensible, resulta muy verbosa. Para muchos usuarios, es adecuado mientras permita entender claramente cual es la fúncion del código.

BEM ha ayudado a muchos principantes a entender los fundamentos de organización para poder crear sus propias formas de estructurar y organizar código. Es justo por eso que **no vamos a usar BEM**.

## Vanilla CSS es asombroso

Dese tiempos recientes, no sé cuando exactamente porque chatGPT no me quiso decir, css admite de forma nativa en múltiples navegadores el nesting. Es decir, podemos especificar selectores **dentro** de selectores padres, lo cual es asombroso.

Eso significa que podemos aplicar lo que aprendimos de BEM y, con un código HTML así:

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

Podemos gestionar las clases de la siguiente manera:

```css
nav.gen-nav {
	& { /*estilos del bloque */ }
	& > img { /*estilos de la imagen */ }
	& > ul { /*estilos de la lista */ }
	& > ul > li > a { /*estilos de los enlaces */ }
	& > ul > li > a.active { /*estilos de los enlaces activos*/ }
	& > ul > li > a.disabled { /*estilos de los enlaces desactivados*/ }
}
```

Esto permite tratar a las clases de CSS como un namespace, que agrupa y aisla selectores especificos y relacionados. Aún así, no estamos aprovechando el nesting de selectores en CSS, que nos puede ayudar a ordenar y aislar mejor los **E**lementos.

```css
nav.gen-nav {
	& { /*estilos del bloque */ }

	& > img { /*estilos de la imagen */ }

	& > ul { /*estilos de la lista */ }
	& > ul > li > a {
		& { /*estilos de los enlaces */ }
		&.active { /*estilos de los enlaces activos*/ }
		&.disabled { /*estilos de los enlaces desactivados*/ }
	}
}
```

Ahora hemos añadido más niveles que permiten agrupar los **M**odificadores dentro del elemento al cual _modifican_. Esto se ve bien y podríamos seguir anidando **E**lementos infinitamente, pero eso sería un error. Al a crear anidaciones en exceso, convertimos nuestro CSS en un caos y entramos en el _Nestenig Hell_, es por eso que se debe recordar BEM y solo anidar **E**lementos dentro de **B**loques cuando sea necesario.

Si en caso se tuviese un **B**loque con muchos **E**lementos, es muy probable que ciertos **E**lementos en realidad sean **B**loques dentro de **B**loques, como la lista de enlaces `<ul>` dentro del `<nav>`. En este caso, háremos lo siguiente:

```css
nav.gen-nav {
	& { /*estilos del bloque */ }
	& > img { /*estilos de la imagen */ }

	& ul.nav_link_list {
		& { /*estilos de la lista */ }
		& > li > a {
			& { /*estilos de los enlaces */ }
			&.active { /*estilos de los enlaces activos*/ }
			&.disabled { /*estilos de los enlaces desactivados*/ }
		}
	}
}
```

Así hemos reconocido que la lista de enlaces es **B**loque hijo del **B**loque de navegación. Además, al no especificar su relación como hijo directo (usando el selector `>`), podemos mover la lista dentro de otras etiquetas `<div>` si necesitamos añadir estilos especiales.

Esta aproximación usa las ideas fundamentales de BEM sin saturar el código HTML de clases con nombres largos. Sin embargo, este es un punto de vista subjetivo. Si tienes una idea diferente o eres un purista de BEM, puedes aventurarte a organizarte como desees, esto solo es una sugerencia y no estoy afirmando que sea objetivamente mejor.

### Solución propuesta

Se debe identificar que elmentos de UI se pueden aislar y funcionar independientemente del resto. A estos los conoceremos de inmediato como **B**loques y podemos, si nos lo permite nuestro framework, aislarlos en componentes reutilizables.

Dentro de un **B**loque, pueden haber múltiples **E**lementos o **B**loques hijos. Para Diferenciar a cada uno, un **E**lemento no puede ser referido con una clase, y será accedido con selectores de CSS exactos (`>`, `+`, `~`), pseudo clases (`:first-child`, `:last-child`, `:only-child`, `nth-child`, etc) o selectores de atributos (`[data-value="0"]`,`[type="text"]`, etc). Un **B**loque hijo es una pieza de HTML que puede ser independiente a los elementos vecinos y guarda una lógica y función en sí mismos (elementos que son probables candidatos son `ul`, `ol`, `article`, `section`, `header` o incluso `div` si sirve como contenedor).

Se identifica a cualquier clase **en** un **E**lemento o **B**loque que aporte estilos complementarios como **M**odificador. Para distinguir una clase **B**loque de una clase **M**odificadora, los nombres de clases de un **B**loque deben incluir detalles sobre su función, mientras que una clase de **M**odificador debe incluir palabras clave sobre su efecto. Un **M**odificador debe estar definido dentro de la clase que modifica para evitar que pueda modificar elementos fuera de su alcance esperado.

Aquí un ejemplo de como lo aplicaría en una carta de un post (modificado del original):

```html
<article class="article-post-card">
	<div>
		<img src="https://images.placeholders.dev/" width="64" height="64" alt="imagen de portada"/>
	</div>

	<div>
		<footer>
			<ul class="ul-tag-list-lite">
				<li class="color-1">tag-1</li>
				<li class="color-2">tag-2</li>
				<li class="color-3">tag-3</li>
				<li class="color-4">tag-4</li>
			</ul>	
		</footer>

		<header>
			<h3>Titulo de portada</h3>
			<time datetime="2022-07-12">2022-07-12</time>
		</header>

		<p class="block-post-desc">
			Ullamco tempor magna incididunt incididunt et quis ad.
		</p>
	</div>

	<div>
		<a class="link-post-cta" href="/blog/0">Leer más</a>	
	</div>

</article>
```

Se pueden crear **M**odificadores y **B**loques globales; sin embargo, eso se verá en una guía futura.

### Contraindicaciones

Al usar selectores especificos, como `>`, y pseudoclases, como `:first-child`, eleva el ni de "especifidad" que tienen los selectores y los hace dificiles de manipular desde fuera de la clase en la que se definen. Es por ello que es fundamental tomar en consideración todos los casos de uso de un **B**loque y sus **E**lementos para evitar requerir de una clase externa para gestionar su comportamiento.