import { fetchEvent } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Event } from "@/interface/httpInterface";
const EventDetailsPage = () => {
  const params = useParams();

  const { data, isLoading, isError, isPending, error } = useQuery<Event, Error>(
    {
      queryKey: ["event", params.id!],
      queryFn: ({ signal }) => fetchEvent({ id: params.id!, signal }),
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }
  if (isPending) {
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
        <h1 className="text-3xl font-bold mb-6 text-center">Event Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">{data.title}</h2>
          <p className="text-gray-600">
            <span className="font-medium">Date:</span> {data.date}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {data.location}
          </p>
          <p className="text-gray-700 mt-4">{data.description}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default EventDetailsPage;
