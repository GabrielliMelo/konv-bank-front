import './style.css';

function MyToasty({text, classname}) {
  return (
    <input type = "submit" value = {text} className={classname} />
  );
}

export default MyToasty;
