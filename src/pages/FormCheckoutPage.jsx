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

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const itemDiscount = cart.reduce((acc, item) => {
    const discount = item.discount_percentage || 0;
    return acc + (item.price * item.amount * discount) / 100;
  }, 0);

  const discountFromCode = totalPrice * (1 - valueDiscount / 100);

  const totalDiscount = itemDiscount + discountFromCode;

  const order = JSON.parse(localStorage.getItem("order")) || {};

  const discountedPrice = totalPrice - discountFromCode;
  const shippingCost = discountedPrice <= 100 ? 4.99 : 0;
  const totalWithShipping = discountedPrice + shippingCost;

  return (
    <div className="checkout container py-5">
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
                  {/* Input numero carta */}
                  <div className="col-12 mt-3">
                    <label
                      htmlFor="card_number"
                      className="form-label"
                      style={{ color: "#ffcc00", fontWeight: 600 }}
                    >
                      Numero carta di pagamento
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        background: "#222",
                        color: "#fff",
                        border: "1px solid #ffcc00",
                      }}
                      id="card_number"
                      name="card_number"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={formData.card_number || ""}
                      onChange={handleInputChange}
                      pattern="[0-9 ]{13,19}"
                      required
                    />
                  </div>
                  {/* Selettore circuito carta */}
                  <div className="col-12 mt-3 d-flex gap-3 align-items-center">
                    <span style={{ color: "#ffcc00", fontWeight: 600 }}>
                      Circuito:
                    </span>
                    <div
                      onClick={() =>
                        setFormData({ ...formData, card_circuit: "visa" })
                      }
                      style={{
                        width: 48,
                        height: 48,
                        border:
                          formData.card_circuit === "visa"
                            ? "2px solid #ffcc00"
                            : "2px solid #888",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          formData.card_circuit === "visa" ? "#fffbe6" : "#222",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                        alt="Visa"
                        style={{ width: 32 }}
                      />
                    </div>
                    <div
                      onClick={() =>
                        setFormData({ ...formData, card_circuit: "mastercard" })
                      }
                      style={{
                        width: 48,
                        height: 48,
                        border:
                          formData.card_circuit === "mastercard"
                            ? "2px solid #ffcc00"
                            : "2px solid #888",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          formData.card_circuit === "mastercard"
                            ? "#fffbe6"
                            : "#222",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                        alt="Mastercard"
                        style={{ width: 32 }}
                      />
                    </div>
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
                <label
                  htmlFor="discount_code_name"
                  className="form-label"
                  style={{ color: "#ffcc00", fontWeight: 600 }}
                >
                  Codice Sconto
                </label>
                <div className="input-group d-flex align-items-center">
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
                      border: "1px solid #ffcc00",
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
          <div className="card order-summary">
            <div className="card-body">
              <h3 className="text-center summary-title">Riepilogo ordine</h3>

              {cart.length === 0 ? (
                <div className="alert alert-warning text-center">
                  Il carrello è vuoto.
                </div>
              ) : (
                <ul className="list-group mb-4">
                  {cart.map((item) => (
                    <li
                      key={item.videogame_id}
                      className="list-group-item d-flex justify-content-between align-items-start order-item"
                    >
                      <div className="me-2 flex-grow-1">
                        <div className="fw-semibold item-name">{item.name}</div>
                        <span className="badge quantity-badge">
                          Quantità: x{item.amount}
                        </span>
                      </div>
                      <span className="item-price">
                        € {(item.price * item.amount).toFixed(2)}
                      </span>
                    </li>
                  ))}
                  {totalDiscount > 0 && (
                    <>
                      <li className="list-group-item d-flex justify-content-between discount-item text-danger">
                        <span>Sconto applicato :</span>
                        <span>-€ {itemDiscount.toFixed(2)}</span>
                      </li>
                    </>
                  )}
                  {valueDiscount > 0 ? (
                    <li className="list-group-item d-flex justify-content-between discount-item text-danger">
                      <span>Sconto codice: {formData.discount_code_name}</span>
                      <span>-€ {discountFromCode.toFixed(2)}</span>
                    </li>
                  ) : (
                    <div></div>
                  )}

                  <li className="list-group-item d-flex justify-content-between shipping-item">
                    <span>
                      {shippingCost > 0 ? `Spedizione:` : `Spedizione gratuita`}
                    </span>
                    {shippingCost > 0 && (
                      <span>€ {shippingCost.toFixed(2)}</span>
                    )}
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center total-item">
                    <span>Totale</span>
                    <span className="total-badge">
                      € {totalWithShipping.toFixed(2)}
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
