// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";

// const BASE_URL = "http://localhost:3000/events";

// interface Post {
//   id: number;
//   title: string;
// }

// export default function FetchExample() {
//   const [page, setPage] = useState(0);

//   const { data: posts, isPending } = useQuery({
//     queryKey: ["posts", { page }],
//     queryFn: async () => {
//       const response = await fetch(`${BASE_URL}`);
//       return (await response.json()) as Post[];
//     },
//   });

//   return (
//     <div className="">
//       <h1 className="mb-4 text-2xl">Data Fetching in React</h1>
//       <button onClick={() => setPage(page - 1)}>Decrease Page ({page})</button>
//       <button onClick={() => setPage(page + 1)}>Increase Page ({page})</button>
//       {isPending && <div>Loading...</div>}
//       {!isPending && (
//         <ul>
//           {posts?.map((post) => {
//             return <li key={post.id}>{post.title}</li>;
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }
"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/utils/http";

export default function FetchExample() {
  //API function to fetch events is called here, queryKey (to store and show cached data) and queryFn (to use the async function to show data from http.ts)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEvents(),
  });
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log(count);
  //   setCount(count + 1); // increment count every tim  e the query is refetched (not just on initial render)
  // }, [data, isLoading, isError, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <h2>
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </h2>
      </div>
    );
  }

  if (data) {
    console.log("Fetched events data:", data);
    return (
      <div>
        <ul>
          {data.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              <img src={event.image} alt={event.title} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
