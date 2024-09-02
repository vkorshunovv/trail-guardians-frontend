import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";
import { useEffect, useState } from "react";
import { MapComponentProps, Center, TileLayerAttr } from "../constants";
import { getReports } from "../services/reportService";
import { LatLngExpression, LatLngLiteral } from "leaflet";

const MapComponent = ({ reports, setReports, setValue }: MapComponentProps) => {
  const [marker, setMarker] = useState<LatLngLiteral>(Center);
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

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const coords = e.latlng;
        setMarker(coords);
        setValue("coordinates", `${coords.lat}, ${coords.lng}`);
      },
    });
    return null;
  };

  return (
    <MapContainer id="report-map" zoom={7} center={Center}>
      <TileLayer
        url={TileLayerAttr.url}
        attribution={TileLayerAttr.attribution}
      />
      <MapClickHandler />
      {reports &&
        reports.length > 0 &&
        reports.map((report) => {
          const [lat, lng] = report.coordinates.split(", ").map(Number);
          const position: LatLngExpression = [lat, lng];

          const handleCopyCoords = (text: string) => {
            navigator.clipboard.writeText(text).then(() => {
              setNotification("Copied!");
              setTimeout(() => {
                setNotification("");
              }, 1000);
            });
          };
          // TODO Green markers to report markers and blue to current
          return (
            <Marker key={report.id} position={position}>
              <Popup>
                {notification && (
                  <div className="notification-popup">{notification}</div>
                )}
                <div className="popup-wrapper">
                  <p>
                    <span>Issue: </span> <br />
                    {report.description}
                  </p>
                  <p
                    onClick={() => handleCopyCoords(report.coordinates)}
                    className="popup-coords"
                  >
                    <span>GPS coordinates:</span> <br />
                    {report.coordinates}
                  </p>
                  {report.image && (
                    <img
                      src={`http://localhost:5000/${report.image}`}
                      alt={report.description}
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      <Marker position={marker}>
        <Popup>
          <div className="popup-marker-coords">
            <p>GPS Coordinates:</p>
            <p> {[marker.lat, marker.lng]}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
