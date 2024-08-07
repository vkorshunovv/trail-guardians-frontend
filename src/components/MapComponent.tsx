import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { MapClickHandlerProps } from "../constants";
import { createReport, getReports } from "../services/reportService";

const center = {
  lat: 39.470242,
  lng: -0.3768,
};

const MapClickHandler = ({ setMarker, setValue }: MapClickHandlerProps) => {
  useMapEvents({
    click(e) {
      const coords = e.latlng;
      setMarker(coords);
      setValue("coordinates", `${coords.lat}, ${coords.lng}`);
      console.log("Coordinates: ", coords);
    },
  });
  return null;
};

const MapComponent = () => {
  const { setValue } = useForm();
  const [marker, setMarker] = useState(center);
  const [report, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const fetchedReports = await getReports();
      setReports(fetchedReports);
    };
    fetchReports();
  }, []);

  return (
    <MapContainer id="report-map" zoom={10} center={center}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler setMarker={setMarker} setValue={setValue} />
      <Marker position={marker}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
