import React, { useState, useEffect } from 'react';
import { Grow, Container, Grid } from '@material-ui/core';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Home = ({ user, setUser }) => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form
              user={user}
              setUser={setUser}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
