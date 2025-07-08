import { Link } from "react-router";

export default function ListGameDamb({ game }) {
  return (
    <Link to={`/videogame/${game.slug}`} className="no-link-style">
      <li
        className="d-flex justify-content-between align-items-center mb-1 listGameItem"
        key={game.id}
      >
        {game.name} <i className="bi bi-arrow-right-circle text-dark fs-1"></i>
      </li>
    </Link>
  );
}
