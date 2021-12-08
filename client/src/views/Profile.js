import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function Profile(props) {
  if (props.match.params === null) {
    return <Redirect to='/' />;
  }

  const name = props.match.params.name;

  return (
    <Typography variant="h1"> Hi {name}! </Typography>
  );
}