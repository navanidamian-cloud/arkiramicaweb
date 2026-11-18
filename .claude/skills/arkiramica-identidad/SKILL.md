---
name: arkiramica-identidad
description: Identidad visual y voz de marca de Arkirámica extraídas de su Instagram (paleta cálida, serif editorial, verde salvia, composiciones de muestras, bocetos a lápiz), reglas de copywriting para que el sitio no suene genérico, y especificaciones y prompts para generar assets con IA (Google Flow) y recortes PNG. Úsala SIEMPRE al escribir cualquier texto del sitio, elegir o pedir imágenes, redactar prompts de imagen/video, o decidir el look de una sección. Tiene prioridad sobre la estética "showroom grafito" de arkiramica-diseno.
---

# Arkirámica — Identidad, voz y assets

Fuente: capturas de `@arkiramica` en `ig/` (nov 2026). Su Instagram ya tiene una identidad
fuerte y coherente. **El sitio debe parecer la versión web de ese feed**, no una plantilla oscura
de tecnología. Cuando esta skill contradiga a `arkiramica-diseno`, gana esta.

## 1. Lo que define su identidad

| Rasgo | Cómo se ve en su feed |
|---|---|
| **Base clara y cálida** | Hueso, greige, travertino, yeso. Casi nada de negro puro. |
| **Verde salvia** | Bloques lisos de verde pastel con textura de papel o estuco, con texto blanco o hueso. Es el verde del logo aclarado, no el lima saturado. |
| **Serif editorial en mayúsculas** | Titulares en serif de alto contraste, mayúsculas, peso ligero, centrados. |
| **Sans pequeña muy espaciada** | Subtítulos de 1 línea en mayúsculas con mucho tracking, debajo del titular serif. |
| **El material como protagonista** | Macro de texturas: piedra, estriados, mosaico, veta de madera. |
| **Composiciones de muestras** | Dos o tres losetas o tablas superpuestas y desfasadas sobre fondo hueso (flat-lay). Es su recurso más reconocible. |
| **Bocetos a lápiz** | Ilustraciones a grafito de productos (sanitario, tinaco) sobre fondo claro. |
| **Líneas de plano sobre obra** | Trazos blancos tipo render dibujados sobre una foto de obra gris. |
| **Gente real** | Equipo, almacenistas, vendedores. Tono de agradecimiento, no de stock. |
| **Luz** | Natural, lateral, cálida, con sombras suaves de vegetación o persianas. |
| **Interiores** | Madera clara, arcos, piedra, lino, cerámica artesanal. Cálido-mediterráneo/mexicano contemporáneo. |

## 2. Paleta web

| Token | Hex | Uso |
|---|---|---|
| `--ark-bone` | `#F1EEE8` | Fondo principal |
| `--ark-paper` | `#FAF8F4` | Tarjetas, superficies elevadas |
| `--ark-greige` | `#D9D2C5` | Fondos alternos, bloques de muestra |
| `--ark-sage` | `#D3DDB2` | Bloques de color de marca (como en IG) |
| `--ark-sage-deep` | `#6B7440` | Texto y enlaces verdes sobre claro (AA) |
| `--ark-green` | `#C5D037` | Solo el logo y un detalle mínimo |
| `--ark-wood` | `#B08D62` | Acento cálido puntual |
| `--ark-espresso` | `#2A2622` | Texto principal y secciones oscuras (café muy oscuro, no negro azulado) |
| `--ark-stone-text` | `#6E675E` | Texto secundario |

El grafito `#161718` se sustituye por `--ark-espresso`. Las secciones oscuras son la excepción
(máximo una, más el pie), no la base.

## 3. Tipografía

- **Display:** serif de alto contraste, peso 300–400, a menudo en mayúsculas con tracking `0.02–0.06em`.
  Opciones libres: *Cormorant Garamond*, *Bodoni Moda*, *Fraunces* (óptico alto). Probar la que más
  se parezca a su feed antes de decidir.
- **Apoyo:** sans geométrica (Manrope) solo para cuerpo, etiquetas y UI.
- **Fórmula de titular de su feed:** línea pequeña sans espaciada + línea grande serif + línea
  pequeña sans espaciada. Ejemplo real: `TEXTURAS & MATERIALES / QUE MARCAN / LA DIFERENCIA`.
- Números grandes en serif como recurso gráfico (`1.` `2.` `3.`), no "01 / 02" en sans.

## 4. Voz y copywriting

Su voz es **cercana, de asesor, con una idea por frase y algo de humor seco**. Habla de tú.
Ejemplos reales de su feed, que marcan el tono:

- "Elegir piso es como elegir zapatos: puede ser lindo, pero si no es cómodo para tu rutina, lo vas a notar siempre."
- "Lo vas a ver todos los días."
- "Antes de elegir tus acabados, hay algo más importante que el catálogo."
- "Tu casa también tiene la culpa de tu mal humor."
- "Detrás de cada espacio hay un equipo haciéndolo posible."
- "No sé por dónde empezar mi proyecto. — Nosotros te ayudamos desde el inicio."
- "Lo único que ChatGPT no puede hacer por tu proyecto."
- "Porque construir bien empieza con elegir mejor."
- Fichas de material con pros y contras honestos: "Porcelanato: súper resistente + fácil de mantener. Frío al tacto + colocación precisa."

### Reglas

1. **Di algo que solo Arkirámica diría.** Si la frase sirve igual para cualquier tienda de pisos, se reescribe.
2. **Concreto antes que elogioso.** Un dato, un material, una situación de obra. Nada de "las mejores marcas", "calidad y servicio", "soluciones integrales", "del piso al último detalle", "espacios únicos" sin contexto.
3. **Su tema central es la asesoría:** ayudan a decidir. El sitio vende criterio y acompañamiento, no un inventario.
4. **Frases cortas y completas.** Sin tríadas de adjetivos, sin dos puntos dramáticos en cada titular, sin "X que Y" abstracto ("Superficies que construyen espacios" es justo lo que hay que evitar).
5. **Admite los contras.** Como en sus fichas: decir para qué no sirve un material da más confianza que elogiarlo.
6. **Español de México, de tú.** "Te ayudamos", "pregúntanos". Nunca "usted" ni "nuestros clientes".
7. **Las descripciones de producto nombran piezas reales**, no categorías repetidas ("Calentadores de agua para casa y proyecto" no dice nada).
8. **No inventar hechos:** años, cifras, garantías o servicios que el cliente no haya confirmado.
9. Todo texto nuevo se entrega con **2 o 3 alternativas** para que el cliente elija.

### Antes y después

| Genérico | En su voz |
|---|---|
| Superficies que construyen espacios. | Lo vas a ver todos los días. Elígelo bien. |
| Materiales y acabados de las mejores marcas para tu obra. | Pisos, baños y todo lo que va detrás. Te ayudamos a elegir desde el primer plano. |
| Visítanos. Te asesoramos en persona. | Ven con tu plano, o sin él. |
| Hablemos de tu proyecto. | ¿No sabes por dónde empezar? Nosotros sí. |
| Trabajamos con las marcas que eligen los profesionales. | Las marcas que sí instalaríamos en casa. |

(Las de la derecha son propuestas; el cliente las valida.)

## 5. Composición: cómo evitar el look de plantilla

- **Nada de retículas de celdas idénticas** (3×3, 2×2 con bordes de 1 px). Es lo que más delata.
- **Tamaños desiguales y desfase:** una pieza grande y dos chicas, tarjetas que se montan,
  columnas que no arrancan a la misma altura.
- **Superposición como en sus flat-lays:** imagen sobre bloque de color, recorte PNG que sale de
  su tarjeta, texto que pisa la foto.
- **Bloques salvia y greige** como separadores, en vez de líneas.
- **Esquinas:** su feed usa esquinas levemente redondeadas (8–12 px) en tarjetas; rectas en fotos a sangre.
- **Carrusel de líneas de producto:** tarjetas verticales 4:5 con foto a sangre, número serif
  grande y nombre; la tarjeta activa es más ancha. Arrastrable, igual que el de marcas.
- **Sucursales:** no cuatro cajas iguales. Lista editorial (nombre grande en serif, datos al lado)
  con una foto de la sucursal que cambia al pasar por cada una.
- **Un recurso de firma por sección, no todos a la vez:** boceto a lápiz que se vuelve foto,
  líneas de plano que se dibujan sobre una imagen, muestras que se acomodan al hacer scroll.

## 6. Dirección de imagen para IA (Google Flow)

**Estilo base** (pegar al inicio de cada prompt):

> Fotografía editorial de interiorismo, luz natural lateral cálida de mañana, sombras suaves,
> paleta neutra cálida (hueso, greige, travertino, madera de roble clara), toques de verde salvia,
> materiales reales con textura visible, composición sobria con espacio negativo, lente 35–50 mm,
> profundidad de campo moderada, grano fino, sin texto, sin logotipos, sin personas.

**Negativos:** brillos plásticos, HDR, saturación alta, azul frío, simetría perfecta de render,
objetos flotando, grifería imposible, juntas de loseta que no cierran, texto o marcas inventadas.

**Revisar en cada imagen:** que las juntas sean rectas y continuas, que la grifería tenga
salida y manerales coherentes, que los reflejos correspondan al espacio, que no haya logos.

**Coherencia de serie:** misma hora de luz, misma temperatura de color y misma altura de cámara
en las 9 imágenes de líneas. Generarlas en una sola sesión con la misma semilla o referencia.

**Límite de honestidad:** la IA sirve para ambientes de inspiración, texturas y recortes
genéricos. **Sucursales, equipo y fachadas deben ser fotos reales.** Un producto generado no debe
presentarse como un modelo concreto de una marca.

## 7. Especificaciones de entrega

| Asset | Formato | Tamaño | Notas |
|---|---|---|---|
| Hero (escritorio) | JPG/PNG alta calidad | 3200 × 1800 mín. | Espacio negativo a la izquierda para el texto |
| Hero (móvil) | igual | 1440 × 1800 | Recomposición vertical, no un recorte del horizontal |
| Hero video (opcional) | MP4 H.264 sin audio | 1920 × 1080, 6–10 s, bucle limpio | Movimiento mínimo: luz, cortina, agua |
| Línea de producto ×9 | JPG/PNG | 1600 × 2000 (4:5) | Serie coherente |
| Recorte PNG | PNG-24 con alfa | 2400 px lado largo | Sombra de contacto en capa aparte |
| Textura | JPG | 2400 × 2400, repetible | Travertino, estuco, papel salvia |
| Boceto a lápiz | PNG con alfa o SVG | 2000 px | Trazo grafito, fondo transparente |
| Sucursal (real) | JPG | 2400 × 1600 | Fachada o interior de showroom |

Entregar en `fotos/<seccion>/nombre-descriptivo.ext`. El sitio las convierte a AVIF/WebP.

**Recortes en Affinity:** recortar con pluma (no varita) para bordes limpios; conservar la sombra
propia del objeto en una capa separada en modo multiplicar; exportar sin halo blanco (matte
desactivado); misma dirección de luz en todos (arriba a la izquierda) y mismo ángulo de cámara
(tres cuartos, ligeramente desde arriba) para que convivan en una misma composición.
