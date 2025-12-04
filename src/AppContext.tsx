import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import useSavedState from "./utils/useSavedState";
import Snackbar from "@mui/material/Snackbar";
import Alert, { type AlertColor } from "@mui/material/Alert";

type AppContextType = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  showMessage: (content: string, type?: AlertColor) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`${useApp.name} must be used within ${AppProvider.name}`);
  }
  return context;
};

export default function AppProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useSavedState("count", 0);

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<AlertColor>("info");
  const [messageOpen, setMessageOpen] = useState(false);

  const showMessage = (content: string, type: AlertColor = "info") => {
    setMessage(content);
    setMessageType(type);
    setMessageOpen(true);
    console.log(`Message (${type}): ${content}`);
  };

  const onMessageClose = () => {
    setMessageOpen(false);
  };

  return (
    <AppContext.Provider value={{ count, setCount, showMessage }}>
      {children}
      <Snackbar
        open={messageOpen}
        autoHideDuration={5000}
        onClose={onMessageClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={onMessageClose} severity={messageType}>
          {message}
        </Alert>
      </Snackbar>
    </AppContext.Provider>
  );
}
