# Anti-patrones de la competencia (y qué hacemos en su lugar)

Investigación de noviembre de 2026 sobre Surtidor (surtidor.com/guadalajara), Interceramic,
Lamosa y Porcelanosa México. Cada punto es un error observado y la regla que lo evita.

## 1. Saturación y redundancia
**Visto en:** Surtidor repite la misma navegación 4 veces (mega-menú, drawer móvil, fila de
iconos y grid de 20 categorías); Lamosa duplica menú y tarjetas promocionales.
**Regla:** cada destino aparece **una vez** en el cuerpo de la página. El header lleva como máximo
4–5 anclas. Nada de filas de "accesos rápidos" con iconos.

## 2. Sin jerarquía en el primer pantallazo
**Visto en:** Surtidor abre con un carrusel de fotos de sucursales en vez de un mensaje fuerte;
Lamosa pone búsqueda, "Mi proyecto", quiz, visualizador y "Dónde comprar" a competir entre sí.
**Regla:** el hero tiene **un titular, un subtítulo, un CTA primario y un enlace secundario**.
Nada más.

## 3. Carruseles para todo
**Visto en:** Surtidor tiene 4 carruseles (sucursales, marcas, promociones, productos);
Interceramic tiene un hero en carrusel; Lamosa tiene un carrusel horizontal sin flechas visibles.
**Regla:** máximo **un** carrusel en todo el sitio: el de marcas (decisión del cliente). Debe ser
controlado por el usuario: arrastrable, con flechas visibles y teclado, pausa en hover/foco/touch,
sin saltos de diapositiva (deriva continua y lenta, no "slides" que cambian cada 3 s), y todos los
logos deben estar en el DOM y ser accesibles por lector de pantalla. Ningún otro contenido va en
carrusel.

## 4. Modales que bloquean al entrar
**Visto en:** el selector de estado de Surtidor (32 estados), el modal de ubicación de
Interceramic y el país/idioma de Porcelanosa.
**Regla:** nada se interpone entre la persona y el contenido. La intro del logo dura ≤ 2.4 s, se
puede saltar (clic, tecla o scroll) y solo aparece una vez por sesión. Aviso de cookies en una
barra discreta abajo, nunca en un modal.

## 5. Datos inconsistentes o de otra región
**Visto en:** Surtidor anuncia envío gratis "en CDMX" y muestra una sucursal de Monterrey en la
página de Guadalajara; una tarjeta dice "Observatorio" pero la imagen es "Av. México"; Lamosa
tiene "© 2024" junto a banners de 2027.
**Regla:** todos los datos de sucursales vienen de **una sola fuente** (`data/sucursales.json`)
que se usa en las tarjetas, el footer y el JSON-LD. El año del copyright se calcula. Ningún
texto se copia a mano en dos lugares.

## 6. Erratas y mezcla de idioma o mayúsculas
**Visto en:** "Protarollos", "LIstas de precios", "Help Center" junto a "Help center", títulos en
inglés en un sitio en español, "Charela de regadera".
**Regla:** todo en español de México, con revisión ortográfica y un criterio de mayúsculas
(tipo oración en títulos y botones). Las etiquetas en mayúsculas solo se hacen por CSS
(`text-transform`), nunca escritas así.

## 7. Accesibilidad descuidada
**Visto en:** alt genéricos ("promotion-1", "dropdown image", "null"), banderas y logos sin
texto, enlaces solo con imagen, un newsletter sin etiqueta.
**Regla:** alt descriptivo real, `aria-label` en los iconos de redes, `<label>` visible en cada
campo, foco visible y orden de tabulación lógico. Hay que tener Lighthouse de accesibilidad ≥ 95.

## 8. Enlaces rotos o mal apuntados
**Visto en:** Interceramic tiene un "Ver más" de vanity que lleva a un artículo de pisos
pulidos; en Surtidor el logo "Urrea" apunta a "Crest".
**Regla:** no hay enlaces a `#` ni "próximamente". Cada enlace externo (Maps, WhatsApp, redes)
se verifica antes de publicar.

## 9. Texto truncado con "..."
**Visto en:** nombres de producto cortados en las tarjetas de Surtidor.
**Regla:** los textos clave (direcciones, horarios, nombres) se ajustan en varias líneas y nunca
se truncan.

## 10. Header saturado en móvil
**Visto en:** Surtidor pone 3 teléfonos en la barra superior, más carrito en $0.00 y "Pagar"
sin productos.
**Regla:** el header móvil lleva solo el logo, el menú y el botón de WhatsApp. No hay carrito ni
login mientras no exista e-commerce.

## 11. Los enlaces sacan al usuario de la marca
**Visto en:** Porcelanosa manda a dominios externos de sus submarcas.
**Regla:** los logos de las marcas **no** son enlaces fuera del sitio en la versión provisional.
Son prueba de confianza, no navegación. En el sitio grande llevarán a la página de esa marca
dentro del catálogo.

## Lo que sí vale la pena copiar
- **Interceramic:** navegar por *espacios* (baño, cocina, exterior) y los pilares de confianza
  (garantía, servicio).
- **Porcelanosa:** el tono aspiracional y breve, la fotografía grande de espacios y el
  localizador de tiendas presente en varios puntos clave.
- **Lamosa:** el enlace "saltar al contenido" y la entrada por intención (quiz, visualizador),
  que serán ideas para el sitio grande con IA.
- **Surtidor:** las señales de confianza concretas en el hero ("21+ sucursales", "Desde 1960").
  Pide al cliente sus cifras reales (años, sucursales, marcas) y úsalas.
