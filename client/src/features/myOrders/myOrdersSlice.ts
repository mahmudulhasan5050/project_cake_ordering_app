import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {  OrdersType } from '../../types/orderType';
import { fetchMyOrders } from './myOrdersAsync';

type InitialState = {
  myOrders: OrdersType[];
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  myOrders: [],
  isLoading: false,
  error: '',
};

const myOrderSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchMyOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchMyOrders.fulfilled,
      (state, action: PayloadAction<OrdersType[]>) => {
        state.isLoading = false;
        state.myOrders = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchMyOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.myOrders = [];
      state.error = action.error.message || 'Something went wrong!!';
    });

  },
});

export default myOrderSlice.reducer;
