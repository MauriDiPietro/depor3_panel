import React from "react";
import { Container } from "@mui/material";
import { Editor } from "./components/editor-texto";

export const Publicacion: React.FC<{}> = () => {
  return (
    <>
      <Container maxWidth="md">
        <Editor />
      </Container>
    </>
  );
};
