import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '../../types/userType';
import { fetchUsers, addUser, deleteUser, updateUser } from './userAsync';

type InitialState = {
  users: UserType[];
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  users: [],
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<UserType[]>) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.error = action.error.message || 'Something went wrong!!';
    });

    //addUser
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addUser.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.isLoading = false;
        state.users.push(action.payload);
        state.error = '';
      }
    );
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });

    //deleteUser
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.users = state.users.filter((del) => {
        return del._id !== action.payload;
      });
      state.error = '';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });

    //update
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.isLoading = false;
        const index = state.users.findIndex(
          (inx) => inx._id === action.payload._id
        );
        state.users[index] = action.payload;
        state.error = '';
      }
    );
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });
  },
});

export default userSlice.reducer;
