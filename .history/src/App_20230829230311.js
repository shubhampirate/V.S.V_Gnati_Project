// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Events from './Pages/Events';
import Matrimonial from './Pages/Matrimonial/Matrimonial';
import Jobs from './Pages/Job/Jobs';
import ContactUs from './Pages/ContactUs';
import Profile from './Pages/Profile/Profile';
import { Routes, Route } from "react-router-dom"
import Register from './Pages/Matrimonial/Register';
import Jobadmin from './Pages/Job/Jobadmin';
import Family from './Pages/Profile/Family';
import Login from './Pages/Login';
import Donate from './Pages/Donation/Donate';
import Footer from './Components/Footer';

function App() {
  return (
    
    <Routes>
      <Route path="/login" element={<><Login/></>} />
      <Route path="/" element={<><Navbar/><Home/><Footer/></>}/>
      <Route path="/about" element={<><About/></>}/>
      <Route path="/events" element={<><Events/></>}/>
      <Route path="/register-matrimony" element={<><Register/></>}/>
      <Route path="/matrimonial" element={<><Matrimonial/></>}/>
      <Route path="/jobs" element={<><Jobs/></>}/>
      <Route path="/register-job" element={<><Jobadmin/></>} />
      <Route path="/contact" element={<><ContactUs/></>}/>
      <Route path="/family" element={<><Profile/></>}/>
      <Route path="/profile" element={<><Family/></>} />
      <Route path="/donate" element={<><Donate/></>}/>
      </Routes>

  );
}

export default App;
