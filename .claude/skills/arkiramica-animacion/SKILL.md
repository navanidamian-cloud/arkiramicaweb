---
name: arkiramica-animacion
description: Animación del logotipo de Arkirámica (efecto de escritura y pantalla de intro) y reglas de motion para todo el sitio. Úsala al implementar o modificar la intro, la animación del logo, transiciones, reveals con scroll o cualquier movimiento en el sitio de Arkirámica.
---

# Arkirámica — Motion y animación del logo

Lee primero la skill `arkiramica-diseno` (tokens y principios). El movimiento debe sentirse
**preciso, arquitectónico y calmado**: como colocar una loseta en su lugar. Nada de rebotes,
giros, parallax exagerado ni partículas.

## Anatomía del SVG (`Arkirámicalogo.svg`, viewBox 0 0 2184 403)

Todos los trazos son **rellenos** (`fill`), no `stroke`. Los grupos tienen transformaciones
anidadas de Affinity (`matrix(4.166667…)`).

| Índice de path (en orden del documento) | Contenido | Color |
|---|---|---|
| 0–3 | a · r · k · i (con punto) | `#C5D037` verde |
| 4–9 | r · a · m · i · c · a | `#A7A9AC` gris |
| último path gris aislado (`translate 307.46, 237.55`) | acento de la "á" | `#A7A9AC` |
| 10–27 aprox. | tagline "Pisos • Baños • Plomería" + 2 puntos | `#939598` |

**Antes de animar**, prepara una copia `logo-anim.svg`:
1. Aplana las transformaciones (Affinity/Illustrator: "expandir transformaciones", o `svgo` con
   `convertTransform`) para que cada letra sea un `<path>` con coordenadas absolutas.
2. Agrupa: `<g id="arki">`, `<g id="ramica">`, `<path id="acento">`, `<g id="tagline">`.
3. Pon a cada letra la clase `.ltr` y `style="--i:N"` (N = orden de aparición).
4. Inyecta el SVG **inline** en el HTML (no como `<img>`) para poder animar sus nodos.

## Animación "se está escribiendo" (técnica: contorno → relleno)

Como las letras son rellenos, el efecto de escritura se logra **dibujando su contorno** con
`stroke-dasharray`/`stroke-dashoffset` y luego llenando el interior:

```css
.ltr {
  fill: transparent;
  stroke: currentColor;
  stroke-width: 1.5;            /* en unidades del viewBox ya aplanado */
  stroke-dasharray: var(--len);
  stroke-dashoffset: var(--len);
  animation:
    ark-draw .7s var(--ease-in-out) forwards,
    ark-fill .45s var(--ease-out) forwards;
  animation-delay:
    calc(var(--i) * 90ms),
    calc(var(--i) * 90ms + 450ms);
}
#arki   .ltr { color: var(--ark-green); }
#ramica .ltr { color: var(--ark-gray); }

@keyframes ark-draw { to { stroke-dashoffset: 0; } }
@keyframes ark-fill { to { fill: currentColor; stroke-width: 0; } }
```

```js
// Calcula la longitud real de cada contorno una sola vez
document.querySelectorAll('#ark-logo .ltr').forEach(p => {
  p.style.setProperty('--len', Math.ceil(p.getTotalLength()));
});
```

### Coreografía (≈ 2.2 s total)

| t (ms) | Evento |
|---|---|
| 0 | Fondo grafito. Una línea verde de 1 px (una "junta") se traza horizontalmente bajo el logo |
| 150–900 | "arki" se escribe letra a letra (verde) |
| 600–1500 | "rámica" se escribe (gris), solapado con el final de "arki" para que se sienta continuo |
| 1500–1750 | **El acento de la "á" cae** desde −12 px con un `ease-out` firme, como una pieza colocada. Es el gesto de firma. |
| 1650–2000 | El tagline aparece con fade + 6 px hacia arriba; los dos puntos aparecen en escala 0 → 1 |
| 2000–2400 | Salida: el telón grafito se desliza hacia arriba (`clip-path: inset(0 0 100% 0)`) y el logo se encoge al header mediante FLIP |

La salida con FLIP: mide el `getBoundingClientRect()` del logo de la intro y del logo del header,
anima `transform: translate() scale()` entre ambos con Web Animations API y luego esconde la intro.
El resultado es que el logo "aterriza" en el header y no desaparece de golpe.

## Reglas obligatorias de la intro

- **Una vez por sesión:** se guarda `sessionStorage.arkIntro = 1` (envuelto en try/catch). En
  visitas siguientes se muestra el header directamente.
- **Se puede saltar:** clic, tecla, rueda o toque la terminan de inmediato (se salta al estado final).
- **Duración máxima de 2.4 s.** El contenido del hero se carga por debajo desde el inicio; la
  intro es un overlay y no retrasa el LCP.
- **`prefers-reduced-motion: reduce`:** sin intro; el logo aparece con un fade de 200 ms.
- **Sin JS:** el logo se ve completo y estático (la clase `.js` en `<html>` activa la animación).
- No bloquear el scroll más de lo que dura la intro. Nunca poner audio.

## Logo en el header (después de la intro)

- Al hacer hover sobre el logo, el acento de la "á" sube 2 px y vuelve. Es el único guiño.
- En scroll hacia abajo, el header se compacta: se oculta el tagline y el logo baja al 80 %.

## Motion en el resto del sitio

| Patrón | Especificación |
|---|---|
| Reveal de secciones | `opacity 0→1` + `translateY 16px→0`, 600 ms `--ease-out`, con IntersectionObserver (`threshold .2`) y una sola vez |
| Escalonado en grids (marcas, sucursales) | 60 ms entre elementos, máximo 8 elementos escalonados |
| Retícula de juntas del hero | las líneas se trazan (scaleX/scaleY 0→1) en 900 ms al cargar, opacidad final ≤ 6 % |
| Imágenes | reveal con `clip-path: inset(0 0 100% 0) → inset(0)` en 800 ms, como una loseta que se descubre |
| Hover en tarjetas | imagen a escala 1.03 en 600 ms; nunca levantar la tarjeta con sombra |
| Botones | 150–200 ms; la flecha se desplaza 3 px |

## Carrusel interactivo de marcas

- **Pista:** lista `<ul>` duplicada una vez (la copia con `aria-hidden="true"` e `inert`) para el
  loop infinito; se mueve con `transform: translate3d()` vía `requestAnimationFrame`.
- **Deriva:** ~30 px/s hacia la izquierda. Se pausa con `pointerenter`, `focusin`, `pointerdown` y
  cuando la sección sale del viewport (IntersectionObserver). Reanuda con rampa de 400 ms, no de golpe.
- **Arrastre:** Pointer Events (`setPointerCapture`), `touch-action: pan-y` para no bloquear el
  scroll vertical en móvil; al soltar, inercia con fricción (`v *= 0.95` por frame) y luego vuelve
  a la deriva. Un arrastre > 5 px cancela el clic.
- **Controles:** flechas prev/next visibles (48 px, `aria-label`) que desplazan un logo con
  420 ms `--ease-out`; ← → con foco en la región. Región con `role="region"` y
  `aria-roledescription="carrusel"`, `aria-label="Marcas con las que trabajamos"`.
- **Logos:** SVG monocromo, altura óptica uniforme (ajusta por logo con `--logo-scale`), color
  `--ark-gray` sobre claro u opacidad .6 blanco sobre grafito; hover/foco → color original u
  opacidad 1, escala 1.04, 300 ms.
- **Bordes:** máscara `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`
  para que los logos entren y salgan suavemente.
- **Reduced motion:** sin deriva ni inercia; scroll horizontal nativo con `scroll-snap` + flechas.

**Prohibido:** carruseles que cambian solos de diapositiva, parallax de más de 10 % de desplazamiento, cursores
personalizados, animaciones en bucle infinito (salvo el indicador de "scroll" del hero, y solo
mientras está visible), y animar `width`, `height`, `top` o `left` (solo `transform`, `opacity` y
`clip-path`).

Usa CSS y la Web Animations API. GSAP solo se justifica si la coreografía de la intro crece; en ese
caso, carga GSAP core en una versión fija desde cdnjs, sin plugins de pago.
