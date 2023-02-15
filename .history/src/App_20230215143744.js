// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Navbar/>}/>
      </Routes>

  );
}

export default App;
