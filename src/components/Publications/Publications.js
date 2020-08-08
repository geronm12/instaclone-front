import React from 'react';
import {Grid} from "semantic-ui-react";
import {map} from "lodash";

import PreviewPublications from "./PreviewPublications";
import "./Publications.scss";

export default function Publications(props) {

    const {getPublications} = props;

    return (
        <div className="publications">
           <h1>Publicaciones</h1>
           <Grid columns={3}>
            {map(getPublications, (publication,index) => (
                <Grid.Column key={index}>
                    <PreviewPublications publication={publication}/>
                </Grid.Column>
            ))}
            </Grid>
        </div>
    )
}
