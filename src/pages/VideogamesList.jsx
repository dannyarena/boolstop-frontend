import { useState, useEffect } from "react";

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
            {showList ? "Vista Card" : "Vista Lista"}
          </button>
        </div>

        {showList ? (
          <div className="row g-3">
            {videogames.map((game) => (
              <div className="cardGame col-3" key={game.id}>
                <img
                  className="img w-100"
                  src={`../cover-game/${game.image}`}
                  alt={game.name}
                />
                <div className="infoCard text-center p-3">
                  <h5 className="card-title">{game.name}</h5>
                  <p className="card-text">{game.description}</p>
                  <p className="card-text">{game.genre}</p>
                  <p className="card-text">
                    <small className="text">Piattaforma: {game.platform}</small>
                  </p>
                  <a
                    href={`/videogames/${game.id}`}
                    className="btn btn-warning"
                  >
                    Scopri
                  </a>
                </div>
              </div>
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
                <a href={`/videogames/${game.id}`} className="btn btn-warning">
                  Scopri
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default VideogamesList;
