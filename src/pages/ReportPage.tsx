import { useForm, SubmitHandler } from "react-hook-form";
import MapComponent from "../components/MapComponent";
import { ReportData } from "../constants";
import { createReport } from "../services/reportService";
import "../styles/Report.css";

const ReportPage = () => {
  const { register, handleSubmit } = useForm<ReportData>();

  const onSubmit: SubmitHandler<ReportData> = async (data) => {
    try {
      if (data.image && data.image.length > 0) {
        const response = await createReport({
          description: data.description,
          coordinates: data.coordinates,
          image: data.image,
        });
        console.log(response);
      }
    } catch (error) {
      console.log("Error occured while submitting report: ", error);
    }

    console.log(data);
  };
  return (
    <div className="report-page-container">
      <section>
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
            <label htmlFor="image">Upload Image:</label>
            <input type="file" id="image" {...register("image")} />
          </div>
          <button type="submit">Submit Report</button>
        </form>
      </section>
      <MapComponent />
    </div>
  );
};

export default ReportPage;
