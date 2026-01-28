import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import { useState } from "react";
import menus from "../assets/menus.png";
import { Link } from "react-router-dom";

interface GoogleCalendarEvent {
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
}

function CalendarPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="title">
        <h3 className="f1">CALENDARIO</h3>
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
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={async (_fetchInfo, successCallback, failureCallback) => {
            try {
              const res = await fetch(
                "http://localhost:3000/api/calendar/events",
              );
              const data = await res.json();

              // Trasforma gli eventi Google Calendar in formato FullCalendar
              const events = Array.isArray(data) ? data : [];

              const formattedEvents = events.map((event) => ({
                title: event.summary,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date,
              }));

              successCallback(formattedEvents);
            } catch (err: any) {
              failureCallback(err);
            }
          }}
        />
      </div>
    </>
  );
}

export default CalendarPage;
