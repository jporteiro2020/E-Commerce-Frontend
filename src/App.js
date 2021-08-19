//import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from './components/header';
import Inicio from './components/inicio';
import Footer from './components/footer';
import Login from './components/login';
import Tienda from './components/tienda';
import Mapa from './components/mapa';
import Registro from './components/registro';
import Recuperar from './components/recuperar';
import Busqueda from './components/busqueda';
import PcEscritorio from './components/pcEscritorio';
import Notebooks from './components/notebooks';
import Consolas from './components/consolas';
import ConsolasSubCat from './components/consolasSubCat';
import DetalleProducto from "./components/detalleProducto";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Inicio />
          </Route>
          <Route path="/tienda">
            <Tienda />
          </Route>
          <Route path="/sucursal1">
            <Mapa sucursal = {"Sucursal 1"}/>
          </Route>
          <Route path="/sucursal2">
            <Mapa sucursal = {"Sucursal 2"}/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registro">
            <Registro />
          </Route>
          <Route path="/recuperar">
            <Recuperar />
          </Route>
          <Route path="/busqueda/:stringBusqueda" children={<Busqueda />} />
          <Route path="/pcEscritorio">
            <PcEscritorio />
          </Route>
          <Route path="/notebooks">
            <Notebooks />
          </Route>
          <Route path="/consolas">
            <Consolas />
          </Route>
          <Route path="/consolasSubCat/:stringCategoria" children={<ConsolasSubCat />} />
          <Route path="/detalle/:idProducto" children={<DetalleProducto />} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
