import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouterLayout } from "./shared/RouterLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Publicacion } from "./pages/Publicacion";
import { Error } from "./pages/Error/error";
import { Draft } from "./pages/Draft";
import { PublicacionPatio } from "./pages/PublicacionPatio";

export const AppRouter: React.FC<{}> = () => {
    return (
        <Routes>
            {/* rutas con navbar */}
            <Route path="/" element={<RouterLayout/>} > 
                <Route path="/" element={<Home/>} />
                <Route path="/publicacion/:id?" element={<Publicacion/>} />
                <Route path="/draft/:id?" element={<Draft/>} />
                <Route path="/patio/:id?" element={<PublicacionPatio/>} />
            </Route>
            {/* rutas con navbar */}
                <Route path="/login" element={<Login/>} />
                <Route path="/error" element={<Error/>} />

        </Routes>
    )
}