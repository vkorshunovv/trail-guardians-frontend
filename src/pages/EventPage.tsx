import "../styles/Event.css";
import { useState, useEffect } from "react";
import { createEvent } from "../services/eventService";
import { EventData, EventProps } from "../constants";
import { SubmitHandler } from "react-hook-form";
import EventsListPage from "./EventsListPage";

const EventPage = ({
  isRightSidebarOpen,
  events,
  setEvents,
  register,
  handleSubmit,
  reset,
  errors,
  setEventCreated,
  isEventCreated,
  setUserEvents,
  isLogin,
  userEmail,
  setEventsAssociated,
}: EventProps) => {
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<EventData> = async (data) => {
    console.log("User Email", userEmail);

    setLoading(true);
    try {
      const newEvent = await createEvent(data);

      const storedEventsEmails = JSON.parse(
        localStorage.getItem("eventsEmails") || "{}"
      );
      storedEventsEmails[newEvent.id] = userEmail;
      localStorage.setItem("eventsEmails", JSON.stringify(storedEventsEmails));

      setEventsAssociated((prevEventsAssoc) => [
        ...prevEventsAssoc,
        { [newEvent.id]: userEmail },
      ]);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      reset();
      setLoading(false);
      setEventCreated(true);
    } catch (error) {
      console.log("Error occurred while handle create event: ", error);
      setLoading(false);
    }
  };

  return isEventCreated ? (
    <EventsListPage
      events={events}
      setEvents={setEvents}
      isRightSidebarOpen={isRightSidebarOpen}
      setUserEvents={setUserEvents}
      isLogin={isLogin}
    />
  ) : (
    <div
      className={
        isRightSidebarOpen
          ? "form-container event right-sidebar-open"
          : "form-container event"
      }
    >
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            maxLength={50}
            {...register("title", { required: "Title is required" })}
            placeholder="Join me for clean-up trail"
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            id="date"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && <p className="error">{errors.date.message}</p>}
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            maxLength={50}
            {...register("location", { required: "Location is required" })}
            placeholder="e.g., Picos de Europa area"
          />
          {errors.location && (
            <p className="error">{errors.location.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="volunteersNeeded">Volunteers Needed</label>
          <input
            type="number"
            id="volunteersNeeded"
            {...register("volunteersNeeded", {
              required: "Number is required",
            })}
            placeholder="2"
            min={1}
            max={100}
          />
          {errors.volunteersNeeded && (
            <p className="error">{errors.volunteersNeeded.message}</p>
          )}
        </div>
        <div className="button-container ">
          <button type="submit" id="event-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventPage;
