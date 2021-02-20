import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Card, Grid, Pagination } from 'semantic-ui-react';
import PostForm from '../components/PostForm';
import ListPost from '../components/ListPost';

import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {

    const { user } = useContext(AuthContext);
    const { loading, data: { getPosts: posts = [] } = {} } = useQuery(FETCH_POSTS_QUERY);

    //STATES
    const [page, setPage] = useState(1);
    const itemsPerPage = 2;

    let listPostOfUser;
    let totalPages = 1;
    let postsShowPerPage = [];
    if (!loading && user) {

        listPostOfUser = posts.filter(post => post.username === user.username);
        totalPages = listPostOfUser.length / itemsPerPage;
        postsShowPerPage = listPostOfUser.slice(
            (page - 1) * itemsPerPage,
            (page - 1) * itemsPerPage + itemsPerPage
          );
    }
    // const listPostOfUser = posts.filter(post => post.username === user.username);
    // const totalPages = listPostOfUser.length / itemsPerPage;
    // const postsShowPerPage = listPostOfUser.slice(
    //         (page - 1) * itemsPerPage,
    //         (page - 1) * itemsPerPage + itemsPerPage
    //       );

    return (
        <Grid stackable columns={user ? 2 : 1} >
            <Grid.Row>
                {user ? (
                    <>
                    <Grid.Column>
                        <PostForm />
                        <Card fluid>
                            <Card.Content>
                                <h1 className='page-title'>Your Posts</h1>
                                <ListPost listpost={postsShowPerPage} />
                                <Pagination
                                    className='pagination_fixed'
                                    activePage={page}
                                    firstItem={null}
                                    lastItem={null}
                                    pointing
                                    secondary
                                    totalPages={totalPages}
                                    onPageChange={(event, data) => setPage(data.activePage)}
                                />
                            </Card.Content>
                        </Card>
                        
                    </Grid.Column>
                    <Grid.Column>
                        <h1 className='page-title'>Recent Posts</h1>
                        <ListPost listpost={posts} />
                    </Grid.Column>
                    </>
                ) : (
                    <Grid.Column>
                        <h1 className='page-title'>Recent Posts</h1>
                        <ListPost listpost={posts} />
                    </Grid.Column>
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home
