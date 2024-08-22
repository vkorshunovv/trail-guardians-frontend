import { useForm } from "react-hook-form";
import { useState } from "react";
import { EventData, EventFormProps } from "../constants";

const EventForm = ({ onSubmit }: EventFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventData>({});
  const [loading, setLoading] = useState<string>("Create Event");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onClickBtnHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsDisabled(true);
    setLoading("Event Added");
    setTimeout(() => {
      reset();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Max. 50 characters"
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>
      {/* <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          {...register("description", { required: true })}
          //TODO error validation
        />
      </div> */}
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
          {...register("location", { required: "Location is required" })}
          placeholder="Coordinates or place"
        />
        {errors.location && <p className="error">{errors.location.message}</p>}
      </div>
      <div>
        <label htmlFor="volunteersNeeded">Volunteers Needed</label>
        <input
          type="number"
          id="volunteersNeeded"
          {...register("volunteersNeeded", { required: "Number is required" })}
          placeholder="2"
          min={1}
          max={100}
        />
        {errors.volunteersNeeded && (
          <p className="error">{errors.volunteersNeeded.message}</p>
        )}
      </div>
      <div className="button-container ">
        <button
          type="submit"
          id="events-button"
          onClick={(e) => onClickBtnHandle(e)}
          disabled={isDisabled}
        >
          {loading}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
