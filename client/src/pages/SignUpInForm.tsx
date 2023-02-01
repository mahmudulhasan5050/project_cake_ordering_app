import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

import { SignUpType } from '../types/authType';
import { signIn, signUp } from '../features/auth/authAsync';

// type UserIdStateType = {
//   userId: string;
//   setUserId: (userId: string) => void;
// };

const SignUpInForm = () => {
  const [authState, setAuthState] = useState<SignUpType>({
    userName: '',
    phone: '',
    password: '',
    retypePassword: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitButton = (e:any) =>{
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(authState));
      clear();
      setIsSignUp((modeSwitch) => !modeSwitch);
      navigate('/auth');
    } else {
      dispatch(signIn(authState));
      clear();
      navigate('/');
    }
  }

  const clear = () => {
    setAuthState({
      userName: '',
      phone: '',
      password: '',
      retypePassword: '',
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
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          {isSignUp && (
            <>
              <TextField
                variant='outlined'
                label='Name'
                type='text'
                margin='normal'
                value={authState.userName}
                onChange={(e: any) =>
                  setAuthState({ ...authState, userName: e.target.value })
                }
              />
            </>
          )}
          <TextField
            variant='outlined'
            label='Phone Number'
            type='text'
            margin='normal'
            value={authState.phone}
            onChange={(e: any) =>
              setAuthState({ ...authState, phone: e.target.value })
            }
          />
          <TextField
            variant='outlined'
            label='Password'
            type='password'
            margin='normal'
            value={authState.password}
            onChange={(e: any) =>
              setAuthState({ ...authState, password: e.target.value })
            }
          />
          {isSignUp && (
            <>
              <TextField
                variant='outlined'
                label='Re-type Password'
                type='password'
                margin='normal'
                value={authState.retypePassword}
                onChange={(e: any) =>
                  setAuthState({ ...authState, retypePassword: e.target.value })
                }
              />
            </>
          )}
          <Button
            variant='contained'
            color='warning'
            sx={{ marginTop: 3, borderRadius: 2 }}
            onClick={(e)=>submitButton(e)}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            onClick={() => {
              setIsSignUp((modeSwitch) => !modeSwitch);
            }}
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : 'Do not have an account? Sign Up'}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default SignUpInForm;
