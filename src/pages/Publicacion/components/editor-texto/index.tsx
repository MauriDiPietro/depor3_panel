import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ReactQuill from "react-quill";
import { v4 as uuidv4 } from "uuid";
import { useGlobalStore } from "../../../../stores/global";
import { useNavigate } from "react-router-dom";

export const Editor: React.FC<{}> = () => {
  const createNew = useGlobalStore((state) => state.createNew);

  const loadingNews = useGlobalStore((state) => state.loadingNews);
  const newCreated = useGlobalStore((state) => state.newCreated);
  const errorCreateNew = useGlobalStore((state) => state.errorCreateNew);

  const navigate = useNavigate();

  const categories = [
    "Fútbol",
    "Básquet",
    "Tenis",
    "Handball",
    "Automovilismo",
    "Deporte Motor",
    "Motociclismo",
    "Política Deportiva",
    "Historias del Gen Dominante",
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

  const handleImageUpload = async (file: File, isMain: boolean) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
    formData.append("cloud_name", "dsooxiydo");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsooxiydo/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      // Si la imagen es principal
      if (isMain) {
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      } else {
        // Si es una imagen secundaria
        setFormData((prev) => ({
          ...prev,
          multimedia: [...prev.multimedia, imageUrl],
        }));
      }
      return imageUrl;
    } catch (error) {
      alert("Error al subir la imagen, intente nuevamente");
    }
  };

  const handleInsertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await handleImageUpload(file, false);
      if (imageUrl) {
        const id = uuidv4();
        setFormData((prev) => ({
          ...prev,
          multimedia: [...prev.multimedia, imageUrl],
          body: `${prev.body}<div id="${id}" style="position: relative; display: inline-block; margin: 10px;">
                  <img src="${imageUrl}" alt="" style="max-width: 100%; display: block; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);" />
                </div>`,
        }));
      }
    }
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    isMain: boolean
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file, isMain);
    }
  };

  const handleSubmit = () => {
    console.log("Datos enviados:", formData);
    createNew(formData);
  };

  const handleSubmitBorrador = () => {
    console.log("Datos enviados:", formData);
  };

  const handleRetry = async () => {
    await handleSubmit();
  };

  if (loadingNews) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
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
            <Typography variant="h6" gutterBottom>
              Imagen Principal
            </Typography>
            <Button variant="contained" component="label">
              Subir Imagen Principal
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileSelect(e, true)}
              />
            </Button>
            {formData.image && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body1" gutterBottom>
                  Imagen Principal:
                </Typography>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <a
                    href={formData.image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={formData.image}
                      alt="Vista previa principal"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  </a>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: "" }))
                    }
                  >
                    Eliminar
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>

          {/* Multimedia */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Multimedia
            </Typography>
            <Button variant="contained" component="label">
              Subir Imágenes Secundarias
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileSelect(e, false)}
              />
            </Button>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
              {formData.multimedia.map((url, index) => (
                <Box
                  key={index}
                  sx={{ textAlign: "center", position: "relative" }}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Imagen {index + 1}
                  </Typography>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={url}
                      alt={`Vista previa ${index + 1}`}
                      style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  </a>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        multimedia: prev.multimedia.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                  >
                    Eliminar
                  </Button>
                </Box>
              ))}
            </Box>
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
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Insertar Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleInsertImage}
              />
            </Button>
          </Grid>
          {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
              {formData.multimedia.map((url, index) => (
                <Box
                  key={index}
                  sx={{ textAlign: "center", position: "relative" }}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Imagen {index + 1}
                  </Typography>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={url}
                      alt={`Vista previa ${index + 1}`}
                      style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  </a>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        multimedia: prev.multimedia.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                  >
                    Eliminar
                  </Button>
                </Box>
              ))}
            </Box> */}

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
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmitBorrador}
            >
              Guardar Borrador
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Diálogo de éxito */}
      <Dialog open={newCreated} onClose={() => navigate("/")}>
        <DialogTitle>Publicación creada</DialogTitle>
        <DialogContent>
          <DialogContentText>Publicación creada con éxito. ✔</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => navigate("/")}
            color="primary"
            variant="contained"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de error */}
      <Dialog open={errorCreateNew} onClose={() => {}}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ocurrió un error al crear la publicación.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRetry} color="error" variant="contained">
            Reintentar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
