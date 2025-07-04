import { Link } from "react-router";

export default function CardGameDamb({ game, platform }) {
  return (
    <div className="cardGame col-sm-6 col-md-4" key={game.id}>
      <img className="img w-100" src={`../cover-game/${game.image}`} alt={game.name} />
      <div className="infoCard text-center p-3">
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
      </div>
    </div>
  );
}
