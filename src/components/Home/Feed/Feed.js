import React,{useState, useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {map} from "lodash";
import {Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

import ImageNotFound from "../../../assets/png/avatar.png";
import {GET_FEED_PUBLICATIONS} from "../../../gql/publication";
import Actions from "../../Modal/ModalPublication/Actions";
import CommentForm from "../../Modal/ModalPublication/CommentForm";
import ModalPublication from "../../Modal/ModalPublication";

import "./Feed.scss";

export default function Feed() {

    const {data, loading, startPolling, stopPolling} = useQuery(GET_FEED_PUBLICATIONS);

    const [show, setShow] = useState(false);
    const [publication, setPublication] = useState(null);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling,stopPolling])


    if(loading) return null;

    const {getPublicationFolloweds} = data;
   
    const openPublication = (publication) => {
        setPublication(publication);
        setShow(true);
    }

    return (
        <>
        <div className="feed">
            {map(getPublicationFolloweds, (publication, index) => (
                <div key={index} className="feed__box">
                 <Link to={`/${publication.idUser.username}`}>
                    <div className="feed__box-user">
                        <Image
                         src={publication.idUser.avatar || ImageNotFound}
                         avatar
                         />
                        <span>{publication.idUser.name}</span>
                    </div>
                 </Link>
                 <div
                 className="feed__box-photo"
                 style={{backgroundImage: `url("${publication.file}")`}}
                 onClick={() => openPublication(publication)}
                 /> 
                 <div className="feed__box-actions">
                    <Actions publication={publication}/>
                 </div>
                 <div className="feed__box-form">
                 <CommentForm publication={publication}/>    
                </div>
                </div>


            ))}
        </div>
        {show && (
            <ModalPublication 
             show={show}
             setShow={setShow}
             publication={publication}
            />
        )}
        </>
    )
}
