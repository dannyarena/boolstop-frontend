import { useState, useEffect } from "react";
import CardGameDamb from "../components/CardGameDamb";

export default function Wishlist() {
  const [allVideogames, setAllVideogames] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/videogames")
      .then((res) => res.json())
      .then((data) => setAllVideogames(data.results));
  }, []);

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

  const wishlistGames = allVideogames.filter((game) => wishlistIds.includes(game.id));

  return (
    <div className="container bg-light p-4 mt-5 rounded shadow-sm">
      <h1 className="text-center fw-bold">WISHLIST</h1>
      <div className="row g-3">
        {wishlistGames.length === 0 ? (
          <p className="text-center">La tua wishlist è vuota</p>
        ) : (
          wishlistGames.map((game) => (
            <CardGameDamb
              key={game.id}
              game={game}
              platform={false}
              isInWishlist={wishlistIds.includes(game.id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))
        )}
      </div>
    </div>
  );
}
