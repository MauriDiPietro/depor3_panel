import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useGlobalStore } from "../../stores/global";
import { UserLogin } from "../../types/user.type";



export const Login: React.FC<{}> = () => {

  const loginUser = useGlobalStore(state => state.loginUser);

  const [loginData, setLoginData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(loginData);
    loginUser(loginData)
  }

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography variant="h5">Iniciar Sesión</Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                onChange={handleChange}
                name="email"
                fullWidth
                label="email"
                type="email"
                required
                sx={{ mt: 2, mb: 1.5 }}
              />
              <TextField
                onChange={handleChange}
                name="password"
                fullWidth
                label="password"
                type="password"
                required
                sx={{ mt: 1.5, mb: 1.5 }}
              />
              <Button fullWidth type="submit">
                Iniciar sesión
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
