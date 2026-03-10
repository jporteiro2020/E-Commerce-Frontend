import { useState, useEffect } from 'react';

const MIN_DELAY = 500; // ms — tiempo mínimo que se muestra el estado de carga

/**
 * Custom hook para obtener productos desde la API.
 * @param {Function} fetchFn  - Función que retorna una Promise con los datos.
 * @param {Array}    deps     - Dependencias que disparan un nuevo fetch.
 */
export function useProductos(fetchFn, deps = []) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fetchFn) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const minDelay = new Promise((resolve) => setTimeout(resolve, MIN_DELAY));

    Promise.all([fetchFn(), minDelay])
      .then(([data]) => {
        if (!cancelled) setProductos(data ?? []);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudieron cargar los productos. Intentá de nuevo más tarde.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { productos, loading, error };
}
