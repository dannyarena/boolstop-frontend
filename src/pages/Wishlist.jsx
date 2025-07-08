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
    <div className="wishlist-container container py-5">
      <h1 className="wishlist-title text-center mb-5">La tua Wishlist</h1>

      {wishlistGames.length === 0 ? (
        <div className="empty-wishlist text-center text-white">
          <i className="bi bi-heart fs-1 text-danger"></i>
          <p className="fs-4 mt-2">Non hai ancora aggiunto giochi ai preferiti.</p>
        </div>
      ) : (
        <div className="row g-4">
          {wishlistGames.map((game) => (
            <CardGameDamb
              key={game.id}
              game={game}
              platform={false}
              isInWishlist={wishlistIds.includes(game.id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
