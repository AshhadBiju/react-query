"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface NewPost {
  title: string;
}

export default function CreatePostExample() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newPost: NewPost) => {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setTitle(""); // Clear input after successful addition
    },
  });

  const handleAddPost = () => {
    mutate({ title });
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl">Create a New Post</h1>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleAddPost} disabled={isLoading} className="ml-2">
        {isLoading ? "Adding..." : "Add Post"}
      </button>
    </div>
  );
}
