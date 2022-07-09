import './style.css';

function MyToasty({text, classname}) {
  return (
    <input type = "submit" value = {text} className={classname} onClick = {()=> console.log("clik")}/>
  );
}

export default MyToasty;
