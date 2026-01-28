import "./Homepage.css";
import { Link } from "react-router-dom";
import copertinadrivers from "./assets/copertina-drivers.png";
import copertinacalendar from "./assets/copertina-calendar.png";
import menus from "./assets/menus.png";
import mappa from "./assets/mappa.png";
import { useState } from "react";
import { Cars } from "./components/props/Cars";

function Homepage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="title">
        <p className="f1">FORMULA UNO</p>
        <button className="menu" onClick={() => setOpen(!open)}>
          <img src={menus} className="iconMenu"></img>
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
        <Cars image="ferraricar" logo="ferrari" name="Ferrari"></Cars>
      </div>
      <div className="componentsContainer">
        <div className="divLineUp">
          <Link to="/Lineup">
            <img src={copertinadrivers} className="copDrivers" />
            <p className="lineup">PILOTI</p>
          </Link>
        </div>
        <div className="divLineUp">
          <Link to="/Calendar">
            <img src={copertinacalendar} className="copDrivers" />
            <p className="lineup">CALENDARIO</p>
          </Link>
        </div>
        <div className="divLineUp">
          <Link to="/Circuitsmap">
            <img src={mappa} className="copDrivers" />
            <p className="lineup">MAPPA</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Homepage;
