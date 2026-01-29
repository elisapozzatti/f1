import "./Homepage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Cars } from "./components/props/Cars";

function Homepage() {
  const [open, setOpen] = useState(false);

  const modules = import.meta.glob("./assets/*.{png,jpg,webp}", {
    eager: true,
  }); //importa tutte le immagini in assets con chiave il path e default url come valore

  const Images: Record<string, string> = Object.fromEntries(
    Object.entries(modules).map(([path, module]: any) => {
      const name = path.split("/").pop()!.split(".")[0]; //estrae solo il nome del file e non la stringa intera dell'url
      return [name, module.default]; //mappa a url
    }),
  );

  return (
    <>
      <div className="title">
        <p className="f1">FORMULA UNO</p>
        <button className="menu" onClick={() => setOpen(!open)}>
          <img src={Images["menus"]} className="iconMenu"></img>
        </button>
        {open && (
          <ul className="menuTendina">
            <Link to="/Lineup">
              <li className="voci">Piloti</li>
            </Link>
            <Link to="/Calendar">
              <li className="voci">Calendario</li>
            </Link>
            <Link to="/Circuitsmap">
              <li className="voci">Mappa</li>
            </Link>
          </ul>
        )}
      </div>
      <div className="containerCars">
        <Cars
          image={Images["ferraricar"]}
          logo={Images["ferrari"]}
          name="Ferrari"
        ></Cars>
        <Cars
          image={Images["mercedescar"]}
          logo={Images["mercedes"]}
          name="Merceds"
        ></Cars>
        <Cars
          image={Images["cadillaccar"]}
          logo={Images["cadillac"]}
          name="Cadillac"
        ></Cars>
        <Cars
          image={Images["astonmartincar"]}
          logo={Images["astonmartin"]}
          name="Aston Martin"
        ></Cars>
        <Cars
          image={Images["audicar"]}
          logo={Images["audi"]}
          name="Audi"
        ></Cars>
        <Cars
          image={Images["haascar"]}
          logo={Images["haas"]}
          name="Haas"
        ></Cars>
        <Cars
          image={Images["mclarencar"]}
          logo={Images["mclaren"]}
          name="McLaren"
        ></Cars>
        <Cars
          image={Images["racingbullscar"]}
          logo={Images["racingbulls"]}
          name="Racing Bulls"
        ></Cars>
        <Cars
          image={Images["redbullcar"]}
          logo={Images["redbull"]}
          name="Red Bull"
        ></Cars>
        <Cars
          image={Images["williamscar"]}
          logo={Images["williams"]}
          name="Williams"
        ></Cars>
        <Cars
          image={Images["alpinecar"]}
          logo={Images["alpine"]}
          name="Alpine"
        ></Cars>
      </div>
      <div className="componentsContainer">
        <div className="divLineUp">
          <Link to="/Lineup">
            <img src={Images["copertina-drivers"]} className="copDrivers" />
            <p className="lineup">PILOTI</p>
          </Link>
        </div>
        <div className="divLineUp">
          <Link to="/Calendar">
            <img src={Images["copertina-calendar"]} className="copDrivers" />
            <p className="lineup">CALENDARIO</p>
          </Link>
        </div>
        <div className="divLineUp">
          <Link to="/Circuitsmap">
            <img src={Images["mappa"]} className="copDrivers" />
            <p className="lineup">MAPPA</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Homepage;
