import React from "react";
// import { Container } from "@mui/material";

import { NewsList } from "./components/news-list.tsx";

export const Home: React.FC<{}> = () => {
  return (
    <>
      {/* <Container maxWidth="xl" sx={{ mt: 5 }}> */}
        <NewsList />
      {/* </Container> */}
    </>
  );
};
