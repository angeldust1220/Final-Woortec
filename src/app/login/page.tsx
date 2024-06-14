'use client';

import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  Link,
  Dialog,
  DialogContent,
  createTheme,
  ThemeProvider,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { login } from "./actions";
import InteractiveLoginButtons from "./button";
import Image from "next/image";
import WoortecMain from "../public/Woortec-Main.png"; // Adjust the path as necessary
import SignupForm from "./Signupform"; // Adjust the path as necessary
import Logo from "../public/logo.png"; // Add the path to your logo image
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00BFA6',
    },
  },
});

export default function LoginPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true);
    try {
      await login(formData);
      // Handle successful login (e.g., redirect)
    } catch (error) {
      // Handle login error
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Image
                src={WoortecMain}
                alt="Woortec Main"
                layout="responsive"
                width={500}
                height={500}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 8,
                marginBottom: 8,
                backgroundColor: '#fafafa',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Image
                src={Logo}
                alt="Company Logo"
                width={100}
                height={100}
                style={{ marginBottom: '16px' }}
              />
              <Typography component="h2" variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: '#333' }}>
                Welcome to Woortec!
              </Typography>
              <Typography component="p" variant="body2" sx={{ mt: 2, color: '#666', textAlign: 'center' }}>
                Please sign in to your account to start using our services
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember Me"
                  sx={{ mt: 2, color: '#666' }}
                />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{
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
                      {loading ? <CircularProgress size={24} /> : 'SIGN IN'}
                    </Button>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                  <Link href="#" variant="body2" sx={{ color: '#00BFA6' }}>
                    Forgot Password?
                  </Link>
                  <Link href="#" variant="body2" onClick={handleClickOpen} sx={{ color: '#00BFA6' }}>
                    Create an account
                  </Link>
                </Box>
                <Typography component="p" variant="body2" sx={{ mt: 2, textAlign: 'center', color: '#666' }}>
                  or
                </Typography>
                <InteractiveLoginButtons />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <SignupForm handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
