import { Box, Button, Container, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <ErrorIcon color="error" sx={{ fontSize: 80 }} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Algo salió mal
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Ha ocurrido un error técnico. Por favor, inténtalo de nuevo más tarde.
      </Typography>
      <Button
        variant="text"
        color="secondary"
        onClick={() => navigate("/")}
        sx={{ mt: 2, textTransform: "none" }}
      >
        Volver al inicio
      </Button>
    </Container>
  );
};
