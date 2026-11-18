---
name: editorial-magazine-cards
description: >-
  Use this skill when designing or building editorial magazine-style product or
  category cards featuring transparent cutouts, saturated spatial composition
  adapted to each object's silhouette, layered display typography tucked
  slightly behind the image for physical depth, and clean bottom copy.
---

# Editorial Magazine Cards

Guía para diseñar y maquetar tarjetas de estilo editorial de revista donde cada recorte transparente interactúa físicamente con la tipografía mediante capas de profundidad (`z-index`), **adaptando el encuadre y la saturación del espacio a la silueta real de cada producto** (sin forzar todas las piezas al mismo sangrado diagonal).

## 1. Principios de composición y profundidad

1. **Saturación inteligente según la silueta:**
   - La imagen ocupa **60 %–80 %** del espacio visual, pero su posición responde a la forma física del objeto:
     - **Pieza con corte recto/diagonal (*bleed-corner*):** p. ej. losetas o paneles ya cortados en origen; se sangran contra el borde superior y derecho (`top: 0; right: 0`) cubriendo parcialmente la barra de acento superior.
     - **Objeto vertical con brazo/caño (*vertical-reach*):** p. ej. un monomando alto cuyo caño apunta a la izquierda; se ancla a la derecha/abajo para que el caño cruce y muerda el extremo derecho del titular.
     - **Silueta en "L" o piramidal (*l-shape*):** p. ej. tarja con llave alta o saco + herramienta abajo; se aprovecha el hueco superior izquierdo junto al cuello/saco para alojar el índice y el titular, dejando que el volumen alto muerda el cierre del texto.
     - **Volumen apoyado (*grounded-volume*):** p. ej. mueble de baño o calentador; se ancla cerca del borde inferior-derecho o lateral derecho para darle peso arquitectónico, acotando el ancho de la descripción inferior izquierda si hace falta.
     - **Bodegón completo / abanico (*floating-cluster*):** p. ej. muestrario de azulejos, piezas de plomería o accesorios en diagonal; flota a gran escala hacia el centro-derecha sin pegarse artificialmente a todos los bordes, mordiendo ligeramente el titular y proyectando sombra real sobre el papel.

2. **Sistema de 3 planos (`z-index`):**
   - **Plano 1 (`z-index: 1`) — Fondo + barra superior + índice + titular:**
     - Fondo mate cálido (`--ark-stone: #f4f2ee`).
     - Franja superior de acento (`height: 4px`, `--ark-green`), **siempre detrás del recorte** para que cualquier imagen que suba hasta el borde la interrumpa de forma natural.
     - Índice numérico (`01`…) y titular display grande.
   - **Plano 2 (`z-index: 2`) — Recorte transparente:**
     - Imagen WebP/PNG con canal alfa (`pointer-events: none`) que invade suavemente **entre 10 % y 25 % del final del titular** (normalmente las últimas 1–2 letras), nunca el arranque de la palabra.
     - `filter: drop-shadow(-10px 14px 20px rgba(22, 23, 24, 0.16))` para proyectar sombra física sobre las letras que quedan detrás.
   - **Plano 3 (`z-index: 3`) — Copy inferior:**
     - Descripción corta en 1–2 líneas en la base inferior izquierda, siempre libre de obstrucción visual.

3. **Jerarquía tipográfica:**
   - **Índice (`01`):** sans geométrica peso `400–500`, `clamp(1.25rem, 1.05rem + 0.65vw, 1.65rem)`, color `--ark-green-ink` (`#5e6612`), alineado arriba del titular sin cajas ni adornos.
   - **Titular (`h3`):** sans geométrica limpia peso `400–500` (nunca ultra-pesado), `line-height: 0.94`, `letter-spacing: -0.03em`, color `#161718`.
     - Títulos cortos (1 palabra): escala grande `clamp(2.35rem, 1.5rem + 2.4vw, 4.1rem)`.
     - Títulos largos (2–3 palabras): escala ligeramente contenida `clamp(1.75rem, 1.2rem + 1.5vw, 2.75rem)` y `max-width` ajustado para formar 2 líneas compactas sin invadir el copy inferior.
   - **Descripción (`p`):** `0.9375rem`, `--ark-text-muted` (`#5c5f63`), `line-height: 1.45`.

## 2. Arquitectura CSS parametrizada por tarjeta

Usa variables CSS en el contenedor de la imagen y cabecera para ajustar cada silueta sin duplicar reglas:

```css
.ed-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: clamp(340px, 29vw, 430px);
  padding: clamp(1.5rem, 2.5vw, 2.25rem);
  background: var(--ark-stone, #f4f2ee);
  overflow: hidden;
}

.ed-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: var(--ark-green, #c5d037);
  z-index: 1;
  opacity: 0.85;
  transition: opacity 0.35s ease;
}

.ed-card:hover::before { opacity: 1; }

.ed-card__head {
  position: relative;
  z-index: 1;
  max-width: var(--head-w, 68%);
  margin-top: clamp(0.5rem, 1.5vw, 1.15rem);
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.ed-card__media {
  position: absolute;
  top: var(--img-top, 10%);
  right: var(--img-right, -4%);
  bottom: var(--img-bottom, auto);
  z-index: 2;
  width: var(--img-w, 68%);
  height: var(--img-h, 74%);
  object-fit: contain;
  object-position: var(--img-pos, center right);
  pointer-events: none;
  filter: drop-shadow(-10px 14px 20px rgba(22, 23, 24, 0.16));
  transition:
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.ed-card__desc {
  position: relative;
  z-index: 3;
  margin: auto 0 0;
  max-width: var(--desc-w, 30ch);
  font-size: 0.9375rem;
  line-height: 1.48;
  color: var(--ark-text-muted, #5c5f63);
}

.ed-card:hover .ed-card__head { transform: translate3d(-4px, 0, 0); }
.ed-card:hover .ed-card__media {
  transform: translate3d(2%, -2%, 0) scale(1.03);
  filter: drop-shadow(-14px 20px 26px rgba(22, 23, 24, 0.22));
}

@media (prefers-reduced-motion: reduce) {
  .ed-card__head, .ed-card__media { transition: none; transform: none !important; }
}
```

## 3. Checklist de validación

- [ ] ¿Cada tarjeta respeta la geometría natural de su objeto (sin forzar cortes artificiales ni sangrados idénticos)?
- [ ] ¿La barra superior (`z-index: 1`) queda detrás de cualquier imagen que cruce el borde superior?
- [ ] ¿El titular sigue siendo 100 % legible (el objeto muerde como máximo el tramo final, nunca el inicio)?
- [ ] ¿La descripción inferior (`z-index: 3`) queda libre y legible en escritorio, tablet y móvil (360 px)?
- [ ] ¿Respeta `prefers-reduced-motion` y usa `pointer-events: none` en la imagen?
