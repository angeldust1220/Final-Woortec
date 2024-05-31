"use client";
import React from "react";
import { Button, Box } from '@mui/material';
import { loginWithProvider } from "./actions";

export default function InteractiveLoginButtons() {
  const handleProviderLogin = (provider) => {
    loginWithProvider(provider);
  };

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleProviderLogin("google")}
        sx={{ textTransform: 'none', backgroundColor: '#db4437' }} // Google brand color
      >
        Log in with Google
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleProviderLogin("facebook")}
        sx={{ textTransform: 'none', backgroundColor: '#4267B2' }} // Facebook brand color
      >
        Log in with Facebook
      </Button>
    </Box>
  );
}
