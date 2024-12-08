import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import logo from "../assets/logo.png"; // Logo dosyasını doğru yolda import edin

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.default", // Temadan gelen arka plan rengi
        color: "text.primary", // Temadan gelen yazı rengi
        boxShadow: "none", // İsteğe bağlı: Gölgeyi kaldırır
        borderColor: "divider", // Temadan gelen sınır rengi
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 80,
            marginRight: 0.5,
          }}
        />
        <Typography variant="h6">S4E</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
