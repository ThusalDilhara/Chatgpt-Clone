import { useState,useEffect } from 'react'
import SideBar from './Components/sideBar'  
import MainPage from './Components/mainPage'
import Navbar from './Components/navbar'
import SignIn from './Components/signIn'
import SignUp from './Components/signUp'
import { Routes, Route } from "react-router-dom";

function App() {
  
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    
        <Routes>
          <Route
            path="/home"
            element={
              <div className='flex'>
                <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
                <Navbar isOpen={isOpen} />
                <MainPage />
              </div>
            }
          />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    
  )
}

export default App
