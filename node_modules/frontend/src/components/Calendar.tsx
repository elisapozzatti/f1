import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";

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
  return (
    <>
      <div className="title">
        <h3>CALENDARIO</h3>
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
