import { useState, useEffect } from "react";

const VideogamesList = () => {
  const [videogames, setVideogames] = useState([]);
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
      <h1>Tutti i giochi</h1>
      <ul>
        {videogames.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
      <div className="container">
        <div className="row g-3">
          {videogames.map((game) => (
            <div className="cardGame col-3" key={game.id}>
              <img
                className="img w-100"
                src={`../cover-game/${game.image}`}
                alt={game.name}
              />

              <div className="infoCard">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text">{game.description}</p>
                <p className="card-text">{game.genre}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Piattaforme: {game.platforms}
                  </small>
                </p>
                <a href={`/videogames/${game.id}`} className="btn btn-primary">
                  Dettagli
                </a>
              </div>
            </div>
          ))}
          0{" "}
        </div>
      </div>
    </div>
  );
};

export default VideogamesList;
