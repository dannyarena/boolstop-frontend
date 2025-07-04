import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import { GameShopProvider } from "./context/GameContext";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/HomePage";
import PlatformsPage from "./pages/PlatformsPage";
import NotFoundPage from "./pages/NotFoundPage";
import VideogamesList from "./pages/VideogamesList";
import VideogameDetail from "./pages/VideogameDetail";
import FormCheckoutPage from "./pages/FormCheckoutPage";
import OrderRecapPage from "./pages/OrderRecapPage";
import SearchResultsPage from "./pages/SearchResultsPage";

export default function App() {
  return (
    <GameShopProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/videogame/:slug" element={<VideogameDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/videogames" element={<VideogamesList />} />
            {/* <Route path="/videogames/:id" element={<DetailGame />} /> */}
            <Route path="/videogames/:platform" element={<PlatformsPage />} />
            {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
            {/* <Route
              path="/videogames/:platform/:id"
              element={<PlatformsPage />}
            /> */}
            <Route path="/formCheckout" element={<FormCheckoutPage />} />
            <Route path="/orderRecap" element={<OrderRecapPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameShopProvider>
  );
}
