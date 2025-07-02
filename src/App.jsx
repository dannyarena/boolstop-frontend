import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameShopProvider } from "./context/GameContext";
import VideogamesList from "./pages/VideogamesList";

export default function App() {
  return (
    <GameShopProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<DefaultLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/videogames/:id" element={<DetailGame />} /> 
          </Route> */}
          <Route path="/videogames" element={<VideogamesList />} /> 
        </Routes>
      </BrowserRouter>
    </GameShopProvider>
  );
}
