const BASE_URL = import.meta.env.VITE_API_URL;

// ─── Helpers ────────────────────────────────────────────────────────────────

async function fetchJSON(url) {
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  const json = await response.json();
  return json.data;
}

async function fetchAuthJSON(url, token) {
  const response = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  const json = await response.json();
  return json.data;
}

async function postJSON(url, body, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (!response.ok) throw Object.assign(new Error(json.data ?? 'Error'), { status: response.status, data: json });
  return json;
}

async function putJSON(url, body, token) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (!response.ok) throw Object.assign(new Error(json.data ?? 'Error'), { status: response.status, data: json });
  return json;
}

async function deleteJSON(url, body, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (!response.ok) throw Object.assign(new Error(json.data ?? 'Error'), { status: response.status, data: json });
  return json;
}

// ─── Productos (públicos) ────────────────────────────────────────────────────

export const getDestacados = () =>
  fetchJSON(`${BASE_URL}/obtProdDestacado`);

export const getProductosPC = () =>
  fetchJSON(`${BASE_URL}/obtProductosPC`);

export const getProductosNotebooks = () =>
  fetchJSON(`${BASE_URL}/obtProductosNot`);

export const getProductosConsolas = () =>
  fetchJSON(`${BASE_URL}/obtProductosCons`);

export const getProductosConsSubCat = (subCat) =>
  fetchJSON(`${BASE_URL}/obtProductosConsSubCat/?subCat=${encodeURIComponent(subCat)}`);

export const buscarProductos = (query) =>
  fetchJSON(`${BASE_URL}/obtProductos/?busqueda=${encodeURIComponent(query)}`);

export const getProductoById = (id) =>
  fetchJSON(`${BASE_URL}/obtProducto/?id=${id}`);

// ─── Auth ────────────────────────────────────────────────────────────────────

/** Retorna { data: { token } } en caso de éxito */
export const loginAPI = (email, password) =>
  postJSON(`${BASE_URL}/login`, { email, password });

/** Campos requeridos: nombre, apellido, direccion, email, telefono, password, repetirPassword */
export const registroAPI = (userData) =>
  postJSON(`${BASE_URL}/registro`, userData);

/** Actualizar datos personales (requiere token) */
export const actualizarDatosUsuario = (datos, token) =>
  putJSON(`${BASE_URL}/actualizarDatosUsuario`, datos, token);

/** Cambiar contraseña (requiere token) — body: { contrasenia, nuevoPass } */
export const actualizarPassUsuario = (contrasenia, nuevoPass, token) =>
  putJSON(`${BASE_URL}/actualizarPassUsuario`, { contrasenia, nuevoPass }, token);

/** Eliminar cuenta (requiere token) — body: { contrasenia } */
export const eliminarUsuario = (contrasenia, token) =>
  deleteJSON(`${BASE_URL}/eliminarUsuario`, { contrasenia }, token);

// ─── Suscripción ─────────────────────────────────────────────────────────────

/** Suscribirse al newsletter */
export const suscribirAPI = (nombre, email) =>
  postJSON(`${BASE_URL}/suscribir`, { nombre, email });

/** Desuscribirse del newsletter */
export const desuscribirAPI = (email) =>
  deleteJSON(`${BASE_URL}/suscribir`, { email });

// ─── Órdenes (requieren token) ────────────────────────────────────────────────

/** Obtener datos del perfil del usuario autenticado */
export const getPerfilAPI = (token) =>
  fetchAuthJSON(`${BASE_URL}/usuario/perfil`, token);

/** Crear orden desde el carrito del servidor */
export const checkout = (token) =>
  postJSON(`${BASE_URL}/ordenes/checkout`, {}, token);

/** Listar mis órdenes */
export const getMisOrdenes = (token) =>
  fetchAuthJSON(`${BASE_URL}/ordenes/mis-ordenes`, token);

/** Detalle de una orden */
export const getDetalleOrden = (idOrden, token) =>
  fetchAuthJSON(`${BASE_URL}/ordenes/${idOrden}`, token);

/** Confirmar pago de una orden */
export const confirmarPago = (idOrden, token) =>
  postJSON(`${BASE_URL}/ordenes/${idOrden}/confirmar-pago`, {}, token);

/** Cancelar una orden PENDIENTE_PAGO (restaura stock automáticamente) */
export const cancelarOrden = (idOrden, token) =>
  postJSON(`${BASE_URL}/ordenes/${idOrden}/cancelar`, {}, token);

// ─── Órdenes de invitado (sin autenticación) ──────────────────────────────────

/** Checkout para invitados (sin cuenta).
 *  dto: { email, nombre, apellido, telefono, direccionEnvio, ciudad, codigoPostal, pais,
 *         items: [{ idProducto, cantidad }] }
 *  Retorna { data: { idOrden, trackingToken, estado, total, email } } */
export const checkoutInvitadoAPI = (dto) =>
  postJSON(`${BASE_URL}/ordenes/checkout-invitado`, dto);

/** Consultar estado de una orden de invitado por su trackingToken.
 *  Retorna { orden: {...}, detalle: [...] } */
export const consultarOrdenInvitadoAPI = (trackingToken) =>
  fetchJSON(`${BASE_URL}/ordenes/invitado/${encodeURIComponent(trackingToken)}`);

// ─── Carrito del servidor (requieren token) ───────────────────────────────────

/** Obtiene los ítems del carrito con JOIN a producto (nombre, imagen, precio, subtotal).
 *  Retorna { items: [...], resumen: { cantidadItems, total } } */
export const getCarritoAPI = async (token) => {
  const response = await fetch(`${BASE_URL}/carrito/obtItems`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Error ${response.status}`);
  const json = await response.json();
  return { items: json.data ?? [], resumen: json.resumen ?? { cantidadItems: 0, total: 0 } };
};

/** Agrega un ítem (incremental: si ya existe, suma la cantidad) */
export const agregarItemAPI = (idProducto, cantidad, token) =>
  postJSON(`${BASE_URL}/carrito/agregarItem`, { idProducto, cantidad }, token);

/** Actualiza la cantidad de un ítem a un valor absoluto */
export const actualizarItemAPI = (idProducto, cantidad, token) =>
  putJSON(`${BASE_URL}/carrito/actualizarItem`, { idProducto, cantidad }, token);

/** Elimina un ítem del carrito */
export const eliminarItemAPI = (idProducto, token) =>
  deleteJSON(`${BASE_URL}/carrito/eliminarItem`, { idProducto }, token);

/** Vacía todo el carrito */
export const vaciarCarritoAPI = (token) =>
  deleteJSON(`${BASE_URL}/carrito/vaciar`, {}, token);
