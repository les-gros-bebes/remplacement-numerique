import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <AppBar position="static" sx={{ width: "100vw" }}>
        <Toolbar disableGutters sx={{ px: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Quick Frontend Template
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
          p: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "100vw",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
