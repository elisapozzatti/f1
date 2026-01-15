import "./App.css";
import Homepage from "./Homepage";
import Lineup from "./components/Lineup";
import CalendarPage from "./components/Calendar";
import Circuitsmap from "./components/Circuitsmap";
import { Routes, Route } from "react-router-dom";

function App() {
  /* useEffect(() => {
    async function load() {
      const response = await fetch("http://localhost:3000");
      const text = await response.text();
      console.log(text);
    }

    load();
  }, []); */
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/lineup" element={<Lineup />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/circuitsmap" element={<Circuitsmap />} />
      </Routes>
    </>
  );
}

export default App;
