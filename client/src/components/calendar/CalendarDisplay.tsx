import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

import { OrderSubmitType } from '../../types/orderType';

type DesiredDateType = {
  desiredDate: Dayjs | undefined | null;
  setDesiredDate: (date: Dayjs | undefined | null) => void;
  order: OrderSubmitType;
  setOrder: (data: OrderSubmitType) => void;
};

// props from ...components/orderCake/OrderCake.tsx
const DatePickers = ({
  desiredDate,
  setDesiredDate,
  order,
  setOrder,
}: DesiredDateType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast
        label='Please Mention a Delivery Date'
        value={desiredDate}
        onChange={(newValue) => {
          setDesiredDate(newValue);
          setOrder({ ...order, deliveryDate: newValue?.format() });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickers;
