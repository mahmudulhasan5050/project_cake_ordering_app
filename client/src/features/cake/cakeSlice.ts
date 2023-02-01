import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CakeType } from '../../types/cakeType';
import { fetchCakes, addCake, deleteCake, updateCake } from './cakeAsync';

type InitialState = {
  cakes: CakeType[];
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  cakes: [],
  isLoading: false,
  error: '',
};

const cakeSlice = createSlice({
  name: 'cakes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchCakes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCakes.fulfilled,
      (state, action: PayloadAction<CakeType[]>) => {
        state.isLoading = false;
        state.cakes = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchCakes.rejected, (state, action) => {
      state.isLoading = false;
      state.cakes = [];
      state.error = action.error.message || 'Something went wrong!!';
    });

    //addCake
    builder.addCase(addCake.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addCake.fulfilled,
      (state, action: PayloadAction<CakeType>) => {
        state.isLoading = false;
        state.cakes.push(action.payload);
        state.error = '';
      }
    );
    builder.addCase(addCake.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });

    //deleteCake
    builder.addCase(deleteCake.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCake.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.cakes = state.cakes.filter((del) => {
        return del._id !== action.payload;
      });
      state.error = '';
    });
    builder.addCase(deleteCake.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });

    //update
    builder.addCase(updateCake.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateCake.fulfilled,
      (state, action: PayloadAction<CakeType>) => {
        state.isLoading = false;
        const index = state.cakes.findIndex(inx => inx._id === action.payload._id)
        state.cakes[index] = action.payload
        state.error = '';
      }
    );
    builder.addCase(updateCake.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });
  },
});

export default cakeSlice.reducer;
