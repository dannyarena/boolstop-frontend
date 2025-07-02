import { BrowserRouter, Routes, Route } from "react-router";
import { GameShopProvider } from "./context/GameContext";
import DefaultLayout from "./layouts/DefaultLayout";

export default function App() {
  return (
    <GameShopProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/videogames" element={<VideoGamesList />} />
            <Route path="/videogames/:id" element={<DetailGame />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameShopProvider>
  );
}
