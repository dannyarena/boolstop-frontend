import { useState } from "react";
import axios from "axios";

export default function FormCheckoutPage() {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const videogames = cart.map((item) => {
    return { videogame_id: item.videogame_id, amount: item.amount };
  });

  console.log("videogames_", videogames);
  console.log("carrello checkout;", cart);

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

    console.log(dataToSend);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="customer_surname"
          value={formData.customer_surname}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="shipping_address"
          value={formData.shipping_address}
          onChange={handleInputChange}
        />

        <input
          type="email"
          name="customer_email"
          value={formData.customer_email}
          onChange={handleInputChange}
        />

        <button> invia </button>
      </form>
    </>
  );
}
