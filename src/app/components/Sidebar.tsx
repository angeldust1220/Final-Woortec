"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Collapse,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LinkIcon from "@mui/icons-material/Link";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const SidebarContainer = styled(Box)({
  width: 235,
  height: "100vh",
  backgroundColor: "#2c3e50",
  color: "#ecf0f1",
  overflowX: "hidden",
  boxSizing: "border-box", // Ensure padding and borders are included in the width
});

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const clearCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
    });
  };

  const handleLogout = async () => {
    clearCookies(); // Clear all cookies
    window.location.reload();
   
  };

  return (
    <SidebarContainer>
      <Typography
        variant="h6"
        sx={{ p: 2, textAlign: "center", borderBottom: "1px solid #34495e" }}
      >
        Woortec
      </Typography>
      <List>
        <ListItem button onClick={() => handleNavigation("/dashboard")}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#ecf0f1" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/connections")}>
          <ListItemIcon>
            <LinkIcon sx={{ color: "#ecf0f1" }} />
          </ListItemIcon>
          <ListItemText primary="Connections" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <LinkIcon sx={{ color: "#ecf0f1" }} />
          </ListItemIcon>
          <ListItemText primary="Strategies" />
          {open ? (
            <ExpandLess sx={{ color: "#ecf0f1" }} />
          ) : (
            <ExpandMore sx={{ color: "#ecf0f1" }} />
          )}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/services/expresslaunching")}
            >
              <ListItemText primary="Express Launching" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/services/launching")}
            >
              <ListItemText primary="Launching" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/services/analysis")}
            >
              <ListItemText primary="Analysis" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/services/optimization")}
            >
              <ListItemText primary="Optimization" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </SidebarContainer>
  );
};

export default Sidebar;
