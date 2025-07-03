import { useState, useEffect } from "react";
import CardGameDamb from "../components/CardGameDamb";
import ListGameDamb from "../components/ListGameDamb";

// setFunzioni
const VideogamesList = () => {
  const [allVideogames, setAllVideogames] = useState([]);
  const [videogames, setVideogames] = useState([]);
  const [showList, setShowList] = useState(true);
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // Carica tutti i videogiochi una sola volta all'inizio
  useEffect(() => {
    fetch("http://localhost:3000/videogames")
      .then((response) => response.json())
      .then((data) => {
        setAllVideogames(data.results);
        setVideogames(data.results);
      })
      .catch((error) => {
        console.error("Errore durante la ricezione dei dati", error);
      });
  }, []);

  // Carica i generi una sola volta all'inizio
  useEffect(() => {
    fetch("http://localhost:3000/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((err) => console.error("Errore nel caricamento dei generi", err));
  }, []);

  useEffect(() => {
    const params = [];
    if (genreFilter) params.push(`genre=${encodeURIComponent(genreFilter)}`);
    if (platformFilter) params.push(`platform=${encodeURIComponent(platformFilter)}`);
    if (sortField) params.push(`sort=${encodeURIComponent(sortField)}`);
    if (sortField && sortDirection) params.push(`direction=${encodeURIComponent(sortDirection)}`);
    const queryString = params.length ? `?${params.join("&")}` : "";

    fetch(`http://localhost:3000/videogames${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        setVideogames(data.results);
      })
      .catch((error) => {
        console.error("Errore durante la ricezione dei dati", error);
      });
  }, [genreFilter, platformFilter, sortField, sortDirection]);

  const platforms = allVideogames
    .map((g) => g.platform)
    .filter((platform, index, arr) => platform && arr.indexOf(platform) === index);

  return (
    <div>
      <div className="container">
        <h1 className="allListTitle">SCOPRI TUTTI I NOSTRI GIOCHI</h1>
        <div className="row justify-content-between align-items-center m-4">
          <div className="col-md-3">
            <select
              id="genreFilter"
              className="filter form-select bg-warning text-dark border-0 fw-bold"
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              <option value="">Tutti i generi</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              id="platformFilter"
              className="filter form-select bg-warning text-dark border-0 fw-bold"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
            >
              <option value="">Tutte le piattaforme</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              id="sortOrder"
              className="filter form-select bg-warning text-dark border-0 fw-bold"
              value={`${sortField}-${sortDirection}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split("-");
                setSortField(field);
                setSortDirection(direction);
              }}
            >
              <option value="-">Ordina per...</option>
              <option value="name-asc">Nome A-Z</option>
              <option value="name-desc">Nome Z-A</option>
              <option value="releaseDate-asc">Data di rilascio ↑</option>
              <option value="releaseDate-desc">Data di rilascio ↓</option>
              <option value="price-asc">Prezzo crescente</option>
              <option value="price-desc">Prezzo decrescente</option>
            </select>
          </div>

          <div className="col-md-3 bottonContainer d-flex justify-content-center align-items-center">
            {" "}
            <button
              className="btn btn-warning mb-3 text-uppercase fw-bold"
              onClick={() => setShowList((prev) => !prev)}
            >
              {showList ? (
                <i className="bi bi-list"></i>
              ) : (
                <i className="bi bi-layout-three-columns"></i>
              )}
            </button>
          </div>
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
