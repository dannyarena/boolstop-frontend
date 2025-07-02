import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";

export default function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [loading, setLoading] = useState(true);

  const apiSearchUrl = `http://localhost:3000/videogames?name=${name}`;

  const fetchSearchVideogames = () => {
    axios
      .get(apiSearchUrl)
      .then((res) => setResults(res.data.results))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(fetchSearchVideogames, [name]);

  return (
    <>
      <h1>Risultati per: {name}</h1>

      {results.map((videogame) => (
        <ul key={videogame.id}>
          <li>{videogame.name}</li>
          <li>{videogame.description}</li>
        </ul>
      ))}
    </>
  );
}
