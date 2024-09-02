import axios from "axios";
import { ReportData } from "../constants";

const API_URL = "http://localhost:5000/api/report";

export const createReport = async (reportData: ReportData) => {
  const formData = new FormData();

  formData.append("description", reportData.description);
  formData.append("coordinates", reportData.coordinates);

  if (reportData.image && reportData.image.length > 0) {
    formData.append("image", reportData.image[0]);
  } else {
    console.error("No image file selected");
  }

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(
      "Error occurs while calling report API: ",
      (error as Error).message
    );
    throw error;
  }
};

export const getReports = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(
      "The error occured during getting reports: ",
      (error as Error).message
    );
  }
};
