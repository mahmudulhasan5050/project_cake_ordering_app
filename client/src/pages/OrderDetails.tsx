import React, { useState } from 'react';

//import CakeForm from '../components/forms/CakeForm';
import OrderTable from '../components/tables/orderTable/OrderTable';

const OrderDetails = () => {
  const [orderId, setOrderId] = useState('');

  return (
    <div>
      <OrderTable setOrderId={setOrderId} />
      {/* <CakeForm cakeId={cakeId} setCakeId={setCakeId} /> */}
    </div>
  );
};

export default OrderDetails;
