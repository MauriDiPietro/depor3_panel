import React, { useEffect, useRef, useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import ReactQuill from "react-quill";
import { useGlobalStore } from "../../../../stores/global";
import { useNavigate, useParams } from "react-router-dom";

export const Editor: React.FC<{}> = () => {
  const quillRef = useRef<ReactQuill | null>(null); // Referencia al editor
  const { id } = useParams<{ id: string }>();

  const createNew = useGlobalStore((state) => state.createNew);
  const createDraft = useGlobalStore((state) => state.createDraft);
  const getNewById = useGlobalStore((state) => state.getNewById); // Función para obtener noticia
  const updateNew = useGlobalStore((state) => state.updateNew);
  const newDetail = useGlobalStore((state) => state.new);

  const edicion = useGlobalStore((state) => state.edicion);
  const setEdicion = useGlobalStore((state) => state.setEdicion);

  // const loadingNews = useGlobalStore((state) => state.loadingNews);
  // const newCreated = useGlobalStore((state) => state.newCreated);
  // const newModified = useGlobalStore((state) => state.newModified);

  // const draftCreated = useGlobalStore((state) => state.draftCreated);
  // const errorCreateDraft = useGlobalStore((state) => state.errorCreateDraft);

  const resetCargaDatosState = useGlobalStore(
    (state) => state.resetCargaDatosState
  );

  // const errorCreateNew = useGlobalStore((state) => state.errorCreateNew);
  const isOpenDialog = useGlobalStore((state) => state.isOpenDialog);
  const setIsOpenDialog = useGlobalStore((state) => state.setIsOpenDialog);
  const message = useGlobalStore((state) => state.message);

  const [formLoaded, setFormLoaded] = useState<boolean>(false);

  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    "Ajedrez",
    "Arquería",
    "Arte y deporte",
    "Artes marciales",
    "Artes marciales mixtas",
    "Atletismo",
    "Automovilismo",
    "BMX",
    "Básquet",
    "Bochas",
    "Boxeo",
    "Cestoball",
    "Ciclismo",
    "Deporte adaptado",
    "Deportes ecuestres",
    "Deportes náuticos",
    "Deporte Motor",
    "Efemérides",
    "Footgolf",
    "Fútbol",
    "Fútbol femenino",
    "Golf",
    "Hockey",
    "Handball",
    "Historias del Gen Dominante",
    "Motociclismo",
    "Opinión",
    "Patio del deportista",
    "Política Deportiva",
    "Tenis",
  ]);

  const authors = ["Nicolás Cravero", "Marcelo Calderón", "Depor3 Río Tercero"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    body: "",
    image: "",
    multimedia: [] as string[],
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
        // const imageHtml = `<div style="display: block; width: 100%; text-align: center; padding: 5px;">
        //   <a href="${imageUrl}" target="_blank" rel="noopener noreferrer">
        //     <img src="${imageUrl}" alt="Imagen" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);" />
        //   </a>
        // </div>`;
        const imageHtml = `
        <div id="${id}" style="position: relative; display: inline-block; margin: 10px;">
          <a href="${imageUrl}" target="_blank" rel="noopener noreferrer">
            <img src="${imageUrl}" alt="" style="max-width: 100%; display: block; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);" />
          </a>
        </div>
        `;
        setFormData((prev) => ({ ...prev, body: `${prev.body}${imageHtml}` }));
      }
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    isMain: boolean
  ) => {
    const files = event.target.files;
    if (files) {
      if (isMain) {
        const file = files[0];
        if (!file) return;

        const uploadedUrl = await handleImageUpload(file, true);
        setFormData((prev) => ({
          ...prev,
          mainImage: uploadedUrl, // Ejemplo para imagen principal
        }));
      } else {
        const existingUrls = formData.multimedia || []; // Verificar imágenes existentes
        const newImageUrls: string[] = [];

        for (const file of Array.from(files)) {
          const uploadedUrl = await handleImageUpload(file, false);
          if (!existingUrls.includes(uploadedUrl)) {
            // Agregar solo si no está duplicado
            newImageUrls.push(uploadedUrl);
          }
        }

        setFormData((prev) => ({
          ...prev,
          multimedia: [...existingUrls, ...newImageUrls], // Combinar URLs existentes y nuevas
        }));
      }
    }
  };

  const handleSubmit = () => {
    if (edicion && id) {
      // Si existe ID, estamos editando
      console.log("Editando noticia con ID:", id);
      updateNew(id, { ...formData, active: true });
    } else {
      console.log("Creando nueva noticia");
      createNew(formData);
    }
  };

  const handleSubmitBorrador = () => {
    console.log("Datos enviados:", formData);
    if (edicion && id) {
      // Si existe ID, estamos editando
      console.log("Editando noticia con ID:", id);
      updateNew(id, formData);
    } else {
      createDraft(formData);
    }
  };

  // const handleRetry = async () => {
  //   await handleSubmit();
  // };

  useEffect(() => {
    if (id) {
      getNewById(id);
      setEdicion(true);
    }
    return () => resetCargaDatosState();
  }, [id]);

  useEffect(() => {
    if (newDetail) {
      setFormData({
        ...formData,
        title: newDetail.title,
        description: newDetail.description,
        category: newDetail.category,
        author: newDetail.author,
        body: newDetail.body,
        image: newDetail.image,
        multimedia: newDetail.multimedia,
      });
      setFormLoaded(true);
    }
  }, [newDetail]);

  const handleCategoryAdd = (newCategory: string) => {
    if (!categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 2 }}>
      {id && !formLoaded && (
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
      )}
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        {id ? "Editar Publicación" : "Crear Nueva Publicación"}
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
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Grid> */}

          {/* Categoría */}
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              options={categories} // Opciones existentes
              value={formData.category}
              onChange={(_event, newValue) => {
                handleChange("category", newValue || "");
                if (newValue && !categories.includes(newValue)) {
                  handleCategoryAdd(newValue);
                }
              }}
              onInputChange={(_event, newInputValue) => {
                handleChange("category", newInputValue); // Manejar valor escrito
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Categoría"
                  placeholder="Selecciona o escribe una categoría"
                />
              )}
            />
          </Grid>

          {/* Autor */}
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Autor"
              value={formData.author}
              onChange={(e) => handleChange("author", e.target.value)}
            >
              {authors.map((author, index) => (
                <MenuItem key={index} value={author}>
                  {author}
                </MenuItem>
              ))}
            </TextField>
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

          {/* Cuerpo de la noticia */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Cuerpo de la Noticia
            </Typography>
            <ReactQuill
              ref={quillRef}
              value={formData.body}
              onChange={(value) => handleChange("body", value)}
              theme="snow"
              placeholder="Escribe aquí el contenido de la noticia..."
              className="custom-editor"
              style={{
                height: "500px",
                width: "100%",
                marginBottom: "20px",
                backgroundColor: "white",
                color: "black",
              }}
            />
            <style>
              {`
          .ql-editor img {
            display: inline-block;
            width: 50%;
            vertical-align: top;
            padding: 5px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }
          .ql-editor div {
            box-sizing: border-box;
          }
        `}
            </style>
            <Button variant="contained" component="label" sx={{ m: 2 }}>
              Insertar Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleInsertImage}
              />
            </Button>
            {/* <Button variant="contained" component="label">
              Galería
              <input
                type="file"
                hidden
                accept="image/*"
                multiple // Permitir selección de múltiples imágenes
                onChange={handleGalleryUpload}
              />
            </Button> */}
          </Grid>

          {/* Multimedia */}
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Galería de fotos
              <input
                type="file"
                hidden
                accept="image/*"
                multiple // Permitir múltiples selecciones
                onChange={(e) => handleFileSelect(e, false)}
              />
            </Button>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
              {formData.multimedia &&
                formData.multimedia.map((url, index) => (
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
              disabled={
                !formData.image ||
                !formData.title ||
                !formData.body ||
                !formData.author
              }
            >
              {id ? "Guardar y Publicar" : "Publicar Noticia"}
            </Button>
            {!formData.image && (
              <Typography display="block" variant="overline" color="red">
                Falta cargar la imagen principal
              </Typography>
            )}
            {!formData.title && (
              <Typography display="block" variant="overline" color="red">
                Falta cargar el título
              </Typography>
            )}
            {!formData.body && (
              <Typography display="block" variant="overline" color="red">
                Falta cargar el cuerpo de la noticia
              </Typography>
            )}
            {!formData.author && (
              <Typography display="block" variant="overline" color="red">
                Falta cargar el autor
              </Typography>
            )}
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

      {/* cuadro de diálogo */}
      <Dialog open={isOpenDialog} onClose={() => navigate("/")}>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsOpenDialog(false)}
            color="primary"
            variant="contained"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
