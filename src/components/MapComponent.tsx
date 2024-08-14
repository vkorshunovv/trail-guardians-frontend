import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
import { useEffect, useState } from "react";
import { MapComponentProps, Center, TileLayerAttr } from "../constants";
import { getReports } from "../services/reportService";
import { LatLngExpression } from "leaflet";
import MapClickHandler from "./MapClickHandler";
import catImage from "../assets/cat-8943928_640.png";

const MapComponent = ({ reports, setReports, setValue }: MapComponentProps) => {
  const [marker, setMarker] = useState<LatLngExpression>(Center);
  const [notification, setNotification] = useState<string | null>(null);

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
    <MapContainer id="report-map" zoom={10} center={Center}>
      <TileLayer
        url={TileLayerAttr.url}
        attribution={TileLayerAttr.attribution}
      />
      <MapClickHandler setMarker={setMarker} setValue={setValue} />
      {reports &&
        reports.length > 0 &&
        reports.map((report) => {
          const [lat, lng] = report.coordinates.split(", ").map(Number);
          const position: LatLngExpression = [lat, lng];

          const handleCopyCoords = (text: string) => {
            navigator.clipboard.writeText(text).then(() => {
              setNotification("Copied!");
              setTimeout(() => {
                setNotification(null);
              }, 2000);
            });
          };

          return (
            <Marker key={report.id} position={position}>
              <Popup>
                {notification && (
                  <div className="notification">{notification}</div>
                )}
                <p>
                  <span style={{ fontWeight: "bold" }}>Issue: </span> <br />
                  {report.description}
                </p>
                <p
                  onClick={() => handleCopyCoords(report.coordinates)}
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                    GPS coordinates:
                  </span>{" "}
                  <br />
                  {report.coordinates}
                </p>
                <img
                  src={catImage} // TODO fix image display in popup from database
                  alt={report.description}
                  style={{
                    maxWidth: "300px",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                />
              </Popup>
            </Marker>
          );
        })}

      <Marker position={marker}></Marker>
    </MapContainer>
  );
};

export default MapComponent;
