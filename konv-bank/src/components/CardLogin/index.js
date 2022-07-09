import './style.css';
import Button from "../Button"

function CardLogin() {

  async function handleLogin(e){
    e.preventDefault()
  }
  
  return (

    <main className="container-CardLogin">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div className="label-input">
        <label htmlFor="cpf">Cpf</label>
        <input id= "cpf" placeholder = "Digite o seu CPF" className="input-login"/>
      </div>
      <div  className="label-input">
        <label htmlFor="Senha">Senha</label>
        <input id= "Senha" placeholder = "Digite a sua senha" className="input-login"/>
      </div>
      <Button
        text = "Login"
        classname={"btn-purple"}
      />
       <Button
        text = "Cadastre-se"
        classname={"btn-purple"}
      />
      </form>
      
    </main>
  );
}

export default CardLogin;
