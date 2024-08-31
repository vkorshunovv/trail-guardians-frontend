import { EventData, UserProfileProps } from "../constants";
import { formatDate } from "../utils/dateFormat";
import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";

const UserProfile = ({
  userName,
  setLogin,
  userEvents,
  eventsAssociated,
}: UserProfileProps) => {
  const [joinedEvents, setJoinedEvents] = useState<any[]>([]);

  useEffect(() => {
    console.log("UserProfile userEvents prop updated:", userEvents);
  }, [userEvents]);

  useEffect(() => {
    const fetchAndFilterEvents = async () => {
      try {
        console.log("userEvents: ", userEvents);

        const joinedEventsLocal = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        const fetchedEvents = await getEvents();
        const userEventIds = joinedEventsLocal.joinedEvents.flat();
        console.log("User event IDs after flattening: ", userEventIds);

        const filteredEvents = fetchedEvents.filter((event: EventData) =>
          userEventIds.includes(event.id)
        );
        console.log("Filtered events: ", filteredEvents);

        setJoinedEvents(filteredEvents);
      } catch (error) {
        console.log("Error etching events: ", error);
      }
    };
    fetchAndFilterEvents();
  }, [userEvents]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setLogin(false);
  };

  const mapAssociatedEmails = (eventId) => {
    const localEventsEmails = JSON.parse(
      localStorage.getItem("eventsEmails") || "{}"
    );

    return Object.keys(localEventsEmails).includes(String(eventId))
      ? localEventsEmails[eventId]
      : null;
  };

  return (
    <div>
      <p>Hello, {userName} 👋</p>
      <p>Your current level : 'Volunteer'</p>
      <p>Events you already have joined: </p>
      <ul>
        {joinedEvents.map((event) => (
          <li key={event.id}>
            {event.location} - {formatDate(event.date)} <br />
            <p>Send a message to event creator: </p>
            <span>{mapAssociatedEmails(event.id)}</span>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button onClick={handleLogOut} className="logout-btn">
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
