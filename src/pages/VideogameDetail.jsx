import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardGameDamb from "../components/CardGameDamb";
import RelatedGamesCarousel from "../components/RelatedGamesCarousel";

const VideogamesDetail = () => {
  // con slug leggiamo i parametri dinamici della rotta
  const { slug } = useParams();
  const [videogame, setVideogame] = useState(null);
  const navigate = useNavigate();
  const [amountInCart, setAmountInCart] = useState(0);
  const [relatedGames, setRelatedGames] = useState([]);

  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistIds(wishlist);
  }, [slug]);

  const handleToggleWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((gameId) => gameId !== id);
    } else {
      wishlist.push(id);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlistIds(wishlist);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/videogames/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setVideogame(data);
      })
      .catch((err) => {
        console.error("Errore nella ricezione dei dati", err);
      });
  }, [slug]);

  // Sposta qui tutte le funzioni e variabili che usano videogame
  const discount =
    videogame && videogame.discount_percentage
      ? (videogame.original_price * videogame.discount_percentage) / 100
      : 0;
  const finalPrice =
    videogame && videogame.original_price ? videogame.original_price - discount : 0;

  const addToCart = () => {
    if (!videogame) return;
    const discount = videogame.discount_percentage || 0;
    const priceWithDiscount = videogame.original_price;
    const price = Number(
      (videogame.original_price - (videogame.original_price * discount) / 100).toFixed(2)
    );

    const ItemToAdd = {
      videogame_id: videogame.id,
      name: videogame.name,
      original_price: videogame.original_price,
      priceWithDiscount, // prezzo originale
      price, // prezzo scontato
      discount_percentage: discount,
      image: videogame.image,
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
    const item = cart.find((item) => item.videogame_id === videogame.id);
    setAmountInCart(item ? item.amount : 0);
  };

  const removeFromCart = () => {
    if (!videogame) return;
    const ItemToRemove = {
      videogame_id: videogame.id,
      name: videogame.name,
      price: Number(finalPrice.toFixed(2)),
      image: videogame.image,
      amount: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(
      (item) => item.videogame_id === ItemToRemove.videogame_id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].amount -= 1;
      if (cart[existingItemIndex].amount === 0) {
        cart.splice(existingItemIndex, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const item = cart.find((item) => item.videogame_id === videogame.id);
    setAmountInCart(item ? item.amount : 0);
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  useEffect(() => {
    if (videogame) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const item = cart.find((item) => item.videogame_id === videogame.id);
      setAmountInCart(item ? item.amount : 0);
    }
  }, [videogame]);

  useEffect(() => {
    if (!videogame) return;

    const genresArray = videogame.genres.split(",").map((g) => g.trim());

    fetch("http://localhost:3000/videogames")
      .then((res) => res.json())
      .then((data) => {
        console.log("Videogiochi correlati:", data);
        const related = data.results.filter((vg) => {
          if (vg.id === videogame.id) return false;
          console.log("Controllo generi:", vg.genres);
          const vgGenres = vg.genres.map((g) => g.trim());
          return vgGenres.some((g) => genresArray.includes(g));
        });
        setRelatedGames(related);
      })
      .catch(console.error);
  }, [videogame]);

  if (!videogame) return <p>Caricamento...</p>;

  return (
    <>
      <div className="container bg-light bg-gradient text-center py-5 rounded-5 shadow-lg">
        <h1>{videogame.name}</h1>
        <img
          src={`${videogame.image}`}
          alt={videogame.name}
          className="img-fluid my-3"
          style={{ maxWidth: "400px" }}
        />
        <h4>{videogame.description}</h4>
        <p>
          <strong>Genere: </strong>
          {videogame.genres}
        </p>
        {videogame.discount_percentage ? (
          <>
            <p className="fs-10 text-decoration-line-through">{videogame.original_price} &euro;</p>
            <p>
              <strong className="fs-5">{finalPrice.toFixed(2)} &euro;</strong>
            </p>
          </>
        ) : (
          <p>{videogame.original_price} &euro;</p>
        )}
        <p>
          <strong>Piattaforma: </strong>
          {videogame.platform}
        </p>
        <p>
          <strong>Data di rilascio: </strong>
          {new Date(videogame.release_date).toLocaleDateString("it-IT")}
        </p>
        <p>
          <strong>PEGI: </strong>
          {videogame.pegi}
        </p>
        <p>
          {Array.from({ length: 5 }).map((_, i) =>
            i < Math.round(videogame.rating) ? (
              <i key={i} className="bi bi-star-fill text-warning fs-3"></i>
            ) : (
              <i key={i} className="bi bi-star text-warning fs-3"></i>
            )
          )}
        </p>

        {amountInCart === 0 ? (
          <button className="btn btn-success mt-4" onClick={() => addToCart()}>
            Aggiungi al carrello
          </button>
        ) : (
          <div>
            <button className="btn btn-success mt-4" onClick={() => addToCart()}>
              +
            </button>
            <button className="btn btn-success mt-4" onClick={() => removeFromCart()}>
              -
            </button>
            <div>aggiunto al carrello (quantità: {amountInCart})</div>
          </div>
        )}

        <button className="btn btn-primary mt-4" onClick={buyNow}>
          Compra ora
        </button>
      </div>

      <RelatedGamesCarousel
        games={relatedGames}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
      />
    </>
  );
};

export default VideogamesDetail;
