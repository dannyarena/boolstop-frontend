import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CardGameDamb({ game, platform, isInWishlist, onToggleWishlist }) {
  const [amountInCart, setAmountInCart] = useState(0);
  const navigate = useNavigate();

  if (!game) return null; // evita errori se game è undefined

  const discount =
    game && game.discount_percentage ? (game.original_price * game.discount_percentage) / 100 : 0;
  const finalPrice = game && game.original_price ? game.original_price - discount : 0;

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find((item) => item.videogame_id === game.id);
    setAmountInCart(item ? item.amount : 0);
  }, [game.id]);

  const addToCart = () => {
    const ItemToAdd = {
      videogame_id: game.id,
      name: game.name,
      price: Number(finalPrice.toFixed(2)),
      image: game.image,
      amount: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(
      (item) => item.videogame_id === ItemToAdd.videogame_id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].amount += 1;
    } else {
      cart.push(ItemToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const item = cart.find((item) => item.videogame_id === game.id);
    setAmountInCart(item ? item.amount : 0);
  };

  const removeFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((item) => item.videogame_id === game.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].amount -= 1;
      if (cart[existingItemIndex].amount <= 0) {
        cart.splice(existingItemIndex, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const item = cart.find((item) => item.videogame_id === game.id);
    setAmountInCart(item ? item.amount : 0);
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  return (
    <div className="col-sm-6 col-md-4">
      <div className="cardGame" key={game.id}>
        <img className="img w-100" src={game.image} alt={game.name} />
        <div className="infoCard">
          <h5>{game.name}</h5>
          <p>{game.description}</p>
          <p>
            <strong>Genere:</strong> {game.genres.join(", ")}
          </p>
          <p>
            <small>Piattaforma: {game.platform}</small>
          </p>
          <Link
            to={platform ? `/videogame/${game.slug}` : `/videogame/${game.slug}`}
            className="btn btn-warning"
          >
            Scopri
          </Link>

          <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
            {amountInCart === 0 ? (
              <button className="btn btn-success p-3 mx-1" onClick={() => addToCart()}>
                <i className="bi bi-cart-plus"></i>
              </button>
            ) : (
              <div className="mt-2">
                <button className="btn btn-success fs-4 px-3 mx-1" onClick={() => addToCart()}>
                  +
                </button>
                <button className="btn btn-success fs-4 px-3 mx-1" onClick={() => removeFromCart()}>
                  -
                </button>
                <div>(quantità: {amountInCart})</div>
              </div>
            )}

            <div className="heart" onClick={() => onToggleWishlist(game.id)}>
              {isInWishlist ? (
                <i className="bi bi-heart-fill"></i>
              ) : (
                <i className="bi bi-heart"></i>
              )}
            </div>
          </div>
          <button className="btn btn-primary mt-4" onClick={buyNow}>
            Compra ora
          </button>
        </div>
      </div>
    </div>
  );
}
