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
    <>
      <div className="container mt-5">
        <div className="container mt-5">
          <form
            onSubmit={handleFormSubmit}
            className="bg-light p-4 rounded shadow-sm"
          >
            <h2 className="mb-4 text-center">Checkout</h2>
            <div className="mb-3">
              <label htmlFor="customer_name" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="customer_name"
                name="customer_name"
                placeholder="Inserisci il tuo nome"
                value={formData.customer_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customer_surname" className="form-label">
                Cognome
              </label>
              <input
                type="text"
                className="form-control"
                id="customer_surname"
                name="customer_surname"
                placeholder="Inserisci il tuo cognome"
                value={formData.customer_surname}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="shipping_address" className="form-label">
                Indirizzo di spedizione
              </label>
              <input
                type="text"
                className="form-control"
                id="shipping_address"
                name="shipping_address"
                placeholder="Via, numero civico, città"
                value={formData.shipping_address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customer_email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="customer_email"
                name="customer_email"
                placeholder="esempio@email.com"
                value={formData.customer_email}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Invia ordine
            </button>
          </form>

          <form onSubmit={handleValidationDiscount}>
            <div className="mb-3">
              <label htmlFor="shipping_address" className="form-label">
                codice sconto
              </label>
              <input
                type="text"
                className="form-control"
                id="discount_code_name"
                name="discount_code_name"
                placeholder="inserisci codice sconto"
                value={formData.discount_code_name}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-primary">verifica</button>
          </form>

          {/* Riepilogo ordine */}
          <div className="mb-4">
            <h4 className="mb-3">Riepilogo ordine</h4>
            {cart.length === 0 ? (
              <div className="alert alert-warning">Il carrello è vuoto.</div>
            ) : (
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    key={item.videogame_id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.name}{" "}
                      <span className="badge bg-secondary ms-2">
                        x{item.amount}
                      </span>
                    </span>
                    <span>€ {Number(item.price).toFixed(2)}</span>
                  </li>
                ))}
                {totalDiscount > 0 && (
                  <li className="list-group-item d-flex justify-content-between align-items-center text-danger">
                    Sconto applicato: -€ {totalDiscount.toFixed(2)}
                  </li>
                )}
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {shippingCost > 0 ? (
                    <span>Spedizione: € {shippingCost.toFixed(2)}</span>
                  ) : (
                    <span>Spedizione gratuita</span>
                  )}
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                  Totale
                  <span>€{totalWithShipping.toFixed(2)}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
