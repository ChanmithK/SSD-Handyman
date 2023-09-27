import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import TemporaryDrawer from "./Drawer";

//Admin App Bar
export default function ButtonAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#2A3036",
          height: "64px",
          boxShadow: "0 8px 6px -7px #999",
          filter:
            "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.18)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.12))",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar component="div">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setIsDrawerOpen(!isDrawerOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              fontWeight: "regular",
            }}
          >
            FitFlame Admin Console
          </Typography>
        </Toolbar>
      </AppBar>
      {isDrawerOpen && <TemporaryDrawer />}
    </Box>
  );
}
