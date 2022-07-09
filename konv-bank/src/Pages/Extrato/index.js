import './style.css';
import Header from "../../components/Header"
import {useState} from 'react'
import InputMask from 'react-input-mask';
import isValidCPF from "../../utills/isValidCPF"
import {useNavigate} from "react-router-dom";

function Extrato() {

  const [cpf, setCpf] = useState('')
  const [cpfValido, setcpfValido] = useState(true)
  
  const [listaTarnsicoes, setListaTransicoes] = useState([])
  const [listaSaque, setlistaSaque] = useState([])
  const [listaDeposito, setlistaDeposito] = useState([])

  const [isOpenSaques, setisOpenSaques] = useState(false)
  const [isOpenDeposito, setisOpenDeposito] = useState(false)
  const [isOpenTodos, setisOpenTodos] = useState(false)

  const navigate = useNavigate()

    async function saque(e){
      e.preventDefault();
      if(!isValidCPF(cpf)){
        return console.log("Erro")
      }
      const promise = await fetch(`http://localhost:3008/extract/${cpf}`);
      const response = await promise.json()
      if(!promise.ok){
        return console.log(response.mensagem)
      }
      setlistaSaque(response.transactionswithdraw)
      setisOpenSaques(true)
      setisOpenDeposito(false)
      setisOpenTodos(false)
    }

    async function deposito(e){
      e.preventDefault();
      if(!isValidCPF(cpf)){
        return console.log("Erro")
      }
      const promise = await fetch(`http://localhost:3008/extract/${cpf}`);
      const response = await promise.json()
      if(!promise.ok){
        return console.log(response.mensagem)
      }
      setlistaDeposito(response.transactionDeposit)
      setisOpenDeposito((true))
      setisOpenSaques(false)
      setisOpenTodos(false)
    }

  return (
    <div className="container-Pages">
      <Header/>
      <div className="label-input-extrato displayFlex">
      <label><h2>Digite seu cpf</h2></label>
      <InputMask
                className="input-extrato"  
                mask="999.999.999-99"
                type="text"
                name="cpf"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
      />
      </div>
      <div className="transacoes transacoes-width">
          <input 
            type="submit" 
            value="Saques" 
            className="btn-purple" 
            onClick={saque}/>
          <input 
            type="submit" 
            value="Depositos" 
            className="btn-purple"
            onClick={deposito}/>
          <input 
            type="submit" 
            value="Mostrar Todas" 
            className="btn-purple" 
            onClick={()=> navigate('/todasTransacoes')}/>
        </div>
      <section className='container-saque'>
      <div>
        {
          isOpenSaques &&
          <>
          <ul className='card-Saque'>
              <li>Nome</li>
              <li>Valor</li>
              <li>Data</li>
              <li>Hora</li>
              <li>Tipo</li>
          </ul>       
          {
            listaSaque.map((saque)=>(
            <ul className='card-Saque'>           
              <li>{saque.name}</li>
              <li>R${saque.valor},00</li>
              <li>{saque.date_transaction.slice(0, 10)}</li>
              <li>{saque.hora}</li>
              <li>{saque.type_transaction}</li>
            </ul>
            ))
          }
          </>
        }

      {
          isOpenDeposito &&
          <>
          <ul className='card-Saque'>
              <li>Nome</li>
              <li>Valor</li>
              <li>Data</li>
              <li>Hora</li>
              <li>Tipo</li>
          </ul>       
          {
            listaDeposito.map((saque)=>(
            <ul className='card-Saque'>           
              <li>{saque.name}</li>
              <li>R${saque.valor},00</li>
              <li>{saque.date_transaction.slice(0, 10)}</li>
              <li>{saque.hora}</li>
              <li>{saque.type_transaction}</li>
            </ul>
            ))
          }
          </>
        }
        
        {
          isOpenTodos &&
          <>
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
              <li>R${saque.valor},00</li>
              <li>{saque.date_transaction.slice(0, 10)}</li>
              <li>{saque.hora}</li>
              <li>{saque.type_transaction}</li>
            </ul>
            ))
          }
          </>
        }

      </div>

      </section>

    </div>
  );
}

export default Extrato;
