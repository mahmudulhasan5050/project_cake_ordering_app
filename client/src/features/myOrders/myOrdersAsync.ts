import { createAsyncThunk } from '@reduxjs/toolkit';

import { OrdersType, OrderSubmitType } from '../../types/orderType';
import {
  axiosUserOrdersById
} from '../../axios';


export const fetchMyOrders = createAsyncThunk(
  'orders/fetchOrdersById', async (userId: string) => {
  const response = await axiosUserOrdersById(userId);
  const result: OrdersType[] = await response.data;
  return result;
});


// export const deleteOrder = createAsyncThunk(
//   'orders/deleteOrder',
//   async (id: string) => {
//     await axiosDeleteOrder(id);

//     return id;
//   }
// );



