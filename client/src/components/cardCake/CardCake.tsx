import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { CakeType } from '../../types/cakeType';
import OrderCake from '../orderCake/OrderCake';
import { useAppSelector } from '../../redux/hooks';

type CakePropType = {
  cake: CakeType;
};

const CardCake = ({ cake }: CakePropType) => {
  const navigate = useNavigate();
  const isLoggedStatus = useAppSelector((state) => state.auth.authInfo);
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component='img'
          height='250'
          width='250'
          image={cake.selectedFile}
          alt={cake.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h4' component='div'>
            {cake.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {cake.description}
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Price: {cake.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant='contained'
          size='small'
          color='warning'
          onClick={() => {
            if (isLoggedStatus.isLoggedIn) {
              navigate(`/ordercake/${cake._id}/${isLoggedStatus._id}`);
            } else {
              navigate('/auth');
            }
          }}
        >
          Order
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardCake;
