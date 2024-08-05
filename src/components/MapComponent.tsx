import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "30px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const MapComponent = () => {
  return (
    <MapContainer
      id="report-map"
      style={mapContainerStyle}
      zoom={10}
      center={center}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
