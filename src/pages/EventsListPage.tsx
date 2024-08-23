import { useEffect } from "react";
import { deleteEvent, getEvents, joinEvent } from "../services/eventService";
import { formatDate } from "../utils/dateFormat";
import { EventsListProps } from "../constants";

const EventsListPage = ({
  events,
  setEvents,
  isRightSidebarOpen,
}: EventsListProps) => {
  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  const handleJoinEvent = async (id: number) => {
    try {
      const updatedEvent = await joinEvent(id);
      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    } catch (error) {
      console.log(`Error occurred while joining to event`, error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.log("Error occurred while handle delete event ", error);
    }
  };

  return (
    <div
      className={
        isRightSidebarOpen
          ? "form-container events-list right-sidebar-open"
          : "form-container events-list"
      }
    >
      <h1>Upcoming Events</h1>
      <div className="list-container">
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>👉 {event.title}</h3>
              {/* <p>{event.description}</p> */}
              <p>📆 {formatDate(event.date)}</p>
              <p>📍 {event.location}</p>
              <p>🪵 Volunteers Needed: <span>{event.volunteersNeeded}</span></p>
              <p>💪 Volunteers Joined: <span>{event.volunteersSignedUp}</span></p>
              <div className="button-container">
                <button
                  onClick={() => handleJoinEvent(event.id)}
                  className="join-btn"
                >
                  Join
                </button>
              </div>
              {/* <button onClick={() => setSelectedEvent(event)}>Edit</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button> */}
            </li>
          ))}
        </ul>{" "}
      </div>
    </div>
  );
};

export default EventsListPage;
