  import './style.css';
  import { useState, useEffect } from "react";
  import { ToastContainer, toast } from "react-toastify"
  import Button from "../Button"
  import MyToasty from "../MyToasty"
  import InputMask from 'react-input-mask';
  import validacoesToasty from '../../utills/validacoesToasty';

  function ModalDepositar({isOpendepositar, handleToggleModaldepositar}) {
    
    const [valor, setvalor] = useState(0)
    const [opcao, seterrorOpcao] = useState(1)
    const [descricao, setdescricao] = useState("")
    const [cpf, setcpf] = useState("")

    const [ResponseOk, setResponseOk] = useState(false)
    const [ResponseNo, setResponseNo] = useState(false)
    const [erroDescription, seterroDescription] = useState(false)
    const [erroValor, setErroValor] = useState(false)


    if(!isOpendepositar){
      return null;
    }

    async function handleDeposito(e) {
      e.preventDefault();
      const promise = await fetch(`http://localhost:3008/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cpf,
          valor, 
          description:descricao
        }),
      });
      const response = await promise.json()

      console.log(response)

      validacoesToasty(response, setResponseOk, setErroValor, seterroDescription, setResponseNo)
      
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
            <label>Valor</label>
            <input className="label-input-transacoes" type="number" onChange={(e)=> setvalor(e.target.value)}/>
          </div>
          <div className="label-input width-70">
            <label>Descrição</label>
            <input className="label-input-transacoes" type="text" onChange={(e)=> setdescricao(e.target.value)}/>
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

        {ResponseNo &&
         <MyToasty
          text="cpf invalido"
          classname="error toasty"
         />
        }
        {erroValor &&
         <MyToasty
          text="Valor de Deposito invalido"
          classname="error toasty"
         />
        }
        {erroDescription &&
         <MyToasty
          text="Preencha o campo descricao"
          classname="error toasty"
         />
        }
      </div>
      </>
      
    );
  }

  export default ModalDepositar;
