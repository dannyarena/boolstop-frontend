import React, { useEffect, useState } from "react";
import CardGameDamb from "./CardGameDamb";

const RelatedGamesCarousel = ({ games, wishlistIds, onToggleWishlist }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = games.length;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (totalSlides === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  if (totalSlides === 0) {
    return (
      <div className="container bg-light p-4 mt-5 rounded-5 shadow-lg">
        <h2 className="text-center">Videogiochi Correlati</h2>
        <p className="text-center">Nessun gioco correlato trovato</p>
      </div>
    );
  }

  return (
    <div className="related-games container p-4 mt-5 rounded-5 shadow-lg">
      <h2 className="text-center mb-4">Videogiochi Correlati</h2>
      <div id="carouselExampleIndicators" className="carousel slide">
        {/* Indicatori */}
        <ol className="carousel-indicators d-flex justify-content-center p-0 mb-2">
          {games.map((_, i) => (
            <li
              key={i}
              className={`mx-2 ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: i === currentIndex ? "#fff" : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
                display: "inline-block",
              }}
              aria-label={`Slide ${i + 1}`}
            ></li>
          ))}
        </ol>

        {/* Carousel Inner */}
        <div className="carousel-inner">
          {games.map((game, i) => (
            <div key={game.id} className={`carousel-item ${i === currentIndex ? "active" : ""}`}>
              <div className="d-flex justify-content-center mb-5">
                <CardGameDamb
                  key={game.id}
                  game={game}
                  platform={false}
                  isInWishlist={wishlistIds.includes(game.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Controlli */}
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            goPrev();
          }}
          style={{ cursor: "pointer" }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            goNext();
          }}
          style={{ cursor: "pointer" }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
      </div>
    </div>
  );
};

export default RelatedGamesCarousel;
