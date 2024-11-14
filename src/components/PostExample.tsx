import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "@/utils/http";
import { Event, EventCreation } from "@/interface/httpInterface";

export default function AddNewEvent() {
  const [formData, setFormData] = useState<EventCreation>({
    title: "",
    date: "",
    location: "",
    description: "",
    time: "",
  });

  const { mutate, isPending, isError, error } = useMutation<
    Event,
    Error,
    EventCreation
  >({
    mutationFn: createNewEvent,
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
    console.log("Submit", formData);
    mutate(formData); // No 'id' needed, backend will generate it
  }

  return (
    <div className="container">
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit}>
        {isPending && "Submitting..."}
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter event title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Event Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter event location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Event Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter event description"
          />
        </div>
        <button className="border bg-gray-200" type="submit">
          Submit
        </button>
      </form>

      {isError && (
        <p className="error-message">
          Error: {error?.message || "Failed to create event"}
        </p>
      )}
    </div>
  );
}
