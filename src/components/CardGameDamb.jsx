import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CardGameDamb({ game, platform, isInWishlist, onToggleWishlist }) {
  return (
    <div className="cardGame col-sm-6 col-md-4" key={game.id}>
      <img className="img w-100" src={game.image} alt={game.name} />
      <div className="infoCard text-center p-0">
        <h5 className="card-title">{game.name}</h5>
        <p className="card-text">{game.description}</p>
        <p className="card-text">{game.genre}</p>
        <p className="card-text">
          <small className="text">Piattaforma: {game.platform}</small>
        </p>
        <Link
          to={platform ? `/videogame/${game.slug}` : `/videogame/${game.slug}`}
          className="btn btn-warning"
        >
          Scopri
        </Link>
        <div className="d-flex justify-content-center align-items-center mt-3">
          {/* Qui ci andrà il bottone per aggiungere direttamente al carrello */}
          <div className="heart" onClick={() => onToggleWishlist(game.id)}>
            {isInWishlist ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
          </div>
        </div>
      </div>
    </div>
  );
}
