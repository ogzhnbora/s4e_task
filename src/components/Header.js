import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import logo from "../assets/logo.png"; 

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.default", 
        color: "text.primary", 
        boxShadow: "none", 
        borderColor: "divider",
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
