import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HOME
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear();
                Cookies.remove("TOKEN");
                navigate("/signIn");
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
