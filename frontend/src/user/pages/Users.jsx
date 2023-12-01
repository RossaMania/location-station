import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";

const Users = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
  
      const response = await fetch("http://localhost:5000/api/users");

      const responseData = await response.json();

      setLoadedUsers(responseData.users)
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  return <UsersList items={USERS} />;
};

export default Users;
