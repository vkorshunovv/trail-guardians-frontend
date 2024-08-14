import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
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

  return <div>EventPage</div>;
};

export default EventPage;
