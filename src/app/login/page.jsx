import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { login, signup } from "./actions";
import { redirect } from "next/navigation";
import InteractiveLoginButtons from "./button";
import { createClient } from "../../../utils/supabase/server";
import Image from "next/image";
import WoortecMain from "../public/Woortec-Main.png"; // Adjust the path as necessary

export default async function LoginPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.refreshSession();
  const { session, user } = data;
  if (session) {
    redirect("/");
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography component="h2" variant="h5">
          Woortec
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
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
          </Grid>
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
        </Grid>
      </Box>
    </Container>
  );
}
