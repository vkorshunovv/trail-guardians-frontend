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
import { MapClickHandlerProps, MapComponentProps } from "../constants";
import { getReports } from "../services/reportService";
import { LatLngExpression } from "leaflet";

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

const MapComponent = ({ reports, setReports }: MapComponentProps) => {
  const { setValue } = useForm();
  const [marker, setMarker] = useState<LatLngExpression>(center);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await getReports();
        setReports(fetchedReports);
      } catch (error) {
        console.error("Error fetching reports: ", error);
      }
    };
    fetchReports();
  }, [setReports]);

  return (
    <MapContainer id="report-map" zoom={10} center={center}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler setMarker={setMarker} setValue={setValue} />
      {reports &&
        reports.length > 0 &&
        reports.map((report) => {
          const [lat, lng] = report.coordinates.split(", ").map(Number);
          const position: LatLngExpression = [lat, lng];

          return (
            <Marker key={report.id} position={position}>
              <Popup>{report.description}</Popup>
            </Marker>
          );
        })}

        <Marker position={marker}>
          <Popup>GPS Coordinates: </Popup>
        </Marker>
    </MapContainer>
  );
};

export default MapComponent;
