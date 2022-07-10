function validacoesToasty(response, setResponseOk, setErrorCPF , setErroValue, setErroDescription, setCPFinvalid) { 

    if(response.status === 200 ){
        setResponseOk(true)
        setTimeout(() => {
          window.location.reload()
        }, 800)
    }     

   if(response.message === 'CPF Deve ter no mínimo 11 caracteres'){
    setErrorCPF(true)
    setTimeout(() => {
      setErrorCPF(false)
    }, 800)
   }

   if(response.message === 'Cpf inválido'){
    setCPFinvalid(true)
    setTimeout(() => {
      setCPFinvalid(false)
    }, 800)
   }

    if(response.message === 'Deve ser no mínimo 1'){
      setErroValue(true)
      setTimeout(() => {
        setErroValue(false)
      }, 800)
    }

    if(response.message === "É necessário informar uma descrição"){
      setErroDescription(true)
      setTimeout(() => {
        setErroDescription(false)
      }, 800)
    }

}

module.exports = validacoesToasty;