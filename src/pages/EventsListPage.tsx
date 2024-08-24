import { useEffect, useState } from "react";
import { deleteEvent, getEvents, joinEvent } from "../services/eventService";
import { formatDate } from "../utils/dateFormat";
import { EventsListProps } from "../constants";

const EventsListPage = ({
  events,
  setEvents,
  isRightSidebarOpen,
  setUserEvents,
}: EventsListProps) => {
  const [loadingStates, setLoadingStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [joinedStates, setJoinedStates] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents.reverse());
    };
    fetchEvents();
  }, []);

  const handleJoinEvent = async (id: number) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      const joinedEvent = await joinEvent(id);
      setUserEvents((prevEvent) => [...prevEvent, joinedEvent]);

      setEvents((prevEvent) =>
        prevEvent.map((event) =>
          event.id === joinedEvent.id
            ? { ...event, volunteersSignedUp: event.volunteersSignedUp! + 1 }
            : event
        )
      );

      setLoadingStates((prev) => ({ ...prev, [id]: false }));
      setJoinedStates((prev) => ({ ...prev, [id]: true }));
    } catch (error) {
      console.log(`Error occurred while joining the event`, error);
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
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
            <li
              key={event.id}
              className={
                event.volunteersSignedUp === event.volunteersNeeded
                  ? "inactive"
                  : ""
              }
            >
              <h3>👉 {event.title}</h3>
              {/* <p>{event.description}</p> */}
              <p>📆 {formatDate(event.date)}</p>
              <p>📍 {event.location}</p>
              <p>
                🪵 Volunteers Needed: <span>{event.volunteersNeeded}</span>
              </p>
              <p>
                💪 Volunteers Joined: <span>{event.volunteersSignedUp}</span>
              </p>
              <div className="button-container">
                <button
                  onClick={() => handleJoinEvent(event.id)}
                  className="join-btn"
                  disabled={loadingStates[event.id] || joinedStates[event.id]}
                >
                  {joinedStates[event.id]
                    ? "Joined 🤙"
                    : loadingStates[event.id]
                    ? "Loading..."
                    : "Join"}
                </button>
              </div>

              {/* { isSelectedEvent &&
                <>
                  
                  <button onClick={() => setSelectedEvent(event.id)}>Edit</button>
                  <button onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </button>
                </>
              } */}
            </li>
          ))}
        </ul>{" "}
      </div>
    </div>
  );
};

export default EventsListPage;
