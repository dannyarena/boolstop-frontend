import { BrowserRouter, Routes, Route } from "react-router";
import { GameShopProvider } from "./context/GameContext";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/HomePage";
import Ps5Page from "./pages/ps5Page";
export default function App() {
  return (
    <GameShopProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            {/* <Route path="/videogames" element={<VideoGamesList />} />
            <Route path="/videogames/:id" element={<DetailGame />} /> */}
          </Route>
          {/* <Route element={<DefaultLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/videogames" element={<VideoGamesList />} /> 
          <Route path="/videogames/:id" element={<DetailGame />} /> 
          </Route> */}
          <Route path="/videogames/ps5" element={<Ps5Page />} />
        </Routes>
      </BrowserRouter>
    </GameShopProvider>
  );
}
