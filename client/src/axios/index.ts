import { API } from './axiosUrl';
import customAxios from './axiosConfig';
import { CakeType } from '../types/cakeType';
import { OrderSubmitType } from '../types/orderType';
import { UserType } from '../types/userType';
import { SignUpType, SignInType } from '../types/authType';

if (!localStorage.getItem('profile')) {
  localStorage.setItem('profile', JSON.stringify({}));
}

//cake
export const axiosFetchCakes = () => API.get('/cakes');
export const axiosAddCake = (cake: CakeType) =>
  customAxios.post('/cakes', cake);
export const axiosDeleteCake = (id: string) =>
  customAxios.delete(`/cakes/${id}`);
export const axiosUpdateCake = (id: string, updateInfo: CakeType) =>
  customAxios.post(`/cakes/${id}`, updateInfo);

//user
export const axiosFetchUsers = () => customAxios.get('/users');
export const axiosAddUser = (user: UserType) =>
  customAxios.post('/users', user);
export const axiosDeleteUser = (id: string) =>
  customAxios.delete(`/users/${id}`);
export const axiosUpdateUser = (id: string, updateInfo: UserType) =>
  customAxios.post(`/users/${id}`, updateInfo);

//orders
export const axiosFetchOrders = () => customAxios.get('/orders');
export const axiosAddOrder = (order: OrderSubmitType) =>
  customAxios.post('/orders', order);
export const axiosDeleteOrder = (id: string) =>
  customAxios.delete(`/orders/${id}`);
export const axiosUpdateOrder = (id: string, updateInfo: OrderSubmitType) =>
  customAxios.post(`/orders/${id}`, updateInfo);
export const axiosUserOrdersById = (userId: string) =>
  customAxios.get(`/orders/userorders/${userId}`);
export const axiosDeliveryStatusOrder = (id: string) =>
  customAxios.post(`/orders/deliverystatus/${id}`);

// authentication
export const axiosSignIn = (user: SignInType) => API.post('/auth/signin', user);
export const axiosSignUp = (user: SignUpType) => API.post('/auth/signup', user);
