"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Footer from "../components/footer";
import NavBar from "../components/navBar";
import Sidebar from "../components/sideBar";
import { Poppins } from "next/font/google";
import { Box } from "@mui/material";

// Importation de la police avec configuration

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={poppins.className}>
        <Box
          className={poppins.className}
          sx={{
            display: "flex",
            height: "100vh",
          }}
        >
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              ml: "240px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NavBar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                mt: "64px",
                overflow: "auto",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
