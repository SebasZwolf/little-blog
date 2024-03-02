---
title: 'Preparación básica: diseñar la "identidad"'
desc: 'Una propuesta de solución para manejar variables CSS y crear una paleta general de colores que representen una jerarquía.'
datePub: 2024-03-01T00:00:00-05:00
thumbnail:
 img :  '/post-1.thumbnail.png'
 alt : 'Ejemplo en código de la definición de variables CSS usando el template recomendado'
tags : ['css3','astro','html5']
related:
  - post-2
  - post-3
---

Lo primero y más importante al crear una página web para una aplicación, un sitio estatico, una SPA o un grupo de páginas, es crear definir un layout básico default para el sitio. Esto incluye definir los colores que se van a usar, como se va distribuir el contenido, las fuentes, etc. En otras palabras, es necesario definir la identidad de lo que se va a crear.

## El problema de empezar rápido

Casi todas las páginas que crearás van a comenzar así:

```html
<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		
	</body>
</html>
```

Desde aquí todos sabemos lo que hay que hacer, le ponemos un titulo, le agregamos los metatags de descripción y titulo y empezamos a llenar el `<body>` con nuestro contenido.

Continuamos creando el `<header>`,`<main>`,`<footer>`. Usamos un elemento `<style>` para dar formatos básicos como el ancho maximo del `<main>` y centrar nuestro contenido _(o usamos estilos en línea)_, añadimos colores al `<header>` y el `<footer>`, insertamos los links de navegación, ponemos un icono en el header para que sea bonito y alineamos los iconos a un lado y cuando nos dimos cuenta...

Hemos llenado nuestra página de etiquetas `<div>` y `<span>`, hemos usado estilos en línea o nos llenamos de nombres de clases incomprenisbles y _casí_ aleatorias dentro la etiqueta `<style>`, hemos usado códigos de colores diferentes para cada elemento (o el mismo, solo que haciendo <kbd>ctrl</kbd>+<kbd>c</kbd> y <kbd>ctrl</kbd>+<kbd>v</kbd> en todos lados).

## Un layout básico

Para fácilitar el gestionar la *sensación de identidad* de la página, se puede usar las variables de CSS. Los ejemplos que mostraré a continuación son hechos en astro, pero se pueden adaptar al uso de cualquier framework que trabaje sobre HTML.

```astro
---
// /layouts/layout.astro
export type Props = {
	title : string;
	description : string;
};

const { title, description } = Astro.props;
---
<!doctype html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

		<title>{title}</title>
		<meta name="title" content={title} />
		<meta name="description" content={description} />

		<!-- contenido del slot de metatags adicionales -->
		<slot name="meta" />
	</head>
	<body>
		<!-- contenido del slot por defecto -->
		<slot />
	</body>
</html>

<style>
	html {
		margin: 0;
		padding: 0;
		font-family: system-ui, sans-serif;

		scroll-behavior: smooth;
	
		--hierarchy-s : #000000;
		--hierarchy-0 : #111827;
		--hierarchy-1 : #4b5563;
		--hierarchy-2 : #64748b;
		--hierarchy-3 : #94a3b8;

		--bg-body : #e4e4e7;
		--panel-color : #b4bae0;
		--block-color : #cbd5e1;

		color : var(--hierarchy-0); 
		
	}
	body { 
		margin: 0;
		padding: 0;
		background-color: var(--bg-body);
	}
</style>
```

*Aclarción rápida sobre los componentes en Astro:* Este "componente" recibe como propiedades el titulo y la descripción y renderiza la cabezera `<head>` con los valores correspondientes. Si no usas componentes en tu proyecto y escribes el código de forma manual, es el equivalente a pegar en cada página `.html` que tengas y cambiar los valores por aquellos correspondientes.

Lo importante de esta sección son las **variables de css** que estan en la etiqueta `<style>` (*si trabajas con vanilla html, puedes mover la etiqueta* `<style>` *y su contenido a la cabezera* `<head>` *o dentro del cuerpo* `<body>`). 

```html
<!-- /index.html, /about-us.html, ...  -->
<!doctype html>
<html lang="es">
	<head>
		<title>TU TITULO</title>
		<meta name="title" content="TU TITULO" />
		<meta name="description" content="TU DESCRIPCIÓN" />

		<style>/* mueve aquí tu código CSS */</style>
	</head>
	<body>
		<!-- ... -->
	</body>
</html>
```

Es importante que el código este definido cerca a la raiz de tu página (o proyecto si decides separarlo e importarlo) para que sepas donde buscar en caso quieras refactorizar y no se sientan vinculadas o relacionadas con algún componente o parte especifica dentro de la organización de tu proyecto. Además, estas varaibles deben estar definidas en el `:root`, `html` o `body` para que todos los elementos hereden estas variables.

### Organización de colores

Puedes tener cuantos colores desees en tu página siempre y cuando estos sigan una relación armoniosa y una relación jerarquica. Para este ejemplo, he definido aquellos orientados a la jerarquía del texto y los colores de los elementos UI para que, ee esta manera, se pueda organizar el contenido creando una sensación de jerarquía basada en **colores** (también puedes usar tamaños para crear esta ilusión de ordenar la relevancia visual).

```html
<ul>
	<li style="color: var(--hierarchy-s)">Este es un texto con máxima importancia</li>
	<li style="color: var(--hierarchy-0)">Este es un texto normal</li>
	<li style="color: var(--hierarchy-1)">Este es un texto con una relevancia leve</li>
	<li style="color: var(--hierarchy-2)">Este es un texto con una relevancia inferior al resto</li>
	<li style="color: var(--hierarchy-3)">Este es un texto sin relevancia y poco visible</li>
</ul>
```

Claro que los colores no son solo para el texto, sino para cualquier elemento que pueda o deba llamar la atención del usuario, como el `<footer>` y el `<header>`. Como consejo general, yo sugiero tener un minimo de variables definidas, que son: 

- `--hierarchy-...` representan elementos de texto o UI. Sirven para evita que multiples elementos compitan por la atención del usuario.
- `--bg-body` representa el color del fondo, y también es útil para generar la impresión que ciertos elementos son transparentes.
- `--panel-color` representa el color de los "controles" generales, que son el `<header>` y `<footer>` y cualquier otro elemento en pantalla que tenga el mismo nivel de relevancia. Debe usarse al mínimo.
- `--block-color` representa el color de cualquier elemento o bloque que agrupe información, como un `<article>`, y desee destacar del fondo, pero no tanto como los mismos "controles" generales.

Al texto general se le asigna el color `--hierarchy-0`, el cual es el base. Es importante que este color no sea `#000`, pues entonces no habrá nunca un color más relevante que este. Además, usar valores absolutos como `black` o `white` no es una buena idea en general.

### Otras consideraciones

Estando en el momento de definir la "identidad" del sitio, podemos definir de una vez cuales son las fuentes a usar; sin embargo, si deseamos usar las fuentes para representar jerarquia o diferenciar cierto contenido de otro, podemos usar lo aprendido y asignarlas a una variable en especifico. Como:

```css
:root {
	--fnt-general : "open sans" /*/fuente importada*/, system-ui, sans-serif; 
	--fnt-heading : "Cheddar gothic" /*/fuente importada*/, "open sans", system-ui, sans-serif; 
	--fnt-monospc : monospace;
}

body { font-family: var(--fnt-general); }

:where(h1,h2,h3,h4,h5,h6) { font-family: var(--fnt-heading); }

code { font-family: var(--fnt-monospc);	 }
```

## Un layout accesible

Con las variables definidas, tenemos los colores organizados y listos para empezar a diseñar la experiencia del usuario considerando la jerarquía visual del contenido. Sin embargo, ¿y si el usuario prefiere **el modo oscuro**?.

Cuando un usuario navega por internet, son las primeras impresiones lo que hace que se queden o se vayan y, si lo primero que reciben es un flasheaso de luz repentino, el instinto primitivo natural es un cierre de pestaña inmediato. Puedes comprobarlo tu mismo, si usas Discord, puedes ir a configuración y cambiar el modo oscuro al claro y experimentar _la experiencia_. Sin embargo, advierto que **no** es placentera.

Para solucionar el problema, podemos hacer lo siguiente

```css
:root {
	color-scheme: light dark;
}
html {
	margin: 0;
	padding: 0;
	font-family: system-ui, sans-serif;
	
	scroll-behavior: smooth;
	color : var(--hierarchy-0); 
}
@media (prefers-color-scheme: light) {
	html {
		--hierarchy-s : #000000;
		--hierarchy-0 : #111827;
		--hierarchy-1 : #4b5563;
		--hierarchy-2 : #64748b;
		--hierarchy-3 : #94a3b8;

		--bg-body : #e4e4e7;
		--panel-color : #b4bae0;
		--block-color : #cbd5e1;
	}
}

@media (prefers-color-scheme: dark) {
	html { 
		--hierarchy-s : #ffffff;
		--hierarchy-0 : #f1f5f9;
		--hierarchy-1 : #94a3b8;
		--hierarchy-2 : #64748b;
		--hierarchy-3 : #3f3f46;

		--bg-body : #27272a;
		--panel-color : #080d10; 
		--block-color : #38383a; 
	}
}

```

Hemos creado así 2 sets de colores, uno para el modo oscuro y un para el modo claro. De estamenra, no será necesario refactorizar en todos lados cuando queramos gestionar colores que cambien según el modo oscuro o claro.

Si tenemos variables especificas que no deben ser heredadas por todo el documento, podemos declararlas dentro de clases especificas de nuestro interés y aplicando lo aprendido, crear un segundo set de colores.


```css
.specific-card {
	/* ... */
	
	color : var(--color-a); 
}
@media (prefers-color-scheme: light) {
	.specific-card {
		--color-a : #000000;
		--color-b : #111827;
		--color-c : #4b5563;
	}
}

@media (prefers-color-scheme: dark) {
	.specific-card { 
		--color-a : #ffffff;
		--color-b : #f1f5f9;
		--color-c : #94a3b8;
	}
}
```

Ahora mismo no he mencionado nada del layout o "esquema" de la página como tal. Eso lo mostraré en la siguiente parte.