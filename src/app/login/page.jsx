import React from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { login, signup } from "./actions";
import { redirect } from "next/navigation";
import InteractiveLoginButtons from "./button";
import { createClient } from "../../../utils/supabase/server";

export default async function LoginPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.refreshSession();
  const { session, user } = data;
  if (session) {
    redirect("/");
  }

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginTop: 8 
        }}
      >
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                formAction={login}
              >
                Log In
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                formAction={signup}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <InteractiveLoginButtons />
        </Box>
      </Box>
    </Container>
  );
}
