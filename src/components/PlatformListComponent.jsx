import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardGameDamb from "./CardGameDamb";
import ListGameDamb from "./ListGameDamb";

export default function PlatformListComponent() {
  const [showList, setShowList] = useState(true);
  const [videogames, setVideogames] = useState([]);
  const [allVideogames, setAllVideogames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [wishlistIds, setWishlistIds] = useState([]);

  const { platform } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/videogames/platform/${platform}`).then((res) => {
      setAllVideogames(res.data.results);
      setVideogames(res.data.results);
    });
  }, [platform]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/genres")
      .then((res) => setGenres(res.data.genres))
      .catch((err) => console.error("Errore nel caricamento dei generi", err));
  }, []);

  useEffect(() => {
    let filtered = allVideogames;
    if (genreFilter) {
      filtered = filtered.filter((g) => g.genre === genreFilter);
    }
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        if (sortField === "name") {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    setVideogames(filtered);
  }, [allVideogames, genreFilter, sortField, sortDirection]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistIds(wishlist);
  }, []);

  const handleToggleWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((gameId) => gameId !== id);
    } else {
      wishlist.push(id);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlistIds(wishlist);
  };

  return (
    <>
      <div>
        <div className="container">
          <h1 className="allListTitle text-uppercase">i nostri videogiochi {platform}</h1>
          <div className="row justify-content-between align-items-center m-4">
            <div className="col-md-4">
              <select
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
            <div className="col-md-4">
              <select
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
                <CardGameDamb
                  key={game.id}
                  game={game}
                  platform={platform}
                  isInWishlist={wishlistIds.includes(game.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
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
