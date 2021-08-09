const sectionDestacadosBusqueda = document.getElementById('destacados');
const sectionPcEscritorioBusqueda = document.getElementById('PC-Escritorio');
const sectionNotebooksBusqueda = document.getElementById('Notebooks');
const sectionConsolasBusqueda = document.getElementById('Consolas');
const articleIndex = document.getElementById('article-index');
const contenedorMapa = document.getElementById('contenedor');

const main = document.getElementById('main');

const elementoBuscador = document.getElementById('buscador');
const btnBuscar = document.getElementById('btnBuscador');

/* creamos un nuevo section para colocar los productos filtrados por la búsqueda */
const nuevoSection = document.createElement('section');
/* creamos un nuevo H2 para colocar el título búsqueda */
const nuevoH2 = document.createElement('h2');
nuevoH2.textContent = "Búsqueda";
nuevoSection.appendChild(nuevoH2);
/* Se crea un nuevo Div para contener los nuevos article que se creen al filtrar en la búsqueda */
const nuevoDiv = document.createElement('div');
nuevoSection.appendChild(nuevoDiv);

btnBuscar.addEventListener("click", function () {
    buscar();
});
elementoBuscador.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        buscar();
    }
});

function buscar(){

    if(elementoBuscador.value == ""){
        alert("Debes insertar un valor en el buscador");
        return;
    }

    /* Se eliminan los contenedores viejos, para poder colocar el nuevo contenedor section creado anteriormente */
    if(sectionDestacadosBusqueda != null) sectionDestacadosBusqueda.remove();

    if(sectionPcEscritorioBusqueda != null) sectionPcEscritorioBusqueda.remove();

    if(sectionNotebooksBusqueda != null) sectionNotebooksBusqueda.remove();

    if(sectionConsolasBusqueda != null) sectionConsolasBusqueda.remove();

    if(articleIndex != null) articleIndex.remove();

    if(contenedorMapa != null) contenedorMapa.remove();

    let productosBuqueda = [];
    let filtro = elementoBuscador.value.toUpperCase();

    let cantidadPc = pcsEscritorio.length;
    let cantidadNotebooks = notebooks.length;
    let cantidadConsolas = consolas.length;

    /* Por cada lista de productos, las recorremos para poder ver si hay algún producto con el nombre ingresado en el input
       del buscador */
    for(i = 0; i<cantidadPc; i++){
        if(pcsEscritorio[i].descripcioncorta.toUpperCase().includes(filtro)){
            productosBuqueda.push(pcsEscritorio[i]);
        }
    }

    for(i = 0; i<cantidadNotebooks; i++){
        if(notebooks[i].descripcioncorta.toUpperCase().includes(filtro)){
            productosBuqueda.push(notebooks[i]);
        }
    }

    for(i = 0; i<cantidadConsolas; i++){
        if(consolas[i].descripcioncorta.toUpperCase().includes(filtro)){
            productosBuqueda.push(consolas[i]);
        }
    }

    /* Si la búsqueda arrojó resultados, la lista productosBusqueda tendrá más de un objeto dentro.
       Si tiene objetos, procederá a armar los contenedores.
       Si no tiene nada, avisará mediante una etiqueta p, que la búsqueda no arrojó ningún resultado. */
    if(productosBuqueda.length > 0){
        armarMain(productosBuqueda);
    }else{
        const nuevoP = document.createElement('p');
        nuevoP.textContent = "No se han encontrado productos con ese nombre";
        nuevoP.classList.add('p-busqueda');
        main.appendChild(nuevoP);
    }
}

/* Esta función crea un nuevo artcle para el producto */
function armarMain(productosBuqueda) {

    let cantidodProductosBusqueda = productosBuqueda.length;

    for(i = 0; i<cantidodProductosBusqueda; i++){

        const nuevoArticulo = document.createElement('article');

        nuevoArticulo.classList.add('mainArticle');

        const nuevoP = document.createElement('p');
        nuevoP.classList.add('article-p');
        nuevoP.textContent = productosBuqueda[i].descripcionCorta;
        nuevoArticulo.appendChild(nuevoP);

        const nuevaImg = document.createElement('img');
        nuevaImg.src = productosBuqueda[i].imagen;
        nuevaImg.classList.add('img-article');
        nuevoArticulo.appendChild(nuevaImg);

        const nuevoPrecio = document.createElement('p');
        nuevoPrecio.classList.add('p-precio-article');
        nuevoPrecio.textContent = "USD " + productosBuqueda[i].precio;
        nuevoArticulo.appendChild(nuevoPrecio);

        const btnAgregar = document.createElement('button');
        btnAgregar.type = "submit";
        btnAgregar.classList.add('btnAgregar-article');
        nuevoArticulo.appendChild(btnAgregar);

        const nuevoI = document.createElement('i');
        nuevoI.classList.add('fas');
        nuevoI.classList.add('fa-cart-plus');

        btnAgregar.appendChild(nuevoI);

        nuevoDiv.appendChild(nuevoArticulo);
        main.appendChild(nuevoSection);
    }
}