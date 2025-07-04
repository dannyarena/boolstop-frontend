import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VideogamesDetail = () => {
  // con slug leggiamo i parametri dinamici della rotta
  const { slug } = useParams();
  const [videogame, setVideogame] = useState(null);

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

  if (!videogame) return <p>Caricamento...</p>;

  const addToCart = () => {
    const ItemToAdd = {
      videogame_id: videogame.id,
      name: videogame.name,
      price: videogame.original_price,
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

    alert("Prodotto aggiunto al carrello!");
  };

  return (
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
      <p>
        <strong>Prezzo: &euro; </strong>
        {videogame.original_price}
      </p>
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

      <button className="btn btn-success mt-4" onClick={addToCart}>
        Aggiungi al carrello
      </button>
    </div>
  );
};

export default VideogamesDetail;
