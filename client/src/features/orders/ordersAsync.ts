import { createAsyncThunk } from '@reduxjs/toolkit';

import { OrdersType, OrderSubmitType } from '../../types/orderType';
import {
  axiosFetchOrders,
  axiosAddOrder,
  axiosDeleteOrder,
  axiosUpdateOrder,
  axiosDeliveryStatusOrder
} from '../../axios';


export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders', async () => {
  const response = await axiosFetchOrders();
  const result: OrdersType[] = await response.data;
  return result;
});

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (order: OrderSubmitType) => {
    const response = await axiosAddOrder(order);
    const result: OrdersType = response.data;
    return result;
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id: string) => {
    await axiosDeleteOrder(id);

    return id;
  }
);

type UpdateType = {
  id: string;
  updateInfo: OrderSubmitType;
};
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (update: UpdateType) => {
    const { id, updateInfo } = update;
    const response = await axiosUpdateOrder(id, updateInfo);
    const result: OrdersType = response.data;
    return result;
  }
);

export const updateDeliveryStatusOrder = createAsyncThunk(
  'orders/updateDeliveryStatusOrder',
  async (id: string) => {
    const response = await axiosDeliveryStatusOrder(id);
    const result: OrdersType = response.data;
    return result;
  }
);


