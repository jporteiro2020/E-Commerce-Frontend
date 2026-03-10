import React from 'react';
import { Link } from 'react-router-dom';
import '../components/comun.css';
import './recuperar.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToastContext } from '../context/ToastContext';

function Recuperar() {
    const { showToast } = useToastContext();

    return (
        <Formik
            initialValues={{ emailRecuperar: '' }}
            validationSchema={Yup.object({
                emailRecuperar: Yup.string()
                    .email('Email inválido')
                    .required('Ingresá tu email'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                showToast('Función no disponible aún. Contactá al soporte.', 'error');
            }}
        >
            {({ isSubmitting }) => (
                <div className="form-page">
                    <div className="form-card">
                        <h2 className="form-card-title">Recuperar contraseña</h2>
                        <p className="form-card-subtitle">Ingresá tu email y te enviaremos un enlace para restablecer tu contraseña</p>
                        <Form>
                            <div className="field-group">
                                <div className="field-wrap">
                                    <label htmlFor="emailRecuperar">Email</label>
                                    <Field id="emailRecuperar" name="emailRecuperar" type="email" placeholder="correo@ejemplo.com" />
                                    <ErrorMessage name="emailRecuperar" component="span" className="field-error" />
                                </div>
                            </div>
                            <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando…' : 'Enviar enlace'}
                            </button>
                        </Form>
                        <div className="form-card-links">
                            <Link to="/login">Volver al inicio de sesión</Link>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default Recuperar;