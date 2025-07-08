import { useState, useEffect } from "react";
import CardGameDamb from "../components/CardGameDamb";
import ListGameDamb from "../components/ListGameDamb";
import { useSearchParams } from "react-router";
import NotFoundPage from "./NotFoundPage";
import { useNavigate } from "react-router-dom";
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
  const [wishlistIds, setWishlistIds] = useState([]);
  const [error, setError] = useState(false);
  const [amountInCart, setAmountInCart] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // logiche
  useEffect(() => {
    fetch("http://localhost:3000/videogames")
      .then((response) => response.json())
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          setError(true);
        } else {
          setAllVideogames(data.results);
          setVideogames(data.results);
        }
      })
      .catch((error) => {
        setError(true);
        console.error("Errore durante la ricezione dei dati", error);
      });
  }, []);

  if (error) return <NotFoundPage />;

  useEffect(() => {
    fetch("http://localhost:3000/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((err) => console.error("Errore nel caricamento dei generi", err));
  }, []);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistIds(savedWishlist);
  }, []);

  const handleToggleWishlist = (gameId) => {
    let updated;
    if (wishlistIds.includes(gameId)) {
      updated = wishlistIds.filter((id) => id !== gameId);
    } else {
      updated = [...wishlistIds, gameId];
    }
    setWishlistIds(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  useEffect(() => {
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

  // Sposta qui tutte le funzioni e variabili che usano videogame
  const discount =
    videogames && videogames.discount_percentage
      ? (videogames.original_price * videogames.discount_percentage) / 100
      : 0;
  const finalPrice =
    videogames && videogames.original_price
      ? videogames.original_price - discount
      : 0;

  const addToCart = () => {
    if (!videogames) return;
    const discount = videogames.discount_percentage || 0;
    const priceWithDiscount = videogames.original_price;
    const price = Number(
      (
        videogames.original_price -
        (videogames.original_price * discount) / 100
      ).toFixed(2)
    );

    const ItemToAdd = {
      videogame_id: videogames.id,
      name: videogames.name,
      original_price: videogames.original_price,
      priceWithDiscount, // prezzo originale
      price, // prezzo scontato
      discount_percentage: discount,
      image: videogames.image,
      amount: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(
      (item) => item.videogame_id === ItemToAdd.videogame_id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].amount += 1;
    } else {
      cart.push(ItemToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const item = cart.find((item) => item.videogame_id === videogames.id);
    setAmountInCart(item ? item.amount : 0);
  };

  const removeFromCart = () => {
    if (!videogames) return;
    const ItemToRemove = {
      videogame_id: videogames.id,
      name: videogames.name,
      price: Number(finalPrice.toFixed(2)),
      image: videogames.image,
      amount: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(
      (item) => item.videogame_id === ItemToRemove.videogame_id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].amount -= 1;
      if (cart[existingItemIndex].amount === 0) {
        cart.splice(existingItemIndex, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const item = cart.find((item) => item.videogame_id === videogame.id);
    setAmountInCart(item ? item.amount : 0);
  };

  const handleAddToCart = (game) => {
    const amount = addToCart(game);
    setAmountInCart(amount);
  };

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
              <CardGameDamb
                key={game.id}
                game={game}
                removeFromCart={() => removeFromCart(game)}
                addToCart={() => handleAddToCart(game)}
                amountInCart={amountInCart}
                buyNow={() => buyNow(game)}
                platform={false}
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
  );
};
export default VideogamesList;
