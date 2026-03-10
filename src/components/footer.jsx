import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToastContext } from '../context/ToastContext';
import { suscribirAPI } from '../api/productos';

function Footer() {
    const { showToast } = useToastContext();
    return (
        <footer>
            <div className="footer-inner">
                <Formik
                    initialValues={{ nombreSuscripcion: '', emailSuscripcion: '' }}
                    validationSchema={Yup.object({
                        nombreSuscripcion: Yup.string().required('Campo obligatorio'),
                        emailSuscripcion: Yup.string().email('Email inválido').required('Campo obligatorio'),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            await suscribirAPI(values.nombreSuscripcion, values.emailSuscripcion);
                            showToast('¡Suscripción exitosa! Te avisaremos de nuestras ofertas.', 'success');
                            resetForm();
                        } catch (err) {
                            const msg = err?.data?.data ?? 'No se pudo completar la suscripción';
                            showToast(msg, 'error');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    <Form className="subscripcion">
                        <h2 className="titulo-suscripcion">Recibí nuestras ofertas</h2>
                        <Field name="nombreSuscripcion" type="text" placeholder="Tu nombre" />
                        <ErrorMessage name="nombreSuscripcion" component="span" className="error-msg" />
                        <Field name="emailSuscripcion" type="email" placeholder="Tu email" />
                        <ErrorMessage name="emailSuscripcion" component="span" className="error-msg" />
                        <button type="submit" id="btnSuscribir">Suscribirme</button>
                    </Form>
                </Formik>

                <div className="direccion-footer">
                    <h3>Nuestras sucursales</h3>
                    <ul>
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            Juan Paullier 2378 entre Amézaga y Domingo Aramburú
                            <Link to="/sucursal1">Ver mapa →</Link>
                        </li>
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            Demóstenes 3532
                            <Link to="/sucursal2">Ver mapa →</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="footer-bottom">© 2026 IT's Possible. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;