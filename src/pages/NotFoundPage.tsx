import { Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router";

export default function HomePage() {
  return (
    <>
      <Typography variant="h3">Page not found</Typography>

      <Link
        component={RouterLink}
        to="/"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <HomeIcon fontSize="small" />
        Home
      </Link>
    </>
  );
}
