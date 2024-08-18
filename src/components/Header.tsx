import main_logo from "../assets/Screenshot 2024-08-17 at 17.10.05.png";
import '../styles/Header.css'

const Header = () => {
  return (
    <div className="header">
      {/* <img src={main_logo} alt="logo"/> */}
      <p>TrailGuardians</p>
      <button>Sign up</button>
    </div>
  );
};

export default Header;
