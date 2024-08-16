import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  joinEvent,
} from "../services/eventService";
import { formatDate } from "../utils/dateFormat";
import "../styles/Event.css";
import { EventData } from "../constants";
import { SubmitHandler } from "react-hook-form";
// import MapComponent from "../components/MapComponent";

const EventPage = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  const handleCreateEvent: SubmitHandler<EventData> = async (data) => {
    try {
      const newEvent = await createEvent(data);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (error) {
      console.log("Error occurred while handle create event: ", error);
    }
  };

  const handleUpdateEvent: SubmitHandler<EventData> = async (data) => {
    try {
      if (selectedEvent) {
        const updatedEvent = await updateEvent(selectedEvent.id, data);
        setEvents(
          events.map((event) =>
            event.id === selectedEvent.id ? updatedEvent : event
          )
        );
        setSelectedEvent(null);
      }
    } catch (error) {
      console.log("Error occurred while handle update event ", error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.log("Error occured while handle delete event ", error);
    }
  };

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

  return (
    <section className="events-container">
      <div className="event-create-container">
        <h1>Manage Events</h1>
        <EventForm
          onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}
        />
        <h2>Upcoming Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{formatDate(event.date)}</p>
              <p>{event.location}</p>
              <p>Volunteers Needed: {event.volunteersNeeded}</p>
              <p>Volunteers Signed Up: {event.volunteersSignedUp}</p>
              <button onClick={() => handleJoinEvent(event.id!)}>Join</button>
              <button onClick={() => setSelectedEvent(event)}>Edit</button>
              <button onClick={() => handleDeleteEvent(event.id!)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* <MapComponent /> */}
    </section>
  );
};

export default EventPage;
