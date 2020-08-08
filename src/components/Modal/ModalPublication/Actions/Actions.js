import React, {useState} from 'react';
import {Icon} from "semantic-ui-react";
import {useMutation, useQuery} from "@apollo/client";

import {ADD_LIKE, DELETE_LIKE, COUNT_LIKES, IS_LIKE} from "../../../../gql/like";

import "./Actions.scss";

export default function Actions(props) {

    const {publication} = props;
    const [loadingAction, setLoadingAction] = useState(false);

    const [addLike] = useMutation(ADD_LIKE);
    const [deleteLike] = useMutation(DELETE_LIKE);
    const {data, loading, refetch} = useQuery(IS_LIKE, {
        variables: {
            idPublication: publication.id
        }
    });

    const {data: dataCount, loading: countLoading, refetch: countRefetch} = useQuery(COUNT_LIKES, {
        variables: {
            idPublication: publication.id
        }
    })


    const onAction = () => {
      if(!loadingAction){
          
            if(isLike){
                onDeleteLike();
            }else{
                onAddLike();
            }
      }
    }

    const onAddLike = async () => {
        setLoadingAction(true);
        try {
            await addLike({
                variables:{
                    idPublication: publication.id
                }
            })
            refetch();
            countRefetch();
          
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    }

    const onDeleteLike = async () => {
        setLoadingAction(true);
        try {
            await deleteLike({
                variables:{
                    idPublication: publication.id
                }
            })
            refetch();
            countRefetch();
        } catch (error) {
            console.log(error);
        }
       
        setLoadingAction(false);
    }

    if(loading || countLoading) return null;
    const {isLike} =  data;
    const {countLikes} = dataCount;

    return (
        <div className="actions">
            <Icon
            className={isLike ? "like active" : "like"}
            name={isLike ? "heart" : "heart outline"}
            onClick={onAction}
            />
            {countLikes} {countLikes === 1 ? "Like" : "Likes"}
        </div>
    )
}
