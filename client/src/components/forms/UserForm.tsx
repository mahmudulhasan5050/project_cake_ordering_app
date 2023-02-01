import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { UserType } from '../../types/userType';
import { addUser, updateUser } from '../../features/user/userAsync';

type UserIdStateType = {
  userId: string;
  setUserId: (userId: string) => void;
};

const UserForm = ({ userId, setUserId }: UserIdStateType) => {
  const [userState, setUserState] = useState<UserType>({
    userName: '',
    phone: '',
  });

  const dispatch = useAppDispatch();
  const userInfoForEdit = useAppSelector((state) =>
    userId ? state.user.users.find((us) => us._id === userId) : null
  );
  useEffect(() => {
    if (userInfoForEdit) setUserState(userInfoForEdit);
  }, [userInfoForEdit]);

  const clear = () => {
    setUserState({
      userName: '',
      phone: '',
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
            Edit User
          </Typography>
          <TextField
            variant='outlined'
            label='Name'
            type='text'
            margin='normal'
            value={userState.userName}
            onChange={(e: any) =>
              setUserState({ ...userState, userName: e.target.value })
            }
          />
          <TextField
            variant='outlined'
            label='Phone Number'
            type='text'
            margin='normal'
            value={userState.phone}
            onChange={(e: any) =>
              setUserState({ ...userState, phone: e.target.value })
            }
          />
          <Button
            variant='contained'
            color='warning'
            sx={{ marginTop: 3, borderRadius: 2 }}
            onClick={() => {
              if (userId !== '') {
                const update = { id: userId, updateInfo: userState };
                dispatch(updateUser(update));
                setUserId('');
                clear();
              } else {
                dispatch(addUser(userState));
                clear();
              }
            }}
          >
            Update
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default UserForm;
