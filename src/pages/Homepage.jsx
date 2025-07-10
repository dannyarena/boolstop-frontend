import PlatformsLinkComponent from "../components/PlatformsLinkComponent";
import { dataPath } from "../data/dataPath";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import PromoCarousel from "../components/PromoCarousel";

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

  return (
    <>
      <div className="wrapper-homepage">
        <div className="jumbotron-container d-flex justify-content-center align-items-center">
          <div className="jumbotron">
            <div className="logobool p-5">
              <h1 className="display-1 text-center fw-bold ">
                BOOL<span className="text-warning">STOP</span>
              </h1>
              <div className="linkJumbo">
                <Link className="nav-link" to="/videogames">
                  Tutti i Giochi
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="logocontainer d-flex justify-content-center flex-row"></div>
          <section className="link-platforms">
            {dataPath.map((data, i) => (
              <PlatformsLinkComponent key={i} linkPage={data.path}>
                <i className={data.icon}></i>
              </PlatformsLinkComponent>
            ))}
          </section>
          <section className="discounted-games container mt-5 mb-5 p-4">
            <PromoCarousel
              discountedGames={discountedGames}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />
          </section>
        </div>
      </div>
    </>
  );
}
