import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const VideogamesDetail = () => {
    // con slug leggiamo i parametri dinamici della rotta
    const { slug } = useParams();
    const [videogame, setVideogames] = useState(null);
    console.log("Slug ricevuto dall'URL;",slug);

    return (
        <div>
            <h1>Dettaglio videogioco</h1>
        </div>
    );
};

export default VideogamesDetail