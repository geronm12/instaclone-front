import React from 'react';
import {Button} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import {useApolloClient} from "@apollo/client";
import useAuth from "../../../hooks/useAuth";

import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";
import SiteWebForm from "../SiteWebForm";

import "./SettingsForm.scss";

export default function SettingsForm(props) {

    const {refetch,setShowModal,setTitleModal,setChildren, getUser} = props;
    const history = useHistory();
    const client = useApolloClient();
    const {logout} = useAuth();

    const onLogout = () => {
        client.clearStore();
        logout();
        history.push("/");
    }


    const onChangePassword = () => {
        setTitleModal("Cambiar tu contraseña");
        setChildren(
            <PasswordForm Logout={onLogout}/>
        );
    }


    const onChangeEmail = () => {
        setTitleModal("Cambiar email");
        setChildren(<EmailForm refetch={refetch} setShowModal={setShowModal} currentEmail={getUser.email}/>);
    }

    const onChangeSiteWeb = () => {
        setTitleModal("Cambia tu sitio web");
        setChildren(<SiteWebForm setShowModal={setShowModal} refetch={refetch} currentSite={getUser.siteWeb}/>);
    }

    const onChangeDescription = () => {
        setTitleModal("Actualizar tu biografía");
        setChildren(<DescriptionForm 
            setShowModal={setShowModal}
            currentDescription={getUser.description}
            refetch={refetch}
            />)
    }

    return (
        <div className="settings-form">
            <Button onClick={onChangePassword}>Cambiar contraseña</Button>
            <Button onClick={onChangeEmail}>Cambiar email</Button>
            <Button onClick={onChangeDescription}>Descripcion</Button>
            <Button onClick={onChangeSiteWeb}>Sitio Web</Button>
            <Button onClick={onLogout}>Cerrar Sesión</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
    )
}
