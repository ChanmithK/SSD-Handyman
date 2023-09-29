import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const title = useSelector((state) => state.setTitle.title);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#ffffff",
        height: "64px",
        boxShadow: "none",
        filter:
          "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.18)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.12))",
      }}
    >
      <Toolbar>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "23px",
            color: "#062b56",
            display: "flex",
          }}
        >
          HANDY
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "23px",
              color: "#f96a20",
              ml: 0.5,
            }}
          >
            MAN
          </Typography>
        </Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            borderRightWidth: 2,
            filter: `blur(0.4px)`,
            marginLeft: 4,
            marginRight: 4,
            bgcolor: "white",
          }}
        />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: {
              xs: "none",
              sm: "block",
              fontWeight: 400,
              fontSize: "21px",
              lineHeight: "160%",
              color: "#62646a",
            },
          }}
        >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {
              navigate("/profile");
            }}
            color="#62646a"
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
