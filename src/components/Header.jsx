import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const params = new URLSearchParams({ name: search });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?${params.toString()}`);
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-2 pb-2" to="/">
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                <NavLink className="nav-link" to="/cart">
                  Carrello
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/orders">
                  Ordini
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/videogames">
                  Tutti i Giochi
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
        </div>
      </nav>
    </header>
  );
}
