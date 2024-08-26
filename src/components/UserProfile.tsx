import { UserProfileProps } from "../constants";
import { formatDate } from "../utils/dateFormat";

const UserProfile = ({ userName, setLogin, userEvents }: UserProfileProps) => {
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setLogin(false);
  };

  return (
    <div>
      <p>Hello, {userName} 👋</p>
      <p>Your current level : 'Volunteer'</p>
      <p>Events you already have joined: </p>
      <ul>
        {userEvents.map((event) => (
          <li key={event.id}>
            {event.location} - {formatDate(event.date)}
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button onClick={handleLogOut} className="logout-btn">Log out</button>
      </div>
    </div>
  );
};

export default UserProfile;
