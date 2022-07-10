import Home from "../Home"
import Extract from "../Extract"
import AllTransactions from "../AllTransactions"
import {Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/atmkonv" element={<Home/>}/>
        <Route path="/extract" element={<Extract/>}/>
        <Route path="/alltransactions" element={<AllTransactions/>}/>
     </Routes>
    </div>
  );
}

export default App;
