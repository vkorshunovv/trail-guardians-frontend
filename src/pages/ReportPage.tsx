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

  const onSubmit: SubmitHandler<ReportData> = async (data) => {
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
    }
  };
  return (
    <div className="report-page-container">
      <section>
        <h1>Report a Trail Area</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
            <label htmlFor="coordinates">GPS coordinates:</label>
            <input
              type="text"
              id="coordinates"
              {...register("coordinates", { required: true })}
              placeholder="Click on map"
            />
          </div>
          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              {...register("image", { required: true })}
            />
          </div>
          {/* TODO Loading state */}
          <button type="submit">Submit Report</button>
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
