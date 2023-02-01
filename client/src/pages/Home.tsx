import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { Grid, Box } from '@mui/material';

import CardCake from '../components/cardCake/CardCake';
import { fetchCakes } from '../features/cake/cakeAsync';
import LoadingPage from '../components/loadingPage/LoadingPage';

const Home = () => {
  const dispatch = useAppDispatch();
  const allCakes = useAppSelector((state) => state.cake);

  useEffect(() => {

    dispatch(fetchCakes());
  }, [dispatch]);

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
      width='80%'
      sx={{ margin: 'auto' }}
    >
      <Grid container spacing={5} alignItems='center' justifyContent='center'>
        {allCakes.isLoading && (
          <Grid item>
            <LoadingPage />
          </Grid>
        )}

        {!allCakes.isLoading && allCakes.error ? (
          <Grid item> Error: {allCakes.error}</Grid>
        ) : null}

        {!allCakes.isLoading && allCakes.cakes.length ? (
          <>
            {allCakes.cakes.map((item) => (
              <Grid item key={item._id} md={3}>
                <CardCake key={item.name} cake={item} />
              </Grid>
            ))}
          </>
        ) : null}
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default Home;
