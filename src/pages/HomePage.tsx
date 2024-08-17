import ImpactMetrics from "../components/ImpactMetrics";
import Header from "../components/Header";
import '../styles/HomePage.css'

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <ImpactMetrics />
    </div>
  );
};

export default HomePage;
