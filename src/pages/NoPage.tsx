import "../styles/NoPage.css";
import Header from "../components/Header";

const NoPage = () => {
  return (
    <div className="no-page">
      <div className="no-page-container">
        <Header />
        <div className="no-page-message">
          <p>
            Ooops, it seems like this page doesn't exist{" "}
            <span className="emoji-no-page">🤷🏼‍♂️</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default NoPage;
