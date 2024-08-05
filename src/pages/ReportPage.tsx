import { useForm, SubmitHandler } from "react-hook-form";
import MapComponent from "../components/MapComponent";
import { FormValues } from "../constants";

const ReportPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Report a Trail Area</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            {...register("description", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="coordinates">GPS coordinates:</label>
          <input
            type="text"
            id="coordinates"
            {...register("coordinates", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="uploadImage">Upload Image:</label>
          <input type="file" id="uploadImage" {...register("uploadImage")} />
        </div>
        <button type="submit">Submit Report</button>
      </form>
      <MapComponent />
    </div>
  );
};

export default ReportPage;
