import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ReactQuill from "react-quill";

export const Editor: React.FC<{}> = () => {

  const categories = [
    "Fútbol",
    "Básquet",
    "Tenis",
    "Handball",
    "Automovilismo",
    "Deporte Motor",
    "Motociclismo",
  ];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    body: "",
    image: "",
    multimedia: [""],
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Manejo de cambios en el array multimedia
  const handleMultimediaChange = (index: number, value: string) => {
    const updatedMultimedia = [...formData.multimedia];
    updatedMultimedia[index] = value;
    setFormData({ ...formData, multimedia: updatedMultimedia });
  };

  // Agregar un nuevo campo para multimedia
  const addMultimediaField = () => {
    setFormData({ ...formData, multimedia: [...formData.multimedia, ""] });
  };

  // Enviar los datos al backend
  const handleSubmit = () => {
    console.log("Datos enviados:", formData);
    // Aquí puedes realizar una llamada a tu backend con los datos
  };
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
          Crear Nueva Noticia
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={3}>
            {/* Título */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Grid>

            {/* Descripción */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Grid>

            {/* Categoría */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Categoría"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Autor */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Autor"
                value={formData.author}
                onChange={(e) => handleChange("author", e.target.value)}
              />
            </Grid>

            {/* Imagen Principal */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL de Imagen Principal"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
              />
            </Grid>

            {/* Multimedia */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Multimedia
              </Typography>
              {formData.multimedia.map((url: string, index: any) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`URL de Imagen ${index + 1}`}
                  value={url}
                  onChange={(e) =>
                    handleMultimediaChange(index, e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              ))}
              <Button
                variant="outlined"
                onClick={addMultimediaField}
                sx={{ mt: 2 }}
                color="info"
              >
                Agregar Imagen
              </Button>
            </Grid>

            {/* Cuerpo de la noticia */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Cuerpo de la Noticia
              </Typography>
              <ReactQuill
                value={formData.body}
                onChange={(value) => handleChange("body", value)}
                theme="snow"
                placeholder="Escribe aquí el contenido de la noticia..."
                style={{
                    height: "300px",
                    marginBottom: "20px",
                    backgroundColor: "white",
                    color: "black",
                  }}
              />
            </Grid>

            {/* Botón de Enviar */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{ mt: 3 }}
              >
                Publicar Noticia
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
