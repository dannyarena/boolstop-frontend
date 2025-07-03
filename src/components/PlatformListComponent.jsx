import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardGameDamb from "./CardGameDamb";
import ListGameDamb from "./ListGameDamb";

export default function PlatformListComponent() {
  const [showList, setShowList] = useState(true);

  const [videogames, setVideogames] = useState([]);

  const { platform } = useParams();

  const apiUrl = `http://localhost:3000/videogames/platform/${platform}`;

  const fecthPlatformsVideogames = () => {
    axios.get(apiUrl).then((res) => {
      console.log(res.data.results);

      setVideogames(res.data.results);
    });
  };

  useEffect(fecthPlatformsVideogames, []);

  return (
    <>
      <div>
        <div className="container">
          <h1 className="allListTitle text-uppercase">
            i nostri videogiochi {platform}
          </h1>
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
    </>
  );
}
