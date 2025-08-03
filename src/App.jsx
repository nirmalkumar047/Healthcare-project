import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './pages/dashboard'


// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
  
import Home from './pages/Home';
import SignIn from './auth/SignIn';
import { useUser } from '@clerk/clerk-react';
import Hospital from './pages/Emergency/Hospital';
import Ambulance from './pages/Emergency/Ambulance';
import Sos from './pages/Emergency/Sos';
import Doctor from './pages/Doctor';


function App() {

  const {user, isLoaded , isSignedIn}=useUser();

  return (
    <BrowserRouter>
      <Navbar /> {/* shows on every page */}
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/signin" element={<SignIn /> } />
        <Route path="/Emergency/Hospital" element={<Hospital/> } />
        <Route path="/Emergency/Ambulance" element={<Ambulance/> } />
        <Route path="/Emergency/Sos" element={<Sos/> } />
        <Route path="/Doctor" element={<Doctor/> } />
        {/* more routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

