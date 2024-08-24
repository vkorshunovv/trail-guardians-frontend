import { UserProfileProps } from "../constants";
import { formatDate } from "../utils/dateFormat";

const UserProfile = ({ userName, setLogin, userEvents }: UserProfileProps) => {
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
        <button onClick={() => setLogin(false)}>Log out</button>
      </div>
    </div>
  );
};

export default UserProfile;
