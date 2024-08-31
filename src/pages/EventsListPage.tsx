import { useEffect, useState } from "react";
import { getEvents, joinEvent } from "../services/eventService";
import { formatDate } from "../utils/dateFormat";
import { EventData, EventsListProps } from "../constants";

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
      const sortedEvents = fetchedEvents.sort(
        (a: EventData, b: EventData) => b.id - a.id
      );
      setEvents(sortedEvents);

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.joinedEvents) {
        const initialJoinedStates = user.joinedEvents.reduce(
          (acc: { [key: number]: boolean }, eventId: number) => {
            acc[eventId] = true;
            return acc;
          },
          {}
        );
        setJoinedStates(initialJoinedStates);
      }
    };
    fetchEvents();
  }, [setEvents]);

  const handleJoinEvent = async (eventId: number) => {
    try {
      if (isLogin) {
        setLoadingStates((prev) => ({ ...prev, [eventId]: true }));

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const { joinedEvents, updatedEvent } = await joinEvent(
          user.id,
          eventId
        );

        if (joinedEvents && updatedEvent) {
          console.log("Joined Events from API: ", joinedEvents);
          console.log("Updated event from API: ", updatedEvent);

          setUserEvents(joinedEvents);

          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event
            )
          );

          setJoinedStates((prev) => ({ ...prev, [eventId]: true }));
        } else {
          console.warn("Unexpected API response: ", {
            joinedEvents,
            updatedEvent,
          });
        }

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
              </li>
            );
          })}
        </ul>{" "}
      </div>
    </div>
  );
};

export default EventsListPage;
