# Calidad de imagen del panorama 360°

## Análisis

La pixelación puede deberse a **dos factores** (o a ambos):

### 1. Resolución de la imagen de origen

- El archivo actual `public/images/office-panorama.png` tiene ~2,2 MB.
- Para un equirectangular 360°, las resoluciones típicas recomendadas son:
  - **Mínimo aceptable:** 2048×1024 (2:1)
  - **Buena calidad:** 4096×2048
  - **Muy nítida:** 8192×4096
- Si la imagen tiene menos de **4096 px de ancho**, es normal que se vea pixelada a pantalla completa en el visor 360° y en la vista de oficina.

**Comprobar resolución:** abrir la imagen en cualquier editor o con `identify` (ImageMagick) / propiedades del archivo. Si el ancho es &lt; 4096 px, la solución principal es **sustituir por una versión en mayor resolución**.

### 2. Cómo se usa en la app

| Uso | Qué pasa |
|-----|----------|
| **Visor 360° (Pannellum)** | Carga la imagen por URL directa (`/images/office-panorama.png`). No hay redimensionado; se usa la imagen tal cual. La textura se estira a toda la vista. Si la fuente es baja resolución, se nota pixelado. |
| **Página /office (Next Image)** | `next/image` con `fill` y `sizes="(max-width: 768px) 100vw, 90vw"` puede servir versiones redimensionadas y con compresión. Para no perder detalle en esa página, se puede subir la calidad y/o evitar optimización para esta imagen. |

## Qué se puede hacer en código (sin cambiar la imagen)

1. **Página /office:** usar `quality={90}` (o 100) en `<Image>` y, si hace falta, `unoptimized` para esa imagen para que no se reduzca resolución.
2. **Visor 360°:** reducir el campo de visión inicial (hfov) hace que se muestre menos panorama a la vez, así que cada grado usa más píxeles y se ve algo más nítido (a cambio de ver menos “zoom out”). Opcional: pasar `initialHfov={80}` al visor si la librería lo permite.

## Solución definitiva (recomendada)

- **Sustituir** `office-panorama.png` por una versión en **mínimo 4096×2048** (idealmente 8192×4096 si el peso es aceptable).
- Formato: **JPEG** con calidad 85–90 suele dar buen equilibrio tamaño/calidad para fotos; PNG solo si necesitas transparencia o gráficos.
- Mantener relación **2:1** (ancho = 2 × alto) en el equirectangular.

Resumen: si la imagen de origen es baja resolución, la pixelación es sobre todo por la imagen en sí. Subir la resolución de la imagen es la forma de mejorar la nitidez de forma clara; los ajustes en código solo pueden suavizar un poco el resultado.
