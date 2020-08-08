import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {size} from "lodash";

import Profile from "../components/User/Profile";
import {GET_PUBLICATIONS} from "../gql/publication";
import Publications from "../components/Publications";

export default function User() {

    const {username} = useParams();
   
    const {data, loading, startPolling, stopPolling} = useQuery(GET_PUBLICATIONS,{
        variables: {username},
    });
    
    useEffect(() => {
        startPolling(20000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])


    if(loading) return null;
    
    const {getPublications} = data;

  
    return (
        <>
            <Profile username={username} totalPublications={size(getPublications)}/>
            <Publications getPublications={getPublications}/>
        </>
    )
}
