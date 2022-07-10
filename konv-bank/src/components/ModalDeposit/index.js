  import './style.css';
  import { useState} from "react";
  import MyToasty from "../MyToasty"
  import InputMask from 'react-input-mask';
  import validacoesToasty from '../../utills/validacoesToasty';

  function ModalDeposit({isOpendepositar, handleToggleModaldepositar}) {
    
    const [Value, setValue] = useState(0)
    const [description, setdescription] = useState("")
    const [cpf, setcpf] = useState("")

    const [ResponseOk, setResponseOk] = useState(false)
    const [erroDescription, setErroDescription] = useState(false)
    const [erroValue, setErroValue] = useState(false)
    const [errorCPF, setErrorCPF] = useState(false)
    const [ cpfInvalid, setCPFinvalid] = useState(false)

    if(!isOpendepositar){
      return null;
    }

    async function handleDeposito(e) {
      e.preventDefault();
      const promise = await fetch(`http://localhost:3008/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf,
          value_transaction: Value, 
          description
        }),
      });
      const response = await promise.json()

      console.log(response)

      validacoesToasty(response, setResponseOk, setErrorCPF , setErroValue, setErroDescription, setCPFinvalid)
    }

    return (
      <>
      <div className="container-Modal displayFlex" >
        <div className="card-modal-transacao displayFlex">
          <div className="close-header displayFlex">
            <h1 className="h1-transacao" onClick={handleToggleModaldepositar}>Deposito</h1>
            <h1 className="btn-close" onClick={handleToggleModaldepositar}>x</h1>
          </div>
         
          <div className="label-input width-70">
            <label>CPF</label>
            <InputMask
                className="label-input-transacoes"  
                mask="999.999.999-99"
                type="text"
                name="cpf"
                value={cpf}
                onChange={(event) => setcpf(event.target.value)}
              />
          </div>
          <div className="label-input width-70">
            <label>Value</label>
            <input className="label-input-transacoes" type="number" onChange={(e)=> setValue(e.target.value)}/>
          </div>
          <div className="label-input width-70">
            <label>Descrição</label>
            <input className="label-input-transacoes" type="text" onChange={(e)=> setdescription(e.target.value)}/>
          </div>
          <div className="btn-transacoes">
              <input
                type = "submit"
                value="Confirmar"
                className="btn-purple"  
                onClick={handleDeposito}
              />
          </div>
        </div>
        {ResponseOk &&
         <MyToasty
          text="Deposito realizado com sucesso"
          classname="sucess toasty"
         />
        }

        {errorCPF &&
         <MyToasty
          text="cpf invalido"
          classname="error toasty"
         />
        }
        {erroValue &&
         <MyToasty
          text="Value de Deposito invalido"
          classname="error toasty"
         />
        }
        {erroDescription &&
         <MyToasty
          text="Preencha o campo descricao"
          classname="error toasty"
         />
        }
        {cpfInvalid &&
         <MyToasty
          text="Cpf invalido"
          classname="error toasty"
         />
        }
      </div>
      </>
      
    );
  }

  export default ModalDeposit;
