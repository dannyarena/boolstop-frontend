import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // reduce scorre ogni item del carrello e accumula il risultato
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + Number(item.price) * item.amount;
  }, 0);

  const totalDiscount = cartItems.reduce((acc, item) => {
    const discount = item.discount_percentage || 0;
    return acc + (Number(item.price) * item.amount * discount) / 100;
  }, 0);

  // Usa videogame_id come chiave unica per ogni prodotto
  const handleIncrease = (videogame_id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.videogame_id === videogame_id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrease = (videogame_id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.videogame_id === videogame_id) {
        return { ...item, amount: Math.max(1, Number(item.amount) - 1) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (videogame_id) => {
    const updatedCart = cartItems.filter((item) => item.videogame_id !== videogame_id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // gestione costi di spedizione

  const shippingCost = 4.99;
  const freeShippingAmount = 100;
  const isFreeShippingCost = totalPrice >= freeShippingAmount;
  const finalShippingCost = isFreeShippingCost ? 0 : shippingCost;
  const finalPrice = totalPrice + finalShippingCost;

  localStorage.setItem(
    "order",
    JSON.stringify({
      shippingCost: finalShippingCost.toFixed(2),
      totalPrice: finalPrice.toFixed(2),
    })
  );
  return (
    <>
      <div className="wrapper container-fluid position-relative p-4">
        <button
          className="btn btn-warning position-absolute top-0 end-0 m-2 fs-5 fw-bold mt-4 me-3"
          onClick={() => navigate("/videogames")}
        >
          Continua a fare acquisti
          <i className="bi bi-arrow-right fs-5 ms-2"></i>
        </button>

        <h2 className="text-center fs-1 mb-4 fw-bold">IL TUO CARRELLO</h2>
        <hr />

        <div className="row">
          <div className="col-12 col-lg-9">
            {" "}
            {cartItems.length === 0 ? (
              <p className="text-center fs-2 fw-bold mt-5">Il carrello è vuoto.</p>
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <div className="row g-4">
                    {cartItems.map((item) => (
                      <div className="col-md-6 col-xl-4" key={item.videogame_id}>
                        <div className="cart-card card bg-opacity-75 text-white shadow rounded-4 ">
                          <img
                            src={`${item.image}`}
                            alt={item.name}
                            className="cart-card-img card-img-top"
                            style={{ height: "200px", objectFit: "contain" }}
                          />
                          <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                              <h2 className="card-title text-warning text-center fs-3">
                                {item.name}
                              </h2>
                              {item.discount_percentage ? (
                                <>
                                  <p className="mb-1 text-center">
                                    <span className="text-decoration-line-through text-danger fs-5">
                                      € {item.priceWithDiscount}
                                    </span>
                                  </p>
                                  <p className="mb-2 fs-2 text-success text-center fw-bold">
                                    € {item.price}
                                  </p>
                                </>
                              ) : (
                                <p className="mb-2 fs-2 text-center text-success fw-bold">
                                  € {item.price}
                                </p>
                              )}
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <button
                                className="cart-add-remove btn btn-success fw-bold"
                                onClick={() => handleIncrease(item.videogame_id)}
                              >
                                +
                              </button>
                              <span className="px-3 py-1 rounded fw-bold fs-4">{item.amount}</span>
                              <button
                                className="cart-add-remove btn btn-success fw-bold"
                                onClick={() => handleDecrease(item.videogame_id)}
                              >
                                -
                              </button>
                              <button
                                className="cart-remove btn btn-danger fw-bold ms-2"
                                onClick={() => handleRemove(item.videogame_id)}
                              >
                                Rimuovi
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-12 col-lg-3">
            <div
              className="cart-recap bg-opacity-75 text-white rounded-4 shadow p-4 sticky-top my-5"
              style={{ top: "100px" }}
            >
              <h4 className="text-warning mb-4 text-center fs-2 fw-bold">Riepilogo Ordine</h4>

              {totalDiscount ? (
                <div className="d-flex justify-content-between align-items-center mb-3 fs-4">
                  <span>Sconto Totale:</span>
                  <span className="text-success fs-3 fw-bold">- € {totalDiscount.toFixed(2)}</span>
                </div>
              ) : null}

              {isFreeShippingCost ? (
                <div className="d-flex justify-content-center align-items-center fs-4">
                  <p className="text-success fw-bold">Spedizione gratuita</p>
                </div>
              ) : (
                <div className="d-flex justify-content-between fs-4 py-2">
                  <span>Spese di spedizione:</span>
                  <span>€ {finalShippingCost.toFixed(2)}</span>
                </div>
              )}

              <hr className="border-light" />

              <div className="total-cart d-flex justify-content-between align-items-center mb-4">
                <strong>Totale:</strong>
                <h5 className="text-warning fs-1 fw-bold">€ {finalPrice.toFixed(2)}</h5>
              </div>

              <button
                className="btn-order btn btn-warning w-100 fw-bold text-uppercase fs-4"
                onClick={() => navigate("/formcheckout")}
                disabled={cartItems.length === 0}
              >
                Procedi all'ordine
              </button>
            </div>
          </div>
        </div>

        {/* colonna  */}

        {/* qui mettere colonna  */}
      </div>
    </>
  );
};

export default CartPage;
