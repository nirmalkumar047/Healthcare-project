import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};
const center = {
  lat: 13.0827, // Default to Chennai
  lng: 80.2707,
};

const Hospital = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [hospitals, setHospitals] = useState([]);
  const mapRef = useRef(null);

  const onMapLoad = (map) => {
    mapRef.current = map;
    fetchNearbyHospitals(map);
  };

  const fetchNearbyHospitals = (map) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: 5000,
      type: ["hospital"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setHospitals(results);
      } else {
        console.error("PlacesService failed:", status);
      }
    });
  };

  if (loadError) return <div>❌ Error loading maps</div>;
  if (!isLoaded) return <div>⏳ Loading Maps...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Nearby Hospitals in Chennai</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        onLoad={onMapLoad}
      >
        {hospitals.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Hospital;
