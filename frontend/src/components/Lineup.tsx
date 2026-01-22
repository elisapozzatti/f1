import "./Lineup.css";
import { useEffect, useState } from "react";
import { fetchAllOrCurrentDrivers, fetchNameTeams } from "./helper/chiamataApi";
/* import TableLineUp from "./TableLineUp";
 */ import CardsLineUp from "./CardsLineUp";

function Lineup() {
  const [drivers, setDrivers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setCheckedAll(false); // Se selezioni "Attualmente in F1", deseleziona "Tutti"
    }
  };
  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedAll(event.target.checked);
    if (event.target.checked) {
      setChecked(false); // Se selezioni "Tutti i piloti", deseleziona "Attualmente in F1"
    }
  };

  const [teams, setTeams] = useState<{ name: string }[]>([]);

  const [selectedTeam, setSelectedTeam] = useState("");

  const [selectedWorlds, setselectedWorlds] = useState("");

  const [selectedWins, setselectedWins] = useState("");

  useEffect(() => {
    let url = checked
      ? "http://localhost:3000/api/drivers/now"
      : "http://localhost:3000/api/drivers";
    if (checkedAll) {
      url = checkedAll
        ? "http://localhost:3000/api/drivers"
        : "http://localhost:3000/api/drivers/now";
    }
    if (!selectedTeam && !selectedWorlds && !selectedWins) {
    } else if (selectedTeam) {
      url = `http://localhost:3000/api/teams/teamdrivers?team=${encodeURIComponent(
        selectedTeam,
      )}`;
    } else if (selectedWorlds) {
      url = `http://localhost:3000/api/drivers/worldtitles?world_titles=${encodeURIComponent(
        selectedWorlds,
      )}`;
    } else if (selectedWins) {
      url = `http://localhost:3000/api/drivers/wins?career_wins=${encodeURIComponent(
        selectedWins,
      )}`;
    }
    fetchAllOrCurrentDrivers(url).then(setDrivers);
  }, [checked, checkedAll, selectedTeam, selectedWorlds, selectedWins]);

  useEffect(() => {
    const url = "http://localhost:3000/api/teams/name";
    fetchNameTeams(url).then(setTeams);
  }, []);

  return (
    <>
      <div className="title">
        <h3>PILOTI</h3>
      </div>
      <div className="filter-container">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={checkedAll}
            onChange={handleChangeAll}
          />
          Tutti i piloti
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={checked} onChange={handleChange} />
          Attualmente in F1
        </label>
        <p className="wc-title">Campionati del mondo</p>
        <label>
          <select
            className="world-champions"
            value={selectedWorlds}
            onChange={(e) => {
              setselectedWorlds(e.target.value);
              setSelectedTeam("");
              setselectedWins("");
            }}
          >
            <option value="0">0</option>
            <option value="1">Più di 1</option>
            <option value="3">Più di 3</option>
            <option value="5">Più di 5</option>
            <option value="max">Il numero più alto</option>
          </select>
        </label>
        <p className="wc-title">Vittorie</p>
        <label>
          <select
            className="world-champions"
            value={selectedWins}
            onChange={(e) => {
              setselectedWins(e.target.value);
              setSelectedTeam("");
              setselectedWorlds("");
            }}
          >
            <option value="1">1</option>
            <option value="10">Più di 10</option>
            <option value="50">Più di 50</option>
            <option value="max">Il numero più alto</option>
          </select>
        </label>
        <p className="wc-title">Scuderie</p>
        <select
          className="world-champions"
          value={selectedTeam}
          onChange={(e) => {
            setSelectedTeam(e.target.value);
            setselectedWorlds("");
            setselectedWins("");
          }}
        >
          <option value="">Tutte le scuderie</option>
          {teams.map((team, index) => (
            <option className="teams" key={index} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      {/*       <TableLineUp drivers={drivers} />
       */}{" "}
      <CardsLineUp drivers={drivers} />
    </>
  );
}

export default Lineup;
