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

export const joinEvent = async (userId: number, eventId: number) => {
  try {
    const response = await axios.post(
      `${API_URL}/joinEvent`,
      {
        userId,
        eventId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const { joinedEvents, updatedEvent } = response.data;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.joinedEvents.push(joinedEvents);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("server returns final joinedEvents: ", joinedEvents, updatedEvent);

    return {joinedEvents, updatedEvent};
  } catch (error) {
    console.error("Error occurred while joining event:", error);
    throw error;
  }
};
