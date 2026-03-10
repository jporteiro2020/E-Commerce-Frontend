import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../store/authSlice';

/**
 * Envuelve rutas públicas (login, registro, recuperar).
 * Si el usuario ya está autenticado, redirige al inicio.
 */
function PublicRoute({ children }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default PublicRoute;
