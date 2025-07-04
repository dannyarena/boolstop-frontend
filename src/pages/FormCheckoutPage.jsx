import { useState } from "react";
import axios from "axios";

export default function FormCheckoutPage() {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const videogames = cart.map((item) => {
    return { videogame_id: item.videogame_id, amount: item.amount };
  });

  const initialFormData = {
    customer_name: "",
    customer_surname: "",
    shipping_address: "",
    customer_email: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, videogames };

    axios
      .post("http://localhost:3000/orders/addOrder", dataToSend)
      .then((res) => console.log(res));

    localStorage.clear();
    setFormData(initialFormData);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

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
                <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                  Totale
                  <span>€ {totalPrice.toFixed(2)}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
