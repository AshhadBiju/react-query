"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default function UpdatePostExample() {
  const queryClient = useQueryClient();
  const [postId, setPostId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/posts`);
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, title }: { id: number; title: string }) => {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setPostId(null);
      setTitle("");
    },
  });

  const handleUpdatePost = () => {
    if (postId) {
      updateMutation.mutate({ id: postId, title });
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl">Update a Post</h1>
      <select
        onChange={(e) => setPostId(Number(e.target.value))}
        value={postId || ""}
        className="border p-2"
      >
        <option value="" disabled>
          Select a post to update
        </option>
        {posts?.map((post) => (
          <option key={post.id} value={post.id}>
            {post.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="ml-2 border p-2"
      />
      <button onClick={handleUpdatePost} className="ml-2">
        Update Post
      </button>
    </div>
  );
}
