import { useState, useEffect } from "react";
import CardGameDamb from "../components/CardGameDamb";
import ListGameDamb from "../components/ListGameDamb";
import axios from "axios";
import { useSearchParams } from "react-router";

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

  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    fetch("http://localhost:3000/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((err) => console.error("Errore nel caricamento dei generi", err));
  }, []);

  useEffect(() => {
    // const genreFilter = searchParams.get("genre");
    // const platformFilter = searchParams.get("platform");
    // const sortField = searchParams.get("sort");
    // const sortDirection = searchParams.get("direction");

    const params = new URLSearchParams();

    // const params = [];
    if (genreFilter) params.append("genre", genreFilter);
    if (platformFilter) params.append(`platform`, platformFilter);
    if (sortField) params.append("sort", sortField);
    if (sortField && sortDirection) params.append("direction", sortDirection);
    const queryString = params.toString();
    const url = `http://localhost:3000/videogames${
      queryString ? `?${queryString}` : ""
    }`;

    console.log("Request URL:", url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVideogames(data.results);
      })
      .catch((error) => {
        console.error("Errore durante la ricezione dei dati", error);
      });

    setSearchParams(params);
  }, [genreFilter, platformFilter, sortField, sortDirection]);

  // useEffect(() => {
  //   const params = {};
  //   if (genreFilter) params.genre = genreFilter;
  //   if (platformFilter) params.platform = platformFilter;
  //   if (sortField) params.sort = sortField;
  //   if (sortField && sortDirection) params.direction = sortDirection;

  //   axios
  //     .get("http://localhost:3000/videogames", { params }) // <-- qui passi { params: { ... } }
  //     .then((response) => {
  //       setVideogames(response.data.results);
  //     })
  //     .catch((error) => {
  //       console.error("Errore durante la ricezione dei dati", error);
  //     });
  // }, [genreFilter, platformFilter, sortField, sortDirection]);

  const platforms = allVideogames
    .map((g) => g.platform)
    .filter(
      (platform, index, arr) => platform && arr.indexOf(platform) === index
    );

  return (
    <div>
      <div className="container">
        <h1 className="allListTitle">SCOPRI TUTTI I NOSTRI GIOCHI</h1>
        <div className="row justify-content-between align-items-center m-4">
          <div className="col-md-3">
            <select
              id="genreFilter"
              className="filter form-select bg-warning text-dark border-0 fw-bold fs-4"
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
              className="filter form-select bg-warning text-dark border-0 fw-bold fs-4"
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
              className="filter form-select bg-warning text-dark border-0 fw-bold fs-4"
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
              className="btn btn-warning text-uppercase fw-bold"
              onClick={() => setShowList((prev) => !prev)}
            >
              {showList ? (
                <i className="bi bi-list fs-3"></i>
              ) : (
                <i className="bi bi-layout-three-columns fs-3"></i>
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
