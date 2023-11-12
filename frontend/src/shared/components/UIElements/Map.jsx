import React from "react";
import GoogleMapReact from "google-map-react";

import "./Map.css";

const Map = ({center, zoom}) => {

  return (
    <div style={{ height: "250px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
      </GoogleMapReact>
    </div>
  );
};

export default Map;
