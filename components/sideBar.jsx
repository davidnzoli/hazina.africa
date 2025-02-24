// components/Sidebar.jsx
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, href: "/dashboard" },
  { text: "Présences", icon: <EventIcon />, href: "/presence" },
  { text: "Personnel", icon: <PeopleIcon />, href: "/listPersonel" },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1e1e2f",
          color: "white",
          fontFamily: "poppins",
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} href={item.href}>
              <ListItemIcon sx={{ color: "white", fontFamily: "poppins" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          fontFamily: "poppins",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white", fontFamily: "poppins" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
