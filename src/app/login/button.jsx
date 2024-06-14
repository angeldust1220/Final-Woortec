"use client";
import React from "react";
import { Button, Box, IconButton } from '@mui/material';
import { loginWithProvider } from "./actions";
import { FaFacebook, FaTwitter, FaGithub, FaGoogle } from "react-icons/fa";

export default function InteractiveLoginButtons() {
  const handleProviderLogin = (provider) => {
    loginWithProvider(provider);
  };

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <IconButton
        onClick={() => handleProviderLogin("facebook")}
        sx={{
          color: '#1877F2', // Facebook brand color
          '&:hover': {
            color: '#155db0',
          }
        }}
      >
        <FaFacebook size={30} />
      </IconButton>
      <IconButton
        onClick={() => handleProviderLogin("google")}
        sx={{
          color: '#DB4437', // Google brand color
          '&:hover': {
            color: '#c33d2d',
          }
        }}
      >
        <FaGoogle size={30} />
      </IconButton>
    </Box>
  );
}
