import { useEffect } from "react";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "./Circuitsmap.css";
import { fetchCircuits } from "./Coordinates";

function Circuitsmap() {
  useEffect(() => {
    // Specifica dove trovare le immagini del marker
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });

    // Inizializza la mappa
    const map = L.map("map").setView([45.6196, 9.2811], 15); // Monza

    // Aggiungi layer OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      noWrap: true,
    }).addTo(map);

    // Aggiungo gli altri punti con il marker
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
