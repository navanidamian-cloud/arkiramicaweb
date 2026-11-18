---
name: arkiramica-diseno
description: Sistema de diseño y reglas de frontend para el sitio de Arkirámica (pisos, baños, plomería). Úsala SIEMPRE antes de crear o modificar cualquier página, sección, componente o estilo del sitio de Arkirámica — colores, tipografía, layout, secciones de marcas/sucursales/contacto, y los anti-patrones de la competencia que hay que evitar.
---

# Arkirámica — Sistema de diseño frontend

> **Importante:** la estética, la paleta, la tipografía y la voz vigentes están en la skill
> `arkiramica-identidad` (basada en su Instagram). Si algo de aquí la contradice —en especial la
> sección "Showroom grafito", Manrope en titulares y las retículas de celdas iguales—, gana
> `arkiramica-identidad`. Esta skill sigue vigente para estructura, accesibilidad, rendimiento y
> anti-patrones de la competencia.

Arkirámica vende pisos, recubrimientos, muebles de baño y plomería. El sitio debe sentirse
como **un showroom de arquitectura**, no como una ferretería en línea. Profesional, sereno,
con estatus — y nunca estridente.

Antes de escribir código, lee también:
- `references/tokens.md` — colores, tipografía, espaciado (fuente de verdad).
- `references/anti-patrones.md` — lo que hacen mal Surtidor, Interceramic, Lamosa, Porcelanosa y cómo lo evitamos.
- Para animaciones (incluido el logo) usa la skill `arkiramica-animacion`.

## Principios (en orden de prioridad)

1. **Un mensaje por pantalla.** Cada sección tiene un solo propósito y un solo CTA primario.
   Si una sección necesita dos CTAs, el segundo es un enlace de texto, no otro botón.
2. **El material es el protagonista.** Fotografía grande de superficies, texturas y espacios
   terminados. La UI se retira: bordes finos, poco color, mucho aire.
3. **El verde es un acento, no un fondo.** El verde de marca aparece en ≤10 % de la superficie
   visible: subrayados, el punto activo, un detalle del CTA, la palabra "arki". Nunca bloques
   grandes de verde ni texto verde sobre blanco (contraste 1.7:1, ilegible).
4. **Contacto a un toque.** WhatsApp, teléfono y "cómo llegar" deben estar a un clic desde
   cualquier punto, sobre todo en móvil. Es el objetivo de negocio del sitio provisional.
5. **Honestidad del contenido.** Nada de texto de relleno, botones que llevan a "#", ni
   secciones vacías "próximamente". Si un dato no existe todavía, la sección no se muestra.

## Estética: "Showroom grafito"

- Base oscura **grafito** (`--ark-ink`) para el hero, la intro y el footer: el verde y los
  grises del logo están diseñados para brillar sobre oscuro (verde sobre grafito: 10.6:1).
- Secciones intermedias en **piedra clara** (`--ark-stone`), un blanco cálido tipo
  porcelanato, no blanco puro.
- Motivo gráfico: **la retícula de juntas** (líneas de 1 px como la lechada entre losetas).
  Úsala para dividir secciones, como fondo muy sutil del hero (opacidad ≤ 6 %) o para
  enmarcar el grid de marcas. Es el único "ornamento" permitido.
- Esquinas: radio pequeño (`4px`) o recto. Las letras del logo tienen esquinas suavizadas,
  no redondas: evita píldoras y tarjetas muy redondeadas.
- Sombras: casi nunca. Separa con espacio, color de fondo o líneas de junta.

## Tipografía

- Títulos: sans geométrica amplia que dialogue con el logo (letras anchas, terminales
  rectos). Recomendado: **"Manrope"** o **"Sora"** (Google Fonts), pesos 300/500/700.
- Cuerpo: la misma familia en 400, o "Inter" si se necesita más legibilidad en tablas.
- Títulos grandes con tracking ligeramente negativo; etiquetas pequeñas (eyebrows) en
  mayúsculas con tracking `0.14em`, color gris de marca, tamaño 12–13 px.
- Máximo 2 familias, máximo 3 pesos en pantalla.
- Escala fluida con `clamp()` (ver tokens). Nunca texto de cuerpo < 16 px en móvil.

## Estructura del sitio provisional (una sola página con anclas)

1. **Intro** — animación del logo (ver `arkiramica-animacion`). Una vez por sesión, se puede saltar.
2. **Hero** — fondo grafito + foto de espacio terminado (baño o piso de gran formato), titular corto
   ("Superficies que construyen espacios", o similar, a validar con el cliente), subtítulo con las
   3 líneas (Pisos · Baños · Plomería) y CTA primario "Escríbenos por WhatsApp" + enlace "Ver sucursales".
3. **Qué hacemos** — 3 columnas (Pisos / Baños / Plomería): foto vertical, título, 1 línea. Sin precios.
4. **Marcas** — **carrusel interactivo** (decisión del cliente): banda continua de logos monocromos
   (gris de marca / blanco sobre grafito), mismo alto óptico, separados por juntas verticales de 1 px.
   Deriva lenta (~30 px/s), se pausa con hover/foco/touch, se puede **arrastrar** con mouse y dedo
   con inercia, y tiene flechas visibles + teclado. Hover: el logo toma su color o sube a opacidad
   100 %. Con `prefers-reduced-motion` no hay deriva; queda solo el arrastre y el scroll nativo.
   Spec completa en la skill `arkiramica-animacion`. Lista: Helvex, Urrea, American Standard,
   Firenze, Daltile, Castel, Perdura, Cemix, Ardex, Mapei, Laticrete, Vitromex, Villeroy & Boch.
5. **Sucursales** — una tarjeta por sucursal: nombre, dirección, horario, teléfono, botones
   "Cómo llegar" (Google Maps) y "WhatsApp". Un mapa embebido opcional cargado con `loading="lazy"`
   solo al hacer clic (fachada estática primero).
6. **Contacto** — WhatsApp como canal principal, teléfono, correo, y un formulario corto
   (nombre, teléfono, qué necesitas). Sin captcha visible si se puede evitar.
7. **Footer** — grafito, logo completo, redes sociales con etiquetas de texto o `aria-label`,
   aviso de privacidad, año dinámico.

Elementos persistentes:
- **Header** delgado, transparente sobre el hero y sólido (grafito con blur) al hacer scroll.
  Logo + 4 anclas + botón WhatsApp. Sin barra de utilidades con 3 teléfonos.
- **Botón flotante de WhatsApp** solo en móvil, abajo a la derecha, que no tape contenido del footer.

## Reglas de implementación

- HTML semántico: `header`, `nav`, `main`, `section[aria-labelledby]`, `footer`, `address`.
- Todas las imágenes con `alt` descriptivo real; logos de marca con `alt="Logo de <Marca>"`.
- Imágenes en AVIF/WebP con `srcset`; hero con `fetchpriority="high"`, el resto `loading="lazy"`.
- Datos (marcas, sucursales, redes) en un archivo JSON/TS separado del marcado: será la semilla
  de la base de datos del sitio grande.
- Mobile-first. Probar en 360 px, 768 px, 1280 px y 1600 px. Sin scroll horizontal.
- Objetivos: LCP < 2.5 s en 4G, CLS < 0.05, Lighthouse accesibilidad ≥ 95.
- Contraste AA mínimo en todo el texto. Usa los pares aprobados de `references/tokens.md`.
- Estados de foco visibles (anillo verde de 2 px sobre oscuro, verde oscuro sobre claro).
- Copy en español de México, revisado: sin errores de dedo, acentos correctos ("Plomería", "Baños").
- SEO local: `LocalBusiness` / `HomeAndConstructionBusiness` en JSON-LD por sucursal, título y
  meta descripción con la ciudad.

## Checklist antes de dar por terminada una sección

- [ ] ¿Tiene un solo CTA primario?
- [ ] ¿El verde ocupa poco y nunca es texto sobre fondo claro?
- [ ] ¿Funciona y se lee bien a 360 px?
- [ ] ¿Todas las imágenes tienen alt real y tamaño reservado (sin saltos de layout)?
- [ ] ¿Se evitó cada punto de `references/anti-patrones.md` que aplique?
- [ ] ¿Respeta `prefers-reduced-motion`?
