import {
  Typography,
  Box,
  IconButton,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { New } from "../../../types/new.type";
import { useGlobalStore } from "../../../stores/global";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const normalizeDate = (dateStr: string | undefined): string | null => {
  if (!dateStr) return null;

  // Detectar formato m/dd/aaaa o dd/mm/aaaa
  const isMDY = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr);

  if (isMDY) {
    const [month, day, year] = dateStr.split("/");
    // Verificar si es un caso claro de m/dd/aaaa (día > 12 no tiene sentido como mes)
    if (parseInt(day) > 12) {
      return `${day}/${month}/${year}`; // Convertir a dd/mm/aaaa
    }
    return dateStr; // Dejarlo igual si ya es válido como dd/mm/aaaa
  }

  return dateStr; // Asumir que ya está en dd/mm/aaaa
};

const parseDateToSort = (dateStr: string | undefined): Date | null => {
  if (!dateStr) return null;

  const normalizedDate = normalizeDate(dateStr);
  if (!normalizedDate) return null;

  const [day, month, year] = normalizedDate.split("/");
  return new Date(`${year}-${month}-${day}`);
};

export const NewsList = () => {
  const getAllNews = useGlobalStore((state) => state.getAllNews);
  const deleteNewById = useGlobalStore((state) => state.deleteNewById);
  const loadingNews = useGlobalStore((state) => state.loadingNews);
  const newDeleted = useGlobalStore((state) => state.newDeleted);
  const errorDeleteNew = useGlobalStore((state) => state.errorDeleteNew);

  useEffect(() => {
    getAllNews();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (id: string | undefined) => {
    console.log(`Edit news with ID: ${id}`);
    navigate(`/publicacion/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete news with ID: ${id}`);
    deleteNewById(id);
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
          onClick={() => navigate("/publicacion")}
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
            news
              .filter((noticia: New) => noticia.active)
              .sort((a: New, b: New) => {
                const dateA = parseDateToSort(a.date);
                const dateB = parseDateToSort(b.date);

                if (!dateA || !dateB) return 0; // Manejar fechas nulas

                return dateB.getTime() - dateA.getTime(); // Orden descendente
              })
              .map((noticia: New, index: number) => (
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
                  <Typography variant="h6" sx={{ flex: 1, textAlign: "left" }}>
                    {noticia.title}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ flex: 1, textAlign: "center" }}
                  >
                    {normalizeDate(noticia.date)}{" "}
                    {/* Mostrar fecha normalizada */}
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
                      onClick={() => handleDelete(noticia._id as string)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
        </Box>
      )}
      {/* Diálogo de éxito */}
      <Dialog open={newDeleted} closeAfterTransition onClose={() => navigate("/")}>
        <DialogTitle>Publicación eliminada</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Publicación eliminada con éxito. ✔
          </DialogContentText>
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
      <Dialog open={errorDeleteNew} onClose={() => navigate('/')}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ocurrió un error al eliminar la publicación. Intente nuevamwnte más tarde.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
            onClick={() => {
              navigate("/");
            }}
            color="primary"
            variant="contained"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
