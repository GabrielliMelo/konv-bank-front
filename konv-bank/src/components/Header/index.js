import './style.css';
import logo from "../../assets/logo.png"
import { Link} from "react-router-dom"

function Header() {
  
  return (
      <header className="container-header">
        <img src = {logo} alt="logo-konv"/>
        <div className='header-btn'>
          <Link  className='btn-header' to="/alltransactions" > Transacoes</Link>
          <Link  className='btn-header' to="/extract"> Extrato </Link>
          <Link  className='btn-header'to="/atmkonv" > Caixa Eletronico</Link>
        </div>

      </header>
  );
}

export default Header;
