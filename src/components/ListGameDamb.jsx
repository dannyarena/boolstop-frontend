import { Link } from "react-router";

export default function ListGameDamb({ game }) {
  return (
    <li
      className="d-flex justify-content-between align-items-center mb-1"
      key={game.id}
    >
      {game.name}{" "}
      <Link to={`/videogames/${game.id}`} className="btn btn-warning">
        Scopri
      </Link>
    </li>
  );
}
