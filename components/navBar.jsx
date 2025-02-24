// components/NavBar.jsx
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "calc(100% - 240px)",
        ml: "240px",
        backgroundColor: "#1976d2",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gestion de Présence
        </Typography>
        <Button color="inherit">Déconnexion</Button>
      </Toolbar>
    </AppBar>
  );
}
