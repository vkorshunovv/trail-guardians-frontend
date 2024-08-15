import { useForm } from "react-hook-form";

const EventForm = ({ onSubmit, initialData }) => {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          {...register("title", { required: true })}
          //TODO error validation
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          {...register("description", { required: true })}
          //TODO error validation
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="datetime-local"
          id="date"
          {...register("date", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          {...register("location", { required: true })}
          placeholder="Coordinates or place"
        />
      </div>
      <div>
        <label htmlFor="volunteersNeeded">Volunteers Needed:</label>
        <input
          type="number"
          id="volunteersNeeded"
          {...register("volunteersNeeded", { required: true })}
          placeholder="2"
          min={1}
          max={100}
        />
      </div>
      <button type="submit">Save Event</button>
    </form>
  );
};

export default EventForm;
