import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginAPI, agregarItemAPI } from '../api/productos';
import { setCredentials } from '../store/authSlice';
import { selectCartItems } from '../store/cartSlice';
import { useToastContext } from '../context/ToastContext';
import '../components/comun.css';
import './login.css';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showToast } = useToastContext();
    const cartItems = useSelector(selectCartItems);

    return (
        <Formik
            initialValues={{ emailLogin: '', passLogin: '' }}
            validationSchema={Yup.object({
                emailLogin: Yup.string()
                    .email('Email inválido')
                    .required('Campo Obligatorio'),
                passLogin: Yup.string()
                    .required('Campo Obligatorio'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const res = await loginAPI(values.emailLogin, values.passLogin);
                    dispatch(setCredentials({ user: { mail: values.emailLogin }, token: res.data.token }));

                    // Sincronizar carrito de invitado al servidor
                    if (cartItems.length > 0) {
                        await Promise.allSettled(
                            cartItems.map(({ product, quantity }) =>
                                agregarItemAPI(product.id, quantity, res.data.token)
                            )
                        );
                    }

                    showToast('¡Bienvenido! Sesión iniciada correctamente.', 'success');
                    navigate('/tienda');
                } catch (err) {
                    const msg = err?.data?.error?.message ?? 'Usuario o contraseña incorrectos';
                    showToast(msg, 'error');
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <div className="form-page">
                    <div className="form-card">
                        <h2 className="form-card-title">Iniciar sesión</h2>
                        <p className="form-card-subtitle">Ingresá tus credenciales para continuar</p>
                        <Form>
                            <div className="field-group">
                                <div className="field-wrap">
                                    <label htmlFor="emailLogin">Email</label>
                                    <Field id="emailLogin" name="emailLogin" type="email" placeholder="correo@ejemplo.com" />
                                    <ErrorMessage name="emailLogin" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="passLogin">Contraseña</label>
                                    <Field id="passLogin" name="passLogin" type="password" placeholder="••••••••" />
                                    <ErrorMessage name="passLogin" component="span" className="field-error" />
                                </div>
                            </div>
                            <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Accediendo…' : 'Acceder'}
                            </button>
                        </Form>
                        <div className="form-card-links">
                            <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
                            <Link to="/registro">¿No tenés cuenta? <strong>Registrate</strong></Link>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default Login;