import "../styles/HomePage.css";
import ImpactMetrics from "../components/ImpactMetrics";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import GreetingCard from "../components/GreetingCard";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Modal from "../components/Modal";
import { useState } from "react";
import ReportPage from "./ReportPage";
import { ReportData } from "../constants";
import { useForm } from "react-hook-form";
import EventPage from "./EventPage";

const HomePage = () => {
  const [isMapVisible, setMapVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReportData>();

  return (
    <div className="homepage-container">
      <section className="left-sidebar">
        <button className="pull-btn" onClick={() => setLeftSidebarOpen(true)}>
          Click to open
        </button>
        <ReportPage
          isLeftSidebarOpen={isLeftSidebarOpen}
          setReports={setReports}
          register={register}
          handleSubmit={handleSubmit}
          reset={reset}
          errors={errors}
        />
      </section>

      <section className="homepage">
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
          <main className="flip-card-back">
            <MapComponent
              reports={reports}
              setReports={setReports}
              setValue={setValue}
            />
          </main>
        </div>
        <ImpactMetrics />
      </section>

      <section className="right-sidebar">
        <button className="pull-btn" onClick={() => setRightSidebarOpen(true)}>
          Click to open
        </button>
        <EventPage isRightSidebarOpen={isRightSidebarOpen} />
      </section>
    </div>
  );
};

export default HomePage;
