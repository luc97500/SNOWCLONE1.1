import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import lllLogo from "../asset/lll.png"; // Import your logo
import CreateDataPage from "./createDataPage";
import ProfileCard from "./profileCard";

export function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [openCreate,setOpenCreate] = React.useState(false)
  
  const UserName = localStorage.getItem('UserName');
  
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setOpenCreate(true)
    handleMenuClose();
  };

  const handleCreateClose = () =>{
    setOpenCreate(false)
  }

  const logoutFunc = () =>{
    // localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('UserName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('Createdon');
    
    navigate("/");
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>My Profile</MenuItem>
      <Link to="/" onClick={logoutFunc}>
        <MenuItem>Logout</MenuItem>
      </Link>
    </Menu>

  );

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#aed6f1", // Background color of header
          borderBottom: "2px solid #34495e", // Border for the header
          width: "100%", // Ensure the header spans full width
        }}
      >
        <Toolbar>
          {/* Logo */}
            <img
              src={lllLogo}
              alt="Logo"
              style={{ height: "40px", marginRight: "20px" }}
            />
          {/* Title */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#34495e",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              DataSyncApp
            </Typography>
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Profile Avatar (Visible on both desktop and mobile) */}
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Open Profile">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{
                  p: 0,
                  backgroundColor: "#d1f2eb", // Main background color
                  "&:hover": {
                    backgroundColor: "#a3e4d7", // Hover background color
                  },
                  borderRadius: "50%", // Optional: makes the button round if it's not already
                  transition: "background-color 0.3s", // Optional: smooth transition on hover
                }}
              >
                <Avatar
                  alt={UserName?.toUpperCase()}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
          </Box>

        </Toolbar>
      </AppBar>
      {renderMenu}
      <ProfileCard open={openCreate}  onClose={handleCreateClose}/>
    </Box>
  );
}
