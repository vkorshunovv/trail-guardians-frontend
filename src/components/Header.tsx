import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" reloadDocument>
        <p>TrailGuardians</p>
      </Link>

      <button>Sign up</button>
    </header>
  );
};

export default Header;
