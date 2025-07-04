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

  const handleIncrease = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrease = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, amount: Math.max(1, Number(item.amount) - 1) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container py-4">
      <h2>Il tuo carrello</h2>

      {cartItems.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => {
            return (
              <div className="col-md-4 mb-3" key={item.id}>
                <div className="card">
                  <img src={`${item.image}`} alt={item.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Prezzo: € {item.price}</p>
                    <p className="card-text">Quantità: {item.amount}</p>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleIncrease(item.id)}
                    >
                      {" "}
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleDecrease(item.id)}
                    >
                      {" "}
                      -
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.id)}>
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="bg-light rounded p-4 mt-4 d-flex justify-content-between align-items-center">
            {/* tofixed 2 serve per mostrare due decimali (es. 123.50) */}
            <h4>Totale carrello: € {totalPrice.toFixed(2)}</h4>
            <button
              className="btn btn-warning"
              onClick={() => navigate("/formcheckout")}
              disabled={cartItems.length === 0}
            >
              Procedi all'ordine
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
