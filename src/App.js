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
      <Route path="/about" element={<><Navbar/><About/><Footer/></>}/>
      <Route path="/events" element={<><Navbar/><Events/><Footer/></>}/>
      <Route path="/register-matrimony" element={<><Navbar/><Register/><Footer/></>}/>
      <Route path="/matrimonial" element={<><Navbar/><Matrimonial/><Footer/></>}/>
      <Route path="/jobs" element={<><Navbar/><Jobs/><Footer/></>}/>
      <Route path="/register-job" element={<><Navbar/><Jobadmin/><Footer/></>} />
      <Route path="/contact" element={<><Navbar/><ContactUs/><Footer/></>}/>
      <Route path="/family" element={<><Navbar/><Profile/><Footer/></>}/>
      <Route path="/profile" element={<><Navbar/><Family/><Footer/></>} />
      <Route path="/donate" element={<><Navbar/><Donate/><Footer/></>}/>
      </Routes>

  );
}

export default App;
