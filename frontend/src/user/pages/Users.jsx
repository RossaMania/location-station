import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from "../../shared/hooks/http-hook";

const apiUrl = process.env.REACT_APP_API_URL;

const Users = () => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(apiUrl); // Check if this outputs the expected URL
        const responseData = await sendRequest(`${apiUrl}/api/users`);

        setLoadedUsers(responseData.users);
      } catch (err) {
        return err?.message;
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
