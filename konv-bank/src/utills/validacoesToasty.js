function validacoesToasty(response, setResponseOk, setErroValor, seterroDescription, setResponseNo) { 
    if(response.status === 200 ){
        setResponseOk(true)
        setTimeout(() => {
          window.location.reload()
        }, 800)
    }     

    if(response.status === 404 ){
      setResponseNo(true)
      setTimeout(() => {
        setResponseNo(false)
      }, 800)
   }

   if(response.mensagem === 'Preencha o cpf!'){
    setErroValor(true)
    setTimeout(() => {
      setErroValor(false)
    }, 800)
   }

    if(response.mensagem === 'Valor de deposito invalido!'){
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

}

module.exports = validacoesToasty;