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
    const updatedCart = cartItems.filter(
      (item) => item.videogame_id !== videogame_id
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container ">
      <div className="wrapper position-relative mt-5 p-4 bg-light shadow-lg rounded">
        <button
          className="btn btn-warning position-absolute top-0 end-0 m-2 fs-5 fw-bold"
          onClick={() => navigate("/videogames")}
        >
          Continua a fare acquisti
          <i className="bi bi-arrow-right fs-5 ms-2"></i>
        </button>
        <h2 className="text-center fs-1 ">IL TUO CARRELLO</h2>
        <hr />

        {cartItems.length === 0 ? (
          <p className="text-center fs-5 fw-bold  ">Il carrello è vuoto.</p>
        ) : (
          <div className="row justify-content-left align-items-center g-4">
            {cartItems.map((item) => {
              return (
                <div className="col-md-4" key={item.videogame_id}>
                  <div className="card  bg-light shadow-sm border-0 rounded h-100 ">
                    <img
                      src={`${item.image}`}
                      alt={item.name}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      {item.discount_percentage ? (
                        <>
                          <p>
                            prezzo originale: €{" "}
                            <span className="card-text text-decoration-line-through">
                              {item.priceWithDiscount}
                            </span>
                          </p>
                          <p className="card-text">Prezzo: € {item.price}</p>
                        </>
                      ) : (
                        <p className="card-text">Prezzo: € {item.price}</p>
                      )}

                      <p className="card-text">Quantità: {item.amount}</p>
                      <button
                        className="btn  btn-success me-2 fs-1 fw-bold border-0  "
                        onClick={() => handleIncrease(item.videogame_id)}
                      >
                        {" "}
                        +
                      </button>
                      <button
                        className="btn btn-success me-2 fs-1 fw-bold border-0"
                        onClick={() => handleDecrease(item.videogame_id)}
                      >
                        {" "}
                        -
                      </button>
                      <button
                        className="btn  btn-danger me-2 fs-4  border-0"
                        onClick={() => handleRemove(item.videogame_id)}
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <div className="bg-light rounded p-4 mt-4 d-flex justify-content-between align-items-center">
                Sconto totale: -€ {totalDiscount.toFixed(2)}
              </div>
            </div>
            <div className="bg-light rounded p-4 mt-4 d-flex justify-content-between align-items-center">
              <h4>Totale carrello: € {totalPrice.toFixed(2)}</h4>
              <button
                className="btn btn-warning fs-5 fw-bold text-uppercase"
                onClick={() => navigate("/formcheckout")}
                disabled={cartItems.length === 0}
              >
                Procedi all'ordine
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
