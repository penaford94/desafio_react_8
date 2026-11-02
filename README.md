# 🍕 Pizzería Mamma Mía — Hito 8

Aplicación desarrollada con **React y Vite** para el cierre del proyecto Pizzería Mamma Mía de Desafío Latam. Este hito integra autenticación mediante **JWT**, consulta del perfil del usuario y envío del carrito al backend para simular una compra.

La implementación reemplaza el inicio de sesión, el registro y el pago simulados en el frontend por peticiones HTTP al backend de apoyo. Conserva el catálogo, el detalle de pizzas, el carrito compartido y las rutas protegidas de los hitos anteriores.

## Tecnologías

- JavaScript y React.
- Vite.
- React Router DOM 6.
- Context API y hooks: `useState`, `useContext`, `useEffect` y `useCallback`.
- Bootstrap 5 y React Bootstrap.
- Fetch API y `AbortController`.
- Backend de apoyo: Node.js, Express y JSON Web Tokens.

## Funcionalidades

### Autenticación con JWT

- `login()` envía email y contraseña a `POST /api/auth/login`.
- `register()` envía email y contraseña a `POST /api/auth/register`.
- Ambas operaciones almacenan el token JWT y el email devueltos por el backend en sus respectivos estados de `UserProvider`.
- El registro exitoso inicia sesión automáticamente, porque el backend devuelve un token.
- `logout()` elimina el token y el email del estado compartido.
- Los formularios validan campos obligatorios y contraseñas de al menos seis caracteres.
- El registro también comprueba que ambas contraseñas coincidan.
- Los formularios muestran errores y deshabilitan el envío mientras la petición está en curso.

### Perfil del usuario

- `getProfile()` consulta `GET /api/auth/me` desde el contexto de usuario.
- La petición envía el JWT en el encabezado `Authorization`.
- La página muestra el email obtenido del backend y un botón para cerrar sesión.
- La consulta se cancela al desmontar la página mediante `AbortController`.
- Si el servidor rechaza el token con un estado `401`, se elimina la sesión local.

### Navegación y rutas protegidas

- Con sesión activa, el navbar muestra **Profile** y **Logout**.
- Sin sesión, muestra **Login** y **Register**.
- **Home** y el total del carrito permanecen visibles en ambos casos.
- El botón Logout del navbar utiliza el mismo método del contexto que el perfil.
- Las redirecciones utilizan `Navigate` con `replace`.

| Ruta | Comportamiento |
| --- | --- |
| `/` | Catálogo público de pizzas. |
| `/pizza/:id` | Detalle público de la pizza indicada en la URL. |
| `/cart` | Carrito público; el pago requiere sesión activa. |
| `/profile` | Requiere sesión; sin ella redirige a `/login`. |
| `/login` | Sin sesión muestra el formulario; con sesión redirige a `/`. |
| `/register` | Sin sesión muestra el formulario; con sesión redirige a `/`. |
| `/404` y rutas desconocidas | Muestran la página de error 404. |

Las condiciones de React controlan la navegación. El backend verifica el JWT para autorizar el acceso a los recursos protegidos.

### Catálogo y detalle de pizzas

- Obtención del catálogo desde la API.
- Enlace **Ver más** hacia `/pizza/:id`.
- Consulta del detalle mediante el identificador obtenido con `useParams`.
- Visualización de imagen, nombre, descripción, ingredientes y precio.
- Estados de carga y error, y cancelación de consultas al desmontar el componente.

### Carrito y checkout

- `CartContext` comparte los productos y el total.
- Permite agregar pizzas, aumentar o disminuir cantidades y eliminar productos.
- Calcula subtotales y total con formato numérico chileno (`es-CL`).
- El botón **Pagar** se deshabilita si no hay sesión, el carrito está vacío o se está procesando una compra.
- `handlePay()` envía `POST /api/checkouts` con el JWT y el cuerpo `{ cart: [...] }`.
- Los controles de cantidad y eliminación se deshabilitan mientras se procesa el checkout.
- Después de una respuesta exitosa, muestra una confirmación y ejecuta `clearCart()`.
- Si la petición falla, muestra un error y conserva los productos.
- Ante un `401`, elimina la sesión local.

## Requisitos previos

- Node.js y npm.
- Una versión de Node compatible con las dependencias del proyecto. El archivo de bloqueo del frontend declara para Vite: `^20.19.0 || >=22.12.0`.
- El proyecto frontend y el backend de apoyo descomprimidos en carpetas separadas.

Comprueba las versiones instaladas:

```bash
node -v
npm -v
```

## Instalación y ejecución local

El frontend y el backend deben ejecutarse simultáneamente en **dos terminales diferentes**. El backend se obtiene de `Material de apoyo - Backend Pizzas(1).zip` y se instala por separado.

Estructura sugerida:

```text
pizzeria/
├── desafio_react_8-main/
└── simple-api-backend-nodejs-express-fs-json-jwt-main/
```

### 1. Terminal del backend

Desde la carpeta `pizzeria`:

```bash
cd simple-api-backend-nodejs-express-fs-json-jwt-main
npm ci
npm run dev
```

El script de desarrollo ejecuta `nodemon index.js`. El servidor utiliza el puerto `5000` por defecto y debe mostrar:

```text
Server is running on port http://localhost:5000
```

El backend adjunto incluye un archivo `.env` con la variable `JWT_SECRET`. Si falta, crea el archivo junto a su `package.json`:

```env
JWT_SECRET=reemplaza_esto_por_una_clave_larga_para_pruebas_locales
```

El secreto se utiliza únicamente en el backend; no debe incorporarse al frontend ni publicarse en el repositorio.

Ejecuta el backend desde su propia carpeta, porque utiliza rutas relativas para acceder a `db/users.json`.

Comprueba que responde abriendo:

[http://localhost:5000/api/pizzas](http://localhost:5000/api/pizzas)

Debe devolver un arreglo JSON con las pizzas. Mantén esta terminal abierta.

### 2. Terminal del frontend

En otra terminal, desde la carpeta `pizzeria`:

```bash
cd desafio_react_8-main
npm ci
npm run dev
```

Abre la dirección que indique Vite, habitualmente:

[http://localhost:5173](http://localhost:5173)

`npm ci` instala las dependencias fijadas en cada `package-lock.json`. Si informa una inconsistencia con `package.json`, revisa el error antes de actualizar el archivo de bloqueo con `npm install`.

Los dos proyectos utilizan `npm run dev`, pero cada terminal ejecuta el script de su propia carpeta. Para detener un servidor, presiona `Ctrl + C` en su terminal.

### Configuración de la API

Las peticiones de autenticación, perfil y checkout utilizan la dirección base definida en `src/services/api.js`:

```js
const API_URL = "http://localhost:5000/api";
```

Las consultas existentes de catálogo y detalle también apuntan a `http://localhost:5000`. Si cambias el puerto del backend, actualiza todas estas referencias.

El backend adjunto ya configura CORS para permitir las peticiones desde el frontend local.

## Cuenta de prueba

El backend de apoyo incluye estas credenciales en `db/users.json`:

```text
Email: test@test.com
Contraseña: 123123
```

También puedes registrar una cuenta con otro correo e iniciar sesión con ella. Un correo existente produce un error de registro.

## Endpoints utilizados

Todas las rutas de la tabla tienen como origen `http://localhost:5000`.

| Método | Ruta | Uso | Requiere JWT |
| --- | --- | --- | --- |
| GET | `/api/pizzas` | Obtener catálogo. | No |
| GET | `/api/pizzas/:id` | Obtener detalle de una pizza. | No |
| POST | `/api/auth/login` | Iniciar sesión. | No |
| POST | `/api/auth/register` | Registrar una cuenta e iniciar sesión. | No |
| GET | `/api/auth/me` | Obtener perfil del usuario. | Sí |
| POST | `/api/checkouts` | Simular una compra. | Sí |

**La ruta correcta del checkout es `/api/checkouts`, en plural.** El ejemplo en singular que aparece en una parte del enunciado no coincide con el backend adjunto.

### Login y registro

Cuerpo de la petición:

```json
{
  "email": "test@test.com",
  "password": "123123"
}
```

Respuesta exitosa, con un token ilustrativo:

```json
{
  "email": "test@test.com",
  "token": "JWT_GENERADO_POR_EL_BACKEND"
}
```

La confirmación de contraseña se valida en el frontend y no se envía al servidor.

### Peticiones protegidas

El perfil y el checkout envían el token real recibido al autenticarse:

```http
Authorization: Bearer <token>
```

### Checkout

Cuerpo de ejemplo:

```json
{
  "cart": [
    {
      "id": "P001",
      "name": "napolitana",
      "price": 5950,
      "img": "URL_DE_LA_IMAGEN",
      "count": 2
    }
  ]
}
```

El backend devuelve una confirmación junto con los datos recibidos y el usuario autenticado. El frontend vacía el carrito únicamente después de una respuesta exitosa.

## Organización del código

| Ubicación | Responsabilidad |
| --- | --- |
| `src/main.jsx` | Configura `UserProvider`, `CartProvider`, `BrowserRouter` y Strict Mode. |
| `src/App.jsx` | Define rutas y condiciones de acceso. |
| `src/services/api.js` | Centraliza las peticiones nuevas, JSON, autorización y errores HTTP. |
| `src/context/UserContext.jsx` | Crea el contexto de usuario. |
| `src/context/UserProvider.jsx` | Administra token, email, login, registro, logout y consulta del perfil. |
| `src/context/CartContext.jsx` | Crea el contexto del carrito. |
| `src/context/CartProvider.jsx` | Administra productos, cantidades, total y vaciado del carrito. |
| `src/components/Navigation.jsx` | Muestra la navegación según la sesión y permite cerrarla. |
| `src/pages/Login.jsx` | Valida y envía el formulario de acceso. |
| `src/pages/Register.jsx` | Valida y envía el formulario de registro. |
| `src/pages/Profile.jsx` | Consulta y muestra el perfil autenticado. |
| `src/pages/Cart.jsx` | Muestra el pedido y procesa el checkout. |
| `src/pages/Home.jsx` y `src/pages/Pizza.jsx` | Consultan el catálogo y el detalle. |
| `src/utils/formatCurrency.js` | Aplica formato numérico chileno a los precios. |

## Manejo de errores

`apiRequest()` comprueba `response.ok` y lanza un error cuando el backend devuelve una respuesta HTTP no exitosa. `fetch()` por sí solo no rechaza una promesa por recibir estados como `400`, `401` o `500`.

Los componentes capturan los errores con `try/catch` y muestran mensajes mediante alertas de Bootstrap. Los estados `loading` y `paying` se restablecen en `finally`.

La función compartida espera respuestas JSON, de acuerdo con las rutas del backend de apoyo.

## Comandos del frontend

| Comando | Descripción |
| --- | --- |
| `npm ci` | Instala las dependencias del archivo de bloqueo. |
| `npm run dev` | Inicia Vite en modo desarrollo. |
| `npm run lint` | Ejecuta el análisis estático con ESLint. |
| `npm run build` | Genera la compilación de producción en `dist/`. |
| `npm run preview` | Permite revisar localmente la compilación generada. |

Para revisar la compilación:

```bash
npm run build
npm run preview
```

El backend debe continuar activo para que funcionen las peticiones de la aplicación.

## Verificación manual

Con ambos servidores activos:

1. Comprueba que el catálogo carga y que **Ver más** abre el detalle correcto.
2. Sin sesión, confirma que el menú muestra **Login** y **Register**.
3. Abre `/profile` sin sesión: debe redirigir a `/login`.
4. Intenta enviar formularios vacíos o contraseñas de menos de seis caracteres: deben mostrarse errores de validación.
5. Inicia sesión con las credenciales de prueba: debe redirigir al Home y mostrar **Profile** y **Logout**.
6. Abre Profile: debe mostrar el email obtenido de `/api/auth/me`.
7. Cierra sesión desde el perfil y comprueba la redirección a Login.
8. Intenta entrar con credenciales incorrectas de longitud válida: debe aparecer el error del backend y mantenerse la sesión cerrada.
9. Registra una cuenta nueva: debe iniciarse sesión. Después, cierra sesión y accede con esa cuenta.
10. Intenta registrar el mismo correo nuevamente: debe aparecer el error correspondiente.
11. Agrega pizzas al carrito y comprueba cantidades, subtotales y total del navbar.
12. Sin sesión o con carrito vacío, confirma que **Pagar** permanece deshabilitado.
13. Con sesión y productos, paga: debe enviarse el carrito, aparecer una confirmación y quedar el total en cero.
14. Para comprobar el manejo de errores, agrega productos con sesión activa, detén el backend e intenta pagar: debe aparecer un error y conservarse el carrito. Reinicia después el backend.
15. Comprueba que Logout del navbar elimina la sesión y actualiza sus opciones.
16. Ejecuta `npm run lint` y `npm run build` y revisa sus resultados.

En las herramientas del navegador, sección **Network / Red**, verifica las peticiones de autenticación, el header `Authorization` del perfil y checkout, y el cuerpo `{ cart: [...] }` de la compra.

## Alcance y persistencia

- El token, el email y el carrito se mantienen en memoria. Una recarga completa cierra la sesión local y vacía el carrito.
- Esta implementación no persiste la sesión en `localStorage`.
- Las cuentas registradas se guardan en `db/users.json` del backend de apoyo.
- El checkout es una simulación: no realiza cobros ni almacena órdenes de compra.
- Cerrar sesión elimina las credenciales del estado de React; no revoca el JWT en el servidor.
- El backend es material educativo: guarda contraseñas sin hash y emite tokens sin una expiración explícita. Requiere cambios antes de utilizarse en producción.
