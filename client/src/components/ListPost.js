import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from './PostCard';

function ListPost({ listpost }) {

    return (
        <Grid stackable columns={1} >
            <Grid.Row>
                    <Transition.Group>
                        {
                            listpost && listpost.map(post => (
                                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))
                        }
                    </Transition.Group>
            </Grid.Row>
        </Grid>
    )
}

export default ListPost
