import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/utils/http";
import { useRef, useState } from "react";
import { Event } from "@/interface/httpInterface";

export default function SearchExample() {
  const searchElement = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, error, isError } = useQuery<Event[], Error>({
    queryKey: ["events", searchTerm],
    queryFn: async ({ signal }) => {
      return fetchEvents(searchTerm, signal);
    },
    enabled: searchTerm !== undefined,
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (searchElement.current) {
      setSearchTerm(searchElement.current.value);
    }
  }

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error: {error?.message}</p>;
  } else if (data?.length === 0) {
    content = <p>No events found.</p>;
  } else {
    content = (
      <ul>
        {data?.map((event) => (
          <li key={event.id}>
            {event.title} - {event.date}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          ref={searchElement}
          placeholder="Search for events"
          className="border p-2 rounded"
        />
      </form>
      {content}
    </section>
  );
}
