import { Button } from "@mui/material";
import { useApp } from "../AppContext";

export default function CountButton() {
  const { count, setCount, showMessage } = useApp();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setCount((count) => count + 1);
        showMessage(`Count increased to ${count + 1}`);
      }}
    >
      count is {count}
    </Button>
  );
}
