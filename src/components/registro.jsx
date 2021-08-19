import React from 'react';
import './comun.css';
import './registro.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Registro(){
    return(
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '' }}
            validationSchema={Yup.object({
                nombreRegistro: Yup.string()
                    .required('Campo Obligatorio'),
                apellidoRegistro: Yup.string()
                    .required('Campo Obligatorio'),
                direccionRegistro: Yup.string()
                    .required('Campo Obligatorio'),
                emailRegistro: Yup.string()
                    .email('Invalid email address')
                    .required('Campo Obligatorio'),
                telefonoRegistro: Yup.string()
                    .required('Campo Obligatorio'),
                passwordRegistro: Yup.string()
                    .min(10, 'Password is too short - should be 10 chars minimum.')
                    .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/, 'La contraseña debe contener al menos 10 caracteres compuesto por una letra mayúscula, un número y un caracter especial.')
                    .required('Campo Obligatorio'),
                repetirPasswordRegistro: Yup.string()
                    .oneOf([Yup.ref('passwordRegistro'), null], "Las contraseñas ingresadas no coinciden")
                    .required('Campo Obligatorio'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                alert("Success");
            }}
        >
            <main id="main">
                <div>
                    <Form className="registro">
                        <h2 className="titulo-registro">Registro</h2>
                        <Field name="nombreRegistro" type="text" placeholder="Ingrese su nombre"/>
                        <ErrorMessage name="nombreRegistro" />
                        <Field name="apellidoRegistro" type="text" placeholder="Ingrese su apellido"/>
                        <ErrorMessage name="apellidoRegistro" />
                        <Field name="direccionRegistro" type="text" placeholder="Ingrese su dirección"/>
                        <ErrorMessage name="direccionRegistro" />
                        <Field name="emailRegistro" type="text" placeholder="Ingrese su email"/>
                        <ErrorMessage name="emailRegistro" />
                        <Field name="telefonoRegistro" type="text" placeholder="Ingrese su teléfono"/>
                        <ErrorMessage name="telefonoRegistro" />
                        <Field name="passwordRegistro" type="password" placeholder="Ingrese contraseña"/>
                        <ErrorMessage name="passwordRegistro" />
                        <Field name="repetirPasswordRegistro" type="password" placeholder="Repita la contraseña"/>
                        <ErrorMessage name="repetirPasswordRegistro" />
                        <button type="submit" id="btn-Registro" className="custom-btn btn-3"><span>Registrarme</span></button>
                    </Form>
                </div>
            </main>
        </Formik>
    );
}

export default Registro;