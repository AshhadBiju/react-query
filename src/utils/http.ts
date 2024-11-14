// import axios from "axios";

// // Declare and export the type for the Event data
// export interface Event {
//   id: string;
//   title: string;
//   image: string;
//   date: string;
//   description: string;
//   location: string;
// }

// // Declare and export the type for the Custom Error data
// export interface CustomError extends Error {
//   info?: string;
//   code?: number | string;
// }

// // Function to fetch events from the API
// export async function fetchEvents(): Promise<Event[]> {
//   try {
//     const response = await axios.get<{ events: Event[] }>(
//       "http://localhost:5000/events"
//     );
//     const events = response.data.events;
//     console.log(events);

//     return events;
//   } catch (error) {
//     const customError: CustomError = new Error("Failed to fetch events");

//     if (axios.isAxiosError(error)) {
//       customError.code = error.response?.status;
//       customError.info = error.response?.data;
//     }

//     throw customError;
//   }
// }

//Import the type for the Event data from interface types
import { Event, CustomError, EventCreation } from "@/interface/httpInterface";

export async function fetchEvents(
  searchTerm?: string,
  signal?: AbortSignal
): Promise<Event[]> {
  let url = "http://localhost:3000/events";
  if (searchTerm) {
    url += "?search=" + searchTerm;
  }

  const response = await fetch(url, { signal });
  if (!response.ok) {
    const error: CustomError = new Error("Failed to fetch events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events }: { events: Event[] } = await response.json();
  return events;
}

// Updated createNewEvent function
export async function createNewEvent(event: EventCreation): Promise<Event> {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify({ event }), // The backend expects { event }
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: CustomError = new Error("Failed to fetch events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event: newEvent }: { event: Event } = await response.json();
  return newEvent;
}
