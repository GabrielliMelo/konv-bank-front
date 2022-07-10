  import './style.css';
  import { useState, useEffect } from "react";
  import MyToasty from "../MyToasty"
  import InputMask from 'react-input-mask';

  function ModalTransfer({isOpenSacar, handleToggleModalDepositar}) {
    
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

    console.log(valor)

    useEffect(()=>{
      async function opcoesValor(){
        const promise = await fetch(`http://localhost:3001/options/${valor}`,{
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



    async function handleCadastroUser(e) {
      e.preventDefault();
      const promise = await fetch(`http://localhost:3001/withdraw`, {
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
      
      if(!opcao){
        seterrorOpcao(true)
        setTimeout(() => {
          seterrorOpcao(false)
        }, 800)
        return
      }
      
      if(response.status === 200 ){
          setResponseOk(true)
          setTimeout(() => {
            window.location.reload()
          }, 800)
      }     

      if(response.status === 400){
        setErroValor(true)
        setTimeout(() => {
          setErroValor(false)
        }, 800)
      }

      if(response.mensagem === "Preencha a descricao!"){
        seterroDescription(true)
        setTimeout(() => {
          seterroDescription(false)
        }, 800)
      }

      if(response.status === 404 ){
        setResponseNo(true)
        setTimeout(() => {
          setResponseNo(false)
        }, 800)
    }
    }

    return (
      <>
      <div className="container-Modal displayFlex" >
        <div className="card-modal-sacar displayFlex">
          <h1 className="h1-saque" onClick={handleToggleModalDepositar}>Saque ---------- x</h1>
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
          </div>
          <div className="btn-transacoes">
              <input
                type = "submit"
                value="Confirmar"
                className="btn-purple"
                onClick={handleCadastroUser}
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
        {errorOpcao &&
         <MyToasty
          text="Escolha uma opção"
          classname="error toasty"
         />
        }
      </div>
      </>
      
    );
  }

  export default ModalTransfer;
