import "./Homepage.css";
import { Link } from "react-router-dom";
import copertinadrivers from "./assets/copertina-drivers.png";
import copertinacalendar from "./assets/copertina-calendar.png";
import mappa from "./assets/mappa.png";

function Homepage() {
  return (
    <>
      <div className="title">
        <p className="f1">FORMULA 1</p>
      </div>
      <div className="componentsContainer">
        <div className="divLineUp">
          <Link to="/Lineup">
            <img src={copertinadrivers} className="copDrivers" />
            <p className="lineup">LINE UP</p>
          </Link>
        </div>
        <div className="divLineUp">
          <Link to="/Calendar">
            <img src={copertinacalendar} className="copDrivers" />
            <p className="lineup">CALENDAR</p>
          </Link>
        </div>
        <div className="divLineUp">
          <Link to="/Circuitsmap">
            <img src={mappa} className="copDrivers" />
            <p className="lineup">CIRCUITS MAP</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Homepage;
