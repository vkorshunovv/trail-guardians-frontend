import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import MapComponent from "../components/MapComponent";
import { ReportData } from "../constants";
import { createReport } from "../services/reportService";
import "../styles/Report.css";

const ReportPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReportData>();
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<ReportData> = async (data) => {
    setIsLoading(true);
    try {
      console.log("Submitting report:", data);
      if (data.image && data.image.length > 0) {
        const response = await createReport({
          description: data.description,
          coordinates: data.coordinates,
          image: data.image,
        });
        console.log("Report submitted successfully:", response);
        setReports((prevReports) => [...prevReports, response]);
        reset();
      }
    } catch (error) {
      console.log(
        "Error occurred while submitting report: ",
        (error as Error).message
      );
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <div className="report-page-container">
      <section>
        <h1>Report a Trail Area</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            {/* TODO description length limit */}
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Details about the trail issue"
            />
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="coordinates">GPS coordinates:</label>
            <input
              type="text"
              id="coordinates"
              {...register("coordinates", {
                required: "GPS coordinates is required",
              })}
              placeholder="Tap on the map"
            />
            {errors.coordinates && (
              <p className="error">{errors.coordinates.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              {...register("image", { required: "Image is required" })}
              accept="image/*"
            />
            {errors.image && <p className="error">{errors.image.message}</p>}
          </div>
          <button type="submit">
            {isLoading ? "Loading..." : "Submit Report"}
          </button>
        </form>
      </section>
      <MapComponent
        reports={reports}
        setReports={setReports}
        setValue={setValue}
      />
    </div>
  );
};

export default ReportPage;
