import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { Button, Box, Typography, TextField } from '@mui/material';
import FileBase64 from 'react-file-base64';

import { CakeType } from '../../types/cakeType';
import { addCake, updateCake } from '../../features/cake/cakeAsync';

type CakeIdStateType = {
  cakeId: string;
  setCakeId: (cakeId: string) => void;
};

// pages/CreateProduct.tsx
const CakeForm = ({ cakeId, setCakeId }: CakeIdStateType) => {
  const [cakeFormState, setCakeFormState] = useState<CakeType>({
    name: '',
    price: 0,
    description: '',
    selectedFile: '',
  });

  const dispatch = useAppDispatch();
  const cakeInfoForEdit = useAppSelector((state) =>
    cakeId ? state.cake.cakes.find((ca) => ca._id === cakeId) : null
  );
  useEffect(() => {
    if(cakeInfoForEdit) setCakeFormState(cakeInfoForEdit)
 
  }, [cakeInfoForEdit]);


  const clear = () => {
    setCakeFormState({
      name: '',
      price: 0,
      description: '',
      selectedFile: '',
    });
  };

  return (
    <div>
      <form>
        <Box
          display='flex'
          flexDirection='column'
          maxWidth={400}
          alignItems='center'
          justifyContent='center'
          margin='auto'
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow='5px 5px 10px #ccc'
          sx={{
            ':hover': {
              boxShadow: '10px 10px 20px #ccc',
            },
          }}
        >
          <Typography variant='h5' padding={3} textAlign='center'>
            { (cakeId === '') ? 'Create Cake' : 'Edit Cake'}
          </Typography>
          <TextField
            variant='outlined'
            label='Cake Name'
            type='text'
            margin='normal'
            value={cakeFormState.name}
            onChange={(e: any) =>
              setCakeFormState({ ...cakeFormState, name: e.target.value })
            }
          />
          <TextField
            variant='outlined'
            label='Description'
            type='text'
            margin='normal'
            value={cakeFormState.description}
            onChange={(e: any) =>
              setCakeFormState({
                ...cakeFormState,
                description: e.target.value,
              })
            }
          />
          <TextField
            variant='outlined'
            label='Price'
            type='number'
            margin='normal'
            value={cakeFormState.price}
            onChange={(e: any) =>
              setCakeFormState({
                ...cakeFormState,
                price: parseInt(e.target.value),
              })
            }
          />
          <FileBase64
            type='file'
            multiple={false}
            onDone={({ base64 }: any) =>
              setCakeFormState({ ...cakeFormState, selectedFile: base64 })
            }
          />
          <Button
            variant='contained'
            color='warning'
            sx={{ marginTop: 3, borderRadius: 2 }}
            onClick={() => {
              if(cakeId !== '') {
                const update = {id: cakeId, updateInfo :cakeFormState}
                dispatch(updateCake(update))
                setCakeId('')
                clear();
              }
              else{
                dispatch(addCake(cakeFormState));
                clear();
              }
            }}
          >
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CakeForm;
