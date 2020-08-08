import React from 'react';

import {Form, Button} from "semantic-ui-react";
import {useFormik} from 'formik';
import {useMutation} from "@apollo/client";
import * as Yup from "yup";
import {toast} from "react-toastify";


import {UPDATE_USER} from "../../../gql/user";

import "./SiteWebForm.scss";

export default function SiteWebForm(props) {

    const {setShowModal, refetch, currentSite} = props;

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            siteWeb: currentSite || ""
        },
        validationSchema: Yup.object({
            siteWeb: Yup.string().required()
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
                toast.error("Ocurrió un error al actualizar el sitio web");
            }


        }
    })

    return (
        <Form className="siteweb-form" onSubmit={formik.handleSubmit}>
            <Form.Input
            name="siteWeb"
            placeholder="Sitio Web"
            onChange={formik.handleChange}
            value={formik.values.siteWeb}
            error={formik.errors.siteWeb && true}
            />

            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}
