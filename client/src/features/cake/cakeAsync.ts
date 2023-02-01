import { createAsyncThunk } from '@reduxjs/toolkit';

import { CakeType } from '../../types/cakeType';
import {
  axiosFetchCakes,
  axiosAddCake,
  axiosDeleteCake,
  axiosUpdateCake,
} from '../../axios';


export const fetchCakes = createAsyncThunk('cakes/fetchCakes', async () => {
  const response = await axiosFetchCakes();
  const result: CakeType[] = await response.data;
  return result;
});

export const addCake = createAsyncThunk(
  'cakes/addCake',
  async (cake: CakeType) => {
    const response = await axiosAddCake(cake);
    const result: CakeType = response.data;
    return result;
  }
);

export const deleteCake = createAsyncThunk(
  'cakes/deleteCake',
  async (id: string) => {
    await axiosDeleteCake(id);

    return id;
  }
);

type UpdateType = {
  id: string;
  updateInfo: CakeType;
};
export const updateCake = createAsyncThunk(
  'cakes/updateCake',
  async (update: UpdateType) => {
    const { id, updateInfo } = update;
    const response = await axiosUpdateCake(id, updateInfo);
    const result: CakeType = response.data;
    return result;
  }
);
