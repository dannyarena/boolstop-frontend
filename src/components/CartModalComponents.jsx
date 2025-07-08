import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function CartModalComponent() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCart = () => {
      const cart = localStorage.getItem("cart");
      setCartItems(cart ? JSON.parse(cart) : []);
    };

    const modal = document.getElementById("exampleModal");
    if (modal) {
      modal.addEventListener("show.bs.modal", updateCart);
    }

    // Pulizia evento
    return () => {
      if (modal) {
        modal.removeEventListener("show.bs.modal", updateCart);
      }
    };
  }, []);

  console.log(cartItems);

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-warning text-dark ">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                Carrello
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul>
                {cartItems.map((item) => (
                  <li key={item.videogame_id}>
                    {item.name} - {item.price} &euro;{" "}
                    <span className="badge bg-secondary ms-2 ">
                      X{item.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                onClick={() => {
                  navigate("/cart");
                }}
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Vai al carrello
                <i className="bi bi-cart-check-fill ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
