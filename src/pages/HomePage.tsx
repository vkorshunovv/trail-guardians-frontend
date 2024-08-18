import "../styles/HomePage.css";
import ImpactMetrics from "../components/ImpactMetrics";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import GreetingCard from "../components/GreetingCard";
import { useState } from "react";

const HomePage = () => {
  const [isMapVisible, setMapVisible] = useState<boolean>(false);
  return (
    <div className="homepage">
      <Header />
      <div className={`flip-card ${isMapVisible && "flipped"}`}>
        <div className="flip-card-front">
          <GreetingCard setMapVisible={setMapVisible} />
        </div>
        <div className="flip-card-back">
          <MapComponent />
        </div>
      </div>
      <ImpactMetrics />
    </div>
  );
};

export default HomePage;
