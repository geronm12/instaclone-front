import React from 'react';
import {Grid} from "semantic-ui-react";


import useAuth from "../../hooks/useAuth";
import Feed from "../../components/Home/Feed";
import NotFollowed from "../../components/Home/NotFollowed";
import "./Home.scss";

export default function Home() {

    const auth = useAuth();
   
    return (
        <Grid className="home">
            <Grid.Column className="home__left" width={11}>
               <Feed/>
            </Grid.Column>
            <Grid.Column className="home__left" width={5}>
                <NotFollowed/>
            </Grid.Column>
        </Grid>
    )
}
