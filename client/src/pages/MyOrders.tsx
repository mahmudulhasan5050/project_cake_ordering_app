import {  useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import dayjs from 'dayjs';

import LoadingPage from '../components/loadingPage/LoadingPage';
import { fetchMyOrders } from '../features/myOrders/myOrdersAsync';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.authInfo?._id);
  const myOrders = useAppSelector((state) => state.myOrder);

  useEffect(() => {
    userId && dispatch(fetchMyOrders(userId));
  }, [dispatch, userId]);

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 800,
        flexGrow: 1,
      }}
    >
      {myOrders.isLoading && (
        <Grid item>
          <LoadingPage />
        </Grid>
      )}
      {!myOrders.isLoading && myOrders.error ? (
        <Grid item> Error: {myOrders.error}</Grid>
      ) : null}
      {!myOrders.isLoading && myOrders.myOrders.length ? (
        <>
          {myOrders.myOrders.map((item, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt='complex' src={item.cakeId?.selectedFile} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction='column' spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant='subtitle1'
                      component='div'
                    >
                      {item.cakeId?.name}
                    </Typography>
                    <Typography variant='body2' sx={{fontWeight: 'bold'}} color={item.deliveryStatus ? '#17FF00':'red'} gutterBottom>
                      {item.deliveryStatus ? 'Delivered' : 'Not Delivered'}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      {dayjs(item.deliveryDate).format('DD/MM/YYYY')}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1' component='div'>
                    Total Price: € {item.totalPrice}
                  </Typography>
                  <Typography variant='subtitle1' component='div'>
                    Amount: {item.amount}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </>
      ) : null}
    </Paper>
  );
};
export default MyOrders;
