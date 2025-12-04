// AppLayout.tsx

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router";

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppBar position="static">
        <Toolbar disableGutters sx={{ px: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Remplacement Numérique
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/404"
              sx={{ textTransform: "none" }}
            >
              404
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          width: "100%",
          minHeight: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
