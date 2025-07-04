import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import CardGameDamb from "../components/CardGameDamb";

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
      <div className="container bg-light p-4 rounded-5">
        <h1>Risultati per: "{name}"</h1>
        {loading ? (
          <p>Caricamento...</p>
        ) : results.length === 0 ? (
          <h3 className="text-center">Nessun risultato trovato.</h3>
        ) : (
          <div className="row g-3 justify-content-center my-3">
            {results.map((videogame) => (
              <CardGameDamb game={videogame} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
