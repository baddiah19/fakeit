# Deploy en Vercel

**Nombre del proyecto:** AI Demo Portal  
**URL objetivo:** `ai-demo-portal.vercel.app` (o el dominio que configures).

## Cambiar nombre y URL en Vercel

1. Entrá al [dashboard de Vercel](https://vercel.com/dashboard) y abrí el proyecto (p. ej. **fakeit**).
2. **Settings** → **General** → **Project Name**.
3. Cambiá el nombre a **`ai-demo-portal`** (solo minúsculas, guiones; sin espacios).
4. Guardá. La URL de producción pasará a ser **`https://ai-demo-portal.vercel.app`** (o `https://ai-demo-portal-<tu-equipo>.vercel.app`).
5. Si ya tenías el proyecto linkeado con la CLI, no hace falta hacer nada local; los próximos `vercel` o `vercel --prod` seguirán desplegando a ese proyecto.

## Requisitos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio en GitHub, GitLab o Bitbucket (recomendado) o uso de Vercel CLI

## Opción 1: Deploy desde el dashboard (recomendado)

1. **Sube el código a Git**  
   Asegúrate de que el proyecto esté en un repo (GitHub, etc.) y que los cambios estén pusheados.

2. **Conecta con Vercel**  
   - Entra en [vercel.com](https://vercel.com) e inicia sesión.  
   - Click en **Add New…** → **Project**.  
   - Importa el repositorio (conectar con GitHub/GitLab si hace falta).

3. **Configuración del proyecto**  
   Vercel detecta Next.js automáticamente. Revisa:
   - **Framework Preset:** Next.js  
   - **Root Directory:** `./` (o la carpeta del monorepo si aplica)  
   - **Build Command:** `npm run build` (por defecto)  
   - **Output Directory:** lo que Next use por defecto (no hace falta tocar)  
   - **Install Command:** `npm install`

4. **Variables de entorno**  
   Si en el futuro usas variables (API keys, etc.), añádelas en **Settings → Environment Variables**. Para este proyecto no son necesarias de inicio.

5. **Deploy**  
   Click en **Deploy**. Cada push a la rama principal (p. ej. `main`) generará un nuevo deploy.

---

## Opción 2: Deploy con Vercel CLI

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Desde la raíz del proyecto**
   ```bash
   cd c:\Copilot\proyectos\demoworld\fakeit
   vercel
   ```

3. **Seguir el asistente**
   - Login si lo pide.
   - Link to existing project? **No** (primera vez) o **Yes** si ya tienes el proyecto.
   - Project name: por ejemplo `fakeit`.
   - Directory: `./` (Enter).
   - Override settings? **No** (usa los detectados para Next.js).

4. **Deploy a producción**
   ```bash
   vercel --prod
   ```

---

## Configuración incluida en el repo

- **`vercel.json`**  
  - `framework`: `nextjs` para que Vercel trate el proyecto como Next.js (build y output correctos).  
  - `installCommand`: `npm install --legacy-peer-deps` para evitar que el install falle por peer dependencies (p. ej. `react-pannellum-next` con React 19).

## Errores frecuentes

### "Error: Command \"npm install\" exited with 1"
Ya está resuelto con `installCommand` en `vercel.json`. Si volviera a fallar, en el proyecto de Vercel → **Settings** → **General** → **Install Command** poned `npm install --legacy-peer-deps`.

### "Failed to connect baddiah19/fakeit to project"
Es un tema de permisos o visibilidad del repo en GitHub:
- Si el repo es **privado**: en GitHub → **Settings** → **Integrations** → **Vercel** (o en [vercel.com/account](https://vercel.com/account) → **Git Integrations**) asegurate de que Vercel tenga acceso al repo `baddiah19/fakeit`.
- Comprobá que el nombre del repo sea exactamente `baddiah19/fakeit` y que la cuenta de Vercel esté autorizada para esa org/user en GitHub.
- Mientras tanto podés seguir desplegando con la CLI (`vercel` o `vercel --prod`) sin conectar Git; cada deploy sube el código actual.

### "No framework detected"
Con `vercel.json` y `"framework": "nextjs"` Vercel ya no usa la detección automática y usa Next.js directamente.

## Notas

- **Imágenes:** Las de `public/` se sirven en la URL de Vercel. Las de Unsplash ya están permitidas en `next.config.ts` (`remotePatterns`).
- **Rutas:** Tras el deploy tendrás `/`, `/cafe`, `/classroom`, `/construction`, `/office`, etc.
- **Build:** El comando `npm run build` ya se ha comprobado localmente; si falla en Vercel, revisa los logs en el dashboard.
