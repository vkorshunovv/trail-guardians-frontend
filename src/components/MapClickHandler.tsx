import { useMapEvents } from "react-leaflet";
import { MapClickHandlerProps } from "../constants";

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

export default MapClickHandler;
