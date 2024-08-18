import ImpactMetrics from "../components/ImpactMetrics";
import Header from "../components/Header";
import '../styles/HomePage.css'
import MapComponent from "../components/MapComponent";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <MapComponent />
      <ImpactMetrics />
    </div>
  );
};

export default HomePage;
