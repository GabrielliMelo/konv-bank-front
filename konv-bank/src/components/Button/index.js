import './style.css';

function Button({text, classname}) {
  return (
    <input type = "submit" value = {text} className={classname} />
  );
}

export default Button;
