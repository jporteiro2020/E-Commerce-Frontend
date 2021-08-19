import React from 'react';
import './login.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login(){
    return(
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '' }}
            validationSchema={Yup.object({
                emailLogin: Yup.string()
                    .email('Invalid email address')
                    .required('Campo Obligatorio'),
                passLogin: Yup.string()
                    .required('Campo Obligatorio'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                alert("Success");
            }}
        >
            <main id="main">
                <div>
                    <Form className="login">
                        <h2 className="titulo-login">Login</h2>
                        <Field name="emailLogin" type="text" placeholder="Ingrese su email"/>
                        <ErrorMessage name="emailLogin" />
                        <Field name="passLogin" type="password" placeholder="Ingrese su contraseña"/>
                        <ErrorMessage name="passLogin" />
                        <button type="submit" id="btn-Login" className="custom-btn btn-3"><span>Acceder</span></button>
                    </Form>
                    <div id="olvidoSuContraseña">
                        <a href="/recuperar">¿Olvidó su contraseña?</a>
                    </div>
                </div>
            </main>
        </Formik>
    );
}

export default Login;