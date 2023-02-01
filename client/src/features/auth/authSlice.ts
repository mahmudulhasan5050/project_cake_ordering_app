import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthInfoType } from '../../types/authType';
import { signUp, signIn } from './authAsync';

const storageLocal = localStorage.getItem('profile') as string;

type InitialState = {
  authInfo: AuthInfoType;
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  authInfo: {
    signInName: (storageLocal !== '{}') ? JSON.parse(storageLocal).signInName : '',
    admin: (storageLocal !== '{}') ? JSON.parse(storageLocal).admin : false,
    isLoggedIn: (storageLocal !== '{}') ? true : false,
    _id: (storageLocal !== '{}') ? JSON.parse(storageLocal)._id : '',
  },
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) =>{
         state.authInfo.signInName = ''
         state.authInfo.admin = false
         state.authInfo.isLoggedIn = false
         state.authInfo._id = ''
         localStorage.setItem('profile', JSON.stringify({}));
    }
  },
  extraReducers: (builder) => {
    //signUp
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action: PayloadAction<AuthInfoType>) => {
      state.isLoading = false;
      state.authInfo.signInName = action.payload.signInName;
      state.authInfo.admin = action.payload.admin;
      state.authInfo._id = action.payload._id;
      state.authInfo.isLoggedIn = true
      action.payload &&
        localStorage.setItem('profile', JSON.stringify(action.payload)); 
      state.error = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });

    //signIn
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<AuthInfoType>) => {
      state.isLoading = false;
      state.authInfo.signInName = action.payload.signInName;
      state.authInfo.admin = action.payload.admin;
      state.authInfo._id = action.payload._id;
      state.authInfo.isLoggedIn = true  
      action.payload &&
        localStorage.setItem('profile', JSON.stringify(action.payload));
      state.error = '';
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong!!';
    });
  },
});

export default userSlice.reducer;
export const {logout} = userSlice.actions
