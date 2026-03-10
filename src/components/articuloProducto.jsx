import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../hooks/useCarrito';
import { useToastContext } from '../context/ToastContext';

function ArticuloProductos({ productos }) {
  const { addToCart } = useCarrito();
  const { showToast } = useToastContext();

  if (!productos || productos.length === 0) return null;

  const handleAddToCart = (e, producto) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(producto, 1);
    showToast(`"${producto.descripcioncorta}" agregado al carrito`, 'success');
  };

  return productos.map((producto) => {
    const ruta = `/detalle/${producto.id}`;
    return (
      <article className="mainArticle" key={producto.id}>
        <Link to={ruta} className="card-link">
          <div className="card-img-wrapper">
            <img
              src={producto.imagen}
              className="img-article"
              alt={producto.descripcioncorta}
              loading="lazy"
            />
          </div>
          <div className="card-body">
            <p className="article-p">{producto.descripcioncorta}</p>
            <p className="p-precio-article">USD {producto.precio}</p>
          </div>
        </Link>
        <div className="card-footer">
          <button
            className="btnAgregar-article"
            onClick={(e) => handleAddToCart(e, producto)}
            title="Agregar al carrito"
          >
            <i className="fas fa-cart-plus"></i>
            <span>Agregar</span>
          </button>
        </div>
      </article>
    );
  });
}

export default ArticuloProductos;