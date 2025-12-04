import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/" element={<AppLayout />}>
        <Route path="home" element={<HomePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
