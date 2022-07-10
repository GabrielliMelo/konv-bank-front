import './style.css';
import Header from "../../components/Header"
import {useState} from 'react'
import InputMask from 'react-input-mask';
import isValidCPF from "../../utills/isValidCPF"
import MyToasty from '../../components/MyToasty';


function AllTransactions() {

  const [cpf, setCpf] = useState('')
  const [cpfValido, setcpfValido] = useState(true)
  
  const [listaTarnsicoes, setListaTransicoes] = useState([])
  const [isOpenTodos, setisOpenTodos] = useState(false)


    async function transacoes(e){
      e.preventDefault();

      if(!isValidCPF(cpf)){
        setcpfValido(false)
        setisOpenTodos(false)
      }
      const promise = await fetch(`http://localhost:3008/extract/${cpf}`);
      const response = await promise.json()
      if(!promise.ok){
        return console.log(response.mensagem)
      }
      setListaTransicoes(response.allTransactionsCpf)
      setisOpenTodos(true)
      setcpfValido(true)
    }
    
  return (
    <div className="container-Pages todas">
      <Header/>
      <nav className='nav-todas'>
      <div className="label-input-extrato ">
      <label><h2>Digite seu cpf</h2></label>
      <InputMask
                className="input-extrato"  
                mask="999.999.999-99"
                type="text"
                name="cpf"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
      />
          <input 
            type="submit" 
            value="Validar cpf" 
            className="btn-purple" 
            onClick={transacoes}/>
      </div>
      
      <section >
      <div>
        {
          isOpenTodos &&
          <div className='container-todas'>
          <ul className='card-Saque'>
              <li>Nome</li>
              <li>Valor</li>
              <li>Data</li>
              <li>Hora</li>
              <li>Tipo</li>
          </ul>       
          {
            listaTarnsicoes.map((saque)=>(
            <ul className='card-Saque'>           
              <li>{saque.name}</li>
              <li>R${saque.value_transaction},00</li>
              <li>{saque.date_transaction.slice(0, 10)}</li>
              <li>{saque.hour}</li>
              <li>{saque.type_transaction}</li>
            </ul>
            ))
          }
          </div>
        }

      </div>

      </section>
      {
          !cpfValido &&
          <MyToasty text="CPF invalido" classname={"error cpfError toasty"}/>
        }
      </nav>
      

    </div>
  );
}

export default AllTransactions;
