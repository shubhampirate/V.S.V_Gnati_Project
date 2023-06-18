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

function App() {
  return (
    
    <Routes>
      <Route path="/login" element={<><Login/></>} />
      <Route path="/" element={<><Navbar/><Home/></>}/>
      <Route path="/about" element={<><Navbar/><About/></>}/>
      <Route path="/events" element={<><Navbar/><Events/></>}/>
      <Route path="/matrimonial/register" element={<><Navbar/><Register/></>}/>
      <Route path="/matrimonial" element={<><Navbar/><Matrimonial/></>}/>
      <Route path="/jobs" element={<><Navbar/><Jobs/></>}/>
      <Route path="/jobs/recruiter" element={<><Navbar/><Jobadmin/></>} />
      <Route path="/contact" element={<><Navbar/><ContactUs/></>}/>
      <Route path="/profile" element={<><Navbar/><Profile/></>}/>
      <Route path="/family" element={<><Navbar/><Family/></>} />
      <Route path="/donate" element={<><Navbar/><Donate/></>}/>
      </Routes>

  );
}

export default App;
