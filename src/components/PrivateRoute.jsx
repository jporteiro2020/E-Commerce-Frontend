import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '../store/authSlice';

/**
 * Envuelve rutas protegidas.
 * Si el usuario no está autenticado, redirige a /login con el path original en state.
 */
function PrivateRoute({ children }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default PrivateRoute;
