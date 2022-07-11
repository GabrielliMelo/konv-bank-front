import { useState } from "react";
import MyToasty from "../MyToasty"
import InputMask from 'react-input-mask';
import validacoesToasty from '../../utills/validacoesToasty';

function ModalTransfer({isOpenTranf, handleToggleModalTransfer}) {
  
  const [valor, setvalor] = useState(0)
  const [descricao, setdescricao] = useState("")
  const [cpf, setcpf] = useState("")
  const [cpfTransfer, setcpfTransfer] = useState("")
  const [ResponseOk, setResponseOk] = useState(false)
  const [erroDescription, setErroDescription] = useState(false)
  const [erroValue, setErroValue] = useState(false)
  const [mesmoCpf, setmesmoCpf] = useState(false)
  const [errorCPF, setErrorCPF] = useState(false)
  const [ cpfInvalid, setCPFinvalid] = useState(false)
  const [saldonsuficiente, setsaldonsuficiente] = useState(false)

  if(!isOpenTranf){
    return null;
  }

  async function handleTransfer(e) {
    e.preventDefault();
    
    const promise = await fetch(`http://localhost:3008/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf,
        value_transaction: valor, 
        description: descricao,
        cpf_transfer: cpfTransfer
      }),
    });
    const response = await promise.json()

    validacoesToasty(response, setResponseOk, setErrorCPF , setErroValue, setErroDescription, setCPFinvalid)

    if(response.message === "Saldo insuficiente"){
      setsaldonsuficiente(true)
      setTimeout(() => {
        setsaldonsuficiente(false)
      }, 800)
        return
    }

    if(response.message === "Não é possivel transferir para a mesma conta!"){
        setmesmoCpf(true)
        setTimeout(() => {
            setmesmoCpf(false)
        }, 800)
          return
      }
    
  }

  return (
    <>
    <div className="container-Modal displayFlex" >
      <div className="card-modal-transacao displayFlex">
      <div className="close-header displayFlex">
          <h1 className="h1-transacao" onClick={handleToggleModalTransfer}>Transferência</h1>
          <h1 className="btn-close" onClick={handleToggleModalTransfer}>x</h1>
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
          <input className="label-input-transacoes" value={valor} type="number" onChange={(e)=> setvalor(e.target.value)}/>
        </div>
        <div className="label-input width-70">
          <label>Descrição</label>
          <input className="label-input-transacoes"  type="text" onChange={(e)=> setdescricao(e.target.value)}/>
        </div>
        <div className="label-input width-70">
          <label>Cpf recebedor</label>
          <InputMask
              className="label-input-transacoes"  
              mask="999.999.999-99"
              type="text"
              name="cpf"
              value={cpfTransfer}
              onChange={(event) => setcpfTransfer(event.target.value)}
            />
        </div>
        <div className="btn-transacoes">
            <input
              type = "submit"
              value="Confirmar"
              className="btn-purple"
              onClick={handleTransfer}
            />
        </div>
        
      </div>
      {ResponseOk &&
       <MyToasty
        text="Transferencia realizado com sucesso"
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
        text="Valor para Transferencia invalido, valor minimo R$1,00"
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
      {saldonsuficiente &&
       <MyToasty
        text="Saldo insuficiente"
        classname="error toasty"
       />
      }
    {mesmoCpf &&
       <MyToasty
        text="Não é possivel transferir para a mesma conta!"
        classname="error toasty"
       />
      }
    </div>
    </>
    
  );
}

export default ModalTransfer;
