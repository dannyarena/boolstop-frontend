import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

export default function Header() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      navigate("/");
    } else if (search.trim()) {
      const params = new URLSearchParams({ name: search });
      navigate(`/search?${params.toString()}`);
    }
    setSearch("");
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((acc, item) => acc + (item.amount || 1), 0);
      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    document.addEventListener("visibilitychange", updateCartCount);
    // Aggiorna anche su ogni click (utile per SPA senza context globale)
    window.addEventListener("click", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      document.removeEventListener("visibilitychange", updateCartCount);
      window.removeEventListener("click", updateCartCount);
    };
  }, []);

  return (
    <header className="header position-sticky top-0 z-3">
      <nav className="navbar position- navbar-expand-lg navbar-dark bg-dark mb-4 px-5">
        <NavLink className="navbar-brand fw-bold fs-1 pb-2" to="/">
          Bool<span className="stop">Stop</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center fs-5 gap-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Homepage
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">
                Wishlist
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/videogames">
                Tutti i Giochi
              </NavLink>
            </li>
            <li className="nav-item position-relative">
              {cartCount > 0 && (
                <span className="badge-amount position-absolute badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
              <NavLink
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="nav-link"
                to="/cart"
              >
                <i className="bi bi-cart2 fs-3"></i>
              </NavLink>
            </li>
          </ul>

          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Cerca gioco..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-warning" type="submit">
              Cerca
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}
