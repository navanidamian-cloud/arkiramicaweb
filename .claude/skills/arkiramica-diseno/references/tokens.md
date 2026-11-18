# Tokens de diseño — Arkirámica

## Colores de marca (extraídos del SVG del logo)

| Token | Hex | Uso | Origen |
|---|---|---|---|
| `--ark-green` | `#C5D037` | Acento de marca: "arki", detalles, CTA sobre oscuro | `rgb(197,208,55)` en el logo |
| `--ark-gray` | `#A7A9AC` | Gris del wordmark "rámica" | `rgb(167,169,172)` en el logo |
| `--ark-gray-deep` | `#939598` | Tagline "Pisos • Baños • Plomería" (K=50) | `rgb(147,149,152)` en el logo |

> **Ojo con el Pantone:** la ficha dice PANTONE 374 C (CMYK 23/3/69/0), cuyo equivalente en
> pantalla es más claro y amarillento (~`#C5E86C`). El SVG usa `#C5D037`, más oliva. Para web
> usamos el **valor del SVG** para que el logo y la UI coincidan. Hay que confirmar con el cliente
> cuál es el verde oficial. Además, la segunda muestra de la ficha también dice "374 C" pero es un
> gris K=50: parece un error de copiar y pegar en la ficha.

## Neutros y derivados (para la UI)

| Token | Hex | Uso |
|---|---|---|
| `--ark-ink` | `#161718` | Grafito: hero, intro, footer, texto principal sobre claro |
| `--ark-ink-2` | `#222426` | Superficies elevadas sobre grafito (tarjetas, header con scroll) |
| `--ark-line-dark` | `rgba(255,255,255,.08)` | Juntas / divisores sobre grafito |
| `--ark-stone` | `#F4F2EE` | Fondo claro principal (porcelanato cálido) |
| `--ark-stone-2` | `#E9E6E0` | Fondo claro alterno / tarjetas |
| `--ark-line-light` | `rgba(22,23,24,.10)` | Juntas / divisores sobre claro |
| `--ark-text-muted` | `#5C5F63` | Texto secundario sobre claro (≈6:1) |
| `--ark-green-ink` | `#5E6612` | Verde para texto/enlaces/foco **sobre fondo claro** (6.2:1 sobre blanco) |

## Pares de contraste aprobados

| Texto | Fondo | Ratio | ¿Texto normal? |
|---|---|---|---|
| `--ark-green` | `--ark-ink` | 10.6:1 | ✅ |
| `--ark-gray` | `--ark-ink` | 7.6:1 | ✅ |
| `--ark-ink` | `--ark-green` | 10.2:1 | ✅ (botón verde con texto grafito) |
| `--ark-green-ink` | blanco / stone | 6.2 / 5.6:1 | ✅ |
| `--ark-gray-deep` | blanco | 3.0:1 | ⚠️ solo texto ≥ 24 px o decorativo |
| `--ark-gray` | blanco | 2.4:1 | ❌ solo logo |
| `--ark-green` | blanco | 1.7:1 | ❌ nunca texto; solo logo o detalle gráfico |

**Regla práctica:** sobre claro, el logo se usa tal cual (es un logotipo, está exento), pero
toda la UI textual va en `--ark-ink`, `--ark-text-muted` o `--ark-green-ink`.

## CSS base

```css
:root {
  --ark-green: #C5D037;
  --ark-green-ink: #5E6612;
  --ark-gray: #A7A9AC;
  --ark-gray-deep: #939598;
  --ark-ink: #161718;
  --ark-ink-2: #222426;
  --ark-stone: #F4F2EE;
  --ark-stone-2: #E9E6E0;
  --ark-text-muted: #5C5F63;
  --ark-line-dark: rgba(255,255,255,.08);
  --ark-line-light: rgba(22,23,24,.10);

  --font-sans: "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;

  /* Escala fluida 360px → 1440px */
  --fs-eyebrow: 0.8125rem;                              /* 13px, mayúsculas, tracking .14em */
  --fs-body: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  --fs-lead: clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem);
  --fs-h3: clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem);
  --fs-h2: clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem);
  --fs-h1: clamp(2.25rem, 1.6rem + 3.2vw, 4.5rem);

  /* Espaciado (base 8) */
  --space-1: .5rem; --space-2: 1rem; --space-3: 1.5rem; --space-4: 2rem;
  --space-6: 3rem;  --space-8: 4rem; --space-12: 6rem;  --space-16: 8rem;
  --section-y: clamp(4rem, 3rem + 5vw, 8rem);

  --radius: 4px;
  --container: 1240px;
  --gutter: clamp(1rem, 0.5rem + 2.5vw, 2.5rem);

  --ease-out: cubic-bezier(.22,1,.36,1);
  --ease-in-out: cubic-bezier(.65,0,.35,1);
}
```

## Botones

- **Primario sobre oscuro:** fondo `--ark-green`, texto `--ark-ink`, peso 600, radio 4 px,
  alto mínimo 48 px. Hover: fondo se aclara 6 % y la flecha/icono se desplaza 3 px.
- **Primario sobre claro:** fondo `--ark-ink`, texto `--ark-stone`; detalle verde (icono o subrayado).
- **Secundario:** solo texto con subrayado de 1 px que crece a 2 px verde en hover.
- Nunca más de un botón relleno por sección.
