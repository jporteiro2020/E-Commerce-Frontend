import React from "react";

function ArticuloProductos(props) {
  const productos = props.productos;

  if (productos.length === 0) {
    return <div>No hay productos :(</div>;
  }

  return (
      productos.map(function (producto, i) {
        return <article className = "mainArticle" key = { i } >
            <p className = "article-p">{producto.descripcioncorta}</p>
            <img src = {producto.imagen} className = "img-article" alt = "imagen articulo"></img>
            <p className = "p-precio-article">USD {producto.precio}</p>
            <button type = "submit" className = "btnAgregar-article">
                <i className = "fas fa-cart-plus"></i>
            </button>
        </article>
      })
  );
}

export default ArticuloProductos;