import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mapContainerStyle = {
  height: "80vh",
  width: "80vw",
  borderRadius: "30px",
  margin: '10px'
};

const center = {
  lat: 39.470242,
  lng: -0.376800,
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
