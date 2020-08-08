import React, {useEffect,useState} from 'react';
import {useQuery} from "@apollo/client";
import {size} from "lodash";

import {GET_FOLLOWERS, GET_FOLLOWING} from "../../../../gql/follow";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";


import "./Followers.scss";

export default function Followers(props) {

    const {username, totalPublications} = props;

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [children, setChildren] = useState(null);


    const {data: dataFollowers,
         loading: loadingFollowers, 
         startPolling:startPollingFollowers, 
         stopPolling: stopPollingFollowers} = useQuery(GET_FOLLOWERS, {
         variables: {username}
    })

    const {data: dataFollowings,
           loading: loadingFollowings,
           startPolling: startPollingFollowings,
           stopPolling: stopPollingFollowings} = useQuery(GET_FOLLOWING, {
            variables: {username}
           });

    useEffect(() => {
        startPollingFollowers(20000);
        return () => {
            stopPollingFollowers();
        }
    }, [startPollingFollowers, stopPollingFollowers])


    useEffect(() => {
        startPollingFollowings(20000);
        return () => {
            stopPollingFollowings();
        }
    }, [startPollingFollowings, stopPollingFollowings])

    if(loadingFollowers) return null;
    const {getFollowers} =  dataFollowers;

    if(loadingFollowings) return null;
    
    const {getFollowing} = dataFollowings;

    const openFollowers = () => {
        setTitleModal("Seguidores");
        setChildren(<ListUsers users={getFollowers} setShowModal={setShowModal}/>);
        setShowModal(true);
    }
    
    const openFollowing = () => {
        setTitleModal("Seguidos")
        setChildren(<ListUsers users={getFollowing} setShowModal={setShowModal}/>);
        setShowModal(true);
    }


    return (
        <>
        <div className="followers">
            <p>
            <span>{totalPublications}</span>
             publicaciones
            </p>
            <p className="link" onClick={openFollowers}>
        <span>{size(getFollowers) }</span>
             seguidores
            </p>
            <p className="link" onClick={openFollowing}>
             <span>{size(getFollowing)}</span>
             seguidos
            </p>
       </div>
       <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
           {children}
       </ModalBasic>
       </>
    )
}
