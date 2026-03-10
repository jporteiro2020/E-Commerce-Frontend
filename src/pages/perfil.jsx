import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    getPerfilAPI,
    actualizarDatosUsuario,
    actualizarPassUsuario,
    eliminarUsuario,
} from '../api/productos';
import { selectCurrentUser, selectToken, logout, setCredentials } from '../store/authSlice';
import { useToastContext } from '../context/ToastContext';
import Spinner from '../components/Spinner';
import '../components/comun.css';
import './perfil.css';

function Perfil() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showToast } = useToastContext();
    const currentUser = useSelector(selectCurrentUser);
    const token = useSelector(selectToken);

    const [perfil,        setPerfil]        = useState(null);
    const [loadingPerfil, setLoadingPerfil] = useState(true);
    const [editMode,      setEditMode]      = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        getPerfilAPI(token)
            .then(setPerfil)
            .catch(() => showToast('No se pudo cargar el perfil', 'error'))
            .finally(() => setLoadingPerfil(false));
    }, [token]);

    return (
        <main id="main" className="perfil-page">
            <h1 className="perfil-titulo">Mi perfil</h1>
            <p className="perfil-email">
                <i className="fas fa-envelope"></i> {currentUser?.mail}
            </p>

            {/* ── Datos personales ─────────────────────────────────────── */}
            <section className="perfil-section">
                <div className="perfil-section-header">
                    <h2>Datos personales</h2>
                    {!editMode && !loadingPerfil && (
                        <button
                            className="perfil-btn-edit"
                            onClick={() => setEditMode(true)}
                        >
                            <i className="fas fa-pencil-alt"></i> Editar
                        </button>
                    )}
                </div>

                {loadingPerfil ? (
                    <div className="perfil-loading"><Spinner size="sm" /></div>
                ) : !editMode ? (
                    /* ── Modo lectura ── */
                    <div className="perfil-read-grid">
                        <div className="perfil-read-item">
                            <span className="perfil-read-label">Nombre</span>
                            <span className="perfil-read-value">{perfil?.nombre || '—'}</span>
                        </div>
                        <div className="perfil-read-item">
                            <span className="perfil-read-label">Apellido</span>
                            <span className="perfil-read-value">{perfil?.apellido || '—'}</span>
                        </div>
                        <div className="perfil-read-item perfil-read-full">
                            <span className="perfil-read-label">Dirección</span>
                            <span className="perfil-read-value">{perfil?.direccion || '—'}</span>
                        </div>
                        <div className="perfil-read-item">
                            <span className="perfil-read-label">Email</span>
                            <span className="perfil-read-value">{perfil?.email || '—'}</span>
                        </div>
                        <div className="perfil-read-item">
                            <span className="perfil-read-label">Teléfono</span>
                            <span className="perfil-read-value">{perfil?.telefono || '—'}</span>
                        </div>
                    </div>
                ) : (
                    /* ── Modo edición ── */
                    <Formik
                        initialValues={{
                            nombre:    perfil?.nombre    ?? '',
                            apellido:  perfil?.apellido  ?? '',
                            direccion: perfil?.direccion ?? '',
                            email:     perfil?.email     ?? currentUser?.mail ?? '',
                            telefono:  perfil?.telefono  ?? '',
                        }}
                        validationSchema={Yup.object({
                            nombre:    Yup.string().required('Obligatorio'),
                            apellido:  Yup.string().required('Obligatorio'),
                            direccion: Yup.string().required('Obligatorio'),
                            email:     Yup.string().email('Email inválido').required('Obligatorio'),
                            telefono:  Yup.string().required('Obligatorio'),
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await actualizarDatosUsuario(
                                    {
                                        nombre:    values.nombre,
                                        apellido:  values.apellido,
                                        direccion: values.direccion,
                                        email:     values.email,
                                        telefono:  values.telefono,
                                    },
                                    token
                                );
                                setPerfil(values);
                                if (values.email !== currentUser?.mail) {
                                    dispatch(setCredentials({ user: { mail: values.email }, token }));
                                }
                                showToast('Datos actualizados correctamente.', 'success');
                                setEditMode(false);
                            } catch (err) {
                                showToast(err?.data?.data ?? 'Error al actualizar los datos', 'error');
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="perfil-form">
                                <div className="perfil-row">
                                    <div className="perfil-field">
                                        <label>Nombre</label>
                                        <Field name="nombre" type="text" />
                                        <ErrorMessage name="nombre" component="span" className="field-error" />
                                    </div>
                                    <div className="perfil-field">
                                        <label>Apellido</label>
                                        <Field name="apellido" type="text" />
                                        <ErrorMessage name="apellido" component="span" className="field-error" />
                                    </div>
                                </div>
                                <div className="perfil-field">
                                    <label>Dirección</label>
                                    <Field name="direccion" type="text" />
                                    <ErrorMessage name="direccion" component="span" className="field-error" />
                                </div>
                                <div className="perfil-row">
                                    <div className="perfil-field">
                                        <label>Email</label>
                                        <Field name="email" type="email" />
                                        <ErrorMessage name="email" component="span" className="field-error" />
                                    </div>
                                    <div className="perfil-field">
                                        <label>Teléfono</label>
                                        <Field name="telefono" type="text" />
                                        <ErrorMessage name="telefono" component="span" className="field-error" />
                                    </div>
                                </div>
                                <div className="perfil-edit-actions">
                                    <button
                                        type="button"
                                        className="perfil-btn-secondary"
                                        onClick={() => setEditMode(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="perfil-btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Guardando…' : 'Guardar cambios'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </section>

            {/* ── Cambiar contraseña ───────────────────────────────────── */}
            <section className="perfil-section">
                <div className="perfil-section-header">
                    <h2>Cambiar contraseña</h2>
                </div>
                <Formik
                    initialValues={{ contraseniaActual: '', nuevaPass: '', repetirNuevaPass: '' }}
                    validationSchema={Yup.object({
                        contraseniaActual: Yup.string().required('Obligatorio'),
                        nuevaPass: Yup.string()
                            .min(10, 'Mínimo 10 caracteres')
                            .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Debe tener al menos un número y un carácter especial')
                            .required('Obligatorio'),
                        repetirNuevaPass: Yup.string()
                            .oneOf([Yup.ref('nuevaPass'), null], 'Las contraseñas no coinciden')
                            .required('Obligatorio'),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            await actualizarPassUsuario(values.contraseniaActual, values.nuevaPass, token);
                            showToast('Contraseña actualizada correctamente.', 'success');
                            resetForm();
                        } catch (err) {
                            showToast(err?.data?.data ?? 'Error al cambiar la contraseña', 'error');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="perfil-form">
                            <div className="perfil-field">
                                <label>Contraseña actual</label>
                                <Field name="contraseniaActual" type="password" placeholder="••••••••" />
                                <ErrorMessage name="contraseniaActual" component="span" className="field-error" />
                            </div>
                            <div className="perfil-row">
                                <div className="perfil-field">
                                    <label>Nueva contraseña</label>
                                    <Field name="nuevaPass" type="password" placeholder="Mín. 10 caracteres" />
                                    <ErrorMessage name="nuevaPass" component="span" className="field-error" />
                                </div>
                                <div className="perfil-field">
                                    <label>Repetir nueva contraseña</label>
                                    <Field name="repetirNuevaPass" type="password" placeholder="Repetir contraseña" />
                                    <ErrorMessage name="repetirNuevaPass" component="span" className="field-error" />
                                </div>
                            </div>
                            <button type="submit" className="perfil-btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Actualizando…' : 'Cambiar contraseña'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>

            {/* ── Eliminar cuenta ──────────────────────────────────────── */}
            <section className="perfil-section perfil-danger-zone">
                <div className="perfil-section-header">
                    <h2>Zona peligrosa</h2>
                </div>
                <p className="perfil-danger-desc">
                    Eliminar tu cuenta es una acción <strong>irreversible</strong>. Se borrarán todos tus datos y el historial de compras.
                </p>
                {!confirmDelete ? (
                    <button className="perfil-btn-danger" onClick={() => setConfirmDelete(true)}>
                        <i className="fas fa-trash-alt"></i> Eliminar mi cuenta
                    </button>
                ) : (
                    <Formik
                        initialValues={{ contraseniaEliminar: '' }}
                        validationSchema={Yup.object({
                            contraseniaEliminar: Yup.string().required('Ingresá tu contraseña para confirmar'),
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await eliminarUsuario(values.contraseniaEliminar, token);
                                dispatch(logout());
                                showToast('Cuenta eliminada. ¡Hasta luego!', 'info');
                                navigate('/');
                            } catch (err) {
                                showToast(err?.data?.data ?? 'Error al eliminar la cuenta', 'error');
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="perfil-form">
                                <div className="perfil-field">
                                    <label>Confirmá tu contraseña para eliminar la cuenta</label>
                                    <Field name="contraseniaEliminar" type="password" placeholder="Tu contraseña actual" />
                                    <ErrorMessage name="contraseniaEliminar" component="span" className="field-error" />
                                </div>
                                <div className="perfil-danger-actions">
                                    <button type="button" className="perfil-btn-secondary" onClick={() => setConfirmDelete(false)}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="perfil-btn-danger" disabled={isSubmitting}>
                                        {isSubmitting ? 'Eliminando…' : 'Confirmar eliminación'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </section>
        </main>
    );
}

export default Perfil;
