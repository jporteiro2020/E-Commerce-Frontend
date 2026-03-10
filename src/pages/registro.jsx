import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registroAPI } from '../api/productos';
import { useToastContext } from '../context/ToastContext';
import '../components/comun.css';
import './registro.css';

function Registro() {
    const navigate = useNavigate();
    const { showToast } = useToastContext();

    return (
        <Formik
            initialValues={{
                nombreRegistro: '',
                apellidoRegistro: '',
                direccionRegistro: '',
                emailRegistro: '',
                telefonoRegistro: '',
                passwordRegistro: '',
                repetirPasswordRegistro: '',
            }}
            validationSchema={Yup.object({
                nombreRegistro: Yup.string().required('Campo Obligatorio'),
                apellidoRegistro: Yup.string().required('Campo Obligatorio'),
                direccionRegistro: Yup.string().required('Campo Obligatorio'),
                emailRegistro: Yup.string().email('Email inválido').required('Campo Obligatorio'),
                telefonoRegistro: Yup.string().required('Campo Obligatorio'),
                passwordRegistro: Yup.string()
                    .min(10, 'Mínimo 10 caracteres')
                    .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Debe tener al menos un número y un carácter especial')
                    .required('Campo Obligatorio'),
                repetirPasswordRegistro: Yup.string()
                    .oneOf([Yup.ref('passwordRegistro'), null], 'Las contraseñas no coinciden')
                    .required('Campo Obligatorio'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await registroAPI({
                        nombre: values.nombreRegistro,
                        apellido: values.apellidoRegistro,
                        direccion: values.direccionRegistro,
                        email: values.emailRegistro,
                        telefono: values.telefonoRegistro,
                        password: values.passwordRegistro,
                        repetirPassword: values.repetirPasswordRegistro,
                    });
                    showToast('¡Cuenta creada! Ya podés iniciar sesión.', 'success');
                    navigate('/login');
                } catch (err) {
                    const msg = err?.data?.error?.message ?? 'Error al crear la cuenta';
                    showToast(msg, 'error');
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <div className="form-page">
                    <div className="form-card" style={{ maxWidth: '500px' }}>
                        <h2 className="form-card-title">Crear cuenta</h2>
                        <p className="form-card-subtitle">Completá tus datos para registrarte</p>
                        <Form>
                            <div className="field-group">
                                <div className="field-wrap">
                                    <label htmlFor="nombreRegistro">Nombre</label>
                                    <Field id="nombreRegistro" name="nombreRegistro" type="text" placeholder="Juan" />
                                    <ErrorMessage name="nombreRegistro" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="apellidoRegistro">Apellido</label>
                                    <Field id="apellidoRegistro" name="apellidoRegistro" type="text" placeholder="Pérez" />
                                    <ErrorMessage name="apellidoRegistro" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="direccionRegistro">Dirección</label>
                                    <Field id="direccionRegistro" name="direccionRegistro" type="text" placeholder="Av. Corrientes 1234" />
                                    <ErrorMessage name="direccionRegistro" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="emailRegistro">Email</label>
                                    <Field id="emailRegistro" name="emailRegistro" type="email" placeholder="correo@ejemplo.com" />
                                    <ErrorMessage name="emailRegistro" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="telefonoRegistro">Teléfono</label>
                                    <Field id="telefonoRegistro" name="telefonoRegistro" type="text" placeholder="11 1234-5678" />
                                    <ErrorMessage name="telefonoRegistro" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="passwordRegistro">Contraseña</label>
                                    <Field id="passwordRegistro" name="passwordRegistro" type="password" placeholder="Mín. 10 caracteres, 1 número y 1 símbolo" />
                                    <ErrorMessage name="passwordRegistro" component="span" className="field-error" />
                                </div>
                                <div className="field-wrap">
                                    <label htmlFor="repetirPasswordRegistro">Repetir contraseña</label>
                                    <Field id="repetirPasswordRegistro" name="repetirPasswordRegistro" type="password" placeholder="Repetí tu contraseña" />
                                    <ErrorMessage name="repetirPasswordRegistro" component="span" className="field-error" />
                                </div>
                            </div>
                            <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Registrando…' : 'Crear cuenta'}
                            </button>
                        </Form>
                        <div className="form-card-links">
                            <Link to="/login">¿Ya tenés cuenta? <strong>Iniciá sesión</strong></Link>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default Registro;