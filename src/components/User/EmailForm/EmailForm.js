import React from 'react';
import {Form, Button} from "semantic-ui-react";

import {useMutation} from "@apollo/client";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";

import {UPDATE_USER} from "../../../gql/user";

import "./EmailForm.scss";


export default function EmailForm(props) {

    const {currentEmail, setShowModal,refetch} = props; 

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            email: currentEmail || ""
        },
        validationSchema: Yup.object({
          email: Yup.string().email().required()
        }),
        onSubmit: async (formData) => {
            try {
                
                await updateUser({
                    variables:{
                        input: formData
                    }
                });
                refetch();
                setShowModal(false);

            } catch (error) {
                toast.error("Error al cambiar contraseña");
            }
        }
   });

    return (
        <Form className="email-form" onSubmit={formik.handleSubmit}>
            <Form.Input
             placeholder="Escribe tu nuevo email"
             name ="email"
             onChange = {formik.handleChange}
             value={formik.values.email}
             error={formik.errors.email && true}
            />
            <Button type="submit" 
            className="btn-submit">
                Actualizar
            </Button>

        </Form>
    )
}
