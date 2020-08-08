import React from 'react';
import {Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {map} from "lodash";
import {useQuery} from "@apollo/client";

import {GET_NOT_FOLLOWEDS} from "../../../gql/follow";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./NotFollowed.scss";

export default function NotFollowed() {

    const {data, loading} = useQuery(GET_NOT_FOLLOWEDS);


    if(loading) return null;
 
    const {getNotFollowed}  = data;
  
    return (
        <div className="not-followed">
            <h3>Usuarios que no sigues</h3>
            {map(getNotFollowed, (user, index) => (
                <Link key={index} to={`/${user.username}`} className="not-followed__user">
                    <Image src={user.avatar || ImageNotFound} avatar/>
                      <span>{user.name}</span> 
                </Link>
            ))}
        </div>
    )
}
