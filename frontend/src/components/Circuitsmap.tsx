import { useEffect, useState } from "react";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "./Circuitsmap.css";
import { fetchCircuits } from "./Coordinates";
import menus from "../assets/menus.png";
import { Link } from "react-router-dom";

function Circuitsmap() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //Definisco l'icona globale per tutti i marker
    const defaultIcon = L.icon({
      iconRetinaUrl: iconRetinaUrl,
      iconUrl: iconUrl,
      shadowUrl: shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });

    //imposto icona default
    L.Marker.prototype.options.icon = defaultIcon;

    //specifico dove trovare le immagini del marker
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });

    //Inizializzo la mappa
    const southWest = L.latLng(44, 7);
    const northEast = L.latLng(48, 12);
    const bounds = L.latLngBounds(southWest, northEast);
    const map = L.map("map", {
      center: [45.6196, 9.2811], //Monza
      zoom: 15,
      minZoom: 2, //livello dove si mostra tutto il mondo
      maxZoom: 10, //livello massimo zoom
      worldCopyJump: true, //evita troppo zoom
      maxBounds: bounds, //mette i limiti
      maxBoundsViscosity: 1.0, //da un tot di rimbalzo
    });

    //Aggiungo layer OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      noWrap: true,
    }).addTo(map);

    //Aggiungo gli altri punti con il marker
    const loadCircuits = async () => {
      const circuits = await fetchCircuits(
        "http://localhost:3000/api/circuits",
      );

      circuits.forEach(
        (circuit: {
          coords: L.LatLngExpression;
          name: any;
          country: any;
          years_active: any;
          length_km: any;
          turns: any;
          active: any;
        }) => {
          L.marker(circuit.coords)
            .addTo(map)
            .bindPopup(
              `
        <div>
          <strong>${circuit.name}</strong><br/>
          <button id="btn-${circuit.name}">
            Dettagli
          </button>
        </div>
      `,
            )
            .on("popupopen", () => {
              document
                .getElementById(`btn-${circuit.name}`)
                ?.addEventListener("click", () => {
                  L.popup()
                    .setLatLng(circuit.coords)
                    .setContent(
                      `
                <div class="popup-details">
                  <h2>${circuit.name}</h2>
                  <p><strong>Nazione:</strong> ${circuit.country}</p>
                  <p><strong>Anni attivo:</strong> ${circuit.years_active}</p>
                  <p><strong>Lunghezza:</strong> ${circuit.length_km} km</p>
                  <p><strong>Curve:</strong> ${circuit.turns}</p>
                  <p><strong>Attivo:</strong> ${
                    circuit.active ? "Sì" : "No"
                  }</p>
                </div>
              `,
                    )
                    .openOn(map);
                });
            });
        },
      );
    };

    loadCircuits();

    //Cleanup della mappa quando il componente viene smontato
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div className="title">
        <h3 className="f1">MAPPA</h3>
        <button className="menu" onClick={() => setOpen(!open)}>
          <img src={menus} className="iconMenu"></img>
        </button>
        {open && (
          <ul className="menuTendina">
            <Link to="/">
              <li className="voci">Home</li>
            </Link>
            <Link to="/Calendar">
              <li className="voci">Piloti</li>
            </Link>
            <Link to="/Circuitsmap">
              <li className="voci">Mappa</li>
            </Link>
          </ul>
        )}
      </div>
      <div id="map"></div>
    </>
  );
}

export default Circuitsmap;
