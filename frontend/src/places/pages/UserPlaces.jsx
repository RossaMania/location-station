import React, { useEffect, useState } from "react";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

const UserPlaces = () => {

  const [loadedPlaces, setLoadedPlaces] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);

        console.log(responseData);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces