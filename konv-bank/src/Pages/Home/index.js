import './style.css';
import Header from "../../components/Header"
import {useState} from "react"
import ModalDraw from '../../components/ModalDraw';
import ModalDeposit from '../../components/ModalDeposit';
import {useNavigate, Link} from "react-router-dom";


function Home() {

  const [isOpenSacar, setisOpenSacar] = useState(false)
  const [isOpendepositar, setisOpenDeposito] = useState(false)
  // const [isOpenTranf, setisOpenTranf] = useState(false)
  
  const navigate = useNavigate()

  const handleToggleModalSacar = ()=>{
      setisOpenSacar((prevState)=> !prevState)
  }

  const handleToggleModaldepositar = ()=>{
    setisOpenDeposito((prevState)=> !prevState)
}

  return (
    <div className="container-Pages">
      <Header/>
        <h1 className='h1-home'>Bem vindo ao caixa eletronico Konv</h1>
        <div className="transacoes">
          <input 
          type="submit" 
          value="Saque" 
          className="btn-purple" 
          onClick={()=> setisOpenSacar(true)}/>
          <input 
          type="submit" 
          value="Deposito" 
          className="btn-purple"
          onClick={()=> setisOpenDeposito(true)}/>
          {/* <input type="submit" value="Transferir" className="btn-purple"/> */}
          <Link  className='btn-purple'to="/extract" > Extrato</Link>
        </div>
 
      <ModalDraw
        isOpenSacar={isOpenSacar}
        handleToggleModalSacar={handleToggleModalSacar}
      />

      <ModalDeposit
          isOpendepositar={isOpendepositar} 
          handleToggleModaldepositar={handleToggleModaldepositar}
      />

    </div>
  );
}

export default Home;
