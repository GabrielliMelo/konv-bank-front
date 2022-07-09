import './style.css';
import Header from "../../components/Header"
import Button from "../../components/Button"
import {useState} from "react"
import ModalSacar from '../../components/ModalSacar';

function Home() {

  const [isOpenSacar, setisOpenSacar] = useState(false)
  const [isOpenDeposito, setisOpenDeposito] = useState(false)
  const [isOpenTranf, setisOpenTranf] = useState(false)

  const handleToggleModalSacar = ()=>{
      setisOpenSacar((prevState)=> !prevState)
  }

  return (
    <div className="container-Home">
      <Header/>
        <h1 className='h1-home'>Bem vindo ao caixa eletronico Konv</h1>
        <div className="transacoes">
          <input 
          type="submit" value="Sacar" 
          className="btn-purple" 
          onClick={()=> setisOpenSacar(true)}/>
          <input type="submit" value="Depositar" className="btn-purple"/>
          <input type="submit" value="Transferir" className="btn-purple"/>
          <input type="submit" value="Extrato" className="btn-purple"/>
        </div>
 
      <ModalSacar
        isOpenSacar={isOpenSacar}
        handleToggleModalSacar={handleToggleModalSacar}
      />
    </div>
  );
}

export default Home;
