import { EventData, UserProfileProps } from "../constants";
import { formatDate } from "../utils/dateFormat";
import { formatLocation } from "../utils/locationFormat";
import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import "../styles/UserProfile.css";

const UserProfile = ({ userName, setLogin, userEvents }: UserProfileProps) => {
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
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    setLogin(false);
  };

  const mapAssociatedEmails = (eventId: number) => {
    const localEventsEmails = JSON.parse(
      localStorage.getItem("eventsEmails") || "{}"
    );

    return Object.keys(localEventsEmails).includes(String(eventId))
      ? localEventsEmails[eventId]
      : null;
  }; // It is TEMPORAL solution, need to move logic to BE, it is not secure!

  return (
    <div className="user-profile-container">
      <h1 className="user-profile-greeting">Hello, {userName} 👋</h1>
      <h2 className="joined-events-title">Events you already have joined: </h2>
      <ul>
        {joinedEvents.map((event) => (
          <li key={event.id}>
            <p>
              {formatLocation(event.location)} - {formatDate(event.date)}{" "}
            </p>

            <span>Event organizer: </span>
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
