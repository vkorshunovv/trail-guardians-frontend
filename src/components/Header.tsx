import { Link } from "react-router-dom";
import { HeaderProps } from "../constants";
import "../styles/Header.css";

const Header = ({ setModalOpen }: HeaderProps) => {
  return (
    <header className="header">
      <Link to="/" reloadDocument>
        <p>TrailGuardians</p>
      </Link>

      <button onClick={() => setModalOpen(true)}>Sign up</button>
    </header>
  );
};

export default Header;
