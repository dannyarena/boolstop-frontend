import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VideogamesDetail = () => {
    // con slug leggiamo i parametri dinamici della rotta
    const { slug } = useParams();
    const [videogame, setVideogame] = useState(null);
    console.log("Slug ricevuto dall'URL;",slug);

    useEffect(() => {
        fetch(`http://localhost:3000/videogames/slug/${slug}`)
        .then(res => res.json())
        .then(data => {
            setVideogame(data);
        })
        .catch(err => {
            console.error("Errore nella ricezione dei dati", err);
        });
    }, [slug]);

    if(!videogame) return <p>Caricamento...</p>;

    const addToCart = () => {
        const ItemToAdd = {
            id: videogame.id,
            name: videogame.name,
            price: videogame.original_price,
            image: videogame.image,
            quantity: 1
        };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.id === ItemToAdd.id);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity +=1;
        } else {
            cart.push(ItemToAdd);
        }
    }

    return (
        <div className="container py-5">
            <h1>{videogame.name}</h1>
            <img
                src={`/img/${videogame.image}`}
                alt={videogame.name}
                className="img-fluid my-3"
                style={{ maxWidth: "400px" }}
                />
                <p>{videogame.description}</p>
                <p><strong>Prezzo:</strong>{videogame.original_price}</p>
                <p><strong>Piattaforma:</strong>{videogame.platform}</p>
                <p><strong>PEGI:</strong>{videogame.pegi}</p>
        </div>
    );
};

export default VideogamesDetail