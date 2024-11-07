"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default function DeletePostExample() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/posts`);
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId: number) => {
      await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleDeletePost = (postId: number) => {
    deleteMutation.mutate(postId);
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl">Delete a Post</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {posts?.map((post) => (
            <li key={post.id} className="mb-2">
              {post.title}
              <button
                onClick={() => handleDeletePost(post.id)}
                className="ml-2 text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
