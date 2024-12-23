import React from "react";
import { AppBar, Box, Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexWrap: { xs: "wrap", sm: "nowrap" }, // Ajusta el comportamiento en pantallas pequeñas
              }}
            >
              {/* Logotipo */}
              <Grid item>
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dsooxiydo/image/upload/v1734522257/marca/gopsg4bkkopyinaxqu5k.png"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      width: "200px", // Ajustable para pantallas pequeñas
                    }}
                    alt="Logo"
                  />
                </Link>
              </Grid>

              {/* Botones */}
              <Grid item>
                <Stack
                  direction={{ xs: "column", sm: "row" }} // Columnas en pantallas pequeñas, filas en grandes
                  spacing={2}
                  sx={{
                    mt: { xs: 2, sm: 0 }, // Margen superior solo en pantallas pequeñas
                  }}
                >
                  <Link to="/login">
                    <Button
                      variant="contained"
                      sx={{
                        height: { xs: 36, sm: 48 }, // Altura menor en pantallas pequeñas
                        fontSize: { xs: "0.75rem", sm: "1rem" }, // Texto más pequeño en pantallas pequeñas
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="contained"
                      sx={{
                        height: { xs: 36, sm: 48 }, // Altura menor en pantallas pequeñas
                        fontSize: { xs: "0.75rem", sm: "1rem" }, // Texto más pequeño en pantallas pequeñas
                      }}
                    >
                      Registro
                    </Button>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

