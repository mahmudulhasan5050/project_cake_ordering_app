import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TableHead,
  Paper,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';

//import { deleteCake } from '../../../features/cake/cakeAsync';
import { fetchOrders, deleteOrder, updateDeliveryStatusOrder } from '../../../features/orders/ordersAsync';

type SetOrderIdStateType = {
  setOrderId: (orderId: string) => void;
};

const headElements = [
  'Cake View',
  'Cake Name',
  'Ordered By',
  'Total Price',
  'Delivery Status',
  'Delivery date',
  'Delete',
];

const TableHome = ({ setOrderId }: SetOrderIdStateType) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  const allOrders = useAppSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Box sx={{ margin: matchesMd ? '0em' : '4em' }}>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed' }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'gray' }}>
              {headElements.map((item, i) => {
                return (
                  <TableCell
                    key={item}
                    align={headElements.length - 1 === i ? 'right' : 'left'}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {allOrders.orders.map((order) => (
            <TableBody key={order._id}>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <img
                    alt={order._id}
                    src={order?.cakeId && order.cakeId.selectedFile}
                    width={60}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: matchesMd ? '0,5em' : '1.2em',
                    color: '#006618',
                  }}
                >
                  {order.cakeId?.name}
                </TableCell>
                <TableCell>{order?.userId?.userName}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  <Button variant='contained'
                  onClick={()=>
                  order._id && dispatch(updateDeliveryStatusOrder(order._id))
                  }
                  >
                    {order.deliveryStatus ? 'Delivered' : 'Not Delivered'}
                  </Button>
                </TableCell>
                <TableCell>
                  {dayjs(order.deliveryDate).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align='right'>
                  <Button
                    onClick={() =>
                      order._id && dispatch(deleteOrder(order._id))
                    }
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableHome;
