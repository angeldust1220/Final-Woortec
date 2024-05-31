import React from 'react';
import { login, signup } from "../login/actions";
import { redirect } from "next/navigation";
import InteractiveLoginButtons from "../login/button";
import { createClient } from "../../../utils/supabase/server";
import { Box, Button, Card, CardContent, CardActions, Container, TextField, Typography, Link, Paper, Grow } from '@mui/material';

export default async function LoginPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.refreshSession();
  const { session, user } = data;
  if (session) {
    redirect("/");
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        backgroundImage: 'url(/path-to-your-background-image.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Container maxWidth="sm">
        <Grow in={true} timeout={1000}>
          <Paper 
            elevation={6} 
            sx={{ 
              p: 4, 
              maxWidth: 400, 
              width: '100%', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              textAlign: 'center'
            }}
          >
            <CardContent>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center" 
                sx={{ fontWeight: 'bold', color: '#333' }}
              >
                Login
              </Typography>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  required
                  fullWidth
                  sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                />
                <Link href="#" underline="hover" sx={{ alignSelf: 'flex-end', mt: 1, color: '#007bff' }}>
                  Forgot password?
                </Link>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                formAction={login}
                fullWidth
                sx={{ maxWidth: '150px', alignSelf: 'center', borderRadius: '8px' }}
              >
                Log in
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                formAction={signup}
                fullWidth
                sx={{ maxWidth: '150px', alignSelf: 'center', borderRadius: '8px' }}
              >
                Sign up
              </Button>
            </CardActions>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <InteractiveLoginButtons />
            </Box>
          </Paper>
        </Grow>
      </Container>
    </Box>
  );
}
