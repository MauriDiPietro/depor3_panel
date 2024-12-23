import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element
}

enum themePalette {
    // BG = "#12181b",
    BG = "#fff9f8",
    PURPLE = "#00F0FF",
    ORANGE = "#f66d1f",
    BLACK = "#050505",
    FONT_GLOBAL = "Montserrat"
}

const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: themePalette.BG
        },
        primary: {
            main: themePalette.BLACK 
        }
    },
    typography: {
        fontFamily: themePalette.FONT_GLOBAL
    },
    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    textTransform: "none"
                }
            }
        }
    }
})

export const ThemeConfig: React.FC<ThemeProp> = ({children}) => {
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}