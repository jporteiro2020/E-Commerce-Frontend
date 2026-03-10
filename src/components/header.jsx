import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemCount, selectCartTotal } from '../store/cartSlice';
import { selectIsAuthenticated, selectCurrentUser, logout } from '../store/authSlice';
import { buscarProductos } from '../api/productos';
import './comun.css';
import './header.css';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const itemCount = useSelector(selectCartItemCount);
    const cartTotal = useSelector(selectCartTotal);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);
    const [menuOpen, setMenuOpen] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestLoading, setSuggestLoading] = useState(false);
    const [showSuggest, setShowSuggest] = useState(false);
    const suggestRef = useRef(null);

    // Debounced suggest: dispara cuando hay ≥ 4 caracteres
    useEffect(() => {
        const trimmed = inputVal.trim();
        if (trimmed.length < 4) {
            setSuggestions([]);
            setShowSuggest(false);
            return;
        }
        setSuggestLoading(true);
        const timer = setTimeout(() => {
            buscarProductos(trimmed)
                .then((data) => {
                    setSuggestions((data ?? []).slice(0, 7));
                    setShowSuggest(true);
                })
                .catch(() => setSuggestions([]))
                .finally(() => setSuggestLoading(false));
        }, 300);
        return () => clearTimeout(timer);
    }, [inputVal]);

    // Cerrar suggest al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (suggestRef.current && !suggestRef.current.contains(e.target)) {
                setShowSuggest(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const buscar = (e) => {
        e.preventDefault();
        const val = inputVal.trim();
        if (val) { navigate(`/busqueda/${encodeURIComponent(val)}`); setMenuOpen(false); }
        setShowSuggest(false);
    };

    const handleSuggestClick = (producto) => {
        navigate(`/detalle/${producto.id}`);
        setInputVal('');
        setShowSuggest(false);
        setMenuOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') { setShowSuggest(false); }
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header>
            {/* ===== IZQUIERDA: logo + productos ===== */}
            <div className="header-left">
                <Link to="/" onClick={closeMenu}>
                    <img src='/Recursos/LOGO.png' alt="Logo IT's Possible" className="logo" />
                </Link>
                <nav aria-label="Navegación principal">
                    <ul className="ul-nav">
                        <li>
                            <Link to="/tienda"><i className="fas fa-align-justify" aria-hidden="true"></i> <span id="nombreNav">Productos</span></Link>
                            <ul>
                                <li><Link to="/pcEscritorio">PC Escritorio</Link></li>
                                <li><Link to="/notebooks">Notebooks</Link></li>
                                <li>
                                    <Link to="/consolas">Consolas <i className="fas fa-angle-right" aria-hidden="true"></i></Link>
                                    <ul>
                                        <li><Link to="/consolasSubCat/playstation">PlayStation</Link></li>
                                        <li><Link to="/consolasSubCat/xbox">XBOX</Link></li>
                                        <li><Link to="/consolasSubCat/nintendo">Nintendo</Link></li>
                                        <li><Link to="/consolasSubCat/retro">Retro</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* ===== CENTRO: búsqueda + contacto ===== */}
            <div className="header-center">
                <div className="search-wrapper" ref={suggestRef}>
                    <form className="estilo-busqueda busqueda" onSubmit={buscar} role="search" aria-label="Buscar productos">
                        <input
                            type="search"
                            placeholder="Buscar productos..."
                            id="buscador"
                            aria-label="Campo de búsqueda"
                            aria-autocomplete="list"
                            aria-expanded={showSuggest}
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                        />
                        <button type="submit" id="btnBuscador" aria-label="Buscar">
                            <i className="fas fa-search" aria-hidden="true"></i>
                        </button>
                    </form>

                    {/* Suggest dropdown */}
                    {showSuggest && (
                        <div className="suggest-dropdown" role="listbox" aria-label="Sugerencias">
                            {suggestLoading ? (
                                <div className="suggest-feedback">
                                    <i className="fas fa-circle-notch fa-spin"></i> Buscando...
                                </div>
                            ) : suggestions.length === 0 ? (
                                <div className="suggest-feedback">Sin resultados para &laquo;{inputVal.trim()}&raquo;</div>
                            ) : (
                                suggestions.map((p) => (
                                    <button
                                        key={p.id}
                                        className="suggest-item"
                                        role="option"
                                        onClick={() => handleSuggestClick(p)}
                                        type="button"
                                    >
                                        <img src={p.imagen} alt={p.descripcioncorta} className="suggest-img" loading="lazy" />
                                        <span className="suggest-name">{p.descripcioncorta}</span>
                                        <span className="suggest-price">USD {p.precio}</span>
                                    </button>
                                ))
                            )}
                            <div className="suggest-footer">
                                <button type="button" onClick={buscar}>
                                    <i className="fas fa-search"></i> Ver todos los resultados de &laquo;{inputVal.trim()}&raquo;
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="contacto" aria-label="Contacto">
                    <p className="contacto-p">Contacto</p>
                    <p className="wpp-p-grid"><i className="fab fa-whatsapp wpp-icon-grid" aria-hidden="true"></i> 094850906</p>
                </div>
            </div>

            {/* ===== DERECHA: auth + carrito + hamburguesa ===== */}
            <div className="header-right">
                <div className="header-auth">
                    {isAuthenticated ? (
                        <>
                            <span className="header-user-name">
                                <i className="fas fa-user-circle" aria-hidden="true"></i> {currentUser?.mail?.split('@')[0]}
                            </span>
                            <Link to="/perfil"><i className="fas fa-cog" aria-hidden="true"></i> Mi perfil</Link>
                            <Link to="/mis-ordenes"><i className="fas fa-box" aria-hidden="true"></i> Mis órdenes</Link>
                            <button
                                className="header-logout"
                                onClick={() => { dispatch(logout()); navigate('/'); }}
                                aria-label="Cerrar sesión"
                            >
                                <i className="fas fa-sign-out-alt" aria-hidden="true"></i> Salir
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><i className="fas fa-sign-in-alt" aria-hidden="true"></i> Iniciar sesión</Link>
                            <Link to="/registro"><i className="fas fa-user-plus" aria-hidden="true"></i> Crear cuenta</Link>
                        </>
                    )}
                </div>

                <button
                    className="cart-btn"
                    onClick={() => navigate('/carrito')}
                    aria-label={`Carrito, ${itemCount} producto${itemCount !== 1 ? 's' : ''}, USD ${cartTotal.toFixed(2)}`}
                >
                    <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                    {itemCount > 0 && <span className="cart-badge" aria-hidden="true">{itemCount}</span>}
                    <span className="cart-total" aria-hidden="true">USD {cartTotal.toFixed(2)}</span>
                </button>

                <button
                    className={`hamburger${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-nav"
                >
                    <span className="hamburger__line"></span>
                    <span className="hamburger__line"></span>
                    <span className="hamburger__line"></span>
                </button>
            </div>

            {/* Mobile nav drawer */}
            <nav
                id="mobile-nav"
                className={`mobile-nav${menuOpen ? ' open' : ''}`}
                aria-label="Menú móvil"
                aria-hidden={!menuOpen}
            >
                <form className="mobile-search" onSubmit={buscar} role="search">
                    <input type="search" placeholder="Buscar productos..." aria-label="Buscar" />
                    <button type="submit" aria-label="Buscar"><i className="fas fa-search" aria-hidden="true"></i></button>
                </form>

                <p className="mobile-section-title">Tienda</p>
                <Link to="/tienda" onClick={closeMenu}>Todos los productos</Link>
                <Link to="/pcEscritorio" onClick={closeMenu}>PC Escritorio</Link>
                <Link to="/notebooks" onClick={closeMenu}>Notebooks</Link>
                <Link to="/consolas" onClick={closeMenu}>Consolas</Link>
                <Link to="/consolasSubCat/playstation" onClick={closeMenu}>PlayStation</Link>
                <Link to="/consolasSubCat/xbox" onClick={closeMenu}>XBOX</Link>
                <Link to="/consolasSubCat/nintendo" onClick={closeMenu}>Nintendo</Link>
                <Link to="/consolasSubCat/retro" onClick={closeMenu}>Retro</Link>

                <p className="mobile-section-title">Cuenta</p>
                {isAuthenticated ? (
                    <>
                        <Link to="/perfil" onClick={closeMenu}><i className="fas fa-cog"></i> Mi perfil</Link>
                        <Link to="/mis-ordenes" onClick={closeMenu}><i className="fas fa-box"></i> Mis órdenes</Link>
                        <button
                            className="mobile-logout"
                            onClick={() => { dispatch(logout()); navigate('/'); closeMenu(); }}
                        >
                            <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" onClick={closeMenu}>Iniciar sesión</Link>
                        <Link to="/registro" onClick={closeMenu}>Crear cuenta</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;