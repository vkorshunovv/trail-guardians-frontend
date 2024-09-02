import { Link } from "react-router-dom";
import { HeaderProps } from "../constants";
import "../styles/Header.css";

const Header = ({ setModalOpen, isRegistered, isLogin }: HeaderProps) => {
  return (
    <header className="header">
      <Link to="/" reloadDocument>
        <p>TrailGuardians</p>
      </Link>
      {isLogin ? (
        <button onClick={() => setModalOpen!(true)}>Profile</button>
      ) : (
        <button onClick={() => setModalOpen!(true)}>
          {isRegistered ? "Log in" : "Sign up"}
        </button>
      )}
    </header>
  );
};

export default Header;
