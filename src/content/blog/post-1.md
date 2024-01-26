---
title: 'Un diseño básico: diseñar la "identidad"'
description: 'Lorem ipsum dolor sit amet'
datePub: 'Jul 08 2022'
# thumbnail: '/blog-placeholder-3.jpg'
tags : ['css3','astro','html5']
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

Continuamos creando el `<header>`,`<main>`,`<footer>` y comenzamos a escribir. Usamos un elemento `<style>` para formatear el ancho maximo del `<main>` y centrar nuestro contenido, coloreamos el `<header>` y el `<footer>`, añadimos los links de navegación, ponemos un icono en el header para que sea bonito y alineamos los iconos a un lado y cuando nos dimos cuenta...

Hemos llenado nuestra página de `<div>` y `<span>`, hemos usado estilos en linea para ahorrar crearnos clases y movernos hasta la etiqueta `<style>`, hemos usado codigos de colores diferentes para cada elemento (o hemos usado el mismo, pero usando el <kbd>ctr</kbd>+<kbd>c</kbd> y <kbd>ctr</kbd>+<kbd>v</kbd> hasta el cansancio).

## Un layout básico

Para fácilitar el gestionar la _sensación de identidad_ de la página, se puede usar las variables de CSS. Los ejemplos que mostraré a continuación son hechos en astro, pero se pueden adaptar al uso de cualquier framework que trabaje sobre HTML.

```astro
---
export type Props = {
	title : string;
	description : string;
};

const { title, description } = Astro.props;
---
<!-- /layouts/layout.astro -->

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

Astro es un framework que permite organizar fragmentos de HTML (componentes) según su funcion. En este caso, este "componente" representa el layout general que todas las páginas van a usar. Astro permite pasar valores de variables al HTML y recibir valores como "propiedades" desde un componente padre.

Este "componente" recibe como propiedades el titulo y la descripción y renderiza la cabezera `<head>` con los valores correspondientes. Si no usas componentes en tu proyecto y escribes el código de forma manual, es el equivalente a pegar en cada página `.html` que tengas y cambiar los valores por aquellos correspondientes. Sin embargo, eso no es lo importante de esta sección.

Lo importante son las **variables de css** que estan en la etiqueta `<style>` (_si trabajas con vanilla html, puedes mover la etiqueta_ `<style>` _y su contenido a la cabezera_ `<head>` _o dentro del cuerpo_ `<body>`). 

```html
<!-- /index.html, /about-us.html, ...  -->
<!doctype html>
<html lang="es">
	<head>
		<!-- ... -->

		<title>TU TITULO</title>
		<meta name="title" content="TU TITULO" />
		<meta name="description" content="TU DESCRIPCIÓN" />

		<style>
			/* ... */
		</style>
	</head>
	<body>
		<!-- tu contenido -->
	</body>
</html>
```

Es importante que el código este definido cerca a la raiz de tu página (o proyecto si decides separarlo e importarlo) para que sepas donde buscar en caso quieras refactorizar y no se sientan vinculadas o relacionadas con algún componente o parte especifica dentro de la organización de tu proyecto. Además, estas varaibles deben estar definidas en el `:root`, `html` o `body` para que absolutamente todas los elementos hereden estas propiedas. 


### Organización de colores

Puedes tener cuantos colores desees en tu página siempre y cuando estos sigan una relación armoniosa y una relación jerarquica. De esta manera, puedes tener organizar tu contenido creando una sensación de jerarquía basada en tamaños y **colores**.

<div class="snippet">
	<ul>
		<li style="color: var(--hierarchy-s)">Este es un texto con una relevancia diferente al resto</li>
		<li style="color: var(--hierarchy-0)">Este es un texto con una relevancia diferente al resto</li>
		<li style="color: var(--hierarchy-1)">Este es un texto con una relevancia diferente al resto</li>
		<li style="color: var(--hierarchy-2)">Este es un texto con una relevancia diferente al resto</li>
		<li style="color: var(--hierarchy-3)">Este es un texto con una relevancia diferente al resto</li>
	</ul>
</div>

```html
<ul>
	<li style="color: var(--hierarchy-s)">Este es un texto con una relevancia diferente al resto</li>
	<li style="color: var(--hierarchy-0)">Este es un texto con una relevancia diferente al resto</li>
	<li style="color: var(--hierarchy-1)">Este es un texto con una relevancia diferente al resto</li>
	<li style="color: var(--hierarchy-2)">Este es un texto con una relevancia diferente al resto</li>
	<li style="color: var(--hierarchy-3)">Este es un texto con una relevancia diferente al resto</li>
</ul>
```

Claro que los colores no son solo para el texto, sino para cualquier elemento que pueda o deba llamar la atención del usuario, como el `<footer>` y el `<header>`. es por ello que se definen tantas variables. 

- `--hierarchy-...` representan elementos de texto o UI. Sirven para evita que multiples elementos compitan por la atención del usuario.
- `--bg-body` representa el color del fondo, util para generar la impresión que ciertos elementos son transparentes.
- `--panel-color` representa el color de los "controles" generales, que son el `<header>` y `<footer>` y cualquier otro elemento en pantalla que tenga el mismo nivel de relevancia. Sin embargo, debe usarse con cuidado.
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