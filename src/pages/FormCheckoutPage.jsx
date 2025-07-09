import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function FormCheckoutPage() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const videogames = cart.map((item) => {
    return { videogame_id: item.videogame_id, amount: item.amount };
  });

  const initialFormData = {
    customer_name: "",
    customer_surname: "",
    shipping_address: "",
    customer_email: "",
    discount_code_name: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [priceDiscounted, setPriceDiscounted] = useState(0);
  const [valueDiscount, setValueDiscount] = useState(0);
  const [messageError, setMessageError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, videogames };

    axios
      .post("http://localhost:3000/orders/addOrder", dataToSend)
      .then((res) => console.log(res));

    setFormData(initialFormData);
    localStorage.setItem(
      "order",
      JSON.stringify({
        name: formData.customer_name,
        surname: formData.customer_surname,
        email: formData.customer_email,
        shippingAddress: formData.shipping_address,
        date: new Date().toISOString(),
        orderNumber: Math.floor(Math.random() * 1000000),
        discountedPrice,
      })
    );

    navigate("/orderRecap");
  };

  const dataDiscount = { discount_code_name: formData.discount_code_name };

  const handleValidationDiscount = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/orders/validate-discount", dataDiscount)
      .then((res) => {
        setValueDiscount(res.data.discount_value);
      })
      .catch((err) => setMessageError(err.response.data.message));
  };

  const totalDiscount = cart.reduce((acc, item) => {
    const discount = item.discount_percentage || 0;
    return acc + (item.price * item.amount * discount) / 100;
  }, 0);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const order = JSON.parse(localStorage.getItem("order")) || {};

  const discountedPrice = totalPrice * (1 - valueDiscount / 100);
  const shippingCost = discountedPrice <= 100 ? 4.99 : 0;

  //  calcolo del totale
  const totalWithShipping = discountedPrice + shippingCost;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 mb-4">
          <div
            className="card shadow-sm"
            style={{
              border: "2px solid #ffcc00",
              borderRadius: 20,
              background:
                "radial-gradient(circle at center, #111111dc 0%, #000 100%)",
            }}
          >
            <div className="card-body" style={{ borderRadius: 20 }}>
              <h2
                className="mb-4 text-center"
                style={{ color: "#ffcc00", fontWeight: 700 }}
              >
                Checkout
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="customer_name"
                      className="form-label"
                      style={{ color: "#ffcc00", fontWeight: 600 }}
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        background: "#222",
                        color: "#fff",
                        border: "1px solid #ffcc00",
                      }}
                      id="customer_name"
                      name="customer_name"
                      placeholder="Inserisci il tuo nome"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="customer_surname"
                      className="form-label"
                      style={{ color: "#ffcc00", fontWeight: 600 }}
                    >
                      Cognome
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        background: "#222",
                        color: "#fff",
                        border: "1px solid #ffcc00",
                      }}
                      id="customer_surname"
                      name="customer_surname"
                      placeholder="Inserisci il tuo cognome"
                      value={formData.customer_surname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="shipping_address"
                      className="form-label"
                      style={{ color: "#ffcc00", fontWeight: 600 }}
                    >
                      Indirizzo di spedizione
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        background: "#222",
                        color: "#fff",
                        border: "1px solid #ffcc00",
                      }}
                      id="shipping_address"
                      name="shipping_address"
                      placeholder="Via, numero civico, città"
                      value={formData.shipping_address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="customer_email"
                      className="form-label"
                      style={{ color: "#ffcc00", fontWeight: 600 }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      style={{
                        background: "#222",
                        color: "#fff",
                        border: "1px solid #ffcc00",
                      }}
                      id="customer_email"
                      name="customer_email"
                      placeholder="esempio@email.com"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-warning w-100 mt-4 mb-2"
                  style={{
                    backgroundColor: "#ffcc00",
                    color: "#000",
                    fontWeight: "bold",
                    border: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  Invia ordine
                </button>
              </form>
              <hr
                className="my-4"
                style={{ borderColor: "#ffcc00", opacity: 0.5 }}
              />
              <form onSubmit={handleValidationDiscount} className="mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      background: "#222",
                      color: "#fff",
                      border: "1px solid #ffcc00",
                    }}
                    id="discount_code_name"
                    name="discount_code_name"
                    placeholder="Inserisci codice sconto"
                    value={formData.discount_code_name}
                    onChange={handleInputChange}
                  />
                  <button
                    className="btn btn-warning"
                    type="submit"
                    style={{
                      backgroundColor: "#ffcc00",
                      color: "#000",
                      fontWeight: "bold",
                      border: "none",
                    }}
                  >
                    Verifica
                  </button>
                </div>
                {messageError && (
                  <div className="alert alert-danger mt-2" role="alert">
                    {messageError}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div
            className="card shadow-sm"
            style={{
              border: "2px solid #ffcc00",
              borderRadius: 20,
              background:
                "radial-gradient(circle at center, #111111dc 0%, #000 100%)",
            }}
          >
            <div className="card-body" style={{ borderRadius: 20 }}>
              <h4
                className="mb-3 text-center"
                style={{ color: "#ffcc00", fontWeight: 700 }}
              >
                Riepilogo ordine
              </h4>
              {cart.length === 0 ? (
                <div className="alert alert-warning text-center">
                  Il carrello è vuoto.
                </div>
              ) : (
                <ul className="list-group mb-3">
                  {cart.map((item) => (
                    <li
                      key={item.videogame_id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      <span>
                        {item.name}{" "}
                        <span
                          className="badge"
                          style={{
                            backgroundColor: "#ffcc00",
                            color: "#000",
                            fontWeight: "bold",
                          }}
                        >
                          x{item.amount}
                        </span>
                      </span>
                      <span>€ {Number(item.price).toFixed(2)}</span>
                    </li>
                  ))}
                  {totalDiscount > 0 && (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center text-danger"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "none",
                      }}
                    >
                      Sconto applicato:{" "}
                      <span>-€ {totalDiscount.toFixed(2)}</span>
                    </li>
                  )}
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    {shippingCost > 0 ? (
                      <span>Spedizione: € {shippingCost.toFixed(2)}</span>
                    ) : (
                      <span>Spedizione gratuita</span>
                    )}
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center fw-bold"
                    style={{
                      background: "#ffcc00",
                      color: "#000",
                      fontSize: "1.3rem",
                      border: "none",
                    }}
                  >
                    Totale
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "#fff",
                        color: "#ffcc00",
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        border: "2px solid #ffcc00",
                      }}
                    >
                      €{totalWithShipping.toFixed(2)}
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
