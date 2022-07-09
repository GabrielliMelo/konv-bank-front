import Home from "./Pages/Home"
import Extrato from "./Pages/Extrato"
import TodasTransacoes from "./Pages/TodasTransacoes"
import {Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/caixaKonv" element={<Home/>}/>
        <Route path="/extrato" element={<Extrato/>}/>
        <Route path="/todasTransacoes" element={<TodasTransacoes/>}/>
     </Routes>
    </div>
  );
}

export default App;
