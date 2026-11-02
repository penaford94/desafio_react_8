# 🍕 Pizzería Mamma Mía — Hito 7

Aplicación desarrollada con React y Vite para el desafío **React Router II** de Desafío Latam. Este hito incorpora rutas protegidas y una sesión simulada mediante Context API, junto con la consulta del detalle de cada pizza utilizando parámetros de la URL.

## Tecnologías

- JavaScript y React.
- Vite.
- React Router DOM 6.
- Context API y hooks: `useState`, `useContext`, `useEffect` y `useParams`.
- Bootstrap 5 y React Bootstrap.
- Fetch API y `AbortController`.

## Funcionalidades implementadas

### Catálogo y detalle de pizzas

- Consulta del catálogo desde la API de pizzas.
- Enlace **Ver más** hacia `/pizza/:id` desde cada tarjeta.
- Obtención del identificador mediante `useParams` y consulta de la pizza correspondiente.
- Visualización de imagen, nombre, descripción, ingredientes y precio.
- Manejo de estados de carga y error, incluyendo respuestas HTTP incorrectas.
- Cancelación de solicitudes al desmontar el componente o cambiar el identificador.

### Sesión simulada y navegación

- `UserContext` comparte el estado de sesión entre las páginas y el menú.
- `UserProvider` inicia `token` en `true`, según lo solicitado en el hito.
- `logout()` cambia el estado a `false`; `login()` lo cambia a `true`.
- Con sesión activa, el menú muestra **Profile** y **Logout**.
- Sin sesión activa, muestra **Login** y **Register**.
- **Home** y el total del carrito permanecen visibles en ambos casos.
- El botón de cerrar sesión del perfil también utiliza `logout()`.

### Rutas protegidas

| Ruta | Comportamiento |
| --- | --- |
| `/` | Catálogo público de pizzas. |
| `/pizza/:id` | Detalle público de una pizza. |
| `/cart` | Carrito público; el pago requiere sesión activa. |
| `/profile` | Requiere sesión; sin ella redirige a `/login`. |
| `/login` | Disponible sin sesión; con sesión redirige a `/`. |
| `/register` | Disponible sin sesión; con sesión redirige a `/`. |
| `/404` y rutas desconocidas | Muestran la página de error 404. |

Las redirecciones se implementan con `Navigate` y la propiedad `replace`.

### Carrito y pago simulado

- Estado compartido mediante `CartContext` y `CartProvider`.
- Permite agregar pizzas, aumentar o disminuir cantidades y eliminar productos.
- Calcula subtotales y total a partir de los productos del carrito.
- Presenta los valores con formato numérico chileno (`es-CL`).
- Deshabilita **Pagar** cuando no hay sesión o el carrito está vacío.
- `handlePay` comprueba ambas condiciones antes de continuar.
- Al simular el pago, muestra una alerta de éxito de Bootstrap y ejecuta `clearCart()`.
- Al vaciarse el carrito, el total se actualiza automáticamente a cero, incluido el del menú.

### Formularios

- Login comprueba campos obligatorios y una contraseña de al menos seis caracteres. Al superar esas validaciones, activa la sesión simulada y la ruta redirige al Home.
- Register comprueba campos obligatorios, longitud mínima de contraseña y coincidencia de contraseñas; muestra mensajes de validación y de éxito.

## Instalación y ejecución

Se requiere Node.js y npm compatibles con la versión de Vite declarada en `package.json`.

1. Clonar el repositorio o descomprimir el proyecto.
2. Abrir una terminal en la carpeta que contiene `package.json`.
3. Instalar las dependencias:

   ```bash
   npm ci
   ```

4. Iniciar por separado la API de pizzas en el puerto `5000`. El backend no está incluido en este proyecto.
5. Ejecutar el frontend:

   ```bash
   npm run dev
   ```

6. Abrir la dirección indicada por Vite en la terminal.

### Endpoints utilizados

| Método | URL | Uso |
| --- | --- | --- |
| GET | `http://localhost:5000/api/pizzas` | Obtener el catálogo. |
| GET | `http://localhost:5000/api/pizzas/:id` | Obtener una pizza por su identificador. |

La API debe estar disponible y permitir las solicitudes desde el origen del frontend.

## Organización del código

| Ubicación | Responsabilidad |
| --- | --- |
| `src/main.jsx` | Configura los proveedores y `BrowserRouter`. |
| `src/App.jsx` | Define las rutas y sus condiciones de acceso. |
| `src/components/` | Componentes reutilizables, como `Navigation`, `CardPizza` y `Header`. |
| `src/pages/` | Páginas del catálogo, detalle, carrito, acceso, registro, perfil y error. |
| `src/context/` | Contextos y proveedores de usuario y carrito. |
| `src/utils/` | Utilidades, incluido el formato de precios. |

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run lint` | Ejecuta el análisis estático con ESLint. |
| `npm run build` | Genera la compilación de producción en `dist/`. |
| `npm run preview` | Permite revisar localmente la compilación generada. |

## Comprobación manual

1. Iniciar la aplicación: deben aparecer Profile y Logout, ya que `token` comienza en `true`.
2. Intentar acceder a Login o Register con sesión activa: debe redirigir al Home.
3. Abrir distintas pizzas con **Ver más** y comprobar que el detalle corresponde al ID de la URL.
4. Agregar productos y modificar sus cantidades; verificar subtotales y total.
5. Pagar con sesión activa: debe aparecer el mensaje de éxito, vaciarse el carrito y quedar el total en cero.
6. Cerrar sesión desde el perfil: debe redirigir a Login y actualizar las opciones del menú.
7. Agregar productos sin sesión: el botón Pagar debe permanecer deshabilitado.
8. Completar Login con campos no vacíos y una contraseña de al menos seis caracteres: debe activarse la sesión simulada y volver al Home.

## Alcance de la simulación

La sesión y el carrito se mantienen en memoria. Una recarga completa reinicia `token` en `true` y el carrito en una lista vacía.

La autenticación utiliza un booleano: no valida credenciales contra un servidor. El registro muestra una confirmación local, pero no almacena cuentas ni inicia sesión. El perfil muestra un correo de ejemplo y el pago no realiza transacciones reales.
