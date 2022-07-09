  import './style.css';
  import { useState, useEffect } from "react";
  import { ToastContainer, toast } from "react-toastify"
  import Button from "../../components/Button"
  import MyToasty from "../../components/MyToasty"
  import InputMask from 'react-input-mask';
  import validacoesToasty from '../../utills/validacoesToasty';

  function ModalSacar({isOpenSacar, handleToggleModalSacar}) {
    
    const [valor, setvalor] = useState(0)
    const [descricao, setdescricao] = useState("")
    const [cpf, setcpf] = useState("")
    const [opcao, setopcao] = useState(0)
    const [opcoes, setopcoes] = useState([])
    const [ResponseOk, setResponseOk] = useState(false)
    const [ResponseNo, setResponseNo] = useState(false)
    const [erroDescription, seterroDescription] = useState(false)
    const [erroValor, setErroValor] = useState(false)
    const [errorOpcao, seterrorOpcao] = useState(false)
    const [saldonsuficiente, setsaldonsuficiente] = useState(false)

    useEffect(()=>{
      async function opcoesValor(){
        const promise = await fetch(`http://localhost:3008/options/${valor}`,{
        method: "GET",
        })
        const response = await promise.json()
        setopcoes(response.opcoes)
      }
        opcoesValor();
    }, [valor])
  

    if(!isOpenSacar){
      return null;
    }

    async function handleSaque(e) {
      e.preventDefault();
      
      const promise = await fetch(`http://localhost:3008/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cpf,
          valor, 
          description:descricao,
          opcao
        }),
      });
      const response = await promise.json()
      
      validacoesToasty(response, setResponseOk, setErroValor, seterroDescription, setResponseNo)
      
      if(response.mensagem === "Saldo insuficiente!"){
        setsaldonsuficiente(true)
        setTimeout(() => {
          setsaldonsuficiente(false)
        }, 800)
    return
 }

      if(!opcao){
            seterrorOpcao(true)
            setTimeout(() => {
              seterrorOpcao(false)
            }, 800)
        return
     }
    }

    return (
      <>
      <div className="container-Modal displayFlex" >
        <div className="card-modal-transacao displayFlex">
        <div className="close-header displayFlex">
            <h1 className="h1-transacao" onClick={handleToggleModalSacar}>Saque</h1>
            <h1 className="btn-close" onClick={handleToggleModalSacar}>x</h1>
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
          <div className="label-input width-70">
            <label>Opção</label>
            <input className="label-input-transacoes" type="text" onChange={(e)=> setopcao(e.target.value)}/>
            {
              errorOpcao && 
              "Preencha a descricao"
            }
          </div>
          <div className="btn-transacoes">
              <input
                type = "submit"
                value="Confirmar"
                className="btn-purple"
                onClick={handleSaque}
              />
          </div>
          
        </div>
            {valor > 0 && <ul className="opcoes display">
              {opcoes.map((opcaonotas, index)=>(
                <li>{`Opcao ${index + 2} - ${opcaonotas.opcao}`}</li>
              ))}
            </ul>}
        {ResponseOk &&
         <MyToasty
          text="saque realizado com sucesso"
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
          text="Valor de saque invalido"
          classname="error toasty"
         />
        }
        {erroDescription &&
         <MyToasty
          text="Preencha o campo descricao"
          classname="error toasty"
         />
        }
        {saldonsuficiente &&
         <MyToasty
          text="SALDO INSUFICIENTE"
          classname="error toasty"
         />
        }
      </div>
      </>
      
    );
  }

  export default ModalSacar;
