import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {  OrdersType } from '../../types/orderType';
import { fetchOrders, addOrder, deleteOrder, updateOrder, updateDeliveryStatusOrder } from './ordersAsync';

type InitialState = {
  orders: OrdersType[];
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  orders: [],
  isLoading: false,
  error: '',
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
        fetchOrders.fulfilled,
      (state, action: PayloadAction<OrdersType[]>) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.orders = [];
      state.error = action.error.message || 'Something went wrong!!';
    });

    //add
    builder.addCase(addOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
        addOrder.fulfilled,
      (state, action: PayloadAction<OrdersType>) => {
        state.isLoading = false;
        state.orders.push(action.payload);
        state.error = '';
      }
    );
    builder.addCase(addOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });

    //deleteCake
    builder.addCase(deleteOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.orders = state.orders.filter((del) => {
        return del._id !== action.payload;
      });
      state.error = '';
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });

    //update
    builder.addCase(updateOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
        updateOrder.fulfilled,
      (state, action: PayloadAction<OrdersType>) => {
        state.isLoading = false;
        const index = state.orders.findIndex(inx => inx._id === action.payload._id)
        state.orders[index] = action.payload
        state.error = '';
      }
    );
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });

//deliveryStatus
    builder.addCase(updateDeliveryStatusOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateDeliveryStatusOrder.fulfilled,
      (state, action: PayloadAction<OrdersType>) => {
        state.isLoading = false;
        const index = state.orders.findIndex(inx => inx._id === action.payload._id)
        state.orders[index] = action.payload
        state.error = '';
      }
    );
    builder.addCase(updateDeliveryStatusOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });

  },
});

export default orderSlice.reducer;
