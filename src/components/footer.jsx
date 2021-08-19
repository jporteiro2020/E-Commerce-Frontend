import React from 'react';
import { Link } from "react-router-dom";
import './comun.css';
import './footer.css';
import './botones.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Footer(){
    return(
        <footer>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '' }}
                validationSchema={Yup.object({
                    nombreSuscripcion: Yup.string()
                        .required('Campo Obligatorio'),
                    emailSuscripcion: Yup.string()
                        .email('Invalid email address')
                        .required('Campo Obligatorio'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    alert("Success");
                }}
            >
                <Form action="" className="subscripcion">
                    <h2 className="titulo-suscripcion">Subscribirse</h2>
                    <Field name="nombreSuscripcion" type="text" placeholder="Ingrese su nombre"/>
                    <ErrorMessage name="nombreSuscripcion" />
                    <Field name="emailSuscripcion" type="text" placeholder="Ingrese su email"/>
                    <ErrorMessage name="emailSuscripcion" />
                    <button type="submit" className="custom-btn btn-3" id="btnSuscribir"><span>Recibir Ofertas</span></button>
                </Form>
            </Formik>
            <div className="direccion-footer">
                <p>Nos puedes encontrar en nuestras dos sucursales:</p>
                <ul>
                    <li>
                        Dirección: Juan Paullier 2378 entre Amézaga y Domingo Aramburú - Mapa: <Link to="/sucursal1"><button className="custom-btn btn-16"><i className="fas fa-map-marked-alt"></i></button></Link>
                    </li>
                    <li>
                        Dirección: Demóstenes 3532 - Mapa: <Link to="/sucursal2"><button className="custom-btn btn-16"><i className="fas fa-map-marked-alt"></i></button></Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;