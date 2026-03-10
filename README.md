# IT's Possible — E-Commerce Frontend

Desarrollado por [Jonatan Porteiro](https://www.linkedin.com/in/jonatan-porteiro/)

E-Commerce de una tienda de informática que comercializa PCs de escritorio, notebooks, consolas y más. Proyecto full-stack compuesto por este repositorio (frontend) y la [API REST](https://github.com/jporteiro2020/E-Commerce-API) (backend).

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 + Vite 6 |
| Ruteo | React Router v6 |
| Estado global | Redux Toolkit + React-Redux |
| Formularios | Formik + Yup |
| Mapas | Leaflet + React-Leaflet (OpenStreetMap, sin token) |
| Estilos | CSS Modules propios + variables CSS |
| HTTP | Fetch API nativo |

---

## Funcionalidades implementadas

### Catálogo
- Listado de productos por categoría (PC Escritorio, Notebooks, Consolas, SubCategorías)
- Buscador de productos en tiempo real
- Vista de detalle de producto

### Autenticación
- Registro de usuario
- Inicio de sesión con JWT (8 h de expiración)
- Recuperación de contraseña (UI lista, endpoint pendiente en backend)
- Rutas protegidas (`/perfil`, `/mis-ordenes`) — redirigen a `/login` si no hay sesión
- Rutas públicas (`/login`, `/registro`, `/recuperar`) — redirigen a `/` si ya hay sesión activa

### Perfil de usuario
- Vista de datos en modo lectura
- Edición inline de nombre, apellido, dirección, email y teléfono
- Cambio de contraseña
- Eliminación de cuenta con confirmación

### Carrito y Checkout
- Carrito persistido en servidor para usuarios autenticados, en Redux para invitados
- Actualización optimista de cantidades
- Checkout autenticado → crea orden en DB
- Checkout de invitado → genera orden con token de seguimiento (sin registro previo)
- Seguimiento de orden por tracking token (accesible desde URL o buscador)

### Órdenes
- Listado de mis órdenes con estado (Pendiente de pago / Pagada / Cancelada)
- Detalle de cada orden con desglose de productos

### Mapa de sucursales
- Sucursal 1: Juan Paullier 2378
- Sucursal 2: Demóstenes 3532
- Mapa interactivo con Leaflet + OpenStreetMap (sin necesidad de API token)

---

## Requisitos previos

- Node.js 18 o superior
- La [API REST](https://github.com/jporteiro2020/E-Commerce-API) corriendo localmente en el puerto 4000

---

## Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env y ajustar VITE_API_URL si la API corre en otro puerto

# 3. Modo desarrollo (hot reload)
npm run dev
# → http://localhost:5173

# 4. Build de producción
npm run build

# 5. Preview del build
npm run preview
```

---

## Variables de entorno

```env
VITE_API_URL=http://localhost:4000
```

---

## Rutas disponibles

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Inicio — bienvenida e info de sucursales | Público |
| `/tienda` | Catálogo completo de productos | Público |
| `/busqueda/:query` | Resultados de búsqueda | Público |
| `/pcEscritorio` | Categoría PC Escritorio | Público |
| `/notebooks` | Categoría Notebooks | Público |
| `/consolas` | Categoría Consolas | Público |
| `/consolasSubCat/:categoria` | Subcategorías de consolas | Público |
| `/detalle/:idProducto` | Detalle de producto | Público |
| `/sucursal1` | Mapa y datos de Sucursal 1 | Público |
| `/sucursal2` | Mapa y datos de Sucursal 2 | Público |
| `/login` | Inicio de sesión | Solo no autenticados |
| `/registro` | Registro de nuevo usuario | Solo no autenticados |
| `/recuperar` | Recuperar contraseña | Solo no autenticados |
| `/carrito` | Carrito de compras | Público |
| `/checkout-invitado` | Checkout sin registro | Público |
| `/seguimiento` | Seguimiento de orden por token | Público |
| `/seguimiento/:token` | Seguimiento directo por token | Público |
| `/perfil` | Datos del usuario autenticado | 🔒 Requiere sesión |
| `/mis-ordenes` | Listado de órdenes del usuario | 🔒 Requiere sesión |
| `/mis-ordenes/:idOrden` | Detalle de una orden | 🔒 Requiere sesión |

---

## Contacto

- [LinkedIn](https://www.linkedin.com/in/jonatan-porteiro/)
- Email: jonatan.porteiro@protonmail.com


## Presentación:

Este proyecto está pensado en un E-Commerce de una tienda de informática, venta de equipamientos tales como Computadoras, consolas, Notebooks, etc.
Dicho proyecto está hecho con React, y tengo planificado modificar el diseño y utilizar TailwindCSS.

En esta demo puedes visualizar todos los productos, filtrar por categoría a través del menú desplegable, visualizar las descripciones de los productos, y a su vez se puede
buscar un producto en particular utilizando el buscador 🔍

Este proyecto depende de la API que está publicada en este link: [API](https://github.com/jporteiro2020/E-Commerce-API)

## Compatibilidad:

Este proyecto se ejecuta en Linux, Windows y MAC, siempre y cuando tengas instalado NodeJS.

## Modo de uso:

Como comentaba anteriormente, este proyecto depende de la [API](https://github.com/jporteiro2020/E-Commerce-API)
Así que para poder visualizar los datos deben seguir los pasos del otro repositorio.

Si ya cuentan con el proyecto de la [API](https://github.com/jporteiro2020/E-Commerce-API) funcionando, pueden seguir con el resto de los pasos.

Debemos abrir una terminal o CMD (dependiendo del sistema operativo en el que te encuentres), y debes posicionarte en la carpeta en la que hayas guardado este proyecto.
Una vez abierta la terminal y estando en la ruta del proyecto, y si es la primera vez que descargas este proyecto, debes ejecutar el siguiente comando:

- npm install

Con este comando vas a instalar todas las dependencias que se encuentran en el archivo package.json

Ahora bien, si ya culminaste con todos los pasos anteriores, estamos en condiciones de ver cuales son los scripts disponibles y probados:

- npm start - Con este comando lo que vamos a hacer es ejecutar el proyecto, y una vez que termine de encender podrás acceder a la web a través de la siguiente URL:
localhost:3000

Nota: Para poder detener el proceso simplemente deberías ejecutar la combinación de teclas ctrl + C

- npm build - Con este comando se va a "construir" todos los archivos HTML, CSS y JS correspondientes, y que quedarán disponibles para su deploy en un servidor.

## Rutas disponibles:

Si están utilizando un servidor en su máquina local, podrán acceder a las diferentes rutas usando la ip 127.0.0.1:4000/"<Nombre de la ruta>" o localhost:4000/"<Nombre de la ruta>"

Las rutas disponibles en este proyecto son las siguientes:

- / -> Con esta ruta podrán acceder a la página de inicio. Donde encontrarán información sobre la empresa ficticia. Uso: localhost:4000/
- /tienda -> Con esta ruta podrán acceder a todos los productos que se encuentran en la base de datos (Por ahora no se delimita la cantidad de productos a visualizar en cada
categoría, solamente se delimita en la sección Destacados a través de la base de datos, ya que es una vista). Uso: localhost:4000/tienda
- /sucursal1 -> Con esta ruta podremos acceder a la página donde se visualizará la información "ficticia" de la sucursal 1, se podrá ver la ubicación en el mapa, la dirección,
teléfono, horario, etc. Uso: localhost:4000/sucursal1
- /sucursal2 -> Con esta ruta podremos acceder a la página donde se visualizará la información "ficticia" de la sucursal 2, se podrá ver la ubicación en el mapa, la dirección,
teléfono, horario, etc. Uso: localhost:4000/sucursal2
- /login -> Con esta ruta podrán acceder a la página de login (la funcionalidad de login no está implementada en el frontend). Uso: localhost:4000/login
- /recuperar -> Con esta ruta podrán acceder a la página de recuperación de contraseña en el caso de que el usuario no recuerde su contraseña actual (Esta funcionalidad no está
implementada aún en el frontend). Uso: localhost:3000/recuperar
- /registro -> Con esta ruta podrán acceder a la página de registro de nuevo usuario (Esta funcionalidad no está implementada aún en el frontend). Uso: localhost:3000/registro
- /busqueda/:stringBusqueda -> Esta ruta los llevará a la página con los resultados de la búsqueda que hayan realizado, esta ruta recibe como parámetro el string del producto que
quieren buscar. Uso: localhost:3000/busqueda/consola
- /pcEscritorio -> Esta ruta los llevará a una página en la cual se mostrarán todos los productos con la categoría pcEscritorio. Uso: localhost:3000/pcEscritorio
- /notebooks -> Esta ruta los llevará a una página en la cual se mostrarán todos los productos con la categoría notebooks. Uso: localhost:3000/notebooks
- /consolas  -> Esta ruta los llevará a una página en la cual se mostrarán todos los productos con la categoría consolas. Uso: localhost:3000/consolas
- /consolasSubCat/:stringCategoria -> Esta ruta los llevará a una página en la cual se mostrarán todos los productos con la subcategoría de consolas,
esta ruta recibe como parámetro el nombre de la subcategoría, en el código esta ruta ya está harcodeada en el menú del Header. Uso: localhost:3000/consolasSubCat/xbox
- /detalle/:idProducto -> Esta ruta los llevará al detalle de cada producto, esta recibe como parámetro el ID del producto. Esta ruta ya está harcodeada en el código.
Se genera automáticamente cuando se listan los productos que recibimos del servidor.

## Contacto:

Si tienen alguna duda o alguna sugerencia, pueden contactarme:

- [LinkedIn](https://www.linkedin.com/in/jonatan-porteiro/)
- Email: jonatan.porteiro@protonmail.com
