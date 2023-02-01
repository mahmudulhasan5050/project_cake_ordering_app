import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { styled } from '@mui/material/styles';
import { Grid, TextField, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import dayjs, { Dayjs } from 'dayjs';

import { OrderSubmitType } from '../../types/orderType';
import CalendarDisplay from '../calendar/CalendarDisplay';
import { addOrder } from '../../features/orders/ordersAsync';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const OrderCake = () => {
  const { cakeId, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedCake = useAppSelector((state) =>
    state.cake.cakes.filter((item) => item._id === cakeId)
  );
  const [amount, setAmount] = useState(1);
  const [desiredDate, setDesiredDate] = React.useState<
    Dayjs | undefined | null
  >(dayjs());
  const [total, setTotal] = useState(selectedCake[0].price);
  const [order, setOrder] = useState<OrderSubmitType>({
    userId: '',
    cakeId: '',
    amount: amount,
    totalPrice: total,
    deliveryDate: desiredDate?.format(),
  });

  useEffect(() => {
    setOrder({
      userId: userId ? userId : undefined,
      cakeId: selectedCake[0]._id,
      amount: amount,
      totalPrice: total,
      deliveryDate: desiredDate?.format(),
    });
  }, []);

  const orderSubmit = () => {
    dispatch(addOrder(order));
    clear();
    navigate('/');
  };

  const clear = () => {
    setAmount(1);
    setOrder({
      userId: '',
      cakeId: '',
      amount: amount,
      totalPrice: selectedCake[0].price * amount,
      deliveryDate: '',
    });
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 700,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt='complex' src={selectedCake[0].selectedFile} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                {selectedCake[0].name}
              </Typography>
              <Typography variant='body2' gutterBottom>
                {selectedCake[0].description}
              </Typography>
              <TextField
                label='Amount'
                sx={{ m: 1, width: '20ch', marginLeft: '0em' }}
                variant='filled'
                type='number'
                value={amount}
                onChange={(e: any) => {
                  setAmount(e.target.value);
                  setTotal(selectedCake[0].price * e.target.value);
                  setOrder({
                    ...order,
                    amount: e.target.value,
                    totalPrice: selectedCake[0].price * e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item>
              <Button variant='contained' color='success' onClick={orderSubmit}>
                Submit Order
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' component='div'>
              € {total}
            </Typography>
            <CalendarDisplay
              desiredDate={desiredDate}
              setDesiredDate={setDesiredDate}
              order={order}
              setOrder={setOrder}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default OrderCake;
