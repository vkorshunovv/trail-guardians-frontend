import "../styles/HomePage.css";
import ImpactMetrics from "../components/ImpactMetrics";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import GreetingCard from "../components/GreetingCard";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Modal from "../components/Modal";
import { useState } from "react";

const HomePage = () => {
  const [isMapVisible, setMapVisible] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isRegistered, setRegistered] = useState<boolean>(false);
  const [isLogin, setLogin] = useState<boolean>(false);

  return (
    <div className="homepage">
      <Header
        setModalOpen={setModalOpen}
        isRegistered={isRegistered}
        isLogin={isLogin}
      />
      <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
        {isRegistered ? (
          <LoginPage setLogin={setLogin} setModalOpen={setModalOpen} />
        ) : (
          <SignUpPage
            setModalOpen={setModalOpen}
            setRegistered={setRegistered}
          />
        )}

        {/* <LoginPage setLogin={setLogin} setModalOpen={setModalOpen} /> */}
      </Modal>
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
