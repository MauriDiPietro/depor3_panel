import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouterLayout } from "./shared/RouterLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Publicacion } from "./pages/Publicacion";
import { Error } from "./pages/Error/error";

export const AppRouter: React.FC<{}> = () => {
    return (
        <Routes>
            {/* rutas con navbar */}
            <Route path="/" element={<RouterLayout/>} > 
                <Route path="/" element={<Home/>} />
                <Route path="/nueva-publicacion" element={<Publicacion/>} />
            </Route>
            {/* rutas con navbar */}
                <Route path="/login" element={<Login/>} />
                <Route path="/error" element={<Error/>} />

        </Routes>
    )
}