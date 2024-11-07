// src/pages/About.tsx
import React from "react";
import FetchExample from "@/components/FetchExample";
const UsersList: React.FC = () => {
  return (
    <div className="p-4">
      <h1>UsersList Us</h1>
      <p>This is the UsersList page of our application.</p>
      <div>
        <FetchExample />
      </div>
    </div>
  );
};

export default UsersList;
