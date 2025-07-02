import { Outlet } from "react-router";
import { NavLink } from "react-router";

export default function DefaultLayout() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              BoolStop
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
              </ul>

              <form className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Cerca gioco..."
                />
                <button className="btn btn-primary" type="submit">
                  Cerca
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
