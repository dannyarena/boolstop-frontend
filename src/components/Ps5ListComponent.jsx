import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:3000/videogames/platform/playstation";

export default function Ps5ListComponent() {
  const [videogames, setVideogames] = useState([]);

  const fecthPs5Videogames = () => {
    axios.get(apiUrl).then((res) => {
      setVideogames(res.data);
    });
  };

  useEffect(fecthPs5Videogames, []);

  return (
    <>
      {videogames.map((videogame) => {
        <ul>
          <li>{videogame.name}</li>
          <li>{videogame.description}</li>
        </ul>;
      })}
    </>
  );
}
