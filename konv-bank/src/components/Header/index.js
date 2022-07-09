import './style.css';
import logo from "../../assets/logo.png"
import logout from "../../assets/logout.png"
import {useNavigate} from "react-router-dom"

function Header() {
  
  const navigate = useNavigate()
  
  return (
      <header className="container-header">
        <img src = {logo} alt="logo-konv"/>
        <div className='header-btn'>
          <input type="submit" value="Caixa Eletronico" className='btn-header' onClick={()=> navigate('/caixaKonv')}/>
          <input type="submit" value="Extrato" className='btn-header' onClick={()=> navigate('/extrato')} />
          <input type="submit" value="Todas Transacoes" className='btn-header' onClick={()=> navigate('/todasTransacoes')}/>
        </div>

      </header>
  );
}

export default Header;
