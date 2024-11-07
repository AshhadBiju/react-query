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

//Declare adn export the type for the Event data
export interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  searchTerm: string;
  description: string;
}

//Declare and export the type for the Custom Error data
export interface CustomError extends Error {
  info?: string;
  code?: number | string;
}

//Function to fetch events from the API
export async function fetchEvents(searchTerm?: string): Promise<Event[]> {
  //Stored the url for the events
  let url = "http://localhost:3000/events";

  //If search is present, it will take this, else it will work without it normally
  if (searchTerm) {
    url += "?search=" + searchTerm;
  }

  //Response itself
  const response = await fetch(url);

  if (!response.ok) {
    const error: CustomError = new Error("Failed to fetch events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { events }: { events: Event[] } = await response.json();
  return events;
}
