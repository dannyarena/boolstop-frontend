import { useState, useEffect } from "react";

const VideogamesList = () => {
const [videogames, setVideogames] = useState([]);
useEffect(() => {
    fetch("http://localhost:3000/videogames")
    .then((response) => response.json())
    .then((data) => {
        setVideogames(data.results); // salva i dati
    })
    .catch((error) =>{
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
        </div>
    );
};

export default VideogamesList;