import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import NavigationSpinner from './components/NavigationSpinner';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Header from './components/header';
import Footer from './components/footer';
import Inicio from './pages/inicio';
import Login from './pages/login';
import Tienda from './pages/tienda';
import Mapa from './pages/mapa';
import Registro from './pages/registro';
import Recuperar from './pages/recuperar';
import Busqueda from './pages/busqueda';
import PcEscritorio from './pages/pcEscritorio';
import Notebooks from './pages/notebooks';
import Consolas from './pages/consolas';
import ConsolasSubCat from './pages/consolasSubCat';
import DetalleProducto from './pages/detalleProducto';
import Perfil from './pages/perfil';
import MisOrdenes from './pages/misOrdenes';
import DetalleOrden from './pages/detalleOrden';
import Carrito from './pages/carrito';
import CheckoutInvitado from './pages/checkoutInvitado';
import Seguimiento from './pages/seguimiento';
import NotFound from './pages/notFound';

function App() {
  return (
    <Router>
      <ToastProvider>
        <NavigationSpinner />
        <Header />
        <main className="main-content">
        <Routes>
          <Route path="/"                          element={<Inicio />} />
          <Route path="/tienda"                    element={<Tienda />} />
          <Route path="/sucursal1"                 element={<Mapa sucursal="Sucursal 1" />} />
          <Route path="/sucursal2"                 element={<Mapa sucursal="Sucursal 2" />} />
          <Route path="/login"     element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/registro" element={<PublicRoute><Registro /></PublicRoute>} />
          <Route path="/recuperar" element={<PublicRoute><Recuperar /></PublicRoute>} />
          <Route path="/busqueda/:stringBusqueda"  element={<Busqueda />} />
          <Route path="/pcEscritorio"              element={<PcEscritorio />} />
          <Route path="/notebooks"                 element={<Notebooks />} />
          <Route path="/consolas"                  element={<Consolas />} />
          <Route path="/consolasSubCat/:stringCategoria" element={<ConsolasSubCat />} />
          <Route path="/detalle/:idProducto"       element={<DetalleProducto />} />

          {/* Rutas protegidas */}
          <Route path="/carrito"    element={<Carrito />} />
          <Route path="/checkout-invitado" element={<CheckoutInvitado />} />
          <Route path="/seguimiento" element={<Seguimiento />} />
          <Route path="/seguimiento/:trackingToken" element={<Seguimiento />} />
          <Route path="/perfil"       element={<PrivateRoute><Perfil /></PrivateRoute>} />
          <Route path="/mis-ordenes"  element={<PrivateRoute><MisOrdenes /></PrivateRoute>} />
          <Route path="/mis-ordenes/:idOrden" element={<PrivateRoute><DetalleOrden /></PrivateRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
        <Footer />
      </ToastProvider>
    </Router>
  );
}

export default App;
