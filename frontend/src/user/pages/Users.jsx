import React, { useEffect } from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  // useEffect() runs once when the component is mounted.
  // The empty array as the second argument ensures that useEffect() only runs once.
  // If the second argument is not provided, useEffect() will run every time the component is updated.
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/users");

      const responseData = await response.json();
    };
    sendRequest();
  }, []);

  return <UsersList items={USERS} />;
};

export default Users;
