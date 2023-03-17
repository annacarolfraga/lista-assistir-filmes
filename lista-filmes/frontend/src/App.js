import { BrowserRouter, Routes, Route } from "react-router-dom";
import Filmes from "./pages/Filmes";
import Add from "./pages/Add";
import Update from "./pages/Update";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Filmes />}/>
    <Route path="filmes" element={<Filmes />} />
    <Route path="adicionar" element={<Add />} />
    <Route path="atualizar/:id" element={<Update />} />
    <Route path="*" element={<NoPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;