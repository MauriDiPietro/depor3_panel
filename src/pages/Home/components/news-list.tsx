import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { New } from "../../../types/new.type";
import { useGlobalStore } from "../../../stores/global";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const NewsList = () => {

  const getNoticias = useGlobalStore(state => state.getNoticias);
  const loadingNews = useGlobalStore(state => state.loadingNews);
  const errorNews = useGlobalStore(state => state.errorNews);

  useEffect(()=>{
    getNoticias()
  }, []);

  const navigate = useNavigate();

  const handleEdit = (id: string | undefined) => {
    console.log(`Edit news with ID: ${id}`);
    navigate(`/editar-publicacion/${id}`)
  };

  const handleDelete = (id: string | undefined) => {
    console.log(`Delete news with ID: ${id}`);
  };

  const news = useGlobalStore((state) => state.news);

  return (
    <Box sx={{ width: "100%", mt: 9, px: 2 }}> 
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", 
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "left", 
          }}
        >
          Gestión de Noticias
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/nueva-publicacion")}
        >
          Nueva Publicación
        </Button>
      </Box>
      {loadingNews ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}> 
          {news &&
            news.map((noticia: New, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between", 
                  alignItems: "center",
                  borderBottom: "1px solid #e0e0e0",
                  py: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ flex: 1, textAlign: "left" }} 
                >
                  {noticia.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(noticia._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(noticia._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

