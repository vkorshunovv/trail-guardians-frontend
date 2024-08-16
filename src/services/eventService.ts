import axios from "axios";
import { EventData } from "../constants";

const API_URL = "http://localhost:5000/api/event";

export const getEvents = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const createEvent = async (event: EventData) => {
  const response = await axios.post(API_URL, event, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateEvent = async (id: number, event: EventData) => {
  const response = await axios.put(`${API_URL}/${id}`, event, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const deleteEvent = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const joinEvent = async (id: number) => {
  const response = await axios.put(
    `${API_URL}/${id}/join`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
