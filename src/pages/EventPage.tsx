import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  joinEvent,
} from "../services/eventService";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async (data) => {
    try {
      const newEvent = await createEvent(data);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (error) {
      console.log("Error occurred while handle create event ", error);
    }
  };

  const handleUpdateEvent = async (data) => {
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

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.log("Error occured while handle delete event ", error);
    }
  };

  const handleJoinEvent = async (id) => {
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
    <div>
      <h1>Manage Events</h1>
      <EventForm
        onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}
        initialData={selectedEvent}
      />
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>Volunteers Needed: {event.volunteersNeeded}</p>
            <button onClick={() => handleJoinEvent(event.id)}>Join</button>
            <button onClick={() => setSelectedEvent(event)}>Edit</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventPage;
