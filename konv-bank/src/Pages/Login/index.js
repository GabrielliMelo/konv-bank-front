import './style.css';
import Header from "../../components/Header"
import CardLogin from '../../components/CardLogin';
import konvlogin from "../../assets/konv-login.png"

function Login() {
  return (
    <>
      <Header/>    
    <div className="container-Login">
      <img src={konvlogin} alt = "konv-login" className="img-login"/>
      <CardLogin/>
    </div>    
    </>

  );
}

export default Login;
