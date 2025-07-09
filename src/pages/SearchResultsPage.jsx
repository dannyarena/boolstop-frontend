import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import CardGameDamb from "../components/CardGameDamb";

export default function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [amountInCart, setAmountInCart] = useState(0);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistIds(savedWishlist);
  }, []);

  const handleToggleWishlist = (gameId) => {
    let updated;
    if (wishlistIds.includes(gameId)) {
      updated = wishlistIds.filter((id) => id !== gameId);
    } else {
      updated = [...wishlistIds, gameId];
    }
    setWishlistIds(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const addToCart = (game) => {
    const discount = game.discount_percentage || 0;
    const price = Number((game.original_price - (game.original_price * discount) / 100).toFixed(2));

    const itemToAdd = {
      videogame_id: game.id,
      name: game.name,
      original_price: game.original_price,
      price,
      discount_percentage: discount,
      image: game.image,
      amount: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.videogame_id === game.id);

    if (existingIndex !== -1) {
      cart[existingIndex].amount += 1;
    } else {
      cart.push(itemToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAmountInCart(cart.find((item) => item.videogame_id === game.id)?.amount || 0);
  };

  const apiSearchUrl = `http://localhost:3000/videogames?name=${name}`;

  const fetchSearchVideogames = () => {
    axios
      .get(apiSearchUrl)
      .then((res) => setResults(res.data.results))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(fetchSearchVideogames, [name]);

  return (
    <>
      <div className="videogames-container container-fluid py-5">
        <h1 className="text-warning">Risultati per: "{name}"</h1>
        {loading ? (
          <p>Caricamento...</p>
        ) : results.length === 0 ? (
          <h3 className="text-center">Nessun risultato trovato.</h3>
        ) : (
          <div className="row py-5 g-5">
            {results.map((videogame) => (
              <CardGameDamb
                game={videogame}
                addToCart={() => addToCart(videogame)}
                amountInCart={amountInCart}
                platform={false}
                isInWishlist={wishlistIds.includes(videogame.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
