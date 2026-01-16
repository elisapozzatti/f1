import { useEffect } from "react";
import L from "leaflet";
import "./Circuitsmap.css";
import { circuits } from "./Coordinates";

function Circuitsmap() {
  useEffect(() => {
    // Inizializza la mappa
    const map = L.map("map").setView([45.6196, 9.2811], 15); // Monza

    // Aggiungi layer OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      noWrap: true,
    }).addTo(map);

    // Aggiungi marker
    L.marker([45.6196, 9.2811])
      .addTo(map)
      .bindPopup("Autodromo Nazionale Monza")
      .openPopup();

    // Aggiungo gli altri punti con il marker
    circuits.forEach((circuit) => {
      L.marker(circuit.coords).addTo(map).bindPopup(circuit.name);
    });

    // Cleanup della mappa quando il componente viene smontato
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div className="title">
        <h3>MAPPA CON TUTTI I CIRCUITI DI F1</h3>
      </div>
      <div id="map"></div>
    </>
  );
}

export default Circuitsmap;
