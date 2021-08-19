import React from "react";
import { Link } from "react-router-dom";

function ArticuloProductos(props) {
  const productos = props.productos;

  if (productos.length === 0) {
    return <div>No hay productos :(</div>;
  }

  return (
      productos.map(function (producto, i) {
        let id = producto.id;
        let ruta = `/detalle/${id}`;
        return <article className = "mainArticle" key = { i } >
            <Link to={ruta} className="aArticle article-p">
              <p className = "article-p">{producto.descripcioncorta}</p>
            </Link>
            <Link to={ruta} className="aArticle img-article">
              <img src = {producto.imagen} className = "img-article" alt = "imagen articulo"></img>
            </Link>
            <Link to={ruta} className="aArticle p-precio-article">
              <p className = "p-precio-article">USD {producto.precio}</p>
            </Link>
            <button type = "submit" className = "btnAgregar-article">
              <i className = "fas fa-cart-plus"></i>
            </button>
          </article>
      })
  );
}

export default ArticuloProductos;