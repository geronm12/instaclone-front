import React from 'react';
import {Form,Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from 'react-toastify';
import {REGISTER} from "../../../gql/user";
import {useMutation} from "@apollo/client";


import "./RegisterForm.scss";


export default function RegisterForm(props) {

    const {setShowLogin} = props;

    const [register] = useMutation(REGISTER);


    const formik = useFormik({
        initialValues: InitialVal(),
        validationSchema: Yup.object({
        name: Yup.string().required(true),
        username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, 
            "El nombre del usuario no puede tener espacio")
            .required(true),
        email: Yup.string().email("El email no es válido").required(true),
        password: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no coinciden"),
        repeatPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("password")],"Las contraseñas no coinciden")
        }),
        onSubmit: async (formData) => {
            try{
            
             const newUser = formData;
             delete newUser.repeatPassword;
             
             await register({
                 variables: {
                  input:newUser
                }
             });

            toast.success("Usuario registrado correctamente");
            setShowLogin(true);

            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }
    });


    return (
        <>
        <h2 className="register-form-title">Registrate para ver fotos y videos de tus amigos</h2>
        <Form className="register-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
            type="text"
            placeholder="Nombre y apellidos"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
            />

            <Form.Input 
            type="text"
            placeholder="Nombre de Usuario"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.errors.username && true}
            />

            <Form.Input 
            type="text"
            placeholder="Correo Electronico"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email && true}
            />

            <Form.Input 
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password && true}
            />

            <Form.Input 
            type="password"
            placeholder="Repetir Contraseña"
            name="repeatPassword"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword && true}
            />
            <Button type="submit"  className="btn-submit">Registrarse</Button>
        </Form>
        </>
           
    )
}


function InitialVal () {
    return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
    }
}