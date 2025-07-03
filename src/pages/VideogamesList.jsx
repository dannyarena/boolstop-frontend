import { useState, useEffect } from "react";
import { Link } from "react-router";
import CardGameDamb from "../components/CardGameDamb";
const VideogamesList = () => {
  const [videogames, setVideogames] = useState([]);
  const [showList, setShowList] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/videogames")
      .then((response) => response.json())
      .then((data) => {
        setVideogames(data.results); // salva i dati
      })
      .catch((error) => {
        console.error("Errore durante la ricezione dei dati", error);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="allListTitle">SCOPRI TUTTI I NOSTRI GIOCHI</h1>
        <div className="bottonContainer d-flex justify-content-center">
          {" "}
          <button
            className="btn btn-warning mb-3 text-uppercase fw-bold"
            onClick={() => setShowList((prev) => !prev)}
          >
            {showList ? "Vista Lista" : "Vista Card"}
          </button>
        </div>

        {showList ? (
          <div className="row g-3">
            {videogames.map((game) => (
              <CardGameDamb key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <ul className="listGame">
            {videogames.map((game) => (
              <li
                className="d-flex justify-content-between align-items-center mb-1"
                key={game.id}
              >
                {game.name}{" "}
                <Link to={`/videogames/${game.id}`} className="btn btn-warning">
                  Scopri
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default VideogamesList;
