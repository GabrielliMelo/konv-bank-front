  import './style.css';
  import { useState, useEffect } from "react";
  import MyToasty from "../MyToasty"
  import InputMask from 'react-input-mask';
  import validacoesToasty from '../../utills/validacoesToasty';

  function ModalDraw({isOpenSacar, handleToggleModalSacar}) {
    
    const [valor, setvalor] = useState(0)
    const [descricao, setdescricao] = useState("")
    const [cpf, setcpf] = useState("")
    const [opcao, setopcao] = useState(2)
    const [opcoes, setopcoes] = useState([])
    const [ResponseOk, setResponseOk] = useState(false)
    const [erroDescription, setErroDescription] = useState(false)
    const [erroValue, setErroValue] = useState(false)
    const [errorOpcao, seterrorOpcao] = useState(false)
    const [errorCPF, setErrorCPF] = useState(false)
    const [ cpfInvalid, setCPFinvalid] = useState(false)
    const [ valorInvalido, setvalorInvalido] = useState(false)
    const [saldonsuficiente, setsaldonsuficiente] = useState(false)

    useEffect(()=>{
      async function opcoesValor(){
        const promise = await fetch(`http://localhost:3008/options/${valor}`,{
        method: "GET",
        })
        const response = await promise.json()
        if(response.message === "Deve ser no mínimo 2" ){
          seterrorOpcao(true)
          setTimeout(() => {
            seterrorOpcao(false)
          }, 800);
          return;
        }
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
        },
        body: JSON.stringify({
          cpf,
          value_transaction: valor, 
          description: descricao,
          option_transaction: opcao
        }),
      });
      const response = await promise.json()

      if(String(valor).endsWith("1") || String(valor).endsWith("3")){
        setvalorInvalido(true)
        setTimeout(() => {
          setvalorInvalido(false)
        }, 1500);
        return;
      }

      validacoesToasty(response, setResponseOk, setErrorCPF , setErroValue, setErroDescription, setCPFinvalid)

      if(response.message === "Saldo insuficiente!"){
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
            }, 2000)
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
            <input className="label-input-transacoes" value={valor} type="number" onChange={(e)=> setvalor(e.target.value)}/>
          </div>
          <div className="label-input width-70">
            <label>Descrição</label>
            <input className="label-input-transacoes"  type="text" onChange={(e)=> setdescricao(e.target.value)}/>
          </div>
          <div className="label-input width-70">
            <label>Opção</label>
            <input className="label-input-transacoes" type="text" onChange={(e)=> setopcao(e.target.value)}/>
            {
              errorOpcao && 
              "Escolha uma válida para saque"
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
            {valor > 1 ? <ul className="opcoes display">
              {opcoes.map((opcaonotas, index)=>(
                <li>{`Opcao ${index + 2} - ${opcaonotas.opcao}`}</li>
              ))}
            </ul>: "teste"}
            {ResponseOk &&
         <MyToasty
          text="Saque realizado com sucesso"
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
          text="Valor para saque invalido, saque minimo R$2,00"
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
        {valorInvalido &&
         <MyToasty
          text="Valor invalido, Sem troco de R$1,00"
          classname="error toasty"
         />
        }
      </div>
      </>
      
    );
  }

  export default ModalDraw;
