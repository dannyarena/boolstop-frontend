import React from "react";
import { useEffect, useState } from "react";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

     // reduce scorre ogni item del carrello e accumula il risultato
    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.original_price * item.quantity;
    }, 0)

    return (
        <div className="container py-4">
            <h2>Il tuo carrello</h2>

            {cartItems === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <div className="row">
                    {cartItems.map((item) => {
                        <div className="col-md-4 mb-3" key={item.id}>
                            <div className="card">
                                <img src={`/img/${item.image}`}
                                alt={item.name}
                                className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Prezzo: € {item.original_price}</p>
                                    <p className="card-text">Quantità: {item.quantity}</p>
                                </div>
                                <div className="mt-4">
                                    {/* tofixed 2 serve per mostrare due decimali (es. 123.50) */}
                                    <h4>Totale carrello: € {totalPrice.toFixed(2)}</h4>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            )}
        </div>
    );
};

export default CartPage;