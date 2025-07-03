import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameShopProvider } from "./context/GameContext";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/HomePage";
import PlatformsPage from "./pages/PlatformsPage";
import NotFoundPage from "./pages/NotFoundPage";
import VideogamesList from "./pages/VideogamesList";

import SearchResultsPage from "./pages/SearchResultsPage";

export default function App() {
  return (
    <GameShopProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/videogames" element={<VideogamesList />} />
            {/* <Route path="/videogames/:id" element={<DetailGame />} /> */}
            <Route path="/videogames/:platform" element={<PlatformsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameShopProvider>
  );
}
