import React, { useState } from 'react';

import CakeForm from '../components/forms/CakeForm';
import CakeTable from '../components/tables/cakeTable/CakeTable';

const CakeDetails = () => {
  const [cakeId, setCakeId] = useState('');

  return (
    <div>
      <CakeTable setCakeId={setCakeId} />
      <CakeForm cakeId={cakeId} setCakeId={setCakeId} />
    </div>
  );
};

export default CakeDetails;
