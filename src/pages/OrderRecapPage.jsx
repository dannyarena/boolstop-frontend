import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
export default function OrderRecapPage() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const order = JSON.parse(localStorage.getItem("order")) || {};

  useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.removeItem("order");
  }, []);

  const shippingCost = order.discountedPrice <= 100 ? 4.99 : 0;
  const totalPrice = order.discountedPrice + shippingCost;
  return (
    <>
      <div className="container bg-light bg-gradient py-5 rounded-5 shadow-lg d-flex align-items-center justify-content-center flex-column">
        <h2>
          Ordine inviato <i className="bi bi-check2-all text-success fs-1"></i>
        </h2>
        <div className="row">
          <div className="col-6">
            <h4 className="fw-bold fs-4">I TUOI DATI</h4>
            <p>
              Name : <span className="fw-bold">{order.name}</span>
            </p>
            <p>
              Surname : <span className="fw-bold">{order.surname}</span>
            </p>
            <p>
              Email : <span className="fw-bold">{order.email}</span>
            </p>
            <p>
              Indirizzo di spedizione :{" "}
              <span className="fw-bold">{order.shippingAddress}</span>
            </p>
          </div>
          <div className="col-6">
            <h4 className="fw-bold fs-4">IL TUO ORDINE</h4>
            <p>
              Data :{" "}
              <span className="fw-bold">
                {new Date(order.date).toLocaleDateString()}
              </span>
            </p>
            <p>
              Numero d'ordine :{" "}
              <span className="fw-bold">{order.orderNumber}</span>
            </p>
            <p>Videogiochi ordinati :</p>
            <ul>
              {cart.map((item, index) => (
                <li className="fw-bold" key={index}>
                  {item.name} x{item.amount} - € {Number(item.price).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p>
            costo di spedizione:{" "}
            <span className="fw-bold">€ {shippingCost}</span>
          </p>
          {/* <p>Metodo di pagamento: {order.paymentMethod}</p> */}
          <p className="mt-3 fs-5">
            Totale: <span className="fw-bold">€ {totalPrice.toFixed(2)}</span>
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mt-3 fs-5">
            Grazie per il tuo acquisto! Controlla la tua email per tutti i
            dettagli.{" "}
          </p>
          <Link
            to={"mailto:"}
            className="bi bi-envelope-check-fill text-primary fs-1 "
          ></Link>
        </div>

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
