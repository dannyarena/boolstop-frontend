import PlatformsLinkComponent from "../components/PlatformsLinkComponent";
import { dataPath } from "../data/dataPath";
import { Link } from "react-router";
import CardGameDamb from "../components/CardGameDamb";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [discountedGames, setDiscountedGames] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/videogames")
      .then((res) => res.json())
      .then((data) => {
        const discounted = data.results.filter(
          (vg) => vg.discount_percentage && vg.discount_percentage > 0
        );
        setDiscountedGames(discounted);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const ids = wishlist.map((item) => item.videogame_id);
    setWishlistIds(ids);
  }, []);

  const handleToggleWishlist = (id) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const index = wishlist.findIndex((item) => item.videogame_id === id);

    if (index !== -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push({ videogame_id: id });
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    const updatedIds = wishlist.map((item) => item.videogame_id);
    setWishlistIds(updatedIds);
  };

  return (
    <>
      <div className="wrapper-homepage vh-100">
        <div className="container">
          <div className="jumbotron">
            <h1 className="logobool">BOOLSTOP</h1>
            <div className="linkJumbo">
              <Link className="nav-link" to="/videogames">
                Tutti i Giochi
              </Link>
            </div>
          </div>
          <div className="logocontainer d-flex justify-content-center flex-row"></div>
          <section className="link-platforms">
            {dataPath.map((data, i) => (
              <PlatformsLinkComponent key={i} linkPage={data.path}>
                <i className={data.icon}></i>
              </PlatformsLinkComponent>
            ))}
          </section>
          <section className="discounted-games container mt-5 p-4">
            <h2 className="text-center text-white fs-1 mb-4">
              <i class="bi bi-fire text-danger"></i> OFFERTE DEL MOMENTO{" "}
              <i class="bi bi-fire text-danger"></i>
            </h2>
            <div className="row g-3 justify-content-center">
              {discountedGames.length === 0 ? (
                <p className="text-white text-center">Nessuna offerta al momento.</p>
              ) : (
                discountedGames.map((game) => (
                  <CardGameDamb
                    key={game.id}
                    game={game}
                    platform={false}
                    isInWishlist={wishlistIds.includes(game.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
