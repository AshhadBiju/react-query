// src/pages/About.tsx
import React from "react";
import EventForm from "@/components/PostExample";
const Post: React.FC = () => {
  return (
    <div className="p-4">
      <h1>Add/Post Data</h1>
      <div></div>
      <p>This is the Post page of our application.</p>
      <EventForm />
    </div>
  );
};

export default Post;
