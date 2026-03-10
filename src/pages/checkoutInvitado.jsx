import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { selectCartItems } from '../store/cartSlice';
import { clearCart } from '../store/cartSlice';
import { checkoutInvitadoAPI } from '../api/productos';
import { useToastContext } from '../context/ToastContext';
import '../components/comun.css';
import './checkoutInvitado.css';

const schema = Yup.object({
    nombre:         Yup.string().required('Campo obligatorio'),
    apellido:       Yup.string().required('Campo obligatorio'),
    email:          Yup.string().email('Email inválido').required('Campo obligatorio'),
    telefono:       Yup.string().required('Campo obligatorio'),
    direccionEnvio: Yup.string().required('Campo obligatorio'),
    ciudad:         Yup.string().required('Campo obligatorio'),
    codigoPostal:   Yup.string().required('Campo obligatorio'),
    pais:           Yup.string().required('Campo obligatorio'),
});

function CheckoutInvitado() {
    const navigate       = useNavigate();
    const dispatch       = useDispatch();
    const { showToast }  = useToastContext();
    const cartItems      = useSelector(selectCartItems);

    // Si llega sin productos, volver al carrito
    useEffect(() => {
        if (cartItems.length === 0) {
            showToast('Tu carrito está vacío', 'warning');
            navigate('/carrito');
        }
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        const items = cartItems.map(({ product, quantity }) => ({
            idProducto: product.id,
            cantidad:   quantity,
        }));

        try {
            const res = await checkoutInvitadoAPI({ ...values, items });
            const { idOrden, trackingToken } = res.data ?? {};
            dispatch(clearCart());
            showToast(
                `¡Orden #${idOrden} creada! Guardá tu token de seguimiento.`,
                'success'
            );
            navigate(`/seguimiento/${trackingToken}`);
        } catch (err) {
            const msg = err?.data?.error?.message ?? 'No se pudo procesar el pedido';
            showToast(msg, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                nombre: '', apellido: '', email: '', telefono: '',
                direccionEnvio: '', ciudad: '', codigoPostal: '', pais: '',
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <div className="form-page">
                    <div className="form-card checkout-invitado-card">
                        <h2 className="form-card-title">Finalizar compra</h2>
                        <p className="form-card-subtitle">
                            Completá tus datos de contacto y envío.&nbsp;
                            <Link to="/login" className="checkout-login-link">¿Tenés cuenta? Iniciá sesión</Link>
                        </p>

                        <Form>
                            {/* ── Resumen de items ── */}
                            <div className="checkout-items-resumen">
                                {cartItems.map(({ product, quantity }) => (
                                    <div className="checkout-item-row" key={product.id}>
                                        <span className="checkout-item-name">
                                            {product.descripcioncorta ?? product.nombre}
                                            <em> ×{quantity}</em>
                                        </span>
                                        <span className="checkout-item-sub">
                                            USD {(Number(product.precio) * quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className="checkout-total-row">
                                    <span>Total</span>
                                    <span>
                                        USD {cartItems.reduce((acc, { product, quantity }) =>
                                            acc + Number(product.precio) * quantity, 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* ── Datos de contacto ── */}
                            <h3 className="checkout-section-title">Datos de contacto</h3>
                            <div className="checkout-grid">
                                <div className="field-wrap">
                                    <label htmlFor="nombre">Nombre</label>
                                    <Field id="nombre" name="nombre" type="text" placeholder="Juan" />
                                    <ErrorMessage name="nombre" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="apellido">Apellido</label>
                                    <Field id="apellido" name="apellido" type="text" placeholder="Pérez" />
                                    <ErrorMessage name="apellido" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap checkout-full">
                                    <label htmlFor="email">Email</label>
                                    <Field id="email" name="email" type="email" placeholder="correo@ejemplo.com" />
                                    <ErrorMessage name="email" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap checkout-full">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <Field id="telefono" name="telefono" type="text" placeholder="11 1234-5678" />
                                    <ErrorMessage name="telefono" component="span" className="field-error" />
                                </div>
                            </div>

                            {/* ── Datos de envío ── */}
                            <h3 className="checkout-section-title">Dirección de envío</h3>
                            <div className="checkout-grid">
                                <div className="field-wrap checkout-full">
                                    <label htmlFor="direccionEnvio">Dirección</label>
                                    <Field id="direccionEnvio" name="direccionEnvio" type="text" placeholder="Av. Corrientes 1234, piso 2" />
                                    <ErrorMessage name="direccionEnvio" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="ciudad">Ciudad</label>
                                    <Field id="ciudad" name="ciudad" type="text" placeholder="Buenos Aires" />
                                    <ErrorMessage name="ciudad" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="codigoPostal">Código postal</label>
                                    <Field id="codigoPostal" name="codigoPostal" type="text" placeholder="1043" />
                                    <ErrorMessage name="codigoPostal" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap checkout-full">
                                    <label htmlFor="pais">País</label>
                                    <Field id="pais" name="pais" type="text" placeholder="Argentina" />
                                    <ErrorMessage name="pais" component="span" className="field-error" />
                                </div>
                            </div>

                            <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                                {isSubmitting
                                    ? 'Procesando…'
                                    : <><i className="fas fa-credit-card"></i> Confirmar pedido</>
                                }
                            </button>
                        </Form>

                        <div className="form-card-links">
                            <Link to="/carrito">
                                <i className="fas fa-arrow-left"></i> Volver al carrito
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default CheckoutInvitado;
