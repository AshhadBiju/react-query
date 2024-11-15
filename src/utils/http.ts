import { Event, CustomError, EventCreation } from "@/interface/httpInterface";
import { QueryClient } from "@tanstack/react-query";

// Initialize the queryClient here for optimal event management
export const queryClient = new QueryClient();

// Fetch events, optionally filtered by a search term
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
    const error: CustomError = new Error(
      "Failed to fetch events"
    ) as CustomError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events }: { events: Event[] } = await response.json();
  return events;
}

// Create a new event
export async function createNewEvent(event: EventCreation): Promise<Event> {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify({ event }), // The backend expects { event }
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: CustomError = new Error(
      "Failed to create event"
    ) as CustomError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event: newEvent }: { event: Event } = await response.json();
  return newEvent;
}

// Fetch a specific event by ID
export async function fetchEvent({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<Event> {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error: CustomError = new Error(
      "An error occurred while fetching the event"
    ) as CustomError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event }: { event: Event } = await response.json();
  return event;
}

// Delete an event by ID
export async function deleteEvent({ id }: { id: string }): Promise<void> {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error: CustomError = new Error(
      "An error occurred while deleting the event"
    ) as CustomError;
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return;
}
