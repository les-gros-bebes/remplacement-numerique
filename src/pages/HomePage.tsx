import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import testData from "../data/test.json";
import { Box, Link, Typography } from "@mui/material";
import CountButton from "../components/CountButton";

export default function HomePage() {
  return (
    <>
      <Box>
        <Link href="https://vite.dev" target="_blank">
          <img src={viteLogo} alt="Vite logo" />
        </Link>
        <Link href="https://react.dev" target="_blank">
          <img src={reactLogo} alt="React logo" />
        </Link>
      </Box>
      <Typography variant="h3">{testData.name}</Typography>
      <Box>
        <CountButton />
        <Typography>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </Box>
      <Typography>Click on the Vite and React logos to learn more</Typography>
    </>
  );
}
