import React from 'react';
import './comun.css';
import './recuperar.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Recuperar(){
    return(
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '' }}
            validationSchema={Yup.object({
                emailRecuperar: Yup.string()
                    .email('Invalid email address')
                    .required('Campo Obligatorio'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                alert("Success");
            }}
        >
            <main id="main">
                <div>
                    <Form action="" className="recuperar">
                        <h2 className="titulo-recuperar">Recuperar contraseña</h2>
                        <Field name="emailRecuperar" type="text" placeholder="Ingrese su email"/>
                        <ErrorMessage name="nombreRegistro" />
                        <button type="submit" id="btn-recuperar" className="custom-btn btn-3"><span>Recuperar</span></button>
                    </Form>
                </div>
            </main>
        </Formik>
    );
}

export default Recuperar;