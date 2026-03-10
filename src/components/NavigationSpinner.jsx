import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from './Spinner';
import './Spinner.css';

/**
 * Muestra un spinner overlay durante 900ms cada vez que cambia la ruta.
 * Se coloca dentro del <Router> para tener acceso a useLocation.
 */
export default function NavigationSpinner() {
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 500);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (!visible) return null;

    return <Spinner overlay size="page" label="Cargando..." />;
}
