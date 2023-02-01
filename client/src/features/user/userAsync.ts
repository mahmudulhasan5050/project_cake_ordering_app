import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserType } from '../../types/userType';
import {
  axiosFetchUsers,
  axiosAddUser,
  axiosDeleteUser,
  axiosUpdateUser,
} from '../../axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axiosFetchUsers();
  const result: UserType[] = await response.data;
  return result;
});

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: UserType) => {
    const response = await axiosAddUser(user);
    const result: UserType = response.data;
    return result;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string) => {
    await axiosDeleteUser(id);

    return id;
  }
);

type UpdateType = {
  id: string;
  updateInfo: UserType;
};
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (update: UpdateType) => {
    const { id, updateInfo } = update;
    const response = await axiosUpdateUser(id, updateInfo);
    const result: UserType = response.data;
    return result;
  }
);
