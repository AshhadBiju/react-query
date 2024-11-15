"use client";
import { fetchEvents } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function FetchExample() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEvents(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-bold text-red-500">
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </h2>
      </div>
    );
  }

  if (data) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>
        <ul className="space-y-6">
          {data.map((event) => (
            <li
              key={event.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                {event.title}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Date:</span> {event.date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {event.location}
              </p>
              <p className="text-gray-700 mt-4">{event.description}</p>
              <Link
                to={`/events/${event.id}`}
                className="text-blue-500 mt-2 inline-block"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
