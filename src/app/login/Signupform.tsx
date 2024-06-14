import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  InputAdornment,
} from "@mui/material";
import { signup } from "./actions"; // Make sure you have this action defined
import Image from "next/image";
import Logo from "../public/logo.png"; // Add the path to your logo image
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

interface SignupFormProps {
  handleClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await signup(formData);
      handleClose();
    } catch (e) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        borderRadius: 2,
        maxWidth: 400,
        margin: '0 auto',
        backgroundColor: '#fafafa',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Image
        src={Logo}
        alt="Company Logo"
        width={80} // Adjust width as necessary
        height={80} // Adjust height as necessary
        style={{ marginBottom: '16px' }}
      />
      <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
        Create Account
      </Typography>
      <Typography component="p" variant="body2" sx={{ mb: 3, textAlign: 'center', color: '#666' }}>
        Sign up to access all features
      </Typography>
      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="new-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#00BFA6',
            '&:hover': {
              backgroundColor: '#008f75',
            },
            padding: '10px 0',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SignupForm;
