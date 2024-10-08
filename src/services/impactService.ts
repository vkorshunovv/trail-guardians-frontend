import axios from "axios";

const API_URL = "http://13.60.190.59:5000/api/impact" || "http://localhost:5000/api/impact";

export const getImpactMetrics = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(
      "Error occurred while getting impact metrics from server",
      error
    );
  }
};
