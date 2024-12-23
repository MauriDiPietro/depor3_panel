import React from "react";
import { Container } from "@mui/material";

import { NewsList } from "./components/news-list.tsx";
// import { NewsSlider } from "./components/news-slider";

import { NavBar } from "../../shared/NavBar.tsx";

export const Home: React.FC<{}> = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {/* <NewsSlider /> */}
        <NewsList />
      </Container>
    </>
  );
};
