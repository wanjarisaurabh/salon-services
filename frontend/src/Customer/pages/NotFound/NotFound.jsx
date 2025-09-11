import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoDashboard = () => {
    navigate('/'); // Change this path to your actual dashboard route
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center'>
      <h1 className='text-3xl lg:text-5xl font-bold text-gray-800 mb-6'>
        404 - Page Not Found
      </h1>
      <p className='text-gray-600 mb-8'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        variant='contained'
        color='primary'
        size='large'
        onClick={handleGoDashboard}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
