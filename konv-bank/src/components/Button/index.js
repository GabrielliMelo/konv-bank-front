import './style.css';

function Button({text}) {
  return (
    <input type = "submit" value = {text} className="btn-purple" onClick = {()=> console.log("clik")}/>
  );
}

export default Button;
