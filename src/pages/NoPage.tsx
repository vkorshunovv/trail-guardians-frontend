import "../styles/NoPage.css";

const NoPage = () => {
  return (
    <div className="no-page">
      <div className="no-page-container">
        <p>
          Ooops, it seems like this page doesn't exist{" "}
          <span className="emoji-no-page">🤷🏼‍♂️</span>
        </p>
      </div>
    </div>
  );
};
export default NoPage;
