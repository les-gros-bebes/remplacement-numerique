import { Routes, Route, Navigate } from "react-router";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import ClassePage from "./pages/ClassePage";
import NotFoundPage from "./pages/NotFoundPage";
import BureauPage from "./pages/BureauPage";
import CdiPage from "./pages/CdiPage";
import GymnasePage from "./pages/GymnasePage";
import PreauPage from "./pages/PreauPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/" element={<AppLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="bureau" element={<BureauPage />} />
        <Route path="cdi" element={<CdiPage />} />
        <Route path="classe" element={<ClassePage />} />
        <Route path="gymnase" element={<GymnasePage />} />
        <Route path="preau" element={<PreauPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
