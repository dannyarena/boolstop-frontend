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
                            </div>
                        </div>
                    })}
                </div>
            )}
        </div>
    );
};

export default CartPage;