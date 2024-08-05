import axios from "axios";
import { ReportData } from "../constants";

const API_URL = "http://localhost:5000/api/report";

export const createReport = async (reportData: ReportData) => {
  const formData = new FormData();

  formData.append("description", reportData.description);
  formData.append("coordinates", reportData.coordinates);
  formData.append("image", reportData.image[0]);

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
