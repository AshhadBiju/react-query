import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "@/utils/http";
import { Event, EventCreation } from "@/interface/httpInterface";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/utils/http";

export default function AddNewEvent() {
  const [formData, setFormData] = useState<EventCreation>({
    title: "",
    date: "",
    location: "",
    description: "",
    time: "",
    image: "",
  });

  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation<
    Event,
    Error,
    EventCreation
  >({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none", //by default, auto refetches the data even if in the same page. Set that to none, no extra refetching
      });

      alert("Event was successfully created");
      navigate("/users");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(formData);
  }

  return (
    <main className="container mx-auto max-w-lg p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Event
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isPending && <div className="text-blue-500">Submitting...</div>}

        <div className="form-group">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter event title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Event Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Event Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter event location"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Event Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter event description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>

      {isError && (
        <p className="mt-4 text-red-500 font-medium">
          Error: {error?.message || "Failed to create event"}
        </p>
      )}
    </main>
  );
}
