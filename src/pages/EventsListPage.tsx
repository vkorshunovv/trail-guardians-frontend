import { useEffect, useState } from "react";
import { getEvents, joinEvent } from "../services/eventService";
import { formatDate } from "../utils/dateFormat";
import { EventsListProps } from "../constants";

const EventsListPage = ({
  events,
  setEvents,
  isRightSidebarOpen,
  setUserEvents,
  isLogin,
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

  const handleJoinEvent = async (eventId: number) => {
    try {
      if (isLogin) {
        setLoadingStates((prev) => ({ ...prev, [eventId]: true }));

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const response = await joinEvent(user.id, eventId);
        console.log("Joined Events from API: ", response);

        setUserEvents(response);
        setJoinedStates((prev) => ({ ...prev, [eventId]: true }));
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId
              ? { ...event, volunteersSignedUp: event.volunteersSignedUp! + 1 }
              : event
          )
        );

        setLoadingStates((prev) => ({ ...prev, [eventId]: false }));
      } else {
        throw new Error("Please, log in to your account before joining events");
        //TODO popup
      }
    } catch (error) {
      console.error("Error occurred while joining the event", error);
      setLoadingStates((prev) => ({ ...prev, [eventId]: false }));
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
          {events.map((event) => {
            const isVolunteersEnough =
              event.volunteersSignedUp === event.volunteersNeeded;
            return (
              <li
                key={event.id}
                className={isVolunteersEnough ? "inactive" : ""}
              >
                <h3>
                  <span style={{ color: "rgb(112 169 119)" }}>#{event.id}</span>{" "}
                  "{event.title}"
                </h3>
                {/* <p>{event.description}</p> */}
                <p>📆 {formatDate(event.date)}</p>
                <p>📍 {event.location}</p>{" "}
                {/* allow only place, NOT coordinates */}
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
                    disabled={
                      loadingStates[event.id] ||
                      joinedStates[event.id] ||
                      isVolunteersEnough
                    }
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
            );
          })}
        </ul>{" "}
      </div>
    </div>
  );
};

export default EventsListPage;
