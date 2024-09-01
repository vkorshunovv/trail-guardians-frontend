import "../styles/HomePage.css";
import ImpactMetrics from "../components/ImpactMetrics";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import GreetingCard from "../components/GreetingCard";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import ReportPage from "./ReportPage";
import { ReportData, EventData } from "../constants";
import { useForm } from "react-hook-form";
import EventPage from "./EventPage";
import UserProfile from "../components/UserProfile";

const HomePage = () => {
  const [isMapVisible, setMapVisible] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isRegistered, setRegistered] = useState<boolean>(false);
  const [isLogin, setLogin] = useState<boolean>(false);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState<boolean>(false);
  const [isEventCreated, setEventCreated] = useState<boolean>(false);
  const [userName, setUserName] = useState("");
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");

  const {
    register: registerReport,
    handleSubmit: handleSubmitReport,
    reset: resetReport,
    setValue: setValueReport,
    formState: { errors: reportErrors },
  } = useForm<ReportData>();

  const {
    register: registerEvent,
    handleSubmit: handleSubmitEvent,
    reset: resetEvent,
    formState: { errors: eventErrors },
  } = useForm<EventData>();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setLogin(true);
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name);
    }
  }, []);

  return (
    <div className="homepage-container">
      <section className="left-sidebar">
        <button className="pull-btn" onClick={() => setLeftSidebarOpen(true)}>
          Click to open
        </button>
        <ReportPage
          isLeftSidebarOpen={isLeftSidebarOpen}
          setReports={setReports}
          register={registerReport}
          handleSubmit={handleSubmitReport}
          reset={resetReport}
          errors={reportErrors}
        />
      </section>

      <section className="homepage">
        <Header
          setModalOpen={setModalOpen}
          isRegistered={isRegistered}
          isLogin={isLogin}
        />
        <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
          {isLogin ? (
            <UserProfile
              userName={userName}
              setLogin={setLogin}
              userEvents={userEvents}
            />
          ) : isRegistered ? (
            <LoginPage
              setLogin={setLogin}
              setModalOpen={setModalOpen}
              setUserName={setUserName}
              setUserEvents={setUserEvents}
              setUserEmail={setUserEmail}
            />
          ) : (
            <SignUpPage
              setModalOpen={setModalOpen}
              setRegistered={setRegistered}
              setUserName={setUserName}
            />
          )}
        </Modal>
        <div className={`flip-card ${isMapVisible && "flipped"}`}>
          <div className="flip-card-front">
            <GreetingCard setMapVisible={setMapVisible} />
          </div>
          <main className="flip-card-back">
            <MapComponent
              reports={reports}
              setReports={setReports}
              setValue={setValueReport}
            />
          </main>
        </div>
        <ImpactMetrics />
      </section>

      <section className="right-sidebar">
        <button className="pull-btn" onClick={() => setRightSidebarOpen(true)}>
          Click to open
        </button>
        <EventPage
          isRightSidebarOpen={isRightSidebarOpen}
          events={events}
          setEvents={setEvents}
          register={registerEvent}
          handleSubmit={handleSubmitEvent}
          reset={resetEvent}
          errors={eventErrors}
          setEventCreated={setEventCreated}
          isEventCreated={isEventCreated}
          setUserEvents={setUserEvents}
          isLogin={isLogin}
          userEmail={userEmail}
        />
      </section>
    </div>
  );
};

export default HomePage;
