import { useForm, SubmitHandler } from "react-hook-form";
import { FormValues } from "../constants";
import "../styles/EventCreation.css";

const EventCreationPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="event-create-container">
      <h1>Create an Clean-Up Event</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            {...register("eventName", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            {...register("time", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            {...register("location", { required: true })}
            placeholder="Madrid"
          />
        </div>
        <div>
          <label htmlFor="volunteersCount">Number of Volunteers Needed:</label>
          <input
            type="number"
            id="volunteersCount"
            {...register("volunteersCount", { required: true })}
            placeholder="2"
            min={2}
            max={100}
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventCreationPage;
