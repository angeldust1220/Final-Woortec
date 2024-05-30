import React from 'react';
import { login, signup } from "../login/actions";
import { redirect } from "next/navigation";
import InteractiveLoginButtons from "../login/button";
import { createClient } from "../../../utils/supabase/server";
import { Box, Button, Card, CardContent, CardActions, Container, TextField, Typography } from '@mui/material';

export default async function LoginPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.refreshSession();
  const { session, user } = data;
  if (session) {
    redirect("/");
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 8, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
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
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              required
              fullWidth
            />
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            formAction={login}
            fullWidth
            sx={{ maxWidth: '150px' }}
          >
            Log in
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            formAction={signup}
            fullWidth
            sx={{ maxWidth: '150px' }}
          >
            Sign up
          </Button>
        </CardActions>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <InteractiveLoginButtons />
        </Box>
      </Card>
    </Container>
  );
}
