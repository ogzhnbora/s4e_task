import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Drawer,
  IconButton,
} from "@mui/material";
import { Dashboard, Settings, BarChart, Info, Brightness7, Brightness4, Menu } from "@mui/icons-material";

const Sidebar = ({ isDarkTheme, toggleTheme }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Mobil Drawer kontrolü

  // Masaüstü Sidebar
  const desktopSidebar = (
    <Box
      sx={{
        width: "300px",
        backgroundColor: "background.paper",
        padding: "16px",
        height: "100%",
        display: { xs: "none", md: "flex" }, // Mobilde gizle, masaüstünde göster
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <SidebarContent toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
    </Box>
  );

  // Mobil Drawer (Hamburger Menü)
  const mobileSidebar = (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      sx={{
        display: { xs: "block", md: "none" }, // Mobilde göster, masaüstünde gizle
        "& .MuiDrawer-paper": { width: "300px" },
      }}
    >
      <SidebarContent toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
    </Drawer>
  );

  return (
    <>
      {/* Mobil Hamburger Menü */}
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        sx={{ display: { xs: "block", md: "none" }, position: "absolute", top: "70px", left: "16px" }}
      >
        <Menu />
      </IconButton>

      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

// Sidebar İçeriği (Hem Masaüstü hem Mobil için ortak)
const SidebarContent = ({ isDarkTheme, toggleTheme }) => (
  <Box
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Box>
      <List>
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Scan Manager" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Outputs" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="Awareness" />
        </ListItem>
      </List>
    </Box>

    {/* Tema Değiştirme */}
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ padding: "16px" }}>
      <Brightness7 sx={{ color: isDarkTheme ? "text.disabled" : "text.primary" }} />
      <Switch
        checked={isDarkTheme}
        onChange={toggleTheme}
        sx={{
          "& .MuiSwitch-switchBase": {
            color: isDarkTheme ? "text.secondary" : "text.primary",
          },
        }}
      />
      <Brightness4 sx={{ color: isDarkTheme ? "text.primary" : "text.disabled" }} />
    </Box>
  </Box>
);

export default Sidebar;
