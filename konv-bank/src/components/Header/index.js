import './style.css';
import logo from "../../assets/logo.png"
import logout from "../../assets/logout.png"

function Header() {
  return (
      <header className="container-header">
        <img src = {logo} alt="logo-konv"/>
        <img src = {logout} alt="logout-konv"/>
      </header>
  );
}

export default Header;
