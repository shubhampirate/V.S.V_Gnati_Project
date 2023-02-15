// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Navbar/>}/>
      <Route path="/home" element={<><Navbar/><Home/></>}/>
      <Route path="/about" element={<><Navbar/><Home/></>}/>
      <Route path="/events" element={<><Navbar/><Home/></>}/>
      <Route path="/matrimonial" element={<><Navbar/><Home/></>}/>
      <Route path="/jobs" element={<><Navbar/><Home/></>}/>
      <Route path="/contact" element={<><Navbar/><Home/></>}/>
      <Route path="/profile" element={<><Navbar/><Home/></>}/>
      </Routes>

  );
}

export default App;
