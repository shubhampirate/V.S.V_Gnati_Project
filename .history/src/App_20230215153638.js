// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Navbar/>}/>
      <Route path="/home" element={<Home/>}/>
      </Routes>

  );
}

export default App;
