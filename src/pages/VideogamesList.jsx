import { useState, useEffect } from "react";
import CardGameDamb from "../components/CardGameDamb";
import ListGameDamb from "../components/ListGameDamb";

// setFunzioni
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
              <ListGameDamb key={game.id} game={game} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default VideogamesList;
