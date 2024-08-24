import "../styles/Event.css";
import { useState } from "react";
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
  setUserEvents
}: EventProps) => {
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<EventData> = async (data) => {
    setLoading(true);
    try {
      const newEvent = await createEvent(data);
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
            placeholder="Max. 50 characters"
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
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
            placeholder="Coordinates or place"
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
