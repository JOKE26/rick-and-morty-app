import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
