import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

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

    return (
        <div>
            <h1>Dettaglio videogioco</h1>
        </div>
    );
};

export default VideogamesDetail