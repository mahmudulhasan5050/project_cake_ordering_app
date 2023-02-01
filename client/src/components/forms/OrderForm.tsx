// import React, { useState, useEffect } from 'react';
// import { Button, Box, Typography, TextField } from '@mui/material';
// import { useAppSelector, useAppDispatch } from '../../redux/hooks';

// import { OrderType } from '../../types/orderType';
// import { addOrder, updateOrder } from '../../features/orders/ordersAsync';

// type OrderIdStateType = {
//   orderId: string;
//   setOrderId: (orderId: string) => void;
// };

// const OrderForm = ({ orderId, setOrderId }: OrderIdStateType) => {
//   const [orderState, setOrderState] = useState<OrderType>({
//     userId: '',
//     cakeId: '',
//     amount: 1,
//     totalPrice: 0,
//     deliveryDate: ''
//   });

//   const dispatch = useAppDispatch();
//   const orderInfoForEdit = useAppSelector((state) =>
//     orderId ? state.order.orders.find((us) => us._id === orderId) : null
//   );
//   useEffect(() => {
//     if (orderInfoForEdit) setOrderState(orderInfoForEdit);
//   }, [orderInfoForEdit]);

//   const clear = () => {
//     setOrderState({
//         userId: '',
//         cakeId: '',
//         amount: 1,
//         totalPrice: 0,
//         deliveryDate: ''
//     });
//   };
//   return (
//     <div>
//       <form>
//         <Box
//           display='flex'
//           flexDirection='column'
//           maxWidth={400}
//           alignItems='center'
//           justifyContent='center'
//           margin='auto'
//           marginTop={5}
//           padding={3}
//           borderRadius={5}
//           boxShadow='5px 5px 10px #ccc'
//           sx={{
//             ':hover': {
//               boxShadow: '10px 10px 20px #ccc',
//             },
//           }}
//         >
//           <Typography variant='h5' padding={3} textAlign='center'>
//             {orderId === '' ? 'Create User' : 'Edit User'}
//           </Typography>
//           <TextField
//             variant='outlined'
//             label='Name'
//             type='text'
//             margin='normal'
//             value='{orderState.userName}'
//             // onChange={(e: any) =>
//             //   setOrderState({ ...orderState, userName: e.target.value })
//             // }
//           />
//           <TextField
//             variant='outlined'
//             label='Phone Number'
//             type='text'
//             margin='normal'
//             value='{orderState.phone}'
//             // onChange={(e: any) =>
//             //   setUserState({ ...userState, phone: e.target.value })
//             // }
//           />
//           <Button
//             variant='contained'
//             color='warning'
//             sx={{ marginTop: 3, borderRadius: 2 }}
//             onClick={() => {
//               if (orderId !== '') {
//                 const update = { id: orderId, updateInfo: orderState };
//                 dispatch(updateOrder(update));
//                 setOrderId('');
//                 clear();
//               } else {
//                 dispatch(addOrder(orderState));
//                 clear();
//               }
//             }}
//           >
//             SignUp
//           </Button>
//         </Box>
//       </form>
//     </div>
//   );
// };

// export default OrderForm;
export {}
