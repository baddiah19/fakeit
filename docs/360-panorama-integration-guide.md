# Guía: Integrar visor 360° en Fakeit

Esta guía describe cómo llevar la librería de imágenes 360° (react-pannellum-next) desde **immersive-scene-demo** a **fakeit**, manteniendo la UI pulida de fakeit (IntroModal, DemoPanel, overlays, NavigationArrows) y sustituyendo la imagen 2D pannable por un panorama 360° real.

---

## 1. Objetivo

- **Fakeit** hoy: imagen plana (`PanoramaStage` + `Image`) movida con pan/gestos; hotspots en coords 2D (x, y).
- **Meta:** Usar **react-pannellum-next** para mostrar un panorama equirectangular 360° con hotspots en pitch/yaw, manteniendo IntroModal, DemoPanel (title, description, media/ReactPlayer), NavigationArrows y overlays (vignette, etc.).

---

## 2. Resumen de diferencias

| Aspecto | Fakeit (actual) | Immersive-scene-demo |
|--------|------------------|----------------------|
| Imagen | Flat `Image`, pan con translate | PanoramaViewer 360° (Pannellum) |
| Hotspots | x, y normalizados → posición en pantalla | pitch, yaw (grados) → marcadores en la esfera |
| Store | panX, panY, activeHotspotId, panelOpen | activeHotspotId, panelOpen (sin pan) |
| UI extra | IntroModal, overlays, NavigationArrows | Solo DemoPanel |

---

## 3. Pasos de implementación

### Fase 1: Dependencias y tipos

| # | Tarea | Checkpoint |
|---|--------|------------|
| 1.1 | Instalar `react-pannellum-next` en fakeit (`npm install react-pannellum-next --legacy-peer-deps` por React 19). | [x] |
| 1.2 | Añadir declaración de tipos: crear `types/react-pannellum-next.d.ts` con `declare module "react-pannellum-next"` (PanoramaViewerProps, HotspotProps). | [x] |
| 1.3 | Importar CSS del visor donde se monte: `import "react-pannellum-next/dist/index.css"`. | [x] |

### Fase 2: Datos (hotspots con pitch/yaw)

| # | Tarea | Checkpoint |
|---|--------|------------|
| 2.1 | En `data/hotspots.ts`: añadir `xToYaw(x)`, `yToPitch(y)` (fórmulas: yaw = (x - 0.5) * 360, pitch = (0.5 - y) * 180). | [x] |
| 2.2 | Añadir `getHotspotPitchYaw(h)` que devuelva `{ pitch, yaw }` (usar h.pitch/h.yaw si existen, si no derivar de h.x/h.y). | [x] |
| 2.3 | Opcional: añadir campos opcionales `pitch?` y `yaw?` al tipo `Hotspot` para ajustar posiciones a mano. | [x] |

Mantener el modelo actual de fakeit: `id`, `title`, `description`, `x`, `y`, `media`. DemoPanel no cambia.

### Fase 3: Componente 360° y sustitución del stage

| # | Tarea | Checkpoint |
|---|--------|------------|
| 3.1 | Crear componente `Panorama360View.tsx`: cargar `PanoramaViewer` con `dynamic(..., { ssr: false })`, recibir `imagePath` y lista de hotspots. | [x] |
| 3.2 | Dentro de Panorama360View: mapear hotspots a formato Pannellum (pitch, yaw con getHotspotPitchYaw; text: title; onClick → setActiveHotspot(id) + openPanel()). | [x] |
| 3.3 | En `SceneViewport`: sustituir `PanoramaStage` por `Panorama360View`; quitar lógica de pan/gestos para la imagen (el 360° se mueve con el visor). | [x] |
| 3.4 | En SceneViewport: quitar `HotspotLayer` en modo 360° (los marcadores los pinta Pannellum; clics ya conectados al store). | [x] |
| 3.5 | Mantener IntroModal, DemoPanel, NavigationArrows. Overlays (vignette, highlights): mantener como capas encima; si dependían de panX/panY, usar valores fijos o simplificar. | [x] |

### Fase 4: Store y navegación

| # | Tarea | Checkpoint |
|---|--------|------------|
| 4.1 | Store: mantener `activeHotspotId`, `panelOpen`, `setActiveHotspot`, `openPanel`, `closePanel`. panX/panY y setPanPosition pueden dejarse sin uso o eliminarse después. | [x] |
| 4.2 | NavigationArrows: siguen llamando a `onNavigate`; el padre actualiza hotspot activo y abre panel. Opcional después: usar API de Pannellum (lookAt) para girar cámara al hotspot. | [x] |

### Fase 5: Imagen y rutas

| # | Tarea | Checkpoint |
|---|--------|------------|
| 5.1 | Usar imagen equirectangular en `public/images/` (ej. reemplazar o añadir `office-panorama-360.jpg`). Apuntar `imagePath` del visor a esa ruta. Por ahora se usa `office-panorama.png`; para 360° real sustituir por una equirectangular. | [ ] |
| 5.2 | Opcional: si fakeit tendrá varias escenas/negocios, añadir `sceneConfig.ts` y `getSceneConfig(sceneId)` como en immersive; por ahora una sola escena está bien. | [ ] |

---

## 4. Orden sugerido de ejecución

1. Fase 1 (deps + tipos + CSS).
2. Fase 2 (hotspots pitch/yaw).
3. Fase 3.1–3.2 (crear Panorama360View).
4. Fase 3.3–3.5 (integrar en SceneViewport, quitar PanoramaStage y HotspotLayer para 360°, mantener UI).
5. Fase 4 (revisar store y NavigationArrows).
6. Fase 5 (imagen; sceneConfig si aplica).

---

## 5. Qué no tocar (conservar de fakeit)

- **DemoPanel**: mismo diseño, mismo uso de `title`, `description`, `media` (ReactPlayer).
- **IntroModal**, **NavigationArrows**.
- **Store**: misma API de `activeHotspotId`, `panelOpen`, `openPanel`, `closePanel`, `setActiveHotspot`.
- Estilos de overlays; solo adaptar si dependían de pan.

---

## 6. Referencia rápida (código immersive)

- Visor: `immersive-scene-demo/src/components/PanoramaScene.tsx` (dynamic PanoramaViewer, getSceneConfig, getHotspotPitchYaw, onClick → store).
- Datos: `immersive-scene-demo/src/data/hotspots.ts` (xToYaw, yToPitch, getHotspotPitchYaw).
- Tipos: `immersive-scene-demo/src/types/react-pannellum-next.d.ts`.

---

## 7. Estado de la implementación

- **Fases 1–4** aplicadas en fakeit: dependencias, tipos, hotspots con pitch/yaw, `Panorama360View`, `SceneViewport` usando el visor 360°, IntroModal/DemoPanel/NavigationArrows y vignette estático conservados.
- **Pendiente:** Sustituir `public/images/office-panorama.png` por una imagen **equirectangular** para un 360° correcto (la actual puede verse distorsionada).
- Build: `npm run build` pasa. Ruta `/cafe` muestra el visor 360° con hotspots que abren el DemoPanel.
