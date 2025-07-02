import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameShopProvider } from "./context/GameContext";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/HomePage";
import Ps5Page from "./pages/Ps5Page";
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
            {/* <Route path="/videogames" element={<VideoGamesList />} />
            <Route path="/videogames/:id" element={<DetailGame />} /> */}
          </Route>
          {/*
          <Route path="/" element={<Homepage />} />
          <Route path="/videogames" element={<VideogamesList />} />
          <Route path="/videogames/ps5" element={<Ps5Page />} />
          <Route path="*" element={<NotFoundPage />} />
          */}
        </Routes>
      </BrowserRouter>
    </GameShopProvider>
  );
}
