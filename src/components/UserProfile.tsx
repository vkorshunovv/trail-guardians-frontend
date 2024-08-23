import { UserProfileProps } from "../constants";

const UserProfile = ({ userName, setLogin }: UserProfileProps) => {
  return (
    <div>
      <p>Hello, {userName} 👋</p>
      <p>Your current level : 'Volunteer'</p>
      <p>Events you already have joined: </p>
      <div className="button-container">
      <button onClick={() => setLogin(false)}>Log out</button>
      </div>
    </div>
  );
};

export default UserProfile;
