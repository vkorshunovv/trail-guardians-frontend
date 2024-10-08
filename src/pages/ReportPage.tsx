import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { ReportData, ReportProps } from "../constants";
import { createReport } from "../services/reportService";
import "../styles/Report.css";

const ReportPage = ({
  isLeftSidebarOpen,
  setReports,
  register,
  handleSubmit,
  reset,
  errors,
  setEventCreated
}: ReportProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<ReportData> = async (data) => {
    setIsLoading(true);
    try {
      if (data.image && data.image.length > 0) {
        const response = await createReport({
          description: data.description,
          coordinates: data.coordinates,
          image: data.image,
        });
        setReports((prevReports) => [...prevReports, response]);
        reset();
      }
    } catch (error) {
      console.log(
        "Error occurred while submitting report: ",
        (error as Error).message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventsRedirection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setEventCreated(true)
  }

  return (
    <div
      className={
        isLeftSidebarOpen
          ? "form-container report left-sidebar-open"
          : "form-container report"
      }
    >
      <h1>Report a Trail Area</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            maxLength={60}
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Details of what to work with"
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="coordinates">GPS Coordinates</label>
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
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            {...register("image", { required: "Image is required" })}
            accept="image/*"
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>
        <div className="button-container ">
          <button type="submit" id="report-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit Report"}
          </button>
          <span>or</span>
          <button onClick={handleEventsRedirection} className="events-redirection-btn">Explore Events</button>
        </div>
      </form>
    </div>
  );
};

export default ReportPage;
