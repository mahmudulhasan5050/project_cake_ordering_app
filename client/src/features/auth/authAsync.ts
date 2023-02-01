import { createAsyncThunk } from '@reduxjs/toolkit';

import { SignUpType, SignInType } from '../../types/authType';
import {axiosSignUp, axiosSignIn} from '../../axios'


// if(!localStorage.getItem('profile')) {
//   localStorage.setItem('profile', JSON.stringify({}));
// }
export const signUp = createAsyncThunk(
  'users/signUp',
  async (user: SignUpType) => {
    const response = await axiosSignUp(user);
    const result = response.data;
    return result;
  }
);

export const signIn = createAsyncThunk(
  'users/signIn',
  async (user: SignInType) => {
    const response = await axiosSignIn(user);
    const result = response.data;
    return result;
  }
);