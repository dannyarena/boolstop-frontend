import { BrowserRouter, Routes, Route } from "react-router";
import { GameShopProvider } from "./context/GameContext";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import Homepage from "./pages/Homepage";
export default function App() {
  return (
    <GameShopProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameShopProvider>
  );
}
