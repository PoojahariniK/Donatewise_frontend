import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({ onChange }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onChange(e.latlng);
    }
  });

  return position ? <Marker position={position} /> : null;
}

export default function LocationPicker({ onSelect }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // India center
      zoom={5}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onChange={onSelect} />
    </MapContainer>
  );
}
