import { useNavigate } from "react-router";

export default function OrderRecapPage() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const order = JSON.parse(localStorage.getItem("order")) || {};
  return (
    <>
      <div className="container bg-light bg-gradient py-5 rounded-5 shadow-lg d-flex align-items-center justify-content-center flex-column">
        <h2>Ordine inviato</h2>
        <p>name: {order.name}</p>
        <p>surname: {order.surname}</p>
        <p>email: {order.email}</p>
        <p>Data: {new Date(order.date).toLocaleDateString()}</p>
        <p>Numero d'ordine: {order.orderNumber}</p>
        <p>Videogiochi ordinati:</p>
        <ul>
          <p>Indirizzo di spedizione: {order.shippingAddress}</p>
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} - € {item.price.toFixed(2)}
            </li>
          ))}
        </ul>

        <p>Totale: € {order.totalPrice}</p>
        {/* <p>Metodo di pagamento: {order.paymentMethod}</p> */}
        <p className="mt-3 fs-5">
          Grazie per il tuo acquisto! Il tuo ordine è stato elaborato con
          successo.
        </p>

        <p className="mt-3 fs-5 d-flex align-items-center gap-2">
          Torna alla Home{" "}
          <button
            onClick={() => navigate("/")}
            className="text-primary cursor-pointer btn btn-warning fs-5 fw-bold border-0 "
          >
            <i className="bi bi-house fs-3"></i>
          </button>
        </p>
      </div>
    </>
  );
}
