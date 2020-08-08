import React from 'react';
import {Button} from "semantic-ui-react";
import {useQuery, useMutation} from "@apollo/client";
import {toast} from "react-toastify";

import {IS_FOLLOW, FOLLOW, UNFOLLOW} from "../../../../gql/follow";


import "./HeaderProfile.scss";


export default function HeaderProfile(props) {

    const {getUser,auth,handlerModal} = props;

    const {data, loading, refetch} = useQuery(IS_FOLLOW, {
        variables: {username: getUser.username}
    });

    const [follow] = useMutation(FOLLOW);



    const [unFollow] = useMutation(UNFOLLOW);

    

    const onFollow = async () => {

        try {

            await follow({
                variables:{username: getUser.username}
            });

            refetch();
            
        } catch (error) {
            toast.error("Ocurrió un error al seguir al usuario");
        }

    }

    const onUnFollow = async () => {
       
        try {

            await unFollow({
                variables:{username: getUser.username}
            });

            refetch();

            
        } catch (error) {
            toast.error("Ocurrió un error al seguir al usuario");
        }
    }

    const buttonFollow = () => {
        if(data.isFollow) {
      
        return <Button className="btn-danger" onClick={onUnFollow}>
                 Dejar de Seguir
                </Button>
            
        } else{
            return <Button className="btn-action" onClick={onFollow}>
                    Seguir
                </Button>
            
        }
    }

    return (
        <div className="header-profile">
            <h2>{getUser.username}</h2>
            {getUser.username ===  auth.username 
            ? <Button onClick={() => handlerModal("settings")}>Ajustes</Button>
            : (
                !loading && buttonFollow()
            )
        }
        </div>
    )
}
